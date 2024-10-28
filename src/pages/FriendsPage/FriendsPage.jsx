import { useEffect, useState } from "react";
import { getUsers } from "../../services/users-services";
import Friend from "../../components/Friend/Friend";
import "./FriendsPage.scss";
import { useParams } from "react-router-dom";

function FriendsPage(props) {
  const [users, setUsers] = useState([]);
  const id = localStorage.getItem("SavedId");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("name"); // Default sort option

  const fetchUser = async () => {
    const response = await getUsers();
    setUsers(response.data);
    return response.data;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // to do - implement sort
  };

  return (
    <div className="friends">
      <div className="friends__controls">
        <input
          id="friends-search"
          className="friends__search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="friends__sort"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="name" className="friends__sort friends__sort--option">
            Sort by Name
          </option>
          <option
            value="temperament"
            className="friends__sort friends__sort--temperament"
          >
            Sort by Temperament
          </option>
          <option
            value="distance"
            className="friends__sort friends__sort--distance"
          >
            Sort by Distance
          </option>
        </select>
      </div>

      {users.length === 0 && (
        <div className="users-list__not-found">
          <p className="users-list__not-found-description">
            You have no friends yet, find friends now!
          </p>
        </div>
      )}
      <div className="users__list">
        {users.map((user) => {
          if (user.id != id) {
            return <Friend key={user.id} user={user} className="users__user" />;
          }
        })}
      </div>
    </div>
  );
}

export default FriendsPage;
