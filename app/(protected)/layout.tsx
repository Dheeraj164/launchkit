import NavBar from "@/component/NavBar";
import { AppContextProvider } from "@/context/AppContext";
import { redirect } from "next/navigation";
import { getInitValue } from "../actions/getInitValue";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, error } = await getInitValue();
  if (error || !data) {
    redirect("/login");
  }
  return (
    <>
      <AppContextProvider>
        <NavBar />
        {children}
      </AppContextProvider>
    </>
  );
}
