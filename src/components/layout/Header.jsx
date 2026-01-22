import { Mail } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-post-yellow border-b-4 border-post-black">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-post-black p-2 rounded">
            <Mail className="w-6 h-6 text-post-yellow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-post-black">
              Österreichische Post
            </h1>
            <p className="text-sm text-post-black/70">Nachsende-Datenbank</p>
          </div>
        </div>
      </div>
    </header>
  );
};
