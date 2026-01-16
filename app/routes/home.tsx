import { Link } from "react-router-dom";
import addImg from "../images/add.png";
import { Fragment } from "react";
import { itemList } from "~/data/item/testData";

export default function Home() {
  const headerList = ["作成名", "作りたい度", "ステータス", "作成日", "更新日"];

  return (
    <>
      <div className="flex justify-around border-b border-gray-400 bg-white px-3 py-2 font-bold">
        {headerList.map((header, index) => (
          <Fragment key={header}>
            <p className="item-folder">{header}</p>
            {index !== headerList.length - 1 && <div className="border-r" />}
          </Fragment>
        ))}
      </div>

      {itemList.map((item) => (
        <div key={item.id} className="item-folder-frame">
          <Link to={`/detail/${item.id}`} className="item-folder-link">
            {item.project_name}
          </Link>

          <div className="border-r" />
          <p className="item-folder">{item.creation_level}</p>
          <div className="border-r" />
          <p className="item-folder">{item.status}</p>
          <div className="border-r" />
          <p className="item-folder">
            {item.created_date.toLocaleDateString()}
          </p>
          <div className="border-r" />
          <p className="item-folder">
            {item.updated_date.toLocaleDateString()}
          </p>
        </div>
      ))}

      <div className="item-folder-frame">
        <img className="add-img" src={addImg} alt="" />
      </div>
    </>
  );
}
