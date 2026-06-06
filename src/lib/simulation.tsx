import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  patients as seedPatients,
  type Patient,
  type PatientAlert,
  type PatientStatus,
  type Vitals,
} from "./mock/patients";

export interface VitalHistoryPoint {
  t: number;
  label: string;
  heartRate: number;
  systolic: number;
  diastolic: number;
  spo2: number;
  temperature: number;
  respiratoryRate: number;
}

interface SimContextValue {
  patients: Patient[];
  alerts: PatientAlert[];
  history: Record<string, VitalHistoryPoint[]>;
  getPatient: (id: string) => Patient | undefined;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  escalateAlert: (id: string) => void;
}

const SimContext = createContext<SimContextValue | null>(null);

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const drift = (amp: number) => (Math.random() * 2 - 1) * amp;

function statusFromVitals(v: Vitals, baseRisk: number): PatientStatus {
  if (v.spo2 < 90 || v.heartRate > 125 || v.systolic < 90 || v.temperature > 38.5 || v.respiratoryRate > 25) {
    return "critical";
  }
  if (v.spo2 < 94 || v.heartRate > 105 || v.temperature > 37.8 || v.respiratoryRate > 20 || baseRisk > 50) {
    return "warning";
  }
  return "stable";
}

function nextVitals(p: Patient): Vitals {
  const worsening = p.status === "critical" && Math.random() < 0.35;
  const w = worsening ? 1 : 0;
  const b = p.baseline;
  const v = p.vitals;
  return {
    heartRate: clamp(Math.round(v.heartRate * 0.6 + b.heartRate * 0.4 + drift(3.5) + w * 1.5), 40, 180),
    systolic: clamp(Math.round(v.systolic * 0.6 + b.systolic * 0.4 + drift(2.5) - w * 1.2), 70, 200),
    diastolic: clamp(Math.round(v.diastolic * 0.6 + b.diastolic * 0.4 + drift(2)), 40, 130),
    spo2: clamp(Math.round((v.spo2 * 0.6 + b.spo2 * 0.4 + drift(0.9) - w * 0.6) * 10) / 10, 75, 100),
    temperature: clamp(Math.round((v.temperature * 0.7 + b.temperature * 0.3 + drift(0.18) + w * 0.05) * 10) / 10, 34, 41),
    respiratoryRate: clamp(Math.round(v.respiratoryRate * 0.6 + b.respiratoryRate * 0.4 + drift(1.2) + w * 0.6), 8, 40),
  };
}

const timeLabel = (t: number) =>
  new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

function seedHistory(): Record<string, VitalHistoryPoint[]> {
  const now = Date.now();
  const hist: Record<string, VitalHistoryPoint[]> = {};
  for (const p of seedPatients) {
    const points: VitalHistoryPoint[] = [];
    for (let i = 19; i >= 0; i--) {
      const t = now - i * 4000;
      points.push({
        t,
        label: timeLabel(t),
        heartRate: clamp(Math.round(p.baseline.heartRate + drift(4)), 40, 180),
        systolic: clamp(Math.round(p.baseline.systolic + drift(4)), 70, 200),
        diastolic: clamp(Math.round(p.baseline.diastolic + drift(3)), 40, 130),
        spo2: clamp(Math.round((p.baseline.spo2 + drift(1)) * 10) / 10, 75, 100),
        temperature: clamp(Math.round((p.baseline.temperature + drift(0.2)) * 10) / 10, 34, 41),
        respiratoryRate: clamp(Math.round(p.baseline.respiratoryRate + drift(1.5)), 8, 40),
      });
    }
    hist[p.id] = points;
  }
  return hist;
}

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(() =>
    seedPatients.map((p) => ({ ...p, vitals: { ...p.vitals } })),
  );
  const [alerts, setAlerts] = useState<PatientAlert[]>([]);
  const [history, setHistory] = useState<Record<string, VitalHistoryPoint[]>>({});
  const lastAlert = useRef<Record<string, number>>({});

  useEffect(() => {
    setHistory(seedHistory());
    const interval = setInterval(() => {
      const now = Date.now();
      setPatients((prev) =>
        prev.map((p) => {
          const v = nextVitals(p);
          const status = statusFromVitals(v, p.riskScore);
          const riskDelta =
            status === "critical" ? drift(1) + 0.6 : status === "warning" ? drift(1) : drift(1) - 0.4;
          const riskScore = clamp(Math.round(p.riskScore + riskDelta), 5, 99);

          setHistory((h) => {
            const points = [...(h[p.id] ?? [])];
            points.push({ t: now, label: timeLabel(now), ...v });
            if (points.length > 24) points.shift();
            return { ...h, [p.id]: points };
          });

          if (status === "critical" && p.status !== "critical") {
            const cooldown = lastAlert.current[p.id] ?? 0;
            if (now - cooldown > 12000) {
              lastAlert.current[p.id] = now;
              const msg =
                v.spo2 < 90
                  ? "Oxygen saturation dropped below safe threshold"
                  : v.heartRate > 125
                    ? "Sustained tachycardia detected"
                    : "Patient vitals breached critical limits";
              setAlerts((a) => [
                {
                  id: `${p.id}-${now}`,
                  patientId: p.id,
                  patientName: p.name,
                  severity: "critical",
                  message: msg,
                  suggestedAction: p.aiRecommendation,
                  timestamp: now,
                  state: "active",
                },
                ...a,
              ]);
            }
          }

          return { ...p, vitals: v, status, riskScore };
        }),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPatient = (id: string) => patients.find((p) => p.id === id);
  const setAlertState = (id: string, state: PatientAlert["state"], severity?: PatientAlert["severity"]) =>
    setAlerts((a) =>
      a.map((al) => (al.id === id ? { ...al, state, severity: severity ?? al.severity } : al)),
    );

  const value: SimContextValue = {
    patients,
    alerts,
    history,
    getPatient,
    acknowledgeAlert: (id) => setAlertState(id, "acknowledged"),
    resolveAlert: (id) => setAlertState(id, "resolved", "resolved"),
    escalateAlert: (id) => setAlertState(id, "active", "critical"),
  };

  return <SimContext.Provider value={value}>{children}</SimContext.Provider>;
}

export function useSimulation() {
  const ctx = useContext(SimContext);
  if (!ctx) throw new Error("useSimulation must be used within SimulationProvider");
  return ctx;
}
