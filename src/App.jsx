import { useState, useEffect, useRef } from "react";

const VENUE1 = "Sri Vinoda Convention, Hyderabad";
const VENUE1_URL = "https://maps.app.goo.gl/Xapm2UzTwXJ5vzgu5";
const VENUE2 = "D Convention, Hunter Rd, Hanamkonda";
const VENUE2_URL = "https://www.google.com/maps/dir//D+Convention+%26+Hotel+D%27Light,+23-6-204,+Hunter+Rd,+Shyampet,+Hanamkonda,+Telangana+506001,+India/@17.9888198,79.5688627,15z";

// ─── ILLUSTRATED SCENES ──────────────────────────────────────────────

// Pellikuthuru — floral garden scene
function PellikuthuruIllustration() {
  return (
    <svg viewBox="0 0 360 220" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="pelliBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f5e9" />
          <stop offset="100%" stopColor="#c8e6c9" />
        </linearGradient>
        <linearGradient id="pelliSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e5f5" />
          <stop offset="100%" stopColor="#e1bee7" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill="url(#pelliSky)" />
      {/* Ground */}
      <ellipse cx="180" cy="210" rx="180" ry="30" fill="#a5d6a7" />
      {/* Flower arch */}
      <path d="M80 210 Q80 100 180 80 Q280 100 280 210" fill="none" stroke="#ce93d8" strokeWidth="8" strokeLinecap="round" />
      <path d="M80 210 Q80 100 180 80 Q280 100 280 210" fill="none" stroke="#f48fb1" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      {/* Flowers on arch */}
      {[0.15,0.28,0.42,0.55,0.68,0.82,0.95].map((t, i) => {
        const x = 80 + (280-80) * Math.sin(t * Math.PI);
        const y = 210 - 130 * Math.sin(t * Math.PI) * 0.85;
        const colors = ["#f48fb1","#ce93d8","#ffcc80","#ef9a9a","#80cbc4"];
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="10" fill={colors[i % 5]} opacity="0.9" />
            <circle cx={x} cy={y} r="5" fill="#fff" opacity="0.6" />
            {[0,60,120,180,240,300].map(a => (
              <ellipse key={a} cx={x + 8*Math.cos(a*Math.PI/180)} cy={y + 8*Math.sin(a*Math.PI/180)} rx="5" ry="3" fill={colors[i%5]} opacity="0.7" transform={`rotate(${a} ${x + 8*Math.cos(a*Math.PI/180)} ${y + 8*Math.sin(a*Math.PI/180)})`} />
            ))}
          </g>
        );
      })}
      {/* Bride silhouette */}
      <g transform="translate(155, 110)">
        <ellipse cx="12" cy="6" rx="9" ry="11" fill="#f8bbd0" />
        <path d="M3 17 Q0 60 -8 90 Q12 95 32 90 Q24 60 21 17 Z" fill="#f48fb1" />
        <path d="M3 17 Q12 30 21 17" fill="#e91e63" />
        {/* Hair */}
        <path d="M3 6 Q12 -8 21 6" fill="#4a148c" />
        {/* Bindi */}
        <circle cx="12" cy="3" r="1.5" fill="#e91e63" />
        {/* Saree drape */}
        <path d="M21 17 Q35 35 30 65" fill="none" stroke="#ce93d8" strokeWidth="3" />
      </g>
      {/* Hanging strings of flowers */}
      {[110,150,180,210,250].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={90 + i%2*10} x2={x} y2={130 + i%2*10} stroke="#ce93d8" strokeWidth="1" />
          {[0,15,30].map(dy => <circle key={dy} cx={x} cy={90 + i%2*10 + dy + 12} r="4" fill={["#f48fb1","#ce93d8","#ffcc80"][dy/15]} opacity="0.8" />)}
        </g>
      ))}
      {/* Butterflies */}
      <g transform="translate(60,80)">
        <path d="M0 0 Q-15-20-10-8 Q-5 4 0 0" fill="#80deea" opacity="0.8" />
        <path d="M0 0 Q15-20 10-8 Q5 4 0 0" fill="#80deea" opacity="0.8" />
        <path d="M0 0 Q-10 12-6 8 Q-2 4 0 0" fill="#4dd0e1" opacity="0.8" />
        <path d="M0 0 Q10 12 6 8 Q2 4 0 0" fill="#4dd0e1" opacity="0.8" />
        <circle cx="0" cy="0" r="2" fill="#00838f" />
      </g>
      {/* Text */}
      <text x="180" y="200" textAnchor="middle" fill="#6a1b9a" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">Pellikuthuru Ceremony</text>
    </svg>
  );
}

