import { useState, useRef, useEffect } from "react";

const VENUE = "Sri Vinoda Convention, Hyderabad";
const VENUE_URL = "https://maps.app.goo.gl/Xapm2UzTwXJ5vzgu5";

// ─── SVG DOODLE LIBRARY ───────────────────────────────────────────────
const Lotus = ({ size = 60, color = "#C9A630", opacity = 0.7 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity }}>
    <ellipse cx="30" cy="38" rx="8" ry="14" fill={color} opacity="0.5" transform="rotate(-30 30 38)" />
    <ellipse cx="30" cy="38" rx="8" ry="14" fill={color} opacity="0.5" transform="rotate(0 30 38)" />
    <ellipse cx="30" cy="38" rx="8" ry="14" fill={color} opacity="0.5" transform="rotate(30 30 38)" />
    <ellipse cx="30" cy="38" rx="8" ry="14" fill={color} opacity="0.4" transform="rotate(-60 30 38)" />
    <ellipse cx="30" cy="38" rx="8" ry="14" fill={color} opacity="0.4" transform="rotate(60 30 38)" />
    <circle cx="30" cy="34" r="6" fill={color} />
    <circle cx="30" cy="34" r="3" fill="white" opacity="0.4" />
  </svg>
);

const Paisley = ({ size = 50, color = "#C9A630", opacity = 0.6 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{ opacity }}>
    <path d="M25 45 Q10 35 12 20 Q14 8 25 10 Q36 8 38 20 Q40 35 25 45Z" fill="none" stroke={color} strokeWidth="1.5" />
    <path d="M25 40 Q15 32 17 22 Q19 14 25 15 Q31 14 33 22 Q35 32 25 40Z" fill={color} opacity="0.3" />
    <circle cx="25" cy="18" r="3" fill={color} />
    <path d="M25 45 Q30 48 35 44" fill="none" stroke={color} strokeWidth="1" />
  </svg>
);

const MangoLeaf = ({ size = 40, color = "#2D6A4F", opacity = 0.7 }) => (
  <svg width={size} height={size * 2} viewBox="0 0 40 80" style={{ opacity }}>
    <path d="M20 5 Q35 20 35 45 Q35 70 20 75 Q5 70 5 45 Q5 20 20 5Z" fill={color} opacity="0.8" />
    <line x1="20" y1="5" x2="20" y2="75" stroke="white" strokeWidth="1" opacity="0.4" />
    {[15,25,35,45,55,65].map(y => (
      <line key={y} x1="20" y1={y} x2="10" y2={y - 5} stroke="white" strokeWidth="0.5" opacity="0.3" />
    ))}
    {[15,25,35,45,55,65].map(y => (
      <line key={y + 100} x1="20" y1={y} x2="30" y2={y - 5} stroke="white" strokeWidth="0.5" opacity="0.3" />
    ))}
  </svg>
);

const Star = ({ size = 20, color = "#FFD700", opacity = 0.8 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={{ opacity }}>
    <polygon points="10,1 12.5,7.5 19,8 14,13 15.5,19.5 10,16 4.5,19.5 6,13 1,8 7.5,7.5" fill={color} />
  </svg>
);

const DiamondDivider = ({ color = "#C9A630", width = 200 }) => (
  <svg width={width} height={20} viewBox={`0 0 ${width} 20`} style={{ opacity: 0.7 }}>
    <line x1="0" y1="10" x2={width / 2 - 12} y2="10" stroke={color} strokeWidth="0.8" />
    <polygon points={`${width/2},4 ${width/2+8},10 ${width/2},16 ${width/2-8},10`} fill={color} />
    <line x1={width / 2 + 12} y1="10" x2={width} y2="10" stroke={color} strokeWidth="0.8" />
    <circle cx={width/2 - 20} cy={10} r="2" fill={color} />
    <circle cx={width/2 + 20} cy={10} r="2" fill={color} />
  </svg>
);

const Firework = ({ size = 60, color = "#C9A630", opacity = 0.5 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity }}>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
      <line key={a} x1="30" y1="30"
        x2={30 + 25 * Math.cos(a * Math.PI / 180)}
        y2={30 + 25 * Math.sin(a * Math.PI / 180)}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    ))}
    <circle cx="30" cy="30" r="4" fill={color} />
  </svg>
);

