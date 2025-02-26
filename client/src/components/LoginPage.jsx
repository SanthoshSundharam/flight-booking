import { useState } from "react";

function LoginPage() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
  });

  return (
    <>
      <h1>Login Page</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => {
          setUserDetails((prev) => ({ ...prev, username: e.target.value }));
        }}
      ></input>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => {
          setUserDetails((prev) => ({ ...prev, email: e.target.value }));
        }}
      ></input>
      <h1>username : {userDetails.username}</h1>
      <h1>email: {userDetails.email}</h1>
    </>
  );
}

export default LoginPage;
