import { X, Camera } from 'lucide-react';
import { useState } from 'react';
import { User } from '../types';

interface EditProfileProps {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => void;
}

export default function EditProfile({ user, onClose, onSave }: EditProfileProps) {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL);

  const handleSave = () => {
    onSave({ displayName, bio, photoURL });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-30 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
          <h2 className="font-bold text-lg">Edit Profile</h2>
        </div>
        <button
          onClick={handleSave}
          className="text-blue-500 font-bold"
        >
          Done
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative group cursor-pointer">
            <img
              src={photoURL || `https://picsum.photos/seed/${user.uid}/200/200`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-gray-200"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <button className="text-blue-500 font-semibold text-sm">Change profile photo</button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-1 border-b border-gray-100 pb-2">
            <label className="text-xs text-gray-500 uppercase font-semibold">Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="text-sm focus:outline-none"
              placeholder="Name"
            />
          </div>

          <div className="flex flex-col gap-1 border-b border-gray-100 pb-2">
            <label className="text-xs text-gray-500 uppercase font-semibold">Username</label>
            <input
              type="text"
              value={user.displayName.toLowerCase().replace(/\s/g, '_')}
              disabled
              className="text-sm focus:outline-none text-gray-400"
              placeholder="Username"
            />
          </div>

          <div className="flex flex-col gap-1 border-b border-gray-100 pb-2">
            <label className="text-xs text-gray-500 uppercase font-semibold">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="text-sm focus:outline-none resize-none"
              placeholder="Bio"
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-1 border-b border-gray-100 pb-2">
            <label className="text-xs text-gray-500 uppercase font-semibold">Profile Picture URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="text-sm focus:outline-none"
              placeholder="Photo URL"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
