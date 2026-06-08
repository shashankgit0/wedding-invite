import { useState, useEffect, useRef } from "react";

const VENUE_URL = "https://maps.app.goo.gl/Xapm2UzTwXJ5vzgu5";
const VENUE_NAME = "Sri Vinoda Convention";
const VENUE_CITY = "Hyderabad, Telangana";

const events = [
  {
    id: "engagement",
    title: "Engagement",
    telugu: "నిశ్చితార్థం",
    date: "June 25, 2025",
    day: "Wednesday",
    time: "12:30 PM",
    type: "Lunch",
    venue: VENUE_NAME,
    venueUrl: VENUE_URL,
    city: VENUE_CITY,
    color: "#D4A017",
    icon: "💍",
    photo: "/IMG_5770.PNG",
  },
  {
    id: "haldi",
    title: "Haldi Ceremony",
    telugu: "పసుపు కార్యక్రమం",
    date: "August 23, 2025",
    day: "Saturday",
    time: "12:00 PM",
    type: "Lunch",
    venue: VENUE_NAME,
    venueUrl: VENUE_URL,
    city: VENUE_CITY,
    color: "#F5A623",
    icon: "🍯",
    photo: null,
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    telugu: "సంగీత్ నైట్",
    date: "August 23, 2025",
    day: "Saturday",
    time: "7:00 PM",
    type: "Dinner",
    venue: VENUE_NAME,
    venueUrl: VENUE_URL,
    city: VENUE_CITY,
    color: "#50C878",
    icon: "🎶",
    photo: null,
  },
  {
    id: "wedding",
    title: "Wedding",
    telugu: "వివాహం",
    date: "August 26, 2025",
    day: "Tuesday",
    time: "1:30 PM",
    type: "Lunch",
    venue: VENUE_NAME,
    venueUrl: VENUE_URL,
    city: VENUE_CITY,
    color: "#E84393",
    icon: "💐",
    photo: null,
  },
  {
    id: "reception",
    title: "Reception",
    telugu: "రిసెప్షన్",
    date: "August 28, 2025",
    day: "Thursday",
    time: "7:30 PM",
    type: "Dinner",
    venue: "Venue TBA",
    venueUrl: null,
    city: VENUE_CITY,
    color: "#9B59B6",
    icon: "🥂",
    photo: null,
  },
];

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
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,215,0,0.35)',
          borderRadius: 10, padding: '10px 14px',
          minWidth: 60, textAlign: 'center',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ fontSize: 26, fontFamily: "'Playfair Display', serif", color: '#FFD700', fontWeight: 700 }}>
            {String(val).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 10, color: '#aaa', letterSpacing: 2, textTransform: 'uppercase' }}>{label}</div>
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
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      border: `1px solid ${event.color}50`,
      borderRadius: 20,
      padding: '28px 24px',
      position: 'relative',
      overflow: 'hidden',
      background: event.photo ? 'transparent' : `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
    }}>
      {event.photo && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${event.photo})`,
            backgroundSize: 'cover', backgroundPosition: 'center 20%',
            filter: 'brightness(0.22) saturate(0.6)',
            zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(160deg, rgba(0,0,0,0.5) 0%, ${event.color}22 100%)`,
            zIndex: 1,
          }} />
        </>
      )}

      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 130, height: 130, borderRadius: '50%',
        background: `${event.color}18`, filter: 'blur(30px)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            fontSize: 30, width: 56, height: 56, borderRadius: 14,
            background: `${event.color}20`, border: `1px solid ${event.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{event.icon}</div>
          <div>
            <div style={{ fontSize: 11, color: event.color, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 2 }}>
              {event.type}
            </div>
            <div style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", color: '#fff', fontWeight: 700, lineHeight: 1.1 }}>
              {event.title}
            </div>
            <div style={{ fontSize: 12, color: event.color, fontStyle: 'italic', marginTop: 2 }}>
              {event.telugu}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
          borderTop: `1px solid ${event.color}20`, paddingTop: 16,
        }}>
          <div>
            <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Date</div>
            <div style={{ fontSize: 14, color: '#fff' }}>{event.date}</div>
            <div style={{ fontSize: 11, color: event.color }}>{event.day}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Time</div>
            <div style={{ fontSize: 14, color: '#fff' }}>{event.time}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Venue</div>
            <div style={{ fontSize: 14, color: '#fff' }}>{event.venue}</div>
            {event.venueUrl ? (
              <a href={event.venueUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                marginTop: 6, fontSize: 11, color: event.color,
                textDecoration: 'none', border: `1px solid ${event.color}40`,
                borderRadius: 20, padding: '4px 10px',
                background: `${event.color}10`,
              }}>
                📍 Get Directions
              </a>
            ) : (
              <div style={{ fontSize: 11, color: '#666', marginTop: 4, fontStyle: 'italic' }}>Venue TBA</div>
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

  const handleSubmit = async () => {
    if (!form.name || !form.attending) return;
    // Save to localStorage as a simple log (replace with Google Forms/Sheets later)
    const responses = JSON.parse(localStorage.getItem('rsvp_responses') || '[]');
    responses.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem('rsvp_responses', JSON.stringify(responses));
    setSubmitted(true);
  };

  const toggleEvent = (id) => {
    setForm(f => ({
      ...f,
      events: f.events.includes(id) ? f.events.filter(e => e !== id) : [...f.events, id]
    }));
  };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 52 }}>🌺</div>
      <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", color: '#FFD700', marginTop: 12 }}>ధన్యవాదాలు!</div>
      <div style={{ color: '#aaa', marginTop: 8 }}>Thank you, {form.name}! We'll see you there.</div>
    </div>
  );

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,215,0,0.2)', borderRadius: 10,
    padding: '12px 16px', color: '#fff',
    fontFamily: 'Georgia, serif', fontSize: 14,
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input style={inputStyle} placeholder="Your full name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input style={inputStyle} placeholder="Phone number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      <div style={{ display: 'flex', gap: 10 }}>
        {['Attending 🎉', 'Can\'t Make It'].map(opt => (
          <button key={opt} onClick={() => setForm(f => ({ ...f, attending: opt }))} style={{
            flex: 1, padding: '10px 6px',
            background: form.attending === opt ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${form.attending === opt ? '#FFD700' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 10, color: form.attending === opt ? '#FFD700' : '#666',
            cursor: 'pointer', fontSize: 13, fontFamily: 'Georgia, serif', transition: 'all 0.2s',
          }}>{opt}</button>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#666', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>Which events?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {events.map(ev => (
            <button key={ev.id} onClick={() => toggleEvent(ev.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: form.events.includes(ev.id) ? `${ev.color}20` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${form.events.includes(ev.id) ? ev.color : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
              color: form.events.includes(ev.id) ? ev.color : '#666',
              fontFamily: 'Georgia, serif', fontSize: 13, textAlign: 'left', transition: 'all 0.2s',
            }}>
              <span>{ev.icon}</span><span>{ev.title}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.6 }}>{ev.date}</span>
            </button>
          ))}
        </div>
      </div>
      <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
        placeholder="Message for the couple... (optional)"
        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      <button onClick={handleSubmit} style={{
        background: 'linear-gradient(135deg, #D4A017, #8B6914)',
        border: 'none', borderRadius: 10, padding: '15px',
        color: '#0a0600', fontFamily: "'Playfair Display', serif",
        fontSize: 16, fontWeight: 700, cursor: 'pointer', letterSpacing: 1,
      }}>Confirm RSVP ✨</button>
      <div style={{ fontSize: 11, color: '#444', textAlign: 'center', fontStyle: 'italic' }}>
        * RSVP responses are saved locally for now
      </div>
    </div>
  );
}

