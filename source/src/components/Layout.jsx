import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, X, MapPin, Clock, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { PAGES } from "../data/content.js";
import { CONFIG, telUrl, waUrl } from "../config.js";
import { IMG } from "../assets/images.js";
import { Button, useSite } from "./ui.jsx";

function NavLink({ page, active, onClick, className = "", children }) {
  return (
    <a
      href={`#${page.id}`}
      aria-current={active ? "page" : undefined}
      onClick={(e) => { e.preventDefault(); onClick(page.id); }}
      className={className}
    >
      {children ?? page.label}
    </a>
  );
}

export function Header() {
  const { page, go, openBooking } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const navigate = (id) => { setOpen(false); go(id); };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "border-b border-white/[0.07] bg-ink/75 backdrop-blur-xl" : "bg-transparent"}`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="wrap flex h-[76px] items-center gap-6">
          <a href="#accueil" onClick={(e) => { e.preventDefault(); navigate("accueil"); }} className="mr-auto flex items-center gap-3" aria-label="Touba Automobile, accueil">
            <img src={IMG.logo} alt="Logo Touba Automobile" width="46" height="46" className="h-[46px] w-[46px] rounded-full ring-1 ring-white/20" />
            <span className="display text-[15px] leading-none text-white sm:text-base" aria-hidden="true">
              Touba<br /><span className="font-light tracking-[0.2em] text-mist/70" style={{ fontStretch: "100%", fontVariationSettings: '"wdth" 100' }}>Automobile</span>
            </span>
          </a>

          <nav aria-label="Menu principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {PAGES.map((p) => (
                <li key={p.id} className="relative">
                  <NavLink page={p} active={page === p.id} onClick={navigate}
                    className={`relative inline-flex min-h-[44px] items-center px-3.5 text-[15px] transition-colors ${page === p.id ? "text-white" : "text-mist/70 hover:text-white"}`}>
                    {p.label}
                    {page === p.id && (
                      <motion.span layoutId="nav-active" className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-neon shadow-[0_0_12px_rgba(250,204,21,.8)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Button className="hidden lg:inline-flex" onClick={() => openBooking()}>
            <CalendarCheck className="h-[18px] w-[18px]" aria-hidden="true" /> Prendre rendez-vous
          </Button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink/95 pt-[96px] backdrop-blur-2xl lg:hidden"
          >
            <ul className="wrap grid gap-1">
              {PAGES.map((p, i) => (
                <motion.li key={p.id} initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i, duration: 0.35 }}>
                  <NavLink page={p} active={page === p.id} onClick={navigate}
                    className={`display flex min-h-[60px] items-center justify-between border-b border-white/[0.07] text-2xl ${page === p.id ? "text-neon" : "text-white"}`}>
                    {p.label}
                    <ArrowUpRight className="h-5 w-5 text-mist/50" aria-hidden="true" />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="wrap mt-8 pb-32">
              <Button className="w-full" onClick={() => { setOpen(false); openBooking(); }}>
                <CalendarCheck className="h-[18px] w-[18px]" aria-hidden="true" /> Prendre rendez-vous
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/* Barre mobile fixe : Appeler + WhatsApp. Le contenu a un espace en bas pour ne jamais être caché. */
export function MobileBar() {
  return (
    <nav aria-label="Contact rapide" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.3fr] gap-3 border-t border-white/10 bg-ink/85 px-5 pt-3 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}>
      <a href={telUrl} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/20 font-medium text-white">
        <Phone className="h-[18px] w-[18px]" aria-hidden="true" /> Appeler
      </a>
      <a href={waUrl()} target="_blank" rel="noopener" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-neon font-semibold text-ink">
        <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" /> WhatsApp
      </a>
    </nav>
  );
}

export function Footer() {
  const { go } = useSite();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink pb-28 pt-20 md:pb-10">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-neon/[0.06] blur-3xl" />
      <div className="wrap relative">
        <p className="display text-[8.4vw] leading-[.85] text-white/[0.05] lg:text-[128px]" aria-hidden="true">Touba<br />Automobile</p>
        <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="grid content-start gap-5">
            <div className="flex items-center gap-4">
              <img src={IMG.logo} alt="Logo Touba Automobile" width="112" height="112" loading="lazy" className="h-28 w-28 rounded-full ring-1 ring-white/15" />
              <p className="display text-2xl leading-none text-white" aria-hidden="true">Touba<br /><span className="text-neon">Automobile</span></p>
            </div>
            <p className="max-w-sm text-lg font-light leading-relaxed text-mist/80">Le garage le plus moderne de la ville. La qualité que vous méritez, ici à Thiès.</p>
            <div className="flex gap-2">
              {["TikTok", "Facebook", "Instagram"].map((n) => (
                <a key={n} href="#" aria-label={`${n} (lien à confirmer)`} className="inline-flex min-h-[44px] items-center rounded-lg border border-white/10 px-3 text-sm text-mist/80 transition hover:border-neon/60 hover:text-neon">{n}</a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-mist/60">Pages</h2>
            <ul className="grid gap-1">
              {PAGES.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} onClick={(e) => { e.preventDefault(); go(p.id); }} className="inline-flex min-h-[40px] items-center text-mist/90 transition hover:text-neon">{p.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-mist/60">Nous trouver</h2>
            <ul className="grid gap-4 font-light text-mist/90">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 flex-none text-neon" aria-hidden="true" />{CONFIG.adresse}</li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 flex-none text-neon" aria-hidden="true" />Du mardi au dimanche, {CONFIG.horaires}. Fermé le lundi.</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 flex-none text-neon" aria-hidden="true" /><a href={telUrl} className="hover:text-neon">{CONFIG.affichage}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6 text-sm font-light text-mist/60">
          <p>© Touba Automobile, Thiès</p>
          <nav aria-label="Informations légales" className="flex gap-4">
            <a href="#" className="inline-flex min-h-[44px] items-center hover:text-white">Mentions légales</a>
            <a href="#" className="inline-flex min-h-[44px] items-center hover:text-white">Politique de confidentialité</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
