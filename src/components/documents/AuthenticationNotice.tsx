
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertTriangle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthContext";

const AuthenticationNotice = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = "MRC LearnScape - Documents de formation";
    const text = "Accédez aux documents de formation sur MRC LearnScape!";
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => {
            toast({
              title: "Lien copié!",
              description: "Le lien a été copié dans votre presse-papiers.",
            });
          })
          .catch(err => {
            console.error('Erreur lors de la copie du lien: ', err);
            toast({
              title: "Erreur",
              description: "Impossible de copier le lien.",
              variant: "destructive",
            });
          });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // If user is authenticated, we shouldn't render this component at all
  if (isAuthenticated) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-mrc-blue">Générateur de Supports PDF</CardTitle>
        <CardDescription>
          Vous devez être connecté pour utiliser cette fonctionnalité
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-8">
        <AlertTriangle className="text-yellow-500 h-16 w-16 mb-4" />
        <p className="text-center text-muted-foreground">
          Connectez-vous pour accéder à tous les documents de formation et générer des PDF personnalisés.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button asChild className="w-full">
          <a href="/auth">Se connecter</a>
        </Button>
        
        <div className="w-full">
          <p className="text-xs text-center text-muted-foreground mb-2">Partager cette ressource</p>
          <div className="flex justify-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-blue-500 text-white hover:bg-blue-600 border-none"
              onClick={() => handleShare('facebook')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-blue-400 text-white hover:bg-blue-500 border-none"
              onClick={() => handleShare('twitter')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-green-500 text-white hover:bg-green-600 border-none"
              onClick={() => handleShare('whatsapp')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp">
              <path d="M5.3 12.3a10 10 0 1 1 14.3 8.8L13 21l1-4.4a9.8 9.8 0 0 1 5-10 10 10 0 0 1-10.5 5.7"/>
              <path d="M15 14.5c.5 1.5 0 3-1 3.5H7.9"/>
              <path d="M12 11v5.5"/>
              </svg>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-gray-700 text-white hover:bg-gray-800 border-none"
              onClick={() => handleShare('copy')}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthenticationNotice;
