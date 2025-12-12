import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  Settings, 
  MessageCircle,
  ExternalLink,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Cardápio", href: "/menu", icon: UtensilsCrossed },
    { name: "Pedidos", href: "/orders", icon: ShoppingBag },
    { name: "Mensagens", href: "/messages", icon: MessageCircle },
    { name: "Configurações", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <Link to="/dashboard" className="text-2xl font-bold">
            AURY
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <a href="/minha-loja" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Minha Loja
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" asChild>
            <Link to="/">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Link>
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card flex items-center justify-between px-4">
        <Link to="/dashboard" className="text-xl font-bold">
          AURY
        </Link>
        <div className="flex items-center gap-2">
          {navigation.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:overflow-auto">
        <div className="p-6 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
