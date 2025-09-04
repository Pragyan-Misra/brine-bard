import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Waves, MessageCircle, BarChart3, Upload, Info, Users, Menu, Moon, Sun, Home } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/chat', label: 'Chat', icon: MessageCircle },
  { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { path: '/upload', label: 'Upload Data', icon: Upload },
  { path: '/about', label: 'About', icon: Info },
  { path: '/team', label: 'Team', icon: Users },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    const onStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link key={item.path} to={item.path}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                "gap-2 transition-all",
                isActive && "bg-primary text-primary-foreground shadow-md"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden md:inline">{item.label}</span>
            </Button>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white">
              <Waves className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FloatChat
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLinks />
            {/* Auth Button */}
            {!isLoggedIn ? (
              <Link to="/signin">
                <Button variant="outline" size="sm" className="ml-2">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                  window.location.reload();
                }}
              >
                Log Out
              </Button>
            )}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-700" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white">
                      <Waves className="h-4 w-4" />
                    </div>
                    FloatChat
                  </Link>
                  <nav className="flex flex-col gap-2">
                    <NavLinks />
                    {/* Auth Button for mobile */}
                    {!isLoggedIn ? (
                      <Link to="/signin">
                        <Button variant="outline" size="sm" className="mt-2 w-full">Sign In</Button>
                      </Link>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => {
                          localStorage.removeItem('token');
                          setIsLoggedIn(false);
                          window.location.reload();
                        }}
                      >
                        Log Out
                      </Button>
                    )}
                  </nav>
                  <div className="pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="w-full justify-start gap-2"
                      aria-label="Toggle theme"
                    >
                      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400" />
                      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-700" />
                      Toggle theme
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-primary" />
              <span className="font-semibold">FloatChat</span>
              <span className="text-muted-foreground">AI-Powered Ocean Data Discovery</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built for Ocean Data Visualization Hackathon
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;