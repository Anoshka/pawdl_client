import { useEffect, useState } from "react";
import { getUsers } from "../../services/users-services";
import Friend from "../../components/Friend/Friend";
import "./FriendsPage.scss";
import { useParams } from "react-router-dom";

function FriendsPage() {
  const [users, setUsers] = useState([]);
  const id = localStorage.getItem("SavedId");

  const fetchUser = async () => {
    const response = await getUsers();
    setUsers(response.data);
    return response.data;
  };

  useState(() => {
    const data = fetchUser();
  }, []);

  return (
    <div>
      {users.length === 0 && (
        <div className="users-list__not-found">
          <p className="users-list__not-found-description">
            You have no friends yet, find friends now!
          </p>
        </div>
      )}
      <div className="users__list">
        {users.map((user) => {
          if (user.id != id)
            return <Friend key={user.id} user={user} className="users__user" />;
        })}
      </div>
    </div>
  );
}

export default FriendsPage;
