import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, TrendingUp, Package, Eye } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Pedidos Hoje", value: "47", change: "+12%", icon: Package },
    { label: "Faturamento", value: "R$ 2.340", change: "+8%", icon: DollarSign },
    { label: "Tempo Médio", value: "18min", icon: Clock },
    { label: "Taxa de Conclusão", value: "94%", change: "+2%", icon: TrendingUp },
  ];

  const recentOrders = [
    { id: "#1247", customer: "João Silva", items: 3, total: 78.90, status: "preparing", time: "12 min" },
    { id: "#1246", customer: "Maria Santos", items: 2, total: 45.50, status: "new", time: "2 min" },
    { id: "#1245", customer: "Pedro Costa", items: 5, total: 124.00, status: "ready", time: "18 min" },
    { id: "#1244", customer: "Ana Oliveira", items: 1, total: 32.00, status: "completed", time: "25 min" },
    { id: "#1243", customer: "Carlos Lima", items: 4, total: 89.90, status: "completed", time: "32 min" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "new" | "preparing" | "ready" | "completed" }> = {
      new: { label: "Novo", variant: "new" },
      preparing: { label: "Preparando", variant: "preparing" },
      ready: { label: "Pronto", variant: "ready" },
      completed: { label: "Concluído", variant: "completed" },
    };
    const { label, variant } = variants[status] || variants.new;
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral do seu estabelecimento</p>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Ver Loja
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                {stat.change && (
                  <span className="text-xs font-medium text-success">{stat.change}</span>
                )}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-xl bg-card border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Pedidos Recentes</h2>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{order.items} itens</p>
                    <p className="text-sm text-muted-foreground">R$ {order.total.toFixed(2)}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-muted-foreground">{order.time}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full">
              Ver todos os pedidos
            </Button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
