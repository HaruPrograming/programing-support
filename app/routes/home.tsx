import { Link } from "react-router";
import addImg from "../images/add.png";

const Home = () => {
  return (
    <div>
      <div className="flex justify-around border-b border-gray-400 bg-white px-3 py-2 font-bold">
        <p className="item-folder">作成名</p>
        <div className="border-r" />
        <p className="item-folder">作りたい度</p>
        <div className="border-r" />
        <p className="item-folder">ステータス</p>
        <div className="border-r" />
        <p className="item-folder">作成日</p>
        <div className="border-r" />
        <p className="item-folder">更新日</p>
      </div>
      <div className="item-folder-frame">
        <Link to="/detail" className="item-folder-link">
          Todoリスト
        </Link>
        <div className="border-r" />
        <p className="item-folder">高</p>
        <div className="border-r" />
        <p className="item-folder">Active</p>
        <div className="border-r" />
        <p className="item-folder">2025/12/27</p>
        <div className="border-r" />
        <p className="item-folder">2025/12/29</p>
      </div>
      <div className="item-folder-frame">
        <img className="add-img" src={addImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
