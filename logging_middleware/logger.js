// logger.js

const ALLOWED_STACKS = ["backend", "frontend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];

const ALLOWED_PACKAGES = [
  
  "cache","controller","cron_job","db","domain","handler",
  "repository","route","service","api","component","hook","page","state","style","auth","config","middleware","utils"
];

async function Log(stack, level, pkg, message, token) {
  try {
    if (!ALLOWED_STACKS.includes(stack)) throw new Error("Invalid stack");
    if (!ALLOWED_LEVELS.includes(level)) throw new Error("Invalid level");
    if (!ALLOWED_PACKAGES.includes(pkg)) throw new Error("Invalid package");

    const res = await fetch(
      "http://20.207.122.201/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          stack,
          level,
          package: pkg,
          message
        })
      }
    );

    return await res.json();

  } catch (err) {
    console.error("Logger Error:", err.message);
  }
}

export default Log;