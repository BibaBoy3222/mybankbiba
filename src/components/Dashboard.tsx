import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowRightLeft, 
  Wallet, 
  History, 
  Settings, 
  Bell, 
  TrendingUp, 
  TrendingDown,
  Plus,
  ArrowUpRight,
  Smartphone,
  CheckCircle2,
  DollarSign,
  Plane,
  Hotel,
  Calendar,
  Compass,
  ShieldCheck,
  Bitcoin,
  XCircle,
  QrCode,
  Globe,
  ChevronRight,
  Search,
  Lock,
  Wifi,
  CreditCard as CreditIcon,
  RefreshCcw,
  Eye,
  EyeOff,
  Fingerprint,
  ShieldAlert,
  History as HistoryIcon,
  UserCheck,
  Gem,
  Menu,
  X,
  Command
} from 'lucide-react';

const useGlowEffect = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };
  return handleMouseMove;
};

const PremiumCard: React.FC<{ card: any, isSelected: boolean, onClick: () => void, hideBalances: boolean }> = ({ card, isSelected, onClick, hideBalances }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const handleGlow = useGlowEffect();

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    handleGlow(event);
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`relative aspect-[1.58/1] rounded-[2.5rem] bg-gradient-to-br ${card.color} p-10 border border-white/10 shadow-2xl overflow-hidden group cursor-pointer glow-effect ${isSelected ? 'ring-2 ring-purple-500 ring-offset-4 ring-offset-[#020205]' : ''}`}
    >
      {/* Gloss Effect */}
      <motion.div 
        style={{ 
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 80%)",
          x: useTransform(x, [-150, 150], [-50, 50]),
          y: useTransform(y, [-100, 100], [-50, 50]),
        }}
        className="absolute inset-0 pointer-events-none" 
      />
      
      <div className="absolute top-8 right-10 text-[10px] font-black tracking-[0.4em] text-white/30 italic" style={{ transform: "translateZ(20px)" }}>WHATTHEBIBA</div>
      <div className="h-full flex flex-col justify-between relative z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex justify-between items-start">
          <div className="w-16 h-10 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
            <Wifi size={24} className="text-white/40 rotate-90" />
          </div>
          <Gem size={32} className={card.color.includes('gold') ? 'text-yellow-500' : 'text-purple-400'} />
        </div>
        <div>
          <p className="text-2xl font-mono text-white mb-2 tracking-[0.25em]">
            {hideBalances ? '•••• •••• •••• ••••' : card.number}
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Баланс карты</p>
              <p className="text-xl font-black text-white">{hideBalances ? '•••• ••••' : card.balance}</p>
            </div>
            <p className="text-sm font-black italic text-white/60">{card.type} {card.name}</p>
          </div>
        </div>
      </div>
      {card.isLocked && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20">
          <Lock size={48} className="text-white/40" />
          <p className="text-white font-black uppercase tracking-widest text-xs">Карта заблокирована</p>
        </div>
      )}
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferStep, setTransferStep] = useState(1);
  const [transferDetails, setTransferDetails] = useState({ to: '', amount: '', message: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [hideBalances, setHideBalances] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(1);
  const [paymentType, setPaymentType] = useState<'none' | 'mobile' | 'internet' | 'credit' | 'crypto'>('none');
  const [showBiometric, setShowBiometric] = useState(false);
  const [biometricTarget, setBiometricTarget] = useState<() => void>(() => {});
  const [biometricStatus, setBiometricStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [showWealthSimulator, setShowWealthSimulator] = useState(false);
  const [simInvestment, setSimInvestment] = useState(1000000);
  const [simYears, setSimYears] = useState(5);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Command Palette Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { id: 'overview', label: 'Обзор аккаунта', icon: <LayoutDashboard size={16} /> },
    { id: 'cards', label: 'Управление картами', icon: <CreditCard size={16} /> },
    { id: 'transfers', label: 'Сделать перевод', icon: <ArrowRightLeft size={16} /> },
    { id: 'crypto', label: 'Крипто-кошелек', icon: <Bitcoin size={16} /> },
    { id: 'concierge', label: 'Консьерж-сервис', icon: <Compass size={16} /> },
    { id: 'settings', label: 'Безопасность', icon: <ShieldCheck size={16} /> },
    { id: 'limit', label: 'Изменить лимиты', icon: <Settings size={16} /> },
  ].filter(cmd => cmd.label.toLowerCase().includes(commandSearch.toLowerCase()));

  // Mock data states
  const [balance, setBalance] = useState(12450000);
  const [btcBalance] = useState(14.25);
  
  const [userCards, setUserCards] = useState([
    { id: 1, type: 'OBSIDIAN', name: 'INFINITE', number: '4412 8821 0092 4242', balance: '8,400,000 ₽', color: 'from-[#0a0a0a] to-[#1a1a1a]', isLocked: false, limit: 5000000, spent: 1500000 },
    { id: 2, type: 'GOLD', name: 'RESERVE', number: '5532 1100 9988 8888', balance: '4,050,000 ₽', color: 'from-[#1a1a1a] via-[#332a10] to-[#1a1a1a]', isLocked: false, limit: 2000000, spent: 450000 },
    { id: 3, type: 'PLATINUM', name: 'DIGITAL', number: '•••• •••• •••• 0011', balance: '250,000 ₽', color: 'from-[#2c3e50] to-[#bdc3c7]', isLocked: true, limit: 500000, spent: 0 },
  ]);

  const toggleCardLock = (id: number) => {
    setUserCards(prev => prev.map(card => 
      card.id === id ? { ...card, isLocked: !card.isLocked } : card
    ));
  };

  const p2pOffers = [
    { id: 1, user: 'CryptoKing', rate: '94.50 ₽', limit: '10,000 - 500,000 ₽', orders: 1420, completion: '99.8%' },
    { id: 2, user: 'WTB_Trader', rate: '94.55 ₽', limit: '50,000 - 2,000,000 ₽', orders: 850, completion: '100%' },
    { id: 3, user: 'FastSwap', rate: '94.62 ₽', limit: '1,000 - 50,000 ₽', orders: 3200, completion: '98.5%' },
  ];

  const securitySettings = [
    { id: '2fa', title: 'Двухфакторная аутентификация', desc: 'Подтверждение входа через SMS или приложение', active: true, icon: <Smartphone size={20} /> },
    { id: 'bio', title: 'Биометрия', desc: 'Использование FaceID или отпечатка пальца', active: true, icon: <Fingerprint size={20} /> },
    { id: 'intl', title: 'Зарубежные операции', desc: 'Разрешить оплату картой за пределами РФ', active: false, icon: <Globe size={20} /> },
    { id: 'p2p_sec', title: 'Лимит на P2P', desc: 'Ограничение суммы обмена в сутки', active: true, icon: <ShieldAlert size={20} /> },
  ];

  const conciergeServices = [
    {
      id: 'jet-1',
      type: 'Частный самолет',
      title: 'Global 7500 • Москва - Дубай',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
      price: 'от 4 500 000 ₽',
      date: 'Ближайший: 04 Апр',
      icon: <Plane size={24} />
    },
    {
      id: 'hotel-1',
      type: 'Отель',
      title: 'Burj Al Arab • Royal Suite',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      price: 'от 1 200 000 ₽ / ночь',
      date: 'Доступно сейчас',
      icon: <Hotel size={24} />
    },
    {
      id: 'jet-2',
      type: 'Частный самолет',
      title: 'Gulfstream G650 • Лондон - Нью-Йорк',
      image: 'https://images.unsplash.com/photo-1626025437642-0b05076ca301?auto=format&fit=crop&q=80&w=800',
      price: 'от 8 200 000 ₽',
      date: 'Ближайший: 06 Апр',
      icon: <Plane size={24} />
    },
    {
      id: 'hotel-2',
      type: 'Отель',
      title: 'Aman Tokyo • Deluxe Room',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
      price: 'от 450 000 ₽ / ночь',
      date: 'Доступно с 10 Апр',
      icon: <Hotel size={24} />
    }
  ];

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, title: 'Louis Vuitton Paris', date: 'Сегодня, 14:20', amount: -450000, category: 'Luxury', status: 'Success' },
    { id: 2, title: 'Пополнение BTC', date: 'Вчера, 18:45', amount: 35000, category: 'Crypto', status: 'Success' },
    { id: 3, title: 'NetJets Europe', date: '24 Мар, 10:15', amount: -1200000, category: 'Travel', status: 'Success' },
    { id: 4, title: 'Дивиденды Obsidian', date: '22 Мар, 09:00', amount: 85000, category: 'Bonus', status: 'Success' },
  ]);

  const startBiometric = () => {
    setBiometricStatus('scanning');
    setTimeout(() => {
      setBiometricStatus('success');
      setTimeout(() => {
        setShowBiometric(false);
        setBiometricStatus('idle');
        biometricTarget();
      }, 1000);
    }, 2000);
  };

  const handleTransfer = () => {
    setIsProcessing(true);
    // Вместо обычного подтверждения вызываем биометрию
    setBiometricTarget(() => () => {
      setTimeout(() => {
        const amount = parseFloat(transferDetails.amount);
        setBalance(prev => prev - amount);
        setRecentTransactions(prev => [
          { 
            id: Date.now(), 
            title: transferDetails.to || 'Перевод клиенту', 
            date: 'Только что', 
            amount: -amount, 
            category: 'Transfer',
            status: 'Success'
          },
          ...prev
        ]);
        setIsProcessing(false);
        setTransferStep(3);
      }, 1000);
    });
    setShowBiometric(true);
  };

  return (
    <div className="w-full min-h-screen lg:min-h-[850px] glass-card border-white/10 overflow-hidden flex flex-col lg:flex-row relative">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-6 bg-black/60 backdrop-blur-md border-b border-white/5 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-black italic shadow-lg">W</div>
          <span className="font-black tracking-tighter text-lg uppercase">WTB</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 1024) && (
          <motion.div 
            initial={window.innerWidth < 1024 ? { x: -300 } : false}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed inset-0 lg:relative lg:inset-auto w-full lg:w-64 border-r border-white/5 p-6 flex flex-col gap-8 bg-black/95 lg:bg-black/40 backdrop-blur-xl z-[100] lg:z-10`}
          >
            <div className="hidden lg:flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-black italic shadow-[0_0_20px_rgba(168,85,247,0.4)]">W</div>
              <span className="font-black tracking-tighter text-xl uppercase text-white">WHATTHEBIBA</span>
            </div>

            <nav className="flex flex-col gap-2">
              {[
                { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'Обзор' },
                { id: 'cards', icon: <CreditCard size={20} />, label: 'Мои карты' },
                { id: 'transfers', icon: <ArrowRightLeft size={20} />, label: 'Платежи' },
                { id: 'concierge', icon: <Compass size={20} />, label: 'Консьерж' },
                { id: 'crypto', icon: <Wallet size={20} />, label: 'Крипто-активы' },
                { id: 'history', icon: <History size={20} />, label: 'История' },
                { id: 'settings', icon: <Settings size={20} />, label: 'Безопасность' },
                { id: 'analytics', icon: <TrendingUp size={20} />, label: 'Аналитика' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${
                    activeTab === item.id 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-auto p-5 rounded-2xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 relative overflow-hidden group hidden lg:block">
              <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={40} />
              </div>
              <p className="text-[10px] text-purple-400 font-black uppercase tracking-[0.2em] mb-2">Private Support</p>
              <p className="text-sm text-white/80 leading-relaxed font-medium">Ваш менеджер Александр на связи</p>
              <button className="mt-4 w-full py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">Связаться</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-screen lg:max-h-[850px] custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(109,40,217,0.05),transparent_50%)]">
        {/* Crypto Ticker */}
        <div className="mb-8 -mx-4 lg:-mx-8 bg-white/[0.02] border-y border-white/5 py-3 overflow-hidden whitespace-nowrap flex relative">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center px-8"
          >
            {[
              { coin: 'BTC', price: '68,420.50', change: '+2.4%' },
              { coin: 'ETH', price: '3,540.12', change: '-0.8%' },
              { coin: 'USDT', price: '1.00', change: '0.0%' },
              { coin: 'SOL', price: '142.85', change: '+12.4%' },
              { coin: 'BNB', price: '580.40', change: '+1.2%' },
              { coin: 'XRP', price: '0.62', change: '-2.1%' },
            ].concat([
              { coin: 'BTC', price: '68,420.50', change: '+2.4%' },
              { coin: 'ETH', price: '3,540.12', change: '-0.8%' },
              { coin: 'USDT', price: '1.00', change: '0.0%' },
              { coin: 'SOL', price: '142.85', change: '+12.4%' },
              { coin: 'BNB', price: '580.40', change: '+1.2%' },
              { coin: 'XRP', price: '0.62', change: '-2.1%' },
            ]).map((ticker, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{ticker.coin}</span>
                <span className="text-sm font-mono font-bold text-white">${ticker.price}</span>
                <span className={`text-[10px] font-black ${ticker.change.startsWith('+') ? 'text-emerald-500' : ticker.change === '0.0%' ? 'text-gray-500' : 'text-rose-500'}`}>
                  {ticker.change}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-2 italic tracking-tight">Добро пожаловать, Джереми</h2>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">Ваш статус:</span>
                <span className="px-2 py-0.5 rounded-full bg-luxury-gold/10 text-luxury-gold text-[10px] font-black tracking-widest uppercase border border-luxury-gold/20">OBSIDIAN MEMBER</span>
              </div>
            </div>
            <button 
              onClick={() => setHideBalances(!hideBalances)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-colors"
            >
              {hideBalances ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Текущее время</span>
              <span className="text-white font-mono font-bold">14:42 GMT+3</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#020205]" />
              </button>
              <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 border border-white/20 p-0.5 shadow-lg shadow-purple-600/20 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Jeremy`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[
                  { icon: <DollarSign size={48} />, label: 'Общий баланс', value: `${balance.toLocaleString('ru-RU')} ₽`, change: '+14.2% за месяц', trend: 'up' },
                  { icon: <Bitcoin size={48} />, label: 'Крипто-активы', value: `${btcBalance} BTC`, change: '-2.1% (Рынок)', trend: 'down' },
                  { label: 'Симулятор роста', value: 'Настроить', isProgress: true, onClick: () => setShowWealthSimulator(true) }
                ].map((item: any, i) => (
                  <motion.div 
                    key={i}
                    variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
                    whileHover={{ y: -5 }}
                    onClick={item.onClick}
                    className={`p-6 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group ${item.onClick ? 'cursor-pointer hover:bg-white/10' : 'cursor-default'}`}
                  >
                    {item.icon && (
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                    )}
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4 font-black">{item.label}</p>
                    <h3 className="text-3xl font-black text-white tracking-tight mb-2 italic">
                      {hideBalances ? (item.label.includes('BTC') ? '••.•• BTC' : '•••• ••••') : item.value}
                    </h3>
                    {item.isProgress ? (
                      <div className="w-full bg-white/5 h-1.5 rounded-full mt-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          className="bg-purple-600 h-full rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                        />
                      </div>
                    ) : (
                      <div className={`flex items-center gap-2 text-xs font-bold ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {item.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {item.change}
                      </div>
                    )}
                  </motion.div>
                ))}

                <motion.button 
                  variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
                  onClick={() => setShowTransferModal(true)}
                  className="p-6 rounded-[2rem] bg-purple-600 text-white border border-purple-400/30 hover:bg-purple-500 transition-all flex flex-col justify-center items-center gap-4 group shadow-xl shadow-purple-600/20"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner">
                    <Plus size={32} />
                  </div>
                  <span className="font-black tracking-widest uppercase text-xs">Новый платеж</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <motion.div 
                  variants={{ initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
                  className="xl:col-span-2 space-y-6"
                >
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xl font-black text-white italic tracking-tight uppercase">Последние транзакции</h3>
                    <button onClick={() => setActiveTab('history')} className="px-4 py-2 rounded-xl bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors border border-white/5">Смотреть все</button>
                  </div>
                  <div className="space-y-3">
                    {recentTransactions.map((tx) => (
                      <motion.div 
                        key={tx.id} 
                        whileHover={{ x: 10 }}
                        className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center border border-white/10 text-white font-black italic shadow-lg group-hover:border-purple-500/50 transition-colors">
                            {tx.title[0]}
                          </div>
                          <div>
                            <p className="text-white font-bold text-lg">{tx.title}</p>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{tx.category} • {tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-mono font-black ${tx.amount < 0 ? 'text-white' : 'text-emerald-500'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  variants={{ initial: { x: 30, opacity: 0 }, animate: { x: 0, opacity: 1 } }}
                  className="space-y-6"
                >
                  <div className="p-8 rounded-[2.5rem] glass-card border-white/10 relative overflow-hidden group">
                    <h3 className="text-xl font-black text-white italic mb-8 uppercase tracking-tight">Ваш статус</h3>
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-luxury-gold/20 to-transparent border border-luxury-gold/20 relative overflow-hidden">
                        <Gem className="absolute -top-2 -right-2 size-16 text-luxury-gold opacity-10" />
                        <p className="text-[10px] text-luxury-gold font-black uppercase tracking-widest mb-2">Привилегии</p>
                        <p className="text-white font-bold text-sm mb-4 leading-relaxed">Доступ в бизнес-залы аэропортов по всему миру без ограничений.</p>
                        <button className="text-[10px] font-black text-luxury-gold uppercase tracking-widest hover:underline">Подробнее</button>
                      </div>
                      
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4">Безопасность аккаунта</p>
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-12 h-12 rounded-full border-2 border-purple-600 border-t-transparent animate-spin flex items-center justify-center">
                             <ShieldCheck size={20} className="text-purple-400 -rotate-[inherit]" />
                           </div>
                           <div>
                             <p className="text-white font-bold text-sm">Сканирование...</p>
                             <p className="text-[10px] text-gray-500 uppercase font-black">Угроз не обнаружено</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'cards' && (
            <motion.div 
              key="cards"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-10"
            >
              <motion.div 
                variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
                className="flex justify-between items-end"
              >
                <div>
                  <h3 className="text-4xl font-black text-white italic tracking-tight mb-4 uppercase">Мои карты</h3>
                  <p className="text-gray-500">Управляйте вашими физическими и цифровыми активами</p>
                </div>
                <button className="px-6 py-3 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Plus size={16} /> Выпустить карту
                </button>
              </motion.div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <motion.div 
                  variants={{ initial: { x: -30, opacity: 0 }, animate: { x: 0, opacity: 1 } }}
                  className="space-y-6"
                >
                  {userCards.map((card) => (
                    <PremiumCard 
                      key={card.id}
                      card={card}
                      isSelected={selectedCardId === card.id}
                      onClick={() => setSelectedCardId(card.id)}
                      hideBalances={hideBalances}
                    />
                  ))}
                </motion.div>

                <motion.div 
                  variants={{ initial: { x: 30, opacity: 0 }, animate: { x: 0, opacity: 1 } }}
                  className="space-y-8"
                >
                  <div className="glass-card p-8 border-white/10">
                    <div className="flex justify-between items-center mb-8">
                      <h4 className="text-xl font-black text-white italic">Управление картой</h4>
                      <button 
                        onClick={() => toggleCardLock(selectedCardId)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          userCards.find(c => c.id === selectedCardId)?.isLocked 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-rose-600 text-white'
                        }`}
                      >
                        {userCards.find(c => c.id === selectedCardId)?.isLocked ? 'Разблокировать' : 'Заблокировать'}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                        <QrCode size={20} className="text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">QR-код</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                        <Settings size={20} className="text-purple-400 group-hover:rotate-90 transition-transform" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Лимиты</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                        <CreditIcon size={20} className="text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Реквизиты</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                        <RefreshCcw size={20} className="text-purple-400 group-hover:rotate-180 transition-transform" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">ПИН-код</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                            <Lock size={20} />
                          </div>
                          <div>
                            <p className="text-white font-bold">Бесконтактная оплата</p>
                            <p className="text-xs text-gray-500">NFC и Apple Pay / Google Pay</p>
                          </div>
                        </div>
                        <div className="w-12 h-6 bg-purple-600 rounded-full flex items-center justify-end px-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                            <Globe size={20} />
                          </div>
                          <div>
                            <p className="text-white font-bold">Интернет-покупки</p>
                            <p className="text-xs text-gray-500">Оплата в онлайн-магазинах</p>
                          </div>
                        </div>
                        <div className="w-12 h-6 bg-white/10 rounded-full flex items-center justify-start px-1 cursor-pointer">
                          <div className="w-4 h-4 bg-gray-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-8 border-white/10">
                    <h4 className="text-xl font-black text-white italic mb-6">Лимиты трат</h4>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">В день</span>
                          <span className="text-white font-bold">
                            {(userCards.find(c => c.id === selectedCardId)?.spent || 0).toLocaleString()} / {(userCards.find(c => c.id === selectedCardId)?.limit || 0).toLocaleString()} ₽
                          </span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${((userCards.find(c => c.id === selectedCardId)?.spent || 0) / (userCards.find(c => c.id === selectedCardId)?.limit || 1)) * 100}%` }}
                            className="bg-purple-600 h-full rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'transfers' && (
            <motion.div 
              key="transfers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <h3 className="text-4xl font-black text-white italic tracking-tight mb-4 uppercase">Платежи и переводы</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'mobile', icon: <Smartphone />, label: 'Связь', color: 'bg-blue-500' },
                      { id: 'internet', icon: <Wifi />, label: 'Интернет', color: 'bg-indigo-500' },
                      { id: 'credit', icon: <RefreshCcw />, label: 'Кредиты', color: 'bg-emerald-500' },
                      { id: 'crypto', icon: <Bitcoin />, label: 'В крипту', color: 'bg-orange-500' },
                    ].map((item, i) => (
                      <button 
                        key={i} 
                        onClick={() => setPaymentType(item.id as any)}
                        className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-4 group ${
                          paymentType === item.id 
                          ? 'bg-purple-600/20 border-purple-500' 
                          : 'bg-white/5 border-white/5 hover:border-purple-500/50'
                        }`}
                      >
                        <div className={`w-14 h-14 rounded-2xl ${item.color}/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <span className="font-black uppercase tracking-widest text-[10px] text-gray-400 group-hover:text-white">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {paymentType !== 'none' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-card p-8 border-white/10"
                      >
                        <div className="flex justify-between items-center mb-8">
                          <h4 className="text-xl font-black text-white italic uppercase">
                            {paymentType === 'mobile' && 'Оплата связи'}
                            {paymentType === 'internet' && 'Интернет и ТВ'}
                            {paymentType === 'credit' && 'Погашение кредита'}
                            {paymentType === 'crypto' && 'Перевод в крипту'}
                          </h4>
                          <button onClick={() => setPaymentType('none')} className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest">Отмена</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                              {paymentType === 'mobile' && 'Номер телефона'}
                              {paymentType === 'internet' && 'Лицевой счет'}
                              {paymentType === 'credit' && 'Номер договора'}
                              {paymentType === 'crypto' && 'Крипто-кошелек'}
                            </label>
                            <input 
                              type="text" 
                              placeholder={paymentType === 'crypto' ? '0x...' : 'Введите данные...'}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-purple-500 outline-none transition-all font-mono"
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Сумма (₽)</label>
                            <input 
                              type="number" 
                              placeholder="0.00"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-purple-500 outline-none transition-all text-xl font-black italic"
                            />
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded border border-white/10" />
                            <span className="text-sm font-bold text-white">Obsidian Infinite • 4242</span>
                          </div>
                          <span className="text-xs text-gray-500">Доступно: 8,400,000 ₽</span>
                        </div>

                        <button className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20">
                          Подтвердить платеж
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!paymentType || paymentType === 'none' ? (
                    <div className="glass-card p-12 border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600 mb-4">
                        <ArrowRightLeft size={32} />
                      </div>
                      <p className="text-gray-500 font-medium">Выберите тип платежа выше, чтобы продолжить</p>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-6">
                  <div className="glass-card p-8 border-white/10">
                    <h4 className="text-xl font-black text-white italic mb-6">Избранные</h4>
                    <div className="space-y-4">
                      {['Александр М.', 'Мария К.', 'Брокерский счет'].map((name, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold text-xs">
                              {name[0]}
                            </div>
                            <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{name}</span>
                          </div>
                          <ArrowUpRight size={16} className="text-gray-600" />
                        </div>
                      ))}
                      <button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-gray-500 text-xs font-bold hover:text-white hover:border-white/30 transition-all">
                        + Добавить новый
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'crypto' && (
            <motion.div 
              key="crypto"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <motion.div variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}>
                  <h3 className="text-4xl font-black text-white italic tracking-tight mb-4 uppercase">Крипто-активы</h3>
                  <p className="text-gray-500 text-lg">Институциональная торговля и P2P обмен</p>
                </motion.div>
                <div className="flex gap-4">
                  <motion.button variants={{ initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 } }} className="px-6 py-3 glass-card border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:border-purple-500 transition-colors">Стейкинг 12% APR</motion.button>
                  <motion.button variants={{ initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 } }} className="px-6 py-3 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl hover:bg-gray-200 transition-all">Купить крипто</motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <motion.div 
                  variants={{ initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
                  className="xl:col-span-2 space-y-8"
                >
                  <div className="glass-card border-white/10 overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                      <h4 className="text-xl font-black text-white italic">P2P Площадка</h4>
                      <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                        <button className="px-6 py-2 rounded-lg bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest">Купить</button>
                        <button className="px-6 py-2 rounded-lg text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Продать</button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5">
                            <th className="p-6 font-black">Контрагент</th>
                            <th className="p-6 font-black">Курс (USDT/RUB)</th>
                            <th className="p-6 font-black">Лимиты</th>
                            <th className="p-6 font-black text-right">Действие</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {p2pOffers.map((offer, i) => (
                            <motion.tr 
                              key={offer.id} 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="hover:bg-white/[0.02] transition-colors group"
                            >
                              <td className="p-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                                    <UserCheck size={18} />
                                  </div>
                                  <div>
                                    <p className="text-white font-bold text-sm">{offer.user}</p>
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{offer.orders} орд. • {offer.completion}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-6">
                                <div className="flex flex-col">
                                  <span className="text-emerald-500 font-mono font-black text-lg">{offer.rate}</span>
                                  <div className="w-16 h-4 flex items-end gap-1">
                                    {[20, 40, 30, 60, 45].map((h, j) => (
                                      <div key={j} className="flex-1 bg-emerald-500/20 rounded-t-sm" style={{ height: `${h}%` }} />
                                    ))}
                                  </div>
                                </div>
                              </td>
                              <td className="p-6">
                                <span className="text-gray-400 text-xs font-mono tracking-tight">{offer.limit}</span>
                              </td>
                              <td className="p-6 text-right">
                                <button className="px-8 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/20">Обмен</button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-8 border-white/10 bg-gradient-to-br from-purple-600/5 to-transparent">
                      <h4 className="text-lg font-black text-white italic mb-6">Активный стейкинг</h4>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 text-xs uppercase font-black tracking-widest">Активы в работе</span>
                        <span className="text-white font-black">1.42 BTC</span>
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-gray-500 text-xs uppercase font-black tracking-widest">Начислено сегодня</span>
                        <span className="text-emerald-500 font-black">+0.00042 BTC</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-6">
                        <div className="bg-purple-600 h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                      </div>
                      <button className="w-full py-3 rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">Детализация начислений</button>
                    </div>

                    <div className="glass-card p-8 border-white/10 bg-gradient-to-br from-blue-600/5 to-transparent">
                      <h4 className="text-lg font-black text-white italic mb-6">История переводов</h4>
                      <div className="space-y-4">
                        {[
                          { id: 1, type: 'Ввод', coin: 'BTC', amount: '+0.500', date: '2 часа назад' },
                          { id: 2, type: 'Вывод', coin: 'USDT', amount: '-4,200', date: 'Вчера, 12:40' },
                        ].map(tx => (
                          <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${tx.type === 'Ввод' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {tx.type[0]}
                              </div>
                              <div>
                                <p className="text-white font-bold text-[10px]">{tx.coin}</p>
                                <p className="text-[8px] text-gray-500 uppercase font-black tracking-widest">{tx.date}</p>
                              </div>
                            </div>
                            <span className={`text-[10px] font-black ${tx.type === 'Ввод' ? 'text-emerald-500' : 'text-white'}`}>{tx.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-8">
                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-orange-500/10 via-transparent to-transparent border border-orange-500/20 relative overflow-hidden group">
                    <Bitcoin className="absolute -top-4 -right-4 size-32 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
                    <h4 className="text-xl font-black text-white italic mb-8 uppercase tracking-tight">Ваш BTC кошелек</h4>
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3 font-black">Адрес (SegWit)</p>
                        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between group/addr cursor-pointer">
                          <span className="text-xs font-mono text-white/60 truncate mr-4">bc1q...wtb4242</span>
                          <button className="text-purple-400 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover/addr:opacity-100 transition-opacity">Копировать</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg shadow-white/5">Получить</button>
                        <button className="py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Отправить</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                    <h4 className="text-xl font-black text-white italic mb-6">Безопасность</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                          <Lock size={18} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-xs">2FA Активен</p>
                          <p className="text-[10px] text-gray-500">Защита транзакций</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                          <ShieldCheck size={18} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-xs">Whitelist</p>
                          <p className="text-[10px] text-gray-500">Разрешенные адреса</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl mx-auto space-y-12"
            >
              <div className="text-center">
                <h3 className="text-4xl font-black text-white italic tracking-tight mb-4 uppercase">Безопасность и Доступ</h3>
                <p className="text-gray-500 text-lg">Ваш капитал под защитой квантовых алгоритмов WHATTHEBIBA</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {securitySettings.map((item) => (
                      <div key={item.id} className="p-8 rounded-[2.5rem] glass-card border-white/10 hover:border-purple-500/30 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer ${item.active ? 'bg-purple-600 justify-end' : 'bg-white/10 justify-start'}`}>
                            <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card p-10 border-white/10">
                    <h4 className="text-xl font-black text-white italic mb-8 uppercase tracking-tight">История входов</h4>
                    <div className="space-y-6">
                      {[
                        { device: 'iPhone 15 Pro • Москва', time: 'Сегодня, 14:42', status: 'Текущая сессия', icon: <Smartphone size={18} /> },
                        { device: 'MacBook Pro • Дубай', time: 'Вчера, 09:15', status: 'Успешно', icon: <Globe size={18} /> },
                        { device: 'Chrome • Лондон', time: '28 Мар, 22:10', status: 'Успешно', icon: <Globe size={18} /> },
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                              {session.icon}
                            </div>
                            <div>
                              <p className="text-white font-bold text-sm">{session.device}</p>
                              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{session.time}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${session.status === 'Текущая сессия' ? 'text-purple-400' : 'text-emerald-500'}`}>
                            {session.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-purple-600/20 border-t-purple-600 flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl font-black text-white">98%</span>
                    </div>
                    <h4 className="text-xl font-black text-white italic mb-2">Уровень защиты</h4>
                    <p className="text-xs text-gray-500 mb-8">Ваш аккаунт максимально защищен. Все системы работают в штатном режиме.</p>
                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Усилить защиту</button>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/20">
                    <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mx-auto mb-6">
                      <ShieldAlert size={32} />
                    </div>
                    <h4 className="text-lg font-black text-white italic mb-4 text-center">Экстренная заморозка</h4>
                    <p className="text-[10px] text-gray-500 text-center mb-8 leading-relaxed">Мгновенная блокировка всех счетов и крипто-активов. Разблокировка только через личный визит или видео-звонок менеджеру.</p>
                    <button className="w-full py-5 bg-rose-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20">
                      Заморозить всё
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <h3 className="text-4xl font-black text-white italic tracking-tight mb-4 uppercase">Аналитика Капитала</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-10 border-white/10 h-[400px] flex flex-col">
                  <h4 className="text-xl font-bold text-white mb-10">Динамика портфеля (12 мес)</h4>
                  <div className="flex-1 flex items-end gap-2">
                    {[40, 60, 45, 90, 65, 80, 100, 85, 110, 95, 130, 120].map((h, i) => (
                      <div key={i} className="flex-1 bg-purple-600/20 rounded-t-lg relative group">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.05 }}
                          className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg group-hover:brightness-125 transition-all"
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-black px-2 py-1 rounded">
                          +{h}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                    <span>Апр 2025</span>
                    <span>Мар 2026</span>
                  </div>
                </div>

                <div className="glass-card p-10 border-white/10">
                  <h4 className="text-xl font-bold text-white mb-8">Структура активов</h4>
                  <div className="space-y-6">
                    {[
                      { label: 'Фиатные средства', val: '65%', color: 'bg-blue-500' },
                      { label: 'Криптовалюты', val: '25%', color: 'bg-orange-500' },
                      { label: 'Инвестиции в акции', val: '8%', color: 'bg-emerald-500' },
                      { label: 'Драгметаллы', val: '2%', color: 'bg-luxury-gold' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400 font-bold">{item.label}</span>
                          <span className="text-white font-black">{item.val}</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className={`${item.color} h-full rounded-full`} style={{ width: item.val }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="flex justify-between items-end">
                <h3 className="text-4xl font-black text-white italic tracking-tight uppercase">История операций</h3>
                <div className="flex gap-4">
                  <div className="px-4 py-2 glass-card border-white/10 flex items-center gap-3">
                    <Search size={16} className="text-gray-500" />
                    <input type="text" placeholder="Поиск по названию..." className="bg-transparent border-none text-xs focus:ring-0 outline-none text-white w-48" />
                  </div>
                  <button className="px-6 py-2 glass-card border-white/10 text-white font-bold text-xs uppercase tracking-widest">Экспорт PDF</button>
                </div>
              </div>
              
              <div className="glass-card border-white/10 overflow-hidden">
                <div className="space-y-1 divide-y divide-white/5">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                          <HistoryIcon size={20} />
                        </div>
                        <div>
                          <p className="text-white font-bold">{tx.title}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{tx.date} • {tx.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-10">
                        <div className="text-right hidden md:block">
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Статус</p>
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase border border-emerald-500/20">Выполнено</span>
                        </div>
                        <p className={`text-xl font-mono font-black w-40 text-right ${tx.amount < 0 ? 'text-white' : 'text-emerald-500'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'concierge' && (
            <motion.div 
              key="concierge"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <motion.div variants={{ initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } }}>
                  <h3 className="text-4xl font-black text-white italic tracking-tight mb-4 uppercase">Консьерж-сервис</h3>
                  <p className="text-gray-500 max-w-xl text-lg">Ваш персональный доступ к лучшим отелям, частным джетам и эксклюзивным событиям по всему миру.</p>
                </motion.div>
                <motion.button 
                  variants={{ initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 } }}
                  className="px-8 py-4 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-gray-200 transition-all shadow-xl shadow-white/10"
                >
                  <Plus size={18} /> Индивидуальный запрос
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {conciergeServices.map((service) => (
                  <motion.div 
                    key={service.id}
                    variants={{ initial: { y: 30, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
                    whileHover={{ y: -10 }}
                    className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent" />
                    </div>
                    
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 text-white">
                      {service.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest">{service.type}</span>
                    </div>

                    <div className="p-8 relative">
                      <h4 className="text-2xl font-black text-white mb-4 italic tracking-tight">{service.title}</h4>
                      <div className="flex flex-wrap items-center gap-6 mb-8">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={16} className="text-purple-500" />
                          <span className="text-xs font-bold uppercase tracking-widest">{service.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <DollarSign size={16} className="text-emerald-500" />
                          <span className="text-xs font-bold uppercase tracking-widest text-white">{service.price}</span>
                        </div>
                      </div>
                      <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] group-hover:bg-purple-600 group-hover:border-purple-500 transition-all">
                        Забронировать сейчас
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Personal Manager Chat UI */}
              <motion.div 
                variants={{ initial: { y: 40, opacity: 0 }, animate: { y: 0, opacity: 1 } }}
                className="p-10 rounded-[3rem] glass-card border-purple-500/20 bg-gradient-to-r from-purple-600/5 to-transparent flex flex-col md:flex-row items-center gap-10"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander" alt="Manager" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-[#020205] shadow-lg" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-black text-white mb-2 italic">Ваш персональный менеджер</h4>
                  <p className="text-gray-500 mb-6">Александр всегда на связи, чтобы помочь с любым запросом: от бронирования джета до сложных инвестиционных сделок.</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <button className="px-8 py-3 bg-purple-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20">Начать чат</button>
                    <button className="px-8 py-3 bg-white/5 border border-white/10 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Заказать звонок</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transfer Modal */}
      <AnimatePresence>
        {showTransferModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowTransferModal(false)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-card border-white/10 p-10 shadow-2xl"
            >
              {transferStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h4 className="text-2xl font-black text-white mb-2 italic tracking-tight uppercase">Новый перевод</h4>
                    <p className="text-gray-500 text-sm tracking-wide">Заполните данные получателя</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Кому (ID или Номер)</label>
                      <input 
                        type="text" 
                        value={transferDetails.to}
                        onChange={(e) => setTransferDetails({...transferDetails, to: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-purple-500 outline-none transition-all font-mono"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Сумма (₽)</label>
                      <input 
                        type="number" 
                        value={transferDetails.amount}
                        onChange={(e) => setTransferDetails({...transferDetails, amount: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-purple-500 outline-none transition-all text-2xl font-black italic"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => setTransferStep(2)}
                    disabled={!transferDetails.to || !transferDetails.amount}
                    className="w-full py-5 bg-purple-600 disabled:opacity-50 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-purple-500 transition-all"
                  >
                    Продолжить
                  </button>
                </div>
              )}

              {transferStep === 2 && (
                <div className="space-y-8 text-center">
                  <div className="w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/30">
                    <ShieldCheck size={40} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white mb-2 italic tracking-tight uppercase">Подтверждение</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Вы переводите <span className="text-white font-bold">{parseFloat(transferDetails.amount).toLocaleString()} ₽</span> <br />
                      получателю <span className="text-white font-bold">{transferDetails.to}</span>
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone size={20} className="text-purple-400" />
                      <span className="text-sm text-gray-400">Код из SMS</span>
                    </div>
                    <span className="text-white font-mono font-bold">4292</span>
                  </div>
                  <button 
                    onClick={handleTransfer}
                    className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>Подтвердить перевод <ArrowUpRight size={18} /></>
                    )}
                  </button>
                </div>
              )}

              {transferStep === 3 && (
                <div className="space-y-8 text-center py-4">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 size={48} className="text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-white mb-2 italic tracking-tight uppercase">Успешно!</h4>
                    <p className="text-gray-500 text-sm leading-relaxed tracking-wide">
                      Транзакция обработана WHATTHEBIBA <br />
                      через квантовый протокол защиты.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setShowTransferModal(false);
                      setTransferStep(1);
                      setTransferDetails({ to: '', amount: '', message: '' });
                    }}
                    className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all"
                  >
                    Закрыть
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-start justify-center pt-[10vh] px-6"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowCommandPalette(false)} />
            <motion.div 
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-white/5">
                <Command size={20} className="text-purple-500" />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Что вы хотите найти? (Переводы, Лимиты...)"
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="bg-transparent border-none text-white focus:ring-0 outline-none w-full text-sm font-medium"
                />
                <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-500 font-black">ESC</div>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                {commands.length > 0 ? (
                  commands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        setActiveTab(cmd.id);
                        setShowCommandPalette(false);
                        setCommandSearch('');
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-purple-400 transition-colors">
                          {cmd.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">{cmd.label}</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-white" />
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500 text-xs">Ничего не найдено</div>
                )}
              </div>
              <div className="p-3 bg-white/5 border-t border-white/5 flex justify-between items-center">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">WHATTHEBIBA SMART SEARCH</p>
                <div className="flex gap-2">
                  <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[8px] text-gray-400 font-black">↑↓ NAV</div>
                  <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[8px] text-gray-400 font-black">ENTER SELECT</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wealth Simulator Modal */}
      <AnimatePresence>
        {showWealthSimulator && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowWealthSimulator(false)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-card border-purple-500/20 p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <TrendingUp size={200} />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <h4 className="text-3xl font-black text-white italic tracking-tight uppercase">Симулятор Капитала</h4>
                  <button onClick={() => setShowWealthSimulator(false)} className="text-gray-500 hover:text-white transition-colors">
                    <XCircle size={32} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Инвестиция (₽)</label>
                        <span className="text-white font-mono font-bold">{simInvestment.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" min="100000" max="50000000" step="100000"
                        value={simInvestment} onChange={(e) => setSimInvestment(parseInt(e.target.value))}
                        className="w-full accent-purple-600 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Срок (Лет)</label>
                        <span className="text-white font-mono font-bold">{simYears}</span>
                      </div>
                      <input 
                        type="range" min="1" max="30" step="1"
                        value={simYears} onChange={(e) => setSimYears(parseInt(e.target.value))}
                        className="w-full accent-purple-600 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-black">Стратегия: Агрессивная (18% APR)</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                          <Gem size={24} />
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed italic">Использование AI-алгоритмов и высокорисковых крипто-активов для максимального роста.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center text-center p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20">
                    <p className="text-[10px] text-purple-400 uppercase tracking-[0.3em] mb-4 font-black">Прогноз капитала</p>
                    <h3 className="text-5xl font-black text-white italic tracking-tighter mb-4">
                      {(simInvestment * Math.pow(1.18, simYears)).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽
                    </h3>
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest mb-8">
                      <TrendingUp size={16} /> +{((Math.pow(1.18, simYears) - 1) * 100).toFixed(0)}% прибыли
                    </div>
                    <button className="w-full py-4 bg-white text-black font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl shadow-white/5">Инвестировать сейчас</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Biometric Verification Modal */}
      <AnimatePresence>
        {showBiometric && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass-card border-purple-500/20 p-12 text-center"
            >
              <div className="mb-10 relative inline-block">
                <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  biometricStatus === 'scanning' ? 'border-purple-500 animate-pulse' : 
                  biometricStatus === 'success' ? 'border-emerald-500 bg-emerald-500/10' : 
                  'border-white/10'
                }`}>
                  {biometricStatus === 'success' ? (
                    <CheckCircle2 size={64} className="text-emerald-500" />
                  ) : (
                    <Fingerprint size={64} className={biometricStatus === 'scanning' ? 'text-purple-500' : 'text-white/20'} />
                  )}
                </div>
                {biometricStatus === 'scanning' && (
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10"
                  />
                )}
              </div>

              <h4 className="text-2xl font-black text-white mb-4 italic uppercase tracking-tight">
                {biometricStatus === 'idle' && 'Подтверждение'}
                {biometricStatus === 'scanning' && 'Сканирование...'}
                {biometricStatus === 'success' && 'Личность подтверждена'}
              </h4>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed uppercase tracking-widest font-black text-[10px]">
                {biometricStatus === 'idle' && 'Приложите палец к сенсору или используйте FaceID'}
                {biometricStatus === 'scanning' && 'Проверка биометрических данных в зашифрованном облаке'}
                {biometricStatus === 'success' && 'Доступ разрешен. Операция выполняется'}
              </p>

              {biometricStatus === 'idle' && (
                <div className="space-y-4">
                  <button 
                    onClick={startBiometric}
                    className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/20"
                  >
                    Начать проверку
                  </button>
                  <button 
                    onClick={() => setShowBiometric(false)}
                    className="w-full py-4 text-gray-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
