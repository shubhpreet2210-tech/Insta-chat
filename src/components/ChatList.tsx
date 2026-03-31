import { Search } from 'lucide-react';
import { ChatSession, User } from '../types';

interface ChatListProps {
  sessions: ChatSession[];
  currentUser: User;
  onSelectSession: (session: ChatSession) => void;
}

export default function ChatList({ sessions, currentUser, onSelectSession }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg">No messages yet</h3>
            <p className="text-gray-500 text-sm mt-1">Connect with friends and start a conversation.</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onSelectSession(session)}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                <img
                  src={`https://picsum.photos/seed/${session.id}/100/100`}
                  alt="Chat"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold text-sm truncate">Chat User</h4>
                  <span className="text-xs text-gray-400">2h</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{session.lastMessage || 'Start a conversation'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
