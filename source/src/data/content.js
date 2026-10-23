import { Gauge, Wrench, Zap, Droplet, Disc3, MoveVertical, CircleDot, Droplets, Car, KeyRound, Package, ShieldCheck, Cpu, BadgeCheck, LayoutGrid } from "lucide-react";
import { IMG } from "../assets/images.js";

/* Pages du site (navigation instantanée, sans rechargement) */
export const PAGES = [
  { id: "accueil", label: "Accueil" },
  { id: "garage", label: "Garage" },
  { id: "lavage", label: "Lavage" },
  { id: "voitures", label: "Voitures" },
  { id: "pieces", label: "Pièces & assurance" },
  { id: "contact", label: "Contact" },
];

/* Prestations réservables. `group` sert à les classer dans le formulaire de rendez-vous. */
export const SERVICES = [
  { id: "diagnostic", group: "Garage", icon: Gauge, title: "Diagnostic électronique", text: "Lecture complète des calculateurs avec un outil de dernière génération.", price: "À partir de [prix] F", img: IMG.diag, alt: "Compteur d'un tableau de bord allumé" },
  { id: "vidange", group: "Garage", icon: Droplet, title: "Vidange et entretien", text: "Vidange avec huiles Shell Helix, filtres et niveaux.", price: "À partir de [prix] F", img: IMG.oil, alt: "Huile moteur versée dans un moteur" },
  { id: "freins", group: "Garage", icon: Disc3, title: "Freins", text: "Plaquettes, disques et liquide de frein.", price: "À partir de [prix] F", img: IMG.brakes, alt: "Technicien qui démonte une roue" },
  { id: "mecanique", group: "Garage", icon: Wrench, title: "Mécanique", text: "Moteur, boîte, embrayage : on répare et on vous explique.", price: "Sur devis", img: IMG.meca, alt: "Mécanicien au travail dans un compartiment moteur" },
  { id: "electricite", group: "Garage", icon: Zap, title: "Électricité auto", text: "Batterie, démarreur, alternateur, éclairage.", price: "Sur devis", img: IMG.elec, alt: "Mains d'un technicien sur un faisceau électrique" },
  { id: "suspension", group: "Garage", icon: MoveVertical, title: "Suspension", text: "Amortisseurs et trains roulants, pour une conduite stable.", price: "Sur devis", img: IMG.wrench, alt: "Mécanicien qui serre une pièce avec une clé" },
  { id: "pneus", group: "Garage", icon: CircleDot, title: "Pneus", text: "Montage et réparation de crevaison.", price: "À partir de [prix] F", img: IMG.tyres, alt: "Pile de pneus neufs" },
];

export const WASH_PLANS = [
  { id: "lavage-basique", group: "Lavage", title: "Basique", tier: "Formule 1", price: "[prix]", items: ["[Lavage extérieur]", "[Jantes et pneus]", "[Séchage]"], img: IMG.wash1, alt: "Lavage d'une voiture au jet haute pression" },
  { id: "lavage-complet", group: "Lavage", title: "Complet", tier: "Formule 2", price: "[prix]", items: ["[Extérieur et intérieur]", "[Aspiration]", "[Vitres et tableau de bord]"], img: IMG.wash2, alt: "Laveur qui savonne la carrosserie d'une voiture", featured: true },
  { id: "lavage-neuf", group: "Lavage", title: "Remise à neuf", tier: "Formule 3", price: "[prix]", items: ["[Nettoyage des sièges]", "[Polissage de la carrosserie]", "[Rénovation des phares]"], img: IMG.detail, alt: "Préparateur qui travaille sur l'optique avant d'une voiture" },
];

/* Toutes les prestations proposées dans le formulaire de rendez-vous */
export const BOOKABLE = [
  ...SERVICES.map((s) => ({ id: s.id, label: s.title, group: "Garage" })),
  ...WASH_PLANS.map((w) => ({ id: w.id, label: `Lavage ${w.title.toLowerCase()}`, group: "Lavage" })),
];

export const UNIVERS = [
  { page: "garage", icon: Wrench, title: "Garage", text: "Diagnostic, mécanique, entretien", img: IMG.meca2 },
  { page: "lavage", icon: Droplets, title: "Lavage", text: "Basique, complet, remise à neuf", img: IMG.wet },
  { page: "voitures", tab: "vente", icon: Car, title: "Vente", text: "Photos, prix et papiers en ligne", img: IMG.porsche },
  { page: "voitures", tab: "location", icon: KeyRound, title: "Location", text: "À la journée", img: IMG.supra },
  { page: "pieces", icon: Package, title: "Pièces et pneus", text: "Pièces, pneus, huiles Shell Helix", img: IMG.tyres },
  { page: "pieces", icon: ShieldCheck, title: "Assurance", text: "Assurez votre véhicule sur place", img: IMG.assur },
];

