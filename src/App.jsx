import { useState, useRef, useEffect } from "react";

const VENUE = "Sri Vinoda Convention, Hyderabad";
const VENUE_URL = "https://maps.app.goo.gl/Xapm2UzTwXJ5vzgu5";

const pages = [
  { id: "cover" },
  { id: "sangeet" },
  { id: "haldi" },
  { id: "wedding" },
  { id: "reception" },
];

function Countdown({ target, color }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {[["Days", t.d], ["Hrs", t.h], ["Min", t.m], ["Sec", t.s]].map(([l, v]) => (
        <div key={l} style={{ textAlign: "center", minWidth: 52 }}>
          <div style={{ fontSize: 26, fontFamily: "serif", color, fontWeight: 700, lineHeight: 1 }}>
            {String(v).padStart(2, "0")}
          </div>
          <div style={{ fontSize: 10, color, opacity: 0.6, letterSpacing: 2, textTransform: "uppercase" }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function Corner({ size = 80, color = "#C9A630", flipH = false, flipV = false }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 80 80"
      style={{ opacity: 0.35, transform: `scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})` }}
    >
      <path d="M4 4 L30 4 Q34 4 34 8 L34 16 Q34 20 30 20 L16 20 Q12 20 12 24 L12 34 Q12 38 8 38 L4 38 Z"
        fill="none" stroke={color} strokeWidth="1.2" />
      <circle cx="4" cy="4" r="2.5" fill={color} />
      <circle cx="34" cy="34" r="1.5" fill={color} opacity="0.6" />
      {[0, 10, 20].map(i => <circle key={i} cx={4 + i * 1.2} cy={4} r="0.7" fill={color} />)}
      {[0, 10, 20].map(i => <circle key={i + 10} cx={4} cy={4 + i * 1.2} r="0.7" fill={color} />)}
    </svg>
  );
}

function Divider({ color = "#C9A630", width = 200 }) {
  return (
    <svg width={width} height={16} viewBox={`0 0 ${width} 16`} style={{ opacity: 0.6 }}>
      <line x1="0" y1="8" x2={width / 2 - 10} y2="8" stroke={color} strokeWidth="0.8" />
      <polygon points={`${width/2},2 ${width/2+8},8 ${width/2},14 ${width/2-8},8`} fill={color} />
      <line x1={width / 2 + 10} y1="8" x2={width} y2="8" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

function Dots({ bg, size = 22 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `radial-gradient(circle, ${bg} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    }} />
  );
}

function Frame({ color }) {
  return (
    <div style={{ position: "absolute", inset: 14, border: `1px solid ${color}`, borderRadius: 4, pointerEvents: "none" }} />
  );
}

function CoverPage() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#fffdf5 0%,#fdf5d8 50%,#fef8e8 100%)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", overflow: "hidden" }}>
      <Dots bg="rgba(139,105,20,0.04)" />
      <Frame color="rgba(139,105,20,0.15)" />
      <div style={{ position: "absolute", top: 0, left: 0 }}><Corner color="#C9A630" /></div>
      <div style={{ position: "absolute", top: 0, right: 0 }}><Corner color="#C9A630" flipH /></div>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}><Corner color="#C9A630" flipV /></div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}><Corner color="#C9A630" flipH flipV /></div>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 320 }}>
        <div style={{ fontSize: 9, letterSpacing: 5, color: "#A0855A", textTransform: "uppercase", marginBottom: 10, fontFamily: "Georgia,serif" }}>
          Together with their families
        </div>

        <Divider color="#C9A630" width={220} />

        <div style={{ margin: "16px 0 4px" }}>
          <div style={{ fontSize: "clamp(42px,11vw,58px)", fontFamily: "Georgia,serif", fontWeight: 900, lineHeight: 0.95, background: "linear-gradient(135deg,#6B4F00,#C9A630,#8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Srinith
          </div>
          <div style={{ fontSize: 13, color: "#A0855A", fontStyle: "italic", fontFamily: "Georgia,serif", letterSpacing: 3, margin: "6px 0" }}>
            weds
          </div>
          <div style={{ fontSize: "clamp(42px,11vw,58px)", fontFamily: "Georgia,serif", fontWeight: 900, lineHeight: 0.95, background: "linear-gradient(135deg,#6B4F00,#C9A630,#8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Pranathi
          </div>
        </div>

        <Divider color="#C9A630" width={180} />

        <div style={{ margin: "12px 0", fontSize: 10, color: "#8B6914", letterSpacing: 2, fontFamily: "Georgia,serif" }}>
          August 2026 &middot; Hyderabad
        </div>

        <div style={{ background: "rgba(139,105,20,0.06)", border: "1px solid rgba(139,105,20,0.15)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#A0855A", textTransform: "uppercase", marginBottom: 8 }}>Blessed by</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 6, alignItems: "center" }}>
            <div style={{ textAlign: "right", fontSize: 11, color: "#3a2000", fontFamily: "Georgia,serif", lineHeight: 1.5 }}>
              <div style={{ fontSize: 9, color: "#8B6914", marginBottom: 2 }}>Groom</div>
              [Name] &amp;<br />Smt. Vijaya
            </div>
            <div style={{ color: "#C9A630", fontSize: 12, opacity: 0.5, padding: "0 4px" }}>x</div>
            <div style={{ textAlign: "left", fontSize: 11, color: "#3a2000", fontFamily: "Georgia,serif", lineHeight: 1.5 }}>
              <div style={{ fontSize: 9, color: "#8B6914", marginBottom: 2 }}>Bride</div>
              Sri. Sridhar Reddy &amp;<br />Smt. Sunitha
            </div>
          </div>
        </div>

        <Countdown target="2026-08-26T11:20:00" color="#8B6914" />

        <div style={{ marginTop: 16, fontSize: 10, color: "#C9A630", letterSpacing: 2, fontFamily: "Georgia,serif", opacity: 0.7 }}>
          Swipe up to explore
        </div>
      </div>
    </div>
  );
}

function SangeetPage() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#1a0a2e 0%,#2d1654 40%,#1e0d3a 100%)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, left: "-10%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(180,120,255,0.18) 0%,transparent 70%)", filter: "blur(35px)" }} />
      <div style={{ position: "absolute", bottom: -50, right: "-5%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(150,80,255,0.14) 0%,transparent 70%)", filter: "blur(30px)" }} />
      <Frame color="rgba(155,89,182,0.25)" />
      <div style={{ position: "absolute", top: 0, left: 0 }}><Corner color="#9B59B6" /></div>
      <div style={{ position: "absolute", top: 0, right: 0 }}><Corner color="#9B59B6" flipH /></div>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}><Corner color="#9B59B6" flipV /></div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}><Corner color="#9B59B6" flipH flipV /></div>

      {[["10%","18%",8],["88%","22%",6],["15%","72%",7],["85%","68%",5],["50%","8%",9],["5%","45%",6],["95%","48%",7]].map(([x,y,s],i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: "rgba(195,155,211,0.4)" }} />
      ))}

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 320 }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>&#127926;</div>
        <div style={{ fontSize: 9, letterSpacing: 5, color: "#C39BD3", textTransform: "uppercase", marginBottom: 8, fontFamily: "Georgia,serif" }}>
          An Evening of Music
        </div>
        <Divider color="#9B59B6" width={170} />
        <div style={{ margin: "14px 0 6px" }}>
          <div style={{ fontSize: 42, fontFamily: "Georgia,serif", fontWeight: 900, color: "#fff", lineHeight: 1 }}>Sangeet</div>
          <div style={{ fontSize: 18, fontFamily: "Georgia,serif", color: "#C39BD3", fontStyle: "italic" }}>Night</div>
        </div>
        <div style={{ fontSize: 12, color: "#9B59B6", fontFamily: "Georgia,serif", fontStyle: "italic", marginBottom: 14 }}>
          sangeet night
        </div>
        <div style={{ background: "rgba(155,89,182,0.12)", border: "1px solid rgba(155,89,182,0.25)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 9, color: "#9B59B6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Date</div>
              <div style={{ fontSize: 14, color: "#fff", fontFamily: "Georgia,serif" }}>August 23, 2026</div>
              <div style={{ fontSize: 11, color: "#C39BD3" }}>Sunday</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: "#9B59B6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Time</div>
              <div style={{ fontSize: 14, color: "#fff", fontFamily: "Georgia,serif" }}>7:00 PM</div>
              <div style={{ fontSize: 11, color: "#C39BD3" }}>Dinner</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(155,89,182,0.2)", paddingTop: 10 }}>
            <div style={{ fontSize: 9, color: "#9B59B6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Venue</div>
            <div style={{ fontSize: 13, color: "#fff", fontFamily: "Georgia,serif" }}>{VENUE}</div>
            <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8, fontSize: 11, color: "#C39BD3", textDecoration: "none", border: "1px solid rgba(155,89,182,0.35)", borderRadius: 16, padding: "4px 12px" }}>
              Directions
            </a>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#BB8FCE", fontStyle: "italic", fontFamily: "Georgia,serif", opacity: 0.8 }}>
          Dance like nobody is watching
        </div>
      </div>
    </div>
  );
}

function HaldiPage() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#fffbea 0%,#fef3b0 40%,#fdf5c5 100%)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,166,35,0.15) 0%,transparent 70%)", filter: "blur(40px)" }} />
      <Dots bg="rgba(139,105,20,0.06)" />
      <Frame color="rgba(201,125,0,0.22)" />
      <div style={{ position: "absolute", top: 0, left: 0 }}><Corner color="#C97D00" /></div>
      <div style={{ position: "absolute", top: 0, right: 0 }}><Corner color="#C97D00" flipH /></div>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}><Corner color="#C97D00" flipV /></div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}><Corner color="#C97D00" flipH flipV /></div>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 320 }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>&#127855;</div>
        <div style={{ fontSize: 9, letterSpacing: 5, color: "#8B6914", textTransform: "uppercase", marginBottom: 8, fontFamily: "Georgia,serif" }}>
          Blessings and Turmeric
        </div>
        <Divider color="#C97D00" width={170} />
        <div style={{ margin: "14px 0 6px" }}>
          <div style={{ fontSize: 42, fontFamily: "Georgia,serif", fontWeight: 900, color: "#4a2e00", lineHeight: 1 }}>Haldi</div>
          <div style={{ fontSize: 16, fontFamily: "Georgia,serif", color: "#8B6914", fontStyle: "italic" }}>Ceremony</div>
        </div>
        <div style={{ fontSize: 12, color: "#C97D00", fontFamily: "Georgia,serif", fontStyle: "italic", marginBottom: 14 }}>
          pasuppu kaaryakramam
        </div>
        <div style={{ background: "rgba(201,125,0,0.09)", border: "1px solid rgba(201,125,0,0.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 9, color: "#8B6914", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Date</div>
              <div style={{ fontSize: 14, color: "#3a2000", fontFamily: "Georgia,serif" }}>August 23, 2026</div>
              <div style={{ fontSize: 11, color: "#C97D00" }}>Sunday</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: "#8B6914", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Time</div>
              <div style={{ fontSize: 14, color: "#3a2000", fontFamily: "Georgia,serif" }}>12:00 PM</div>
              <div style={{ fontSize: 11, color: "#C97D00" }}>Lunch</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(201,125,0,0.15)", paddingTop: 10 }}>
            <div style={{ fontSize: 9, color: "#8B6914", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Venue</div>
            <div style={{ fontSize: 13, color: "#3a2000", fontFamily: "Georgia,serif" }}>{VENUE}</div>
            <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8, fontSize: 11, color: "#8B6914", textDecoration: "none", border: "1px solid rgba(139,105,20,0.3)", borderRadius: 16, padding: "4px 12px" }}>
              Directions
            </a>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#8B6914", fontStyle: "italic", fontFamily: "Georgia,serif", opacity: 0.8 }}>
          Glow like turmeric, shine like gold
        </div>
      </div>
    </div>
  );
}

function WeddingPage() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#1c0e00 0%,#2e1800 40%,#1a0c00 100%)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(212,170,40,0.12) 0%,transparent 70%)", filter: "blur(40px)" }} />
      <Frame color="rgba(212,170,40,0.25)" />
      <div style={{ position: "absolute", inset: 18, border: "0.5px solid rgba(212,170,40,0.12)", borderRadius: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0 }}><Corner color="#D4AA28" size={90} /></div>
      <div style={{ position: "absolute", top: 0, right: 0 }}><Corner color="#D4AA28" size={90} flipH /></div>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}><Corner color="#D4AA28" size={90} flipV /></div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}><Corner color="#D4AA28" size={90} flipH flipV /></div>

      {[["10%","22%"],["88%","26%"],["14%","70%"],["86%","68%"],["50%","8%"],["4%","47%"],["96%","50%"]].map(([x,y],i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 6+i, height: 6+i, borderRadius: "50%", background: "rgba(212,170,40,0.2)" }} />
      ))}

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 320 }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>&#128144;</div>
        <div style={{ fontSize: 9, letterSpacing: 5, color: "#D4AA28", textTransform: "uppercase", marginBottom: 8, fontFamily: "Georgia,serif" }}>
          The Grand Union
        </div>
        <Divider color="#D4AA28" width={190} />
        <div style={{ margin: "14px 0 6px" }}>
          <div style={{ fontSize: 46, fontFamily: "Georgia,serif", fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg,#B8860B,#FFD700,#D4AA28,#FFD700,#B8860B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Wedding
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#D4AA28", fontFamily: "Georgia,serif", fontStyle: "italic", marginBottom: 14 }}>
          vivaham
        </div>
        <div style={{ background: "rgba(212,170,40,0.07)", border: "1px solid rgba(212,170,40,0.22)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 9, color: "#D4AA28", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Date</div>
              <div style={{ fontSize: 14, color: "#fff", fontFamily: "Georgia,serif" }}>August 26, 2026</div>
              <div style={{ fontSize: 11, color: "#D4AA28" }}>Wednesday</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: "#D4AA28", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Time</div>
              <div style={{ fontSize: 14, color: "#fff", fontFamily: "Georgia,serif" }}>11:20 AM</div>
              <div style={{ fontSize: 11, color: "#D4AA28" }}>Lunch</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(212,170,40,0.15)", paddingTop: 10 }}>
            <div style={{ fontSize: 9, color: "#D4AA28", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Venue</div>
            <div style={{ fontSize: 13, color: "#fff", fontFamily: "Georgia,serif" }}>{VENUE}</div>
            <a href={VENUE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8, fontSize: 11, color: "#D4AA28", textDecoration: "none", border: "1px solid rgba(212,170,40,0.3)", borderRadius: 16, padding: "4px 12px" }}>
              Directions
            </a>
          </div>
        </div>
        <Countdown target="2026-08-26T11:20:00" color="#D4AA28" />
      </div>
    </div>
  );
}

function ReceptionPage() {
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#1a1a2e 0%,#16213e 40%,#0f3460 60%,#1a1a2e 100%)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 24px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -70, left: "25%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%)", filter: "blur(25px)" }} />
      <Frame color="rgba(255,255,255,0.07)" />
      <div style={{ position: "absolute", top: 0, left: 0 }}><Corner color="#7f8fa6" /></div>
      <div style={{ position: "absolute", top: 0, right: 0 }}><Corner color="#7f8fa6" flipH /></div>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}><Corner color="#7f8fa6" flipV /></div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}><Corner color="#7f8fa6" flipH flipV /></div>

      {[["8%","18%"],["90%","20%"],["18%","72%"],["82%","70%"],["50%","7%"],["4%","46%"],["96%","50%"],["44%","83%"]].map(([x,y],i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 4+i, height: 4+i, borderRadius: "50%", background: "rgba(200,214,229,0.2)" }} />
      ))}

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 320 }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>&#127754;</div>
        <div style={{ fontSize: 9, letterSpacing: 5, color: "#7f8fa6", textTransform: "uppercase", marginBottom: 8, fontFamily: "Georgia,serif" }}>
          An Evening to Remember
        </div>
        <Divider color="#5d6d7e" width={170} />
        <div style={{ margin: "14px 0 6px" }}>
          <div style={{ fontSize: 42, fontFamily: "Georgia,serif", fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg,#7f8fa6,#fff,#a8b4cc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Reception
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#7f8fa6", fontFamily: "Georgia,serif", fontStyle: "italic", marginBottom: 14 }}>
          reception
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 9, color: "#7f8fa6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Date</div>
              <div style={{ fontSize: 14, color: "#fff", fontFamily: "Georgia,serif" }}>August 28, 2026</div>
              <div style={{ fontSize: 11, color: "#a8b4cc" }}>Friday</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: "#7f8fa6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Time</div>
              <div style={{ fontSize: 14, color: "#fff", fontFamily: "Georgia,serif" }}>7:30 PM</div>
              <div style={{ fontSize: 11, color: "#a8b4cc" }}>Dinner</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10 }}>
            <div style={{ fontSize: 9, color: "#7f8fa6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>Venue</div>
            <div style={{ fontSize: 13, color: "#ccc", fontFamily: "Georgia,serif" }}>Venue TBA</div>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px" }}>
          <div style={{ fontSize: 10, color: "#7f8fa6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>RSVP</div>
          {done ? (
            <div style={{ fontSize: 13, color: "#a8b4cc", fontFamily: "Georgia,serif" }}>Thank you, {name}!</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 12px", color: "#fff", fontFamily: "Georgia,serif", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { if (name) setDone(true); }} style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "9px", color: "#fff", cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 12 }}>
                  Attending
                </button>
                <button onClick={() => { if (name) setDone(true); }} style={{ flex: 1, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "9px", color: "#666", cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 12 }}>
                  Regrets
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PageContent({ id }) {
  if (id === "cover") return <CoverPage />;
  if (id === "sangeet") return <SangeetPage />;
  if (id === "haldi") return <HaldiPage />;
  if (id === "wedding") return <WeddingPage />;
  if (id === "reception") return <ReceptionPage />;
  return null;
}

export default function WeddingBooklet() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState("next");
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

  const next = () => goTo(current + 1, "next");
  const prev = () => goTo(current - 1, "prev");

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

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 700) return;
      lastWheel.current = now;
      if (e.deltaY > 20) next();
      else if (e.deltaY < -20) prev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, flipping]);

  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowDown", "ArrowRight", " "].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, flipping]);

  const isLight = pages[current].id === "cover" || pages[current].id === "haldi";

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <style>{`
        @keyframes flip-down-out { 0%{transform:perspective(1000px) rotateX(0deg);opacity:1} 100%{transform:perspective(1000px) rotateX(-90deg);opacity:0} }
        @keyframes flip-down-in  { 0%{transform:perspective(1000px) rotateX(90deg);opacity:0}  100%{transform:perspective(1000px) rotateX(0deg);opacity:1} }
        @keyframes flip-up-out   { 0%{transform:perspective(1000px) rotateX(0deg);opacity:1}   100%{transform:perspective(1000px) rotateX(90deg);opacity:0} }
        @keyframes flip-up-in    { 0%{transform:perspective(1000px) rotateX(-90deg);opacity:0}  100%{transform:perspective(1000px) rotateX(0deg);opacity:1} }
        .fdo { animation:flip-down-out 0.48s ease-in  forwards; transform-origin:top center; }
        .fdi { animation:flip-down-in  0.48s ease-out forwards; transform-origin:top center; }
        .fuo { animation:flip-up-out   0.48s ease-in  forwards; transform-origin:bottom center; }
        .fui { animation:flip-up-in    0.48s ease-out forwards; transform-origin:bottom center; }
        * { box-sizing:border-box; margin:0; padding:0; }
        a { color:inherit; }
      `}</style>

      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 20, padding: "6px 0" }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${isLight ? "rgba(139,105,20,0.35)" : "rgba(255,255,255,0.2)"}`, background: isLight ? "rgba(253,248,232,0.8)" : "rgba(30,30,30,0.8)" }} />
        ))}
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={flipping
          ? (flipDir === "next" ? "fdo" : "fuo")
          : (flipDir === "next" ? "fdi" : "fui")
        }
        style={{ width: "100%", maxWidth: 420, height: "calc(100vh - 26px)", marginTop: 26, overflow: "hidden", boxShadow: "0 20px 80px rgba(0,0,0,0.7)" }}
      >
        <PageContent id={pages[displayPage].id} />
      </div>

      {current > 0 && (
        <button onClick={prev} style={{ position: "absolute", top: 38, left: "50%", transform: "translateX(-50%)", fontSize: 18, color: isLight ? "rgba(139,105,20,0.4)" : "rgba(255,255,255,0.2)", padding: 6, zIndex: 10, background: "none", border: "none", cursor: "pointer" }}>
          &#9650;
        </button>
      )}

      {current < pages.length - 1 && (
        <button onClick={next} style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", fontSize: 18, color: isLight ? "rgba(139,105,20,0.4)" : "rgba(255,255,255,0.2)", padding: 6, zIndex: 10, background: "none", border: "none", cursor: "pointer" }}>
          &#9660;
        </button>
      )}

      <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 8, zIndex: 10 }}>
        {pages.map((p, i) => (
          <div
            key={p.id}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            style={{ width: 6, height: current === i ? 20 : 6, borderRadius: 3, cursor: "pointer", background: current === i ? (isLight ? "#8B6914" : "#fff") : (isLight ? "rgba(139,105,20,0.3)" : "rgba(255,255,255,0.2)"), transition: "all 0.3s" }}
          />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 10, right: 18, fontSize: 10, color: isLight ? "rgba(139,105,20,0.4)" : "rgba(255,255,255,0.2)", letterSpacing: 2, fontFamily: "Georgia,serif", zIndex: 10 }}>
        {current + 1} / {pages.length}
      </div>
    </div>
  );
}
