// AdminAuth.js
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase"; // <-- firebase.js se import auth
import RSVPTable from "./RSVPTable";

const REQUIRED_ADMIN_EMAIL = "email-eventplan33@gmail.com";

function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === REQUIRED_ADMIN_EMAIL) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.email !== REQUIRED_ADMIN_EMAIL) {
        await signOut(auth);
        setError("Unauthorized access.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid Email or Password. Please try again.");
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  if (loading) return <div className="text-center p-8">Checking authentication...</div>;

  if (user) return (
    <div className="p-4">
      <div className="text-right mb-4">
        <span className="mr-4 text-sm text-gray-600">Logged in as: {user.email}</span>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Logout
        </button>
      </div>
      <RSVPTable />
    </div>
  );

  return (
    <div className="flex justify-center items-center py-20 bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-serif font-bold mb-8 text-center text-gray-800">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <div className="mb-4">
          <label htmlFor="admin-email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-black focus:border-black transition" required />
        </div>
        <div className="mb-6">
          <label htmlFor="admin-password" className="block text-gray-700 font-semibold mb-2">Password</label>
          <input type="password" id="admin-password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:ring-black focus:border-black transition" required />
        </div>
        <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
          disabled={!email || !password}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminAuth;
