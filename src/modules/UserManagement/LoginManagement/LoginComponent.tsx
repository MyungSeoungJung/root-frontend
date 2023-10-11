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
        const token = response.data.token; // 서버에서 반환하는 필드 이름에 따라 수정
        const protectedResponse = await axios.get(
          "http://localhost:5500/auth/login",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(protectedResponse.data.message);
      } catch (error) {
        setMessage("Error during authentication.");
      }
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default LoginComponent;
