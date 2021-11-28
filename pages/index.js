import Head from "next/head";
// +6281234560331
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/msg", {
        phone,
        message,
      });
      console.log(res);

      setPhone("");
      setMessage("");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const checkJwt = async () => {
    try {
      const res = await axios.get("/api/check");
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    checkJwt();
  }, []);

  return (
    <div>
      <h1>Main Page</h1>

      <form onSubmit={sendMessage}>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            type="tel"
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            required
            placeholder="Message"
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
