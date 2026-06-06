export type PatientStatus = "stable" | "warning" | "critical";
export type Role = "doctor" | "nurse" | "admin";

export interface Vitals {
  heartRate: number;
  systolic: number;
  diastolic: number;
  spo2: number;
  temperature: number;
  respiratoryRate: number;
}

export interface PatientAlert {
  id: string;
  patientId: string;
  patientName: string;
  severity: "critical" | "warning" | "resolved";
  message: string;
  suggestedAction: string;
  timestamp: number;
  state: "active" | "acknowledged" | "resolved";
}

export interface LabResult {
  name: string;
  value: string;
  range: string;
  flag: "normal" | "high" | "low";
}

export interface TimelineEvent {
  time: string;
  title: string;
  detail: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  room: string;
  ward: string;
  status: PatientStatus;
  riskScore: number; // 0-100
  deteriorationProb: number; // 0-100
  confidence: number; // 0-100
  isICU: boolean;
  admittedToday: boolean;
  doctor: string;
  diagnosis: string;
  aiRecommendation: string;
  aiInsights: string[];
  baseline: Vitals;
  vitals: Vitals;
  nurseNotes: { author: string; time: string; text: string }[];
  labResults: LabResult[];
  treatmentHistory: { date: string; treatment: string; by: string }[];
}

const baseVitals = (hr: number, sys: number, dia: number, spo2: number, temp: number, rr: number): Vitals => ({
  heartRate: hr,
  systolic: sys,
  diastolic: dia,
  spo2,
  temperature: temp,
  respiratoryRate: rr,
});

