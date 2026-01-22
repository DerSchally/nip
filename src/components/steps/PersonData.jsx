import { UserPlus, Trash2 } from "lucide-react";
import { Button, Input, Select, Radio, RadioGroup } from "../ui";
import { titlesPrefix, titlesSuffix } from "../../data/titles";
import { anredeOptions } from "../../data/mockData";

const PersonForm = ({ person, onUpdate, onRemove, canRemove }) => {
  const isFirma = person.anrede === "firma";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-post-black">
          {canRemove ? `Person ${person.id}` : "Antragsteller"}
        </h3>
        {canRemove && (
          <button
            onClick={onRemove}
            className="text-post-red hover:text-red-700 flex items-center gap-1 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Entfernen
          </button>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-post-black block mb-3">
          Anrede <span className="text-post-red">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {anredeOptions.map((option) => (
            <label
              key={option.value}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-md border cursor-pointer
                transition-all duration-200
                ${
                  person.anrede === option.value
                    ? "border-post-yellow bg-yellow-50"
                    : "border-post-gray-200 bg-white hover:border-post-gray-400"
                }
              `}
            >
              <input
                type="radio"
                name={`anrede-${person.id}`}
                value={option.value}
                checked={person.anrede === option.value}
                onChange={() => onUpdate("anrede", option.value)}
                className="sr-only"
              />
              <span className="font-medium text-post-black">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {isFirma ? (
        <Input
          label="Firmenname"
          value={person.companyName}
          onChange={(val) => onUpdate("companyName", val)}
          placeholder="Musterfirma GmbH"
          maxLength={100}
          required
        />
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label="Titel vorangestellt"
              value={person.titlePrefix}
              onChange={(val) => onUpdate("titlePrefix", val)}
              options={titlesPrefix}
            />
            <Select
              label="Titel nachgestellt"
              value={person.titleSuffix}
              onChange={(val) => onUpdate("titleSuffix", val)}
              options={titlesSuffix}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nachname"
              value={person.lastName}
              onChange={(val) => onUpdate("lastName", val)}
              placeholder="Muster"
              maxLength={50}
              required
            />
            <Input
              label="Vorname"
              value={person.firstName}
              onChange={(val) => onUpdate("firstName", val)}
              placeholder="Max"
              maxLength={50}
              required
            />
          </div>

          <Input
            label="Geburtsdatum"
            value={person.birthDate}
            onChange={(val) => onUpdate("birthDate", val)}
            placeholder="TT.MM.JJJJ"
            className="md:w-1/2"
          />
        </>
      )}
    </div>
  );
};

export const PersonData = ({
  persons,
  onUpdatePerson,
  onAddPerson,
  onRemovePerson,
  onNext,
  onBack,
}) => {
  const canAddPerson = persons.length < 5;
  const firstPerson = persons[0];
  const isValid = firstPerson.anrede &&
    (firstPerson.anrede === "firma"
      ? firstPerson.companyName
      : firstPerson.lastName && firstPerson.firstName);

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-post-black">Personendaten</h2>
        <p className="text-post-gray-600">
          Geben Sie die Daten der Person(en) ein, für die nachgesendet werden soll
        </p>
      </div>

      {persons.map((person, index) => (
        <PersonForm
          key={person.id}
          person={person}
          onUpdate={(field, value) => onUpdatePerson(person.id, field, value)}
          onRemove={() => onRemovePerson(person.id)}
          canRemove={index > 0}
        />
      ))}

      {canAddPerson && (
        <button
          onClick={onAddPerson}
          className="w-full p-4 border-2 border-dashed border-post-gray-300 rounded-lg
            text-post-gray-600 hover:border-post-yellow hover:text-post-black
            flex items-center justify-center gap-2 transition-all duration-200"
        >
          <UserPlus className="w-5 h-5" />
          Weitere Person hinzufügen ({persons.length}/5)
        </button>
      )}

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