// Haldi — sunset arch scene
function HaldiIllustration() {
  return (
    <svg viewBox="0 0 360 220" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="haldiSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8f00" />
          <stop offset="40%" stopColor="#ffca28" />
          <stop offset="100%" stopColor="#ffe082" />
        </linearGradient>
        <linearGradient id="haldiGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9a825" />
          <stop offset="100%" stopColor="#f57f17" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill="url(#haldiSky)" />
      {/* Sun */}
      <circle cx="180" cy="70" r="35" fill="#fff9c4" opacity="0.9" />
      <circle cx="180" cy="70" r="28" fill="#fff176" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
        <line key={a} x1={180+30*Math.cos(a*Math.PI/180)} y1={70+30*Math.sin(a*Math.PI/180)} x2={180+45*Math.cos(a*Math.PI/180)} y2={70+45*Math.sin(a*Math.PI/180)} stroke="#fff9c4" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      ))}
      {/* Ground */}
      <rect x="0" y="170" width="360" height="50" fill="url(#haldiGround)" />
      <ellipse cx="180" cy="170" rx="180" ry="12" fill="#f9a825" />
      {/* Arch */}
      <rect x="70" y="80" width="18" height="120" rx="4" fill="#e65100" />
      <rect x="272" y="80" width="18" height="120" rx="4" fill="#e65100" />
      <path d="M70 90 Q180 40 290 90" fill="none" stroke="#e65100" strokeWidth="12" strokeLinecap="round" />
      <path d="M70 90 Q180 40 290 90" fill="none" stroke="#ff8f00" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
      {/* Marigold decorations on arch */}
      {[0.1,0.25,0.4,0.5,0.6,0.75,0.9].map((t, i) => {
        const x = 70 + (290-70) * t;
        const y = 90 - 50 * Math.sin(t * Math.PI);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#ff8f00" />
            <circle cx={x} cy={y} r="5" fill="#ffca28" />
            <circle cx={x} cy={y} r="2" fill="#fff" opacity="0.6" />
          </g>
        );
      })}
      {/* Hanging marigold strings */}
      {[100,130,160,200,230,260].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={55+i%2*8} x2={x} y2={85+i%2*8} stroke="#ff8f00" strokeWidth="1.5" />
          {[0,12,24].map(dy => <circle key={dy} cx={x} cy={55+i%2*8+dy} r="5" fill={["#ff8f00","#ffca28","#ef6c00"][dy/12]} />)}
        </g>
      ))}
      {/* Path */}
      <path d="M140 220 Q180 180 220 220" fill="#ffb300" opacity="0.5" />
      <path d="M120 220 L180 175 L240 220" fill="none" stroke="#fff9c4" strokeWidth="2" opacity="0.4" />
      {/* Petals on ground */}
      {[100,130,160,190,220,250].map((x,i) => (
        <ellipse key={i} cx={x} cy={175+i%2*6} rx="6" ry="3" fill="#ff8f00" opacity="0.6" transform={`rotate(${i*30} ${x} ${175+i%2*6})`} />
      ))}
      <text x="180" y="210" textAnchor="middle" fill="#bf360c" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">Haldi Ceremony</text>
    </svg>
  );
}

