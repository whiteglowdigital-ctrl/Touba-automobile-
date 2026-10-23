import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Plus, MessageCircle, Camera, CalendarDays } from "lucide-react";
import { BOOKABLE } from "../data/content.js";
import { openWhatsApp, todayISO, isMonday, frDate } from "../config.js";
import { Button, Field, Privacy, WaResult } from "./ui.jsx";

/* ---------- Fenêtre (panneau du bas sur mobile, carte centrée sur ordinateur) ---------- */
export function Modal({ open, onClose, title, children, labelId }) {
  const panel = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => panel.current?.querySelector("input, select, textarea, button")?.focus(), 80);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; lastFocus.current?.focus?.(); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative max-h-[92vh] w-full overflow-y-auto overflow-x-hidden rounded-t-3xl border border-white/10 bg-ink-3 p-6 shadow-card md:max-w-2xl md:rounded-3xl md:p-10"
            style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))" }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-neon/10 blur-3xl" />
            <div className="relative mb-8 flex items-start justify-between gap-6">
              <h2 id={labelId} className="display text-[26px] text-white sm:text-3xl md:text-4xl">{title}</h2>
              <button type="button" onClick={onClose} aria-label="Fermer" className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-white/15 text-white transition hover:border-neon hover:text-neon">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Validation simple ---------- */
function useForm(initial, rules) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => {
    const v = e?.target ? e.target.value : e;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };
  const validate = () => {
    const errs = {};
    for (const [k, fn] of Object.entries(rules)) { const m = fn(values[k], values); if (m) errs[k] = m; }
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) document.getElementById(`f-${first}`)?.focus();
    return !first;
  };
  const a11y = (k, hint) => ({
    id: `f-${k}`,
    "aria-invalid": errors[k] ? "true" : undefined,
    "aria-describedby": errors[k] ? `f-${k}-err` : hint ? `f-${k}-hint` : undefined,
  });
  return { values, set, errors, validate, a11y, setValues };
}
const req = (msg = "Ce champ est nécessaire.") => (v) => (!v || !String(v).trim() ? msg : null);
const dayRule = (required) => (v) => {
  if (!v) return required ? "Choisissez un jour." : null;
  if (v < todayISO()) return "Choisissez une date à venir.";
  if (isMonday(v)) return "Nous sommes fermés le lundi. Choisissez un autre jour.";
  return null;
};

function Identity({ f }) {
  return (
    <>
      <Field label="Nom" id="f-nom" error={f.errors.nom}>
        <input className="field-input" type="text" autoComplete="name" value={f.values.nom} onChange={f.set("nom")} {...f.a11y("nom")} />
      </Field>
      <Field label="Téléphone WhatsApp" id="f-tel" error={f.errors.tel}>
        <input className="field-input" type="tel" inputMode="tel" autoComplete="tel" placeholder="77 000 00 00" value={f.values.tel} onChange={f.set("tel")} {...f.a11y("tel")} />
      </Field>
    </>
  );
}

