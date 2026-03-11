import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { InventoryPage } from './pages/admin/InventoryPage';
import { PatientsPage } from './pages/clinical/PatientsPage';

import { SplitLandingPage } from './pages/public/SplitLandingPage';
import { BranchNorthPage } from './pages/public/BranchNorthPage';
import { BranchCenterPage } from './pages/public/BranchCenterPage';
import { POSPage } from './pages/pos/POSPage';

const LoginScreen = () => {
  const { login, user } = useAuth();
  
  if (user) {
    if (user.role === 'cashier') return <Navigate to="/pos" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">VetSystem</h2>
          <p className="mt-2 text-sm text-gray-600">Acceso Seguro al Sistema</p>
        </div>
        <div className="space-y-4 mt-8">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Simular Acceso Dueño</div>
          <button
            onClick={() => login('owner')}
            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-all shadow-md"
          >
            Ingresar como DUEÑO (Ve Todo)
          </button>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">Simular Empleados por Sucursal</div>
          
          <div className="grid grid-cols-2 gap-3">
             <button
                onClick={() => login('vet', 'clinic-a')}
                className="w-full rounded-xl border border-blue-200 bg-blue-50 px-2 py-3 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-all"
              >
                VET - Suc. NORTE
              </button>
              <button
                onClick={() => login('vet', 'clinic-b')}
                className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-2 py-3 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-all"
              >
                VET - Suc. CENTRO
              </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button
                onClick={() => login('cashier', 'clinic-a')}
                className="w-full rounded-xl bg-blue-600 px-2 py-3 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-sm"
              >
                CAJERO - NORTE
              </button>
              <button
                onClick={() => login('cashier', 'clinic-b')}
                className="w-full rounded-xl bg-emerald-600 px-2 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-all shadow-sm"
              >
                CAJERO - CENTRO
              </button>
          </div>
        </div>
        <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-black">← Volver al Inicio</Link>
        </div>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
     if (user.role === 'cashier') return <Navigate to="/pos" replace />;
     return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* RUTAS PÚBLICAS NUEVAS */}
          <Route path="/" element={<SplitLandingPage />} />
          <Route path="/norte" element={<BranchNorthPage />} />
          <Route path="/centro" element={<BranchCenterPage />} />
          
          <Route path="/login" element={<LoginScreen />} />

          {/* RUTA POS (CAJERO) - Layout Exclusivo */}
          <Route path="/pos" element={
            <PrivateRoute allowedRoles={['cashier', 'owner']}>
              <POSPage />
            </PrivateRoute>
          } />
          
          {/* RUTAS ADMIN (DUEÑO/VET) - Main Layout */}
          <Route path="/dashboard" element={
            <PrivateRoute allowedRoles={['owner', 'vet']}>
              <MainLayout />
            </PrivateRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="clinical" element={<div className="p-8">Módulo Clínico (En construcción)</div>} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
