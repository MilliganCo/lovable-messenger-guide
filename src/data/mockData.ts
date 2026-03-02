export interface Chat {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  verified: boolean;
}

export interface Message {
  id: string;
  text: string;
  time: string;
  own: boolean;
  status?: "sent" | "delivered" | "read";
}

export const mockChats: Chat[] = [
  { id: "1", name: "Алексей К.", initials: "АК", lastMessage: "Привет! Как дела с проектом?", time: "14:32", unread: 3, online: true, verified: true },
  { id: "2", name: "Мария С.", initials: "МС", lastMessage: "Документы отправила на почту", time: "13:15", unread: 1, online: false, verified: true },
  { id: "3", name: "Дмитрий В.", initials: "ДВ", lastMessage: "Созвон в 16:00, не забудь", time: "12:40", unread: 0, online: true, verified: false },
  { id: "4", name: "Елена П.", initials: "ЕП", lastMessage: "Спасибо за помощь! 🙏", time: "вчера", unread: 0, online: false, verified: true },
  { id: "5", name: "Иван Р.", initials: "ИР", lastMessage: "Посмотри новый дизайн", time: "вчера", unread: 0, online: false, verified: false },
  { id: "6", name: "Ольга Н.", initials: "ОН", lastMessage: "Файлы загружены в облако", time: "пн", unread: 5, online: true, verified: true },
  { id: "7", name: "Команда дизайн", initials: "КД", lastMessage: "Макеты утвердили ✅", time: "пн", unread: 0, online: false, verified: false },
];

export const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", text: "Привет! Как дела с проектом?", time: "14:30", own: false },
    { id: "m2", text: "Привет! Всё отлично, заканчиваю дизайн", time: "14:31", own: true, status: "read" },
    { id: "m3", text: "Классно! Покажешь макеты сегодня?", time: "14:31", own: false },
    { id: "m4", text: "Да, скину через час примерно", time: "14:32", own: true, status: "delivered" },
    { id: "m5", text: "Отлично, жду! 👍", time: "14:32", own: false },
    { id: "m6", text: "Кстати, заказчик попросил добавить тёмную тему", time: "14:33", own: false },
    { id: "m7", text: "Уже в процессе, там осталось немного", time: "14:34", own: true, status: "sent" },
  ],
  "2": [
    { id: "m1", text: "Документы готовы?", time: "13:10", own: true, status: "read" },
    { id: "m2", text: "Да, сейчас отправлю", time: "13:12", own: false },
    { id: "m3", text: "Документы отправила на почту", time: "13:15", own: false },
  ],
};

export const currentUser = {
  name: "Артём М.",
  initials: "АМ",
  email: "artem@example.com",
  nickname: "artem_m",
};
