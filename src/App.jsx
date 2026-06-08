import { useState, useEffect, useRef } from "react";

const VENUE = "Sri Vinoda Convention, Hyderabad";
const VENUE_URL = "https://maps.app.goo.gl/Xapm2UzTwXJ5vzgu5";

const events = [
  {
    id: "engagement",
    title: "Engagement",
    telugu: "నిశ్చితార్థం",
    date: "June 25, 2026",
    day: "Thursday",
    time: "12:30 PM",
    type: "Lunch",
    venue: VENUE,
    venueUrl: VENUE_URL,
    color: "#8B6914",
    icon: "💍",
    photo: "/IMG_5770.PNG",
  },
  {
    id: "haldi",
    title: "Haldi Ceremony",
    telugu: "పసుపు కార్యక్రమం",
    date: "August 23, 2026",
    day: "Sunday",
    time: "12:00 PM",
    type: "Lunch",
    venue: VENUE,
    venueUrl: VENUE_URL,
    color: "#C97D00",
    icon: "🍯",
    photo: null,
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    telugu: "సంగీత్ నైట్",
    date: "August 23, 2026",
    day: "Sunday",
    time: "7:00 PM",
    type: "Dinner",
    venue: VENUE,
    venueUrl: VENUE_URL,
    color: "#2D6A4F",
    icon: "🎶",
    photo: null,
  },
  {
    id: "wedding",
    title: "Wedding",
    telugu: "వివాహం",
    date: "August 26, 2026",
    day: "Wednesday",
    time: "1:30 PM",
    type: "Lunch",
    venue: VENUE,
    venueUrl: VENUE_URL,
    color: "#8B1A1A",
    icon: "💐",
    photo: null,
  },
  {
    id: "reception",
    title: "Reception",
    telugu: "రిసెప్షన్",
    date: "August 28, 2026",
    day: "Friday",
    time: "7:30 PM",
    type: "Dinner",
    venue: "Venue TBA",
    venueUrl: null,
    color: "#5B2D8E",
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
          background: 'rgba(139,105,20,0.12)',
          border: '1px solid rgba(139,105,20,0.35)',
          borderRadius: 10, padding: '10px 14px',
          minWidth: 62, textAlign: 'center',
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
      border: `1px solid ${event.color}40`,
      borderRadius: 20,
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 4px 24px rgba(139,105,20,0.08)',
    }}>
      {/* Photo section for engagement - tall portrait */}
      {event.photo && (
        <div style={{
          width: '100%', height: 260,
          backgroundImage: `url(${event.photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(255,252,240,1) 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: 'rgba(255,255,255,0.85)',
            borderRadius: 20, padding: '4px 12px',
            fontSize: 11, color: event.color,
            letterSpacing: 2, textTransform: 'uppercase',
            fontFamily: 'Georgia, serif', backdropFilter: 'blur(8px)',
            border: `1px solid ${event.color}30`,
          }}>{event.type}</div>
        </div>
      )}

      <div style={{ padding: '22px 22px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
          <div style={{
            fontSize: 28, width: 52, height: 52, borderRadius: 14,
            background: `${event.color}12`, border: `1px solid ${event.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{event.icon}</div>
          <div style={{ flex: 1 }}>
            {!event.photo && (
              <div style={{ fontSize: 10, color: event.color, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 2 }}>
                {event.type}
              </div>
            )}
            <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", color: '#2a1500', fontWeight: 700, lineHeight: 1.1 }}>
              {event.title}
            </div>
            <div style={{ fontSize: 12, color: event.color, fontStyle: 'italic', marginTop: 2, fontFamily: 'Georgia, serif' }}>
              {event.telugu}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
          borderTop: `1px solid ${event.color}15`, paddingTop: 14,
        }}>
          <div>
            <div style={{ fontSize: 10, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Date</div>
            <div style={{ fontSize: 14, color: '#2a1500', fontFamily: 'Georgia, serif' }}>{event.date}</div>
            <div style={{ fontSize: 11, color: event.color }}>{event.day}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Time</div>
            <div style={{ fontSize: 14, color: '#2a1500', fontFamily: 'Georgia, serif' }}>{event.time}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: 10, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>Venue</div>
            <div style={{ fontSize: 13, color: '#2a1500', fontFamily: 'Georgia, serif' }}>{event.venue}</div>
            {event.venueUrl ? (
              <a href={event.venueUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                marginTop: 8, fontSize: 11, color: '#fff',
                textDecoration: 'none', borderRadius: 20, padding: '5px 12px',
                background: event.color, fontFamily: 'Georgia, serif',
              }}>
                📍 Get Directions
              </a>
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

  const handleSubmit = () => {
    if (!form.name || !form.attending) return;
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
      <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", color: '#6B4F00', marginTop: 12 }}>ధన్యవాదాలు!</div>
      <div style={{ color: '#A0855A', marginTop: 8, fontFamily: 'Georgia, serif' }}>Thank you, {form.name}! We'll see you there.</div>
    </div>
  );

  const inputStyle = {
    width: '100%', background: '#fff',
    border: '1px solid rgba(139,105,20,0.25)', borderRadius: 10,
    padding: '12px 16px', color: '#2a1500',
    fontFamily: 'Georgia, serif', fontSize: 14,
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input style={inputStyle} placeholder="Your full name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <input style={inputStyle} placeholder="Phone number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      <div style={{ display: 'flex', gap: 10 }}>
        {['Attending 🎉', "Can't Make It"].map(opt => (
          <button key={opt} onClick={() => setForm(f => ({ ...f, attending: opt }))} style={{
            flex: 1, padding: '11px 6px',
            background: form.attending === opt ? 'rgba(139,105,20,0.15)' : '#fff',
            border: `1px solid ${form.attending === opt ? '#8B6914' : 'rgba(139,105,20,0.2)'}`,
            borderRadius: 10, color: form.attending === opt ? '#6B4F00' : '#A0855A',
            cursor: 'pointer', fontSize: 13, fontFamily: 'Georgia, serif', transition: 'all 0.2s',
          }}>{opt}</button>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#A0855A', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>Which events?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {events.map(ev => (
            <button key={ev.id} onClick={() => toggleEvent(ev.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: form.events.includes(ev.id) ? `${ev.color}12` : '#fff',
              border: `1px solid ${form.events.includes(ev.id) ? ev.color : 'rgba(139,105,20,0.15)'}`,
              borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
              color: form.events.includes(ev.id) ? ev.color : '#A0855A',
              fontFamily: 'Georgia, serif', fontSize: 13, textAlign: 'left', transition: 'all 0.2s',
            }}>
              <span>{ev.icon}</span><span>{ev.title}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.6 }}>{ev.date}</span>
            </button>
          ))}
        </div>
      </div>
      <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
        placeholder="Leave a message for the couple..."
        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      <button onClick={handleSubmit} style={{
        background: 'linear-gradient(135deg, #8B6914, #C9A630)',
        border: 'none', borderRadius: 10, padding: '15px',
        color: '#fff', fontFamily: "'Playfair Display', serif",
        fontSize: 16, fontWeight: 700, cursor: 'pointer', letterSpacing: 1,
        boxShadow: '0 4px 20px rgba(139,105,20,0.3)',
      }}>Confirm RSVP ✨</button>
    </div>
  );
}

// SCROLL-DRIVEN ENVELOPE
function ScrollEnvelope({ onUnlocked }) {
  const containerRef = useRef();
  const [progress, setProgress] = useState(0); // 0 = closed, 1 = fully open
  const [unlocked, setUnlocked] = useState(false);
  const startY = useRef(null);
  const isDragging = useRef(false);

  // progress 0–0.4: envelope rotates in
  // progress 0.4–0.7: flap opens
  // progress 0.7–1.0: letter rises out
  // at progress 1.0: transition to main invite

  useEffect(() => {
    if (progress >= 1 && !unlocked) {
      setUnlocked(true);
      setTimeout(onUnlocked, 500);
    }
  }, [progress, unlocked]);

  const addProgress = (delta) => {
    setProgress(p => Math.max(0, Math.min(1, p + delta)));
  };

  // Touch handlers
  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const dy = startY.current - e.touches[0].clientY;
    startY.current = e.touches[0].clientY;
    addProgress(dy / 300);
  };
  const onTouchEnd = () => { isDragging.current = false; };

  // Mouse handlers for desktop
  const onMouseDown = (e) => {
    startY.current = e.clientY;
    isDragging.current = true;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const dy = startY.current - e.clientY;
    startY.current = e.clientY;
    addProgress(dy / 300);
  };
  const onMouseUp = () => { isDragging.current = false; };

  // Wheel handler
  const onWheel = (e) => {
    if (progress < 1) {
      e.preventDefault();
      addProgress(e.deltaY / 400);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.addEventListener('wheel', onWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', onWheel); };
  }, [progress]);

  // Tap to advance
  const onTap = () => {
    if (progress < 1) addProgress(0.35);
  };

  const flapAngle = progress > 0.4 ? Math.min(180, ((progress - 0.4) / 0.3) * 180) : 0;
  const letterY = progress > 0.7 ? Math.min(100, ((progress - 0.7) / 0.3) * 100) : 0;
  const letterOpacity = progress > 0.65 ? Math.min(1, (progress - 0.65) / 0.2) : 0;
  const envelopeRotate = progress < 0.4 ? progress * 25 : 10;
  const envelopeScale = 1 - progress * 0.05;

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={onTap}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'linear-gradient(160deg, #fdf6e3 0%, #f5e6b8 40%, #faecd0 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'grab', overflow: 'hidden',
        userSelect: 'none',
        opacity: unlocked ? 0 : 1,
        transition: unlocked ? 'opacity 0.5s ease' : 'none',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
        @keyframes float-e { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes hint-bounce { 0%,100%{transform:translateY(0);opacity:0.6} 50%{transform:translateY(-8px);opacity:1} }
        @keyframes petal-e {
          0%{transform:translateY(-10px) rotate(0deg);opacity:0}
          10%{opacity:1}
          100%{transform:translateY(105vh) rotate(540deg);opacity:0}
        }
        @keyframes shimmer-e {
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }
        .shimmer-env {
          background: linear-gradient(90deg, #8B6914, #C9A630, #6B4F00, #C9A630, #8B6914);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-e 3s linear infinite;
        }
      `}</style>

      {/* Decorative background pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(139,105,20,0.08) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      {/* Petals */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${8 + i * 16}%`, top: '-20px',
          fontSize: 14, pointerEvents: 'none',
          animation: `petal-e ${7 + i * 1.5}s linear infinite`,
          animationDelay: `${i * 1.2}s`,
        }}>🌸</div>
      ))}

      {/* Top label */}
      <div style={{
        fontSize: 11, letterSpacing: 5, color: '#A0855A',
        textTransform: 'uppercase', marginBottom: 28,
        fontFamily: 'Georgia, serif', opacity: 1 - progress * 2,
      }}>
        You are cordially invited
      </div>

      {/* ENVELOPE */}
      <div style={{
        position: 'relative',
        width: 300, height: 210,
        transform: `rotate(${envelopeRotate}deg) scale(${envelopeScale})`,
        transition: 'transform 0.1s ease',
        animation: progress === 0 ? 'float-e 3s ease-in-out infinite' : 'none',
      }}>
        {/* Envelope body */}
        <div style={{
          width: 300, height: 210,
          background: 'linear-gradient(145deg, #fff8e8, #f5e6c0)',
          border: '1.5px solid rgba(139,105,20,0.5)',
          borderRadius: 12, position: 'relative', overflow: 'hidden',
          boxShadow: '0 10px 50px rgba(139,105,20,0.2), 0 2px 10px rgba(139,105,20,0.1)',
        }}>
          {/* Decorative inner border */}
          <div style={{ position: 'absolute', inset: 5, border: '1px solid rgba(139,105,20,0.15)', borderRadius: 8, pointerEvents: 'none' }} />

          {/* Bottom triangles */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 0, borderLeft: '150px solid rgba(139,105,20,0.07)', borderTop: '105px solid transparent' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 0, height: 0, borderRight: '150px solid rgba(139,105,20,0.07)', borderTop: '105px solid transparent' }} />

          {/* Names on envelope front */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            paddingTop: 20,
            opacity: flapAngle > 60 ? 0 : 1,
            transition: 'opacity 0.2s',
          }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: '#A0855A', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Georgia, serif' }}>
              #SrinithWedsPranathi
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, lineHeight: 1 }} className="shimmer-env">
              Srinith
            </div>
            <div style={{ fontSize: 11, color: '#A0855A', fontStyle: 'italic', margin: '3px 0', fontFamily: "'Cormorant Garamond', serif", letterSpacing: 2 }}>
              weds
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, lineHeight: 1 }} className="shimmer-env">
              Pranathi
            </div>
            <div style={{ fontSize: 9, color: '#C9A630', marginTop: 6, letterSpacing: 1, fontFamily: 'Georgia, serif' }}>
              August 2026 · Hyderabad
            </div>
          </div>

          {/* Flap */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 130, transformOrigin: 'top center', zIndex: 3,
            transform: `perspective(600px) rotateX(${-flapAngle}deg)`,
            clipPath: 'polygon(0 0, 100% 0, 50% 85%)',
            background: 'linear-gradient(180deg, #f0d890, #d4a820)',
            borderBottom: '1px solid rgba(139,105,20,0.3)',
            transition: 'transform 0.05s',
          }} />
        </div>

        {/* Wax seal */}
        <div style={{
          position: 'absolute', top: '44%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 58, height: 58, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #C41E3A, #6b0f0f)',
          border: '2px solid rgba(212,160,23,0.8)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 4,
          boxShadow: '0 4px 15px rgba(139,26,26,0.4)',
          opacity: flapAngle > 80 ? 0 : 1,
          transition: 'opacity 0.2s',
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#D4A017', fontSize: 12, fontWeight: 700, lineHeight: 1.2, textAlign: 'center' }}>S<br/><span style={{fontSize:8}}>✦</span><br/>P</div>
        </div>

        {/* Letter rising out */}
        <div style={{
          position: 'absolute', bottom: 10, left: 20, right: 20,
          background: 'linear-gradient(180deg, #fffdf5, #fdf0d0)',
          borderRadius: 8,
          padding: '16px',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
          transform: `translateY(${-letterY}px)`,
          opacity: letterOpacity,
          zIndex: 2,
          transition: 'transform 0.05s, opacity 0.1s',
          border: '1px solid rgba(139,105,20,0.2)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: '#A0855A', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Georgia, serif' }}>
            With Joyful Hearts
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#2a1500', fontSize: 16, fontWeight: 700 }}>Srinith</div>
          <div style={{ fontSize: 10, fontStyle: 'italic', color: '#8B6914', fontFamily: 'Georgia, serif', margin: '2px 0' }}>weds</div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#2a1500', fontSize: 16, fontWeight: 700 }}>Pranathi</div>
          <div style={{ fontSize: 8, color: '#C9A630', marginTop: 6, letterSpacing: 1, fontFamily: 'Georgia, serif' }}>
            August 2026 · Hyderabad
          </div>
        </div>
      </div>

      {/* Swipe hint */}
      <div style={{
        marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        opacity: Math.max(0, 1 - progress * 4),
      }}>
        <div style={{ animation: 'hint-bounce 1.8s ease-in-out infinite', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: 20 }}>☝️</div>
          <div style={{ width: 1, height: 22, background: 'linear-gradient(to bottom, #8B6914, transparent)' }} />
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: '#8B6914', letterSpacing: 3, textTransform: 'uppercase' }}>
          Tap or Swipe Up
        </div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 11, color: '#C9A630', fontStyle: 'italic' }}>
          శుభ వివాహం
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ position: 'absolute', bottom: 30, display: 'flex', gap: 6 }}>
        {[0.33, 0.66, 1].map((step, i) => (
          <div key={i} style={{
            width: progress >= step ? 20 : 6, height: 6,
            borderRadius: 3, background: '#8B6914',
            opacity: progress >= step ? 0.8 : 0.2,
            transition: 'all 0.3s',
          }} />
        ))}
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fdf6e3 0%, #f5e6b8 30%, #faecd0 60%, #fff8e8 100%)',
      color: '#2a1500',
      fontFamily: 'Georgia, serif',
      overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(139,105,20,0.3); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer-g { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes rotate-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes petal-main {
          0%{transform:translateY(-20px) rotate(0deg);opacity:0}
          10%{opacity:0.7}
          100%{transform:translateY(105vh) rotate(720deg);opacity:0}
        }
        @keyframes invite-in { 0%{opacity:0;transform:translateY(10px)} 100%{opacity:1;transform:translateY(0)} }
        .shimmer-main {
          background: linear-gradient(90deg, #6B4F00, #C9A630, #8B6914, #C9A630, #6B4F00);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-g 3.5s linear infinite;
        }
        .petal-main { position:fixed; pointer-events:none; animation:petal-main linear infinite; z-index:0; }
        .nav-btn:hover { color: #6B4F00 !important; }
      `}</style>

      {!showInvite && <ScrollEnvelope onUnlocked={handleOpen} />}

      {showInvite && (
        <div style={{ animation: 'invite-in 0.8s ease forwards' }}>

          {/* Petals */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="petal-main" style={{
              left: `${10 + i * 18}%`, top: '-30px', fontSize: 15,
              animationDuration: `${9 + i * 2}s`, animationDelay: `${i * 2}s`,
            }}>🌸</div>
          ))}

          {/* Nav */}
          <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: 'rgba(253,246,227,0.92)', backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(139,105,20,0.15)', padding: '0 20px',
          }}>
            <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 54 }}>
              <div style={{ fontSize: 14, color: '#8B6914', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", letterSpacing: 2 }}>S & P</div>
              <div style={{ display: 'flex', gap: 2 }}>
                {[['home', 'Home'], ['events', 'Events'], ['rsvp', 'RSVP']].map(([id, label]) => (
                  <button key={id} className="nav-btn" onClick={() => scrollTo(id)} style={{
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
            {/* Mandala */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500, height: 500, opacity: 0.07, color: '#8B6914',
              animation: 'rotate-slow 80s linear infinite', pointerEvents: 'none',
            }} dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              ${[88,75,62,49,36,23].map(r => `<circle cx="100" cy="100" r="${r}" fill="none" stroke="currentColor" stroke-width="0.7"/>`).join('')}
              ${[0,22.5,45,67.5,90,112.5,135,157.5].map(a => `<line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" stroke-width="0.4" transform="rotate(${a} 100 100)"/>`).join('')}
              ${[0,60,120,180,240,300].map(a => `<path d="M100 15 Q108 50 100 85 Q92 50 100 15" fill="currentColor" opacity="0.5" transform="rotate(${a} 100 100)"/>`).join('')}
            </svg>` }} />

            <div style={{
              position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 440,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}>
              <div style={{ fontSize: 11, letterSpacing: 5, color: '#A0855A', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Georgia, serif' }}>
                Let's Celebrate
              </div>
              <div style={{ fontSize: 12, color: '#C9A630', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", marginBottom: 14 }}>
                శుభ వివాహం
              </div>

              <h1 style={{ fontSize: 'clamp(58px, 16vw, 82px)', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1, marginBottom: 6 }}>
                <span className="shimmer-main">Srinith</span>
              </h1>
              <div style={{ fontSize: 15, color: '#A0855A', fontStyle: 'italic', margin: '4px 0 6px', fontFamily: "'Cormorant Garamond', serif", letterSpacing: 3 }}>
                — weds —
              </div>
              <h1 style={{ fontSize: 'clamp(58px, 16vw, 82px)', fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1, marginBottom: 24 }}>
                <span className="shimmer-main">Pranathi</span>
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 22 }}>
                <div style={{ height: 1, width: 50, background: 'linear-gradient(to right, transparent, #C9A630)' }} />
                <span style={{ fontSize: 18 }}>💐</span>
                <div style={{ height: 1, width: 50, background: 'linear-gradient(to left, transparent, #C9A630)' }} />
              </div>

              {/* Parents */}
              <div style={{
                background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(139,105,20,0.2)',
                borderRadius: 16, padding: '18px 20px', marginBottom: 22,
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color: '#A0855A', marginBottom: 12, textTransform: 'uppercase' }}>Blessed by</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#8B6914', marginBottom: 2 }}>Groom's Parents</div>
                    <div style={{ fontSize: 13, color: '#2a1500', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>
                      [Name] &<br />Smt. Vijaya
                    </div>
                  </div>
                  <div style={{ color: '#C9A630', fontSize: 16, opacity: 0.5 }}>✦</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 11, color: '#8B6914', marginBottom: 2 }}>Bride's Parents</div>
                    <div style={{ fontSize: 13, color: '#2a1500', lineHeight: 1.5, fontFamily: "'Cormorant Garamond', serif" }}>
                      Sri. Sridhar Reddy &<br />Smt. Sunitha
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div style={{ marginBottom: 26 }}>
                <div style={{ fontSize: 11, letterSpacing: 3, color: '#A0855A', textTransform: 'uppercase', marginBottom: 12 }}>
                  Wedding Countdown
                </div>
                <CountdownTimer targetDate="2026-08-26T13:30:00" />
              </div>

              <button onClick={() => scrollTo('events')} style={{
                background: 'linear-gradient(135deg, rgba(139,105,20,0.12), rgba(201,166,48,0.15))',
                border: '1.5px solid rgba(139,105,20,0.35)', borderRadius: 50, padding: '13px 30px',
                color: '#6B4F00', cursor: 'pointer', fontFamily: "'Playfair Display', serif",
                fontSize: 14, letterSpacing: 1, animation: 'float 3s ease-in-out infinite',
              }}>
                View All Events ↓
              </button>
            </div>
          </section>

          {/* Events */}
          <section id="events" style={{ maxWidth: 500, margin: '0 auto', padding: '50px 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: '#A0855A', textTransform: 'uppercase', marginBottom: 8 }}>The Celebrations</div>
              <h2 style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <span className="shimmer-main">Five Sacred Events</span>
              </h2>
              <div style={{ fontSize: 13, color: '#A0855A', marginTop: 8, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
                వేడుకలకు ఆహ్వానం — You are warmly invited
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {events.map((event, i) => <EventCard key={event.id} event={event} index={i} />)}
            </div>
          </section>

          {/* Quote */}
          <section style={{
            padding: '36px 24px', textAlign: 'center',
            borderTop: '1px solid rgba(139,105,20,0.1)',
            borderBottom: '1px solid rgba(139,105,20,0.1)',
            background: 'rgba(255,255,255,0.4)',
          }}>
            <div style={{ maxWidth: 360, margin: '0 auto' }}>
              <div style={{ fontSize: 30, color: '#C9A630', opacity: 0.4, fontFamily: 'serif' }}>"</div>
              <p style={{ fontSize: 16, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", color: '#6B4F00', lineHeight: 1.8, margin: '6px 0' }}>
                A love that builds palaces out of promises,<br />and turns every vow into a universe.
              </p>
              <div style={{ fontSize: 30, color: '#C9A630', opacity: 0.4, fontFamily: 'serif' }}>"</div>
            </div>
          </section>

          {/* RSVP */}
          <section id="rsvp" style={{ maxWidth: 500, margin: '0 auto', padding: '56px 20px 80px' }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: '#A0855A', textTransform: 'uppercase', marginBottom: 8 }}>Join Us</div>
              <h2 style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 8 }}>
                <span className="shimmer-main">RSVP</span>
              </h2>
              <p style={{ fontSize: 13, color: '#A0855A', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
                మీ హాజరు మాకు ఆశీర్వాదం
              </p>
            </div>
            <RSVPForm />
          </section>

          {/* Footer */}
          <footer style={{
            textAlign: 'center', padding: '24px',
            borderTop: '1px solid rgba(139,105,20,0.1)',
            background: 'rgba(255,255,255,0.3)',
          }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>🌺 💐 🌺</div>
            <div style={{ fontSize: 12, color: '#A0855A', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
              శుభం భవతు — May there be auspiciousness
            </div>
            <div style={{ fontSize: 10, color: '#C9A630', marginTop: 8, letterSpacing: 2 }}>
              #SrinithWedsPranathi · AUGUST 2026
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
