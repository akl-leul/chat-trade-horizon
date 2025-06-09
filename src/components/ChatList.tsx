
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
}

interface ChatListProps {
  currentChatUserId?: string;
}

const ChatList = ({ currentChatUserId }: ChatListProps) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all users except current user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const otherUsers = users.filter((u: User) => u.id !== user?.id);
    setAllUsers(otherUsers);
    setFilteredUsers(otherUsers);
  }, [user]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(allUsers);
      return;
    }

    const filtered = allUsers.filter(u => 
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, allUsers]);

  const startChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const getLastMessage = (userId: string) => {
    const chatKey = [user?.id, userId].sort().join('-');
    const messages = JSON.parse(localStorage.getItem(`chat-${chatKey}`) || '[]');
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

  return (
    <Card className="glass-effect border-white/20 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageSquare className="w-5 h-5" />
          Chats
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -y-1/2 w-4 h-4 text-foreground/50" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/20"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-1 p-4 pt-0">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-foreground/60">
                {searchTerm ? 'No users found' : 'No users available'}
              </div>
            ) : (
              filteredUsers.map((chatUser) => {
                const lastMessage = getLastMessage(chatUser.id);
                const isActive = currentChatUserId === chatUser.id;
                
                return (
                  <Button
                    key={chatUser.id}
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto ${
                      isActive 
                        ? 'bg-primary/20 border border-primary/30' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => startChat(chatUser.id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold truncate">{chatUser.name}</p>
                          {lastMessage && (
                            <span className="text-xs text-foreground/60">
                              {new Date(lastMessage.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground/60 truncate">@{chatUser.username}</p>
                        {lastMessage && (
                          <p className="text-sm text-foreground/50 truncate mt-1">
                            {lastMessage.senderId === user?.id ? 'You: ' : ''}
                            {lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </Button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatList;