const MusicNote = ({ size = 30, color = "#9B59B6", opacity = 0.7 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" style={{ opacity }}>
    <path d="M12 22 L12 8 L24 5 L24 14" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="10" cy="22" r="3" fill={color} />
    <circle cx="22" cy="14" r="3" fill={color} />
  </svg>
);

const Diya = ({ size = 40, color = "#F5A623", opacity = 0.8 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }}>
    <path d="M8 28 Q20 32 32 28 Q28 38 20 38 Q12 38 8 28Z" fill={color} opacity="0.7" />
    <ellipse cx="20" cy="26" rx="12" ry="5" fill={color} />
    <path d="M20 22 Q18 14 20 8 Q22 14 20 22Z" fill="#FFD700" />
    <ellipse cx="20" cy="22" rx="3" ry="4" fill="#FF6B00" opacity="0.8" />
    <circle cx="20" cy="20" r="1.5" fill="#FFD700" />
  </svg>
);

const Shehnai = ({ size = 50, color = "#8B6914", opacity = 0.6 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{ opacity }}>
    <path d="M5 25 Q10 20 20 22 Q30 20 45 15" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M45 15 Q50 12 48 18 Q46 24 45 15Z" fill={color} />
    <circle cx="8" cy="24" r="3" fill={color} />
    {[12,16,20].map(x => <circle key={x} cx={x} cy={22} r="1.5" fill={color} opacity="0.6" />)}
  </svg>
);

const PeacockFeather = ({ size = 80, opacity = 0.5 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 80 120" style={{ opacity }}>
    <path d="M40 110 Q38 70 40 30 Q42 70 40 110Z" fill="#2D6A4F" />
    <ellipse cx="40" cy="30" rx="18" ry="25" fill="#1a4f8a" opacity="0.6" />
    <ellipse cx="40" cy="30" rx="12" ry="18" fill="#2D6A4F" opacity="0.8" />
    <ellipse cx="40" cy="30" rx="7" ry="11" fill="#C9A630" opacity="0.9" />
    <circle cx="40" cy="30" r="4" fill="#1a4f8a" />
    <circle cx="40" cy="30" r="2" fill="#C9A630" />
  </svg>
);

const FlowerBorder = ({ color = "#C9A630", width = 300 }) => (
  <svg width={width} height={30} viewBox={`0 0 ${width} 30`} style={{ opacity: 0.5 }}>
    {[...Array(Math.floor(width / 30))].map((_, i) => (
      <g key={i} transform={`translate(${i * 30 + 15}, 15)`}>
        {[0, 60, 120, 180, 240, 300].map(a => (
          <ellipse key={a} cx={6 * Math.cos(a * Math.PI / 180)} cy={6 * Math.sin(a * Math.PI / 180)} rx="4" ry="2" fill={color} transform={`rotate(${a})`} />
        ))}
        <circle cx="0" cy="0" r="2" fill={color} />
      </g>
    ))}
  </svg>
);

const GoldCorner = ({ size = 100, flip = false, flipV = false, color = "#C9A630" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.4, transform: `scaleX(${flip ? -1 : 1}) scaleY(${flipV ? -1 : 1})` }}>
    <path d="M5 5 L40 5 Q45 5 45 10 L45 20 Q45 25 40 25 L20 25 Q15 25 15 30 L15 45 Q15 50 10 50 L5 50 Z" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="5" cy="5" r="3" fill={color} />
    <path d="M5 5 Q15 5 15 15 Q15 25 25 25 Q35 25 35 35 Q35 45 45 45" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    <circle cx="45" cy="45" r="2" fill={color} opacity="0.6" />
    {[0, 15, 30].map(i => <circle key={i} cx={5 + i * 1.5} cy={5} r="0.8" fill={color} />)}
    {[0, 15, 30].map(i => <circle key={i + 10} cx={5} cy={5 + i * 1.5} r="0.8" fill={color} />)}
  </svg>
);

