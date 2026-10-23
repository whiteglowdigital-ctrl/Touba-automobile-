import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

/* Contexte du site : navigation instantanée + ouverture des formulaires */
export const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

const variants = {
  primary:
    "bg-neon text-ink font-semibold hover:bg-neon-hot hover:shadow-glow",
  ghost:
    "border border-white/20 text-white hover:border-neon/70 hover:text-neon bg-white/[0.03] backdrop-blur",
  dark: "bg-ink text-white hover:bg-ink-4 border border-ink",
};

export function Button({ as: Tag = "button", variant = "primary", className = "", children, ...props }) {
  return (
    <Tag
      className={`group relative inline-flex min-h-[48px] items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 py-3 text-[15px] tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === "primary" && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-white/40 opacity-0 blur-md group-hover:animate-sheen group-hover:opacity-100" />
      )}
      {children}
    </Tag>
  );
}

/* Apparition au défilement : glissement seulement, le contenu reste visible au repos */
export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ y: 36 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function Heading({ kicker, title, accent, sub, align = "left", id, as: H = "h2" }) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {kicker && (
        <p className={`mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-neon ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-10 bg-neon" aria-hidden="true" />
          {kicker}
        </p>
      )}
      <H id={id} className="display text-4xl text-white sm:text-5xl lg:text-6xl">
        {title} {accent && <span className="text-neon">{accent}</span>}
      </H>
      {sub && <p className="mt-6 text-lg font-light leading-relaxed text-mist/80 md:text-xl">{sub}</p>}
    </Reveal>
  );
}

export function Field({ label, id, hint, error, optional, children }) {
  return (
    <div className="grid min-w-0 gap-2">
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label} {optional && <span className="font-light text-mist/60">(facultatif)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-sm font-light text-mist/60">{hint}</p>}
      {error && <p id={`${id}-err`} className="text-sm font-medium text-red-300">{error}</p>}
    </div>
  );
}

export function Privacy() {
  return (
    <p className="flex items-start gap-2 text-sm font-light leading-relaxed text-mist/60">
      <Lock className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
      Vos informations servent uniquement à répondre à votre demande et ne sont pas conservées sur ce site.
    </p>
  );
}

/* Résultat après envoi : on ne prétend pas que le message est parti, on donne le lien */
export function WaResult({ url }) {
  if (!url) return null;
  return (
    <div role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neon/30 bg-neon/[0.06] p-4">
      <p className="font-medium text-white">Votre message est prêt.</p>
      <a href={url} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center rounded-lg bg-neon px-4 font-semibold text-ink">
        Ouvrir WhatsApp
      </a>
    </div>
  );
}

export function Placeholder({ children = "[Photo à remplacer par une vraie photo du garage]" }) {
  return (
    <span className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] rounded-md bg-ink/80 px-2 py-1 text-[11px] font-light leading-snug text-mist/80 backdrop-blur">
      {children}
    </span>
  );
}
