import React from 'react';
import DEMO_CARD from '../../assets/images/car.png';
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Left: Form Section */}
<div className="w-full md:w-[75vw] px-8 sm:px-12 flex flex-col justify-center">

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-violet-500 mb-1">Expense Tracker</h2>
          <p className="text-sm text-gray-400 mb-6">Track. Save. Grow.</p>
          {children}
        </div>
      </div>

      {/* Right: Visual Side */}
<div className="hidden md:flex w-[25vw] h-full relative items-start justify-start overflow-hidden bg-gradient-to-br from-purple-900 to-black">

        {/* Neon shapes */}
        <div className="absolute w-60 h-60 bg-purple-700 rounded-[40px] top-[-40px] left-[-30px] rotate-12 opacity-60 blur-md" />
        <div className="absolute w-56 h-64 border-[16px] border-fuchsia-500 rounded-[40px] top-[25%] right-4 rotate-12 blur-sm opacity-80" />
        <div className="absolute w-60 h-60 bg-violet-600 rounded-[40px] bottom-[-30px] left-[-30px] rotate-12 blur-md opacity-70" />

      {/* Group Card + Image Together */}
{/* <div className="absolute top-12 left-12 z-30 flex flex-col items-start space-y-6">
  <StatsInfoCard
    icon={<LuTrendingUpDown />}
    label="Track your expenses"
    value="430,000"
    color="bg-violet-600"
    text="text-white"
  />

  {/* <img
    src={DEMO_CARD}
    alt="demo card"
    className="w-[200px] lg:w-[250px] drop-shadow-[0_8px_30px_rgba(138,43,226,0.5)]"
  /> */}
{/* </div> */}


      </div>
    </div>
  );
};

const StatsInfoCard = ({ icon, label, value, color, text = "text-white" }) => {
  return (
    <div className={`flex items-center gap-4 bg-black/40 backdrop-blur-lg p-4 rounded-xl border border-violet-600 w-72`}>
      <div className={`w-12 h-12 flex items-center justify-center text-xl text-white ${color} rounded-full shadow-md`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        <p className={`text-lg font-semibold ${text}`}>${value}</p>
      </div>
    </div>
  );
};

export default AuthLayout;
