import { useParams } from "react-router";
import addImg from "../images/add.png";
import { itemUserStory, itemTask } from "~/data/item/testData";
import { useEffect } from "react";

export default function Detail() {
  const { id } = useParams<{ id: string }>();

  const userStoryList = itemUserStory
    .filter((item) => item.item_list_id === Number(id))
    .map((item) => item.user_story_name);

  const relatedUserStoryIds = itemUserStory
    .filter((item) => item.item_list_id === Number(id))
    .map((item) => item.id);

  const taskList = itemTask.filter((task) =>
    relatedUserStoryIds.includes(task.id)
  );

  useEffect(() => {
    console.log("useEffect内のログ detail");
  }, []);

  return (
    <div className="flex w-5/12 justify-around">
      <div className="w-4/12">
        {userStoryList?.map((story, index) => (
          <div key={index} className="item-frame">
            <p className="item-text">{story}</p>
          </div>
        ))}
        <div className="item-add-frame">
          <img src={addImg} alt="add" className="add-img" />
        </div>
      </div>

      <div className="w-4/12">
        {taskList?.map((task, index) => (
          <div key={index} className="item-frame">
            <p className="item-text">{task.task_name}</p>
          </div>
        ))}
        <div className="item-add-frame">
          <img src={addImg} alt="add" className="add-img" />
        </div>
      </div>

      <div className="detail">
        <div className="flex border-b border-gray-400 py-2 text-lg">
          <p className="mr-5">Description</p>
          <p>chatGPT</p>
        </div>
        <div className="flex gap-3 text-lg">
          {taskList?.map((task, index) => (
            <p key={index} className="mr-5">
              {task.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
