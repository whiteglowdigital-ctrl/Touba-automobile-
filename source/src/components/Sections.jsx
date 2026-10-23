import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarCheck, Check, MessageCircle, MoveHorizontal, Sparkles, MapPin, Clock, Star, UserRound } from "lucide-react";
import { IMG } from "../assets/images.js";
import { ATOUTS, STEPS, UNIVERS, WASH_PLANS } from "../data/content.js";
import { CONFIG, mapsUrl } from "../config.js";
import { Button, Heading, Placeholder, Reveal, useSite } from "./ui.jsx";

/* ---------- Hero plein écran, image cinématique avec léger parallaxe ---------- */
export function Hero() {
  const { openBooking, go, ready } = useSite();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const scale = useTransform(scrollY, [0, 700], [1.06, 1.16]);
  const lines = ["Votre voiture", "entre de", "bonnes mains"];

  return (
    <section aria-labelledby="titre-hero" className="grain relative isolate flex min-h-[640px] items-end overflow-hidden pb-14 pt-32 md:min-h-[760px] md:pb-20">
      <motion.img src={IMG.hero} alt="" style={{ y, scale }} fetchpriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_50%]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 h-[420px] w-[620px] rounded-full bg-neon/10 blur-[120px]" />

      <div className="wrap">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm text-white backdrop-blur">
          <span className="h-2 w-2 animate-pulseDot rounded-full bg-neon" aria-hidden="true" />
          Ouvert 24h/24 · du mardi au dimanche
        </motion.p>

        <h1 id="titre-hero" className="display text-[13vw] text-white sm:text-7xl lg:text-[104px]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-1">
              <motion.span className={`block ${i === 2 ? "text-neon drop-shadow-[0_0_30px_rgba(250,204,21,.35)]" : ""}`}
                initial={{ y: "105%" }} animate={ready ? { y: 0 } : undefined} transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid gap-8">
            <p className="max-w-xl text-xl font-extralight leading-relaxed text-mist md:text-2xl">Garage, lavage, vente et location de voitures à Thiès.</p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => openBooking()} className="px-7"><CalendarCheck className="h-5 w-5" aria-hidden="true" />Prendre rendez-vous</Button>
              {/* Sur mobile, un seul bouton : la barre du bas donne déjà WhatsApp */}
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => go("accueil", "devis")}>
                Recevoir un devis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="glass hidden max-w-xs items-center gap-4 rounded-2xl p-5 lg:flex">
            <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-neon text-ink"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
            <p className="text-sm font-light leading-snug text-mist"><strong className="block text-base font-semibold text-white">Prix annoncé avant les travaux</strong>Pas de surprise.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Bandeau défilant (décoratif) ---------- */
