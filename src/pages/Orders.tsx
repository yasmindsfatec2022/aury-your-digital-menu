import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Clock, 
  MessageCircle,
  ChevronDown,
  Check,
  X,
  RefreshCw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  phone: string;
  items: OrderItem[];
  total: number;
  status: "new" | "preparing" | "ready" | "completed";
  time: string;
  paymentMethod: string;
  notes?: string;
}

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#1247",
      customer: "João Silva",
      phone: "(11) 99999-9999",
      items: [
        { name: "X-Burger", quantity: 2, price: 25.90 },
        { name: "Refrigerante Lata", quantity: 2, price: 6.00 },
      ],
      total: 63.80,
      status: "new",
      time: "2 min",
      paymentMethod: "PIX",
      notes: "Sem cebola no lanche"
    },
    {
      id: "#1246",
      customer: "Maria Santos",
      phone: "(11) 88888-8888",
      items: [
        { name: "X-Bacon", quantity: 1, price: 29.90 },
        { name: "Suco Natural", quantity: 1, price: 8.00 },
      ],
      total: 37.90,
      status: "preparing",
      time: "8 min",
      paymentMethod: "Cartão",
    },
    {
      id: "#1245",
      customer: "Pedro Costa",
      phone: "(11) 77777-7777",
      items: [
        { name: "X-Tudo", quantity: 3, price: 35.90 },
        { name: "Refrigerante Lata", quantity: 3, price: 6.00 },
        { name: "Pudim", quantity: 2, price: 12.00 },
      ],
      total: 149.70,
      status: "ready",
      time: "18 min",
      paymentMethod: "Dinheiro",
    },
    {
      id: "#1244",
      customer: "Ana Oliveira",
      phone: "(11) 66666-6666",
      items: [
        { name: "X-Burger", quantity: 1, price: 25.90 },
      ],
      total: 25.90,
      status: "completed",
      time: "25 min",
      paymentMethod: "PIX",
    },
  ]);

  const statusConfig = {
    new: { label: "Novo", variant: "new" as const, color: "bg-status-new" },
    preparing: { label: "Preparando", variant: "preparing" as const, color: "bg-status-preparing" },
    ready: { label: "Pronto", variant: "ready" as const, color: "bg-status-ready" },
    completed: { label: "Concluído", variant: "completed" as const, color: "bg-status-completed" },
  };

  const updateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const ordersByStatus = {
    new: filteredOrders.filter(o => o.status === "new"),
    preparing: filteredOrders.filter(o => o.status === "preparing"),
    ready: filteredOrders.filter(o => o.status === "ready"),
    completed: filteredOrders.filter(o => o.status === "completed"),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Pedidos</h1>
            <p className="text-muted-foreground">Gerencie os pedidos em tempo real</p>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID ou cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "new", "preparing", "ready", "completed"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === "all" ? "Todos" : statusConfig[status as keyof typeof statusConfig]?.label}
                {status !== "all" && (
                  <span className="ml-1.5 text-xs">
                    {ordersByStatus[status as keyof typeof ordersByStatus]?.length || 0}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                "rounded-xl border bg-card overflow-hidden",
                order.status === "new" && "border-status-new/50 bg-status-new/5"
              )}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg font-bold">{order.id}</span>
                      <Badge variant={statusConfig[order.status].variant}>
                        {statusConfig[order.status].label}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {order.time}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.phone}</p>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="text-muted-foreground">R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <div className="mt-3 p-3 rounded-lg bg-warning/10 text-sm">
                        <span className="font-medium">Obs:</span> {order.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold">R$ {order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon-sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>

                      {order.status === "new" && (
                        <>
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => updateStatus(order.id, "preparing")}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Aceitar
                          </Button>
                          <Button variant="outline" size="icon-sm">
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}

                      {order.status === "preparing" && (
                        <Button 
                          variant="warning" 
                          size="sm"
                          onClick={() => updateStatus(order.id, "ready")}
                        >
                          Marcar Pronto
                        </Button>
                      )}

                      {order.status === "ready" && (
                        <Button 
                          size="sm"
                          onClick={() => updateStatus(order.id, "completed")}
                        >
                          Finalizar
                        </Button>
                      )}

                      {order.status !== "new" && order.status !== "completed" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon-sm">
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateStatus(order.id, "new")}>
                              Voltar para Novo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(order.id, "preparing")}>
                              Em Preparo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(order.id, "ready")}>
                              Pronto
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(order.id, "completed")}>
                              Concluído
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum pedido encontrado</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
