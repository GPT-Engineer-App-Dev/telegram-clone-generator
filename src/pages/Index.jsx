import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const sampleChats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "10:30 AM",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Let's catch up later.",
    timestamp: "9:15 AM",
    avatar: "/placeholder.svg",
  },
];

const sampleMessages = [
  {
    id: 1,
    content: "Hello!",
    timestamp: "10:00 AM",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    content: "Hi, how are you?",
    timestamp: "10:05 AM",
    avatar: "/placeholder.svg",
  },
];

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(sampleChats[0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: messages.length + 1,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      avatar: "/placeholder.svg",
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r">
        <div className="flex items-center p-4 border-b">
          <Avatar className="mr-2">
            <AvatarImage src="/placeholder.svg" alt="App Logo" />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-semibold">TeleClone</h1>
        </div>
        <div className="p-4">
          <Input placeholder="Search" />
        </div>
        <ScrollArea className="flex-1 p-4">
          {sampleChats.map((chat) => (
            <Card
              key={chat.id}
              className="mb-4 cursor-pointer"
              onClick={() => setSelectedChat(chat)}
            >
              <CardContent className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{chat.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {chat.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {chat.timestamp}
                </span>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="w-2/3 flex flex-col">
        <div className="flex items-center p-4 border-b">
          <Avatar className="mr-2">
            <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
            <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-4 flex items-start">
              <Avatar className="mr-2">
                <AvatarImage src={msg.avatar} alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="bg-muted p-2 rounded-lg">{msg.content}</p>
                <span className="text-xs text-muted-foreground">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t flex items-center">
          <Input
            className="flex-1 mr-2"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5l7.5 7.5L21 3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;