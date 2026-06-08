import { useState, useEffect, useRef } from "react";

const events = [
  {
    id: "engagement",
    title: "Engagement",
    telugu: "నిశ్చితార్థం",
    date: "June 25, 2025",
    day: "Wednesday",
    time: "12:30 PM",
    type: "Lunch",
    venue: "Taj Falaknuma Palace",
    city: "Hyderabad, Telangana",
    color: "#C9A96E",
    accent: "#F5E6C8",
    bg: "from-[#1a0a00] to-[#2d1500]",
    icon: "💍",
    emoji: "🌸",
  },
  {
    id: "haldi",
    title: "Haldi Ceremony",
    telugu: "పసుపు కార్యక్రమం",
    date: "August 23, 2025",
    day: "Saturday",
    time: "12:00 PM",
    type: "Lunch",
    venue: "ITC Kohenur",
    city: "Hyderabad, Telangana",
    color: "#E8B84B",
    accent: "#FFF3C4",
    bg: "from-[#1a1000] to-[#2d2000]",
    icon: "🌿",
    emoji: "🌻",
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    telugu: "సంగీత్ నైట్",
    date: "August 23, 2025",
    day: "Saturday",
    time: "7:00 PM",
    type: "Dinner",
    venue: "ITC Kohenur",
    city: "Hyderabad, Telangana",
    color: "#2D6A4F",
    accent: "#B7E4C7",
    bg: "from-[#001a0a] to-[#002d14]",
    icon: "🎶",
    emoji: "✨",
  },
  {
    id: "wedding",
    title: "Wedding",
    telugu: "వివాహం",
    date: "August 26, 2025",
    day: "Tuesday",
    time: "11:00 AM",
    type: "Lunch",
    venue: "Novotel Hyderabad Convention Centre",
    city: "Hyderabad, Telangana",
    color: "#8B1A1A",
    accent: "#FFD700",
    bg: "from-[#1a0000] to-[#2d0000]",
    icon: "🔥",
    emoji: "🌺",
  },
  {
    id: "reception",
    title: "Reception",
    telugu: "రిసెప్షన్",
    date: "August 28, 2025",
    day: "Thursday",
    time: "7:30 PM",
    type: "Dinner",
    venue: "The Park Hyderabad",
    city: "Hyderabad, Telangana",
    color: "#7B3F6E",
    accent: "#F2C4E8",
    bg: "from-[#0d001a] to-[#1a0028]",
    icon: "🥂",
    emoji: "💫",
  },
];

const kolam = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" opacity="0.15">
  <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" stroke-width="1"/>
  <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" stroke-width="0.5"/>
  <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" stroke-width="1"/>
  <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" stroke-width="0.5"/>
  <path d="M100 10 L110 90 L190 100 L110 110 L100 190 L90 110 L10 100 L90 90 Z" fill="none" stroke="currentColor" stroke-width="1"/>
  <path d="M100 30 L107 93 L170 100 L107 107 L100 170 L93 107 L30 100 L93 93 Z" fill="none" stroke="currentColor" stroke-width="0.5"/>
  <circle cx="100" cy="10" r="3" fill="currentColor"/>
  <circle cx="100" cy="190" r="3" fill="currentColor"/>
  <circle cx="10" cy="100" r="3" fill="currentColor"/>
  <circle cx="190" cy="100" r="3" fill="currentColor"/>
  <circle cx="29" cy="29" r="2" fill="currentColor"/>
  <circle cx="171" cy="29" r="2" fill="currentColor"/>
  <circle cx="29" cy="171" r="2" fill="currentColor"/>
  <circle cx="171" cy="171" r="2" fill="currentColor"/>
