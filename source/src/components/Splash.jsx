import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IMG } from "../assets/images.js";

/* Écran d'introduction : logo + anneau lumineux + nom, ~2,5 s, puis rideau qui remonte.
   Affiché une fois par visite (onglet), passable d'un clic ou d'une touche. */
const KEY = "touba-intro-vue";

export function useIntro() {
  const [show] = useState(() => {
    try { return !sessionStorage.getItem(KEY); } catch { return true; }
  });
  return show;
}

export default function Splash({ onReveal }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const duration = reduce ? 900 : 2500;

  useEffect(() => {
    try { sessionStorage.setItem(KEY, "1"); } catch { /* stockage indisponible : on l'affichera à nouveau */ }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(false), duration);
    const skip = (e) => { if (e.type === "keydown" || e.type === "pointerdown") setVisible(false); };
    window.addEventListener("keydown", skip);
    return () => { clearTimeout(t); window.removeEventListener("keydown", skip); document.body.style.overflow = ""; };
  }, [duration]);

  /* le site commence son animation pendant que le rideau remonte */
  useEffect(() => { if (!visible) { document.body.style.overflow = ""; onReveal?.(); } }, [visible, onReveal]);

  const letters = "TOUBA AUTOMOBILE".split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          role="status"
          aria-label="Chargement de Touba Automobile"
          onPointerDown={() => setVisible(false)}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center overflow-hidden bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* halo jaune qui respire */}
          <motion.div aria-hidden="true" className="absolute h-[520px] w-[520px] rounded-full bg-neon/20 blur-[120px]"
            initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease: "easeOut" }} />
          {/* lignes de vitesse */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden opacity-40">
            {[18, 34, 62, 78].map((top, i) => (
              <motion.span key={top} className="absolute h-px w-1/2 bg-gradient-to-r from-transparent via-neon to-transparent" style={{ top: `${top}%` }}
                initial={{ x: "-60vw" }} animate={{ x: "160vw" }} transition={{ duration: 1.3, delay: 0.15 + i * 0.12, ease: "easeIn" }} />
            ))}
          </div>

          <div className="relative grid justify-items-center gap-8 px-6">
            <div className="relative grid h-40 w-40 place-items-center sm:h-48 sm:w-48">
              {/* anneau qui se dessine autour du logo */}
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" />
                <motion.circle cx="100" cy="100" r="96" fill="none" stroke="#FACC15" strokeWidth="3" strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 8px rgba(250,204,21,.9))" }}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }} />
              </svg>
              <motion.div className="relative overflow-hidden rounded-full"
                initial={{ scale: 0.3, opacity: 0, rotate: -25 }} animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.25 }}>
                <img src={IMG.logo} alt="Logo Touba Automobile" className="h-32 w-32 rounded-full sm:h-40 sm:w-40" />
                {/* reflet qui traverse le logo */}
                <motion.span aria-hidden="true" className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  initial={{ left: "-50%" }} animate={{ left: "130%" }} transition={{ duration: 0.9, delay: 1.1, ease: "easeInOut" }} />
              </motion.div>
            </div>

            <p className="display flex text-xl text-white sm:text-3xl" aria-hidden="true">
              {letters.map((l, i) => (
                <motion.span key={i} className={i >= 6 ? "text-neon" : ""}
                  initial={{ y: 24, opacity: 0, filter: "blur(6px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.7 + i * 0.035, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  {l === " " ? " " : l}
                </motion.span>
              ))}
            </p>
            <motion.p className="text-xs font-light uppercase tracking-[0.5em] text-mist/60"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}>
              Thiès
            </motion.p>
          </div>

          {/* barre de progression */}
          <motion.span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] bg-neon shadow-[0_0_16px_rgba(250,204,21,.9)]"
            initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: duration / 1000, ease: "linear" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
