"use client";

import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import Loader from "../components/Loader";

export default function Priority() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = `http://20.207.122.201/evaluation-service/notifications?limit=${limit}`;
    if (type) url += `&notification_type=${type}`;

    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json.notifications || []);
        setLoading(false);
      });
  }, [limit, type]);

  const viewed = JSON.parse(localStorage.getItem("viewed") || "[]");

  return (
    <div className="container">
      <h2>Priority Notifications</h2>

      <label>Type:</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option value="Event">Event</option>
        <option value="Result">Result</option>
        <option value="Placement">Placement</option>
      </select>

      <br /><br />

      <label>Limit:</label>
      <input
        type="number"
        value={limit}
        min="1"
        max="20"
        onChange={(e) => setLimit(Number(e.target.value))}
      />

      <br /><br />

      {loading ? (
        <Loader />
      ) : (
        data.map((item: any) => (
          <NotificationCard
            key={item.id}
            item={item}
            viewed={viewed.includes(item.id)}
          />
        ))
      )}
    </div>
  );
}