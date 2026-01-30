import { useEffect, useState } from "react";
import { getTodayVideo, claimReward } from "../../services/videoService";
import BottomNav from "../../components/BottomNav";

const Home = () => {
  const [video, setVideo] = useState(null);
  const [timer, setTimer] = useState(10);
  const [watching, setWatching] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 Fetch today's task status + video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getTodayVideo();

        // 🔐 Backend-driven truth
        if (res.data.todayTaskCompleted) {
          setTaskCompleted(true);
          return;
        }

        setVideo(res.data.video);
      } catch (err) {
        setMessage("No video available today");
      }
    };

    fetchVideo();
  }, []);

  // ⏱️ Timer logic
  useEffect(() => {
    let interval;
    if (watching && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [watching, timer]);

  // ▶️ Start watching
  const startWatching = () => {
    if (!video) return;
    window.open(video.youtubeUrl, "_blank");
    setWatching(true);
  };

  // 💰 Claim reward
  const handleClaim = async () => {
  try {
    const res = await claimReward();

    console.log("CLAIM RESPONSE 👉", res.data); // 🔥 DEBUG

    const balanceFromBackend = res.data.walletBalance;

    if (typeof balanceFromBackend === "number") {
      localStorage.setItem(
        "wallet",
        JSON.stringify(balanceFromBackend)
      );
    } else {
      console.error("walletBalance missing in response");
    }

    setMessage(res.data.message || "Reward credited");
    setTaskCompleted(true);
    setVideo(null);
  } catch (err) {
    console.error("CLAIM ERROR 👉", err.response?.data);

    if (err.response?.data?.message === "Reward already claimed today") {
      setTaskCompleted(true);
    } else {
      setMessage("Claim failed");
    }
  }
};


  return (
    <div className="pb-16 min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Today's Task</h1>

      {/* ✅ TASK COMPLETED */}
      {taskCompleted && (
        <div className="bg-green-100 text-green-700 p-4 rounded text-center font-semibold">
          ✅ Today’s task completed
        </div>
      )}

      {/* 🎥 VIDEO CARD */}
      {!taskCompleted && video && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">{video.title}</h2>

          {!watching ? (
            <button
              onClick={startWatching}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Watch Video
            </button>
          ) : timer > 0 ? (
            <p className="text-center text-lg">Wait {timer}s...</p>
          ) : (
            <button
              onClick={handleClaim}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Claim ₹5
            </button>
          )}
        </div>
      )}

      {/* ℹ️ INFO MESSAGE */}
      {message && !taskCompleted && (
        <p className="text-center mt-4 text-red-600">{message}</p>
      )}

      <BottomNav />
    </div>
  );
};

export default Home;
