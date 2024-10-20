// TODO: reccomendations for next song
// TODO: autocomplete
// TODO: find api for autocomplete

import { useEffect, useState } from "react";
import "./App.css";
import "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useParams } from "react-router-dom";

const Room = () => {
  const { id: roomId } = useParams();

  const [song, setSong] = useState<string>("My Eyes");
  const [artist, setArtist] = useState<string>("Travis Scott");
  const [lyricsForDisplay, setLyricsForDisplay] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<any>();
  const [queueIndex, setQueueIndex] = useState<number>(0);

  const getRoomData = async () => {
    const roomData = (await getDoc(doc(db, `rooms/${roomId}`))).data();
    setRoomData(roomData);
    console.log(roomData);
  };

  const queueSong = async (e: React.MouseEvent) => {
    e.preventDefault();
    const newQueue = [...roomData.queue, { song, artist }];
    const roomDoc = doc(db, `rooms/${roomId}`);
    setDoc(roomDoc, { queue: newQueue }, { merge: true });
  };

  const updateLyrics = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(
      `https://private-anon-943d09b474-lyricsovh.apiary-proxy.com/v1/${encodeURIComponent(
        roomData.queue[queueIndex].artist
      )}/${encodeURIComponent(roomData.queue[queueIndex].song)}`
    )
      .then((response) => response.json())
      .then((json) => {
        setLyricsForDisplay(json.lyrics.split("\n"));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    getRoomData().then(() => {
      console.log(roomData);
    });
  }, []);

  return (
    <>
      <div>
        <h2>{roomData?.name}</h2>
        <p>{JSON.stringify(roomData?.queue)}</p>
        <form>
          <div>
            <input
              type="text"
              value={song}
              onChange={(e) => {
                setSong(e.target.value);
              }}
              className="song-input"
              placeholder="Song"
            />
            <input
              type="text"
              value={artist}
              onChange={(e) => {
                setArtist(e.target.value);
              }}
              className="artist-input"
              placeholder="Artist"
            />
            <button onClick={(e) => queueSong(e)} type="submit">
              Add Song
            </button>
          </div>
          <div>
            <p>Currently Playing:</p>
            <p>
              {roomData?.queue[queueIndex].song} by{" "}
              {roomData?.queue[queueIndex].artist}
            </p>
            <button
              onClick={(e) => {
                if (queueIndex > 0) {
                  setQueueIndex(queueIndex - 1);
                  updateLyrics(e);
                }
              }}
            >
              Previous
            </button>
            <button
              onClick={(e) => {
                if (queueIndex < roomData.queue.length - 1) {
                  setQueueIndex(queueIndex + 1);
                  updateLyrics(e);
                }
              }}
            >
              Next
            </button>
          </div>
          <div>{loading && "Loading..."}</div>
          <div>
            {lyricsForDisplay &&
              lyricsForDisplay.map((line, index) => {
                return <p key={index}>{line}</p>;
              })}
          </div>
        </form>
      </div>
    </>
  );
};

export default Room;
