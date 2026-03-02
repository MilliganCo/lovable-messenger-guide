import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Shield, MessageCircle, Lock, ArrowRight, ArrowLeft } from "lucide-react";

const steps = ["welcome", "invite", "register"] as const;

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const [inviteCode, setInviteCode] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const { setOnboarded } = useApp();
  const navigate = useNavigate();

  const progress = ((step + 1) / steps.length) * 100;

  const handleFinish = () => {
    setOnboarded(true);
    navigate("/chats");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Progress value={progress} className="h-1 rounded-none" />

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {step === 0 && (
          <div className="animate-fade-in flex w-full max-w-sm flex-col items-center text-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] bg-primary">
              <MessageCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Безопасный мессенджер
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Общайтесь приватно. End-to-end шифрование, верификация контактов и полный контроль над данными.
            </p>
            <div className="flex flex-col gap-3 w-full mt-4">
              <div className="flex items-center gap-3 rounded-lg bg-surface p-3">
                <Shield className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-foreground">E2E шифрование по умолчанию</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-surface p-3">
                <Lock className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-foreground">Контроль приватности</span>
              </div>
            </div>
            <Button
              onClick={() => setStep(1)}
              className="mt-6 w-full rounded-button gap-2"
              size="lg"
            >
              Начать
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in flex w-full max-w-sm flex-col items-center text-center gap-6">
            <h2 className="text-2xl font-bold text-foreground">Invite-код</h2>
            <p className="text-muted-foreground">
              Введите код приглашения для доступа к мессенджеру
            </p>
            <Input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="XXXX-XXXX"
              className="text-center text-lg tracking-widest rounded-button h-12"
              maxLength={9}
            />
            <p className="text-xs text-muted-foreground">Подсказка: подойдёт любой код</p>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => setStep(0)}
                className="rounded-button"
                size="lg"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setStep(2)}
                disabled={inviteCode.length < 1}
                className="flex-1 rounded-button"
                size="lg"
              >
                Далее
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in flex w-full max-w-sm flex-col gap-5">
            <h2 className="text-2xl font-bold text-foreground text-center">Регистрация</h2>
            <p className="text-muted-foreground text-center">Создайте аккаунт для начала работы</p>
            <div className="flex flex-col gap-3">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="rounded-button h-12"
              />
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Никнейм"
                className="rounded-button h-12"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                type="password"
                className="rounded-button h-12"
              />
            </div>
            <div className="flex gap-3 w-full mt-2">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="rounded-button"
                size="lg"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleFinish}
                disabled={!email || !nickname || !password}
                className="flex-1 rounded-button"
                size="lg"
              >
                Создать аккаунт
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
