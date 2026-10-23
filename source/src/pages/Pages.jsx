import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, Gauge, Package, CircleDot, Droplet, ShieldCheck, FileText, Video, Plus, MapPin, Clock, Phone, Map, MessageCircle, KeyRound, ShoppingBag } from "lucide-react";
import { IMG } from "../assets/images.js";
import { BUDGETS, CARS_RENT, CARS_SALE, FAQ, GALLERY, SERVICES } from "../data/content.js";
import { CONFIG, telUrl, mapsUrl } from "../config.js";
import { QuoteForm } from "../components/Forms.jsx";
import { Atouts, BeforeAfter, Hero, Marquee, PageHero, ReviewsAndPlace, ServiceCard, Steps, Univers, WashPlans, WhatsAppCta } from "../components/Sections.jsx";
import { Button, Heading, Placeholder, Reveal, useSite } from "../components/ui.jsx";

const Section = ({ children, className = "", id, ...rest }) => (
  <section id={id} className={`relative py-24 md:py-32 ${className}`} {...rest}><div className="wrap">{children}</div></section>
);

/* ============================== ACCUEIL ============================== */
export function Home() {
  const { go } = useSite();
  return (
    <>
      <Hero />
      <Marquee />

      <Section aria-labelledby="t-univers">
        <Heading id="t-univers" kicker="Tout au même endroit" title="Un seul garage," accent="tout pour votre voiture" />
        <Univers />
      </Section>

      <Section className="bg-gradient-to-b from-ink via-ink-3 to-ink" aria-labelledby="t-services">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="t-services" kicker="Garage" title="Nos" accent="services" sub="Le prix est annoncé avant les travaux." />
          <Reveal className="mb-12 md:mb-16">
            <Button variant="ghost" onClick={() => go("garage")}>Tous les services <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
          </Reveal>
        </div>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 3).map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
        </ul>
        <div className="mt-16"><Atouts /></div>
      </Section>

      <Section aria-labelledby="t-lavage">
        <Heading id="t-lavage" kicker="Lavage et detailing" title="Nos" accent="formules" align="center" />
        <WashPlans />
      </Section>

      {/* Avant / après : detailing + réparation */}
      <Section aria-labelledby="t-ba">
        <Heading id="t-ba" kicker="Résultats" title="Avant /" accent="après" sub="Glissez la barre pour comparer." />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          <Reveal><BeforeAfter img={IMG.wet} label="detailing" title="Detailing" alt="carrosserie mouillée et brillante" /></Reveal>
          <Reveal delay={0.1}><BeforeAfter img={IMG.engine} label="réparation" title="Réparation" alt="moteur remis en état" /></Reveal>
        </div>
      </Section>

      {/* Bande photo detailing + carte de devis flottante qui la chevauche */}
      <section id="devis" aria-labelledby="t-devis" className="relative scroll-mt-24 pb-24 md:pb-32">
        <div className="relative h-[260px] overflow-hidden md:h-[440px]" aria-hidden="true">
          <img src={IMG.detail} alt="" loading="lazy" className="h-full w-full object-cover object-[50%_40%]" />
          <span className="absolute inset-0 bg-gradient-to-b from-ink via-ink/20 to-ink" />
          <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,.7))]" />
        </div>
        <div className="wrap relative z-10 -mt-24 md:-mt-48">
          <Reveal className="relative grid overflow-hidden rounded-[28px] border border-white/10 bg-ink-3/90 shadow-card ring-1 ring-black/40 backdrop-blur-xl lg:grid-cols-[1fr_1.25fr]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
            <div className="relative isolate flex flex-col justify-end gap-6 overflow-hidden p-7 md:p-12">
              <img src={IMG.night} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-3 via-ink-3/85 to-ink-3/40" />
              <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-neon"><span className="h-px w-10 bg-neon" aria-hidden="true" />Devis gratuit</p>
              <h2 id="t-devis" className="display text-[34px] text-white sm:text-4xl md:text-5xl">Une panne ? <span className="font-light text-mist/90" style={{ fontWeight: 300 }}>Recevez une</span> <span className="text-neon">estimation</span> avant de venir</h2>
              <p className="text-lg font-extralight text-mist">Vous connaissez le prix avant de vous déplacer.</p>
            </div>
            <div className="border-t border-white/[0.08] p-5 sm:p-7 md:p-12 lg:border-l lg:border-t-0">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0 md:pt-0" aria-label="Avis et adresse">
        <ReviewsAndPlace />
      </Section>
    </>
  );
}