/* ---------- Rendez-vous : plusieurs prestations, présélection depuis « Réserver » ---------- */
export function BookingForm({ preselect = [], onDone }) {
  const f = useForm(
    { services: preselect, nom: "", tel: "", auto: "", jour: "", note: "" },
    { services: (v) => (!v.length ? "Choisissez au moins une prestation." : null), nom: req(), tel: req(), auto: req(), jour: dayRule(true) }
  );
  const [url, setUrl] = useState(null);
  const toggle = (id) => f.set("services")(f.values.services.includes(id) ? f.values.services.filter((s) => s !== id) : [...f.values.services, id]);
  const groups = ["Garage", "Lavage"];

  const submit = (e) => {
    e.preventDefault();
    if (!f.validate()) return;
    const v = f.values;
    const names = BOOKABLE.filter((b) => v.services.includes(b.id)).map((b) => `• ${b.label}`);
    setUrl(openWhatsApp([
      "Bonjour Touba Automobile, je voudrais prendre rendez-vous.", "",
      "Prestations :", ...names, "",
      `Nom : ${v.nom}`, `Téléphone : ${v.tel}`, `Voiture : ${v.auto}`, `Jour souhaité : ${frDate(v.jour)}`,
      v.note ? `Précision : ${v.note}` : null,
    ]));
    onDone?.();
  };

  return (
    <form noValidate onSubmit={submit} className="grid gap-6">
      <fieldset className="grid gap-4" aria-describedby={f.errors.services ? "f-services-err" : "f-services-hint"}>
        <legend className="mb-1 text-sm font-medium text-white">Prestations</legend>
        <p id="f-services-hint" className="-mt-2 text-sm font-light text-mist/60">Sélectionnez une ou plusieurs prestations.</p>
        {groups.map((g) => (
          <div key={g} className="grid gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-mist/50">{g}</p>
            <div className="flex flex-wrap gap-2" id={g === "Garage" ? "f-services" : undefined} tabIndex={g === "Garage" ? -1 : undefined}>
              {BOOKABLE.filter((b) => b.group === g).map((b) => {
                const on = f.values.services.includes(b.id);
                return (
                  <button key={b.id} type="button" aria-pressed={on} onClick={() => toggle(b.id)}
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm transition-all duration-200 ${on ? "border-neon bg-neon/10 text-neon shadow-[0_0_18px_-6px_rgba(250,204,21,.8)]" : "border-white/10 bg-white/[0.02] text-mist/75 hover:border-white/25 hover:text-white"}`}>
                    {on ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {f.errors.services && <p id="f-services-err" className="text-sm font-medium text-red-300">{f.errors.services}</p>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Identity f={f} />
        <Field label="Marque et modèle" id="f-auto" error={f.errors.auto}>
          <input className="field-input" type="text" placeholder="Ex. : Peugeot 308" value={f.values.auto} onChange={f.set("auto")} {...f.a11y("auto")} />
        </Field>
        <Field label="Jour souhaité" id="f-jour" hint="Fermé le lundi." error={f.errors.jour}>
          <input className="field-input" type="date" min={todayISO()} value={f.values.jour} onChange={f.set("jour")} {...f.a11y("jour", true)} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Précision" id="f-note" optional>
            <textarea className="field-input min-h-[96px] resize-y" value={f.values.note} onChange={f.set("note")} id="f-note" />
          </Field>
        </div>
      </div>
      <Button type="submit" className="w-full"><MessageCircle className="h-5 w-5" aria-hidden="true" />Envoyer ma demande sur WhatsApp</Button>
      <WaResult url={url} />
      <Privacy />
    </form>
  );
}

/* ---------- Voiture : achat (essai) ou location (dates) ---------- */
export function CarForm({ car, mode }) {
  const rent = mode === "location";
  const f = useForm(
    { nom: "", tel: "", du: "", au: "", chauffeur: "", jour: "", note: "" },
    rent
      ? { du: (v) => (!v ? "Choisissez une date de début." : v < todayISO() ? "Choisissez une date à venir." : null),
          au: (v, all) => (!v ? "Choisissez une date de fin." : all.du && v < all.du ? "La date de fin doit être après la date de début." : null),
          chauffeur: req("Choisissez une option."), nom: req(), tel: req() }
      : { nom: req(), tel: req(), jour: dayRule(false) }
  );
  const [url, setUrl] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!f.validate()) return;
    const v = f.values;
    setUrl(openWhatsApp(rent
      ? ["Bonjour Touba Automobile, je voudrais louer une voiture.", "", `Véhicule : ${car.name} (${car.type})`, `Du : ${frDate(v.du)}`, `Au : ${frDate(v.au)}`, `Chauffeur : ${v.chauffeur}`, `Nom : ${v.nom}`, `Téléphone : ${v.tel}`, v.note ? `Précision : ${v.note}` : null]
      : ["Bonjour Touba Automobile, je suis intéressé par cette voiture.", "", `Voiture : ${car.name} – ${car.price}`, v.jour ? `Essai souhaité : ${frDate(v.jour)}` : null, `Nom : ${v.nom}`, `Téléphone : ${v.tel}`, v.note ? `Question : ${v.note}` : null]));
  };

  return (
    <form noValidate onSubmit={submit} className="grid gap-6">
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <img src={car.img} alt="" className="h-20 w-28 flex-none rounded-xl object-cover" />
        <div className="min-w-0">
          <p className="truncate font-semibold text-white">{car.name}</p>
          <p className="text-sm font-light text-mist/70">{rent ? `${car.type} · à partir de ${car.price} / jour` : car.price}</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {rent ? (
          <>
            <Field label="Du" id="f-du" error={f.errors.du}>
              <input className="field-input" type="date" min={todayISO()} value={f.values.du} onChange={f.set("du")} {...f.a11y("du")} />
            </Field>
            <Field label="Au" id="f-au" error={f.errors.au}>
              <input className="field-input" type="date" min={f.values.du || todayISO()} value={f.values.au} onChange={f.set("au")} {...f.a11y("au")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Chauffeur" id="f-chauffeur" error={f.errors.chauffeur}>
                <select className="field-input" value={f.values.chauffeur} onChange={f.set("chauffeur")} {...f.a11y("chauffeur")}>
                  <option value="">Choisir</option><option>Sans chauffeur</option><option>Avec chauffeur</option><option>Je ne sais pas encore</option>
                </select>
              </Field>
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <Field label="Jour souhaité pour l'essai" id="f-jour" optional hint="Fermé le lundi." error={f.errors.jour}>
              <input className="field-input" type="date" min={todayISO()} value={f.values.jour} onChange={f.set("jour")} {...f.a11y("jour", true)} />
            </Field>
          </div>
        )}
        <Identity f={f} />
        <div className="sm:col-span-2">
          <Field label={rent ? "Précision" : "Une question sur la voiture ?"} id="f-note" optional>
            <textarea className="field-input min-h-[88px] resize-y" id="f-note" value={f.values.note} onChange={f.set("note")} />
          </Field>
        </div>
      </div>
      <Button type="submit" className="w-full"><MessageCircle className="h-5 w-5" aria-hidden="true" />{rent ? "Vérifier la disponibilité sur WhatsApp" : "Demander un essai sur WhatsApp"}</Button>
      <WaResult url={url} />
      <Privacy />
    </form>
  );
}

/* ---------- Estimation avant de venir (page d'accueil) ---------- */
export function QuoteForm() {
  const f = useForm({ nom: "", tel: "", auto: "", panne: "" }, { nom: req(), tel: req(), auto: req(), panne: req("Décrivez la panne en quelques mots.") });
  const [photo, setPhoto] = useState(null);
  const [url, setUrl] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!f.validate()) return;
    const v = f.values;
    setUrl(openWhatsApp(["Bonjour Touba Automobile, j'ai une panne et je voudrais une estimation.", "", `Nom : ${v.nom}`, `Téléphone : ${v.tel}`, `Voiture : ${v.auto}`, `Panne : ${v.panne}`, photo ? "\nJe vous envoie une photo juste après ce message." : null]));
  };

  return (
    <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <Identity f={f} />
      <div className="sm:col-span-2">
        <Field label="Marque et modèle" id="f-auto" error={f.errors.auto}>
          <input className="field-input" type="text" placeholder="Ex. : Toyota Corolla 2012" value={f.values.auto} onChange={f.set("auto")} {...f.a11y("auto")} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Description de la panne" id="f-panne" error={f.errors.panne}>
          <textarea className="field-input min-h-[120px] resize-y" placeholder="Ce que vous entendez, voyez ou sentez, et depuis quand." value={f.values.panne} onChange={f.set("panne")} {...f.a11y("panne")} />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <input id="f-photo" type="file" accept="image/*" className="peer sr-only" aria-describedby="f-photo-hint"
          onChange={(e) => { const file = e.target.files?.[0]; setPhoto(file ? { name: file.name, src: URL.createObjectURL(file) } : null); }} />
        <label htmlFor="f-photo" className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl border border-dashed border-white/25 px-5 text-sm text-white transition hover:border-neon hover:text-neon peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-neon">
          <Camera className="h-[18px] w-[18px]" aria-hidden="true" />Ajouter une photo
        </label>
        {photo && <span className="flex items-center gap-3 text-sm font-light text-mist/80"><img src={photo.src} alt="Aperçu de la photo choisie" className="h-12 w-12 rounded-lg object-cover" />{photo.name}</span>}
        <p id="f-photo-hint" className="w-full text-sm font-light text-mist/60">Facultatif. Vous l'envoyez dans WhatsApp, juste après le message.</p>
      </div>
      <div className="grid gap-4 sm:col-span-2">
        <Button type="submit" className="w-full"><MessageCircle className="h-5 w-5" aria-hidden="true" />Recevoir mon estimation sur WhatsApp</Button>
        <p className="flex items-center gap-2 text-sm text-white"><CalendarDays className="h-4 w-4 text-neon" aria-hidden="true" />Vous connaissez le prix avant de vous déplacer.</p>
        <WaResult url={url} />
        <Privacy />
      </div>
    </form>
  );
}
