import NavBar from "@/components/navigation/nav-bar";

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
};

export default MainLayout;
