const authLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex items-center h-screen justify-center">
      {children}
    </main>
  );
};

export default authLayout;
