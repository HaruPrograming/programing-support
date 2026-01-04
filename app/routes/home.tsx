import { Link } from "react-router";
import addImg from "../images/add.png";
import { testData, type Item } from "../data/item/testData";
import { useState, useEffect } from "react";

const Home = () => {
  const [items, setItems] = useState<Item[]>(testData);

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
      {items.map((item) => (
        <div className="item-folder-frame">
          <Link to="/detail" className="item-folder-link">
            {item.name}
          </Link>
          <div className="border-r" />
          <p className="item-folder">{item.priority}</p>
          <div className="border-r" />
          <p className="item-folder">{item.status}</p>
          <div className="border-r" />
          <p className="item-folder">{item.createdDate.toLocaleDateString()}</p>
          <div className="border-r" />
          <p className="item-folder">{item.updatedDate.toLocaleDateString()}</p>
        </div>
      ))}
      <div className="item-folder-frame">
        <img className="add-img" src={addImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
