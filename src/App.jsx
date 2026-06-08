import { useState, useEffect, useRef } from "react";

const VENUE = "Sri Vinoda Convention, Hyderabad";
const VENUE_URL = "https://maps.app.goo.gl/Xapm2UzTwXJ5vzgu5";

const events = [
  { id: "engagement", title: "Engagement", telugu: "నిశ్చితార్థం", date: "June 25, 2026", day: "Thursday", time: "12:30 PM", type: "Lunch", venue: VENUE, venueUrl: VENUE_URL, color: "#8B6914", icon: "💍", photo: "/IMG_5770.PNG" },
  { id: "haldi", title: "Haldi Ceremony", telugu: "పసుపు కార్యక్రమం", date: "August 23, 2026", day: "Sunday", time: "12:00 PM", type: "Lunch", venue: VENUE, venueUrl: VENUE_URL, color: "#C97D00", icon: "🍯", photo: null },
  { id: "sangeet", title: "Sangeet Night", telugu: "సంగీత్ నైట్", date: "August 23, 2026", day: "Sunday", time: "7:00 PM", type: "Dinner", venue: VENUE, venueUrl: VENUE_URL, color: "#2D6A4F", icon: "🎶", photo: null },
  { id: "wedding", title: "Wedding", telugu: "వివాహం", date: "August 26, 2026", day: "Wednesday", time: "1:30 PM", type: "Lunch", venue: VENUE, venueUrl: VENUE_URL, color: "#8B1A1A", icon: "💐", photo: null },
  { id: "reception", title: "Reception", telugu: "రిసెప్షన్", date: "August 28, 2026", day: "Friday", time: "7:30 PM", type: "Dinner", venue: "Venue TBA", venueUrl: null, color: "#5B2D8E", icon: "🥂", photo: null },
];

// Telugu kolam SVG pattern
const KolamCorner = ({ size = 120, opacity = 0.12, flip = false }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ opacity, transform: flip ? 'scaleX(-1)' : 'none' }}>
    <circle cx="10" cy="10" r="3" fill="#8B6914"/>
    <circle cx="30" cy="10" r="2" fill="#8B6914"/>
    <circle cx="10" cy="30" r="2" fill="#8B6914"/>
    <circle cx="50" cy="10" r="1.5" fill="#8B6914"/>
    <circle cx="10" cy="50" r="1.5" fill="#8B6914"/>
    <circle cx="30" cy="30" r="2.5" fill="#8B6914"/>
    <circle cx="50" cy="30" r="1.5" fill="#8B6914"/>
    <circle cx="30" cy="50" r="1.5" fill="#8B6914"/>
    <circle cx="70" cy="10" r="1" fill="#8B6914"/>
    <circle cx="10" cy="70" r="1" fill="#8B6914"/>
    <circle cx="50" cy="50" r="2" fill="#8B6914"/>
    <circle cx="70" cy="30" r="1" fill="#8B6914"/>
    <circle cx="30" cy="70" r="1" fill="#8B6914"/>
    <path d="M10 10 Q30 5 50 10 Q30 15 10 10Z" fill="#8B6914" opacity="0.4"/>
    <path d="M10 10 Q5 30 10 50 Q15 30 10 10Z" fill="#8B6914" opacity="0.4"/>
    <path d="M10 10 Q35 35 60 60" stroke="#8B6914" strokeWidth="0.5" fill="none"/>
    <path d="M30 10 Q40 25 50 40" stroke="#8B6914" strokeWidth="0.5" fill="none"/>
    <path d="M10 30 Q25 40 40 50" stroke="#8B6914" strokeWidth="0.5" fill="none"/>
    <path d="M5 5 Q60 5 5 60" stroke="#8B6914" strokeWidth="0.3" fill="none"/>
    <path d="M15 5 Q80 5 5 75" stroke="#8B6914" strokeWidth="0.2" fill="none"/>
    {[0,15,30,45,60,75].map(i => (
      <circle key={i} cx={5+i} cy={5} r="0.8" fill="#C9A630" opacity="0.6"/>
    ))}
    {[0,15,30,45,60,75].map(i => (
      <circle key={i+10} cx={5} cy={5+i} r="0.8" fill="#C9A630" opacity="0.6"/>
    ))}
  </svg>
);

