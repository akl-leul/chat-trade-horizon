
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
        <Card className="glass-effect border-white/20 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              {chatPartner ? `Chat with ${chatPartner.name}` : 'Chat'}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="h-96 overflow-y-auto mb-4 p-4 bg-white/5 rounded-lg">
              {messages.length === 0 ? (
                <p className="text-center text-foreground/60">
                  {chatPartner ? `Start a conversation with ${chatPartner.name}` : 'Select a user to start chatting'}
                </p>
              ) : (
                messages.map((message) => (
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
                ))
              )}
            </div>

            {chatPartner && (
              <div className="flex gap-2">
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
  );
};

export default Chat;
