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

  return (
    <div>
      <h1>Login</h1>
      <form action="http://192.168.100.152:5500/auth/login" method="POST">
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
