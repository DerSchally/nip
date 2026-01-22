import { useState } from "react";
import { Button, Input } from "../ui";
import { getCityByPLZ } from "../../data/plzDatabase";
import { AlertCircle, MapPin, Mail, Building } from "lucide-react";

const addressTypes = [
  { id: "address", label: "Adresse", icon: MapPin, enabled: true },
  { id: "postfach", label: "Postfach", icon: Mail, enabled: false },
  { id: "postlagernd", label: "Postlagernd", icon: Building, enabled: false },
];

export const NewAddress = ({
  address,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [plzNotFound, setPlzNotFound] = useState(false);

  const handlePlzBlur = () => {
    if (address.plz.length === 4) {
      const city = getCityByPLZ(address.plz);
      if (city) {
        onUpdate("city", city);
        setPlzNotFound(false);
      } else {
        setPlzNotFound(true);
      }
    }
  };

  const isValid = address.street && address.houseNumber && address.plz && address.city;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-post-black mb-2">
          Neue Adresse
        </h2>
        <p className="text-post-gray-600 mb-6">
          Geben Sie die Adresse ein, an die nachgesendet werden soll
        </p>

        <div className="mb-6">
          <label className="text-sm font-medium text-post-black block mb-3">
            Adresstyp
          </label>
          <div className="grid grid-cols-3 gap-3">
            {addressTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => type.enabled && onUpdate("type", type.id)}
                  disabled={!type.enabled}
                  className={`
                    p-4 rounded-lg border-2 flex flex-col items-center gap-2
                    transition-all duration-200
                    ${
                      address.type === type.id
                        ? "border-post-yellow bg-yellow-50"
                        : type.enabled
                          ? "border-post-gray-200 bg-white hover:border-post-gray-400"
                          : "border-post-gray-200 bg-post-gray-100 opacity-50 cursor-not-allowed"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{type.label}</span>
                  {!type.enabled && (
                    <span className="text-xs text-post-gray-400">Bald verfügbar</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="c/o (bei)"
            value={address.careOf}
            onChange={(val) => onUpdate("careOf", val)}
            placeholder="z.B. Familie Müller"
            maxLength={35}
          />

          <Input
            label="Straße"
            value={address.street}
            onChange={(val) => onUpdate("street", val)}
            placeholder="Musterstraße"
            maxLength={45}
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Hausnummer / Stiege"
              value={address.houseNumber}
              onChange={(val) => onUpdate("houseNumber", val)}
              placeholder="1/2/3"
              maxLength={45}
              required
            />
            <Input
              label="Türnummer"
              value={address.doorNumber}
              onChange={(val) => onUpdate("doorNumber", val)}
              placeholder="12"
              maxLength={20}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="PLZ"
              value={address.plz}
              onChange={(val) => {
                onUpdate("plz", val.replace(/\D/g, "").slice(0, 4));
                if (val.length < 4) {
                  setPlzNotFound(false);
                  onUpdate("city", "");
                }
              }}
              onBlur={handlePlzBlur}
              placeholder="1010"
              maxLength={4}
              required
            />
            <Input
              label="Ort"
              value={address.city}
              onChange={(val) => onUpdate("city", val)}
              placeholder="Wien"
              disabled={!plzNotFound && address.plz.length === 4 && address.city}
              required
            />
          </div>

          {plzNotFound && (
            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              PLZ nicht gefunden. Bitte geben Sie den Ort manuell ein.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Weiter
        </Button>
      </div>
    </div>
  );
};
