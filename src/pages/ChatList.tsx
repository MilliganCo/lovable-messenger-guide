import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockChats, Chat } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, MessageCircle } from "lucide-react";

const ChatList: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = mockChats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск"
            className="pl-9 rounded-button h-10"
          />
        </div>
        <Button size="icon" className="rounded-button shrink-0">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
            <MessageCircle className="h-12 w-12 opacity-30" />
            <p className="text-sm">Пока нет чатов</p>
          </div>
        ) : (
          filtered.map((chat) => (
            <ChatItem key={chat.id} chat={chat} onClick={() => navigate(`/chat/${chat.id}`)} />
          ))
        )}
      </div>
    </div>
  );
};

const ChatItem: React.FC<{ chat: Chat; onClick: () => void }> = ({ chat, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center gap-3 px-4 py-3 hover:bg-surface transition-colors text-left"
  >
    <div className="relative">
      <Avatar className="h-12 w-12">
        <AvatarFallback className="bg-primary/20 text-primary-foreground font-semibold text-sm">
          {chat.initials}
        </AvatarFallback>
      </Avatar>
      {chat.online && (
        <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-primary border-2 border-background" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm text-foreground truncate">{chat.name}</span>
        <span className="text-xs text-muted-foreground shrink-0 ml-2">{chat.time}</span>
      </div>
      <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
    </div>
    {chat.unread > 0 && (
      <Badge className="bg-primary text-primary-foreground rounded-full h-5 min-w-5 flex items-center justify-center text-xs px-1.5">
        {chat.unread}
      </Badge>
    )}
  </button>
);

export default ChatList;