export const ATOUTS = [
  { icon: Cpu, title: "Technologie de dernière génération", text: "Diagnostic électronique précis." },
  { icon: BadgeCheck, title: "Prix annoncé avant les travaux", text: "Pas de surprise." },
  { icon: LayoutGrid, title: "Tout au même endroit", text: "Garage, lavage, vente, location, pièces, assurance." },
  { icon: Droplet, title: "Huiles Shell Helix", text: "Pour chaque vidange." },
];

export const STEPS = [
  "Vous réservez ou demandez un devis sur WhatsApp",
  "On diagnostique votre voiture",
  "On vous annonce le prix avant de commencer",
  "Vous récupérez votre voiture",
];

/* Voitures : `prix` en F CFA (chiffres seuls) pour le filtre budget — vide = toujours affichée. */
export const CARS_SALE = [
  { id: "v1", name: "[Marque A] [Modèle]", marque: "[Marque A]", prix: null, price: "[Prix] F", year: "[Année]", km: "[Kilométrage]", gearbox: "[Manuelle / auto]", papers: "[à préciser]", img: IMG.sale1, alt: "Citadine bleue garée devant une maison" },
  { id: "v2", name: "[Marque B] [Modèle]", marque: "[Marque B]", prix: null, price: "[Prix] F", year: "[Année]", km: "[Kilométrage]", gearbox: "[Manuelle / auto]", papers: "[à préciser]", img: IMG.sale2, alt: "Berline noire sur la route" },
  { id: "v3", name: "[Marque C] [Modèle]", marque: "[Marque C]", prix: null, price: "[Prix] F", year: "[Année]", km: "[Kilométrage]", gearbox: "[Manuelle / auto]", papers: "[à préciser]", img: IMG.sale3, alt: "4x4 noir garé devant un garage" },
];

export const CARS_RENT = [
  { id: "l1", name: "[Véhicule]", type: "Citadine", price: "[prix] F", deposit: "[à préciser]", minDays: "[à préciser]", driver: "Avec ou sans [à préciser]", img: IMG.rent1, alt: "Petit SUV gris sous un éclairage de garage" },
  { id: "l2", name: "[Véhicule]", type: "SUV", price: "[prix] F", deposit: "[à préciser]", minDays: "[à préciser]", driver: "Avec ou sans [à préciser]", img: IMG.rent2, alt: "SUV blanc garé dans une rue" },
  { id: "l3", name: "[Véhicule]", type: "4x4", price: "[prix] F", deposit: "[à préciser]", minDays: "[à préciser]", driver: "Avec ou sans [à préciser]", img: IMG.rent3, alt: "Grand 4x4 blanc sur une piste" },
];

export const BUDGETS = [
  { value: "", label: "Tous les budgets" },
  { value: "0-5000000", label: "Moins de 5 000 000 F" },
  { value: "5000000-10000000", label: "5 à 10 millions F" },
  { value: "10000000-", label: "Plus de 10 millions F" },
];

export const FAQ = [
  ["Quels jours êtes-vous ouverts ?", "Nous sommes ouverts 24h/24, du mardi au dimanche. Nous sommes fermés le lundi."],
  ["Faut-il prendre rendez-vous ?", "[à compléter]"],
  ["Combien coûte un diagnostic ?", "À partir de [prix] F. Vous pouvez aussi demander une estimation gratuite sur WhatsApp avant de venir."],
  ["Vendez-vous des pièces et des pneus seuls ?", "Oui, pièces détachées, pneus et huiles Shell Helix. Demandez le prix sur WhatsApp."],
  ["Les voitures à vendre ont-elles leurs papiers ?", "L'état des papiers est indiqué sur chaque annonce. [à confirmer]"],
];

export const GALLERY = [
  { img: IMG.garage, alt: "Atelier éclairé avec une voiture en réparation", big: true },
  { img: IMG.redgarage, alt: "Voiture sous un éclairage rouge dans un garage" },
  { img: IMG.toolwall, alt: "Mur d'outils rangés dans l'atelier" },
  { img: IMG.wash2, alt: "Lavage à la main d'une voiture" },
  { img: IMG.engine, alt: "Moteur vu de près" },
];