// Sangeet — dance floor scene
function SangeetIllustration() {
  return (
    <svg viewBox="0 0 360 220" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="sangeetBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0030" />
          <stop offset="100%" stopColor="#4a0080" />
        </linearGradient>
        <radialGradient id="spotlight" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fff9c4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="360" height="220" fill="url(#sangeetBg)" />
      <rect width="360" height="220" fill="url(#spotlight)" />
      {/* Stars */}
      {[30,60,90,120,150,180,210,240,270,300,330].map((x,i) => (
        <circle key={i} cx={x} cy={20+i%3*15} r="1.5" fill="#fff" opacity={0.4+i%3*0.2} />
      ))}
      {/* Chandelier */}
      <line x1="180" y1="0" x2="180" y2="30" stroke="#ffd700" strokeWidth="2" />
      <ellipse cx="180" cy="35" rx="40" ry="10" fill="none" stroke="#ffd700" strokeWidth="1.5" />
      {[-30,-15,0,15,30].map((x,i) => (
        <g key={i}>
          <line x1={180+x} y1={35} x2={180+x} y2={55} stroke="#ffd700" strokeWidth="1" />
          <circle cx={180+x} cy={57} r="4" fill="#fff9c4" opacity="0.9" />
          <circle cx={180+x} cy={57} r="2" fill="#ffd700" />
        </g>
      ))}
      {/* Dance floor */}
      <ellipse cx="180" cy="195" rx="150" ry="25" fill="#2d0060" />
      {[0,1,2,3].map(row => [0,1,2,3,4,5].map(col => (
        <rect key={`${row}-${col}`} x={30+col*55} y={165+row*12} width="52" height="11" rx="2" fill={`rgba(255,255,255,${0.03+row*0.02})`} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      )))}
      {/* Couple dancing */}
      <g transform="translate(155, 95)">
        {/* Bride */}
        <ellipse cx="8" cy="5" rx="7" ry="9" fill="#ffccbc" />
        <path d="M1 14 Q-5 50 -10 80 Q8 85 20 80 Q18 50 15 14 Z" fill="#7b1fa2" opacity="0.9" />
        <path d="M15 14 Q22 30 30 25" fill="none" stroke="#ce93d8" strokeWidth="3" />
        {/* Groom */}
        <g transform="translate(30, 0)">
          <ellipse cx="8" cy="5" rx="7" ry="9" fill="#ffccbc" />
          <rect x="1" y="14" width="14" height="50" rx="3" fill="#37474f" />
          <rect x="3" y="14" width="10" height="8" rx="2" fill="#fff" />
          <line x1="8" y1="14" x2="8" y2="64" stroke="#37474f" strokeWidth="1" />
        </g>
        {/* Joined hands */}
        <line x1="15" y1="30" x2="37" y2="28" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* Music notes */}
      {[[40,60],[300,50],[60,140],[310,130],[80,90]].map(([x,y],i) => (
        <text key={i} x={x} y={y} fontSize="18" fill="#ce93d8" opacity={0.5+i%3*0.2} fontFamily="serif">&#9835;</text>
      ))}
      {/* Sparkles */}
      {[[100,100],[250,80],[150,130],[220,120]].map(([x,y],i) => (
        <g key={i}>
          <line x1={x} y1={y-8} x2={x} y2={y+8} stroke="#ffd700" strokeWidth="1.5" opacity="0.6" />
          <line x1={x-8} y1={y} x2={x+8} y2={y} stroke="#ffd700" strokeWidth="1.5" opacity="0.6" />
          <line x1={x-6} y1={y-6} x2={x+6} y2={y+6} stroke="#ffd700" strokeWidth="1" opacity="0.4" />
          <line x1={x+6} y1={y-6} x2={x-6} y2={y+6} stroke="#ffd700" strokeWidth="1" opacity="0.4" />
        </g>
      ))}
      <text x="180" y="213" textAnchor="middle" fill="#ce93d8" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">Sangeet Night</text>
    </svg>
  );
}

