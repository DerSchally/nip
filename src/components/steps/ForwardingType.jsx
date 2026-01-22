import { Button, Radio, RadioGroup } from "../ui";
import { forwardingTypes } from "../../data/mockData";

export const ForwardingType = ({
  value,
  onChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-post-black mb-2">
          Grund der Nachsendung
        </h2>
        <p className="text-post-gray-600 mb-6">
          Wählen Sie den Grund für Ihren Nachsendeauftrag
        </p>

        <RadioGroup>
          {forwardingTypes.map((type) => (
            <Radio
              key={type.id}
              name="forwardingType"
              value={type.id}
              checked={value === type.id}
              onChange={onChange}
              label={type.label}
              description={type.description}
            />
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onNext} disabled={!value}>
          Weiter
        </Button>
      </div>
    </div>
  );
};
