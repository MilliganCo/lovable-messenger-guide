import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { currentUser } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Monitor, Eye, EyeOff, HardDrive, ChevronRight } from "lucide-react";

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light" as const, label: "Светлая", icon: Sun },
    { value: "dark" as const, label: "Тёмная", icon: Moon },
    { value: "system" as const, label: "Системная", icon: Monitor },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Profile */}
      <div className="flex flex-col items-center gap-3 pt-8 pb-6 px-6">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="bg-primary/20 text-primary-foreground font-bold text-xl">
            {currentUser.initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="font-bold text-lg text-foreground">{currentUser.name}</h2>
          <p className="text-sm text-muted-foreground">@{currentUser.nickname}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{currentUser.email}</p>
        </div>
      </div>

      <Separator />

      {/* Theme */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3 px-2">
          Тема оформления
        </h3>
        <div className="flex gap-2">
          {themeOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={theme === opt.value ? "default" : "outline"}
              className="flex-1 rounded-button gap-2 h-10"
              onClick={() => setTheme(opt.value)}
            >
              <opt.icon className="h-4 w-4" />
              <span className="text-xs">{opt.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Privacy */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3 px-2">
          Приватность
        </h3>
        <div className="space-y-1">
          <SettingsToggle
            icon={EyeOff}
            label="Скрыть «был(а) в сети»"
            defaultChecked={false}
          />
          <SettingsToggle
            icon={Eye}
            label="Скрыть статус онлайн"
            defaultChecked={false}
          />
        </div>
      </div>

      <Separator />

      {/* Storage (decorative) */}
      <div className="px-4 py-4">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3 px-2">
          Хранилище
        </h3>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 hover:bg-surface transition-colors">
          <HardDrive className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-foreground">Использовано: 128 МБ</p>
            <p className="text-xs text-muted-foreground">Фото, видео, файлы</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

const SettingsToggle: React.FC<{
  icon: React.FC<{ className?: string }>;
  label: string;
  defaultChecked: boolean;
}> = ({ icon: Icon, label, defaultChecked }) => {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <label className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-surface transition-colors cursor-pointer">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="flex-1 text-sm text-foreground">{label}</span>
      <Switch checked={checked} onCheckedChange={setChecked} />
    </label>
  );
};

export default Settings;
