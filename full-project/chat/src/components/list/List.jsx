import "./list.css";
import Userinfo from "./userinfo/Userinfo";
import ChatList from "./chatList/ChatList";

const List = ({ currentUser, selectedUser, setSelectedUser }) => {
  return (
    <div className="list">
      <Userinfo currentUser={currentUser} />
      <ChatList
        currentUser={currentUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default List;
