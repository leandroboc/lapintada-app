import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos definidos aquí por simplicidad, luego mover a src/types
export type UserRole = 'owner' | 'vet' | 'admin' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clinicId?: string; // Si es null y es owner, ve todo. Si es vet, solo ve su clínica.
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (role: UserRole, specificClinicId?: string) => void;
  logout: () => void;
  canAccessAllClinics: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de sesión
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole, specificClinicId?: string) => {
    // MOCK LOGIN para DEMO
    let mockUser: User;
    
    if (role === 'owner') {
      mockUser = {
        id: 'owner-123',
        name: 'Dr. Dueño General',
        email: 'admin@veterinaria.com',
        role: 'owner',
        clinicId: undefined // Ve todo
      };
    } else if (role === 'cashier') {
      mockUser = {
        id: specificClinicId === 'clinic-b' ? 'cashier-456' : 'cashier-123',
        name: specificClinicId === 'clinic-b' ? 'Cajero Centro' : 'Cajero Norte',
        email: 'caja@veterinaria.com',
        role: 'cashier',
        clinicId: specificClinicId || 'clinic-a'
      };
    } else {
      // VETERINARIO
      mockUser = {
        id: specificClinicId === 'clinic-b' ? 'vet-456' : 'vet-123',
        name: specificClinicId === 'clinic-b' ? 'Dr. Especialista Gatos' : 'Dra. Sucursal Norte',
        email: specificClinicId === 'clinic-b' ? 'centro@veterinaria.com' : 'norte@veterinaria.com',
        role: 'vet',
        clinicId: specificClinicId || 'clinic-a'
      };
    }

    setUser(mockUser);
    localStorage.setItem('demo_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demo_user');
  };

  const canAccessAllClinics = user?.role === 'owner';

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, canAccessAllClinics }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
