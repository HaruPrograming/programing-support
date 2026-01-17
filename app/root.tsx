import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/layout/Header";
import { HeaderProvider } from "./context/HeaderContext";

export default function Root() {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderProvider>
        <Header />
        <main>
          <Toaster richColors position="top-right" />
          <Outlet />
        </main>
      </HeaderProvider>
    </div>
  );
}
