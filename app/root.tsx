import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { HeaderProvider } from "./context/HeaderContext";

export default function Root() {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </HeaderProvider>
    </div>
  );
}
