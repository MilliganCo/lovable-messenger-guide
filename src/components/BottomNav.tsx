import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MessageCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav: React.FC = () => {
  const location = useLocation();

  // Don't show on onboarding or individual chat
  if (location.pathname === "/" || location.pathname.startsWith("/chat/")) return null;

  const links = [
    { to: "/chats", label: "Чаты", icon: MessageCircle },
    { to: "/settings", label: "Настройки", icon: Settings },
  ];

  return (
    <nav className="flex border-t border-border bg-card">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )
          }
        >
          <link.icon className="h-5 w-5" />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