// ─── COUNTDOWN ────────────────────────────────────────────────────────
function Countdown({ target, color }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return;
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {[['Days', t.d], ['Hrs', t.h], ['Min', t.m], ['Sec', t.s]].map(([l, v]) => (
        <div key={l} style={{ textAlign: 'center', minWidth: 52 }}>
          <div style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", color, fontWeight: 700, lineHeight: 1 }}>{String(v).padStart(2, '0')}</div>
          <div style={{ fontSize: 10, color, opacity: 0.6, letterSpacing: 2, textTransform: 'uppercase' }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── PAGE DEFINITIONS ─────────────────────────────────────────────────
const pages = [
  { id: 'cover' },
  { id: 'sangeet' },
  { id: 'haldi' },
  { id: 'wedding' },
  { id: 'reception' },
];

// ─── INDIVIDUAL PAGE CONTENT ──────────────────────────────────────────

function CoverPage() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #fdf6e3 0%, #f5e4b0 50%, #faecd0 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px 24px', overflow: 'hidden' }}>
      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}><GoldCorner size={90} /></div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}><GoldCorner size={90} flip /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}><GoldCorner size={90} flipV /></div>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}><GoldCorner size={90} flip flipV /></div>

      {/* Scattered doodles */}
      <div style={{ position: 'absolute', top: 80, left: 16 }}><Paisley size={45} color="#C9A630" opacity={0.3} /></div>
      <div style={{ position: 'absolute', top: 80, right: 16 }}><Paisley size={45} color="#C9A630" opacity={0.3} /></div>
      <div style={{ position: 'absolute', bottom: 120, left: 20 }}><Lotus size={50} color="#C97D00" opacity={0.3} /></div>
      <div style={{ position: 'absolute', bottom: 120, right: 20 }}><Lotus size={50} color="#C97D00" opacity={0.3} /></div>
      <div style={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)' }}><MangoLeaf size={22} color="#8B6914" opacity={0.25} /></div>
      <div style={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%) scaleX(-1)' }}><MangoLeaf size={22} color="#8B6914" opacity={0.25} /></div>

      {/* Dot pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(139,105,20,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px', pointerEvents: 'none' }} />

      {/* Border frame */}
      <div style={{ position: 'absolute', inset: 14, border: '1px solid rgba(139,105,20,0.2)', borderRadius: 4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 18, border: '0.5px solid rgba(139,105,20,0.12)', borderRadius: 2, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 320 }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: '#A0855A', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Georgia, serif' }}>
          Together with their families
        </div>

        <FlowerBorder color="#C9A630" width={260} />

        <div style={{ margin: '18px 0 4px' }}>
          <div style={{ fontSize: 'clamp(48px, 13vw, 64px)', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 0.95, background: 'linear-gradient(135deg, #6B4F00, #C9A630, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Srinith
          </div>
          <div style={{ fontSize: 15, color: '#A0855A', fontStyle: 'italic', fontFamily: 'Georgia, serif', letterSpacing: 3, margin: '6px 0' }}>— weds —</div>
          <div style={{ fontSize: 'clamp(48px, 13vw, 64px)', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 0.95, background: 'linear-gradient(135deg, #6B4F00, #C9A630, #8B6914)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Pranathi
          </div>
        </div>

        <DiamondDivider color="#C9A630" width={200} />

        <div style={{ margin: '14px 0', fontSize: 11, color: '#8B6914', letterSpacing: 2, fontFamily: 'Georgia, serif' }}>
          శుభ వివాహం · August 2026 · Hyderabad
        </div>

        <div style={{ background: 'rgba(139,105,20,0.08)', border: '1px solid rgba(139,105,20,0.2)', borderRadius: 10, padding: '14px 18px', marginBottom: 16 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: '#A0855A', textTransform: 'uppercase', marginBottom: 8 }}>Blessed by</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 6, alignItems: 'center' }}>
            <div style={{ textAlign: 'right', fontSize: 11, color: '#2a1500', fontFamily: 'Georgia, serif', lineHeight: 1.5 }}>
              <div style={{ fontSize: 9, color: '#8B6914', marginBottom: 2 }}>Groom's Family</div>
              [Name] &<br />Smt. Vijaya
            </div>
            <div style={{ color: '#C9A630', fontSize: 12, opacity: 0.5 }}>✦</div>
            <div style={{ textAlign: 'left', fontSize: 11, color: '#2a1500', fontFamily: 'Georgia, serif', lineHeight: 1.5 }}>
              <div style={{ fontSize: 9, color: '#8B6914', marginBottom: 2 }}>Bride's Family</div>
              Sri. Sridhar Reddy &<br />Smt. Sunitha
            </div>
          </div>
        </div>

        <Countdown target="2026-08-26T11:20:00" color="#8B6914" />

        <div style={{ marginTop: 16, fontSize: 10, color: '#C9A630', letterSpacing: 3, fontFamily: 'Georgia, serif' }}>
          Swipe to explore →
        </div>
      </div>
    </div>
  );
}

function SangeetPage() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #0d0015 0%, #1a0030 40%, #0a001a 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px 24px', overflow: 'hidden' }}>
      {/* Purple gradient blobs */}
      <div style={{ position: 'absolute', top: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,89,182,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }} />
      <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(142,68,173,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}><GoldCorner size={80} color="#9B59B6" /></div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}><GoldCorner size={80} flip color="#9B59B6" /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}><GoldCorner size={80} flipV color="#9B59B6" /></div>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}><GoldCorner size={80} flip flipV color="#9B59B6" /></div>

      {/* Doodles */}
      <div style={{ position: 'absolute', top: 70, left: 12 }}><MusicNote size={28} color="#C39BD3" opacity={0.5} /></div>
      <div style={{ position: 'absolute', top: 100, right: 14 }}><MusicNote size={22} color="#A569BD" opacity={0.4} /></div>
      <div style={{ position: 'absolute', top: 140, left: 30 }}><MusicNote size={18} color="#C39BD3" opacity={0.3} /></div>
      <div style={{ position: 'absolute', bottom: 160, left: 14 }}><Firework size={50} color="#9B59B6" opacity={0.3} /></div>
      <div style={{ position: 'absolute', bottom: 130, right: 12 }}><Firework size={40} color="#C39BD3" opacity={0.25} /></div>
      <div style={{ position: 'absolute', top: '45%', left: 10 }}><Shehnai size={40} color="#9B59B6" opacity={0.35} /></div>
      <div style={{ position: 'absolute', top: '55%', right: 10, transform: 'scaleX(-1)' }}><Shehnai size={35} color="#C39BD3" opacity={0.3} /></div>
      {/* Stars scattered */}
      {[[20, 20], [85, 35], [60, 15], [15, 60], [90, 65], [50, 75], [25, 80], [75, 80]].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}><Star size={8 + (i % 3) * 4} color="#C39BD3" opacity={0.3 + (i % 3) * 0.15} /></div>
      ))}

      {/* Border frame */}
      <div style={{ position: 'absolute', inset: 14, border: '1px solid rgba(155,89,182,0.3)', borderRadius: 4, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 320 }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>🎶</div>
        <div style={{ fontSize: 10, letterSpacing: 5, color: '#C39BD3', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Georgia, serif' }}>
          An Evening of Music
        </div>

        <DiamondDivider color="#9B59B6" width={180} />

        <div style={{ margin: '14px 0 8px' }}>
          <div style={{ fontSize: 38, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#fff', lineHeight: 1 }}>Sangeet</div>
          <div style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", color: '#C39BD3', fontStyle: 'italic', lineHeight: 1.2 }}>Night</div>
        </div>
        <div style={{ fontSize: 13, color: '#9B59B6', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 16 }}>సంగీత్ నైట్</div>

        <FlowerBorder color="#9B59B6" width={240} />

        <div style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(155,89,182,0.15)', border: '1px solid rgba(155,89,182,0.3)', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 9, color: '#9B59B6', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Date</div>
                <div style={{ fontSize: 15, color: '#fff', fontFamily: 'Georgia, serif' }}>August 23, 2026</div>
                <div style={{ fontSize: 11, color: '#C39BD3' }}>Sunday</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: '#9B59B6', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Time</div>
                <div style={{ fontSize: 15, color: '#fff', fontFamily: 'Georgia, serif' }}>7:00 PM</div>
                <div style={{ fontSize: 11, color: '#C39BD3' }}>విందు · Dinner</div>
              </div>
            </div>
            <div style={{ marginTop: 10, borderTop: '1px solid rgba(155,89,182,0.2)', paddingTop: 10 }}>
              <div style={{ fontSize: 9, color: '#9B59B6', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Venue</div>
              <div style={{ fontSize: 14, color: '#fff', fontFamily: 'Georgia, serif' }}>{VENUE}</div>
              <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 8, fontSize: 11, color: '#C39BD3', textDecoration: 'none', border: '1px solid rgba(155,89,182,0.4)', borderRadius: 16, padding: '4px 12px' }}>📍 Directions</a>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 13, color: '#C39BD3', fontStyle: 'italic', fontFamily: 'Georgia, serif', opacity: 0.7 }}>
          "Dance like nobody's watching"
        </div>
      </div>
    </div>
  );
}

function HaldiPage() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #fdf3c0 0%, #f9e04a 30%, #f5cc00 60%, #fdf3c0 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px 24px', overflow: 'hidden' }}>
      {/* Yellow glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,220,0,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}><GoldCorner size={80} color="#8B6914" /></div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}><GoldCorner size={80} flip color="#8B6914" /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}><GoldCorner size={80} flipV color="#8B6914" /></div>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}><GoldCorner size={80} flip flipV color="#8B6914" /></div>

      {/* Doodles */}
      <div style={{ position: 'absolute', top: 65, left: 8 }}><Diya size={40} opacity={0.7} /></div>
      <div style={{ position: 'absolute', top: 65, right: 8 }}><Diya size={40} opacity={0.7} /></div>
      <div style={{ position: 'absolute', bottom: 90, left: 10 }}><Lotus size={55} color="#C97D00" opacity={0.4} /></div>
      <div style={{ position: 'absolute', bottom: 90, right: 10 }}><Lotus size={55} color="#C97D00" opacity={0.4} /></div>
      <div style={{ position: 'absolute', top: '45%', left: 6, transform: 'translateY(-50%)' }}><MangoLeaf size={24} color="#8B6914" opacity={0.4} /></div>
      <div style={{ position: 'absolute', top: '45%', right: 6, transform: 'translateY(-50%) scaleX(-1)' }}><MangoLeaf size={24} color="#8B6914" opacity={0.4} /></div>
      {/* Paisley scatters */}
      <div style={{ position: 'absolute', top: 110, left: 20 }}><Paisley size={30} color="#C97D00" opacity={0.3} /></div>
      <div style={{ position: 'absolute', top: 110, right: 20 }}><Paisley size={30} color="#C97D00" opacity={0.3} /></div>
      <div style={{ position: 'absolute', bottom: 160, left: 18 }}><Paisley size={25} color="#8B6914" opacity={0.25} /></div>
      {/* Dot pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(139,105,20,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', inset: 14, border: '1px solid rgba(139,105,20,0.3)', borderRadius: 4, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 320 }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>🍯</div>
        <div style={{ fontSize: 10, letterSpacing: 5, color: '#8B6914', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Georgia, serif' }}>
          Blessings & Turmeric
        </div>

        <DiamondDivider color="#C97D00" width={180} />

        <div style={{ margin: '14px 0 8px' }}>
          <div style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#4a3000', lineHeight: 1 }}>Haldi</div>
          <div style={{ fontSize: 16, fontFamily: "'Playfair Display', serif", color: '#8B6914', fontStyle: 'italic' }}>Ceremony</div>
        </div>
        <div style={{ fontSize: 13, color: '#C97D00', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 16 }}>పసుపు కార్యక్రమం</div>

        <FlowerBorder color="#C97D00" width={240} />

        <div style={{ margin: '18px 0' }}>
          <div style={{ background: 'rgba(139,105,20,0.12)', border: '1px solid rgba(139,105,20,0.25)', borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 9, color: '#8B6914', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Date</div>
                <div style={{ fontSize: 15, color: '#3a2000', fontFamily: 'Georgia, serif' }}>August 23, 2026</div>
                <div style={{ fontSize: 11, color: '#C97D00' }}>Sunday</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: '#8B6914', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Time</div>
                <div style={{ fontSize: 15, color: '#3a2000', fontFamily: 'Georgia, serif' }}>12:00 PM</div>
                <div style={{ fontSize: 11, color: '#C97D00' }}>భోజనం · Lunch</div>
              </div>
            </div>
            <div style={{ marginTop: 10, borderTop: '1px solid rgba(139,105,20,0.15)', paddingTop: 10 }}>
              <div style={{ fontSize: 9, color: '#8B6914', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Venue</div>
              <div style={{ fontSize: 14, color: '#3a2000', fontFamily: 'Georgia, serif' }}>{VENUE}</div>
              <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 8, fontSize: 11, color: '#8B6914', textDecoration: 'none', border: '1px solid rgba(139,105,20,0.35)', borderRadius: 16, padding: '4px 12px' }}>📍 Directions</a>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 13, color: '#8B6914', fontStyle: 'italic', fontFamily: 'Georgia, serif', opacity: 0.8 }}>
          "Glow like turmeric, shine like gold"
        </div>
      </div>
    </div>
  );
}

function WeddingPage() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #1a0800 0%, #2d1200 40%, #1a0800 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px 24px', overflow: 'hidden' }}>
      {/* Gold glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,166,48,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}><GoldCorner size={90} color="#C9A630" /></div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}><GoldCorner size={90} flip color="#C9A630" /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}><GoldCorner size={90} flipV color="#C9A630" /></div>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}><GoldCorner size={90} flip flipV color="#C9A630" /></div>

      {/* Doodles */}
      <div style={{ position: 'absolute', top: 65, left: 10 }}><Lotus size={50} color="#C9A630" opacity={0.35} /></div>
      <div style={{ position: 'absolute', top: 65, right: 10 }}><Lotus size={50} color="#C9A630" opacity={0.35} /></div>
      <div style={{ position: 'absolute', bottom: 100, left: 8 }}><PeacockFeather size={55} opacity={0.25} /></div>
      <div style={{ position: 'absolute', bottom: 100, right: 8, transform: 'scaleX(-1)' }}><PeacockFeather size={55} opacity={0.25} /></div>
      <div style={{ position: 'absolute', top: '48%', left: 8, transform: 'translateY(-50%)' }}><Diya size={35} color="#C9A630" opacity={0.5} /></div>
      <div style={{ position: 'absolute', top: '48%', right: 8, transform: 'translateY(-50%)' }}><Diya size={35} color="#C9A630" opacity={0.5} /></div>
      {/* Stars */}
      {[[10, 25], [88, 30], [15, 70], [85, 68], [50, 10], [5, 48], [95, 50]].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}><Star size={6 + i * 2} color="#C9A630" opacity={0.2 + i * 0.05} /></div>
      ))}
      {/* Paisley */}
      <div style={{ position: 'absolute', top: 115, left: 18 }}><Paisley size={35} color="#C9A630" opacity={0.2} /></div>
      <div style={{ position: 'absolute', top: 115, right: 18 }}><Paisley size={35} color="#C9A630" opacity={0.2} /></div>

      {/* Gold border */}
      <div style={{ position: 'absolute', inset: 14, border: '1px solid rgba(201,166,48,0.3)', borderRadius: 4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 18, border: '0.5px solid rgba(201,166,48,0.15)', borderRadius: 2, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 320 }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>💐</div>
        <div style={{ fontSize: 10, letterSpacing: 5, color: '#C9A630', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Georgia, serif' }}>
          The Grand Union
        </div>

        <DiamondDivider color="#C9A630" width={200} />

        <div style={{ margin: '14px 0 8px' }}>
          <div style={{ fontSize: 48, fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #C9A630, #FFD700, #C9A630)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Wedding
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#C9A630', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 16 }}>వివాహం</div>

        <FlowerBorder color="#C9A630" width={260} />

        <div style={{ margin: '16px 0' }}>
          <div style={{ background: 'rgba(201,166,48,0.08)', border: '1px solid rgba(201,166,48,0.25)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 9, color: '#C9A630', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Date</div>
                <div style={{ fontSize: 15, color: '#fff', fontFamily: 'Georgia, serif' }}>August 26, 2026</div>
                <div style={{ fontSize: 11, color: '#C9A630' }}>Wednesday</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: '#C9A630', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Time</div>
                <div style={{ fontSize: 15, color: '#fff', fontFamily: 'Georgia, serif' }}>11:20 AM</div>
                <div style={{ fontSize: 11, color: '#C9A630' }}>భోజనం · Lunch</div>
              </div>
            </div>
            <div style={{ marginTop: 10, borderTop: '1px solid rgba(201,166,48,0.15)', paddingTop: 10 }}>
              <div style={{ fontSize: 9, color: '#C9A630', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Venue</div>
              <div style={{ fontSize: 14, color: '#fff', fontFamily: 'Georgia, serif' }}>{VENUE}</div>
              <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 8, fontSize: 11, color: '#C9A630', textDecoration: 'none', border: '1px solid rgba(201,166,48,0.3)', borderRadius: 16, padding: '4px 12px' }}>📍 Directions</a>
            </div>
          </div>
        </div>

        <Countdown target="2026-08-26T11:20:00" color="#C9A630" />
      </div>
    </div>
  );
}

function ReceptionPage() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #050505 0%, #111111 40%, #0a0a0a 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px 24px', overflow: 'hidden' }}>
      {/* Glossy light effects */}
      <div style={{ position: 'absolute', top: -80, left: '30%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', filter: 'blur(20px)' }} />
      <div style={{ position: 'absolute', bottom: -60, right: '20%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,200,255,0.04) 0%, transparent 70%)', filter: 'blur(25px)' }} />

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}><GoldCorner size={80} color="#888" /></div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}><GoldCorner size={80} flip color="#888" /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}><GoldCorner size={80} flipV color="#888" /></div>
      <div style={{ position: 'absolute', bottom: 0, right: 0 }}><GoldCorner size={80} flip flipV color="#888" /></div>

      {/* Doodles */}
      <div style={{ position: 'absolute', top: 65, left: 10 }}><Firework size={55} color="#aaa" opacity={0.2} /></div>
      <div style={{ position: 'absolute', top: 65, right: 10 }}><Firework size={55} color="#aaa" opacity={0.2} /></div>
      <div style={{ position: 'absolute', bottom: 100, left: 12 }}><Firework size={45} color="#ddd" opacity={0.15} /></div>
      <div style={{ position: 'absolute', bottom: 100, right: 12 }}><Firework size={45} color="#ddd" opacity={0.15} /></div>
      {/* Stars */}
      {[[8, 20], [90, 18], [20, 75], [80, 72], [50, 8], [3, 50], [97, 52], [45, 85], [55, 88]].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%` }}><Star size={5 + i * 1.5} color="#ddd" opacity={0.15 + i * 0.04} /></div>
      ))}

      {/* Glossy border */}
      <div style={{ position: 'absolute', inset: 14, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, pointerEvents: 'none', boxShadow: 'inset 0 0 30px rgba(255,255,255,0.02)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 320 }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>🥂</div>
        <div style={{ fontSize: 10, letterSpacing: 5, color: '#888', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Georgia, serif' }}>
          An Evening to Remember
        </div>

        <DiamondDivider color="#666" width={180} />

        <div style={{ margin: '14px 0 8px' }}>
          <div style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #888, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Reception
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#888', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 16 }}>రిసెప్షన్</div>

        <FlowerBorder color="#555" width={240} />

        <div style={{ margin: '18px 0' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 16px', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 9, color: '#777', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Date</div>
                <div style={{ fontSize: 15, color: '#fff', fontFamily: 'Georgia, serif' }}>August 28, 2026</div>
                <div style={{ fontSize: 11, color: '#888' }}>Friday</div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: '#777', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Time</div>
                <div style={{ fontSize: 15, color: '#fff', fontFamily: 'Georgia, serif' }}>7:30 PM</div>
                <div style={{ fontSize: 11, color: '#888' }}>డిన్నర్ · Dinner</div>
              </div>
            </div>
            <div style={{ marginTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
              <div style={{ fontSize: 9, color: '#777', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Venue</div>
              <div style={{ fontSize: 14, color: '#ccc', fontFamily: 'Georgia, serif' }}>Venue TBA</div>
            </div>
          </div>
        </div>

        {/* RSVP mini */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '14px' }}>
          <div style={{ fontSize: 11, color: '#888', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>RSVP · మీ హాజరు</div>
          <RSVPMini />
        </div>
      </div>
    </div>
  );
}

function RSVPMini() {
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  if (done) return <div style={{ fontSize: 13, color: '#888', fontFamily: 'Georgia, serif', padding: '8px 0' }}>🌺 ధన్యవాదాలు, {name}!</div>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '9px 12px', color: '#fff', fontFamily: 'Georgia, serif', fontSize: 13, outline: 'none', width: '100%', boxSizing: 'border-box' }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => { if (name) setDone(true); }} style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '9px', color: '#fff', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: 12 }}>Attending 🎉</button>
        <button onClick={() => { if (name) setDone(true); }} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '9px', color: '#666', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: 12 }}>Can't Make It</button>
      </div>
    </div>
  );
}

// ─── PAGE RENDER MAP ──────────────────────────────────────────────────
const PageContent = ({ id }) => {
  if (id === 'cover') return <CoverPage />;
  if (id === 'sangeet') return <SangeetPage />;
  if (id === 'haldi') return <HaldiPage />;
  if (id === 'wedding') return <WeddingPage />;
  if (id === 'reception') return <ReceptionPage />;
  return null;
};

// ─── MAIN BOOKLET ─────────────────────────────────────────────────────
export default function WeddingBooklet() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('next'); // 'next' | 'prev'
  const [displayPage, setDisplayPage] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const goTo = (target, dir) => {
    if (flipping || target < 0 || target >= pages.length) return;
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(target);
      setDisplayPage(target);
      setFlipping(false);
    }, 500);
  };

  const next = () => goTo(current + 1, 'next');
  const prev = () => goTo(current - 1, 'prev');

  // Touch/swipe handling
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
      if (dx > 0) next(); else prev();
    }
    touchStartX.current = null;
  };

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, flipping]);

  // Wheel — debounced
  const lastWheel = useRef(0);
  useEffect(() => {
    const onWheel = (e) => {
      const now = Date.now();
      if (now - lastWheel.current < 800) return;
      lastWheel.current = now;
      if (e.deltaY > 30) next();
      else if (e.deltaY < -30) prev();
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [current, flipping]);

  const page = pages[current];
  const isLight = page.id === 'cover' || page.id === 'haldi';

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontFamily: 'Georgia, serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes flip-next-out {
          0%   { transform: perspective(1200px) rotateY(0deg);   opacity: 1; }
          100% { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
        }
        @keyframes flip-next-in {
          0%   { transform: perspective(1200px) rotateY(90deg);  opacity: 0; }
          100% { transform: perspective(1200px) rotateY(0deg);   opacity: 1; }
        }
        @keyframes flip-prev-out {
          0%   { transform: perspective(1200px) rotateY(0deg);  opacity: 1; }
          100% { transform: perspective(1200px) rotateY(90deg); opacity: 0; }
        }
        @keyframes flip-prev-in {
          0%   { transform: perspective(1200px) rotateY(-90deg); opacity: 0; }
          100% { transform: perspective(1200px) rotateY(0deg);   opacity: 1; }
        }

        .page-flip-out-next { animation: flip-next-out 0.5s ease-in forwards; }
        .page-flip-in-next  { animation: flip-next-in  0.5s ease-out forwards; }
        .page-flip-out-prev { animation: flip-prev-out 0.5s ease-in forwards; }
        .page-flip-in-prev  { animation: flip-prev-in  0.5s ease-out forwards; }

        .nav-dot { transition: all 0.3s; cursor: pointer; }
        .nav-dot:hover { transform: scale(1.3); }
        .nav-arrow { transition: all 0.2s; cursor: pointer; border: none; background: none; }
        .nav-arrow:hover { transform: scale(1.15); }
      `}</style>

      {/* Booklet container */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 420, height: '100vh', maxHeight: 780 }}>

        {/* Page */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className={flipping
            ? (flipDir === 'next' ? 'page-flip-out-next' : 'page-flip-out-prev')
            : (flipDir === 'next' ? 'page-flip-in-next' : 'page-flip-in-prev')
          }
          style={{ width: '100%', height: '100%', borderRadius: 0, overflow: 'hidden', boxShadow: '0 20px 80px rgba(0,0,0,0.6)' }}
        >
          <PageContent id={pages[displayPage].id} />
        </div>

        {/* Left arrow */}
        {current > 0 && (
          <button className="nav-arrow" onClick={prev} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 22, color: isLight ? 'rgba(139,105,20,0.5)' : 'rgba(255,255,255,0.25)', padding: 8, zIndex: 10 }}>‹</button>
        )}

        {/* Right arrow */}
        {current < pages.length - 1 && (
          <button className="nav-arrow" onClick={next} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 22, color: isLight ? 'rgba(139,105,20,0.5)' : 'rgba(255,255,255,0.25)', padding: 8, zIndex: 10 }}>›</button>
        )}

        {/* Page dots */}
        <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {pages.map((p, i) => (
            <div key={p.id} className="nav-dot" onClick={() => goTo(i, i > current ? 'next' : 'prev')} style={{
              width: current === i ? 20 : 6, height: 6,
              borderRadius: 3,
              background: current === i
                ? (isLight ? '#8B6914' : '#fff')
                : (isLight ? 'rgba(139,105,20,0.3)' : 'rgba(255,255,255,0.2)'),
            }} />
          ))}
        </div>

        {/* Page number */}
        <div style={{ position: 'absolute', top: 14, right: 20, fontSize: 10, color: isLight ? 'rgba(139,105,20,0.4)' : 'rgba(255,255,255,0.2)', letterSpacing: 2, fontFamily: 'Georgia, serif', zIndex: 10 }}>
          {current + 1} / {pages.length}
        </div>
      </div>
    </div>
  );
}
