import { useParams } from "react-router";
import addImg from "../images/add.png";
import { itemUserStory, itemTask } from "~/data/item/testData";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [addUserStory, setAddUserStory] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const userStoryRef = useRef<HTMLDivElement>(null);
  const taskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      console.log("addPro", addUserStory);
      const handleUserStoryClick = (e: MouseEvent) => {
        if (!userStoryRef.current) return;
        if (userStoryRef.current.contains(e.target as Node)) return;
        setAddUserStory(false);
        toast.success("ユーザーストーリーを追加しました");
        console.log("外側クリック", addUserStory);
      };
      document.addEventListener("click", handleUserStoryClick);
      return () => {
        document.removeEventListener("click", handleUserStoryClick);
      };
    }, []);

    useEffect(() => {
      console.log("addPro", addTask);
      const handleTaskClick = (e: MouseEvent) => {
        if (!taskRef.current) return;
        if (taskRef.current.contains(e.target as Node)) return;
        setAddTask(false);
        toast.success("タスクを追加しました");
        console.log("外側クリック", addTask);
      };
      document.addEventListener("click", handleTaskClick);
      return () => {
        document.removeEventListener("click", handleTaskClick);
      };
    }, []);

  const userStoryList = itemUserStory
    .filter((item) => item.item_list_id === Number(id))
    .map((item) => item.user_story_name);

  const relatedUserStoryIds = itemUserStory
    .filter((item) => item.item_list_id === Number(id))
    .map((item) => item.id);

  const taskList = itemTask.filter((task) =>
    relatedUserStoryIds.includes(task.id)
  );

  const handleAddUserStory = () => {
    setAddUserStory(true);
  }

  const handleAddTask = () => {
    setAddTask(true);
  }

  return (
    <div className="flex w-5/12 justify-around">
      <div className="w-4/12">
        {userStoryList?.map((story, index) => (
          <div key={index} className="item-frame">
            <p className="item-text">{story}</p>
          </div>
        ))}
        {addUserStory ? (
          <div className="item-add-frame select-item" ref={userStoryRef}>
            <input type="text" className="input-box" />
          </div>
        ) : (
          <div className="item-add-frame" onClick={() => handleAddUserStory()}>
            <img src={addImg} alt="add" className="add-img" />
          </div>
        )}
      </div>

      <div className="w-4/12">
        {taskList?.map((task, index) => (
          <div key={index} className="item-frame">
            <p className="item-text">{task.task_name}</p>
          </div>
        ))}
        {addTask ? (
          <div className="item-add-frame select-item" ref={taskRef}>
            <input type="text" className="input-box" />
          </div>
        ) : (
          <div className="item-add-frame" onClick={() => handleAddTask()}>
            <img src={addImg} alt="add" className="add-img" />
          </div>
        )}
      </div>

      <div className="detail">
        <div className="flex border-b border-gray-400 py-2 text-lg">
          <p className="mr-5">Description</p>
          <p>chatGPT</p>
        </div>
        <div className="flex gap-3 text-lg h-full">
          <textarea className="border border-gray-400 mt-5 h-5/6 w-full" />
        </div>
      </div>
    </div>
  );
}
