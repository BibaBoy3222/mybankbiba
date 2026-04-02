import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Globe, Cpu, CreditCard, Bitcoin, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import MatrixRain from './components/MatrixRain';
import AnimatedCards from './components/AnimatedCards';
import CardShowcase from './components/CardShowcase';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [showDashboard, setShowDashboard] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    if (showDashboard) setShowDashboard(false);
    
    // Small delay to allow landing to render
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-brand-dark overflow-hidden relative">
      <Navbar 
        onDashboardClick={() => setShowDashboard(!showDashboard)} 
        onNavClick={scrollToSection}
      />
      <MatrixRain />

      <AnimatePresence mode="wait">
        {showDashboard ? (
          <motion.section 
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10 min-h-screen"
          >
            <div className="flex items-center justify-between mb-8">
               <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Личный кабинет <span className="text-purple-500">WHATTHEBIBA</span></h1>
               <button 
                onClick={() => setShowDashboard(false)}
                className="px-6 py-2 glass-card border-white/10 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
               >
                 Вернуться на главную
               </button>
            </div>
            <Dashboard />
          </motion.section>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-2 mb-8 px-4 py-2 glass-card border-purple-500/20 text-purple-400 text-sm font-semibold tracking-widest uppercase animate-pulse"
              >
                <Zap size={16} />
                Платформа будущего WHATTHEBIBA
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter text-white italic"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Вознесите <span className="text-luxury-gold">Капитал</span> <br />
                <span className="text-gradient">На Новую Высоту</span>
              </motion.h1>

              <motion.p 
                className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Бесшовное управление картами, кредитами и криптовалютой с 
                <span className="text-white font-bold ml-1">WHATTHEBIBA</span>. 
                Самая безопасная и стильная финансовая экосистема современности.
              </motion.p>

              <motion.div 
                className="flex flex-col md:flex-row gap-4 mb-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button 
                  onClick={() => setShowDashboard(true)}
                  className="px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-2xl"
                >
                  Личный кабинет
                  <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 glass-card text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-colors">
                  Узнать больше
                </button>
              </motion.div>

              {/* Card Animation Area */}
              <div className="w-full max-w-5xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative glass-card border-white/5 p-4 md:p-12 overflow-hidden purple-glow">
                  <h3 className="text-2xl font-bold mb-8 text-white flex items-center justify-center gap-3 tracking-widest uppercase">
                    <Shield className="text-purple-500" />
                    Безопасность институционального уровня
                  </h3>
                  <AnimatedCards />
                  <div className="mt-8 text-gray-500 text-sm italic">
                    Протокол квантово-устойчивой токенизации активен.
                  </div>
                </div>
              </div>
            </section>

            {/* Luxury Showcase Section */}
            <section id="banking" className="relative py-32 z-10 bg-[radial-gradient(circle_at_top,rgba(109,40,217,0.05)_0%,transparent_50%)]">
              <div className="max-w-7xl mx-auto text-center mb-16 px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-luxury-gold text-xs font-black tracking-[0.3em] uppercase mb-6"
                >
                  Элитные уровни
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter italic">
                  ВЫБЕРИТЕ СВОЙ <span className="text-luxury-gold">СТАТУС</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                  Испытайте вершину частного банкинга с нашими эксклюзивными картами. Создано для тех, кто требует большего, чем просто платежное средство.
                </p>
              </div>
              <CardShowcase />
            </section>

            {/* Services Grid */}
            <section id="wallet" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    icon: <CreditCard className="text-blue-500" size={32} />, 
                    title: "Умные карты", 
                    desc: "Виртуальные и физические карты с мгновенной активацией и нулевой комиссией." 
                  },
                  { 
                    icon: <Bitcoin className="text-yellow-500" size={32} />, 
                    title: "Крипто-кошелек", 
                    desc: "Покупайте, продавайте и храните BTC, ETH и другие активы прямо в приложении WHATTHEBIBA." 
                  },
                  { 
                    icon: <Shield className="text-emerald-500" size={32} />, 
                    title: "Элитная защита", 
                    desc: "Биометрическая аутентификация и мониторинг мошенничества в реальном времени для каждой транзакции." 
                  }
                ].map((service, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="glass-card p-8 border-white/5 hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-white">{service.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Crypto & Trading Section */}
            <section id="crypto" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 text-left">
                  <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
                    Одно приложение. <br />
                    <span className="text-purple-500">Все ваши активы.</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
                    Переключайтесь между традиционной валютой и криптовалютой за миллисекунды. Никаких скрытых спредов, никаких задержек. Только чистая финансовая свобода от WHATTHEBIBA.
                  </p>
                  <ul className="space-y-4">
                    {['Мгновенные обмены BTC/ETH', 'Глубокая ликвидность', 'Холодное хранение активов'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white font-medium">
                        <div className="w-5 h-5 bg-purple-600/20 border border-purple-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <div className="glass-card p-8 border-white/10 purple-glow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Bitcoin size={120} />
                    </div>
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Баланс портфеля</p>
                        <h3 className="text-3xl font-black text-white tracking-tight">12 450 000.00 ₽</h3>
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20">
                        +12.5%
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'Bitcoin', symbol: 'BTC', val: '1.24', price: '8 420 000 ₽', color: 'bg-orange-500' },
                        { name: 'Ethereum', symbol: 'ETH', val: '14.5', price: '245 000 ₽', color: 'bg-blue-500' },
                        { name: 'WHATTHEBIBA Coin', symbol: 'WTB', val: '1M+', price: '100 ₽', color: 'bg-purple-500' },
                      ].map((coin, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 ${coin.color} rounded-xl flex items-center justify-center font-bold text-black`}>
                              {coin.symbol[0]}
                            </div>
                            <div className="text-left">
                              <p className="text-white font-bold">{coin.name}</p>
                              <p className="text-gray-500 text-xs">{coin.val} {coin.symbol}</p>
                            </div>
                          </div>
                          <p className="text-white font-mono font-bold group-hover:text-purple-400 transition-colors text-right">{coin.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Credit Section */}
            <section className="relative py-32 px-6 bg-brand-dark z-10 border-t border-white/5">
              <div className="max-w-7xl mx-auto text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter italic">КРЕДИТ БЕЗ ГРАНИЦ</h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                  Получайте мгновенные кредитные линии на основе ваших активов WHATTHEBIBA. Никаких бумаг, только код.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="glass-card p-10 border-white/10 hover:border-blue-500/30 transition-all text-left">
                  <h4 className="text-2xl font-bold text-white mb-4">Персональный кредит</h4>
                  <p className="text-gray-400 mb-8 leading-relaxed">До 5 000 000 ₽ с 0% годовых на первые 6 месяцев. Эксклюзивно для участников WHATTHEBIBA Premium.</p>
                  <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs">Подать заявку</button>
                </div>
                <div className="glass-card p-10 border-white/10 hover:border-purple-500/30 transition-all text-left">
                  <h4 className="text-2xl font-bold text-white mb-4">Крипто-кредиты</h4>
                  <p className="text-gray-400 mb-8 leading-relaxed">Используйте BTC или ETH в качестве залога и получайте мгновенную ликвидность без продажи ваших активов.</p>
                  <button className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors uppercase tracking-widest text-xs">Исследовать займы</button>
                </div>
              </div>
            </section>

            {/* Brand Spotlight */}
            <section className="relative py-20 bg-gradient-to-t from-purple-950/20 to-transparent border-y border-white/5 overflow-hidden">
              <div className="flex animate-marquee gap-20 py-8 text-6xl md:text-9xl font-black opacity-10 whitespace-nowrap select-none italic">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="tracking-tighter uppercase">WHATTHEBIBA</span>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="relative py-20 px-6 border-t border-white/10 z-10">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2 text-left">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl italic">W</span>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">WHATTHEBIBA</span>
                  </div>
                  <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                    Переосмысление банковского опыта для следующего поколения цифровых пользователей.
                  </p>
                </div>
                <div className="text-left">
                  <h5 className="text-white font-bold mb-6">Услуги</h5>
                  <ul className="space-y-4 text-gray-500 text-sm">
                    <li className="hover:text-purple-400 cursor-pointer">Банкинг</li>
                    <li className="hover:text-purple-400 cursor-pointer">Крипто</li>
                    <li className="hover:text-purple-400 cursor-pointer">Кредитование</li>
                    <li className="hover:text-purple-400 cursor-pointer">Страхование</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h5 className="text-white font-bold mb-6">Контакты</h5>
                  <ul className="space-y-4 text-gray-500 text-sm">
                    <li className="hover:text-purple-400 cursor-pointer">Поддержка</li>
                    <li className="hover:text-purple-400 cursor-pointer">Условия</li>
                    <li className="hover:text-purple-400 cursor-pointer">Приватность</li>
                    <li className="hover:text-purple-400 cursor-pointer">Карьера</li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
                <span>&copy; 2026 WHATTHEBIBA BANKING CORP. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</span>
                <div className="flex gap-6">
                  <Globe size={16} />
                  <Cpu size={16} />
                  <Shield size={16} />
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
