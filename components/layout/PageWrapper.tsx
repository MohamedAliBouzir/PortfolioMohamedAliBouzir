import AuroraCursor from "@/components/cursor/AuroraCursor";

const PageWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="relative min-h-screen w-full">
      <AuroraCursor />
      {children}
    </main>
  );
};

export default PageWrapper;
