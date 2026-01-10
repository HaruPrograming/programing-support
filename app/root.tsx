// app/root.tsx
import "./tailwind.css";
import { Outlet, Meta, Links } from "react-router";
import Header from "./Components/Header";

export default function Root() {
  return (
    <html lang="ja" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="m-0 h-full bg-gray-200">
        <Header /> {/* 全ページ共通 */}
        <main className="flex-1">
          <Outlet />
        </main>
      </body>
    </html>
  );
}