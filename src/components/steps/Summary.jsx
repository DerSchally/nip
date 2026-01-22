import { useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Button } from "../ui";
import { validateForm } from "../../utils/mockValidation";
import { forwardingTypes, mailTypes } from "../../data/mockData";
import { titlesPrefix, titlesSuffix } from "../../data/titles";
import {
  CheckCircle,
  AlertTriangle,
  Edit2,
  User,
  MapPin,
  Calendar,
  Package,
} from "lucide-react";

const SectionCard = ({ title, icon: Icon, children, onEdit, editStep }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-post-yellow" />
        <h3 className="font-bold text-post-black">{title}</h3>
      </div>
      {onEdit && (
        <button
          onClick={() => onEdit(editStep)}
          className="text-post-gray-600 hover:text-post-black flex items-center gap-1 text-sm"
        >
          <Edit2 className="w-4 h-4" />
          Bearbeiten
        </button>
      )}
    </div>
    {children}
  </div>
);

const formatDate = (date) => {
  if (!date) return "-";
  return format(date, "dd.MM.yyyy", { locale: de });
};

const getTitle = (value, list) => {
  const found = list.find((t) => t.value === value);
  return found?.label || "";
};

export const Summary = ({ formData, onEdit, onSubmit, onReset }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await validateForm(formData);
    setSubmitResult(result);
    setIsSubmitting(false);
  };

  const forwardingType = forwardingTypes.find(
    (t) => t.id === formData.forwardingType
  );

  if (submitResult?.valid) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-post-green rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-post-black mb-2">
            Auftrag erfolgreich gespeichert
          </h2>
          <p className="text-post-gray-600 mb-4">
            Formularnummer: <strong>{submitResult.formNumber}</strong>
          </p>
          <p className="text-post-gray-600">
            Ihr Nachsendeauftrag wurde erfolgreich angelegt.
            <br />
            Die Nachsendung beginnt am {formatDate(formData.validFrom)}.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="secondary" onClick={onReset}>
            Neuen Auftrag anlegen
          </Button>
          <Button onClick={() => window.location.reload()}>
            Zur Übersicht
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-post-black">Zusammenfassung</h2>
        <p className="text-post-gray-600">
          Bitte überprüfen Sie Ihre Angaben vor dem Absenden
        </p>
      </div>

      <div className="bg-post-red/10 border border-post-red rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-post-red flex-shrink-0 mt-0.5" />
        <div className="text-sm text-post-red">
          <p className="font-bold">
            OPAL muss gestartet sein, damit der Auftrag mit der Tarifberechnung
            korrekt abgeschlossen werden kann!
          </p>
          <p className="mt-1">
            Kundenidentifizierung in OPAL nicht vergessen, vor Abschluss des
            Auftrages!
          </p>
        </div>
      </div>

      <SectionCard
        title="Auftragsdetails"
        icon={Calendar}
        onEdit={onEdit}
        editStep={2}
      >
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-post-gray-600">Art:</span>
            <span className="ml-2 font-medium">{forwardingType?.label}</span>
          </div>
          <div>
            <span className="text-post-gray-600">Zeitraum:</span>
            <span className="ml-2 font-medium">
              {formatDate(formData.validFrom)} - {formatDate(formData.validUntil)}
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Personen"
        icon={User}
        onEdit={onEdit}
        editStep={4}
      >
        <div className="space-y-3">
          {formData.persons.map((person, index) => (
            <div key={person.id} className="text-sm">
              {person.anrede === "firma" ? (
                <span className="font-medium">{person.companyName}</span>
              ) : (
                <span className="font-medium">
                  {getTitle(person.titlePrefix, titlesPrefix)}{" "}
                  {person.firstName} {person.lastName}{" "}
                  {getTitle(person.titleSuffix, titlesSuffix)}
                </span>
              )}
              {person.birthDate && (
                <span className="text-post-gray-600 ml-2">
                  (geb. {person.birthDate})
                </span>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Bisherige Adresse"
        icon={MapPin}
        onEdit={onEdit}
        editStep={5}
      >
        <div className="text-sm">
          <p className="font-medium">
            {formData.oldAddress.street} {formData.oldAddress.houseNumber}
            {formData.oldAddress.doorNumber &&
              `/${formData.oldAddress.doorNumber}`}
          </p>
          <p>
            {formData.oldAddress.plz} {formData.oldAddress.city}
          </p>
        </div>
      </SectionCard>

      <SectionCard
        title="Neue Adresse"
        icon={MapPin}
        onEdit={onEdit}
        editStep={6}
      >
        <div className="text-sm">
          {formData.newAddress.careOf && (
            <p className="text-post-gray-600">c/o {formData.newAddress.careOf}</p>
          )}
          <p className="font-medium">
            {formData.newAddress.street} {formData.newAddress.houseNumber}
            {formData.newAddress.doorNumber &&
              `/${formData.newAddress.doorNumber}`}
          </p>
          <p>
            {formData.newAddress.plz} {formData.newAddress.city}
          </p>
        </div>
      </SectionCard>

      <SectionCard
        title="Sendungsarten"
        icon={Package}
        onEdit={onEdit}
        editStep={7}
      >
        <div className="flex flex-wrap gap-2">
          {mailTypes.included.map((type) => (
            <span
              key={type.id}
              className="px-3 py-1 bg-post-gray-100 rounded-full text-sm"
            >
              {type.label}
            </span>
          ))}
          {formData.mailTypes.pakete && (
            <span className="px-3 py-1 bg-post-yellow rounded-full text-sm font-medium">
              Pakete
            </span>
          )}
          {formData.mailTypes.express && (
            <span className="px-3 py-1 bg-post-yellow rounded-full text-sm font-medium">
              Post Express
            </span>
          )}
        </div>
      </SectionCard>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => onEdit(7)}>
          Zurück
        </Button>
        <Button onClick={handleSubmit} loading={isSubmitting}>
          Auftrag speichern
        </Button>
      </div>
    </div>
  );
};