</svg>`;

const mangoLeaf = (
  <svg viewBox="0 0 40 80" style={{width:16, height:32, display:'inline-block'}}>
    <path d="M20 5 Q35 20 35 45 Q35 70 20 75 Q5 70 5 45 Q5 20 20 5Z" fill="#2D6A4F" opacity="0.8"/>
    <line x1="20" y1="5" x2="20" y2="75" stroke="#1a4030" strokeWidth="1.5"/>
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
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
      {[['Days', time.days], ['Hours', time.hours], ['Mins', time.minutes], ['Secs', time.seconds]].map(([label, val]) => (
        <div key={label} style={{
          background: 'rgba(201,169,110,0.15)',
          border: '1px solid rgba(201,169,110,0.4)',
          borderRadius: 8,
          padding: '12px 18px',
          minWidth: 64,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", color: '#C9A96E', fontWeight: 700 }}>
            {String(val).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 11, color: '#a88a60', letterSpacing: 2, textTransform: 'uppercase' }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

function EventCard({ event, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${event.color}40`,
      borderRadius: 16,
      padding: '32px 28px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: `${event.color}15`, filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Corner kolam decoration */}
      <div style={{
        position: 'absolute', top: 8, right: 8, width: 60, height: 60,
        color: event.color, opacity: 0.3,
      }} dangerouslySetInnerHTML={{ __html: kolam }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative' }}>
        <div style={{
          fontSize: 36,
          background: `${event.color}20`,
          width: 64, height: 64,
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${event.color}40`,
          flexShrink: 0,
        }}>{event.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: event.color, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 2, fontFamily: 'serif' }}>
            {event.emoji} {event.type}
          </div>
          <div style={{ fontSize: 26, fontFamily: "'Playfair Display', serif", color: '#F5E6C8', fontWeight: 700, lineHeight: 1.2 }}>
            {event.title}
          </div>
          <div style={{ fontSize: 13, color: event.color, fontStyle: 'italic', marginTop: 2, fontFamily: 'Georgia, serif' }}>
            {event.telugu}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 12, borderTop: `1px solid ${event.color}25`, paddingTop: 20,
      }}>
        <div>
          <div style={{ fontSize: 11, color: '#7a6a55', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Date</div>
          <div style={{ fontSize: 15, color: '#F5E6C8', fontFamily: 'Georgia, serif' }}>{event.date}</div>
          <div style={{ fontSize: 12, color: event.color, opacity: 0.8 }}>{event.day}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#7a6a55', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Time</div>
          <div style={{ fontSize: 15, color: '#F5E6C8', fontFamily: 'Georgia, serif' }}>{event.time}</div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ fontSize: 11, color: '#7a6a55', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Venue</div>
          <div style={{ fontSize: 15, color: '#F5E6C8', fontFamily: 'Georgia, serif' }}>{event.venue}</div>
          <div style={{ fontSize: 12, color: event.color, opacity: 0.8 }}>{event.city}</div>
        </div>
      </div>
    </div>
  );
}

function RSVPForm() {
  const [form, setForm] = useState({ name: '', attending: '', events: [], message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    if (form.name && form.attending) setSubmitted(true);
  };
  const toggleEvent = (id) => {
    setForm(f => ({
      ...f,
      events: f.events.includes(id) ? f.events.filter(e => e !== id) : [...f.events, id]
    }));
  };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 48 }}>🌺</div>
      <div style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", color: '#C9A96E', marginTop: 12 }}>
        ధన్యవాదాలు!
      </div>
      <div style={{ color: '#a88a60', marginTop: 8, fontFamily: 'Georgia, serif' }}>
        Thank you, {form.name}! Your RSVP has been received.
      </div>
    </div>
  );

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(201,169,110,0.3)', borderRadius: 8,
    padding: '12px 16px', color: '#F5E6C8',
    fontFamily: 'Georgia, serif', fontSize: 14,
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <input
        style={inputStyle} placeholder="Your full name"
        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
      />
      <div style={{ display: 'flex', gap: 12 }}>
        {['Joyfully Attending', 'Unable to Attend'].map(opt => (
          <button key={opt} onClick={() => setForm(f => ({ ...f, attending: opt }))} style={{
            flex: 1, padding: '10px 8px',
            background: form.attending === opt ? 'rgba(201,169,110,0.25)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${form.attending === opt ? '#C9A96E' : 'rgba(201,169,110,0.2)'}`,
            borderRadius: 8, color: form.attending === opt ? '#C9A96E' : '#7a6a55',
            cursor: 'pointer', fontSize: 13, fontFamily: 'Georgia, serif',
            transition: 'all 0.2s',
          }}>{opt}</button>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#7a6a55', marginBottom: 10, letterSpacing: 1 }}>EVENTS ATTENDING</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {events.map(ev => (
            <button key={ev.id} onClick={() => toggleEvent(ev.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: form.events.includes(ev.id) ? `${ev.color}20` : 'rgba(255,255,255,0.02)',
              border: `1px solid ${form.events.includes(ev.id) ? ev.color : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
              color: form.events.includes(ev.id) ? ev.color : '#7a6a55',
              fontFamily: 'Georgia, serif', fontSize: 13, textAlign: 'left',
              transition: 'all 0.2s',
            }}>
              <span>{ev.icon}</span>
              <span>{ev.title}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.7 }}>{ev.date}</span>
            </button>
          ))}
        </div>
      </div>
      <textarea
        style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
        placeholder="Leave a message for the couple... (optional)"
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
      />
      <button onClick={handleSubmit} style={{
        background: 'linear-gradient(135deg, #C9A96E, #8B6914)',
        border: 'none', borderRadius: 8, padding: '14px',
        color: '#1a0a00', fontFamily: "'Playfair Display', serif",
        fontSize: 16, fontWeight: 700, cursor: 'pointer',
        letterSpacing: 1, transition: 'opacity 0.2s',
      }}>Send RSVP ✨</button>
    </div>
  );
}

export default function WeddingInvite() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0500',
      color: '#F5E6C8',
      fontFamily: 'Georgia, serif',
      overflowX: 'hidden',
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0500; }
        ::-webkit-scrollbar-thumb { background: #C9A96E40; border-radius: 2px; }

        .nav-btn:hover { color: #C9A96E !important; }
        .event-nav-btn:hover { background: rgba(201,169,110,0.15) !important; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes petal-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #C9A96E, #FFD700, #F5E6C8, #C9A96E, #8B6914, #C9A96E);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .petal {
          position: fixed;
          pointer-events: none;
          font-size: 18px;
          animation: petal-fall linear infinite;
          z-index: 0;
        }
      `}</style>

      {/* Floating petals */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="petal" style={{
          left: `${10 + i * 15}%`,
          animationDuration: `${8 + i * 2}s`,
          animationDelay: `${i * 1.5}s`,
          top: '-30px',
        }}>🌸</div>
      ))}

      {/* Fixed Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(13,5,0,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,169,110,0.2)',
        padding: '0 20px',
      }}>
        <div style={{
          maxWidth: 480, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56,
        }}>
          <div style={{ fontSize: 13, color: '#C9A96E', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
            S & P
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[['home', 'Home'], ['events', 'Events'], ['rsvp', 'RSVP']].map(([id, label]) => (
              <button key={id} className="nav-btn" onClick={() => scrollTo(id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: activeSection === id ? '#C9A96E' : '#7a6a55',
                fontSize: 12, padding: '6px 10px', letterSpacing: 1,
                textTransform: 'uppercase', transition: 'color 0.2s',
                fontFamily: 'Georgia, serif',
              }}>{label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        padding: '80px 24px 40px',
        overflow: 'hidden',
      }}>
        {/* Background mandala */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 500, opacity: 0.06,
          color: '#C9A96E',
          animation: 'rotate-slow 60s linear infinite',
        }} dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          ${[90,80,70,60,50,40,30,20].map(r => `<circle cx="100" cy="100" r="${r}" fill="none" stroke="currentColor" stroke-width="0.5"/>`).join('')}
          ${[0,30,60,90,120,150].map(a => `<line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" stroke-width="0.3" transform="rotate(${a} 100 100)"/>`).join('')}
          ${[0,45,90,135].map(a => `<path d="M100 15 Q115 50 100 85 Q85 50 100 15" fill="currentColor" opacity="0.5" transform="rotate(${a} 100 100)"/>`).join('')}
        </svg>` }} />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          textAlign: 'center', maxWidth: 420,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}>
          {/* Mango leaf toran */}
          <div style={{ fontSize: 20, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            {'🌿🍃🌸🍃🌿'.split('').map((c, i) => (
              <span key={i} style={{ animation: `float ${2 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.1}s`, display: 'inline-block' }}>{c}</span>
            ))}
          </div>

          <div style={{ fontSize: 11, letterSpacing: 5, color: '#C9A96E', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'Georgia, serif' }}>
            With Joyful Hearts
          </div>

          <div style={{ fontSize: 13, color: '#7a6a55', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>
            శుభ వివాహం
          </div>

          <h1 style={{
            fontSize: 'clamp(52px, 14vw, 76px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900, lineHeight: 1,
            marginBottom: 6,
          }}>
            <span className="shimmer-text">Srinith</span>
          </h1>

          <div style={{ fontSize: 22, color: '#C9A96E', fontStyle: 'italic', margin: '8px 0', fontFamily: "'Cormorant Garamond', serif" }}>
            &amp; forever
          </div>

          <h1 style={{
            fontSize: 'clamp(52px, 14vw, 76px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900, lineHeight: 1,
            marginBottom: 24,
          }}>
            <span className="shimmer-text">Pranathi</span>
          </h1>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, #C9A96E)' }} />
            <span style={{ color: '#C9A96E', fontSize: 16 }}>🪷</span>
            <div style={{ height: 1, width: 60, background: 'linear-gradient(to left, transparent, #C9A96E)' }} />
          </div>

          {/* Parents */}
          <div style={{
            background: 'rgba(201,169,110,0.06)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: 12, padding: '20px 24px',
            marginBottom: 28,
          }}>
            <div style={{ fontSize: 12, letterSpacing: 2, color: '#7a6a55', marginBottom: 12, textTransform: 'uppercase' }}>
              Blessed by
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#C9A96E', marginBottom: 2 }}>Groom's Parents</div>
                <div style={{ fontSize: 14, color: '#F5E6C8', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>
                  [Name] &<br />Smt. Vijaya
                </div>
              </div>
              <div style={{ color: '#C9A96E', fontSize: 18, opacity: 0.5 }}>✦</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 12, color: '#C9A96E', marginBottom: 2 }}>Bride's Parents</div>
                <div style={{ fontSize: 14, color: '#F5E6C8', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>
                  Sri. Sridhar Reddy &<br />Smt. Sunitha
                </div>
              </div>
            </div>
          </div>

          {/* Wedding countdown */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: '#7a6a55', textTransform: 'uppercase', marginBottom: 12 }}>
              Wedding Countdown
            </div>
            <CountdownTimer targetDate="2025-08-26T11:00:00" />
          </div>

          <button onClick={() => scrollTo('events')} style={{
            background: 'linear-gradient(135deg, #C9A96E20, #8B691420)',
            border: '1px solid #C9A96E60',
            borderRadius: 50, padding: '14px 32px',
            color: '#C9A96E', cursor: 'pointer',
            fontFamily: "'Playfair Display', serif",
            fontSize: 15, letterSpacing: 1,
            transition: 'all 0.3s',
            animation: 'float 3s ease-in-out infinite',
          }}>
            View Celebrations ↓
          </button>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" style={{
        maxWidth: 480, margin: '0 auto',
        padding: '60px 20px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: '#7a6a55', textTransform: 'uppercase', marginBottom: 8 }}>
            The Celebrations
          </div>
          <h2 style={{
            fontSize: 36, fontFamily: "'Playfair Display', serif",
            color: '#F5E6C8', fontWeight: 700,
          }}>
            <span className="shimmer-text">Five Sacred Events</span>
          </h2>
          <div style={{ fontSize: 13, color: '#7a6a55', marginTop: 8, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
            వేడుకలకు ఆహ్వానం — You are warmly invited
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* Venue note */}
        <div style={{
          marginTop: 32, textAlign: 'center',
          background: 'rgba(201,169,110,0.05)',
          border: '1px solid rgba(201,169,110,0.15)',
          borderRadius: 12, padding: '20px',
        }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>📍</div>
          <div style={{ fontSize: 12, color: '#7a6a55', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>All venues in</div>
          <div style={{ fontSize: 18, color: '#C9A96E', fontFamily: "'Playfair Display', serif" }}>Hyderabad, Telangana</div>
          <div style={{ fontSize: 12, color: '#7a6a55', marginTop: 4, fontStyle: 'italic' }}>City of Nizams & Pearls</div>
        </div>
      </section>

      {/* Quote Section */}
      <section style={{
        padding: '40px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(201,169,110,0.1)',
        borderBottom: '1px solid rgba(201,169,110,0.1)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.05) 0%, transparent 70%)',
        }} />
        <div style={{ position: 'relative', maxWidth: 360, margin: '0 auto' }}>
          <div style={{ fontSize: 32, color: '#C9A96E', opacity: 0.4, fontFamily: 'serif', lineHeight: 1 }}>"</div>
          <p style={{
            fontSize: 17, fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', serif",
            color: '#d4b896', lineHeight: 1.7, margin: '8px 0',
          }}>
            A love that builds palaces out of promises,<br />
            and turns every vow into a universe.
          </p>
          <div style={{ fontSize: 32, color: '#C9A96E', opacity: 0.4, fontFamily: 'serif', lineHeight: 1 }}>"</div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" style={{
        maxWidth: 480, margin: '0 auto',
        padding: '60px 20px 80px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: '#7a6a55', textTransform: 'uppercase', marginBottom: 8 }}>
            Join Us
          </div>
          <h2 style={{
            fontSize: 36, fontFamily: "'Playfair Display', serif",
            color: '#F5E6C8', fontWeight: 700, marginBottom: 8,
          }}>RSVP</h2>
          <p style={{ fontSize: 14, color: '#7a6a55', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
            మీ హాజరు మాకు ఆశీర్వాదం
          </p>
          <p style={{ fontSize: 12, color: '#5a4a3a', marginTop: 4 }}>
            Your presence blesses this union
          </p>
        </div>
        <RSVPForm />
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '24px',
        borderTop: '1px solid rgba(201,169,110,0.15)',
      }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>🌺 🌸 🌺</div>
        <div style={{ fontSize: 13, color: '#5a4a3a', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
          శుభం భవతు — May there be auspiciousness
        </div>
        <div style={{ fontSize: 11, color: '#3a2a1a', marginTop: 8, letterSpacing: 1 }}>
          SRINITH & PRANATHI · AUGUST 2025
        </div>
      </footer>
    </div>
  );
}