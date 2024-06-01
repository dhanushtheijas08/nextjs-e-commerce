import NavBar from "@/components/navigation/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";

type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="mt-16">
        <NavBar />
      </div>
      {children}
    </>
  );
};

export default MainLayout;
