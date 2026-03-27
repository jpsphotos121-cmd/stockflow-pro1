import { Package } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { signIn } from "@junobuild/core";

// Keep your existing Navigation buttons intact
function SidebarButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all text-left ${active ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200" : "text-gray-500 hover:bg-gray-100"}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm tracking-tight">{label}</span>
    </button>
  );
}

function NavButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center min-w-[64px] py-1 px-2 ${active ? "text-blue-600 scale-110 transition-transform" : "text-gray-400"}`}
    >
      <Icon className="w-5 h-5 mb-0.5" />
      <span className="text-[9px] font-black uppercase tracking-tighter">
        {label}
      </span>
    </button>
  );
}

/* ================= JUNO LOGIN SCREEN ================= */
// Notice we removed the old props since Juno handles the actual auth flow via the subscription in App.tsx
function LoginScreen({
  showNotification,
}: {
  showNotification: (m: string, t?: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleJunoLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // This triggers the Internet Identity popup
      await signIn();
      // We don't need to manually call onLogin here because the authSubscribe 
      // in your App.tsx file will automatically detect the sign-in!
    } catch (err) {
      console.error("Login failed:", err);
      showNotification("Authentication failed", "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200 text-white">
            <Package size={40} />
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-center text-gray-900 mb-2 tracking-tighter">
          StockManager
        </h1>
        <p className="text-center text-gray-500 mb-8 text-xs font-bold uppercase tracking-widest">
          Web3 Inventory System
        </p>

        <button
          type="button"
          onClick={handleJunoLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95 uppercase tracking-widest text-xs mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            "Connecting securely..."
          ) : (
            <>
              <img 
                src="https://juno.build/img/internet-computer-icp-logo.svg" 
                alt="ICP Logo" 
                className="w-5 h-5 invert" 
              />
              Sign In with Internet Identity
            </>
          )}
        </button>
        
        <p className="text-center text-gray-400 mt-6 text-[10px] font-bold uppercase tracking-widest">
          Secured by Juno on the Blockchain
        </p>
      </div>
    </div>
  );
}

export { SidebarButton, NavButton, LoginScreen };