// Wedding — mandap scene
function WeddingIllustration() {
  return (
    <svg viewBox="0 0 360 220" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="weddingBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff9f0" />
          <stop offset="100%" stopColor="#fff3e0" />
        </linearGradient>
        <linearGradient id="mandapPillar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#bf8c00" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#bf8c00" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" fill="url(#weddingBg)" />
      {/* Sky gradient top */}
      <rect width="360" height="100" fill="#fff8e1" opacity="0.5" />
      {/* Mandap pillars */}
      {[60,280].map((x,i) => (
        <g key={i}>
          <rect x={x-10} y={60} width="20" height="140" rx="4" fill="url(#mandapPillar)" />
          {[70,90,110,130,150,170].map(y => <rect key={y} x={x-12} y={y} width="24" height="6" rx="3" fill="#ffd700" opacity="0.6" />)}
        </g>
      ))}
      {/* Mandap roof */}
      <path d="M50 65 L180 25 L310 65 L310 75 L180 35 L50 75 Z" fill="#ffd700" />
      <path d="M50 65 L180 25 L310 65" fill="none" stroke="#bf8c00" strokeWidth="3" />
      {/* Hanging flowers */}
      {[80,110,140,180,220,250,280].map((x,i) => (
        <g key={i}>
          <line x1={x} y1={65} x2={x} y2={90+i%2*12} stroke="#ef9a9a" strokeWidth="1.5" />
          {[0,10,20].map(dy => <circle key={dy} cx={x} cy={65+dy+5} r="5" fill={["#f48fb1","#ef9a9a","#ffcc80"][dy/10]} opacity="0.9" />)}
        </g>
      ))}
      {/* Sacred fire */}
      <g transform="translate(160, 140)">
        <ellipse cx="20" cy="35" rx="18" ry="6" fill="#bf360c" opacity="0.5" />
        <path d="M8 35 Q12 5 20 0 Q28 5 32 35 Z" fill="#ff6d00" />
        <path d="M12 35 Q15 12 20 8 Q25 12 28 35 Z" fill="#ffca28" />
        <path d="M15 35 Q18 18 20 15 Q22 18 25 35 Z" fill="#fff9c4" />
        {/* Pot */}
        <path d="M6 35 Q8 42 20 44 Q32 42 34 35" fill="#8d4004" />
        <rect x="4" y="38" width="32" height="10" rx="5" fill="#795548" />
      </g>
      {/* Bride */}
      <g transform="translate(108, 100)">
        <ellipse cx="12" cy="7" rx="10" ry="13" fill="#ffccbc" />
        <path d="M2 20 Q-2 75 -6 105 L30 105 Q26 75 22 20 Z" fill="#c62828" />
        <path d="M22 20 Q32 40 38 35" fill="none" stroke="#ffd700" strokeWidth="2.5" />
        <path d="M2 20 Q8 28 12 26" fill="#8d1a1a" />
        <circle cx="12" cy="4" r="2" fill="#c62828" />
        {/* Bangles */}
        {[0,5,10].map(dy => <ellipse key={dy} cx={38} cy={35+dy} rx="5" ry="3" fill="none" stroke="#ffd700" strokeWidth="1.5" />)}
        {/* Dupatta */}
        <path d="M-6 30 Q-20 50-18 80" fill="none" stroke="#ef9a9a" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* Groom */}
      <g transform="translate(195, 100)">
        <ellipse cx="12" cy="7" rx="10" ry="13" fill="#ffccbc" />
        <rect x="2" y="20" width="20" height="70" rx="3" fill="#1a237e" />
        <rect x="4" y="20" width="16" height="10" rx="3" fill="#fffde7" />
        <line x1="12" y1="20" x2="12" y2="90" stroke="#1a237e" strokeWidth="1" />
        {/* Turban */}
        <path d="M2 7 Q12-8 22 7" fill="#ffd700" />
        <path d="M2 7 Q12-4 22 7" fill="#ff8f00" opacity="0.6" />
        <circle cx="12" cy="1" r="3" fill="#ffd700" />
        {/* Sherwani details */}
        {[35,50,65].map(y => <line key={y} x1={6} y1={y} x2={18} y2={y} stroke="#ffd700" strokeWidth="0.8" opacity="0.5" />)}
        {/* Joined hands */}
        <path d="M2 45 Q-10 42-22 45" fill="none" stroke="#ffccbc" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* Rose petals on ground */}
      {[70,100,130,160,195,225,255,285].map((x,i) => (
        <ellipse key={i} cx={x} cy={195+i%2*8} rx="7" ry="4" fill="#ef9a9a" opacity="0.7" transform={`rotate(${i*25} ${x} ${195+i%2*8})`} />
      ))}
      <text x="180" y="215" textAnchor="middle" fill="#8d4004" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">The Sacred Wedding</text>
    </svg>
  );
}

