import { useState } from "react";
import axios from "axios";
import http from "../../../utils/http";

interface User {
  id: number;
  username: string;
  password: string;
}

function LoginComponent() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async () => {
    const user = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      try {
        const response = await axios.post(
          "http://192.168.100.152:5500/auth/login",
          {
            username,
            password,
          }
        );

        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.token);
          const token = response.data;
          window.location.href = "/home";
        } else {
          setMessage(response.data.message || "Login failed");
        }
      } catch (error) {
        setMessage("Error during authentication.");
      }
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form action="http://localhost:5500/auth/login" method="POST">
        <div>
          <label>
            {" "}
            Username :
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Password :
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default LoginComponent;
