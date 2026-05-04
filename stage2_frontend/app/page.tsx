"use client";

import { useEffect, useState } from "react";
import NotificationCard from "./components/NotificationCard";
import Loader from "./components/Loader";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://20.207.122.201/evaluation-service/notifications?limit=20&page=1"
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.notifications || []);
        setLoading(false);
      });
  }, []);

  const viewed = JSON.parse(localStorage.getItem("viewed") || "[]");

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h2>All Notifications</h2>

      {data.map((item: any) => (
        <NotificationCard
          key={item.id}
          item={item}
          viewed={viewed.includes(item.id)}
        />
      ))}
    </div>
  );
}