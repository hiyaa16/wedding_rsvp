import React from "react";
import { Link } from "react-router-dom";
import { UserCog } from "lucide-react"; // Admin profile icon

function AdminButton() {
  return (
    <Link
      to="/rsvp-table"
      className="fixed bottom-4 right-16 text-white hover:text-pink-500 transition-transform duration-300 hover:scale-110 z-50"
      title="Admin Panel"
    >
      <UserCog size={26} strokeWidth={2.2} />
    </Link>
  );
}

export default AdminButton;
