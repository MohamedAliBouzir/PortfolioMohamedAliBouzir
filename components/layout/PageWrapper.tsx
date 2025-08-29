import ProgressNav from "../motions/progressNav";

const PageWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex justify-center gap-4">
      <ProgressNav>
        <div className="w-4/5 md:w-3/5 h-full flex z-10">{children}</div>
      </ProgressNav>
    </main>
  );
};

export default PageWrapper;
