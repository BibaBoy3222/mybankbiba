import React, { useMemo } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

const CARDS = [
  { id: 1, color: 'from-[#0a0a0a] to-[#1a1a1a]', type: 'OBSIDIAN', name: 'БЕЗЛИМИТНАЯ', number: '**** 4242' },
  { id: 2, color: 'from-[#1a1a1a] via-[#332a10] to-[#1a1a1a]', type: 'GOLD RESERVE', name: 'ЭЛИТНАЯ', number: '**** 8888' },
  { id: 3, color: 'from-[#2c3e50] to-[#bdc3c7]', type: 'PLATINUM', name: 'ПРИВИЛЕГИЯ', number: '**** 0011' },
  { id: 4, color: 'from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]', type: 'DIAMOND', name: 'БОГАТСТВО', number: '**** 1337' },
];

const Card: React.FC<{ card: typeof CARDS[0]; index: number; total: number }> = ({ card, index, total }) => {
  const x = useMotionValue(-800);
  
  // Slicing and revealing logic
  const physicalClipPath = useTransform(x, [-160, 160], [
    'inset(0% 0% 0% 0%)',   
    'inset(0% 100% 0% 0%)'  
  ]);

  const digitalClipPath = useTransform(x, [-160, 160], [
    'inset(0% 0% 0% 100%)', 
    'inset(0% 0% 0% 0%)'    
  ]);

  const dataOpacity = useTransform(x, [-160, -150, 400, 500], [0, 1, 1, 0]);
  const crumbOpacity = useTransform(x, [-165, -160, 160, 165], [0, 1, 1, 0]);

  const digitalChars = useMemo(() => {
    const chars = [];
    const rows = 14;
    const cols = 24;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        chars.push({
          id: `${r}-${c}`,
          char: Math.random() > 0.5 ? Math.floor(Math.random() * 10) : String.fromCharCode(65 + Math.floor(Math.random() * 26)),
          top: `${(r / rows) * 100}%`,
          left: `${(c / cols) * 100}%`,
        });
      }
    }
    return chars;
  }, []);

  const crumbs = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 0.3,
      duration: 0.5 + Math.random() * 0.8,
      xDist: 80 + Math.random() * 150,
      yDist: (Math.random() - 0.5) * 100,
    }));
  }, []);

  return (
    <motion.div
      style={{ x }}
      animate={{ x: 800 }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        ease: "linear",
        // Stagger cards properly to avoid overlapping
        delay: (index * (12 / total)) 
      }}
      className="absolute flex-shrink-0 w-80 h-48 z-10"
    >
      {/* --- LAYER 1: PHYSICAL CARD --- */}
      <motion.div 
        style={{ clipPath: physicalClipPath }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 border border-white/20 shadow-2xl overflow-hidden"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`} />
        
        <div className="absolute top-4 right-6 text-[10px] font-bold tracking-[0.2em] text-white/40">
          WHATTHEBIBA
        </div>

        <div className="relative h-full flex flex-col justify-between text-white text-left">
          <div className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
            <div className="w-8 h-5 bg-white/20 rounded-sm" />
            {card.type}
          </div>
          <div>
            <div className="text-xl font-mono mb-1 tracking-[0.15em]">{card.number}</div>
            <div className="flex justify-between items-end">
              <div className="text-[10px] uppercase tracking-[0.3em] opacity-50">{card.name}</div>
              <div className="text-[10px] opacity-50 font-mono">12/29</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- LAYER 2: DIGITAL CARD --- */}
      <motion.div 
        style={{ 
          clipPath: digitalClipPath,
          opacity: dataOpacity 
        }}
        className="absolute inset-0 p-4 overflow-hidden pointer-events-none"
      >
        <div className="relative w-full h-full">
          {digitalChars.map((p) => (
            <motion.span 
              key={p.id}
              className="absolute font-mono text-purple-400 font-bold text-[10px] leading-none"
              style={{ 
                top: p.top, 
                left: p.left,
                textShadow: '0 0 4px rgba(168,85,247,0.4)'
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
            >
              {p.char}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* --- LAYER 3: DISSOLVING PARTICLES --- */}
      <motion.div
        style={{ opacity: crumbOpacity }}
        className="absolute top-0 bottom-0 left-0 w-full pointer-events-none z-50"
      >
        {crumbs.map((c) => (
          <motion.div
            key={c.id}
            className="absolute bg-purple-300 rounded-full"
            style={{ 
              top: c.top, 
              left: '0%', 
              width: c.size, 
              height: c.size,
              boxShadow: '0 0 8px #fff'
            }}
            animate={{ 
              x: [0, c.xDist],
              y: [0, c.yDist],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{ 
              duration: c.duration, 
              repeat: Infinity, 
              delay: c.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* --- LAYER 4: IMPACT GLOW --- */}
      <motion.div 
        className="absolute top-[-10%] bottom-[-10%] left-[-2px] w-[4px] bg-white shadow-[0_0_20px_#fff,0_0_40px_#a855f7] z-50 pointer-events-none"
        style={{
          opacity: useTransform(x, [-10, 0, 10], [0, 1, 0]),
          scaleY: useTransform(x, [-10, 0, 10], [1, 1.5, 1])
        }}
      />
    </motion.div>
  );
};

const AnimatedCards: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-[#020205]/50 rounded-[2rem] border border-white/5 shadow-inner">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:50px_50px] opacity-10" />

      {/* THE SECURITY BARRIER */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] z-40">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-purple-500 to-transparent shadow-[0_0_30px_rgba(168,85,247,1)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-64 bg-purple-600/5 blur-[80px] rounded-full pointer-events-none" />
      </div>

      {/* Cards Stream */}
      <div className="relative w-full h-full flex items-center justify-center">
        {CARDS.map((card, index) => (
          <Card key={card.id} card={card} index={index} total={CARDS.length} />
        ))}
      </div>
      
      {/* Brand Label */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <div className="px-6 py-2 glass-card border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
          <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">WHATTHEBIBA: ПРОТОКОЛ ТОКЕНИЗАЦИИ АКТИВЕН</span>
        </div>
      </div>

      {/* Side Vignettes */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#020205] via-transparent to-[#020205] z-30" />
    </div>
  );
};

export default AnimatedCards;
