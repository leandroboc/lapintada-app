import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, Plus, FileText } from 'lucide-react';

export const PatientsPage = () => {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pacientes</h2>
          <p className="text-muted-foreground">
            Historias clínicas y fichas de mascotas
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Paciente
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="Buscar por nombre, dueño o chip..." />
        <Button size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-32 bg-secondary/50 flex items-center justify-center">
                <span className="text-4xl">🐕</span>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">Firulais {i}</h3>
                  <p className="text-sm text-muted-foreground">Golden Retriever • 3 años</p>
                </div>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800">
                  Sano
                </span>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                Dueño: Juan Perez <br/>
                Última visita: 10/10/2023
              </div>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Ver Historia Clínica
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
