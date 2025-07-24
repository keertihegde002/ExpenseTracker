import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      {label && <label className='block mb-1 text-sm font-medium text-gray-700'>{label}</label>}
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          className="input-box" // ✅ USE YOUR TAILWIND STYLED CLASS
        />
        {type === 'password' && (
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEye size={20} className="text-primary" />
            ) : (
              <FaRegEyeSlash size={20} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input;
