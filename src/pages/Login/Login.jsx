import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    try {
      axios
        .post("http://localhost:8000/users/login", { email, password })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.data);
            toast.success(response.data.message);
            navigate("/groceriesItems");
          }
        })
        .catch((error) => {
          console.log(error);
          if (!error.response) {
            return toast.error(error.message);
          }
          if (!error.response.data.success) {
            toast.error(error.response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div className="form-body">
        <b className="login-text text-gray-300">LOGIN</b>
        <div className="input-container w-[475px] h-[72px]">
          <input type="text" placeholder="EMAIL" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container  w-[475px] h-[72px]">
          <input
            type="password"
            placeholder="PASSWORD"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitHandler();
              }
            }}
          />
        </div>
        <div className="submit-button" onClick={submitHandler}>
          <b className="">SUBMIT</b>
        </div>
        <div className="forgot-password">
          <div className=" opacity-[0.6]">REGISTER</div>
          <div className=" opacity-[0.6]">FORGOT PASSWORD</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
