import fetch from "node-fetch";
const API_URL = "http://20.207.122.201/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJraHVzaGkuMjYwODRAZ2duaW5kaWEuZHJvbmFjaGFyeWEuaW5mbyIsImV4cCI6MTc3Nzg3NTIyOCwiaWF0IjoxNzc3ODc0MzI4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNWU1MTYxYmYtM2E3My00MDI5LTgwZDctZTRlNDAwYzY4ZGYwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2h1c2hpIGFnZ2Fyd2FsIiwic3ViIjoiZTA5N2IxM2MtNzJmMC00ZGE4LWJmYTUtZjU2MDBhN2FjZmFmIn0sImVtYWlsIjoia2h1c2hpLjI2MDg0QGdnbmluZGlhLmRyb25hY2hhcnlhLmluZm8iLCJuYW1lIjoia2h1c2hpIGFnZ2Fyd2FsIiwicm9sbE5vIjoiMjYwODQiLCJhY2Nlc3NDb2RlIjoidWtzZFdUIiwiY2xpZW50SUQiOiJlMDk3YjEzYy03MmYwLTRkYTgtYmZhNS1mNTYwMGE3YWNmYWYiLCJjbGllbnRTZWNyZXQiOiJZYVhWSHFyR2NOYXdCZVJFIn0.lIKasWz1-Ckzwp9Iyf2lwHZixgKdwr7o2jUfJorcv6k";   // Replace with fresh login token
const TOP_N = 10;

const WEIGHTS = {
    Placement: 3,
    Result: 2,
    Event: 1
};
async function fetchNotifications() {
    try {
        const res = await fetch(API_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });

        if (!res.ok) {
            console.log("Error fetching notifications:", await res.text());
            return [];
        }

        const data = await res.json();
        return data.notifications;
    } catch (err) {
        console.error("Fetch Error:", err.message);
        return [];
    }
}

function scoreNotification(noti) {
    const weight = WEIGHTS[noti.Type] || 0;
    const time = new Date(noti.Timestamp).getTime();

    return weight * 1_000_000_000_000 + time;
}
function getTop(notifications, n = TOP_N) {
    return notifications
        .sort((a, b) => scoreNotification(b) - scoreNotification(a))
        .slice(0, n);
}

function display(notifications) {
    console.log("\n=== TOP PRIORITY NOTIFICATIONS ===\n");
    notifications.forEach((n, i) => {
        console.log(
            `${i + 1}. [${n.Type}] ${n.Message} — ${n.Timestamp}`
        );
    });
}
async function main() {
    console.log("Fetching notifications...");
    const notifications = await fetchNotifications();

    if (!notifications.length) {
        console.log("No notifications found.");
        return;
    }

    const top = getTop(notifications, TOP_N);
    display(top);
}

main();