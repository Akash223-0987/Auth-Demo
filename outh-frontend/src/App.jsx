import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
  "http://localhost:5000/auth/google",
  { token: credentialResponse.credential },
  { withCredentials: true }
);


      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {!user ? (
        <>
          <h2>Login with Google</h2>
          <GoogleLogin onSuccess={handleSuccess} />
        </>
      ) : (
        <h2>✅ Login Successful, Welcome {user.name}</h2>
      )}
    </div>
  );
}

export default App;
