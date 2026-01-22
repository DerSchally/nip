export const serviceTypes = [
  {
    id: "NID",
    name: "Nachsendeauftrag Inland",
    description: "auf Dauer oder vorübergehende Abwesenheit",
    enabled: true,
    highlight: true,
  },
  {
    id: "NAD",
    name: "Nachsendeauftrag Ausland",
    description: "auf Dauer oder vorübergehende Abwesenheit",
    enabled: false,
  },
  {
    id: "PFU",
    name: "Postfach Urlaub",
    description: "",
    enabled: false,
  },
  {
    id: "PV",
    name: "Postvollmacht",
    description: "",
    enabled: false,
  },
  {
    id: "OA",
    name: "Ortsabwesenheit",
    description: "",
    enabled: false,
  },
  {
    id: "ASG",
    name: "Abstellgenehmigung",
    description: "",
    enabled: false,
  },
  {
    id: "PF",
    name: "Postfächer",
    description: "",
    enabled: false,
  },
  {
    id: "PUM",
    name: "Paketumleitung Dauerhaft",
    description: "",
    enabled: false,
  },
];

export const mailTypes = {
  included: [
    { id: "briefe", label: "Briefe", checked: true, disabled: true },
    { id: "paeckchen", label: "Päckchen", checked: true, disabled: true },
    { id: "infomail", label: "Info.Mail", checked: true, disabled: true },
    { id: "zeitungen", label: "Zeitungen", checked: true, disabled: true },
    { id: "kleinpakete", label: "Kleinpakete", checked: true, disabled: true },
  ],
  optional: [
    { id: "pakete", label: "Pakete", checked: false, disabled: false },
    { id: "express", label: "Post Express", checked: false, disabled: false },
  ],
};

export const forwardingTypes = [
  {
    id: "umzug",
    label: "Nachsendung wegen Umzug",
    description: "Dauerhafte Adressänderung",
  },
  {
    id: "abwesenheit",
    label: "Nachsendung wegen vorübergehender Abwesenheit",
    description: "Temporäre Weiterleitung (z.B. Urlaub, Geschäftsreise)",
  },
];

export const anredeOptions = [
  { value: "herr", label: "Herr" },
  { value: "frau", label: "Frau" },
  { value: "unbekannt", label: "Unbekannt" },
  { value: "firma", label: "Firma" },
];

export const steps = [
  { id: 1, name: "Auftrag", shortName: "Auftrag" },
  { id: 2, name: "Grund", shortName: "Grund" },
  { id: 3, name: "Gültigkeit", shortName: "Gültigkeit" },
  { id: 4, name: "Person", shortName: "Person" },
  { id: 5, name: "Bisherige Adresse", shortName: "Alte Adr." },
  { id: 6, name: "Neue Adresse", shortName: "Neue Adr." },
  { id: 7, name: "Sendungen", shortName: "Sendungen" },
  { id: 8, name: "Zusammenfassung", shortName: "Übersicht" },
];
