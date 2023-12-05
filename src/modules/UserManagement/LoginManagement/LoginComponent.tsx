import { useEffect, useState } from "react";
import axios from "axios";
import http from "../../StoreManagement/utils/http";
import { LoginStyle } from "./style";
import ReactPlayer from "react-player";
import myVideo from "/Users/tjoeun/root-frontend/src/assest/pexels_videos_2330708 (720p).mp4";
// import myVideo from "/Users/tjoeun/Documents/GitHub/root-frontend/src/assest/pexels_videos_2330708 (720p).mp4";
import { flushSync } from "react-dom";
import { isLocalhost } from "./DomainUrl";

interface User {
  id: number;
  username: string;
  password: string;
}
function LoginComponent() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const serverAddress = isLocalhost();
  const [loginAddress, setLoginAddress] = useState("");

  useEffect(() => {
    setLoginAddress(serverAddress + "/auth/login");
  }, [serverAddress]);

  return (
    <LoginStyle>
      <video
        src={myVideo}
        autoPlay
        loop
        style={{
          zIndex: "-10",
          width: "100%",
          position: "absolute",
          height: "100%",
          filter: "brightness(70%)",
          objectFit: "cover",
        }}
      ></video>
      <div style={{ zIndex: "10" }}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: "10",
            padding: "100px",
            width: "60%",
            paddingBottom: "30px",
            borderRadius: "10px",
            marginBottom: "50px",

            display: "flex",
            flexDirection: "column",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              fontSize: "1.1rem",
              color: "white",
              position: "absolute",
              top: "0",
              left: "0",
              marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            <h1>CampAndTent</h1>
          </div>
          <form
            action={loginAddress}
            // action="http://192.168.100.151:8080/auth/login"
            method="POST"
            style={{ textAlign: "left" }}
          >
            <div style={{ marginBottom: "20px" }}>
              <label>
                <p style={{ marginBottom: "10px" }}>Username</p>
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
                <p style={{ marginBottom: "10px" }}>Password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button type="submit">Login</button>
            </div>
            <p>{message}</p>
          </form>
        </div>
        <div
          style={{
            zIndex: "40",
            fontSize: "3rem",
            color: "white",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontFamily: "GasoekOne-Regular",
          }}
        >
          <p style={{ marginBottom: "50px" }}>BACKOFFICE</p>
          <p>
            {/* <strong style={{ color: "#E54B4B" }}>Camp And Tent</strong> */}
          </p>
          <p style={{ marginTop: "20px" }}>
            <strong>SERVICE</strong>
          </p>
        </div>
      </div>
    </LoginStyle>
  );
}

export default LoginComponent;
