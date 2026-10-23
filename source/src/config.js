/* ===== À MODIFIER : un seul numéro pour tout le site ===== */
export const CONFIG = {
  whatsapp: "221XXXXXXXXX",            // format international sans + ni espaces, ex. 221771234567
  telephone: "+221XXXXXXXXX",          // pour le bouton « Appeler »
  affichage: "[Numéro à confirmer]",   // tel qu'il s'affiche, ex. 77 123 45 67
  horaires: "[Horaires à confirmer]",
  adresse: "Route de Sindia, près de la station MKA, Keur Massamba Gueye, Thiès",
  maps: "Touba Automobile, Route de Sindia, Keur Massamba Gueye, Thiès, Sénégal",
  googleAvis: "#", // lien « Laisser un avis Google » à ajouter
};

export const waUrl = (msg = "Bonjour Touba Automobile, ") =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telUrl = `tel:${CONFIG.telephone}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.maps)}`;

/* Ouvre WhatsApp ; renvoie l'URL pour afficher un lien de secours. */
export function openWhatsApp(lines) {
  const url = waUrl(lines.filter((l) => l !== null && l !== undefined).join("\n"));
  try { window.open(url, "_blank", "noopener"); } catch (e) { /* le lien de secours prend le relais */ }
  return url;
}

export const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};
export const isMonday = (iso) => iso && new Date(iso + "T12:00:00").getDay() === 1;
export const frDate = (iso) =>
  iso ? new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "";
