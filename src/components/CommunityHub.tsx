import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";

import CommunityLayout from "./CommunityLayout";
import CommunitySidebar from "./CommunitySidebar";
import CommunityChat from "./CommunityChat";
import CommunityBoard from "./board/CommunityBoard"; // (ya correcto, solo para consistencia)

export default function CommunityHub() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);


  const handleLogout = () => {
    // Aquí puedes agregar lógica de cierre de sesión si lo deseas
  };

  if (!user) return null;

  return (
    <CommunityLayout>
      <div className="flex flex-1 gap-6 max-w-7xl mx-auto px-4">
        {/* SIDEBAR */}

        <aside className="hidden lg:block w-64 shrink-0">
          <CommunitySidebar user={user} onLogout={handleLogout} />
        </aside>

        {/* CONTENIDO */}
        <div className="flex flex-col flex-1 gap-8">
          {/* CHAT */}

          <section>
            <CommunityChat />
          </section>

          {/* PIZARRÓN */}
          <section>
            <CommunityBoard />
          </section>
        </div>
      </div>
    </CommunityLayout>
  );
}
