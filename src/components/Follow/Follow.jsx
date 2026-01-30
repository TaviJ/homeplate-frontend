import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getMyFollowing, getMyFollowers } from "../../services/followService";
import "./Follow.css";

export default function Followers() {
  const { user } = useContext(UserContext);

  const [tab, setTab] = useState("followers"); 
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const username = user?.username || "User";
  const initial = username.charAt(0).toUpperCase();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const data = tab === "followers"
          ? await getMyFollowers()
          : await getMyFollowing();

        
        const list =
          tab === "followers"
            ? (data?.followers || data || [])
            : (data?.following || data || []);

       
        const normalized = Array.isArray(list)
          ? list.map((item) => item.follower || item.following || item)
          : [];

        setUsers(normalized);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [tab]);

  const filteredUsers = users.filter((u) =>
    (u?.username || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="followers-bg"> 
    <main className="followers-page">
      <section className="profile-header">
        <div className="avatar">{initial}</div>
        <h2>{username}</h2>
        
      </section>

      <section className="follow-tabs">
        <button
          className={tab === "followers" ? "active" : ""}
          onClick={() => setTab("followers")}
          type="button"
        >
          {tab === "followers" ? <strong>{users.length}</strong> : users.length} Followers
        </button>

        <button
          className={tab === "following" ? "active" : ""}
          onClick={() => setTab("following")}
          type="button"
        >
          {tab === "following" ? <strong>{users.length}</strong> : users.length} Following
        </button>

        <div className="search-wrap">
  <input
    type="text"
    placeholder="Search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button className="search-btn" type="button">Search</button>
</div>
      </section>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && filteredUsers.length === 0 && (
        <p className="empty">
          {tab === "followers" ? "No followers yet." : "Not following anyone yet."}
        </p>
      )}

      <section className="user-list">
        {filteredUsers.map((u) => (
          <div className="user-card" key={u?._id || u?.id}>
            <div className="user-info">
              <div className="avatar small">
                {(u?.username || "U").charAt(0).toUpperCase()}
              </div>
              <div>
                <strong>{u?.username || "Unknown"}</strong>
                <p>Lorem ipsum dolor sit amet, consecte</p>
              </div>
            </div>
          </div>
        ))}
      </section>
      
    </main>
    </div>
  );
}
