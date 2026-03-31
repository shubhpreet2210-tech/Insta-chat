import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8 text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold italic tracking-tighter mb-2">InstaChat</h1>
        <p className="text-gray-500">Connect with friends and share your moments.</p>
      </div>

      <button
        onClick={onLogin}
        className="flex items-center gap-3 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg"
      >
        <LogIn className="w-5 h-5" />
        Sign in with Google
      </button>

      <div className="mt-12 text-xs text-gray-400 max-w-xs">
        By signing in, you agree to our Terms, Data Policy and Cookies Policy.
      </div>
    </div>
  );
}
