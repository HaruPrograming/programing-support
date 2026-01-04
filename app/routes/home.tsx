import addImg from "../images/add.png";

const Home = () => {
  return (
    <div>
      <div className="h-50 flex justify-around  border-b border-gray-400 bg-white px-3 py-2 font-bold">
        <p className="flex w-32 justify-center truncate">作成名</p>
        <div className="border-r" />
        <p className="flex w-32 justify-center truncate">作りたい度</p>
        <div className="border-r" />
        <p className="flex w-32 justify-center truncate">ステータス</p>
        <div className="border-r" />
        <p className="flex w-32 justify-center truncate">作成日</p>
        <div className="border-r" />
        <p className="flex w-32 justify-center truncate">更新日</p>
      </div>
      <div className="h-50 mx-2 my-2 flex  justify-around rounded-md border border-gray-400 bg-white px-1 py-4">
        <a
          href="#"
          className="flex w-32 justify-center truncate text-blue-500 underline"
        >
          Todoリスト
        </a>
        <div className="border-r" />
        <p className="flex w-32 justify-center truncate">高</p>
        <div className="border-r" />
        <p className="flex w-32 justify-center truncate">Active</p>
        <div className="border-r" />
        <p className="flex w-32 justify-center truncate">2025/12/27</p>
        <div className="border-r" />
        <p className="flex w-32 justify-center truncate">2025/12/29</p>
      </div>
      <div className="h-50 m-2 mx-2 my-2  flex justify-around rounded-md border border-gray-400 bg-white px-1 py-4">
        <img className="h-7 w-7" src={addImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
