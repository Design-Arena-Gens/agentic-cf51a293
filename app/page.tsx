"use client";

import { useMemo, useState } from "react";
import { AnalysisResult } from "@/components/analysis-result";
import { analyzeDecision } from "@/lib/analyzer";
import { clsx } from "clsx";

const beispieltext = `Bescheid vom 01.03.2024

Sehr geehrte Frau Beispiel,

wir sehen uns nicht in der Lage, Ihrem Antrag auf Übernahme der Mietkosten zuzustimmen. Entsprechend den gesetzlichen Vorgaben kann Ihr Anliegen in der Regel nur berücksichtigt werden, wenn die Voraussetzungen des § 22 SGB II vollständig erfüllt sind. Nach pflichtgemäßem Ermessen wurde entschieden, keine weiteren Zahlungen zu bewilligen.

Eine weitere Prüfung findet nicht statt. Sollte sich Ihre Situation grundsätzlich ändern, können Sie erneut vorsprechen.

Mit freundlichen Grüßen
Ihre Behörde`;

export default function Page() {
  const [input, setInput] = useState("");

  const analysis = useMemo(() => analyzeDecision(input), [input]);
  const isEmpty = input.trim().length === 0;

  return (
    <main className="atlas-gradient min-h-screen px-4 pb-24 pt-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="space-y-4 text-slate-100">
          <span className="inline-flex items-center rounded-full border border-atlas-400/60 bg-atlas-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-atlas-100">
            System Atlas
          </span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Strategischer Blick auf Behördenbescheide
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-slate-200">
            SYSTEM ATLAS liest Verwaltungstexte als System aus Routinen,
            Formulierungen und Verfahren. Fügen Sie einen Bescheid ein, um
            mögliche Schwachstellen der Begründung strukturiert sichtbar zu
            machen. Die Analyse bleibt sachlich, ruhig und erklärt Begriffe in
            Klartext – ohne Rechtsberatung zu ersetzen.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-atlas-100">
                Textanalyse
              </h2>
              <button
                type="button"
                className="rounded-lg border border-atlas-500/40 bg-atlas-500/10 px-3 py-1.5 text-xs font-medium text-atlas-50 transition hover:border-atlas-400/70 hover:bg-atlas-500/20"
                onClick={() => setInput(beispieltext)}
              >
                Beispiel einfügen
              </button>
            </div>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Fügen Sie hier den vollständigen Wortlaut Ihres Bescheids ein. Persönliche Daten können optional anonymisiert werden."
              className={clsx(
                "min-h-[320px] w-full resize-y rounded-2xl border bg-slate-950/60 p-5 text-sm leading-relaxed text-slate-100 shadow-inner shadow-slate-950/80 outline-none transition focus:border-atlas-400/70 focus:ring-2 focus:ring-atlas-500/40",
                isEmpty
                  ? "border-slate-800"
                  : "border-atlas-500/40 bg-slate-950/80"
              )}
            />
            <p className="text-xs text-slate-400">
              Datenschutz: Texte werden ausschließlich im Browser verarbeitet.
              Es findet keine Speicherung oder Übermittlung statt.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm text-slate-200 shadow-xl shadow-slate-950/50 backdrop-blur">
              <h3 className="font-semibold text-atlas-100">
                Was SYSTEM ATLAS erkennt
              </h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• Pauschale oder formelhafte Begründungen</li>
                <li>• Unbestimmte Rechtsbegriffe und offenes Ermessen</li>
                <li>• Fehlende oder unklare Fristen</li>
                <li>• Schwache Rechtsbehelfsbelehrungen</li>
                <li>• Formale Lücken wie Aktenzeichen oder Unterschrift</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 text-xs leading-relaxed text-slate-300">
              SYSTEM ATLAS ersetzt keine Rechtsberatung und formuliert keine
              Erfolgsaussichten. Er stellt Auffälligkeiten ruhig und sachlich
              dar, damit Bürger:innen die Verwaltungslogik besser verstehen.
            </div>
          </div>
        </section>

        <AnalysisResult {...analysis} />
      </div>
    </main>
  );
}
