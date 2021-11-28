import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AddNote = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const { data, error } = useAuth();
  if (error) {
    router.push("/auth");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/addNote", {
        name,
        nameId: data?._id,
        phone,
        msg,
      });

      console.log(res.data.note);

      setName("");
      setMsg("");
      setPhone("");

      router.push("/");
    } catch (err) {
      console.log(err);
      throw new Error(err.response.data.msg);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Write a new note</h1>
        <label>Your Anonymous Name</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Someone Cool"
          required
        />

        <br />
        <br />
        <label>Targeted Number</label>
        <p className="small">
          {"No worries! The number won't be showed to public!"}
        </p>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+6281234567890"
          required
        />

        <br />
        <br />
        <label>Message</label>
        <br />
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Thank you for everything!"
          required
        />

        <br />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddNote;
