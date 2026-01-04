import addImg from "../images/add.png";

const Detail = () => {
  return (
    <div className="flex">
      <div className="flex w-5/12 justify-around">
        <div>
          <div className="item-frame">
            <p className="item-text">フロントエンド開発</p>
          </div>
          <div className="item-frame">
            <p className="item-text">バックエンド</p>
          </div>
          <div className="item-add-frame">
            <img src={addImg} alt="" className="add-img" />
          </div>
        </div>
        <div>
          <div className="item-frame">
            <p className="item-text">フロント</p>
          </div>
          <div className="item-add-frame">
            <img src={addImg} alt="" className="add-img" />
          </div>
        </div>
      </div>
      <div className="detail">
        <div className="flex border-b border-gray-400 py-2 text-lg">
          <p className="mr-5">Description</p>
          <p>chatGPT</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
