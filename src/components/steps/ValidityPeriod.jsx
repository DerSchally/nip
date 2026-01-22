import { Button, DatePicker } from "../ui";
import { Info } from "lucide-react";

export const ValidityPeriod = ({
  validFrom,
  validUntil,
  onChangeFrom,
  onChangeUntil,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-post-black mb-2">
          Gültigkeitszeitraum
        </h2>
        <p className="text-post-gray-600 mb-6">
          Legen Sie den Zeitraum für die Nachsendung fest
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <DatePicker
            label="Gültig ab"
            value={validFrom}
            onChange={onChangeFrom}
            required
          />
          <DatePicker
            label="Gültig bis"
            value={validUntil}
            onChange={onChangeUntil}
            minDate={validFrom}
            required
          />
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Hinweis zu den Daten:</p>
            <ul className="mt-1 space-y-1 list-disc list-inside">
              <li>Gültig ab: frühestens 3 Werktage ab heute</li>
              <li>Gültig bis: maximal 1 Jahr ab Gültig ab</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onNext} disabled={!validFrom || !validUntil}>
          Weiter
        </Button>
      </div>
    </div>
  );
};
