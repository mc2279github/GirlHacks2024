import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import "firebase/firestore";

const Home = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const roomExists = async (roomCode: string) => {
    const roomDoc = doc(db, `rooms/${roomCode}`);
    const querySnapshot = await getDoc(roomDoc);
    return querySnapshot.exists();
  };

  return (
    <div>
      Home
      <div>
        {/* <button>Create Room</button> */}
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button
          onClick={() => {
            if (roomCode.length === 0) {
              return;
            }
            roomExists(roomCode).then((exists) => {
              if (exists) {
                navigate(`/room/${roomCode}`);
              } else {
                setError("Room does not exist");
              }
            });
          }}
        >
          Join Room
        </button>
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Home;
