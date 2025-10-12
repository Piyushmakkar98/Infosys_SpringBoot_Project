import { useState } from "react";
import axios from "axios";

function ResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return; // Prevent spam

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/auth/forgot-password", { email });
      setMessage(res.data.message);

      // Start cooldown (e.g., 30 seconds)
      setCooldown(30);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading || cooldown > 0}>
          {cooldown > 0 ? `Wait ${cooldown}s` : "Send Reset Link"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetRequest;
