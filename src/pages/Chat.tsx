
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ChatList from '@/components/ChatList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const { user } = useAuth();
  const { userId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatPartner, setChatPartner] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userId) {
      // Load chat partner info
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const partner = users.find((u: any) => u.id === userId);
      setChatPartner(partner);

      // Load existing messages for this chat
      const chatKey = [user?.id, userId].sort().join('-');
      const existingMessages = JSON.parse(localStorage.getItem(`chat-${chatKey}`) || '[]');
      setMessages(existingMessages);
    } else {
      setChatPartner(null);
      setMessages([]);
    }
  }, [userId, user]);

  const sendMessage = () => {
    if (!newMessage.trim() || !userId || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      content: newMessage.trim(),
      timestamp: new Date()
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    // Save to localStorage
    const chatKey = [user.id, userId].sort().join('-');
    localStorage.setItem(`chat-${chatKey}`, JSON.stringify(updatedMessages));

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Chat List - Left Side */}
          <div className="lg:col-span-1">
            <ChatList currentChatUserId={userId} />
          </div>

          {/* Chat Window - Right Side */}
          <div className="lg:col-span-3">
            <Card className="glass-effect border-white/20 h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  {chatPartner ? `Chat with ${chatPartner.name}` : 'Select a user to start chatting'}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-4">
                {/* Messages Area */}
                <ScrollArea className="flex-1 mb-4 p-4 bg-white/5 rounded-lg">
                  {!userId ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-center text-foreground/60">
                        Select a user from the chat list to start a conversation
                      </p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-center text-foreground/60">
                        Start a conversation with {chatPartner?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md xl:max-w-lg p-3 rounded-lg ${
                              message.senderId === user?.id
                                ? 'bg-primary/20 text-right border border-primary/30'
                                : 'bg-white/10 border border-white/10'
                            }`}
                          >
                            <p className="text-sm font-semibold text-foreground/80 mb-1">
                              {message.senderName}
                            </p>
                            <p className="text-foreground break-words">{message.content}</p>
                            <p className="text-xs text-foreground/60 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                {chatPartner && (
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="bg-white/5 border-white/20"
                      onKeyPress={handleKeyPress}
                    />
                    <Button 
                      onClick={sendMessage} 
                      className="bg-primary hover:bg-primary/90"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
