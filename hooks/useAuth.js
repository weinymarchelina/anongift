import { useState, useEffect } from "react";
import { useUser } from "../context/Context";
import axios from "axios";

const useAuth = () => {
  const [data, setData] = useUser();
  const [error, setError] = useState(false);

  const checkJwt = async () => {
    try {
      const res = await axios.get("/api/check");
      console.log(res);
      console.log(res.data);
      console.log(res.data.user);

      setData(res.data.user);
    } catch (error) {
      console.log(error.response.data);
      setError(true);
      //   router.push("/auth");
    }

    // console.log(data);
  };

  useEffect(() => {
    checkJwt();
  }, []);

  return {
    data,
    error,
  };
};

export default useAuth;