export function Marquee() {
  const words = ["Garage", "Lavage", "Detailing", "Vente", "Location", "Pièces", "Assurance"];
  const row = [...words, ...words];
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-white/[0.07] bg-ink-2 py-6">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-10 motion-reduce:animate-none">
        {row.concat(row).map((w, i) => (
          <span key={i} className="display flex items-center gap-10 text-4xl text-transparent md:text-6xl" style={{ WebkitTextStroke: "1px rgba(229,231,235,.28)" }}>
            {w}<span className="h-2.5 w-2.5 rotate-45 bg-neon" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* ---------- Atouts ---------- */
export function Atouts() {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
      {ATOUTS.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} delay={i * 0.06} className="group bg-ink-3 p-7 transition-colors duration-500 hover:bg-ink-4">
          <Icon className="mb-8 h-8 w-8 text-neon transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.25} aria-hidden="true" />
          <h3 className="mb-2 text-lg font-semibold uppercase leading-tight tracking-wide text-white">{title}</h3>
          <p className="font-light text-mist/75">{text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Univers : grandes tuiles photo ---------- */
export function Univers() {
  const { go } = useSite();
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
      {UNIVERS.map(({ page, tab, icon: Icon, title, text, img }, i) => (
        <Reveal as="li" key={title} delay={(i % 3) * 0.07}>
          <a href={`#${page}`} onClick={(e) => { e.preventDefault(); go(page, tab); }}
            className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.08] p-4 md:aspect-[4/3] md:p-7">
            <img src={img} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
            <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/10 transition-opacity duration-500 group-hover:opacity-80" />
            <span aria-hidden="true" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-ink/40 text-white backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-neon group-hover:bg-neon group-hover:text-ink md:right-6 md:top-6 md:h-12 md:w-12">
              <ArrowUpRight className="h-5 w-5" />
            </span>
            <Icon className="mb-3 h-6 w-6 text-neon md:h-7 md:w-7" strokeWidth={1.5} aria-hidden="true" />
            <span className="display text-xl text-white md:text-3xl">{title}</span>
            <span className="mt-1 hidden font-light text-mist/80 md:block">{text}</span>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}

/* ---------- Carte de service (glassmorphism) ---------- */
export function ServiceCard({ s, i = 0 }) {
  const { openBooking } = useSite();
  const Icon = s.icon;
  return (
    <Reveal as="li" delay={(i % 3) * 0.08} className="h-full">
      <article className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:border-neon/40 hover:shadow-glow-soft">
        <div className="relative h-48 overflow-hidden md:h-56">
          <img src={s.img} alt={s.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-3 via-ink-3/20 to-transparent" />
          <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-ink/60 text-neon backdrop-blur">
            <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6 pt-2 md:p-7 md:pt-3">
          <h3 className="text-xl font-bold uppercase tracking-wide text-white md:text-2xl">{s.title}</h3>
          <p className="font-light leading-relaxed text-mist/75">{s.text}</p>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
            <p className="text-sm font-light text-mist/70">{s.price.startsWith("À partir") ? <>À partir de <strong className="block text-lg font-bold text-white">[prix] F</strong></> : <strong className="text-lg font-bold text-white">{s.price}</strong>}</p>
            <button type="button" onClick={() => openBooking([s.id])}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-medium text-white transition-all duration-300 hover:border-neon hover:bg-neon hover:text-ink">
              Réserver <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- Formules lavage : la carte centrale est mise en avant ---------- */
export function WashPlans() {
  const { openBooking } = useSite();
  return (
    <ul className="grid items-center gap-6 lg:grid-cols-3 lg:gap-5 lg:py-6">
      {WASH_PLANS.map((p, i) => (
        <Reveal as="li" key={p.id} delay={i * 0.08} className={p.featured ? "relative z-10 lg:scale-[1.08]" : "lg:scale-[0.97]"}>
          <article className={`relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 ${p.featured ? "border border-neon/45 bg-gradient-to-b from-ink-4 to-ink-3 shadow-[0_0_0_1px_rgba(250,204,21,.12),0_30px_80px_-20px_rgba(0,0,0,.9),0_0_70px_-18px_rgba(250,204,21,.45)]" : "glass hover:border-white/25"}`}>
            {p.featured && (
              <span className="absolute right-5 top-5 z-10 rounded-full bg-neon px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">Populaire</span>
            )}
            <div className="relative h-40 overflow-hidden">
              <img src={p.img} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-3 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col gap-6 p-7 md:p-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-mist/60">{p.tier}</p>
                <h3 className="display text-3xl text-white">{p.title}</h3>
              </div>
              <p className="flex items-baseline gap-2 text-mist/70">
                <span className="text-sm font-light">À partir de</span>
                <span className={`text-4xl font-black tracking-tight ${p.featured ? "text-neon" : "text-white"}`}>{p.price}</span>
                <span className="text-lg font-semibold text-white">F</span>
              </p>
              <ul className="grid gap-3 border-t border-white/[0.08] pt-6">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 font-light text-mist/90"><Check className="mt-0.5 h-5 w-5 flex-none text-neon" aria-hidden="true" />{it}</li>
                ))}
              </ul>
              <Button variant={p.featured ? "primary" : "ghost"} className="mt-2 w-full" onClick={() => openBooking([p.id])}>Réserver ce lavage</Button>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

/* ---------- Avant / après : glisser la barre (souris, doigt ou clavier) ---------- */
export function BeforeAfter({ img, label, title, alt }) {
  const [pos, setPos] = useState(50);
  const box = useRef(null);
  const dragging = useRef(false);

  const fromEvent = useCallback((clientX) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onPointerDown = (e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); fromEvent(e.clientX); };
  const onPointerMove = (e) => { if (dragging.current) fromEvent(e.clientX); };
  const onPointerUp = () => { dragging.current = false; };
  const onKey = (e) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") { e.preventDefault(); setPos((p) => Math.max(0, p - step)); }
    if (e.key === "ArrowRight") { e.preventDefault(); setPos((p) => Math.min(100, p + step)); }
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <figure className="grid gap-4">
      <div ref={box} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl border border-white/10">
        <img src={img} alt={`Après : ${alt}`} draggable="false" className="absolute inset-0 h-full w-full object-cover" />
        {/* « Avant » simulé : même photo ternie, à remplacer par une vraie photo avant */}
        <img src={img} alt={`Avant : ${alt}`} draggable="false" className="absolute inset-0 h-full w-full object-cover [filter:grayscale(.8)_sepia(.45)_brightness(.5)_contrast(.85)_blur(.6px)]"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">Avant</span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-neon px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">Après</span>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <span className="absolute inset-y-0 -ml-px w-0.5 bg-neon shadow-[0_0_20px_rgba(250,204,21,.9)]" />
        </div>
        <button type="button" role="slider" aria-label={`Comparer avant et après : ${label}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} aria-valuetext={`${Math.round(pos)} % de la photo avant`}
          onKeyDown={onKey}
          className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-neon text-ink shadow-[0_0_0_6px_rgba(250,204,21,.18),0_10px_30px_rgba(0,0,0,.5)] transition-transform hover:scale-110"
          style={{ left: `${pos}%` }}>
          <MoveHorizontal className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-lg font-bold uppercase tracking-wide text-white">{title}</span>
        <span className="text-xs font-light text-mist/60">[Photos à remplacer par un vrai avant / après]</span>
      </figcaption>
    </figure>
  );
}

/* ---------- Étapes ---------- */
export function Steps() {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {STEPS.map((s, i) => (
        <Reveal as="li" key={s} delay={i * 0.08} className="glass relative rounded-3xl p-7">
          <span className="display mb-10 block text-6xl text-transparent" style={{ WebkitTextStroke: "1px rgba(250,204,21,.8)" }} aria-hidden="true">0{i + 1}</span>
          <p className="text-lg font-light leading-snug text-white"><span className="sr-only">Étape {i + 1} : </span>{s}</p>
          {i < STEPS.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 rounded-full border border-white/10 bg-ink p-1.5 text-neon md:block" aria-hidden="true" />}
        </Reveal>
      ))}
    </ol>
  );
}

/* ---------- En-tête des pages intérieures ---------- */
export function PageHero({ kicker, title, accent, sub, img, children }) {
  return (
    <section className="grain relative isolate overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <img src={img} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="wrap">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-neon">
          <span className="h-px w-10 bg-neon" aria-hidden="true" />{kicker}
        </motion.p>
        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display max-w-4xl text-5xl text-white sm:text-6xl lg:text-8xl">
          {title} <span className="text-neon">{accent}</span>
        </motion.h1>
        {sub && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-6 max-w-2xl text-xl font-extralight leading-relaxed text-mist">{sub}</motion.p>}
        {children}
      </div>
    </section>
  );
}

/* ---------- Avis + adresse ---------- */
/* Exemples pour la maquette : à remplacer par de vrais avis Google avant la mise en ligne. */
const REVIEWS = [
  { name: "Moussa D.", car: "Toyota Corolla", text: "Diagnostic clair et prix annoncé avant les travaux. Aucune surprise sur la facture." },
  { name: "Awa N.", car: "Hyundai Tucson", text: "Vidange et lavage complet au même endroit. Accueil sérieux, voiture rendue impeccable." },
  { name: "Ibrahima S.", car: "Peugeot 308", text: "J'ai reçu l'estimation sur WhatsApp avant de me déplacer. Simple et rapide." },
];

const satin = "relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-white/[0.075] via-white/[0.025] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_30px_60px_-30px_rgba(0,0,0,.9)] backdrop-blur-xl";

export function ReviewsAndPlace() {
  return (
    <div className="grid gap-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-neon"><span className="h-px w-10 bg-neon" aria-hidden="true" />Ils nous font confiance</p>
          <h2 className="display text-4xl text-white sm:text-5xl lg:text-6xl">Avis <span className="text-neon">clients</span></h2>
        </div>
        <div className={`${satin} flex items-center gap-4 px-6 py-4`}>
          <p className="text-4xl font-black text-white">[Note]<span className="text-lg font-light text-mist/60">/5</span></p>
          <div><div className="flex gap-1 text-neon" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div><p className="mt-1 text-sm font-light text-mist/70">[Nombre] avis Google</p></div>
        </div>
      </Reveal>

      <ul className="grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Reveal as="li" key={r.name} delay={i * 0.08} className="h-full">
            <figure className={`${satin} group flex h-full flex-col gap-6 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20`}>
              <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon/[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-1 text-neon" aria-label="5 étoiles sur 5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" aria-hidden="true" />)}</div>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-light text-mist/60">Exemple</span>
              </div>
              <blockquote className="flex-1 text-lg font-light leading-relaxed text-white">« {r.text} »</blockquote>
              <figcaption className="flex items-center gap-3 border-t border-white/[0.08] pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-neon to-amber-500 text-sm font-bold text-ink" aria-hidden="true">{r.name[0]}</span>
                <span><span className="block font-semibold text-white">{r.name}</span><span className="text-sm font-light text-mist/60">{r.car}</span></span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
      <p className="text-xs font-light text-mist/50">[Avis d'exemple à remplacer par de vrais avis Google]</p>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className={`${satin} flex flex-col justify-center gap-5 p-7 md:p-10`}>
          <h3 className="display text-2xl text-white md:text-3xl">Votre avis compte</h3>
          <p className="font-light text-mist/80">Vous êtes passé chez nous ? Dites-nous comment ça s'est passé.</p>
          <Button as="a" href={CONFIG.googleAvis} variant="ghost" className="self-start"><Star className="h-4 w-4" aria-hidden="true" />Laisser un avis Google</Button>
        </Reveal>
        <Reveal delay={0.1} className="relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[28px] border border-white/10 p-7 md:p-10">
          <img src={IMG.night} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/20" />
          <MapPin className="mb-5 h-9 w-9 text-neon" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="display mb-4 text-3xl text-white">Nous trouver</h2>
          <p className="font-light text-mist">{CONFIG.adresse}</p>
          <p className="mt-2 flex items-center gap-2 font-light text-mist"><Clock className="h-4 w-4 text-neon" aria-hidden="true" />Du mardi au dimanche · Fermé le lundi</p>
          <a href={mapsUrl} target="_blank" rel="noopener" className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start font-semibold text-white underline decoration-neon decoration-2 underline-offset-8 hover:text-neon">
            Voir sur Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </div>
  );
}

export function WhatsAppCta({ msg, children, variant = "primary", className = "" }) {
  return (
    <Button as="a" href={`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener" variant={variant} className={className}>
      <MessageCircle className="h-5 w-5" aria-hidden="true" />{children}
    </Button>
  );
}

export { Heading, Placeholder, Reveal };
