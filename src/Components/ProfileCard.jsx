import React, { useState, useRef } from 'react';

const defaultImage = 'https://www.w3schools.com/howto/img_avatar.png';

const ProfileCard = ({ user, onLogout, editable }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [successMsg, setSuccessMsg] = useState('');
  const [previewImage, setPreviewImage] = useState(user.profileImage || defaultImage);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) =>
      u.mobile === user.mobile ? editedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(editedUser));
    setEditMode(false);
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  const handleReset = () => {
    setEditedUser(user);
    setPreviewImage(user.profileImage || defaultImage);
    setEditMode(false);
  };

  const handleDelete = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter((u) => u.mobile !== user.mobile);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('user');
    onLogout();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setEditedUser({ ...editedUser, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute top-14 right-2 z-50 bg-white rounded-lg shadow-xl p-4 w-80 space-y-4">
      <h2 className="text-lg font-semibold text-purple-700 text-center">User Profile</h2>

      <div className="relative w-24 h-24 mx-auto">
        <img
          src={previewImage || defaultImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mx-auto border"
        />
        {editMode && (
          <>
            <button
              className="absolute bottom-0 right-0 w-6 h-6 bg-white text-xs border rounded-full"
              onClick={() => fileInputRef.current.click()}
              title="Upload Image"
            >
              📷
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <label className="font-semibold">Name:</label>
          {editMode ? (
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              value={editedUser.username}
              onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
            />
          ) : (
            <p>{editedUser.username}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Mobile:</label>
          <p>{editedUser.mobile}</p>
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          {editMode ? (
            <input
              type="email"
              className="w-full border px-2 py-1 rounded"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            />
          ) : (
            <p>{editedUser.email}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Gender:</label>
          {editMode ? (
            <select
              className="w-full border px-2 py-1 rounded"
              value={editedUser.gender}
              onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{editedUser.gender}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Address:</label>
          {editMode ? (
            <textarea
              className="w-full border px-2 py-1 rounded"
              value={editedUser.address}
              onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
            />
          ) : (
            <p>{editedUser.address}</p>
          )}
        </div>
      </div>

      {successMsg && <p className="text-green-600 text-sm text-center">{successMsg}</p>}

      <div className="flex justify-between items-center pt-2">
        {editable && (
          editMode ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-1 rounded bg-blue-500 text-white"
              >
                Save
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1 rounded bg-gray-400 text-white"
              >
                Reset
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-1 rounded bg-blue-500 text-white"
            >
              Edit
            </button>
          )
        )}
        <button
          onClick={handleDelete}
          className="px-4 py-1 rounded bg-yellow-500 text-white"
        >
          Delete
        </button>
        <button
          onClick={onLogout}
          className="px-4 py-1 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;