export const patients: Patient[] = [
  {
    id: "VG-1042",
    name: "Eleanor Whitman",
    age: 67,
    gender: "F",
    room: "ICU-03",
    ward: "Intensive Care",
    status: "critical",
    riskScore: 88,
    deteriorationProb: 76,
    confidence: 94,
    isICU: true,
    admittedToday: false,
    doctor: "Dr. Patel",
    diagnosis: "Acute respiratory distress syndrome",
    aiRecommendation:
      "Escalate to rapid response. Consider increasing supplemental oxygen and obtaining arterial blood gas within 15 minutes.",
    aiInsights: [
      "Possible respiratory distress detected",
      "Oxygen saturation decreasing over last 30 min",
      "Elevated heart rate trend correlated with falling SpO₂",
    ],
    baseline: baseVitals(118, 148, 92, 89, 38.6, 26),
    vitals: baseVitals(118, 148, 92, 89, 38.6, 26),
    nurseNotes: [
      { author: "N. Rivera", time: "08:20", text: "Patient restless, increased work of breathing." },
      { author: "N. Rivera", time: "07:00", text: "O₂ via nasal cannula increased to 4L." },
    ],
    labResults: [
      { name: "WBC", value: "14.2", range: "4-11 K/µL", flag: "high" },
      { name: "Lactate", value: "3.1", range: "0.5-2.2 mmol/L", flag: "high" },
      { name: "CRP", value: "98", range: "<10 mg/L", flag: "high" },
    ],
    treatmentHistory: [
      { date: "Today 06:30", treatment: "Started broad-spectrum antibiotics", by: "Dr. Patel" },
      { date: "Yesterday", treatment: "Chest X-ray performed", by: "Radiology" },
    ],
  },
  {
    id: "VG-1043",
    name: "Marcus Bennett",
    age: 54,
    gender: "M",
    room: "ICU-01",
    ward: "Intensive Care",
    status: "critical",
    riskScore: 81,
    deteriorationProb: 68,
    confidence: 91,
    isICU: true,
    admittedToday: true,
    doctor: "Dr. Chen",
    diagnosis: "Post-operative sepsis",
    aiRecommendation: "Monitor lactate trend closely; fluid resuscitation review recommended.",
    aiInsights: ["Rising temperature trend", "Tachycardia detected", "Blood pressure trending down"],
    baseline: baseVitals(112, 102, 64, 92, 38.9, 24),
    vitals: baseVitals(112, 102, 64, 92, 38.9, 24),
    nurseNotes: [{ author: "N. Okafor", time: "09:10", text: "Cool peripheries, monitoring perfusion." }],
    labResults: [
      { name: "Lactate", value: "2.8", range: "0.5-2.2 mmol/L", flag: "high" },
      { name: "Platelets", value: "118", range: "150-400 K/µL", flag: "low" },
    ],
    treatmentHistory: [{ date: "Today 05:00", treatment: "IV fluid bolus 500ml", by: "Dr. Chen" }],
  },
  {
    id: "VG-1051",
    name: "Sofia Alvarez",
    age: 45,
    gender: "F",
    room: "4B-12",
    ward: "Cardiology",
    status: "warning",
    riskScore: 58,
    deteriorationProb: 41,
    confidence: 87,
    isICU: false,
    admittedToday: false,
    doctor: "Dr. Patel",
    diagnosis: "Atrial fibrillation",
    aiRecommendation: "Continue rhythm monitoring; review anticoagulation status.",
    aiInsights: ["Irregular heart rate variability", "Mildly elevated blood pressure"],
    baseline: baseVitals(96, 138, 86, 95, 37.4, 19),
    vitals: baseVitals(96, 138, 86, 95, 37.4, 19),
    nurseNotes: [{ author: "N. Rivera", time: "08:45", text: "Patient comfortable, telemetry stable." }],
    labResults: [{ name: "Troponin", value: "0.02", range: "<0.04 ng/mL", flag: "normal" }],
    treatmentHistory: [{ date: "Today 07:30", treatment: "Beta-blocker administered", by: "Dr. Patel" }],
  },
  {
    id: "VG-1052",
    name: "James Holloway",
    age: 72,
    gender: "M",
    room: "3A-08",
    ward: "Pulmonology",
    status: "warning",
    riskScore: 62,
    deteriorationProb: 47,
    confidence: 89,
    isICU: false,
    admittedToday: true,
    doctor: "Dr. Chen",
    diagnosis: "COPD exacerbation",
    aiRecommendation: "Nebulizer therapy recommended; watch SpO₂ closely overnight.",
    aiInsights: ["SpO₂ near lower threshold", "Increased respiratory rate"],
    baseline: baseVitals(92, 134, 82, 93, 37.1, 22),
    vitals: baseVitals(92, 134, 82, 93, 37.1, 22),
    nurseNotes: [{ author: "N. Okafor", time: "09:00", text: "Productive cough, encouraging fluids." }],
    labResults: [{ name: "pCO₂", value: "52", range: "35-45 mmHg", flag: "high" }],
    treatmentHistory: [{ date: "Today 08:00", treatment: "Salbutamol nebulizer", by: "N. Okafor" }],
  },
  {
    id: "VG-1060",
    name: "Aisha Rahman",
    age: 34,
    gender: "F",
    room: "5C-21",
    ward: "General Medicine",
    status: "stable",
    riskScore: 22,
    deteriorationProb: 12,
    confidence: 95,
    isICU: false,
    admittedToday: false,
    doctor: "Dr. Patel",
    diagnosis: "Post-appendectomy recovery",
    aiRecommendation: "Recovery on track. Continue routine observations.",
    aiInsights: ["All vitals within normal range", "Stable recovery trajectory"],
    baseline: baseVitals(74, 118, 76, 98, 36.7, 15),
    vitals: baseVitals(74, 118, 76, 98, 36.7, 15),
    nurseNotes: [{ author: "N. Rivera", time: "08:30", text: "Mobilizing well, pain controlled." }],
    labResults: [{ name: "Hb", value: "12.8", range: "12-16 g/dL", flag: "normal" }],
    treatmentHistory: [{ date: "Today 06:00", treatment: "Wound dressing change", by: "N. Rivera" }],
  },
  {
    id: "VG-1061",
    name: "David Kim",
    age: 28,
    gender: "M",
    room: "5C-18",
    ward: "General Medicine",
    status: "stable",
    riskScore: 16,
    deteriorationProb: 8,
    confidence: 96,
    isICU: false,
    admittedToday: true,
    doctor: "Dr. Chen",
    diagnosis: "Dehydration / observation",
    aiRecommendation: "Stable. Likely discharge candidate within 24h.",
    aiInsights: ["Vitals normal", "Hydration improving"],
    baseline: baseVitals(70, 116, 74, 99, 36.6, 14),
    vitals: baseVitals(70, 116, 74, 99, 36.6, 14),
    nurseNotes: [{ author: "N. Okafor", time: "09:15", text: "Tolerating oral fluids well." }],
    labResults: [{ name: "Na", value: "139", range: "135-145 mmol/L", flag: "normal" }],
    treatmentHistory: [{ date: "Today 07:00", treatment: "IV fluids completed", by: "N. Okafor" }],
  },
  {
    id: "VG-1070",
    name: "Grace Thompson",
    age: 81,
    gender: "F",
    room: "ICU-05",
    ward: "Intensive Care",
    status: "warning",
    riskScore: 66,
    deteriorationProb: 52,
    confidence: 90,
    isICU: true,
    admittedToday: false,
    doctor: "Dr. Patel",
    diagnosis: "Congestive heart failure",
    aiRecommendation: "Diuretic response review; monitor fluid balance hourly.",
    aiInsights: ["Borderline oxygen saturation", "Elevated respiratory rate"],
    baseline: baseVitals(88, 142, 88, 94, 37.0, 21),
    vitals: baseVitals(88, 142, 88, 94, 37.0, 21),
    nurseNotes: [{ author: "N. Rivera", time: "08:00", text: "Mild peripheral edema noted." }],
    labResults: [{ name: "BNP", value: "640", range: "<100 pg/mL", flag: "high" }],
    treatmentHistory: [{ date: "Today 06:45", treatment: "IV furosemide", by: "Dr. Patel" }],
  },
  {
    id: "VG-1071",
    name: "Noah Williams",
    age: 59,
    gender: "M",
    room: "2A-04",
    ward: "Neurology",
    status: "stable",
    riskScore: 31,
    deteriorationProb: 18,
    confidence: 93,
    isICU: false,
    admittedToday: false,
    doctor: "Dr. Chen",
    diagnosis: "TIA observation",
    aiRecommendation: "Neuro observations stable; continue monitoring.",
    aiInsights: ["Neuro vitals stable", "No new deficits"],
    baseline: baseVitals(76, 128, 80, 97, 36.8, 16),
    vitals: baseVitals(76, 128, 80, 97, 36.8, 16),
    nurseNotes: [{ author: "N. Okafor", time: "08:50", text: "GCS 15, no concerns." }],
    labResults: [{ name: "INR", value: "1.1", range: "0.8-1.2", flag: "normal" }],
    treatmentHistory: [{ date: "Today 07:15", treatment: "Aspirin administered", by: "N. Okafor" }],
  },
  {
    id: "VG-1080",
    name: "Olivia Martins",
    age: 49,
    gender: "F",
    room: "4B-09",
    ward: "Cardiology",
    status: "stable",
    riskScore: 27,
    deteriorationProb: 14,
    confidence: 94,
    isICU: false,
    admittedToday: false,
    doctor: "Dr. Patel",
    diagnosis: "Hypertension management",
    aiRecommendation: "BP improving with therapy; continue current regimen.",
    aiInsights: ["Blood pressure trending to target", "Stable rhythm"],
    baseline: baseVitals(78, 132, 84, 97, 36.9, 16),
    vitals: baseVitals(78, 132, 84, 97, 36.9, 16),
    nurseNotes: [{ author: "N. Rivera", time: "08:40", text: "No symptoms reported." }],
    labResults: [{ name: "K", value: "4.1", range: "3.5-5.0 mmol/L", flag: "normal" }],
    treatmentHistory: [{ date: "Today 07:45", treatment: "Antihypertensive dose", by: "N. Rivera" }],
  },
  {
    id: "VG-1081",
    name: "Liam Foster",
    age: 63,
    gender: "M",
    room: "ICU-02",
    ward: "Intensive Care",
    status: "critical",
    riskScore: 84,
    deteriorationProb: 71,
    confidence: 92,
    isICU: true,
    admittedToday: true,
    doctor: "Dr. Chen",
    diagnosis: "Acute myocardial infarction",
    aiRecommendation: "Cardiology review urgent; continuous ECG, prepare for intervention.",
    aiInsights: ["Elevated heart rate trend", "Blood pressure instability", "Possible cardiac compromise"],
    baseline: baseVitals(122, 96, 60, 91, 37.8, 25),
    vitals: baseVitals(122, 96, 60, 91, 37.8, 25),
    nurseNotes: [{ author: "N. Okafor", time: "09:05", text: "Chest pain 6/10, GTN given." }],
    labResults: [
      { name: "Troponin", value: "1.8", range: "<0.04 ng/mL", flag: "high" },
      { name: "CK-MB", value: "42", range: "<5 ng/mL", flag: "high" },
    ],
    treatmentHistory: [{ date: "Today 04:30", treatment: "Aspirin + heparin loading", by: "Dr. Chen" }],
  },
  {
    id: "VG-1090",
    name: "Maya Sharma",
    age: 38,
    gender: "F",
    room: "3A-11",
    ward: "Pulmonology",
    status: "warning",
    riskScore: 54,
    deteriorationProb: 38,
    confidence: 88,
    isICU: false,
    admittedToday: false,
    doctor: "Dr. Patel",
    diagnosis: "Pneumonia",
    aiRecommendation: "Monitor oxygenation; consider escalation if SpO₂ falls below 92%.",
    aiInsights: ["Mildly reduced SpO₂", "Low-grade fever"],
    baseline: baseVitals(94, 124, 78, 94, 37.6, 20),
    vitals: baseVitals(94, 124, 78, 94, 37.6, 20),
    nurseNotes: [{ author: "N. Rivera", time: "08:25", text: "Antibiotics ongoing, fever settling." }],
    labResults: [{ name: "CRP", value: "62", range: "<10 mg/L", flag: "high" }],
    treatmentHistory: [{ date: "Today 06:15", treatment: "IV antibiotics", by: "N. Rivera" }],
  },
  {
    id: "VG-1091",
    name: "Ethan Brooks",
    age: 25,
    gender: "M",
    room: "5C-25",
    ward: "General Medicine",
    status: "stable",
    riskScore: 12,
    deteriorationProb: 5,
    confidence: 97,
    isICU: false,
    admittedToday: true,
    doctor: "Dr. Chen",
    diagnosis: "Minor trauma observation",
    aiRecommendation: "Stable. Routine observation sufficient.",
    aiInsights: ["All parameters normal"],
    baseline: baseVitals(68, 120, 76, 99, 36.5, 14),
    vitals: baseVitals(68, 120, 76, 99, 36.5, 14),
    nurseNotes: [{ author: "N. Okafor", time: "09:20", text: "No new complaints." }],
    labResults: [{ name: "Hb", value: "14.2", range: "13-17 g/dL", flag: "normal" }],
    treatmentHistory: [{ date: "Today 08:10", treatment: "Analgesia provided", by: "N. Okafor" }],
  },
];

export const testimonials = [
  {
    quote:
      "VitalGuard AI flagged a deteriorating patient 4 hours before our team would have caught it. That lead time saved a life.",
    name: "Dr. Amara Patel",
    role: "ICU Director, Northgate Medical",
  },
  {
    quote:
      "The early-warning scores are remarkably accurate. Our rapid-response activations are now proactive instead of reactive.",
    name: "Dr. Lucas Chen",
    role: "Chief of Critical Care, Bayview Health",
  },
  {
    quote:
      "Nurses love the live monitoring station. It feels like having an extra clinician watching every bed at once.",
    name: "Nicole Rivera, RN",
    role: "Charge Nurse, St. Helena Hospital",
  },
];
