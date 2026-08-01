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
    <div style={{ width:'100%', height:'100%', background:'linear-gradient(160deg, #fffdf5 0%, #fdf5d8 50%, #fef8e8 100%)', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'28px 24px', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:0, left:0 }}><GoldCorner size={90} /></div>
      <div style={{ position:'absolute', top:0, right:0 }}><GoldCorner size={90} flip /></div>
      <div style={{ position:'absolute', bottom:0, left:0 }}><GoldCorner size={90} flipV /></div>
      <div style={{ position:'absolute', bottom:0, right:0 }}><GoldCorner size={90} flip flipV /></div>

      {/* Doodles - wedding bells, rings, flowers */}
      <div style={{ position:'absolute', top:72, left:14 }}><Lotus size={42} color="#C9A630" opacity={0.25} /></div>
      <div style={{ position:'absolute', top:72, right:14 }}><Lotus size={42} color="#C9A630" opacity={0.25} /></div>
      <div style={{ position:'absolute', bottom:100, left:12 }}><Paisley size={38} color="#C9A630" opacity={0.22} /></div>
      <div style={{ position:'absolute', bottom:100, right:12 }}><Paisley size={38} color="#C9A630" opacity={0.22} /></div>
      <div style={{ position:'absolute', top:'42%', left:8, transform:'translateY(-50%)' }}><MangoLeaf size={20} color="#8B6914" opacity={0.2} /></div>
      <div style={{ position:'absolute', top:'42%', right:8, transform:'translateY(-50%) scaleX(-1)' }}><MangoLeaf size={20} color="#8B6914" opacity={0.2} /></div>
      {[[18,22],[82,18],[12,55],[88,58],[50,6]].map(([x,y],i)=>(
        <div key={i} style={{ position:'absolute', left:`${x}%`, top:`${y}%` }}><Star size={7+i*2} color="#C9A630" opacity={0.2+i*0.04} /></div>
      ))}

      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(139,105,20,0.04) 1px,transparent 1px)', backgroundSize:'22px 22px', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:14, border:'1px solid rgba(139,105,20,0.15)', borderRadius:4, pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:19, border:'0.5px solid rgba(139,105,20,0.08)', borderRadius:2, pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:320 }}>
        <div style={{ fontSize:9, letterSpacing:5, color:'#A0855A', textTransform:'uppercase', marginBottom:8, fontFamily:'Georgia,serif' }}>Together with their families</div>
        <FlowerBorder color="#C9A630" width={240} />
        <div style={{ margin:'14px 0 2px' }}>
          <div style={{ fontSize:'clamp(40px,11vw,56px)', fontFamily:"'Playfair Display',serif", fontWeight:900, lineHeight:0.95, background:'linear-gradient(135deg,#6B4F00,#C9A630,#8B6914)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Srinith</div>
          <div style={{ fontSize:13, color:'#A0855A', fontStyle:'italic', fontFamily:'Georgia,serif', letterSpacing:3, margin:'5px 0' }}>— weds —</div>
          <div style={{ fontSize:'clamp(40px,11vw,56px)', fontFamily:"'Playfair Display',serif", fontWeight:900, lineHeight:0.95, background:'linear-gradient(135deg,#6B4F00,#C9A630,#8B6914)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Pranathi</div>
        </div>
        <DiamondDivider color="#C9A630" width={180} />
        <div style={{ margin:'10px 0', fontSize:10, color:'#8B6914', letterSpacing:2, fontFamily:'Georgia,serif' }}>శుభ వివాహం · August 2026 · Hyderabad</div>
        <div style={{ background:'rgba(139,105,20,0.06)', border:'1px solid rgba(139,105,20,0.15)', borderRadius:10, padding:'12px 16px', marginBottom:14 }}>
          <div style={{ fontSize:9, letterSpacing:2, color:'#A0855A', textTransform:'uppercase', marginBottom:8 }}>Blessed by</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:6, alignItems:'center' }}>
            <div style={{ textAlign:'right', fontSize:11, color:'#3a2000', fontFamily:'Georgia,serif', lineHeight:1.5 }}>
              <div style={{ fontSize:9, color:'#8B6914', marginBottom:2 }}>Groom's Family</div>
              [Name] &<br/>Smt. Vijaya
            </div>
            <div style={{ color:'#C9A630', fontSize:12, opacity:0.5 }}>✦</div>
            <div style={{ textAlign:'left', fontSize:11, color:'#3a2000', fontFamily:'Georgia,serif', lineHeight:1.5 }}>
              <div style={{ fontSize:9, color:'#8B6914', marginBottom:2 }}>Bride's Family</div>
              Sri. Sridhar Reddy &<br/>Smt. Sunitha
            </div>
          </div>
        </div>
        <Countdown target="2026-08-26T11:20:00" color="#8B6914" />
        <div style={{ marginTop:14, fontSize:10, color:'#C9A630', letterSpacing:2, fontFamily:'Georgia,serif', opacity:0.7 }}>Swipe up to explore ↑</div>
      </div>
    </div>
  );
}

