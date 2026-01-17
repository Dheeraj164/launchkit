import NavBar from "@/component/NavBar";
import { AppContextProvider } from "@/context/AppContext";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppContextProvider>
        <NavBar />
        {children}
      </AppContextProvider>
    </>
  );
}
