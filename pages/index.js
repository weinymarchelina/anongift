import Link from "next/link";
import { useUser } from "../context/Context";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [myNotes, setMyNotes] = useState(null);
  const [myTab, setMyTab] = useState(false);
  const [data, setData] = useUser();
  const [create, setCreate] = useState(null);
  const [forMe, setForMe] = useState(false);
  const router = useRouter();

  const getNotes = async () => {
    try {
      const res = await axios.get("/api/notes");
      console.log(res);

      const { notes, user } = res.data;

      setNotes(notes);
      setData(user);

      const mine = notes.filter((note) => {
        return note.targetedPhone === user.phone;
      });
      setMyNotes(mine);

      const mineToo = notes.filter((note) => {
        return note.nameId === user._id;
      });
      setCreate(mineToo);
    } catch (error) {
      console.log(error.response.data);
      router.push("/auth");
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/logout");
      router.push("/auth");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="Auth body note">
      <h1>Notes</h1>
      {data && <p>Hi {data?.name}, take a look at all the notes!</p>}
      {/* <button>
        <Link href="/addNote">Add new note</Link>
      </button> */}
      <button
        onClick={() => {
          setMyTab(false);
        }}
      >
        Get all notes
      </button>
      <button
        onClick={() => {
          setMyTab(true);
          setForMe(true);
        }}
      >
        Search notes for me
      </button>
      <button
        onClick={() => {
          setMyTab(true);
          setForMe(false);
        }}
      >
        Search my notes
      </button>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>

      {!myTab && (
        <div>
          <h2>All created notes</h2>
          {notes.map((note) => {
            return (
              <li key={note._id}>
                <p className="bigger">{note.text}</p>
                <p className="smaller">From {note.name}</p>
              </li>
            );
          })}
        </div>
      )}

      {myTab && forMe && (
        <div>
          <h2>Notes for me</h2>
          {myNotes.map((note) => {
            return (
              <li key={note._id}>
                <p className="bigger">{note.text}</p>
                <p className="smaller">From {note.name}</p>
              </li>
            );
          })}
        </div>
      )}

      {myTab && !forMe && (
        <div>
          <h2>My notes</h2>
          {create.map((note) => {
            return (
              <li key={note._id}>
                <p className="bigger">{note.text}</p>
                <p className="smaller">From {note.name}</p>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
}
