const Header = () => {
  return (
    <div className="flex h-20 items-center border-b border-gray-400 px-4">
      {/* アイコン用の div */}
      <div className=" flex h-10 w-20 items-center justify-center rounded-md bg-black">
        <p className="text-white">はるプロ</p>
      </div>

      {/* 中央に配置したい input */}
      <div className="flex flex-1 items-center justify-center">
        <input
          type="text"
          placeholder="作成名"
          className="w-60 rounded border px-2 py-1"
        />
        <input
          type="button"
          value="検索"
          className="ml-2 rounded bg-orange-400 px-3 py-1 text-white"
        />
      </div>

      {/* 右側に他のメニューを追加する場合はここ */}
    </div>
  );
};

export default Header;
