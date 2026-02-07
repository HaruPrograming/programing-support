import { Link } from "react-router-dom";
import addImg from "../images/add.png";
import { Fragment, useEffect, useRef, useState } from "react";
import { itemList } from "~/data/item/testData";
import { useHeader } from "~/context/HeaderContext";
import { toast } from "sonner";
import { fetchProjects } from "../../services/projectApi";
import { type Project } from "../../types/project";
import { formatDatetypeYYYYMMDDhhmm } from "../../utils/date-format";

export default function Home() {
  const headerList = ["作成名", "作りたい度", "ステータス", "作成日", "更新日"];
  const { headerTitle, setHeaderTitle } = useHeader();
  const [addProject, setAddProject] = useState(false);
  const [creationLevelValue, setCreationLevelValue] = useState("1");
  const [statusValue, setStatusValue] = useState("1");
  const [now, setNow] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    console.log("addPro", addProject);
    const handleProjectClick = (e: MouseEvent) => {
      if (!targetRef.current) return;
      // divの中をクリック → 何もしない
      if (targetRef.current.contains(e.target as Node)) return;
      // divの外をクリック
      setAddProject(false);
      toast.success("登録が完了しました。");
      setCreationLevelValue("1");
      setStatusValue("1");
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
      setNow(formatDatetypeYYYYMMDDhhmm(nowJST().toISOString()));

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

      {projects.map((item) => (
        <div key={item.id} className="item-folder-frame">
          <Link
            to={`/detail/${item.id}`}
            className="item-folder-link"
            onClick={() => setHeaderTitle(item.project_name)}
          >
            {item.project_name}
          </Link>

          <div className="border-r" />
          <select
            name=""
            id=""
            defaultValue={item.creation_level}
            onChange={handleCreationLevelChange}
            className="input-box text-center"
          >
            <option value="3">高</option>
            <option value="2">中</option>
            <option value="1">低</option>
          </select>
          <div className="border-r" />
          <select
            name=""
            id=""
            defaultValue={item.status}
            onChange={handleStatusChange}
            className="input-box text-center"
          >
            <option value="1">New</option>
            <option value="2">Active</option>
          </select>
          <div className="border-r" />
          <p className="item-folder">{formatDatetypeYYYYMMDDhhmm(item.created_at)}</p>
          <div className="border-r" />
          <p className="item-folder">{formatDatetypeYYYYMMDDhhmm(item.updated_at)}</p>
        </div>
      ))}

      {addProject ? (
        <div className="item-folder-frame select-item" ref={targetRef}>
          <input type="text" className="input-box" />
          <div className="border-r" />
          <select
            name=""
            id=""
            value={creationLevelValue}
            onChange={handleCreationLevelChange}
            className="input-box text-center"
          >
            <option value="3">高</option>
            <option value="2">中</option>
            <option value="1">低</option>
          </select>
          <div className="border-r" />
          <select
            name=""
            id=""
            value={statusValue}
            onChange={handleStatusChange}
            className="input-box text-center"
          >
            <option value="1">New</option>
            <option value="2">Active</option>
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
