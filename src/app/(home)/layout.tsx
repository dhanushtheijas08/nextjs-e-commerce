import NavBar from "@/components/navigation/nav-bar";

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="overflow-y-hidden h-screen">
      <NavBar />
      {children}
    </main>
  );
};

export default MainLayout;
