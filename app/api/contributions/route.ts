import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

// GitHub GraphQL query to fetch contribution calendar for a year range
const GITHUB_QUERY = `
  query($username: String!, $from: DateTime, $to: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

// Helper to fetch GitHub contributions
async function fetchGithubContributions(username: string, token: string, fromStr: string, toStr: string): Promise<{ date: string; count: number }[]> {
  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "Portfolio-App",
      },
      body: JSON.stringify({
        query: GITHUB_QUERY,
        variables: { username, from: fromStr, to: toStr },
      }),
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!response.ok) {
      console.error(`GitHub API error for ${username}: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    const days = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
      ?.flatMap((w: any) => w.contributionDays) || [];

    return days.map((d: any) => ({
      date: d.date,
      count: d.contributionCount,
    }));
  } catch (error) {
    console.error(`Failed to fetch GitHub contributions for ${username}:`, error);
    return [];
  }
}

// Helper to fetch GitLab user ID by username
async function fetchGitlabUserId(username: string, token?: string) {
  try {
    const headers: Record<string, string> = { "User-Agent": "Portfolio-App" };
    if (token) {
      headers["PRIVATE-TOKEN"] = token;
    }

    const res = await fetch(`https://gitlab.com/api/v4/users?username=${username}`, {
      headers,
      next: { revalidate: 86400 }, // cache username mapping for 24 hours
    });

    if (!res.ok) return null;
    const users = await res.json();
    return users?.[0]?.id || null;
  } catch (error) {
    console.error(`Failed to fetch GitLab user ID for ${username}:`, error);
    return null;
  }
}

// Helper to fetch GitLab contributions
async function fetchGitlabContributions(userId: number, token: string | undefined, fromDate: string, toDate: string): Promise<{ date: string; count: number }[]> {
  try {
    const headers: Record<string, string> = { "User-Agent": "Portfolio-App" };
    if (token) {
      headers["PRIVATE-TOKEN"] = token;
    }

    // GitLab events API paginated
    let contributions: Record<string, number> = {};
    let page = 1;
    let hasMore = true;

    // Fetch up to 3 pages of events (300 events) for safety
    while (hasMore && page <= 3) {
      const url = `https://gitlab.com/api/v4/users/${userId}/events?action=pushed&after=${fromDate}&before=${toDate}&per_page=100&page=${page}`;
      const res = await fetch(url, { headers, next: { revalidate: 3600 } });

      if (!res.ok) break;
      const events = await res.json();
      if (!events || events.length === 0) break;

      for (const event of events) {
        if (event.created_at) {
          const dateStr = event.created_at.split("T")[0]; // extract YYYY-MM-DD
          contributions[dateStr] = (contributions[dateStr] || 0) + 1;
        }
      }

      // Check pagination headers
      const totalPagesHeader = res.headers.get("x-total-pages");
      if (totalPagesHeader) {
        hasMore = page < parseInt(totalPagesHeader, 10);
      } else {
        hasMore = events.length === 100;
      }
      page++;
    }

    return Object.entries(contributions).map(([date, count]) => ({
      date,
      count,
    }));
  } catch (error) {
    console.error(`Failed to fetch GitLab contributions for user ${userId}:`, error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

  // Date ranges
  const fromStr = `${year}-01-01T00:00:00Z`;
  const toStr = `${year}-12-31T23:59:59Z`;

  const fromDate = `${year}-01-01`;
  const toDate = `${year}-12-31`;

  // Read environment variables
  const githubUsernames = (process.env.GITHUB_USERNAMES || "MohamedAliBouzir,MedAliBouzir")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  
  const gitlabUsernames = (process.env.GITLAB_USERNAMES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const githubToken = process.env.GITHUB_TOKEN;
  const gitlabToken = process.env.GITLAB_TOKEN;

  const mergedContributions: Record<string, number> = {};

  // Fetch GitHub contributions
  if (githubToken) {
    await Promise.all(
      githubUsernames.map(async (username) => {
        const days = await fetchGithubContributions(username, githubToken, fromStr, toStr);
        days.forEach((day) => {
          mergedContributions[day.date] = (mergedContributions[day.date] || 0) + day.count;
        });
      })
    );
  } else {
    console.warn("GITHUB_TOKEN is not defined in the environment variables.");
  }

  // Fetch GitLab contributions
  await Promise.all(
    gitlabUsernames.map(async (username) => {
      const userId = await fetchGitlabUserId(username, gitlabToken);
      if (userId) {
        const days = await fetchGitlabContributions(userId, gitlabToken, fromDate, toDate);
        days.forEach((day) => {
          mergedContributions[day.date] = (mergedContributions[day.date] || 0) + day.count;
        });
      }
    })
  );

  // Return sorted contributions array
  const result = Object.entries(mergedContributions)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({
    year,
    contributions: result,
  });
}
