import { useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  password: string;
}

const dummyUsers: User[] = [
  { id: 1, username: "user1", password: "pass1" },
  { id: 2, username: "user2", password: "pass2" },
  { id: 3, username: "user3", password: "pass3" },
];

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
        const response = await axios.post("http://localhost:5500/auth/login", {
          username,
          password,
        });

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
      <div>
        <label>
          {" "}
          Username:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          {" "}
          Password:
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default LoginComponent;
