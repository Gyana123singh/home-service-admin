import React from "react";

export default function WelcomeCard() {
  return (
    <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 shadow-lg">
      <p className="text-sm opacity-90 mb-2">Good afternoon</p>
      <h2 className="text-4xl font-bold mb-4">Hi, Wrteam</h2>
      <p className="text-sm opacity-90">View Your Current Sales & Summary.</p>
    </div>
  );
}
