import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // DEMO phân quyền
    if (username === "admin") {
      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("isAuth", "true");
      navigate("/admin");
    } else {
      localStorage.setItem("role", "LECTURER");
      localStorage.setItem("isAuth", "true");
      navigate("/lecturer");
    }
  };

  const handleGoogleLogin = () => {
    // demo Google login
    localStorage.setItem("role", "LECTURER");
    localStorage.setItem("isAuth", "true");
    navigate("/lecturer");
  };

  return (
    <div className="login-container">
      <div className="uth-text">UTH</div>

      <form className="login-box" onSubmit={handleSubmit}>
        <div className="login-logo">UTH SMD</div>
        <p className="subtitle">Syllabus Management & Digitalization System</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <div className="divider">or</div>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
