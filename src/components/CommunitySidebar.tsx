import { User } from "firebase/auth";

interface Props {
  user: User;
  onLogout: () => void;
}

export default function CommunitySidebar({ user, onLogout }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-6 px-4 sm:px-6 md:px-8 w-full max-w-xs">
      {/* Avatar */}
      <div className="relative">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-cyan-400/50 overflow-hidden shadow-lg">
          <img
            src={user.photoURL || "/imgs/avatar-placeholder.png"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Indicador de estado */}
        <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border border-black shadow" />
      </div>

      {/* Información */}
      <div>
        <p className="text-cyan-300 font-semibold text-sm sm:text-base truncate">
          {user.displayName || "@usuario"}
        </p>
        <p className="text-xs text-gray-400 truncate">{user.email}</p>
      </div>

      {/* Acciones */}
      <div className="w-full flex flex-col gap-3 mt-4">
        <button className="py-2 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 transition backdrop-blur-sm shadow-md text-sm sm:text-base">
          ✏️ Editar perfil
        </button>

        <button
          onClick={onLogout}
          className="py-2 sm:py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition backdrop-blur-sm shadow-md text-sm sm:text-base"
        >
          🚪 Cerrar sesión
        </button>
      </div>
    </div>
  );
}
