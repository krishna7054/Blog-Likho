import { useEffect, useState } from "react";
import { FaBloggerB, FaRegWindowMinimize } from "react-icons/fa";

function Logo() {
  const [showBook, setShowBook] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBook(false);
      setTimeout(() => setShowBook(true), 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {showBook && (
        <div className="relative animate-slide-in">
          <div className="relative">
            <FaBloggerB size={30} className="text-indigo-500" />
            {/* Air flow effects */}
            <div className="absolute -left-0 top-1/2 -translate-y-1/2 z-0">
              <FaRegWindowMinimize className="text-blue-200 animate-flow-1 opacity-80 scale-x-[-1]" size={20} />
            </div>
            <div className="absolute -left-2 top-1/4 -translate-y-1/2 z-0">
              <FaRegWindowMinimize className="text-blue-300 animate-flow-2 opacity-60 scale-x-[-1]" size={16} />
            </div>
            <div className="absolute -left-1 bottom-0 z-0">
              <FaRegWindowMinimize className="text-blue-200 animate-flow-3 opacity-40 scale-x-[-1]" size={12} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;