/* ============================== GARAGE ============================== */
export function Garage() {
  return (
    <>
      <PageHero kicker="Garage" title="Nos services" accent="garage" img={IMG.meca}
        sub="Diagnostic électronique, mécanique, électricité auto, vidange et entretien, freins, suspension, pneus." />
      <Section className="pt-12 md:pt-16" aria-label="Services et prix">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
          <Reveal as="li" delay={0.1} className="h-full">
            <div className="relative flex h-full min-h-[320px] flex-col justify-end gap-5 overflow-hidden rounded-3xl bg-neon p-8 text-ink">
              <Gauge className="absolute -right-8 -top-8 h-48 w-48 opacity-10" strokeWidth={1} aria-hidden="true" />
              <h3 className="display text-4xl">Une panne ?</h3>
              <p className="text-lg font-medium">Recevez une estimation avant de venir.</p>
              <GoQuote />
            </div>
          </Reveal>
        </ul>
      </Section>
      <Section className="bg-gradient-to-b from-ink via-ink-3 to-ink" aria-labelledby="t-etapes">
        <Heading id="t-etapes" kicker="Simple et clair" title="Comment" accent="ça marche" sub="On ne bâcle rien : une technologie de dernière génération pour votre sécurité." />
        <Steps />
        <div className="mt-16"><Atouts /></div>
      </Section>
    </>
  );
}
function GoQuote() {
  const { go } = useSite();
  return <Button variant="dark" className="self-start" onClick={() => go("accueil", "devis")}>Demander une estimation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>;
}

/* ============================== LAVAGE ============================== */
export function Lavage() {
  return (
    <>
      <PageHero kicker="Lavage et detailing" title="Une voiture qui" accent="brille" img={IMG.wet}
        sub="Trois formules, du lavage rapide à la remise à neuf." />
      <Section className="pt-12 md:pt-20" aria-label="Formules">
        <WashPlans />
      </Section>
      <Section className="bg-gradient-to-b from-ink via-ink-3 to-ink" aria-labelledby="t-ba2">
        <Heading id="t-ba2" kicker="Résultats" title="Avant /" accent="après" sub="Glissez la barre pour comparer." />
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal><BeforeAfter img={IMG.wet} label="detailing" title="Detailing" alt="carrosserie brillante" /></Reveal>
          <Reveal delay={0.1}><BeforeAfter img={IMG.engine} label="réparation" title="Réparation" alt="moteur remis en état" /></Reveal>
        </div>
      </Section>
    </>
  );
}

