import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Dog, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Stethoscope,
  Building2
} from 'lucide-react';

export const Sidebar = () => {
  const { user, canAccessAllClinics, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Dog, label: 'Pacientes', path: '/dashboard/patients' },
    { icon: Stethoscope, label: 'Clínica', path: '/dashboard/clinical' },
    { icon: ShoppingBag, label: 'Inventario', path: '/dashboard/inventory' },
  ];

  if (canAccessAllClinics) {
    menuItems.push({ icon: Building2, label: 'Sucursales', path: '/dashboard/clinics' });
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Dog size={20} />
        </div>
        <span className="text-lg font-bold">VetSystem</span>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive(item.path)
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="mt-auto border-t pt-4">
        <div className="mb-4 px-2">
          <p className="text-sm font-medium leading-none">{user?.name}</p>
          <p className="text-xs text-muted-foreground">{user?.role === 'owner' ? 'Dueño' : 'Veterinario'}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
