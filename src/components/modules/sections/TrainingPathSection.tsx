
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Bell, Award, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface TrainingPathSectionProps {
  userRole?: string;
}

const TrainingPathSection = ({ userRole }: TrainingPathSectionProps) => {
  const { toast } = useToast();
  
  const showAdminButton = () => {
    return userRole === "admin" || userRole === "superadmin";
  };

  const handleNotification = () => {
    toast({
      title: "Notification activée",
      description: "Vous recevrez des notifications pour les nouveaux contenus",
      variant: "default",
    });
  };

  return (
    <div className="lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
        <BookOpen className="mr-2 h-5 w-5 text-mrc-blue" />
        Parcours de formation
      </h2>
      <Card className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <h3 className="font-medium text-lg mb-3 text-mrc-blue">Parcours recommandé</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Suivez cette séquence de modules pour une formation optimale:
            </p>
            <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
              <li className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center">
                <span className="font-medium">Histoire et Valeurs du MRC</span>
                <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 py-1 px-2 rounded-full">Complété</span>
              </li>
              <li className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center">
                <span className="font-medium">Techniques de Mobilisation</span>
                <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 py-1 px-2 rounded-full">En cours</span>
              </li>
              <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">Communication Politique</li>
              <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">Enjeux Politiques au Cameroun</li>
              <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">Organisation de Campagne</li>
            </ol>
            
            <div className="mt-4 flex justify-between">
              <Button className="bg-mrc-blue hover:bg-blue-700 text-white">
                <FileText className="mr-2 h-4 w-4" />
                Télécharger le programme
              </Button>
              
              <Button 
                onClick={handleNotification} 
                variant="outline" 
                className="border-mrc-blue text-mrc-blue"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-medium text-lg mb-3 text-mrc-blue">Modules par niveau</h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Sympathisant:</span>
                  <span className="text-xs text-green-600 dark:text-green-400">100% complété</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Modules 1-2 • Formation de base</p>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Militant:</span>
                  <span className="text-xs text-mrc-blue">35% complété</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-mrc-blue rounded-full" style={{ width: "35%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Modules 3-4 • Formation intermédiaire</p>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Cadre:</span>
                  <span className="text-xs text-gray-500">Non commencé</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-mrc-red rounded-full" style={{ width: "0%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Modules 5-6 • Formation avancée</p>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Cadre Sup.:</span>
                  <span className="text-xs text-gray-500">Non commencé</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full" style={{ width: "0%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Modules 7-8 • Formation de leadership</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="border-mrc-blue text-mrc-blue">
                <Award className="mr-2 h-4 w-4" />
                Voir mes certifications
              </Button>
            </div>
          </div>
        </div>
        
        {showAdminButton() && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link to="/settings">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres Admin (Configuration API)
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TrainingPathSection;
