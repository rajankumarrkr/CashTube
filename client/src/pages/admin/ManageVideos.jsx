import { useEffect, useState } from "react";
import {
  getAllVideos,
  addVideo,
  toggleVideo,
} from "../../services/adminVideoService";

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const fetchVideos = async () => {
    const res = await getAllVideos();
    setVideos(res.data.videos);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAdd = async () => {
    if (!title || !youtubeUrl) return;

    await addVideo({ title, youtubeUrl });
    setTitle("");
    setYoutubeUrl("");
    fetchVideos();
  };

  const handleToggle = async (id) => {
    await toggleVideo(id);
    fetchVideos();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Videos</h2>

      {/* Add Video */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Video
        </button>
      </div>

      {/* Video List */}
      {videos.map((v) => (
        <div
          key={v._id}
          className="bg-gray-100 p-3 rounded mb-2 flex justify-between"
        >
          <div>
            <p className="font-semibold">{v.title}</p>
            <p className="text-sm">{v.youtubeUrl}</p>
          </div>
          <button
            onClick={() => handleToggle(v._id)}
            className={`px-3 py-1 rounded ${
              v.isActive ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            {v.isActive ? "Active" : "Inactive"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageVideos;