function SangeetPage() {
  return (
    <div style={{ width:'100%', height:'100%', background:'linear-gradient(160deg,#1a0a2e 0%,#2d1654 40%,#1e0d3a 100%)', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'28px 24px', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-60, left:'-10%', width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle,rgba(180,120,255,0.18) 0%,transparent 70%)', filter:'blur(35px)' }} />
      <div style={{ position:'absolute', bottom:-50, right:'-5%', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(150,80,255,0.14) 0%,transparent 70%)', filter:'blur(30px)' }} />

      <div style={{ position:'absolute', top:0, left:0 }}><GoldCorner size={80} color="#9B59B6" /></div>
      <div style={{ position:'absolute', top:0, right:0 }}><GoldCorner size={80} flip color="#9B59B6" /></div>
      <div style={{ position:'absolute', bottom:0, left:0 }}><GoldCorner size={80} flipV color="#9B59B6" /></div>
      <div style={{ position:'absolute', bottom:0, right:0 }}><GoldCorner size={80} flip flipV color="#9B59B6" /></div>

      {/* Music & dance doodles */}
      <div style={{ position:'absolute', top:68, left:10 }}><MusicNote size={32} color="#C39BD3" opacity={0.55} /></div>
      <div style={{ position:'absolute', top:95, right:14 }}><MusicNote size={24} color="#BB8FCE" opacity={0.45} /></div>
      <div style={{ position:'absolute', top:130, left:28 }}><MusicNote size={18} color="#D7BDE2" opacity={0.35} /></div>
      <div style={{ position:'absolute', top:75, right:38 }}><MusicNote size={20} color="#C39BD3" opacity={0.35} /></div>
      <div style={{ position:'absolute', bottom:140, left:12 }}><Shehnai size={45} color="#BB8FCE" opacity={0.4} /></div>
      <div style={{ position:'absolute', bottom:110, right:10, transform:'scaleX(-1)' }}><Shehnai size={38} color="#D7BDE2" opacity={0.3} /></div>
      <div style={{ position:'absolute', bottom:90, left:20 }}><Firework size={48} color="#9B59B6" opacity={0.28} /></div>
      <div style={{ position:'absolute', bottom:80, right:18 }}><Firework size={38} color="#C39BD3" opacity={0.22} /></div>
      {[[8,18],[90,22],[15,72],[85,68],[50,8],[5,45],[95,48],[45,82],[55,85],[30,30],[70,28]].map(([x,y],i)=>(
        <div key={i} style={{ position:'absolute', left:`${x}%`, top:`${y}%` }}><Star size={5+i%4*3} color="#D7BDE2" opacity={0.2+i%3*0.1} /></div>
      ))}

      <div style={{ position:'absolute', inset:14, border:'1px solid rgba(155,89,182,0.25)', borderRadius:4, pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:320 }}>
        <div style={{ fontSize:26, marginBottom:6 }}>🎶</div>
        <div style={{ fontSize:9, letterSpacing:5, color:'#C39BD3', textTransform:'uppercase', marginBottom:8, fontFamily:'Georgia,serif' }}>An Evening of Music & Dance</div>
        <DiamondDivider color="#9B59B6" width={170} />
        <div style={{ margin:'12px 0 6px' }}>
          <div style={{ fontSize:40, fontFamily:"'Playfair Display',serif", fontWeight:900, color:'#fff', lineHeight:1 }}>Sangeet</div>
          <div style={{ fontSize:18, fontFamily:"'Playfair Display',serif", color:'#C39BD3', fontStyle:'italic' }}>Night</div>
        </div>
        <div style={{ fontSize:12, color:'#9B59B6', fontFamily:'Georgia,serif', fontStyle:'italic', marginBottom:14 }}>సంగీత్ నైట్</div>
        <FlowerBorder color="#9B59B6" width={230} />
        <div style={{ margin:'16px 0' }}>
          <div style={{ background:'rgba(155,89,182,0.12)', border:'1px solid rgba(155,89,182,0.25)', borderRadius:10, padding:'12px 16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <div style={{ fontSize:9, color:'#9B59B6', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Date</div>
                <div style={{ fontSize:14, color:'#fff', fontFamily:'Georgia,serif' }}>August 23, 2026</div>
                <div style={{ fontSize:11, color:'#C39BD3' }}>Sunday</div>
              </div>
              <div>
                <div style={{ fontSize:9, color:'#9B59B6', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Time</div>
                <div style={{ fontSize:14, color:'#fff', fontFamily:'Georgia,serif' }}>7:00 PM</div>
                <div style={{ fontSize:11, color:'#C39BD3' }}>డిన్నర్ · Dinner</div>
              </div>
            </div>
            <div style={{ marginTop:10, borderTop:'1px solid rgba(155,89,182,0.2)', paddingTop:10 }}>
              <div style={{ fontSize:9, color:'#9B59B6', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Venue</div>
              <div style={{ fontSize:13, color:'#fff', fontFamily:'Georgia,serif' }}>{VENUE}</div>
              <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display:'inline-block', marginTop:8, fontSize:11, color:'#C39BD3', textDecoration:'none', border:'1px solid rgba(155,89,182,0.35)', borderRadius:16, padding:'4px 12px' }}>📍 Directions</a>
            </div>
          </div>
        </div>
        <div style={{ fontSize:12, color:'#BB8FCE', fontStyle:'italic', fontFamily:'Georgia,serif', opacity:0.8 }}>"Dance like nobody's watching"</div>
      </div>
    </div>
  );
}

function HaldiPage() {
  return (
    <div style={{ width:'100%', height:'100%', background:'linear-gradient(160deg,#fffbea 0%,#fef3b0 40%,#fdf5c5 100%)', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'28px 24px', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'35%', left:'50%', transform:'translate(-50%,-50%)', width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,166,35,0.15) 0%,transparent 70%)', filter:'blur(40px)' }} />

      <div style={{ position:'absolute', top:0, left:0 }}><GoldCorner size={80} color="#C97D00" /></div>
      <div style={{ position:'absolute', top:0, right:0 }}><GoldCorner size={80} flip color="#C97D00" /></div>
      <div style={{ position:'absolute', bottom:0, left:0 }}><GoldCorner size={80} flipV color="#C97D00" /></div>
      <div style={{ position:'absolute', bottom:0, right:0 }}><GoldCorner size={80} flip flipV color="#C97D00" /></div>

      {/* Haldi specific: diyas, turmeric flowers, leaves */}
      <div style={{ position:'absolute', top:65, left:10 }}><Diya size={38} opacity={0.65} /></div>
      <div style={{ position:'absolute', top:65, right:10 }}><Diya size={38} opacity={0.65} /></div>
      <div style={{ position:'absolute', bottom:95, left:8 }}><Lotus size={50} color="#C97D00" opacity={0.3} /></div>
      <div style={{ position:'absolute', bottom:95, right:8 }}><Lotus size={50} color="#C97D00" opacity={0.3} /></div>
      <div style={{ position:'absolute', top:'44%', left:6, transform:'translateY(-50%)' }}><MangoLeaf size={22} color="#8B6914" opacity={0.35} /></div>
      <div style={{ position:'absolute', top:'44%', right:6, transform:'translateY(-50%) scaleX(-1)' }}><MangoLeaf size={22} color="#8B6914" opacity={0.35} /></div>
      <div style={{ position:'absolute', top:108, left:22 }}><Paisley size={28} color="#C97D00" opacity={0.25} /></div>
      <div style={{ position:'absolute', top:108, right:22 }}><Paisley size={28} color="#C97D00" opacity={0.25} /></div>
      <div style={{ position:'absolute', bottom:160, left:16 }}><Diya size={28} opacity={0.4} /></div>
      <div style={{ position:'absolute', bottom:160, right:16 }}><Diya size={28} opacity={0.4} /></div>

      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle,rgba(139,105,20,0.06) 1px,transparent 1px)', backgroundSize:'20px 20px', pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:14, border:'1px solid rgba(201,125,0,0.22)', borderRadius:4, pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:320 }}>
        <div style={{ fontSize:26, marginBottom:6 }}>🍯</div>
        <div style={{ fontSize:9, letterSpacing:5, color:'#8B6914', textTransform:'uppercase', marginBottom:8, fontFamily:'Georgia,serif' }}>Blessings & Turmeric</div>
        <DiamondDivider color="#C97D00" width={170} />
        <div style={{ margin:'12px 0 6px' }}>
          <div style={{ fontSize:42, fontFamily:"'Playfair Display',serif", fontWeight:900, color:'#4a2e00', lineHeight:1 }}>Haldi</div>
          <div style={{ fontSize:16, fontFamily:"'Playfair Display',serif", color:'#8B6914', fontStyle:'italic' }}>Ceremony</div>
        </div>
        <div style={{ fontSize:12, color:'#C97D00', fontFamily:'Georgia,serif', fontStyle:'italic', marginBottom:14 }}>పసుపు కార్యక్రమం</div>
        <FlowerBorder color="#C97D00" width={230} />
        <div style={{ margin:'16px 0' }}>
          <div style={{ background:'rgba(201,125,0,0.09)', border:'1px solid rgba(201,125,0,0.2)', borderRadius:10, padding:'12px 16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <div style={{ fontSize:9, color:'#8B6914', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Date</div>
                <div style={{ fontSize:14, color:'#3a2000', fontFamily:'Georgia,serif' }}>August 23, 2026</div>
                <div style={{ fontSize:11, color:'#C97D00' }}>Sunday</div>
              </div>
              <div>
                <div style={{ fontSize:9, color:'#8B6914', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Time</div>
                <div style={{ fontSize:14, color:'#3a2000', fontFamily:'Georgia,serif' }}>12:00 PM</div>
                <div style={{ fontSize:11, color:'#C97D00' }}>భోజనం · Lunch</div>
              </div>
            </div>
            <div style={{ marginTop:10, borderTop:'1px solid rgba(201,125,0,0.15)', paddingTop:10 }}>
              <div style={{ fontSize:9, color:'#8B6914', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Venue</div>
              <div style={{ fontSize:13, color:'#3a2000', fontFamily:'Georgia,serif' }}>{VENUE}</div>
              <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display:'inline-block', marginTop:8, fontSize:11, color:'#8B6914', textDecoration:'none', border:'1px solid rgba(139,105,20,0.3)', borderRadius:16, padding:'4px 12px' }}>📍 Directions</a>
            </div>
          </div>
        </div>
        <div style={{ fontSize:12, color:'#8B6914', fontStyle:'italic', fontFamily:'Georgia,serif', opacity:0.8 }}>"Glow like turmeric, shine like gold"</div>
      </div>
    </div>
  );
}

function WeddingPage() {
  return (
    <div style={{ width:'100%', height:'100%', background:'linear-gradient(160deg,#1c0e00 0%,#2e1800 40%,#1a0c00 100%)', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'28px 24px', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-50%)', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(212,170,40,0.12) 0%,transparent 70%)', filter:'blur(40px)' }} />

      <div style={{ position:'absolute', top:0, left:0 }}><GoldCorner size={90} color="#D4AA28" /></div>
      <div style={{ position:'absolute', top:0, right:0 }}><GoldCorner size={90} flip color="#D4AA28" /></div>
      <div style={{ position:'absolute', bottom:0, left:0 }}><GoldCorner size={90} flipV color="#D4AA28" /></div>
      <div style={{ position:'absolute', bottom:0, right:0 }}><GoldCorner size={90} flip flipV color="#D4AA28" /></div>

      {/* Wedding: peacock, lotus, diya, paisley */}
      <div style={{ position:'absolute', top:65, left:8 }}><Lotus size={52} color="#D4AA28" opacity={0.32} /></div>
      <div style={{ position:'absolute', top:65, right:8 }}><Lotus size={52} color="#D4AA28" opacity={0.32} /></div>
      <div style={{ position:'absolute', bottom:100, left:6 }}><PeacockFeather size={52} opacity={0.22} /></div>
      <div style={{ position:'absolute', bottom:100, right:6, transform:'scaleX(-1)' }}><PeacockFeather size={52} opacity={0.22} /></div>
      <div style={{ position:'absolute', top:'46%', left:8, transform:'translateY(-50%)' }}><Diya size={32} color="#D4AA28" opacity={0.45} /></div>
      <div style={{ position:'absolute', top:'46%', right:8, transform:'translateY(-50%)' }}><Diya size={32} color="#D4AA28" opacity={0.45} /></div>
      <div style={{ position:'absolute', top:112, left:18 }}><Paisley size={32} color="#D4AA28" opacity={0.18} /></div>
      <div style={{ position:'absolute', top:112, right:18 }}><Paisley size={32} color="#D4AA28" opacity={0.18} /></div>
      {[[10,22],[88,26],[14,70],[86,68],[50,8],[4,47],[96,50],[45,84]].map(([x,y],i)=>(
        <div key={i} style={{ position:'absolute', left:`${x}%`, top:`${y}%` }}><Star size={6+i*1.5} color="#D4AA28" opacity={0.18+i*0.04} /></div>
      ))}

      <div style={{ position:'absolute', inset:14, border:'1px solid rgba(212,170,40,0.25)', borderRadius:4, pointerEvents:'none' }} />
      <div style={{ position:'absolute', inset:18, border:'0.5px solid rgba(212,170,40,0.12)', borderRadius:2, pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:320 }}>
        <div style={{ fontSize:26, marginBottom:6 }}>💐</div>
        <div style={{ fontSize:9, letterSpacing:5, color:'#D4AA28', textTransform:'uppercase', marginBottom:8, fontFamily:'Georgia,serif' }}>The Grand Union</div>
        <DiamondDivider color="#D4AA28" width={190} />
        <div style={{ margin:'12px 0 6px' }}>
          <div style={{ fontSize:46, fontFamily:"'Playfair Display',serif", fontWeight:900, lineHeight:1, background:'linear-gradient(135deg,#B8860B,#FFD700,#D4AA28,#FFD700,#B8860B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Wedding</div>
        </div>
        <div style={{ fontSize:12, color:'#D4AA28', fontFamily:'Georgia,serif', fontStyle:'italic', marginBottom:14 }}>వివాహం</div>
        <FlowerBorder color="#D4AA28" width={250} />
        <div style={{ margin:'14px 0' }}>
          <div style={{ background:'rgba(212,170,40,0.07)', border:'1px solid rgba(212,170,40,0.22)', borderRadius:10, padding:'12px 16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <div style={{ fontSize:9, color:'#D4AA28', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Date</div>
                <div style={{ fontSize:14, color:'#fff', fontFamily:'Georgia,serif' }}>August 26, 2026</div>
                <div style={{ fontSize:11, color:'#D4AA28' }}>Wednesday</div>
              </div>
              <div>
                <div style={{ fontSize:9, color:'#D4AA28', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Time</div>
                <div style={{ fontSize:14, color:'#fff', fontFamily:'Georgia,serif' }}>11:20 AM</div>
                <div style={{ fontSize:11, color:'#D4AA28' }}>భోజనం · Lunch</div>
              </div>
            </div>
            <div style={{ marginTop:10, borderTop:'1px solid rgba(212,170,40,0.15)', paddingTop:10 }}>
              <div style={{ fontSize:9, color:'#D4AA28', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Venue</div>
              <div style={{ fontSize:13, color:'#fff', fontFamily:'Georgia,serif' }}>{VENUE}</div>
              <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display:'inline-block', marginTop:8, fontSize:11, color:'#D4AA28', textDecoration:'none', border:'1px solid rgba(212,170,40,0.3)', borderRadius:16, padding:'4px 12px' }}>📍 Directions</a>
            </div>
          </div>
        </div>
        <Countdown target="2026-08-26T11:20:00" color="#D4AA28" />
      </div>
    </div>
  );
}

function ReceptionPage() {
  return (
    <div style={{ width:'100%', height:'100%', background:'linear-gradient(160deg,#1a1a2e 0%,#16213e 40%,#0f3460 60%,#1a1a2e 100%)', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'28px 24px', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-70, left:'25%', width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%)', filter:'blur(25px)' }} />
      <div style={{ position:'absolute', bottom:-60, right:'20%', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle,rgba(100,150,255,0.06) 0%,transparent 70%)', filter:'blur(30px)' }} />

      <div style={{ position:'absolute', top:0, left:0 }}><GoldCorner size={80} color="#7f8fa6" /></div>
      <div style={{ position:'absolute', top:0, right:0 }}><GoldCorner size={80} flip color="#7f8fa6" /></div>
      <div style={{ position:'absolute', bottom:0, left:0 }}><GoldCorner size={80} flipV color="#7f8fa6" /></div>
      <div style={{ position:'absolute', bottom:0, right:0 }}><GoldCorner size={80} flip flipV color="#7f8fa6" /></div>

      {/* Reception: champagne, fireworks, stars */}
      <div style={{ position:'absolute', top:65, left:10 }}><Firework size={52} color="#a8b4cc" opacity={0.22} /></div>
      <div style={{ position:'absolute', top:65, right:10 }}><Firework size={52} color="#a8b4cc" opacity={0.22} /></div>
      <div style={{ position:'absolute', bottom:100, left:10 }}><Firework size={42} color="#c8d6e5" opacity={0.18} /></div>
      <div style={{ position:'absolute', bottom:100, right:10 }}><Firework size={42} color="#c8d6e5" opacity={0.18} /></div>
      <div style={{ position:'absolute', top:'46%', left:8 }}><Lotus size={38} color="#7f8fa6" opacity={0.2} /></div>
      <div style={{ position:'absolute', top:'46%', right:8 }}><Lotus size={38} color="#7f8fa6" opacity={0.2} /></div>
      {[[8,18],[90,20],[18,72],[82,70],[50,7],[4,46],[96,50],[44,83],[56,86],[28,32],[72,28],[15,40],[85,42]].map(([x,y],i)=>(
        <div key={i} style={{ position:'absolute', left:`${x}%`, top:`${y}%` }}><Star size={4+i%4*2} color="#c8d6e5" opacity={0.12+i%3*0.08} /></div>
      ))}

      <div style={{ position:'absolute', inset:14, border:'1px solid rgba(255,255,255,0.07)', borderRadius:4, pointerEvents:'none', boxShadow:'inset 0 0 30px rgba(255,255,255,0.02)' }} />

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:320 }}>
        <div style={{ fontSize:26, marginBottom:6 }}>🥂</div>
        <div style={{ fontSize:9, letterSpacing:5, color:'#7f8fa6', textTransform:'uppercase', marginBottom:8, fontFamily:'Georgia,serif' }}>An Evening to Remember</div>
        <DiamondDivider color="#5d6d7e" width={170} />
        <div style={{ margin:'12px 0 6px' }}>
          <div style={{ fontSize:42, fontFamily:"'Playfair Display',serif", fontWeight:900, lineHeight:1, background:'linear-gradient(135deg,#7f8fa6,#fff,#a8b4cc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Reception</div>
        </div>
        <div style={{ fontSize:12, color:'#7f8fa6', fontFamily:'Georgia,serif', fontStyle:'italic', marginBottom:14 }}>రిసెప్షన్</div>
        <FlowerBorder color="#5d6d7e" width={230} />
        <div style={{ margin:'16px 0' }}>
          <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'12px 16px', backdropFilter:'blur(10px)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div>
                <div style={{ fontSize:9, color:'#7f8fa6', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Date</div>
                <div style={{ fontSize:14, color:'#fff', fontFamily:'Georgia,serif' }}>August 28, 2026</div>
                <div style={{ fontSize:11, color:'#a8b4cc' }}>Friday</div>
              </div>
              <div>
                <div style={{ fontSize:9, color:'#7f8fa6', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Time</div>
                <div style={{ fontSize:14, color:'#fff', fontFamily:'Georgia,serif' }}>7:30 PM</div>
                <div style={{ fontSize:11, color:'#a8b4cc' }}>డిన్నర్ · Dinner</div>
              </div>
            </div>
            <div style={{ marginTop:10, borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:10 }}>
              <div style={{ fontSize:9, color:'#7f8fa6', letterSpacing:2, textTransform:'uppercase', marginBottom:3 }}>Venue</div>
              <div style={{ fontSize:13, color:'#ccc', fontFamily:'Georgia,serif' }}>Venue TBA</div>
            </div>
          </div>
        </div>
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'14px' }}>
          <div style={{ fontSize:10, color:'#7f8fa6', letterSpacing:2, textTransform:'uppercase', marginBottom:10 }}>RSVP · మీ హాజరు</div>
          <RSVPMini />
        </div>
      </div>
    </div>
  );
}

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

export default function WeddingBooklet() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState('next');
  const [displayPage, setDisplayPage] = useState(0);
  const touchStartY = useRef(null);
  const touchStartX = useRef(null);
  const lastWheel = useRef(0);

  const goTo = (target, dir) => {
    if (flipping || target < 0 || target >= pages.length) return;
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(target);
      setDisplayPage(target);
      setFlipping(false);
    }, 480);
  };

  const next = () => goTo(current + 1, 'next');
  const prev = () => goTo(current - 1, 'prev');

  // Touch — support both vertical swipe (up/down) and horizontal
  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 40) {
      if (dy > 0) next(); else prev();
    } else if (Math.abs(dx) > 40) {
      if (dx > 0) next(); else prev();
    }
    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Wheel — debounced
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 700) return;
      lastWheel.current = now;
      if (e.deltaY > 20) next();
      else if (e.deltaY < -20) prev();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [current, flipping]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowDown','ArrowRight',' '].includes(e.key)) { e.preventDefault(); next(); }
      if (['ArrowUp','ArrowLeft'].includes(e.key)) { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, flipping]);

  const isLight = pages[current].id === 'cover' || pages[current].id === 'haldi';

  return (
    <div style={{ width:'100vw', height:'100vh', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', fontFamily:'Georgia,serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }

        @keyframes flip-down-out {
          0%   { transform:perspective(1000px) rotateX(0deg);    opacity:1; }
          100% { transform:perspective(1000px) rotateX(-90deg);  opacity:0; }
        }
        @keyframes flip-down-in {
          0%   { transform:perspective(1000px) rotateX(90deg);   opacity:0; }
          100% { transform:perspective(1000px) rotateX(0deg);    opacity:1; }
        }
        @keyframes flip-up-out {
          0%   { transform:perspective(1000px) rotateX(0deg);   opacity:1; }
          100% { transform:perspective(1000px) rotateX(90deg);  opacity:0; }
        }
        @keyframes flip-up-in {
          0%   { transform:perspective(1000px) rotateX(-90deg); opacity:0; }
          100% { transform:perspective(1000px) rotateX(0deg);   opacity:1; }
        }

        .flip-down-out { animation:flip-down-out 0.48s ease-in  forwards; transform-origin:top center; }
        .flip-down-in  { animation:flip-down-in  0.48s ease-out forwards; transform-origin:top center; }
        .flip-up-out   { animation:flip-up-out   0.48s ease-in  forwards; transform-origin:bottom center; }
        .flip-up-in    { animation:flip-up-in    0.48s ease-out forwards; transform-origin:bottom center; }

        .nav-dot { transition:all 0.3s; cursor:pointer; }
        .nav-dot:hover { transform:scale(1.3); }
        .nav-arrow { transition:all 0.2s; cursor:pointer; border:none; background:none; }
        .nav-arrow:hover { transform:scale(1.15); }
      `}</style>

      {/* Spiral binding at top */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', display:'flex', gap:8, zIndex:20, padding:'6px 0' }}>
        {[...Array(10)].map((_,i) => (
          <div key={i} style={{ width:14, height:14, borderRadius:'50%', border:`2px solid ${isLight ? 'rgba(139,105,20,0.35)' : 'rgba(255,255,255,0.2)'}`, background:isLight ? 'rgba(253,248,232,0.8)' : 'rgba(30,30,30,0.8)' }} />
        ))}
      </div>

      {/* Page */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={flipping
          ? (flipDir === 'next' ? 'flip-down-out' : 'flip-up-out')
          : (flipDir === 'next' ? 'flip-down-in'  : 'flip-up-in')
        }
        style={{ width:'100%', maxWidth:420, height:'calc(100vh - 26px)', marginTop:26, overflow:'hidden', boxShadow:'0 20px 80px rgba(0,0,0,0.7)' }}
      >
        <PageContent id={pages[displayPage].id} />
      </div>

      {/* Up arrow */}
      {current > 0 && (
        <button className="nav-arrow" onClick={prev} style={{ position:'absolute', top:38, left:'50%', transform:'translateX(-50%)', fontSize:20, color:isLight ? 'rgba(139,105,20,0.4)' : 'rgba(255,255,255,0.2)', padding:6, zIndex:10 }}>▲</button>
      )}

      {/* Down arrow */}
      {current < pages.length - 1 && (
        <button className="nav-arrow" onClick={next} style={{ position:'absolute', bottom:18, left:'50%', transform:'translateX(-50%)', fontSize:20, color:isLight ? 'rgba(139,105,20,0.4)' : 'rgba(255,255,255,0.2)', padding:6, zIndex:10 }}>▼</button>
      )}

      {/* Dot nav — right side */}
      <div style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:8, zIndex:10 }}>
        {pages.map((p,i) => (
          <div key={p.id} className="nav-dot" onClick={() => goTo(i, i > current ? 'next' : 'prev')} style={{
            width:6, height: current===i ? 20 : 6,
            borderRadius:3,
            background: current===i
              ? (isLight ? '#8B6914' : '#fff')
              : (isLight ? 'rgba(139,105,20,0.3)' : 'rgba(255,255,255,0.2)'),
          }} />
        ))}
      </div>

      {/* Page number */}
      <div style={{ position:'absolute', bottom:10, right:18, fontSize:10, color:isLight ? 'rgba(139,105,20,0.4)' : 'rgba(255,255,255,0.2)', letterSpacing:2, fontFamily:'Georgia,serif', zIndex:10 }}>
        {current + 1} / {pages.length}
      </div>
    </div>
    
  );
}