// ENVELOPE with swipe-up / tap transition
function EnvelopeIntro({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle → opening → zooming → done
  const startY = useRef(null);

  const triggerOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => setPhase('zooming'), 900);
    setTimeout(() => onOpen(), 1400);
  };

  const handleTouchStart = (e) => { startY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e) => {
    if (startY.current - e.changedTouches[0].clientY > 40) triggerOpen();
  };

  return (
    <div
      onClick={triggerOpen}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'linear-gradient(160deg, #0a0018 0%, #100005 50%, #0a0a00 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', overflow: 'hidden',
        transition: phase === 'zooming' ? 'transform 0.6s ease, opacity 0.6s ease' : 'none',
        transform: phase === 'zooming' ? 'scale(1.6)' : 'scale(1)',
        opacity: phase === 'zooming' ? 0 : 1,
      }}
    >
      <style>{`
        @keyframes float-env { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
        @keyframes flap-open { 0%{transform:rotateX(0deg)} 100%{transform:rotateX(-180deg)} }
        @keyframes letter-rise { 0%{transform:translateY(10px);opacity:0} 100%{transform:translateY(-70px);opacity:1} }
        @keyframes swipe-hint { 0%,100%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(-10px);opacity:1} }
        @keyframes star-twinkle { 0%,100%{opacity:0.2} 50%{opacity:0.8} }
        @keyframes petal-env {
          0%{transform:translateY(-10px) rotate(0deg);opacity:0}
          10%{opacity:1}
          100%{transform:translateY(105vh) rotate(540deg);opacity:0}
        }
        @keyframes seal-pulse { 0%,100%{box-shadow:0 0 15px #8B1A1A80} 50%{box-shadow:0 0 35px #E84393aa, 0 0 60px #D4A01740} }
      `}</style>

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: 2, height: 2, borderRadius: '50%',
          background: '#fff',
          animation: `star-twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }} />
      ))}

      {/* Petals */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${8 + i * 16}%`, top: '-20px',
          fontSize: 14, pointerEvents: 'none',
          animation: `petal-env ${7 + i * 1.5}s linear infinite`,
          animationDelay: `${i * 1.2}s`,
        }}>🌸</div>
      ))}

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '45%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,160,23,0.1) 0%, rgba(232,67,147,0.05) 50%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Envelope container */}
      <div style={{
        animation: phase === 'idle' ? 'float-env 3.5s ease-in-out infinite' : 'none',
        position: 'relative',
        width: 300, height: 210,
      }}>
        {/* Envelope body */}
        <div style={{
          width: 300, height: 210,
          background: 'linear-gradient(145deg, #1e0a2e, #120518)',
          border: '1px solid rgba(212,160,23,0.5)',
          borderRadius: 12, position: 'relative', overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,160,23,0.1)',
        }}>
          {/* Decorative lines */}
          <div style={{ position:'absolute', inset:4, border:'1px solid rgba(212,160,23,0.15)', borderRadius:8, pointerEvents:'none' }} />

          {/* Letter inside */}
          <div style={{
            position: 'absolute', bottom: 4, left: 24, right: 24, height: 130,
            background: 'linear-gradient(180deg, #fffbf0 0%, #f5e6c8 100%)',
            borderRadius: '4px 4px 0 0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 2,
            animation: phase === 'opening' ? 'letter-rise 0.9s ease forwards' : 'none',
            zIndex: 1,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: '#8B6914', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>Let's Celebrate</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: '#2a1500', fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>Srinith</div>
            <div style={{ fontSize: 11, fontStyle: 'italic', color: '#8B6914', fontFamily: 'Georgia, serif' }}>weds</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: '#2a1500', fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>Pranathi</div>
            <div style={{ fontSize: 9, color: '#aaa', marginTop: 4, letterSpacing: 1, fontFamily: 'Georgia, serif' }}>August 2025 · Hyderabad</div>
          </div>

          {/* Envelope flap */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 130,
            transformOrigin: 'top center', zIndex: 3,
            animation: phase === 'opening' ? 'flap-open 0.7s ease forwards' : 'none',
            clipPath: 'polygon(0 0, 100% 0, 50% 85%)',
            background: 'linear-gradient(180deg, #2a0a3e, #1a0828)',
            borderBottom: '1px solid rgba(212,160,23,0.3)',
          }} />

          {/* Bottom triangle decorations */}
          <div style={{ position:'absolute', bottom:0, left:0, width:0, height:0, borderLeft:'150px solid rgba(212,160,23,0.06)', borderTop:'105px solid transparent' }} />
          <div style={{ position:'absolute', bottom:0, right:0, width:0, height:0, borderRight:'150px solid rgba(212,160,23,0.06)', borderTop:'105px solid transparent' }} />
        </div>

        {/* Wax seal */}
        <div style={{
          position: 'absolute', top: '46%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 62, height: 62, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #C41E3A, #6b0f0f)',
          border: '2px solid rgba(212,160,23,0.7)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 4,
          animation: phase === 'idle' ? 'seal-pulse 2.5s ease-in-out infinite' : 'none',
          opacity: phase === 'opening' ? 0 : 1,
          transition: 'opacity 0.2s',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#D4A017', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>S</div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#D4A017', fontSize: 8, lineHeight: 1 }}>&</div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#D4A017', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>P</div>
        </div>
      </div>

      {/* Swipe up hint */}
      <div style={{
        marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        opacity: phase === 'idle' ? 1 : 0, transition: 'opacity 0.3s',
      }}>
        <div style={{ animation: 'swipe-hint 1.8s ease-in-out infinite', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div style={{ fontSize: 18 }}>☝️</div>
          <div style={{ width: 1, height: 20, background: 'linear-gradient(to bottom, #D4A017, transparent)' }} />
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: '#D4A017', letterSpacing: 3, textTransform: 'uppercase' }}>
          Tap or Swipe Up
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 12, color: '#7a6a55', fontStyle: 'italic' }}>
          శుభ వివాహం
        </div>
      </div>
    </div>
  );
}