// Reception — ballroom scene
function ReceptionIllustration() {
  return (
    <svg viewBox="0 0 360 220" width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="recepBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0a2e" />
          <stop offset="100%" stopColor="#0d0018" />
        </linearGradient>
        <radialGradient id="recepLight" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="360" height="220" fill="url(#recepBg)" />
      <rect width="360" height="220" fill="url(#recepLight)" />
      {/* Stars/bokeh */}
      {[20,50,80,110,140,170,200,230,260,290,320,340,30,70,130,200,250,310].map((x,i) => (
        <circle key={i} cx={x} cy={15+i%4*15} r={1+i%3*0.8} fill="#fff" opacity={0.2+i%4*0.15} />
      ))}
      {/* Chandeliers */}
      {[90,180,270].map((x,i) => (
        <g key={i}>
          <line x1={x} y1={0} x2={x} y2={25} stroke="#ffd700" strokeWidth="1.5" />
          <ellipse cx={x} cy={28} rx="25" ry="7" fill="none" stroke="#ffd700" strokeWidth="1" />
          {[-16,-8,0,8,16].map((dx,j) => (
            <g key={j}>
              <line x1={x+dx} y1={28} x2={x+dx} y2={42} stroke="#ffd700" strokeWidth="0.8" />
              <circle cx={x+dx} cy={44} r="3" fill="#fff9c4" opacity="0.9" />
            </g>
          ))}
        </g>
      ))}
      {/* Columns */}
      {[40,320].map((x,i) => (
        <g key={i}>
          <rect x={x-8} y={50} width="16" height="150" rx="8" fill="#2d0060" opacity="0.8" />
          <rect x={x-10} y={48} width="20" height="10" rx="5" fill="#ffd700" opacity="0.6" />
          <rect x={x-10} y={190} width="20" height="10" rx="5" fill="#ffd700" opacity="0.6" />
        </g>
      ))}
      {/* Floor */}
      <rect x="0" y="175" width="360" height="45" fill="#0d0018" />
      {[0,1,2,3].map(row => [0,1,2,3,4,5,6].map(col => (
        <rect key={`${row}-${col}`} x={col*52} y={175+row*11} width="50" height="10" rx="1" fill={`rgba(255,215,0,${0.03+col%2*0.02})`} />
      )))}
      {/* Decorative arches */}
      <path d="M60 175 Q180 100 300 175" fill="none" stroke="#4a0080" strokeWidth="3" opacity="0.8" />
      <path d="M60 175 Q180 100 300 175" fill="none" stroke="#7b1fa2" strokeWidth="1" opacity="0.5" />
      {/* Floral hanging */}
      {[90,140,180,220,270].map((x,i) => (
        <g key={i}>
          <line x1={x} y1={100+i%2*5} x2={x} y2={130+i%2*5} stroke="#f48fb1" strokeWidth="1" />
          {[0,12,24].map(dy => <circle key={dy} cx={x} cy={100+i%2*5+dy+6} r="5" fill={["#f48fb1","#ce93d8","#80deea"][dy/12]} opacity="0.8" />)}
        </g>
      ))}
      {/* Couple */}
      <g transform="translate(147, 105)">
        {/* Bride */}
        <ellipse cx="12" cy="6" rx="9" ry="11" fill="#ffccbc" />
        <path d="M3 17 Q0 55-4 80 L28 80 Q24 55 21 17 Z" fill="#880e4f" />
        <path d="M21 17 Q30 30 35 25" fill="none" stroke="#ce93d8" strokeWidth="2.5" />
        <path d="M3 10 Q12-5 21 10" fill="#880e4f" />
        {/* Groom */}
        <g transform="translate(38, 0)">
          <ellipse cx="10" cy="6" rx="9" ry="11" fill="#ffccbc" />
          <rect x="1" y="17" width="18" height="55" rx="3" fill="#212121" />
          <rect x="3" y="17" width="14" height="8" rx="2" fill="#f5f5f5" />
          <path d="M1 12 Q10-3 19 12" fill="#212121" />
        </g>
        {/* Joined hands */}
        <line x1="21" y1="35" x2="39" y2="33" stroke="#ffccbc" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Sparkles */}
      {[[60,80],[280,70],[100,130],[270,120],[180,75]].map(([x,y],i) => (
        <g key={i} opacity="0.7">
          <line x1={x} y1={y-7} x2={x} y2={y+7} stroke="#ffd700" strokeWidth="1.5" />
          <line x1={x-7} y1={y} x2={x+7} y2={y} stroke="#ffd700" strokeWidth="1.5" />
        </g>
      ))}
      <text x="180" y="213" textAnchor="middle" fill="#ce93d8" fontSize="11" fontFamily="Georgia,serif" fontStyle="italic">Reception Evening</text>
    </svg>
  );
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────
function useCountdown(target) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return;
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [target]);
  return t;
}

// ─── REVEAL ON SCROLL ─────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── ELEGANT DIVIDER ──────────────────────────────────────────────────
function ElegantDivider({ color = "#c9a96e" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color}80)` }} />
      <svg width="28" height="20" viewBox="0 0 28 20">
        <path d="M14 2 L26 10 L14 18 L2 10 Z" fill="none" stroke={color} strokeWidth="1.2" />
        <path d="M14 5 L21 10 L14 15 L7 10 Z" fill={color} opacity="0.3" />
        <circle cx="14" cy="10" r="2.5" fill={color} />
      </svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color}80)` }} />
    </div>
  );
}

