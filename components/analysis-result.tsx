import type { Finding } from "@/lib/analyzer";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisResultProps {
  overview: string;
  findings: Finding[];
  clarifications: string[];
  strategy: string;
  disclaimer: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut", staggerChildren: 0.05 }
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } }
};

const childVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 }
};

export function AnalysisResult({
  overview,
  findings,
  clarifications,
  strategy,
  disclaimer
}: AnalysisResultProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={overview + findings.length}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/40 backdrop-blur"
      >
        <motion.div variants={childVariants} className="space-y-2">
          <span className="text-xs uppercase tracking-wide text-atlas-200">
            1. Kurzüberblick
          </span>
          <p className="text-lg leading-relaxed text-slate-100">{overview}</p>
        </motion.div>

        <motion.div variants={childVariants} className="space-y-3">
          <span className="text-xs uppercase tracking-wide text-atlas-200">
            2. Auffällige Punkte
          </span>
          <div className="space-y-4">
            {findings.length === 0 ? (
              <p className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm leading-relaxed text-slate-200">
                Keine deutlichen Systemlücken erkennbar. Dennoch lohnt es sich,
                einzelne Formulierungen kritisch zu hinterfragen.
              </p>
            ) : (
              findings.map((finding) => (
                <div
                  key={finding.id}
                  className="rounded-xl border border-atlas-500/30 bg-atlas-500/5 p-4"
                >
                  <h3 className="text-base font-semibold text-atlas-200">
                    {finding.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-200">
                    {finding.assessment}
                  </p>
                  {finding.evidence.length > 0 && (
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {finding.evidence.map((item, index) => (
                        <li
                          key={`${finding.id}-evidence-${index}`}
                          className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-xs leading-relaxed text-slate-200"
                        >
                          „{item.trim()}“
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div variants={childVariants} className="space-y-3">
          <span className="text-xs uppercase tracking-wide text-atlas-200">
            3. Klartext
          </span>
          <ul className="space-y-3">
            {clarifications.map((item, index) => (
              <li
                key={`clarification-${index}`}
                className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm text-slate-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={childVariants} className="space-y-2">
          <span className="text-xs uppercase tracking-wide text-atlas-200">
            4. Strategischer Hinweis
          </span>
          <p className="rounded-xl border border-atlas-500/40 bg-atlas-500/10 px-4 py-3 text-sm text-atlas-50">
            {strategy}
          </p>
        </motion.div>

        <motion.div variants={childVariants} className="rounded-xl bg-slate-950/40 px-4 py-3 text-xs text-slate-400">
          {disclaimer}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
