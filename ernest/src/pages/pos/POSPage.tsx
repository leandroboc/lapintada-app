import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import { Search, Trash2, CreditCard, Banknote, QrCode, LogOut, Package } from 'lucide-react';

// Mock Products
const PRODUCTS = [
  { id: 1, name: "Pipeta Anti-pulgas 10kg", price: 15000, category: "Farmacia", color: "bg-blue-100" },
  { id: 2, name: "Alimento Premium 15kg", price: 45000, category: "Alimento", color: "bg-orange-100" },
  { id: 3, name: "Juguete Hueso Goma", price: 3500, category: "Accesorios", color: "bg-green-100" },
  { id: 4, name: "Collar Antiparasitario", price: 12000, category: "Farmacia", color: "bg-blue-100" },
  { id: 5, name: "Shampoo Hipoalergénico", price: 8500, category: "Higiene", color: "bg-purple-100" },
  { id: 6, name: "Lata Paté Perro", price: 2500, category: "Alimento", color: "bg-orange-100" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const POSPage = () => {
  const { user, logout } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* SECCIÓN IZQUIERDA: PRODUCTOS */}
      <div className="flex-1 flex flex-col p-6 gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Punto de Venta</h1>
            <p className="text-sm text-gray-500">Sucursal: {user?.clinicId || 'Central'} • Cajero: {user?.name}</p>
          </div>
          <Button variant="ghost" onClick={logout} className="text-red-500">
            <LogOut className="mr-2 h-4 w-4" /> Salir
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <Input 
            className="pl-12 h-12 text-lg rounded-2xl border-gray-200 shadow-sm" 
            placeholder="Buscar producto..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories / Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="flex flex-col items-start p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left group"
              >
                <div className={`h-12 w-12 rounded-xl ${product.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Package className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                <span className="text-sm text-gray-500 mt-1">{formatCurrency(product.price)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECCIÓN DERECHA: TICKET / CARRITO */}
      <div className="w-[400px] bg-white border-l border-gray-200 flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold">Orden Actual</h2>
          <p className="text-sm text-gray-400">Ticket #00423</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <Package className="h-16 w-16 opacity-20" />
              <p>El carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">{formatCurrency(item.price * item.quantity)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span className="text-2xl">{formatCurrency(total)}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button className="flex flex-col items-center justify-center h-20 bg-green-600 hover:bg-green-700 p-0 gap-1">
              <Banknote className="h-6 w-6" />
              <span className="text-xs">Efectivo</span>
            </Button>
            <Button className="flex flex-col items-center justify-center h-20 bg-blue-600 hover:bg-blue-700 p-0 gap-1">
              <CreditCard className="h-6 w-6" />
              <span className="text-xs">Tarjeta</span>
            </Button>
            <Button className="flex flex-col items-center justify-center h-20 bg-black hover:bg-gray-800 p-0 gap-1">
              <QrCode className="h-6 w-6" />
              <span className="text-xs">QR</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