const MandalaBg = () => (
  <svg width="300" height="300" viewBox="0 0 300 300" style={{ opacity: 0.06 }}>
    {[130,110,90,70,50,30].map(r => <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="#8B6914" strokeWidth="0.8"/>)}
    {[0,22.5,45,67.5,90,112.5,135,157.5].map(a => (
      <line key={a} x1="150" y1="15" x2="150" y2="285" stroke="#8B6914" strokeWidth="0.4" transform={`rotate(${a} 150 150)`}/>
    ))}
    {[0,45,90,135,180,225,270,315].map(a => (
      <path key={a} d="M150 20 Q160 80 150 130 Q140 80 150 20" fill="#8B6914" opacity="0.5" transform={`rotate(${a} 150 150)`}/>
    ))}
    {[0,60,120,180,240,300].map(a => (
      <path key={a} d="M150 50 Q165 100 150 140 Q135 100 150 50" fill="none" stroke="#C9A630" strokeWidth="0.5" transform={`rotate(${a} 150 150)`}/>
    ))}
  </svg>
);

function CountdownTimer({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
      {[['Days', time.days], ['Hours', time.hours], ['Mins', time.minutes], ['Secs', time.seconds]].map(([label, val]) => (
        <div key={label} style={{
          background: 'rgba(139,105,20,0.1)', border: '1px solid rgba(139,105,20,0.3)',
          borderRadius: 10, padding: '10px 14px', minWidth: 62, textAlign: 'center',
        }}>
          <div style={{ fontSize: 26, fontFamily: "'Playfair Display', serif", color: '#6B4F00', fontWeight: 700 }}>
            {String(val).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 10, color: '#A0855A', letterSpacing: 2, textTransform: 'uppercase' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function EventCard({ event, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      border: `1px solid ${event.color}30`,
      borderRadius: 20, overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 4px 24px rgba(139,105,20,0.08)',
    }}>
      {event.photo && (
        <div style={{ width:'100%', height:280, position:'relative', overflow:'hidden' }}>
          {/* Blurred photo layer */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:`url(${event.photo})`,
            backgroundSize:'cover', backgroundPosition:'center 10%',
            filter:'blur(0.8px)',
            transform:'scale(1.02)', // prevent blur edge artifacts
          }} />
          {/* Gradient overlay */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 50%,#fff 100%)' }} />
          {/* Badge — NOT blurred, sits above */}
          <div style={{
            position:'absolute', top:14, left:14,
            background:'rgba(255,255,255,0.9)', borderRadius:20, padding:'4px 12px',
            fontSize:11, color:event.color, letterSpacing:2, textTransform:'uppercase',
            fontFamily:'Georgia,serif', border:`1px solid ${event.color}30`,
            zIndex:2,
          }}>{event.type} · {event.type === 'Lunch' ? 'భోజనం' : 'విందు'}</div>
        </div>
      )}
      <div style={{ padding: '20px 20px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
          <div style={{
            fontSize: 26, width: 50, height: 50, borderRadius: 12,
            background: `${event.color}10`, border: `1px solid ${event.color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{event.icon}</div>
          <div>
            {!event.photo && <div style={{ fontSize: 10, color: event.color, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 2 }}>{event.type} · {event.type === 'Lunch' ? 'భోజనం' : 'విందు'}</div>}
            <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", color: '#2a1500', fontWeight: 700, lineHeight: 1.1 }}>{event.title}</div>
            <div style={{ fontSize: 12, color: event.color, fontStyle: 'italic', marginTop: 2 }}>{event.telugu}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, borderTop: `1px solid ${event.color}12`, paddingTop: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>Date</div>
            <div style={{ fontSize: 13, color: '#2a1500' }}>{event.date}</div>
            <div style={{ fontSize: 11, color: event.color }}>{event.day}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>Time</div>
            <div style={{ fontSize: 13, color: '#2a1500' }}>{event.time}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: 10, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>Venue</div>
            <div style={{ fontSize: 13, color: '#2a1500' }}>{event.venue}</div>
            {event.venueUrl ? (
              <a href={event.venueUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8,
                fontSize: 11, color: '#fff', textDecoration: 'none', borderRadius: 20,
                padding: '5px 12px', background: event.color,
              }}>📍 Get Directions</a>
            ) : (
              <div style={{ fontSize: 11, color: '#bbb', marginTop: 4, fontStyle: 'italic' }}>Venue TBA</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RSVPForm() {
  const [form, setForm] = useState({ name: '', phone: '', attending: '', events: [], message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 52 }}>🌺</div>
      <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", color: '#6B4F00', marginTop: 12 }}>ధన్యవాదాలు!</div>
      <div style={{ color: '#A0855A', marginTop: 8 }}>Thank you, {form.name}! We'll see you there.</div>
    </div>
  );

  const inputStyle = { width: '100%', background: '#fff', border: '1px solid rgba(139,105,20,0.2)', borderRadius: 10, padding: '12px 16px', color: '#2a1500', fontFamily: 'Georgia, serif', fontSize: 14, outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input style={inputStyle} placeholder="Your full name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input style={inputStyle} placeholder="Phone number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      <div style={{ display: 'flex', gap: 10 }}>
        {['Attending 🎉', "Can't Make It"].map(opt => (
          <button key={opt} onClick={() => setForm(f => ({ ...f, attending: opt }))} style={{
            flex: 1, padding: '11px 6px', background: form.attending === opt ? 'rgba(139,105,20,0.12)' : '#fff',
            border: `1px solid ${form.attending === opt ? '#8B6914' : 'rgba(139,105,20,0.15)'}`,
            borderRadius: 10, color: form.attending === opt ? '#6B4F00' : '#A0855A',
            cursor: 'pointer', fontSize: 13, fontFamily: 'Georgia, serif', transition: 'all 0.2s',
          }}>{opt}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {events.map(ev => (
          <button key={ev.id} onClick={() => setForm(f => ({ ...f, events: f.events.includes(ev.id) ? f.events.filter(e => e !== ev.id) : [...f.events, ev.id] }))} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: form.events.includes(ev.id) ? `${ev.color}10` : '#fff',
            border: `1px solid ${form.events.includes(ev.id) ? ev.color : 'rgba(139,105,20,0.12)'}`,
            borderRadius: 10, padding: '9px 12px', cursor: 'pointer',
            color: form.events.includes(ev.id) ? ev.color : '#A0855A',
            fontFamily: 'Georgia, serif', fontSize: 13, textAlign: 'left', transition: 'all 0.2s',
          }}>
            <span>{ev.icon}</span><span>{ev.title}</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.6 }}>{ev.date}</span>
          </button>
        ))}
      </div>
      <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} placeholder="Message for the couple..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      <button onClick={() => { if (form.name && form.attending) setSubmitted(true); }} style={{
        background: 'linear-gradient(135deg, #8B6914, #C9A630)', border: 'none', borderRadius: 10,
        padding: '15px', color: '#fff', fontFamily: "'Playfair Display', serif",
        fontSize: 16, fontWeight: 700, cursor: 'pointer', letterSpacing: 1,
        boxShadow: '0 4px 20px rgba(139,105,20,0.25)',
      }}>Confirm RSVP ✨</button>
    </div>
  );
}

// THE SCROLL SCENE — Apple style
function ScrollScene({ onComplete }) {
  const sceneRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  const TOTAL_SCROLL = 1400;

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const handleScroll = () => {
      setScrollY(el.scrollTop);
      if (el.scrollTop >= TOTAL_SCROLL - 50) onComplete();
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const prog = (start, end) => Math.max(0, Math.min(1, (scrollY - start) / (end - start)));

  // Phase 1 (0–400): full 180deg Y flip
  // Phase 2 (400–700): flap opens on back face
  // Phase 3 (700–1050): letter rises
  // Phase 4 (1050–1400): zoom out to invite
  const flipAngle   = prog(0, 400) * 180;
  const flapAngle   = prog(400, 700) * 180;
  const letterY     = -(prog(700, 1050) * 160);
  const letterOpacity = prog(680, 780);
  const letterScale = 0.82 + prog(700, 1050) * 0.18;
  const sealOpacity = Math.max(0, 1 - prog(400, 550)); // fades as flap starts opening
  const sceneOpacity = 1 - prog(1050, 1300);
  const sceneScale  = 1 + prog(1000, 1400) * 0.35;

  return (
    <div ref={sceneRef} style={{ position: 'fixed', inset: 0, zIndex: 1000, overflowY: 'scroll', overflowX: 'hidden' }}>
      <style>{`
        @keyframes float-env2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes petal-sc { 0%{transform:translateY(-10px) rotate(0deg);opacity:0} 10%{opacity:0.8} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
        @keyframes shimmer-sc { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes hint-sc { 0%,100%{opacity:0.5;transform:translateY(0)} 50%{opacity:1;transform:translateY(-6px)} }
        @keyframes rotate-mandala { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .shimmer-env2 { background: linear-gradient(90deg,#6B4F00,#C9A630,#8B6914,#C9A630,#6B4F00); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation:shimmer-sc 3s linear infinite; }
      `}</style>

      {/* Scroll space */}
      <div style={{ height: TOTAL_SCROLL + window.innerHeight, pointerEvents: 'none' }} />

      {/* Fixed visual */}
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(160deg,#fdf8e8 0%,#f5e4a8 40%,#faecd0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', opacity: sceneOpacity, transform: `scale(${sceneScale})`, transformOrigin: 'center center', pointerEvents: scrollY >= TOTAL_SCROLL - 50 ? 'none' : 'auto' }}>

        {/* Kolam corners */}
        <div style={{ position:'absolute', top:0, left:0, pointerEvents:'none' }}><KolamCorner size={140} opacity={0.15} /></div>
        <div style={{ position:'absolute', top:0, right:0, pointerEvents:'none' }}><KolamCorner size={140} opacity={0.15} flip /></div>
        <div style={{ position:'absolute', bottom:0, left:0, pointerEvents:'none', transform:'scaleY(-1)' }}><KolamCorner size={140} opacity={0.15} /></div>
        <div style={{ position:'absolute', bottom:0, right:0, pointerEvents:'none', transform:'scale(-1)' }}><KolamCorner size={140} opacity={0.15} /></div>

        {/* Mandala */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', animation:'rotate-mandala 60s linear infinite', pointerEvents:'none' }}><MandalaBg /></div>

        {/* Dot bg */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(circle,rgba(139,105,20,0.07) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />

        {/* Frame */}
        <div style={{ position:'absolute', inset:16, border:'1px solid rgba(139,105,20,0.12)', borderRadius:20, pointerEvents:'none' }} />

        {/* Petals */}
        {[...Array(5)].map((_,i) => (
          <div key={i} style={{ position:'absolute', left:`${10+i*18}%`, top:'-20px', fontSize:13, pointerEvents:'none', animation:`petal-sc ${8+i*1.5}s linear infinite`, animationDelay:`${i*1.5}s` }}>🌸</div>
        ))}

        {/* Toran */}
        <div style={{ position:'absolute', top:30, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6, pointerEvents:'none', opacity:Math.max(0,1-prog(0,200)) }}>
          {['🌿','🍃','🌸','🍃','🌸','🍃','🌿'].map((e,i) => <span key={i} style={{ fontSize:12, opacity:0.6 }}>{e}</span>)}
        </div>

        {/* Label */}
        <div style={{ fontSize:10, letterSpacing:5, color:'#A0855A', textTransform:'uppercase', marginBottom:24, fontFamily:'Georgia,serif', opacity:Math.max(0,1-prog(0,300)), transform:`translateY(${-prog(0,300)*20}px)` }}>
          You are cordially invited
        </div>

        {/* ENVELOPE — 3D flip container */}
        <div style={{ position:'relative', width:300, height:200, perspective:'900px', animation:scrollY < 20 ? 'float-env2 3s ease-in-out infinite' : 'none' }}>

          {/* Flipper */}
          <div style={{ position:'relative', width:'100%', height:'100%', transformStyle:'preserve-3d', transform:`rotateY(${flipAngle}deg)` }}>

            {/* FRONT — names only, no flap */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(145deg,#fffbec,#f5e098)', border:'1.5px solid rgba(139,105,20,0.45)', borderRadius:10, boxShadow:'0 12px 50px rgba(139,105,20,0.18)', backfaceVisibility:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:5, border:'1px solid rgba(139,105,20,0.1)', borderRadius:6 }} />
              <div style={{ position:'absolute', bottom:0, left:0, width:0, height:0, borderLeft:'150px solid rgba(139,105,20,0.05)', borderTop:'100px solid transparent' }} />
              <div style={{ position:'absolute', bottom:0, right:0, width:0, height:0, borderRight:'150px solid rgba(139,105,20,0.05)', borderTop:'100px solid transparent' }} />
              <div style={{ fontSize:9, letterSpacing:3, color:'#A0855A', textTransform:'uppercase', marginBottom:10, fontFamily:'Georgia,serif' }}>#SrinithWedsPranathi</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:30, lineHeight:1 }} className="shimmer-env2">Srinith</div>
              <div style={{ fontSize:12, color:'#A0855A', fontStyle:'italic', margin:'5px 0', fontFamily:'Georgia,serif', letterSpacing:2 }}>— weds —</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:30, lineHeight:1 }} className="shimmer-env2">Pranathi</div>
              <div style={{ fontSize:9, color:'#C9A630', marginTop:10, letterSpacing:1, fontFamily:'Georgia,serif' }}>August 2026 · Hyderabad</div>
            </div>

            {/* BACK — no text, flap opens, letter rises */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(145deg,#fffbec,#f5e098)', border:'1.5px solid rgba(139,105,20,0.45)', borderRadius:10, boxShadow:'0 12px 50px rgba(139,105,20,0.18)', backfaceVisibility:'hidden', transform:'rotateY(180deg)', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:5, border:'1px solid rgba(139,105,20,0.1)', borderRadius:6 }} />
              <div style={{ position:'absolute', bottom:0, left:0, width:0, height:0, borderLeft:'150px solid rgba(139,105,20,0.06)', borderTop:'100px solid transparent' }} />
              <div style={{ position:'absolute', bottom:0, right:0, width:0, height:0, borderRight:'150px solid rgba(139,105,20,0.06)', borderTop:'100px solid transparent' }} />

              {/* Flap */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:120, transformOrigin:'top center', transform:`perspective(600px) rotateX(${-flapAngle}deg)`, clipPath:'polygon(0 0,100% 0,50% 88%)', background:'linear-gradient(175deg,#e8c84a,#c9a020)', borderBottom:'1px solid rgba(139,105,20,0.25)', zIndex:3 }} />

              {/* Letter */}
              <div style={{ position:'absolute', bottom:8, left:18, right:18, background:'linear-gradient(180deg,#fffef8,#fdf5d8)', borderRadius:'6px 6px 4px 4px', padding:'14px 16px', boxShadow:'0 -6px 24px rgba(139,105,20,0.12)', transform:`translateY(${letterY}px) scale(${letterScale})`, opacity:letterOpacity, zIndex:2, border:'1px solid rgba(139,105,20,0.2)', textAlign:'center' }}>
                <div style={{ position:'absolute', top:4, right:6, opacity:0.1 }}><KolamCorner size={40} opacity={1} /></div>
                <div style={{ position:'absolute', top:4, left:6, opacity:0.1 }}><KolamCorner size={40} opacity={1} flip /></div>
                <div style={{ fontSize:8, letterSpacing:3, color:'#A0855A', textTransform:'uppercase', marginBottom:6, fontFamily:'Georgia,serif' }}>With Joyful Hearts</div>
                <div style={{ display:'flex', alignItems:'center', gap:6, justifyContent:'center', marginBottom:4 }}>
                  <div style={{ height:1, width:18, background:'rgba(139,105,20,0.3)' }} /><span style={{ fontSize:10 }}>🌺</span><div style={{ height:1, width:18, background:'rgba(139,105,20,0.3)' }} />
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", color:'#2a1500', fontSize:17, fontWeight:700 }}>Srinith</div>
                <div style={{ fontSize:10, fontStyle:'italic', color:'#8B6914', fontFamily:'Georgia,serif', margin:'2px 0' }}>weds</div>
                <div style={{ fontFamily:"'Playfair Display',serif", color:'#2a1500', fontSize:17, fontWeight:700 }}>Pranathi</div>
                <div style={{ fontSize:8, color:'#C9A630', marginTop:6, letterSpacing:1, fontFamily:'Georgia,serif' }}>August 2026 · Sri Vinoda Convention · Hyderabad</div>
              </div>
            </div>
          </div>

          {/* Wax seal — on BACK face only, drops off as flap opens */}
          <div style={{
            position:'absolute', top:'42%', left:'50%',
            transform:`translate(-50%,-50%) rotateY(${flipAngle < 90 ? 0 : 180}deg)`,
            width:52, height:52, borderRadius:'50%',
            background:'radial-gradient(circle at 35% 35%,#C41E3A,#6b0f0f)',
            border:'2px solid rgba(201,160,32,0.9)',
            display:'flex', alignItems:'center', justifyContent:'center',
            zIndex:10,
            boxShadow:'0 4px 14px rgba(139,26,26,0.5)',
            opacity: flipAngle < 90 ? 0 : sealOpacity,
            pointerEvents:'none',
          }}>
            <div style={{ fontFamily:"'Playfair Display',serif", color:'#D4A017', fontSize:11, fontWeight:700, textAlign:'center', lineHeight:1.2 }}>S<br/><span style={{fontSize:7}}>✦</span><br/>P</div>
          </div>
        </div>

        {/* Hint */}
        <div style={{ marginTop:36, display:'flex', flexDirection:'column', alignItems:'center', gap:5, opacity:Math.max(0,1-prog(0,200)) }}>
          <div style={{ animation:'hint-sc 1.8s ease-in-out infinite', display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
            <div style={{ fontSize:18 }}>☝️</div>
            <div style={{ width:1, height:20, background:'linear-gradient(to bottom,#8B6914,transparent)' }} />
          </div>
          <div style={{ fontFamily:'Georgia,serif', fontSize:12, color:'#8B6914', letterSpacing:3, textTransform:'uppercase' }}>Scroll to Open</div>
          <div style={{ fontFamily:'Georgia,serif', fontSize:11, color:'#C9A630', fontStyle:'italic' }}>శుభ వివాహం</div>
        </div>

        {/* Progress bar */}
        <div style={{ position:'absolute', bottom:24, left:'50%', transform:'translateX(-50%)', width:80, height:3, background:'rgba(139,105,20,0.12)', borderRadius:2 }}>
          <div style={{ width:`${Math.min(100,(scrollY/TOTAL_SCROLL)*100)}%`, height:'100%', background:'#8B6914', borderRadius:2 }} />
        </div>
        <div style={{ position:'absolute', bottom:38, fontFamily:'Georgia,serif', fontSize:10, color:'#C9A630', letterSpacing:2, opacity:0.6 }}>శుభకార్యానికి స్వాగతం</div>
      </div>
    </div>
  );
}

export default function WeddingInvite() {
  const [phase, setPhase] = useState('envelope'); // 'envelope' | 'fading' | 'invite'
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mainRef = useRef();

  const handleComplete = () => {
    setPhase('invite');
    setTimeout(() => setHeroVisible(true), 400);
  };

  // Scroll back to top → smooth fade back to envelope
  useEffect(() => {
    if (phase !== 'invite') return;
    const el = mainRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollTop === 0) {
        // Fade out invite, then show envelope
        setPhase('fading');
        setTimeout(() => {
          setPhase('envelope');
          setHeroVisible(false);
        }, 400);
      }
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [phase]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fdf8e8 0%, #f5e4a8 25%, #faecd0 60%, #fdf8e8 100%)',
      color: '#2a1500', fontFamily: 'Georgia, serif', overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(139,105,20,0.25); }
        @keyframes float-m { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer-m { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes rotate-m { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes petal-m {
          0%{transform:translateY(-20px) rotate(0deg);opacity:0}
          10%{opacity:0.7} 100%{transform:translateY(105vh) rotate(720deg);opacity:0}
        }
        @keyframes invite-m { 0%{opacity:0;transform:translateY(12px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes fade-out-invite { 0%{opacity:1} 100%{opacity:0} }
        .shimmer-main-m {
          background: linear-gradient(90deg, #6B4F00, #C9A630, #8B6914, #C9A630, #6B4F00);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-m 3.5s linear infinite;
        }
        .petal-m { position:fixed; pointer-events:none; animation:petal-m linear infinite; z-index:0; }
        .nav-btn-m:hover { color: #6B4F00 !important; }
      `}</style>

      {phase === 'envelope' && <ScrollScene onComplete={handleComplete} />}

      {(phase === 'invite' || phase === 'fading') && (
        <div ref={mainRef} style={{
          overflowY: phase === 'fading' ? 'hidden' : 'auto',
          height: '100vh',
          animation: phase === 'fading' ? 'fade-out-invite 0.4s ease forwards' : 'invite-m 0.9s ease forwards',
        }}>

          {/* Petals */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="petal-m" style={{
              left: `${10 + i * 18}%`, top: '-30px', fontSize: 14,
              animationDuration: `${9 + i * 2}s`, animationDelay: `${i * 2}s`,
            }}>🌸</div>
          ))}

          {/* Nav */}
          <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: 'rgba(253,248,232,0.93)', backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(139,105,20,0.12)', padding: '0 20px',
          }}>
            <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52 }}>
              <div style={{ fontSize: 14, color: '#8B6914', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", letterSpacing: 2 }}>S & P</div>
              <div style={{ display: 'flex', gap: 2 }}>
                {[['home', 'Home'], ['events', 'Events'], ['rsvp', 'RSVP']].map(([id, label]) => (
                  <button key={id} className="nav-btn-m" onClick={() => scrollTo(id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: activeSection === id ? '#6B4F00' : '#A0855A',
                    fontSize: 12, padding: '6px 12px', letterSpacing: 1,
                    textTransform: 'uppercase', transition: 'color 0.2s', fontFamily: 'Georgia, serif',
                  }}>{label}</button>
                ))}
              </div>
            </div>
          </nav>

          {/* Hero */}
          <section id="home" style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', padding: '80px 24px 40px', overflow: 'hidden',
          }}>
            {/* Kolam corners on main page */}
            <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}><KolamCorner size={120} opacity={0.1} /></div>
            <div style={{ position: 'absolute', top: 0, right: 0, pointerEvents: 'none' }}><KolamCorner size={120} opacity={0.1} flip /></div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none', transform: 'scaleY(-1)' }}><KolamCorner size={100} opacity={0.08} /></div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, pointerEvents: 'none', transform: 'scale(-1)' }}><KolamCorner size={100} opacity={0.08} /></div>

            {/* Mandala bg */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'rotate-m 80s linear infinite', pointerEvents: 'none',
            }}><MandalaBg /></div>

            {/* Dot pattern */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(139,105,20,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />

            <div style={{
              position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 440,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}>
              {/* Toran */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 14, fontSize: 14 }}>
                {['🌿','🍃','🌸','💐','🌸','🍃','🌿'].map((e, i) => (
                  <span key={i} style={{ opacity: 0.7 }}>{e}</span>
                ))}
              </div>

              <div style={{ fontSize: 11, letterSpacing: 5, color: '#A0855A', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Georgia, serif' }}>
                Let's Celebrate
              </div>
              <div style={{ fontSize: 12, color: '#C9A630', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", marginBottom: 12 }}>
                శుభ వివాహం
              </div>

              <h1 style={{ fontSize: 'clamp(56px, 15vw, 80px)', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1, marginBottom: 0 }}>
                <span className="shimmer-main-m">Srinith</span>
              </h1>
              <div style={{ fontSize: 14, color: '#A0855A', fontStyle: 'italic', margin: '2px 0 2px', fontFamily: "'Cormorant Garamond', serif", letterSpacing: 3 }}>
                — weds —
              </div>
              <h1 style={{ fontSize: 'clamp(56px, 15vw, 80px)', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1, marginBottom: 20 }}>
                <span className="shimmer-main-m">Pranathi</span>
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
                <div style={{ height: 1, width: 50, background: 'linear-gradient(to right, transparent, #C9A630)' }} />
                <span style={{ fontSize: 16 }}>🌺</span>
                <div style={{ height: 1, width: 50, background: 'linear-gradient(to left, transparent, #C9A630)' }} />
              </div>

              {/* Parents */}
              <div style={{
                background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(139,105,20,0.18)',
                borderRadius: 16, padding: '16px 20px', marginBottom: 20,
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: '#A0855A', marginBottom: 10, textTransform: 'uppercase' }}>Blessed by</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: '#8B6914', marginBottom: 2 }}>Groom's Parents</div>
                    <div style={{ fontSize: 12, color: '#2a1500', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>[Name] &<br />Smt. Vijaya</div>
                  </div>
                  <div style={{ color: '#C9A630', fontSize: 14, opacity: 0.5 }}>✦</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 10, color: '#8B6914', marginBottom: 2 }}>Bride's Parents</div>
                    <div style={{ fontSize: 12, color: '#2a1500', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>Sri. Sridhar Reddy &<br />Smt. Sunitha</div>
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: '#A0855A', textTransform: 'uppercase', marginBottom: 10 }}>Wedding Countdown</div>
                <CountdownTimer targetDate="2026-08-26T13:30:00" />
              </div>

              <button onClick={() => scrollTo('events')} style={{
                background: 'rgba(139,105,20,0.1)', border: '1.5px solid rgba(139,105,20,0.3)',
                borderRadius: 50, padding: '12px 28px', color: '#6B4F00',
                cursor: 'pointer', fontFamily: "'Playfair Display', serif",
                fontSize: 14, letterSpacing: 1, animation: 'float-m 3s ease-in-out infinite',
              }}>
                View All Events ↓
              </button>
            </div>
          </section>

          {/* Events */}
          <section id="events" style={{ maxWidth: 500, margin: '0 auto', padding: '50px 20px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', opacity: 0.06 }}><KolamCorner size={80} opacity={1} /></div>
            <div style={{ position: 'absolute', top: 0, right: 0, pointerEvents: 'none', opacity: 0.06 }}><KolamCorner size={80} opacity={1} flip /></div>
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: '#A0855A', textTransform: 'uppercase', marginBottom: 8 }}>The Celebrations</div>
              <h2 style={{ fontSize: 30, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <span className="shimmer-main-m">Five Sacred Events</span>
              </h2>
              <div style={{ fontSize: 12, color: '#A0855A', marginTop: 6, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
                వేడుకలకు ఆహ్వానం — You are warmly invited
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {events.map((event, i) => <EventCard key={event.id} event={event} index={i} />)}
            </div>
          </section>

          {/* Quote */}
          <section style={{ padding: '32px 24px', textAlign: 'center', background: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(139,105,20,0.08)', borderBottom: '1px solid rgba(139,105,20,0.08)' }}>
            <div style={{ maxWidth: 340, margin: '0 auto' }}>
              <div style={{ fontSize: 28, color: '#C9A630', opacity: 0.35, fontFamily: 'serif' }}>"</div>
              <p style={{ fontSize: 15, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", color: '#6B4F00', lineHeight: 1.8, margin: '4px 0' }}>
                A love that builds palaces out of promises,<br />and turns every vow into a universe.
              </p>
              <div style={{ fontSize: 28, color: '#C9A630', opacity: 0.35, fontFamily: 'serif' }}>"</div>
            </div>
          </section>

          {/* RSVP */}
          <section id="rsvp" style={{ maxWidth: 500, margin: '0 auto', padding: '52px 20px 80px' }}>
            <div style={{ textAlign: 'center', marginBottom: 26 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: '#A0855A', textTransform: 'uppercase', marginBottom: 8 }}>Join Us</div>
              <h2 style={{ fontSize: 30, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 6 }}>
                <span className="shimmer-main-m">RSVP</span>
              </h2>
              <p style={{ fontSize: 12, color: '#A0855A', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>మీ హాజరు మాకు ఆశీర్వాదం</p>
            </div>
            <RSVPForm />
          </section>

          {/* Footer */}
          <footer style={{ textAlign: 'center', padding: '22px', borderTop: '1px solid rgba(139,105,20,0.08)', background: 'rgba(255,255,255,0.3)', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)', pointerEvents: 'none' }}><KolamCorner size={60} opacity={0.06} /></div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1)', pointerEvents: 'none' }}><KolamCorner size={60} opacity={0.06} /></div>
            <div style={{ fontSize: 16, marginBottom: 6 }}>🌺 💐 🌺</div>
            <div style={{ fontSize: 11, color: '#A0855A', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
              శుభం భవతు — May there be auspiciousness
            </div>
            <div style={{ fontSize: 9, color: '#C9A630', marginTop: 6, letterSpacing: 2 }}>
              #SrinithWedsPranathi · AUGUST 2026
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
