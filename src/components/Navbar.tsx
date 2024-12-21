import React from 'react';
import { Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
}

const Navbar = ({ onAdminClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed w-full z-50 px-4 py-4">
      <nav className="bg-black/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center">
              <span className="text-white font-bold text-xl tracking-wider">MINDSET ARTIST HUB</span>
            </div>

            <div className="hidden md:flex items-center">
              <button 
                onClick={onAdminClick}
                className="text-gray-300 hover:text-white transition"
                title="Admin Panel"
              >
                <Shield className="w-5 h-5" />
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md rounded-b-2xl border-t border-white/10">
            <div className="px-4 pt-2 pb-3">
              <button 
                onClick={onAdminClick}
                className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:text-white transition"
              >
                <Shield className="w-5 h-5" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;