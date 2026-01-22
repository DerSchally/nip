import { Button, Checkbox } from "../ui";
import { mailTypes } from "../../data/mockData";
import { Info } from "lucide-react";

export const MailTypes = ({
  selectedTypes,
  onUpdate,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-post-black mb-2">
          Sendungsarten
        </h2>
        <p className="text-post-gray-600 mb-6">
          Folgende Sendungsarten werden nachgesendet
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-post-gray-600 uppercase tracking-wide mb-3">
              Im Grundpreis enthalten
            </h3>
            <div className="bg-post-gray-100 rounded-lg p-2">
              {mailTypes.included.map((type) => (
                <Checkbox
                  key={type.id}
                  label={type.label}
                  checked={type.checked}
                  disabled={type.disabled}
                  onChange={() => {}}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-post-gray-600 uppercase tracking-wide mb-3">
              Zusätzliche Optionen (gegen Aufpreis)
            </h3>
            <div className="border border-post-gray-200 rounded-lg p-2">
              {mailTypes.optional.map((type) => (
                <Checkbox
                  key={type.id}
                  label={type.label}
                  checked={selectedTypes[type.id] || false}
                  onChange={(checked) => onUpdate(type.id, !selectedTypes[type.id])}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Hinweis:</p>
            <p className="mt-1">
              Für die zusätzlichen Sendungsarten wird eine separate Pauschale
              berechnet. Die genauen Kosten werden in der Zusammenfassung
              angezeigt.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onNext}>Weiter</Button>
      </div>
    </div>
  );
};