export default function WeddingInvite() {
  const [showInvite, setShowInvite] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleOpen = () => {
    setShowInvite(true);
    setTimeout(() => setHeroVisible(true), 300);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#060010', color: '#F5E6C8', fontFamily: 'Georgia, serif', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #D4A01740; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes rotate-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes petal-fall {
          0%{transform:translateY(-20px) rotate(0deg);opacity:0}
          10%{opacity:0.8}
          100%{transform:translateY(105vh) rotate(720deg);opacity:0}
        }
        @keyframes invite-in { 0%{opacity:0;transform:scale(0.95)} 100%{opacity:1;transform:scale(1)} }
        .shimmer-gold {
          background: linear-gradient(90deg, #D4A017, #FFD700, #fff8e1, #FFD700, #D4A017);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3.5s linear infinite;
        }
        .petal { position:fixed; pointer-events:none; animation:petal-fall linear infinite; z-index:0; }
        .nav-btn:hover { color: #FFD700 !important; }
        a { color: inherit; }
      `}</style>

      {!showInvite && <EnvelopeIntro onOpen={handleOpen} />}

      {showInvite && (
        <div style={{ animation: 'invite-in 0.8s ease forwards' }}>

          {/* Petals */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="petal" style={{
              left: `${10 + i * 18}%`, top: '-30px', fontSize: 16,
              animationDuration: `${9 + i * 2}s`, animationDelay: `${i * 2}s`,
            }}>🌸</div>
          ))}

          {/* Nav */}
          <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: 'rgba(6,0,16,0.9)', backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(212,160,23,0.2)', padding: '0 20px',
          }}>
            <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 54 }}>
              <div style={{ fontSize: 14, color: '#D4A017', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", letterSpacing: 2 }}>S & P</div>
              <div style={{ display: 'flex', gap: 2 }}>
                {[['home', 'Home'], ['events', 'Events'], ['rsvp', 'RSVP']].map(([id, label]) => (
                  <button key={id} className="nav-btn" onClick={() => scrollTo(id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: activeSection === id ? '#FFD700' : '#666',
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
            {/* Animated mandala */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 520, height: 520, opacity: 0.05, color: '#D4A017',
              animation: 'rotate-slow 80s linear infinite',
            }} dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              ${[90,78,66,54,42,30,18].map(r => `<circle cx="100" cy="100" r="${r}" fill="none" stroke="currentColor" stroke-width="0.6"/>`).join('')}
              ${[0,22.5,45,67.5,90,112.5,135,157.5].map(a => `<line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" stroke-width="0.4" transform="rotate(${a} 100 100)"/>`).join('')}
              ${[0,45,90,135].map(a => `<path d="M100 12 Q112 50 100 88 Q88 50 100 12" fill="currentColor" opacity="0.4" transform="rotate(${a} 100 100)"/>`).join('')}
            </svg>` }} />

            {/* Color blobs */}
            <div style={{ position:'absolute', top:'30%', left:'20%', width:200, height:200, borderRadius:'50%', background:'rgba(232,67,147,0.06)', filter:'blur(60px)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:'30%', right:'15%', width:180, height:180, borderRadius:'50%', background:'rgba(80,200,120,0.05)', filter:'blur(60px)', pointerEvents:'none' }} />

            <div style={{
              position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 440,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1s ease, transform 1s ease',
            }}>
              <div style={{ fontSize: 11, letterSpacing: 5, color: '#D4A017', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Georgia, serif' }}>
                Let's Celebrate
              </div>
              <div style={{ fontSize: 12, color: '#7a6a55', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", marginBottom: 12 }}>
                శుభ వివాహం
              </div>

              <h1 style={{ fontSize: 'clamp(56px, 15vw, 80px)', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 0.95, marginBottom: 8 }}>
                <span className="shimmer-gold">Srinith</span>
              </h1>
              <div style={{ fontSize: 16, color: '#D4A017', fontStyle: 'italic', margin: '6px 0', fontFamily: "'Cormorant Garamond', serif", letterSpacing: 2 }}>
                — weds —
              </div>
              <h1 style={{ fontSize: 'clamp(56px, 15vw, 80px)', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 0.95, marginBottom: 28 }}>
                <span className="shimmer-gold">Pranathi</span>
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
                <div style={{ height: 1, width: 50, background: 'linear-gradient(to right, transparent, #D4A017)' }} />
                <span style={{ fontSize: 18 }}>💐</span>
                <div style={{ height: 1, width: 50, background: 'linear-gradient(to left, transparent, #D4A017)' }} />
              </div>

              {/* Parents */}
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,160,23,0.2)',
                borderRadius: 14, padding: '18px 20px', marginBottom: 24,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: '#666', marginBottom: 12, textTransform: 'uppercase' }}>Blessed by</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#D4A017', marginBottom: 2 }}>Groom's Parents</div>
                    <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>
                      [Name] &<br />Smt. Vijaya
                    </div>
                  </div>
                  <div style={{ color: '#D4A017', fontSize: 16, opacity: 0.4 }}>✦</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 11, color: '#D4A017', marginBottom: 2 }}>Bride's Parents</div>
                    <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>
                      Sri. Sridhar Reddy &<br />Smt. Sunitha
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, letterSpacing: 3, color: '#666', textTransform: 'uppercase', marginBottom: 12 }}>
                  Wedding Countdown
                </div>
                <CountdownTimer targetDate="2025-08-26T13:30:00" />
              </div>

              <button onClick={() => scrollTo('events')} style={{
                background: 'linear-gradient(135deg, rgba(212,160,23,0.15), rgba(232,67,147,0.1))',
                border: '1px solid rgba(212,160,23,0.4)', borderRadius: 50, padding: '13px 30px',
                color: '#D4A017', cursor: 'pointer', fontFamily: "'Playfair Display', serif",
                fontSize: 14, letterSpacing: 1, animation: 'float 3s ease-in-out infinite',
              }}>
                View All Events ↓
              </button>
            </div>
          </section>

          {/* Events */}
          <section id="events" style={{ maxWidth: 500, margin: '0 auto', padding: '60px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: '#666', textTransform: 'uppercase', marginBottom: 8 }}>The Celebrations</div>
              <h2 style={{ fontSize: 34, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <span className="shimmer-gold">Five Sacred Events</span>
              </h2>
              <div style={{ fontSize: 13, color: '#7a6a55', marginTop: 8, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
                వేడుకలకు ఆహ్వానం — You are warmly invited
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {events.map((event, i) => <EventCard key={event.id} event={event} index={i} />)}
            </div>
          </section>

          {/* Quote */}
          <section style={{ padding: '36px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: 360, margin: '0 auto' }}>
              <div style={{ fontSize: 30, color: '#D4A017', opacity: 0.3, fontFamily: 'serif' }}>"</div>
              <p style={{ fontSize: 16, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", color: '#bbb', lineHeight: 1.8, margin: '6px 0' }}>
                A love that builds palaces out of promises,<br />and turns every vow into a universe.
              </p>
              <div style={{ fontSize: 30, color: '#D4A017', opacity: 0.3, fontFamily: 'serif' }}>"</div>
            </div>
          </section>

          {/* RSVP */}
          <section id="rsvp" style={{ maxWidth: 500, margin: '0 auto', padding: '60px 20px 80px' }}>
            <div style={{ textAlign: 'center', marginBottom: 30 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: '#666', textTransform: 'uppercase', marginBottom: 8 }}>Join Us</div>
              <h2 style={{ fontSize: 34, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 8 }}>
                <span className="shimmer-gold">RSVP</span>
              </h2>
              <p style={{ fontSize: 13, color: '#7a6a55', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
                మీ హాజరు మాకు ఆశీర్వాదం
              </p>
            </div>
            <RSVPForm />
          </section>

          {/* Footer */}
          <footer style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>🌺 💐 🌺</div>
            <div style={{ fontSize: 12, color: '#444', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
              శుభం భవతు — May there be auspiciousness
            </div>
            <div style={{ fontSize: 10, color: '#333', marginTop: 8, letterSpacing: 2 }}>
              #SrinithWedsPranathi · AUGUST 2025
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
