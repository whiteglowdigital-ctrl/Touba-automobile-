import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { PAGES } from "./data/content.js";
import { SiteContext } from "./components/ui.jsx";
import { Header, Footer, MobileBar } from "./components/Layout.jsx";
import { BookingForm, CarForm, Modal } from "./components/Forms.jsx";
import { Home, Garage, Lavage, Voitures, Pieces, Contact } from "./pages/Pages.jsx";
import Splash, { useIntro } from "./components/Splash.jsx";

const VIEWS = { accueil: Home, garage: Garage, lavage: Lavage, voitures: Voitures, pieces: Pieces, contact: Contact };
const readHash = () => {
  try { const h = window.location.hash.slice(1); return PAGES.some((p) => p.id === h) ? h : "accueil"; } catch { return "accueil"; }
};

export default function App() {
  /* Navigation instantanée : une seule page React, pas de rechargement → un clic suffit */
  const intro = useIntro();                      // écran logo au premier chargement
  const [ready, setReady] = useState(!intro);
  const reveal = useCallback(() => setReady(true), []);
  const [page, setPage] = useState(readHash);
  const [sub, setSub] = useState(null);          // ancre (« devis ») ou onglet (« location »)
  const [booking, setBooking] = useState(null);  // null = fermé, sinon liste des prestations présélectionnées
  const [car, setCar] = useState(null);          // { car, mode: "achat" | "location" }

  const go = useCallback((id, anchor = null) => {
    setPage(id);
    setSub(anchor);
    try { window.history.replaceState(null, "", `#${id}`); } catch { /* aperçu : on ignore */ }
  }, []);

  /* Après chaque changement de page : haut de page, ou l'ancre demandée */
  useEffect(() => {
    const t = setTimeout(() => {
      const el = sub && document.getElementById(sub);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo(0, 0);
    }, sub ? 380 : 0);
    return () => clearTimeout(t);
  }, [page, sub]);

  useEffect(() => {
    const onHash = () => { const h = readHash(); setPage(h); setSub(null); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const p = PAGES.find((x) => x.id === page);
    document.title = page === "accueil" ? "Touba Automobile Thiès" : `${p.label} – Touba Automobile Thiès`;
  }, [page]);

  const ctx = useMemo(() => ({
    page, go, ready,
    openBooking: (ids = []) => setBooking(ids),
    openCar: (c, mode) => setCar({ car: c, mode }),
  }), [page, go, ready]);

  const View = VIEWS[page];
  const closeBooking = useCallback(() => setBooking(null), []);
  const closeCar = useCallback(() => setCar(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <SiteContext.Provider value={ctx}>
        <a href="#contenu" className="sr-only z-[70] rounded-lg bg-neon px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Aller au contenu</a>
        {intro && <Splash onReveal={reveal} />}
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main id="contenu" key={page}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
            className="min-h-screen pb-[84px] md:pb-0">
            <View tab={sub} />
          </motion.main>
        </AnimatePresence>
        <Footer />
        <MobileBar />

        <Modal open={booking !== null} onClose={closeBooking} title="Prendre rendez-vous" labelId="titre-rdv">
          {booking !== null && <BookingForm key={booking.join(",") || "vide"} preselect={booking} />}
        </Modal>
        <Modal open={!!car} onClose={closeCar} title={car?.mode === "location" ? "Louer cette voiture" : "Acheter cette voiture"} labelId="titre-voiture">
          {car && <CarForm key={car.car.id + car.mode} car={car.car} mode={car.mode} />}
        </Modal>
      </SiteContext.Provider>
    </MotionConfig>
  );
}
