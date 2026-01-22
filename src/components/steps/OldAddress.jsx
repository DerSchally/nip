import { useState } from "react";
import { Button, Input } from "../ui";
import { getCityByPLZ } from "../../data/plzDatabase";
import { AlertCircle } from "lucide-react";

export const OldAddress = ({
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
          Bisherige Adresse
        </h2>
        <p className="text-post-gray-600 mb-6">
          Geben Sie die Adresse ein, von der nachgesendet werden soll
        </p>

        <div className="space-y-4">
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
