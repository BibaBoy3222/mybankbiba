import React from 'react';
import { CreditCard, Wallet, Bitcoin, Menu, X } from 'lucide-react';

const Navbar: React.FC<{ 
  onDashboardClick?: () => void;
  onNavClick?: (section: string) => void;
}> = ({ onDashboardClick, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-brand-dark/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onNavClick?.('home')}>
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
            <span className="text-white font-bold text-lg italic">W</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white group-hover:text-purple-400 transition-colors uppercase">
            WHATTHEBIBA
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => onNavClick?.('banking')} className="hover:text-white transition-colors flex items-center gap-2">
            <CreditCard size={18} />
            Банкинг
          </button>
          <button onClick={() => onNavClick?.('crypto')} className="hover:text-white transition-colors flex items-center gap-2">
            <Bitcoin size={18} />
            Крипто
          </button>
          <button onClick={() => onNavClick?.('wallet')} className="hover:text-white transition-colors flex items-center gap-2">
            <Wallet size={18} />
            Кошелек
          </button>
          <button 
            onClick={onDashboardClick}
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all hover:shadow-[0_0_20px_rgba(109,40,217,0.4)] font-bold"
          >
            Личный кабинет
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <a href="#" className="text-gray-400 hover:text-white">Banking</a>
          <a href="#" className="text-gray-400 hover:text-white">Crypto</a>
          <a href="#" className="text-gray-400 hover:text-white">Wallet</a>
          <button className="w-full py-3 bg-purple-600 text-white rounded-xl">Open Account</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
