import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DollarSign, Users, Activity, Package } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const DashboardPage = () => {
  const { user, canAccessAllClinics } = useAuth();

  const stats = [
    {
      title: "Ingresos Hoy",
      value: canAccessAllClinics ? 150000 : 45000,
      icon: DollarSign,
      desc: canAccessAllClinics ? "Total de todas las sucursales" : "Sucursal Norte"
    },
    {
      title: "Pacientes Atendidos",
      value: canAccessAllClinics ? 24 : 8,
      icon: Users,
      desc: "En las últimas 24hs"
    },
    {
      title: "Turnos Pendientes",
      value: 5,
      icon: Activity,
      desc: "Próxima hora"
    },
    {
      title: "Alertas de Stock",
      value: canAccessAllClinics ? 12 : 3,
      icon: Package,
      desc: "Productos con bajo stock"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hola, {user?.name}</h2>
        <p className="text-muted-foreground">
          {canAccessAllClinics 
            ? "Vista General de Administración (Modo Dueño)" 
            : "Panel de Control - Sucursal Norte"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.title.includes("Ingresos") ? formatCurrency(stat.value) : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Turnos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Max (Golden Retriever)</p>
                    <p className="text-sm text-muted-foreground">Vacunación - Dra. Ana</p>
                  </div>
                  <div className="ml-auto font-medium">Hace 2h</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
             <div className="flex items-center gap-4 rounded-md border p-4">
               <div className="flex-1 space-y-1">
                 <p className="text-sm font-medium leading-none">Nueva Consulta</p>
                 <p className="text-sm text-muted-foreground">Iniciar ficha médica</p>
               </div>
             </div>
             <div className="flex items-center gap-4 rounded-md border p-4">
               <div className="flex-1 space-y-1">
                 <p className="text-sm font-medium leading-none">Registrar Venta</p>
                 <p className="text-sm text-muted-foreground">Facturación rápida</p>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
