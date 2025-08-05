import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Shield, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // call Google OAuth API here
    // After successful auth, redirect to dashboard
    navigate('/dashboard/lost');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center md:text-left space-y-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Package className="h-12 w-12 text-primary-foreground" />
            <h1 className="text-4xl font-bold text-primary-foreground">CampusCrate</h1>
          </div>
          
          <div className="space-y-4 text-primary-foreground/90">
            <h2 className="text-2xl font-semibold">Lost something? Found something?</h2>
            <p className="text-lg">
              Connect with your campus community to reunite lost items with their owners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-primary-foreground/80">
            <div className="text-center">
              <Search className="h-8 w-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Search Items</div>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Connect Students</div>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <div className="text-sm font-medium">Secure Platform</div>
            </div>
          </div>
        </div>

        {/* Right side - Login Card */}
        <Card className="w-full max-w-md mx-auto shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl">Welcome to CampusCrate</CardTitle>
            <CardDescription>
              Sign in with your college Google account to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Button 
              variant="hero" 
              size="lg"
              onClick={handleGoogleLogin}
              className="w-full"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              By signing in, you agree to help create a safer campus community
            </div>

            <div className="bg-accent/50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Campus-Wide Lost & Found</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Post lost or found items instantly</li>
                <li>• Secure verification system</li>
                <li>• Connect with fellow students</li>
                <li>• Admin-moderated for safety</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}