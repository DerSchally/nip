import { ArrowRight, Lock } from "lucide-react";
import { serviceTypes } from "../../data/mockData";

export const ServiceSelection = ({ onNext }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-post-black mb-2">
          Vorausverfügung auswählen
        </h2>
        <p className="text-post-gray-600">
          Wählen Sie die gewünschte Auftragsart
        </p>
      </div>

      <div className="grid gap-4">
        {serviceTypes.map((service) => (
          <button
            key={service.id}
            onClick={() => service.enabled && onNext()}
            disabled={!service.enabled}
            className={`
              w-full p-5 rounded-lg border-2 text-left transition-all duration-200
              flex items-center justify-between
              ${
                service.highlight
                  ? "border-post-yellow bg-yellow-50 hover:bg-yellow-100"
                  : service.enabled
                    ? "border-post-gray-200 bg-white hover:border-post-gray-400"
                    : "border-post-gray-200 bg-post-gray-100 cursor-not-allowed opacity-60"
              }
            `}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-post-black">
                  {service.id}
                </span>
                <span className="font-medium text-post-black">
                  {service.name}
                </span>
                {service.highlight && (
                  <span className="px-2 py-0.5 bg-post-yellow text-post-black text-xs font-bold rounded">
                    DEMO
                  </span>
                )}
              </div>
              {service.description && (
                <p className="text-sm text-post-gray-600 mt-1">
                  {service.description}
                </p>
              )}
            </div>
            <div>
              {service.enabled ? (
                <ArrowRight className="w-5 h-5 text-post-gray-400" />
              ) : (
                <Lock className="w-5 h-5 text-post-gray-400" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
