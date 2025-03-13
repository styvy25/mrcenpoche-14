
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/App";
import AuthDialog from "@/components/auth/AuthDialog";
import { FileText, BookOpen, LayoutGrid, Settings, MessageSquare, ChevronLeft, ChevronRight, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isApiKeySet } = useAppContext();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-1 mr-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleGoBack}
              aria-label="Retour"
              title="Retour"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleGoForward}
              aria-label="Suivant"
              title="Suivant"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleGoHome}
              aria-label="Accueil"
              title="Accueil"
            >
              <Home className="h-4 w-4" />
            </Button>
          </div>
          
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            MRC<span className="text-mrc-blue"> en Poche</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/modules">
            <Button
              variant={isActive("/modules") ? "default" : "ghost"}
              className="flex items-center gap-1"
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Modules</span>
            </Button>
          </Link>
          <Link to="/quiz">
            <Button
              variant={isActive("/quiz") ? "default" : "ghost"}
              className="flex items-center gap-1"
            >
              <BookOpen className="h-4 w-4" />
              <span>Quiz</span>
            </Button>
          </Link>
          <Link to="/chat">
            <Button
              variant={isActive("/chat") ? "default" : "ghost"}
              className="flex items-center gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Assistant</span>
            </Button>
          </Link>
          <Link to="/documents">
            <Button
              variant={isActive("/documents") ? "default" : "ghost"}
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </Button>
          </Link>
          <Link to="/settings">
            <Button
              variant={isActive("/settings") ? "default" : "ghost"}
              className="flex items-center gap-1"
            >
              <Settings className="h-4 w-4" />
              <span>Paramètres</span>
            </Button>
          </Link>
        </nav>

        <div className="flex items-center">
          <AuthDialog />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
