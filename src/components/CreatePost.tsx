import { X, Image as ImageIcon, MapPin, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CreatePostProps {
  onClose: () => void;
  onPost: (imageUrl: string, caption: string) => void;
}

export default function CreatePost({ onClose, onPost }: CreatePostProps) {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handlePost = () => {
    if (imageUrl && caption) {
      onPost(imageUrl, caption);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-20 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
          <h2 className="font-bold text-lg">New Post</h2>
        </div>
        <button
          onClick={handlePost}
          disabled={!imageUrl || !caption}
          className="text-blue-500 font-bold disabled:opacity-50"
        >
          Share
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 flex gap-4 border-b border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <ImageIcon className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1 text-sm resize-none focus:outline-none py-2"
          />
        </div>

        <div className="p-4 border-b border-gray-100">
          <input
            type="text"
            placeholder="Image URL (e.g. https://picsum.photos/800/800)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Add Location</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <UserIcon className="w-5 h-5" />
              <span className="text-sm">Tag People</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
