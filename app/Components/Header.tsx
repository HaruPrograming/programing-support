import { useLocation } from "react-router-dom";
import { useHeader } from "../context/HeaderContext";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const { headerTitle, setHeaderTitle } = useHeader();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("Header mounted!");
  }, []);

  const handleSearch = () => {
    console.log("検索 clicked:", inputValue);
    setHeaderTitle(inputValue);
  };

  const isTopPage = location.pathname === "/";

  return (
    <div className="flex h-20 items-center border-b border-gray-400 px-4">
      {/* ロゴ */}
      <div className="flex h-10 w-20 items-center justify-center rounded-md bg-black">
        <p className="text-white">はるプロ</p>
      </div>

      {/* DOM構造は常に同じ */}
      <div className="flex flex-1 items-center justify-center">
        {isTopPage ? (
          <>
            <input
              type="text"
              placeholder="作成名"
              className="w-60 rounded border px-2 py-1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <input
              type="button"
              value="検索"
              className="ml-2 rounded bg-orange-400 px-3 py-1 text-white"
              onClick={handleSearch}
            />
          </>
        ) : (
          <>
            <p className="mr-2">{headerTitle} ＞ </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
