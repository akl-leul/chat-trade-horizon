
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Trash2, Edit, Plus, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
  isAdmin?: boolean;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: '', username: '', phone: '', password: '' });
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(allUsers);
  };

  const deleteUser = (userId: string) => {
    if (userId === user?.id) {
      toast({
        title: "Error",
        description: "You cannot delete your own account",
        variant: "destructive",
      });
      return;
    }

    const updatedUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    toast({
      title: "User deleted",
      description: "User has been successfully removed",
    });
  };

  const updateUser = (updatedUser: User) => {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = allUsers.findIndex((u: User) => u.id === updatedUser.id);
    
    if (userIndex !== -1) {
      allUsers[userIndex] = { ...allUsers[userIndex], ...updatedUser };
      localStorage.setItem('users', JSON.stringify(allUsers));
      setUsers(allUsers);
      setEditingUser(null);
      
      toast({
        title: "User updated",
        description: "User information has been updated successfully",
      });
    }
  };

  const createUser = () => {
    if (!newUser.name || !newUser.username || !newUser.phone || !newUser.password) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = allUsers.find((u: User) => 
      u.username === newUser.username || u.phone === newUser.phone
    );

    if (existingUser) {
      toast({
        title: "Error",
        description: "Username or phone number already exists",
        variant: "destructive",
      });
      return;
    }

    const userToCreate = {
      id: Date.now().toString(),
      ...newUser,
      isAdmin: false
    };

    allUsers.push(userToCreate);
    localStorage.setItem('users', JSON.stringify(allUsers));
    setUsers(allUsers);
    setNewUser({ name: '', username: '', phone: '', password: '' });
    
    toast({
      title: "User created",
      description: "New user has been created successfully",
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold neon-text mb-2 flex items-center gap-2">
            <Shield className="w-8 h-8" />
            Admin Dashboard
          </h1>
          <p className="text-foreground/70">
            Manage users and system settings
          </p>
        </div>

        {/* Create New User */}
        <Card className="glass-effect border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="bg-white/5 border-white/20"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="bg-white/5 border-white/20"
                />
              </div>
            </div>
            <Button onClick={createUser} className="mt-4 bg-primary hover:bg-primary/90">
              Create User
            </Button>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              All Users ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((userItem) => (
                <div key={userItem.id} className="p-4 rounded-lg glass-effect border-white/10">
                  {editingUser?.id === userItem.id ? (
                    <div className="grid md:grid-cols-3 gap-4">
                      <Input
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        className="bg-white/5 border-white/20"
                      />
                      <Input
                        value={editingUser.username}
                        onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                        className="bg-white/5 border-white/20"
                      />
                      <Input
                        value={editingUser.phone}
                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                        className="bg-white/5 border-white/20"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateUser(editingUser)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingUser(null)}
                          className="border-white/20"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {userItem.name}
                          {userItem.isAdmin && (
                            <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              Admin
                            </span>
                          )}
                        </h3>
                        <p className="text-foreground/60">@{userItem.username}</p>
                        <p className="text-foreground/60">{userItem.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingUser(userItem)}
                          className="border-white/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteUser(userItem.id)}
                          disabled={userItem.id === user?.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
