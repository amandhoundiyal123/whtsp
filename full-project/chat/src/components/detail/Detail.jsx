import "./detail.css";

const Detail = ({ currentUser, selectedUser, onLogout }) => {
  return (
    <div className="detail">
      <div className="user">
        <img src={selectedUser?.avatar || "./avatar.png"} alt="" />
        <h2>{selectedUser?.username || "No chat selected"}</h2>
        <p>{selectedUser?.email || ""}</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy &amp; Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://i.pinimg.com/736x/d6/bf/80/d6bf80246a161e05b425f6b64549587c.jpg"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
