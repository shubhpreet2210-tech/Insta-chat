import { ArrowLeft, Info, Send, Image as ImageIcon, Smile } from 'lucide-react';
import { Message, User, ChatSession } from '../types';
import { useState } from 'react';

interface ChatWindowProps {
  session: ChatSession;
  currentUser: User;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

export default function ChatWindow({ session, currentUser, messages, onBack, onSendMessage }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white fixed inset-0 z-20">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
          <div className="flex items-center gap-3">
            <img
              src={`https://picsum.photos/seed/${session.id}/100/100`}
              alt="User"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
              referrerPolicy="no-referrer"
            />
            <span className="font-semibold text-sm">Chat User</span>
          </div>
        </div>
        <Info className="w-6 h-6 text-gray-500 cursor-pointer" />
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUser.uid;
          return (
            <div
              key={msg.id}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                  isMine
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-100 text-black rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
          <Smile className="w-6 h-6 text-gray-500 cursor-pointer" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
          {inputText.trim() ? (
            <button
              onClick={handleSend}
              className="text-blue-500 font-semibold text-sm hover:text-blue-600 transition-colors"
            >
              Send
            </button>
          ) : (
            <div className="flex gap-3">
              <ImageIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
              <Send className="w-6 h-6 text-gray-500 cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
