import BottomNav from "../../components/BottomNav";

const Refer = () => {
  const referralCode = "YOUR_CODE"; // later fetch from backend

  const shareText = `Join CashTube & earn daily rewards! Use my code: ${referralCode}`;

  return (
    <div className="pb-16 min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Refer & Earn</h1>

      <div className="bg-white p-4 rounded shadow">
        <p>Your Referral Code</p>
        <h2 className="text-lg font-bold">{referralCode}</h2>

        <button
          onClick={() => navigator.clipboard.writeText(shareText)}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
        >
          Copy & Share
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Refer;