// ─── EVENT SECTION ────────────────────────────────────────────────────
function EventSection({ illustration, title, subtitle, telugu, date, day, time, meal, venue, venueUrl, accent = "#8B6914", quote }) {
  return (
    <div style={{ marginBottom: 60 }}>
      {/* Section header */}
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 6, color: accent, textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, opacity: 0.8 }}>{subtitle}</div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 46, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#2c1810", lineHeight: 1, fontStyle: "italic" }}>{title}</div>
          <div style={{ fontSize: 13, color: accent, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", marginTop: 4, opacity: 0.8 }}>{telugu}</div>
        </div>
      </Reveal>

      <ElegantDivider color={accent} />

      {/* Illustration */}
      <Reveal delay={0.15}>
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${accent}25`, boxShadow: `0 8px 32px ${accent}15`, marginBottom: 20 }}>
          {illustration}
        </div>
      </Reveal>

      {/* Event details */}
      <Reveal delay={0.2}>
        <div style={{ background: "#fff", border: `1px solid ${accent}20`, borderRadius: 14, padding: "18px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ borderRight: `1px solid ${accent}20`, paddingRight: 16 }}>
              <div style={{ fontSize: 8, letterSpacing: 3, color: accent, textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, marginBottom: 6 }}>Date</div>
              <div style={{ fontSize: 16, color: "#2c1810", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{date}</div>
              <div style={{ fontSize: 12, color: accent, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, marginTop: 2 }}>{day}</div>
            </div>
            <div style={{ paddingLeft: 8 }}>
              <div style={{ fontSize: 8, letterSpacing: 3, color: accent, textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, marginBottom: 6 }}>Time</div>
              <div style={{ fontSize: 16, color: "#2c1810", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{time}</div>
              <div style={{ fontSize: 12, color: accent, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, marginTop: 2 }}>{meal}</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${accent}15`, paddingTop: 16 }}>
            <div style={{ fontSize: 8, letterSpacing: 3, color: accent, textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, marginBottom: 6 }}>Venue</div>
            <div style={{ fontSize: 15, color: "#2c1810", fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.5 }}>{venue}</div>
            {venueUrl && (
              <a href={venueUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: 12, fontSize: 11, color: "#fff", textDecoration: "none", borderRadius: 20, padding: "7px 20px", background: accent, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: 1 }}>
                NAVIGATE TO VENUE
              </a>
            )}
          </div>
        </div>
      </Reveal>

      {quote && (
        <Reveal delay={0.25}>
          <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: accent, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", opacity: 0.75 }}>
            "{quote}"
          </div>
        </Reveal>
      )}
    </div>
  );
}

