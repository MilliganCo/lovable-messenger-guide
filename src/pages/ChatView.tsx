import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockChats, mockMessages, Message } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ArrowLeft, Phone, Video, Shield, Send, Paperclip, Check, CheckCheck, Copy, Reply, Trash2 } from "lucide-react";

const ChatView: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const chat = mockChats.find((c) => c.id === chatId);
  const [messages, setMessages] = useState<Message[]>(
    mockMessages[chatId || ""] || []
  );
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  if (!chat) {
    navigate("/chats");
    return null;
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: input.trim(),
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      own: true,
      status: "sent",
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-3 border-b border-border bg-card">
        <Button variant="ghost" size="icon" onClick={() => navigate("/chats")} className="rounded-button shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/20 text-primary-foreground font-semibold text-xs">
            {chat.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-foreground truncate">{chat.name}</span>
            {chat.verified && <Shield className="h-4 w-4 text-primary shrink-0" />}
          </div>
          <span className="text-xs text-muted-foreground">
            {chat.online ? "в сети" : "был(а) недавно"}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-button">
          <Phone className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-button">
          <Video className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-border bg-card">
        <Button variant="ghost" size="icon" className="rounded-button shrink-0">
          <Paperclip className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Сообщение..."
          className="rounded-bubble h-10 flex-1"
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim()}
          className="rounded-button shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const StatusIcon = () => {
    if (!message.own) return null;
    if (message.status === "read") return <CheckCheck className="h-3.5 w-3.5 text-primary" />;
    if (message.status === "delivered") return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />;
    return <Check className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className={`flex ${message.own ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[75%] rounded-bubble px-4 py-2.5 ${
              message.own
                ? "bg-bubble-own text-bubble-own-foreground"
                : "bg-bubble-other text-bubble-other-foreground"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.text}</p>
            <div className={`flex items-center gap-1 mt-1 ${message.own ? "justify-end" : ""}`}>
              <span className="text-[10px] opacity-60">{message.time}</span>
              <StatusIcon />
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="gap-2">
          <Copy className="h-4 w-4" /> Копировать
        </ContextMenuItem>
        <ContextMenuItem className="gap-2">
          <Reply className="h-4 w-4" /> Ответить
        </ContextMenuItem>
        <ContextMenuItem className="gap-2 text-destructive">
          <Trash2 className="h-4 w-4" /> Удалить
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ChatView;
