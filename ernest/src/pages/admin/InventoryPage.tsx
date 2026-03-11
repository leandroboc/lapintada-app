import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Plus, Filter } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

// Mock Data
const PRODUCTS = [
  { id: 1, name: "Pipeta Anti-pulgas 10kg", price: 15000, stock_a: 10, stock_b: 5 },
  { id: 2, name: "Alimento Balanceado Premium 15kg", price: 45000, stock_a: 2, stock_b: 12 },
  { id: 3, name: "Shampoo Hipoalergénico", price: 8500, stock_a: 0, stock_b: 8 },
  { id: 4, name: "Vacuna Quintuple", price: 12000, stock_a: 50, stock_b: 45 },
];

export const InventoryPage = () => {
  const { canAccessAllClinics } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
          <p className="text-muted-foreground">
            {canAccessAllClinics 
              ? "Gestión global de productos y precios" 
              : "Control de stock local"}
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por nombre o código..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Producto</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Precio</th>
                  
                  {canAccessAllClinics ? (
                    <>
                      <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Sucursal Norte</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Sucursal Centro</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Total Global</th>
                    </>
                  ) : (
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Stock Disponible</th>
                  )}
                  
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {PRODUCTS.map((product) => (
                  <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{product.name}</td>
                    <td className="p-4 align-middle">{formatCurrency(product.price)}</td>
                    
                    {canAccessAllClinics ? (
                      <>
                        <td className="p-4 align-middle text-center">
                          <span className={product.stock_a < 5 ? "text-red-500 font-bold" : ""}>
                            {product.stock_a}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-center">
                          <span className={product.stock_b < 5 ? "text-red-500 font-bold" : ""}>
                            {product.stock_b}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-right font-bold">
                          {product.stock_a + product.stock_b}
                        </td>
                      </>
                    ) : (
                      <td className="p-4 align-middle text-right">
                        <span className={product.stock_a < 5 ? "text-red-500 font-bold" : ""}>
                          {product.stock_a} u.
                        </span>
                      </td>
                    )}
                    
                    <td className="p-4 align-middle text-right">
                      <Button variant="ghost" size="sm">Editar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
