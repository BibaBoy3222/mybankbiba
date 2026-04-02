import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Gem, Zap, ArrowUpRight } from 'lucide-react';

const LUXURY_CARDS = [
  {
    id: 'black',
    name: 'WHATTHEBIBA OBSIDIAN',
    type: 'VISA INFINITE',
    color: 'from-[#0a0a0a] to-[#1a1a1a]',
    textColor: 'text-luxury-platinum',
    desc: 'Эксклюзивный доступ к услугам консьержа по всему миру, частным джетам и безлимитным кредитным линиям.',
    limit: 'Безлимитно',
    features: ['Персональный консьерж 24/7', 'Доступ в VIP-залы аэропортов', 'Приватный банкинг']
  },
  {
    id: 'gold',
    name: 'WHATTHEBIBA GOLD RESERVE',
    type: 'MASTERCARD ELITE',
    color: 'from-[#1a1a1a] via-[#332a10] to-[#1a1a1a]',
    textColor: 'text-luxury-gold',
    desc: 'Для современных инвесторов. Высокие вознаграждения за глобальные транзакции и управление активами.',
    limit: '100 000 000 ₽',
    features: ['Кэшбэк 10% на товары люкс', 'Личный менеджер по капиталу', 'Крипто-фиатный мост']
  },
  {
    id: 'platinum',
    name: 'WHATTHEBIBA PLATINUM',
    type: 'VISA PRIVILEGE',
    color: 'from-[#2c3e50] to-[#bdc3c7]',
    textColor: 'text-white',
    desc: 'Бесшовное сочетание традиционного банкинга и технологий будущего. Оптимизировано для цифровых кочевников.',
    limit: '25 000 000 ₽',
    features: ['Нулевые комиссии за конвертацию', 'Мгновенная крипто-ликвидность', 'Страхование по всему миру']
  }
];

const CardShowcase: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState(LUXURY_CARDS[0]);

  return (
    <div className="w-full py-20 px-6 max-w-7xl mx-auto z-10">
      <div className="flex flex-col lg:flex-row gap-20 items-center justify-center">
        
        {/* Интуитивный выбор карт - эффект "из кармана" */}
        <div className="flex-1 w-full flex flex-col items-center order-2 lg:order-1">
          <div className="relative w-full max-w-[400px] h-[500px] flex items-center justify-center">
            {LUXURY_CARDS.map((card, index) => {
              const isSelected = selectedCard.id === card.id;
              return (
                <motion.div
                  key={card.id}
                  initial={false}
                  animate={{
                    y: isSelected ? -100 : (index * 40),
                    x: isSelected ? 0 : (index * 10 - 20),
                    rotateZ: isSelected ? 0 : (index * 5 - 10),
                    scale: isSelected ? 1.1 : 0.9,
                    zIndex: isSelected ? 50 : 10 + index,
                    filter: isSelected ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.5) blur(1px)',
                  }}
                  whileHover={!isSelected ? { y: index * 40 - 20, filter: 'brightness(0.8) blur(0px)', transition: { duration: 0.2 } } : {}}
                  onClick={() => setSelectedCard(card)}
                  className={`absolute w-full aspect-[1.58/1] rounded-[2rem] bg-gradient-to-br ${card.color} p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden`}
                >
                  {/* Текстура и блеск */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                  {isSelected && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shine" />}
                  
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col text-left">
                        <span className={`text-[10px] font-black tracking-[0.4em] ${card.textColor}`}>WHATTHEBIBA</span>
                        <span className="text-[8px] opacity-40 font-bold mt-1 tracking-widest uppercase">Wealth Management</span>
                      </div>
                      <Gem size={20} className={card.textColor.includes('gold') ? 'text-yellow-500' : 'text-purple-400'} />
                    </div>

                    <div className="text-left">
                      <div className="text-lg font-mono tracking-[0.2em] text-white/90 mb-4">
                        •••• •••• •••• 4242
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-[8px] opacity-40 uppercase tracking-[0.2em] mb-1">Владелец</span>
                          <span className="text-sm font-bold tracking-widest text-white">JEREMY WAGEMANS</span>
                        </div>
                        <span className={`text-[10px] font-black italic ${card.textColor}`}>{card.type}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Контентная часть */}
        <div className="flex-1 text-left order-1 lg:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCard.id}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <Zap size={24} className="text-purple-400" />
                </div>
                <span className="text-sm font-bold tracking-[0.3em] text-purple-400 uppercase">Статус: Активен</span>
              </div>

              <h2 className={`text-4xl md:text-6xl font-black mb-6 leading-tight ${selectedCard.textColor}`}>
                {selectedCard.name}
              </h2>
              
              <p className="text-gray-400 text-xl mb-10 leading-relaxed max-w-xl">
                {selectedCard.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                  <span className="text-[10px] opacity-40 uppercase tracking-[0.3em] block mb-2 group-hover:text-purple-400 transition-colors">Кредитный лимит</span>
                  <span className="text-3xl font-bold text-white tracking-tight">{selectedCard.limit}</span>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                  <span className="text-[10px] opacity-40 uppercase tracking-[0.3em] block mb-2 group-hover:text-purple-400 transition-colors">Ставка</span>
                  <span className="text-3xl font-bold text-white tracking-tight">0% Фиксировано</span>
                </div>
              </div>

              <div className="space-y-5 mb-12">
                {selectedCard.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <Check size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-white/90 text-lg font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(109, 40, 217, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-6 bg-white text-black font-black rounded-2xl tracking-[0.2em] transition-all uppercase text-sm flex items-center gap-4"
              >
                Получить приглашение
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
