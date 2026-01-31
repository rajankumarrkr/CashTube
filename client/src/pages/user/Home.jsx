import { useEffect, useState } from "react";
import { getTodayVideo, claimReward } from "../../services/videoService";
import api from "../../services/api";
import BottomNav from "../../components/BottomNav";
import { RefreshCw } from "lucide-react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [timer, setTimer] = useState(15); // Increased to 15s for better engagement
  const [watching, setWatching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);

  // Load wallet balance from localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet");
    if (savedWallet) {
      try {
        setWalletBalance(JSON.parse(savedWallet));
      } catch (err) {
        console.error("Wallet parse error:", err);
      }
    }
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTodayVideo();
      if (res.data.success) {
        setTasks(res.data.tasks);
      } else {
        setMessage(res.data.message || "Something went wrong while fetching tasks");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Failed to load tasks";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Basic connectivity check
    api.get("/health").then(() => console.log("API Reachable")).catch(err => console.error("API Unreachable:", err));
    fetchTasks();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (watching && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [watching, timer]);

  // Start watching a task
  const startWatching = (task) => {
    setActiveTaskId(task._id);
    setTimer(15);
    setWatching(true);
    window.open(task.youtubeUrl, "_blank");
  };

  // Claim reward for a specific task
  const handleClaim = async (videoId) => {
    try {
      const res = await claimReward(videoId);
      if (res.data.success) {
        setWalletBalance(res.data.walletBalance);
        localStorage.setItem("wallet", JSON.stringify(res.data.walletBalance));
        setMessage("₹1 credited successfully!");
        setWatching(false);
        setActiveTaskId(null);
        // Refresh tasks to update completion status
        fetchTasks();

        // Clear success message after 3s
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Claim error:", err);
      setMessage(err.response?.data?.message || "Claim failed");
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-slate-50 font-sans">
      {/* Header / Wallet Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-100 text-sm">Welcome Back</p>
            <h1 className="text-2xl font-bold">CashTube Tasks</h1>
          </div>
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl text-right">
            <p className="text-xs text-blue-100 uppercase tracking-wider">Wallet Balance</p>
            <p className="text-xl font-bold">₹{walletBalance}</p>
          </div>
        </div>
      </div>

      <div className="px-4">
        {message && (
          <div className={`mb-6 p-4 rounded-2xl flex flex-col items-center gap-2 text-center font-bold shadow-sm animate-in fade-in slide-in-from-top-4 duration-300 ${message.toLowerCase().includes("unauthorized") || message.toLowerCase().includes("failed") || message.toLowerCase().includes("invalid")
              ? "bg-red-50 text-red-600 border border-red-100"
              : "bg-green-50 text-green-600 border border-green-100"
            }`}>
            <p>{message}</p>
            {message.toLowerCase().includes("unauthorized") && (
              <button
                onClick={() => {
                  localStorage.removeItem("userToken");
                  window.location.href = "/login";
                }}
                className="mt-2 text-xs bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-100"
              >
                Log Out & Log In Again
              </button>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800">Daily Tasks (₹1 Each)</h2>
            <button
              onClick={fetchTasks}
              className={`p-1 text-slate-400 hover:text-blue-600 transition-all ${loading ? "animate-spin" : ""}`}
              title="Refresh Tasks"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">
            {tasks.filter(t => t.isCompleted).length}/{tasks.length} Completed
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <p className="text-slate-500">No tasks available today. Check back later!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task, index) => (
              <div
                key={task._id}
                className={`bg-white p-4 rounded-2xl shadow-sm border ${task.isCompleted ? "border-green-100 bg-green-50/30" : "border-slate-100"}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${task.isCompleted ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 leading-tight">{task.title}</h3>
                      <p className="text-xs text-slate-500">Reward: ₹1</p>
                    </div>
                  </div>
                  {task.isCompleted && (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold uppercase tracking-tighter">
                      Completed
                    </span>
                  )}
                </div>

                {activeTaskId === task._id && watching ? (
                  <div className="mt-2">
                    {timer > 0 ? (
                      <div className="w-full bg-slate-100 rounded-full h-10 flex items-center justify-center relative overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-1000"
                          style={{ width: `${(15 - timer) / 15 * 100}%` }}
                        ></div>
                        <span className="relative z-10 font-bold text-slate-700">Watching... {timer}s</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaim(task._id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
                      >
                        Claim ₹1 Reward
                      </button>
                    )}
                  </div>
                ) : (
                  !task.isCompleted && (
                    <button
                      onClick={() => startWatching(task)}
                      disabled={watching && activeTaskId !== task._id}
                      className={`w-full py-3 rounded-xl font-bold transition-all ${watching && activeTaskId !== task._id
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95"
                        }`}
                    >
                      Watch & Earn
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