// ─── COVER PAGE ───────────────────────────────────────────────────────
function Cover({ onReveal, revealed }) {
  const t = useCountdown("2026-08-26T11:24:00");

  if (!revealed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #fdf8f0 0%, #f5ecd8 50%, #fdf8f0 100%)", position: "relative", overflow: "hidden", cursor: "pointer" }} onClick={onReveal}>
        {/* Decorative background florals */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }} viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          {[0,60,120,180,240,300,360].map((a,i) => (
            <g key={i} transform={`rotate(${a} 200 400)`}>
              <path d="M200 50 Q230 200 200 380 Q170 200 200 50" fill="#8B6914" />
              <path d="M200 50 Q260 180 240 350" fill="none" stroke="#8B6914" strokeWidth="1" opacity="0.5" />
            </g>
          ))}
          {[30,90,150,210,270,330].map((a,i) => (
            <circle key={i+10} cx={200+180*Math.cos(a*Math.PI/180)} cy={400+180*Math.sin(a*Math.PI/180)} r="12" fill="#8B6914" opacity="0.6" />
          ))}
        </svg>

        {/* Wax seal */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div style={{ marginBottom: 28 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ animation: "sealPulse 2.5s ease-in-out infinite" }}>
              {/* Outer ring */}
              <circle cx="60" cy="60" r="56" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeDasharray="4 3" />
              {/* Main seal */}
              <circle cx="60" cy="60" r="46" fill="#8B6914" />
              <circle cx="60" cy="60" r="42" fill="#9B7422" />
              {/* Inner design */}
              {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
                <path key={a} d={`M60 18 Q65 40 60 55 Q55 40 60 18`} fill="#C9A630" opacity="0.6" transform={`rotate(${a} 60 60)`} />
              ))}
              <circle cx="60" cy="60" r="22" fill="#8B6914" />
              <circle cx="60" cy="60" r="19" fill="#C9A630" opacity="0.5" />
              {/* S & P monogram */}
              <text x="60" y="56" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="700">S</text>
              <text x="60" y="63" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="Georgia,serif">&amp;</text>
              <text x="60" y="72" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Georgia,serif" fontStyle="italic" fontWeight="700">P</text>
            </svg>
          </div>

          <div style={{ fontSize: 9, letterSpacing: 7, color: "#8B6914", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, marginBottom: 20, opacity: 0.8 }}>
            You are cordially invited
          </div>

          <div style={{ fontSize: 64, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, color: "#2c1810", lineHeight: 0.9, fontStyle: "italic" }}>
            Pranathi
          </div>
          <div style={{ fontSize: 16, color: "#8B6914", fontFamily: "'Montserrat', sans-serif", letterSpacing: 6, margin: "14px 0", fontWeight: 400 }}>
            &amp;
          </div>
          <div style={{ fontSize: 64, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, color: "#2c1810", lineHeight: 0.9, fontStyle: "italic" }}>
            Srinith
          </div>

          <div style={{ marginTop: 24, fontSize: 12, color: "#8B6914", letterSpacing: 4, fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
            AUGUST 2026 &middot; HYDERABAD
          </div>

          <div style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "tapBounce 1.8s ease-in-out infinite" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #8B6914", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M7 2 L7 12 M3 8 L7 12 L11 8" stroke="#8B6914" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "#8B6914", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, opacity: 0.7 }}>
              Tap to Reveal
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ─── MAIN INVITE ──────────────────────────────────────────────────────
function Invite() {
  const t = useCountdown("2026-08-26T11:24:00");

  return (
    <div style={{ background: "#faf7f2", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg, #fdf8f0 0%, #f5ecd8 100%)", padding: "60px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Background motif */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
          {[0,45,90,135,180,225,270,315].map((a,i) => (
            <path key={i} d="M200 50 Q220 180 200 350 Q180 180 200 50" fill="#8B6914" transform={`rotate(${a} 200 200)`} />
          ))}
        </svg>

        <Reveal>
          <div style={{ fontSize: 9, letterSpacing: 7, color: "#8B6914", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, marginBottom: 20, opacity: 0.8 }}>
            Together with their beloved families
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ fontSize: 68, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, color: "#2c1810", lineHeight: 0.9, fontStyle: "italic" }}>
            Pranathi
          </div>
          <div style={{ fontSize: 15, color: "#8B6914", fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 5, margin: "16px 0", fontStyle: "italic" }}>
            &amp;
          </div>
          <div style={{ fontSize: 68, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, color: "#2c1810", lineHeight: 0.9, fontStyle: "italic" }}>
            Srinith
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <ElegantDivider color="#8B6914" />
          <div style={{ fontSize: 12, color: "#8B6914", letterSpacing: 4, fontFamily: "'Montserrat', sans-serif", fontWeight: 500, marginBottom: 24 }}>
            AUGUST 2026 &middot; HYDERABAD
          </div>
        </Reveal>

        {/* Parents */}
        <Reveal delay={0.25}>
          <div style={{ background: "#fff", border: "1px solid rgba(139,105,20,0.2)", borderRadius: 14, padding: "18px 20px", marginBottom: 24, boxShadow: "0 4px 20px rgba(139,105,20,0.08)" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#8B6914", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, marginBottom: 14, opacity: 0.8 }}>
              With the Blessings of Our Beloved Parents
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "start" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, color: "#8B6914", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, letterSpacing: 1, marginBottom: 5 }}>BRIDE</div>
                <div style={{ fontSize: 14, color: "#2c1810", fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.8 }}>Smt. Sunitha &amp;<br />Sri. Sridhar Reddy</div>
              </div>
              <div style={{ color: "#8B6914", opacity: 0.4, padding: "12px 10px", fontSize: 18 }}>&#10022;</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 9, color: "#8B6914", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, letterSpacing: 1, marginBottom: 5 }}>GROOM</div>
                <div style={{ fontSize: 14, color: "#2c1810", fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.8 }}>Smt. Vijaya &amp;<br />Sri. Srinivas Reddy</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Countdown */}
        <Reveal delay={0.3}>
          <div style={{ fontSize: 9, letterSpacing: 4, color: "#8B6914", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, marginBottom: 14, opacity: 0.8 }}>Wedding Countdown</div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 8 }}>
            {[["Days", t.d], ["Hrs", t.h], ["Min", t.m], ["Sec", t.s]].map(([l, v]) => (
              <div key={l} style={{ textAlign: "center", minWidth: 58, background: "#fff", borderRadius: 10, padding: "10px 6px", border: "1px solid rgba(139,105,20,0.2)", boxShadow: "0 2px 10px rgba(139,105,20,0.08)" }}>
                <div style={{ fontSize: 26, color: "#2c1810", fontWeight: 700, lineHeight: 1, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{String(v).padStart(2, "0")}</div>
                <div style={{ fontSize: 8, color: "#8B6914", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Events */}
      <div style={{ padding: "40px 22px", maxWidth: 480, margin: "0 auto" }}>

        {/* Celebration header */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: 6, color: "#8B6914", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, marginBottom: 8, opacity: 0.8 }}>
              The Celebration Unfolds
            </div>
            <div style={{ fontSize: 32, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#2c1810", fontStyle: "italic" }}>
              Join us for every moment
            </div>
            <div style={{ fontSize: 13, color: "#8B6914", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", marginTop: 6, opacity: 0.75 }}>
              A celebration of sacred traditions and joyful union, crafted with love for you to share in our joy
            </div>
            <ElegantDivider color="#8B6914" />
          </div>
        </Reveal>

        <EventSection
          illustration={<PellikuthuruIllustration />}
          title="Pellikuthuru"
          subtitle="Bridal Shower"
          telugu="pellikuthuru ceremony"
          date="August 24, 2026"
          day="Monday"
          time="7:00 PM"
          meal="Evening"
          venue={VENUE1}
          venueUrl={VENUE1_URL}
          accent="#6a1b9a"
          quote="Celebrating the bride before her big day"
        />

        <EventSection
          illustration={<HaldiIllustration />}
          title="Haldi"
          subtitle="Blessings & Turmeric"
          telugu="pasuppu kaaryakramam"
          date="August 23, 2026"
          day="Sunday"
          time="12:00 PM"
          meal="Lunch"
          venue={VENUE1}
          venueUrl={VENUE1_URL}
          accent="#e65100"
          quote="Glow like turmeric, shine like gold"
        />

        <EventSection
          illustration={<SangeetIllustration />}
          title="Sangeet"
          subtitle="An Evening of Music"
          telugu="sangeet raatri"
          date="August 23, 2026"
          day="Sunday"
          time="7:00 PM"
          meal="Dinner"
          venue={VENUE1}
          venueUrl={VENUE1_URL}
          accent="#4a148c"
          quote="Dance like nobody is watching"
        />

        <EventSection
          illustration={<WeddingIllustration />}
          title="Wedding"
          subtitle="The Grand Union"
          telugu="vivaham"
          date="August 26, 2026"
          day="Wednesday"
          time="11:24 AM"
          meal="Lunch"
          venue={VENUE1}
          venueUrl={VENUE1_URL}
          accent="#8B6914"
        />

        <EventSection
          illustration={<ReceptionIllustration />}
          title="Reception"
          subtitle="An Evening to Remember"
          telugu="reception"
          date="August 30, 2026"
          day="Sunday"
          time="7:15 PM"
          meal="Dinner"
          venue={VENUE2}
          venueUrl={VENUE2_URL}
          accent="#880e4f"
          quote="Join us for one last celebration"
        />

        {/* Footer */}
        <Reveal>
          <div style={{ textAlign: "center", paddingTop: 20, borderTop: "1px solid rgba(139,105,20,0.15)", marginTop: 20 }}>
            <div style={{ fontSize: 32, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, color: "#2c1810", fontStyle: "italic", marginBottom: 8 }}>Pranathi &amp; Srinith</div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#8B6914", fontFamily: "'Montserrat', sans-serif", opacity: 0.7 }}>#SrinithWedsPranathi</div>
            <div style={{ fontSize: 11, color: "#8B6914", fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", marginTop: 8, opacity: 0.6 }}>
              With love &amp; joy &middot; August 2026
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────
export default function WeddingInvite() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia, serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600;1,700&family=Montserrat:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:rgba(139,105,20,0.25); }

        @keyframes sealPulse {
          0%,100% { filter:drop-shadow(0 0 8px rgba(139,105,20,0.4)); transform:scale(1); }
          50%      { filter:drop-shadow(0 0 20px rgba(139,105,20,0.7)); transform:scale(1.04); }
        }
        @keyframes tapBounce {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(6px); }
        }
      `}</style>

      {!revealed ? (
        <Cover onReveal={() => setRevealed(true)} revealed={false} />
      ) : (
        <div style={{ animation: "fadeInUp 0.8s ease forwards" }}>
          <style>{`@keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }`}</style>
          <Invite />
        </div>
      )}
    </div>
  );
}
