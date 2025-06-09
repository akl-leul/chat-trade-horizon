
import { useState, useEffect } from 'react';
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

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Chat List - Left Side */}
          <div className="lg:col-span-1">
            <ChatList currentChatUserId={userId} />
          </div>

          {/* Chat Window - Right Side */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-white/20 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  {chatPartner ? `Chat with ${chatPartner.name}` : 'Select a user to start chatting'}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
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
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`mb-3 p-3 rounded-lg max-w-xs ${
                            message.senderId === user?.id
                              ? 'ml-auto bg-primary/20 text-right'
                              : 'mr-auto bg-white/10'
                          }`}
                        >
                          <p className="text-sm font-semibold text-foreground/80">
                            {message.senderName}
                          </p>
                          <p className="text-foreground">{message.content}</p>
                          <p className="text-xs text-foreground/60 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                {chatPartner && (
                  <div className="flex gap-2 mt-auto">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="bg-white/5 border-white/20"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} className="bg-primary hover:bg-primary/90">
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
