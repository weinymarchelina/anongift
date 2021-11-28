import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [tab, setTab] = useState(false);
  const [OTP, setOTP] = useState("");
  const [name, setName] = useState("");

  const getOTP = async (e) => {
    e.preventDefault();

    try {
      setTab(true);
      const res = await axios.post("/api/login", {
        phone,
      });
      console.log(res);
    } catch (error) {
      console.log(error.response);
      throw new Error(error.response);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    try {
      setTab(true);
      const res = await axios.post("/api/verify", {
        code: OTP,
        phone,
        name,
      });

      const newRes = await axios.post("/api/token", {
        uid: res.data.user._id,
      });

      if (newRes.data.message) {
        setName("");
        setPhone("");
        setOTP("");
        router.push("/");
      }
    } catch (error) {
      console.log("Error here: ");
      console.log(error.response.data);
      throw new Error(error);
    }
  };
  return (
    <div className="Auth body oke">
      <h1>Login Page</h1>

      <form onSubmit={getOTP}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="John Deacon"
            required
          />

          <br />
          <br />
          <br />

          <label htmlFor="phone">Phone Number</label>
          <br />
          <input
            onChange={(e) => {
              setPhone(e.target.value);
              setTab(false);
            }}
            placeholder="+6281234567890"
            type="tel"
            required
          />
        </div>

        <br />

        {!tab && <button type="submit">Send</button>}
      </form>

      {tab && (
        <form onSubmit={verifyOTP}>
          <br />
          <label htmlFor="">OTP Code</label>
          <br />

          <input
            onChange={(e) => setOTP(e.target.value)}
            placeholder="OTP Code"
            required
          />
          <br />
          <br />
          <br />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default Auth;
