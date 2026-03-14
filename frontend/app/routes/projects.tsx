import { Link } from "react-router-dom";
import addImg from "../images/add.png";
import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import { useHeader } from "~/context/HeaderContext";
import { toast } from "sonner";
import { fetchProjects, createProject } from "../../services/projectApi";
import { type Project, type CreateProject } from "../../types/project";
import { formatDatetypeYYYYMMDDhhmm } from "../../utils/date-format";
import { useClickOutside } from "~/hooks/useClickOutside";
import { updateProject } from "../../services/projectApi";

export default function Home() {
  const headerList = ["作成名", "作りたい度", "ステータス", "作成日", "更新日"];

  const { setHeaderTitle } = useHeader();
  const targetRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [addProject, setAddProject] = useState(false);

  const [name, setName] = useState("");
  const [creationLevelValue, setCreationLevelValue] = useState(1);
  const [statusValue, setStatusValue] = useState(1);

  const [now, setNow] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  /* ===============================
      プロジェクト一覧取得
  =============================== */

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

  /* ===============================
      外クリック → 保存
  =============================== */

  const handleCreateProject = useCallback(async () => {
    if (!addProject) return;

    if (!name.trim()) {
      toast.error("プロジェクト名を入力してください");
      return;
    }

    console.log("送信データ", {
      name,
      creationLevelValue,
      statusValue,
    });

    try {
      const newProject: CreateProject = {
        project_name: name,
        creation_level: creationLevelValue,
        status: statusValue,
        used_technologies: "",
      };

      const createdProject = await createProject(newProject);

      setProjects((prev) => [...prev, createdProject]);

      setAddProject(false);
      setName("");
      setCreationLevelValue(1);
      setStatusValue(1);

      toast.success("登録が完了しました");
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("プロジェクトの追加に失敗しました");
    }
  }, [addProject, name, creationLevelValue, statusValue]);

  useClickOutside(targetRef, handleCreateProject);

  /* ===============================
      時計表示
  =============================== */

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!isRunning) return;

      setNow(formatDatetypeYYYYMMDDhhmm(nowJST().toISOString()));

      const msUntilNextMinute = Math.max(
        100,
        (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds(),
      );

      timer = setTimeout(tick, msUntilNextMinute);
    };

    tick();

    return () => clearTimeout(timer);
  }, [isRunning]);

  const nowJST = () => {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
    );
  };

  /* ===============================
      プロジェクト追加開始
  =============================== */

  const handleAddProject = () => {
    setAddProject(true);
    setIsRunning(true);
  };

  const handleProjectUpdate = async (
    id: number,
    field: "creation_level" | "status",
    value: number,
  ) => {
    // ① UI更新（Optimistic Update）
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );

    try {
      // ② DB更新
      await updateProject(id, {
        [field]: value,
      });

      toast.success("更新しました");
    } catch (error) {
      console.error(error);
      toast.error("更新に失敗しました");
    }
  };

  return (
    <>
      {/* ヘッダー */}
      <div className="flex justify-around border-b border-gray-400 bg-white px-3 py-2 font-bold">
        {headerList.map((header, index) => (
          <Fragment key={header}>
            <p className="item-folder">{header}</p>
            {index !== headerList.length - 1 && <div className="border-r" />}
          </Fragment>
        ))}
      </div>

      {/* プロジェクト一覧 */}
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
            value={item.creation_level}
            onChange={(e) =>
              handleProjectUpdate(
                item.id,
                "creation_level",
                Number(e.target.value),
              )
            }
            className="input-box text-center"
          >
            <option value={1}>低</option>
            <option value={2}>中</option>
            <option value={3}>高</option>
          </select>

          <div className="border-r" />

          <select
            value={item.status}
            onChange={(e) =>
              handleProjectUpdate(item.id, "status", Number(e.target.value))
            }
            className="input-box text-center"
          >
            <option value={1}>New</option>
            <option value={2}>Active</option>
            <option value={3}>closed</option>
          </select>

          <div className="border-r" />

          <p className="item-folder">
            {formatDatetypeYYYYMMDDhhmm(item.created_at.toString())}
          </p>

          <div className="border-r" />

          <p className="item-folder">
            {formatDatetypeYYYYMMDDhhmm(item.updated_at.toString())}
          </p>
        </div>
      ))}

      {/* 追加フォーム */}
      {addProject ? (
        <div className="item-folder-frame select-item" ref={targetRef}>
          <input
            type="text"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="プロジェクト名"
          />

          <div className="border-r" />

          <select
            value={creationLevelValue}
            onChange={(e) => setCreationLevelValue(Number(e.target.value))}
            className="input-box text-center"
          >
            <option value={1}>低</option>
            <option value={2}>中</option>
            <option value={3}>高</option>
          </select>

          <div className="border-r" />

          <select
            value={statusValue}
            onChange={(e) => setStatusValue(Number(e.target.value))}
            className="input-box text-center"
          >
            <option value={1}>New</option>
            <option value={2}>Active</option>
            <option value={3}>closed</option>
          </select>

          <div className="border-r" />

          <p className="text-center w-32 flex items-center">{now}</p>

          <div className="border-r" />

          <p className="text-center w-32 flex items-center">{now}</p>
        </div>
      ) : (
        <div className="item-folder-frame" onClick={handleAddProject}>
          <img className="add-img" src={addImg} alt="" />
        </div>
      )}
    </>
  );
}
