import { Link } from "react-router-dom";
import addImg from "../images/add.png";
import { Fragment, useEffect, useRef, useState } from "react";
import { itemList } from "~/data/item/testData";
import { useHeader } from "~/context/HeaderContext";
import { toast } from "sonner";

export default function Home() {
  const headerList = ["作成名", "作りたい度", "ステータス", "作成日", "更新日"];
  const { headerTitle, setHeaderTitle } = useHeader();
  const [addProject, setAddProject] = useState(false);
  const [creationLevelValue, setCreationLevelValue] = useState("低");
  const [statusValue, setStatusValue] = useState("New");
  const [now, setNow] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("addPro", addProject);
    const handleProjectClick = (e: MouseEvent) => {
      if (!targetRef.current) return;
      // divの中をクリック → 何もしない
      if (targetRef.current.contains(e.target as Node)) return;
      // divの外をクリック
      setAddProject(false);
      toast.success("登録が完了しました。");
      setCreationLevelValue("低");
      setStatusValue("New");
      console.log("外側クリック", addProject);
    };
    document.addEventListener("click", handleProjectClick);
    return () => {
      document.removeEventListener("click", handleProjectClick);
    };
  }, [addProject]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const tick = () => {
      console.log("isRunning", isRunning);
      if (!isRunning) return;
      setNow(formatDate(nowJST()));

      // 次の0秒までの時間を計算（最低でも100msにする）
      const msUntilNextMinute = Math.max(
        100,
        (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds()
      );

      timer = setTimeout(tick, msUntilNextMinute);
      console.log("tick");
    };

    tick(); // 最初の1回

    return () => clearTimeout(timer); // クリーンアップ
  }, [isRunning]);

  const handleAddProject = () => {
    setAddProject(true)
  };

  const handleCreationLevelChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCreationLevelValue(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(e.target.value);
  };

  const nowJST = () => {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" })
    );
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

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
          <Link
            to={`/detail/${item.id}`}
            className="item-folder-link"
            onClick={() => setHeaderTitle(item.project_name)}
          >
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

      {addProject ? (
        <div className="item-folder-frame select-item" ref={targetRef}>
          <input
            type="text"
            className="input-box"
          />
          <div className="border-r" />
          <select
            name=""
            id=""
            value={creationLevelValue}
            onChange={handleCreationLevelChange}
            className="input-box text-center"
          >
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
          <div className="border-r" />
          <select
            name=""
            id=""
            value={statusValue}
            onChange={handleStatusChange}
            className="input-box text-center"
          >
            <option value="New">New</option>
            <option value="Active">Active</option>
          </select>
          <div className="border-r" />
          <p className="text-center w-32 flex items-center">{now}</p>
          <div className="border-r" />
          <p className="text-center w-32 flex items-center">{now}</p>
        </div>
      ) : (
        <div
          className={"item-folder-frame"}
          onClick={() => {
            handleAddProject();
            setIsRunning(true);
          }}
        >
          <img className="add-img" src={addImg} alt="" />
        </div>
      )}
    </>
  );
}
