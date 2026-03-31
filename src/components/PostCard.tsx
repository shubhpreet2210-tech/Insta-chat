import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '../types';
import { cn } from '../lib/utils';

interface PostCardProps {
  post: Post;
  isLiked?: boolean;
  onLike?: () => void;
  key?: string;
}

export default function PostCard({ post, isLiked, onLike }: PostCardProps) {
  return (
    <div className="border-b border-gray-100 last:border-0 mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={post.authorPhoto || `https://picsum.photos/seed/${post.authorId}/100/100`}
            alt={post.authorName}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
            referrerPolicy="no-referrer"
          />
          <span className="font-semibold text-sm">{post.authorName}</span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>

      {/* Post Image */}
      <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={post.imageUrl}
          alt="Post content"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onDoubleClick={onLike}
        />
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Heart 
              onClick={onLike}
              className={cn(
                "w-6 h-6 cursor-pointer transition-colors",
                isLiked ? "text-red-500 fill-current" : "hover:text-gray-600"
              )} 
            />
            <MessageCircle className="w-6 h-6 cursor-pointer" />
            <Send className="w-6 h-6 cursor-pointer" />
          </div>
          <Bookmark className="w-6 h-6 cursor-pointer" />
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-1">
          {post.likesCount.toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold mr-2">{post.authorName}</span>
          {post.caption}
        </div>

        {/* Time */}
        <div className="text-xs text-gray-400 mt-2 uppercase tracking-tight">
          {post.createdAt ? formatDistanceToNow(post.createdAt.toDate()) + ' ago' : 'Just now'}
        </div>
      </div>
    </div>
  );
}
