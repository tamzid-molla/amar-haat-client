import React from "react";

const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className={`rounded-lg shadow-md p-6 text-white ${color} flex flex-col justify-center items-center`}>
      <div className="text-5xl mb-3 opacity-80">
        <Icon />
      </div>
      <p className="text-sm font-semibold uppercase tracking-wide">{title}</p>
      <p className="text-3xl font-bold mt-2">{value ?? 0}</p>
    </div>
  );
};

export default StatCard;
