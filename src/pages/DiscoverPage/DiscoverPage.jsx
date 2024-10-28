import { useEffect, useState } from "react";
import { getUsers } from "../../services/users-services";
import Discover from "../../components/Discover/Discover";
import "./DiscoverPage.scss";
import { useParams } from "react-router-dom";

function DiscoversPage() {
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
    // To do - implement sort
  };

  return (
    <div className="discover">
      <div className="discover__controls">
        <input
          id="discover-search"
          className="discover__search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="discover__sort"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="name">Sort by Name</option>
          <option value="temperament">Sort by Temperament</option>
          <option value="distance">Sort by Distance</option>
        </select>
      </div>

      {users.length === 0 && (
        <div className="users-list__not-found">
          <p className="users-list__not-found-description">
            You're the first to register
          </p>
        </div>
      )}
      <div className="users__list">
        {users.map((user) => {
          if (user.id != id) {
            return (
              <Discover key={user.id} user={user} className="users__user" />
            );
          }
        })}
      </div>
    </div>
  );
}

export default DiscoversPage;
