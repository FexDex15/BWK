import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

import { Menu } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";

import { Page } from "../App";

interface NavbarProps {
  onNavigate: (page: Page) => void;
}

/* ✅ Rutas */
const routeList: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "music", label: "Music" },
  { page: "biography", label: "Biography" },
  { page: "snippets", label: "Snippets" },
  { page: "soundcloud", label: "SoundCloud" },
  { page: "songslore", label: "Songs Lore" },
  { page: "about", label: "About" },
  {page: "merch", label:"Merch"},
  {page: "outfits", label:'Outfits'}

];

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[#020617]/70 backdrop-blur-xl border-b border-blue-400/10" />

      <NavigationMenu className="relative z-10 mx-auto">
        <NavigationMenuList className="container h-16 px-4 w-full flex items-center justify-between">
          
          {/* Logo */}
          <NavigationMenuItem>
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 text-lg font-semibold text-white/85 hover:text-white transition"
            >
              <LogoIcon />
              BoyWithUke
            </button>
          </NavigationMenuItem>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="p-2 rounded-full hover:bg-white/5 transition">
                <Menu className="h-5 w-5 text-white/80" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-[#020617]/95 backdrop-blur-xl border-l border-blue-400/20"
              >
                <SheetHeader>
                  <SheetTitle className="text-white/90">
                    BoyWithUke
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-3 mt-6">
                  {routeList.map(({ page, label }) => (
                    <button
                      key={label}
                      onClick={() => {
                        onNavigate(page);
                        setIsOpen(false);
                      }}
                      className="text-left text-white/70 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/5"
                    >
                      {label}
                    </button>
                  ))}

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <button
                      disabled
                      className="flex items-center gap-2 text-white/40 cursor-not-allowed"
                    >
                      <GitHubLogoIcon className="w-5 h-5" />
                      Social (soon)
                    </button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop */}
          <nav className="hidden md:flex gap-6">
            {routeList.map(({ page, label }) => (
              <button
                key={label}
                onClick={() => onNavigate(page)}
                className="text-white/70 hover:text-white transition text-sm relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button disabled className="text-white/40 cursor-not-allowed">
              <GitHubLogoIcon className="w-5 h-5" />
            </button>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
