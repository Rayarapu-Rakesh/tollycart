import React, { useEffect, useRef, useState } from 'react';
import ProfileCard from './ProfileCard';

const ProfileDropdown = ({ onClose }) => {
  const dropdownRef = useRef();

  const [tab, setTab] = useState('login');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpTimestamp, setOtpTimestamp] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    mobile : '',
    email  : '',
    gender : '',
    address: ''
  });

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(sessionStorage.getItem('user')) ||
    null
  );

  /* ──────────────── click outside to close ──────────────── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  /* ──────────────── validation helpers ──────────────── */
  const validateLogin = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Valid 10-digit mobile is required';
    return newErrors;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!formData.username.trim())        newErrors.username = 'Full name is required';
    if (!/^\d{10}$/.test(formData.mobile))newErrors.mobile   = 'Valid 10-digit mobile required';
    if (!formData.gender)                 newErrors.gender   = 'Gender is required';
    if (!formData.address.trim())         newErrors.address  = 'Address is required';
    if (!formData.email.trim())           newErrors.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
                                          newErrors.email    = 'Invalid email format';
    return newErrors;
  };

  /* ──────────────── OTP helpers ──────────────── */
  const simulateSendOtp = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    setOtpTimestamp(Date.now());
    setOtpSent(true);
    alert(`OTP sent to ${formData.mobile}: ${generatedOtp}`);  // ✅ fixed template literal
  };

  const isOtpExpired = () =>
    !otpTimestamp || Date.now() - otpTimestamp > 2 * 60 * 1000; // 2 min

  /* ──────────────── registration ──────────────── */
  const handleRegister = () => {
    const validationErrors = validateRegister();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some((u) => u.mobile === formData.mobile)) {
      setErrors({ mobile: 'Mobile number already registered' });
      return;
    }

    const updatedUsers = [...existingUsers, { ...formData }];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setFormData({ username: '', mobile: '', email: '', gender: '', address: '' });
    setErrors({});
    setTab('login');
    alert('Registration successful! Please login.');
  };

  /* ──────────────── login ──────────────── */
  const handleLogin = () => {
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    if (!otpSent || isOtpExpired()) {
      simulateSendOtp();
      return;
    }

    if (enteredOtp !== otp) {
      setErrors({ otp: 'Incorrect OTP' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matched = users.find(
      (u) => u.username === formData.username && u.mobile === formData.mobile
    );

    if (!matched) {
      setErrors({ general: 'Invalid login details. Please register first.' });
      return;
    }

    setLoggedInUser(matched);
    if (rememberMe) localStorage.setItem('user', JSON.stringify(matched));
    else            sessionStorage.setItem('user', JSON.stringify(matched));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setOtpSent(false);
    setOtp('');
    setEnteredOtp('');
    setOtpTimestamp(null);
    setFormData({ username: '', mobile: '', email: '', gender: '', address: '' });
    setTab('login');
    setErrors({});
  };

  /* ──────────────── render ──────────────── */
  if (loggedInUser) {
    return <ProfileCard user={loggedInUser} onLogout={handleLogout} editable />;
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-14 right-2 z-50 w-80 rounded-lg bg-white p-4 shadow-xl"
    >
      {/* tabs */}
      <div className="mb-3 flex justify-around">
        <button
          onClick={() => { setTab('login'); setErrors({}); }}
          className={`py-1 ${tab === 'login' ? 'font-bold underline' : ''}`}
        >
          Login
        </button>
        <button
          onClick={() => { setTab('register'); setErrors({}); }}
          className={`py-1 ${tab === 'register' ? 'font-bold underline' : ''}`}
        >
          Register
        </button>
      </div>

      {errors.general && (
        <p className="mb-2 text-center text-xs text-red-500">{errors.general}</p>
      )}

      {/* forms */}
      <div className="space-y-2">
        {tab === 'login' ? (
          <>
            {/* username + mobile */}
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded border px-3 py-1"
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}

            <input
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full rounded border px-3 py-1"
            />
            {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}

            {/* OTP input */}
            {otpSent && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-full rounded border px-3 py-1"
                />
                {errors.otp && <p className="text-xs text-red-500">{errors.otp}</p>}
              </>
            )}

            {/* remember me */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="text-sm">Remember me</label>
            </div>

            {/* login / send otp button */}
            <button
              onClick={handleLogin}
              className="w-full rounded bg-purple-600 py-2 text-white"
            >
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            {/* register fields */}
            <input
              type="text"
              placeholder="Full Name"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded border px-3 py-1"
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}

            <input
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full rounded border px-3 py-1"
            />
            {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}

            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full rounded border px-3 py-1"
            >
              <option value="">Select Gender</option>
              <option value="Male"  >Male</option>
              <option value="Female">Female</option>
              <option value="Other" >Other</option>
            </select>
            {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}

            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full rounded border px-3 py-1"
            />
            {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded border px-3 py-1"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

            <button
              onClick={handleRegister}
              className="w-full rounded bg-green-600 py-2 text-white"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;