/* ============================== VOITURES ============================== */
export function Voitures({ tab: initialTab }) {
  const { openCar } = useSite();
  const [tab, setTab] = useState(initialTab === "location" ? "location" : "vente");
  const [marque, setMarque] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");

  const marques = useMemo(() => [...new Set(CARS_SALE.map((c) => c.marque))].sort(), []);
  const sale = CARS_SALE.filter((c) => {
    if (marque && c.marque !== marque) return false;
    if (!budget || c.prix == null) return true;
    const [min, max] = budget.split("-").map((n) => (n ? +n : null));
    return c.prix >= (min ?? 0) && c.prix < (max ?? Infinity);
  });
  const rent = CARS_RENT.filter((c) => !type || c.type === type);

  const tabs = [{ id: "vente", label: "Acheter", icon: ShoppingBag }, { id: "location", label: "Louer", icon: KeyRound }];

  return (
    <>
      <PageHero kicker="Vente et location" title="Votre prochaine" accent="voiture" img={IMG.porsche}
        sub="Photos, prix et papiers en ligne. Choisissez, puis réservez ou demandez un essai." />

      <Section className="pt-8 md:pt-12" aria-label="Voitures">
        {/* Onglets + filtres, dans une barre de recherche flottante */}
        <div className="glass sticky top-[84px] z-30 mb-10 grid gap-4 rounded-3xl p-3 md:grid-cols-[auto_1fr] md:items-center md:p-4">
          <div role="tablist" aria-label="Acheter ou louer" className="relative grid grid-cols-2 rounded-2xl bg-ink/70 p-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} role="tab" type="button" aria-selected={tab === id} aria-controls={`panel-${id}`} id={`tab-${id}`} onClick={() => setTab(id)}
                className={`relative z-10 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 font-semibold transition-colors ${tab === id ? "text-ink" : "text-mist/80 hover:text-white"}`}>
                {tab === id && <motion.span layoutId="tab-pill" className="absolute inset-0 -z-10 rounded-xl bg-neon" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <Icon className="h-4 w-4" aria-hidden="true" />{label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 md:flex md:justify-end">
            {tab === "vente" ? (
              <>
                <label className="sr-only" htmlFor="flt-marque">Marque</label>
                <select id="flt-marque" className="field-input md:w-56" value={marque} onChange={(e) => setMarque(e.target.value)}>
                  <option value="">Toutes les marques</option>{marques.map((m) => <option key={m}>{m}</option>)}
                </select>
                <label className="sr-only" htmlFor="flt-budget">Budget</label>
                <select id="flt-budget" className="field-input md:w-56" value={budget} onChange={(e) => setBudget(e.target.value)}>
                  {BUDGETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </>
            ) : (
              <>
                <label className="sr-only" htmlFor="flt-type">Type de véhicule</label>
                <select id="flt-type" className="field-input col-span-2 md:w-64" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Tous les types</option>{CARS_RENT.map((c) => <option key={c.type}>{c.type}</option>)}
                </select>
              </>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <p className="mb-6 text-sm font-light text-mist/60" aria-live="polite">{tab === "vente" ? sale.length : rent.length} {(tab === "vente" ? sale.length : rent.length) > 1 ? "voitures" : "voiture"}</p>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tab === "vente"
                ? sale.map((c, i) => <CarCard key={c.id} car={c} i={i} onAction={() => openCar(c, "achat")} />)
                : rent.map((c, i) => <CarCard key={c.id} car={c} i={i} rent onAction={() => openCar(c, "location")} />)}
            </ul>
            {tab === "vente" && !sale.length && (
              <div className="glass grid justify-items-start gap-4 rounded-3xl p-8">
                <p className="text-lg text-white">Aucune voiture ne correspond pour le moment.</p>
                <WhatsAppCta msg="Bonjour Touba Automobile, je cherche une voiture. Mon budget : ">Dites-nous ce que vous cherchez</WhatsAppCta>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <Reveal className="relative mt-20 grid items-center gap-8 overflow-hidden rounded-[28px] border border-neon/40 bg-gradient-to-br from-neon/[0.14] via-ink-3 to-ink-3 p-8 md:grid-cols-[auto_1fr_auto] md:p-12">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-neon text-ink"><Video className="h-7 w-7" aria-hidden="true" /></span>
          <div>
            <h2 className="display text-3xl text-white md:text-4xl">Vous êtes à l'étranger ?</h2>
            <p className="mt-3 max-w-2xl text-lg font-light text-mist">Choisissez votre voiture à distance : photos, prix et papiers sont en ligne, et on vous envoie une vidéo sur WhatsApp.</p>
          </div>
          <WhatsAppCta msg="Bonjour Touba Automobile, je suis à l'étranger et je voudrais une vidéo de la voiture : ">Demander une vidéo</WhatsAppCta>
        </Reveal>
      </Section>
    </>
  );
}

function CarCard({ car, i, rent, onAction }) {
  return (
    <Reveal as="li" delay={(i % 3) * 0.08} className="h-full">
      <article className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:border-neon/40 hover:shadow-glow-soft">
        <div className="relative aspect-[3/2] overflow-hidden">
          <img src={car.img} alt={car.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-3 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur">{rent ? car.type : "À vendre"}</span>
        </div>
        <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wide text-white">{car.name}</h3>
            <p className="mt-2 text-3xl font-black tracking-tight text-neon">{rent ? <>{car.price} <span className="text-base font-light text-mist/70">/ jour</span></> : car.price}</p>
          </div>
          <dl className={`grid gap-2 text-sm ${rent ? "" : "grid-cols-3"}`}>
            {(rent
              ? [["Caution", car.deposit], ["Durée minimum", car.minDays], ["Chauffeur", car.driver]]
              : [["Année", car.year], ["Km", car.km], ["Boîte", car.gearbox]]
            ).map(([k, v]) => (
              <div key={k} className={rent ? "flex justify-between gap-3 border-b border-white/[0.07] py-2" : "min-w-0 rounded-xl bg-white/[0.04] p-3"}>
                <dt className="text-xs uppercase tracking-widest text-mist/55">{k}</dt>
                <dd className="break-words font-medium text-white">{v}</dd>
              </div>
            ))}
          </dl>
          {!rent && <p className="flex items-center gap-2 text-sm font-light text-mist/80"><FileText className="h-4 w-4 text-neon" aria-hidden="true" />Papiers : {car.papers}</p>}
          <Button className="mt-auto w-full" variant={rent ? "ghost" : "primary"} onClick={onAction}>
            {rent ? <><Calendar className="h-4 w-4" aria-hidden="true" />Louer cette voiture</> : <><ShoppingBag className="h-4 w-4" aria-hidden="true" />Acheter · demander un essai</>}
          </Button>
        </div>
      </article>
    </Reveal>
  );
}

/* ============================== PIÈCES & ASSURANCE ============================== */
export function Pieces() {
  const items = [[Package, "Pièces détachées"], [CircleDot, "Pneus"], [Droplet, "Huiles Shell Helix"]];
  return (
    <>
      <PageHero kicker="Pièces et assurance" title="Pièces, pneus" accent="& assurance" img={IMG.tools}
        sub="Pièces détachées, pneus, huiles Shell Helix et assurance de votre véhicule, sur place." />
      <Section className="pt-12 md:pt-16" aria-labelledby="t-pieces">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-3xl border border-white/10">
            <img src={IMG.tyres} alt="Pile de pneus neufs" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
          <div>
            <Heading id="t-pieces" kicker="Comptoir" title="Pièces, pneus" accent="et huiles" />
            <ul className="mb-10 grid">
              {items.map(([Icon, label], i) => (
                <Reveal as="li" key={label} delay={i * 0.06} className="flex min-h-[72px] items-center gap-5 border-b border-white/[0.08] text-xl font-semibold uppercase tracking-wide text-white">
                  <Icon className="h-7 w-7 text-neon" strokeWidth={1.5} aria-hidden="true" />{label}
                </Reveal>
              ))}
            </ul>
            <WhatsAppCta msg="Bonjour Touba Automobile, je voudrais le prix de : ">Demander un prix</WhatsAppCta>
          </div>
        </div>
      </Section>
      <Section className="pt-0 md:pt-0" aria-labelledby="t-assurance">
        <Reveal className="relative isolate overflow-hidden rounded-[28px] border border-white/10 p-8 md:p-16">
          <img src={IMG.assur} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />
          <ShieldCheck className="mb-8 h-12 w-12 text-neon" strokeWidth={1.25} aria-hidden="true" />
          <h2 id="t-assurance" className="display max-w-2xl text-4xl text-white md:text-6xl">Assurez votre véhicule <span className="text-neon">sur place</span></h2>
          <WhatsAppCta className="mt-10" msg="Bonjour Touba Automobile, je voudrais un devis d'assurance pour mon véhicule : ">Demander un devis</WhatsAppCta>
        </Reveal>
      </Section>
    </>
  );
}

/* ============================== CONTACT ============================== */
export function Contact() {
  const { openBooking } = useSite();
  const [map, setMap] = useState(false);
  return (
    <>
      <PageHero kicker="Contact" title="Le vrai Touba Automobile," accent="c'est ici" img={IMG.night} sub={CONFIG.adresse + ". Ouvert du mardi au dimanche."}>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={() => openBooking()}><Calendar className="h-5 w-5" aria-hidden="true" />Prendre rendez-vous</Button>
          <WhatsAppCta variant="ghost" msg="Bonjour Touba Automobile, ">WhatsApp</WhatsAppCta>
        </div>
      </PageHero>

      <Section className="pt-12 md:pt-16" aria-labelledby="t-adresse">
        <h2 id="t-adresse" className="sr-only">Adresse et horaires</h2>
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="relative min-h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-ink-3 md:min-h-[460px]">
            {map ? (
              <iframe title="Carte : Touba Automobile, Route de Sindia, Thiès" className="absolute inset-0 h-full w-full border-0 [filter:invert(.9)_hue-rotate(180deg)_contrast(.9)]"
                src={`https://www.google.com/maps?q=${encodeURIComponent(CONFIG.maps)}&output=embed`} />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(250,204,21,.08),transparent_60%),repeating-linear-gradient(0deg,transparent_0_47px,rgba(255,255,255,.04)_47px_48px),repeating-linear-gradient(90deg,transparent_0_47px,rgba(255,255,255,.04)_47px_48px)] p-6 text-center">
                <div className="grid justify-items-center gap-5">
                  <span className="grid h-16 w-16 animate-pulseDot place-items-center rounded-full bg-neon text-ink"><MapPin className="h-7 w-7" aria-hidden="true" /></span>
                  <Button variant="ghost" onClick={() => setMap(true)}><Map className="h-4 w-4" aria-hidden="true" />Afficher la carte</Button>
                  <p className="max-w-xs text-sm font-light text-mist/60">La carte Google se charge seulement si vous la demandez.</p>
                </div>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1} className="glass grid content-start gap-7 rounded-3xl p-7 md:p-10">
            {[[MapPin, "Adresse", CONFIG.adresse], [Calendar, "Jours d'ouverture", "Du mardi au dimanche · Fermé le lundi"], [Clock, "Horaires", "[à confirmer]"], [Phone, "WhatsApp et appel", CONFIG.affichage]].map(([Icon, k, v]) => (
              <div key={k} className="flex gap-4">
                <Icon className="mt-1 h-5 w-5 flex-none text-neon" aria-hidden="true" />
                <div><p className="text-xs uppercase tracking-[0.25em] text-mist/55">{k}</p><p className="mt-1 text-lg font-light text-white">{v}</p></div>
              </div>
            ))}
            <div className="grid gap-3 sm:grid-cols-2">
              <Button as="a" href={telUrl} variant="ghost"><Phone className="h-4 w-4" aria-hidden="true" />Appeler</Button>
              <Button as="a" href={mapsUrl} target="_blank" rel="noopener" variant="ghost"><Map className="h-4 w-4" aria-hidden="true" />Google Maps</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0" aria-labelledby="t-atelier">
        <Heading id="t-atelier" kicker="Galerie" title="Dans notre" accent="atelier" />
        <div className="grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={i * 0.05} className={`group relative overflow-hidden rounded-2xl ${g.big ? "col-span-2 row-span-2" : ""}`}>
              <img src={g.img} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
              <Placeholder />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0 md:pt-0" aria-labelledby="t-faq">
        <Heading id="t-faq" kicker="FAQ" title="Questions" accent="fréquentes" />
        <Faq />
      </Section>
    </>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid max-w-4xl gap-3">
      {FAQ.map(([q, a], i) => {
        const on = open === i;
        return (
          <div key={q} className={`rounded-2xl border transition-colors duration-300 ${on ? "border-neon/40 bg-white/[0.04]" : "border-white/[0.08]"}`}>
            <h3>
              <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? -1 : i)}
                className="flex min-h-[64px] w-full items-center justify-between gap-6 px-6 text-left text-lg font-medium text-white">
                {q}
                <Plus className={`h-5 w-5 flex-none text-neon transition-transform duration-300 ${on ? "rotate-45" : ""}`} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className="px-6 pb-6 font-light leading-relaxed text-mist/85">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
