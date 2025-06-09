
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  username: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize admin user if it doesn't exist
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = users.find((u: any) => u.isAdmin === true);
    
    if (!adminExists) {
      const adminUser = {
        id: 'admin-1',
        name: 'Administrator',
        username: 'admin',
        phone: '0961645755',
        password: 'admin123',
        isAdmin: true
      };
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      // Update existing admin phone number if different
      const adminIndex = users.findIndex((u: any) => u.isAdmin === true);
      if (adminIndex !== -1 && users[adminIndex].phone !== '0961645755') {
        users[adminIndex].phone = '0961645755';
        localStorage.setItem('users', JSON.stringify(users));
      }
    }

    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in production, this would be a real API
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => 
        (u.username === username || u.phone === username) && u.password === password
      );

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          username: foundUser.username,
          phone: foundUser.phone,
          isAdmin: foundUser.isAdmin || false
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username or phone already exists
      const existingUser = users.find((u: any) => 
        u.username === userData.username || u.phone === userData.phone
      );
      
      if (existingUser) {
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        isAdmin: false
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const userDataForAuth = {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        phone: newUser.phone,
        isAdmin: false
      };
      
      setUser(userDataForAuth);
      localStorage.setItem('user', JSON.stringify(userDataForAuth));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
