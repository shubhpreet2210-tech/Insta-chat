import { Settings, Grid, Bookmark, User as UserIcon, Tag } from 'lucide-react';
import { User, Post } from '../types';

interface ProfileViewProps {
  user: User;
  posts: Post[];
  onEdit: () => void;
}

export default function ProfileView({ user, posts, onEdit }: ProfileViewProps) {
  return (
    <div className="bg-white min-h-full">
      {/* Profile Header */}
      <header className="p-4 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{user.displayName}</h2>
          <div className="flex gap-4">
            <Settings className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative">
            <img
              src={user.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`}
              alt={user.displayName}
              className="w-20 h-20 rounded-full object-cover border border-gray-200 p-1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 flex justify-around text-center">
            <div>
              <div className="font-bold">{posts.length}</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div>
              <div className="font-bold">250</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div>
              <div className="font-bold">180</div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm">{user.displayName}</h3>
          <p className="text-sm text-gray-600 mt-1">{user.bio || 'No bio yet.'}</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={onEdit}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 rounded-lg text-sm transition-colors"
          >
            Edit Profile
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 rounded-lg text-sm transition-colors">
            Share Profile
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-t border-gray-200 mt-4">
        <div className="flex-1 flex justify-center py-3 border-t-2 border-black">
          <Grid className="w-6 h-6" />
        </div>
        <div className="flex-1 flex justify-center py-3 text-gray-400">
          <Bookmark className="w-6 h-6" />
        </div>
        <div className="flex-1 flex justify-center py-3 text-gray-400">
          <Tag className="w-6 h-6" />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square bg-gray-100 overflow-hidden cursor-pointer group">
            <img
              src={post.imageUrl}
              alt="Post"
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
