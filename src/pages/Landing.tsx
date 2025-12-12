import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, MessageCircle, BarChart3, Menu, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: Menu,
      title: "Cardápio Digital",
      description: "Monte seu cardápio completo com categorias, fotos e preços em minutos."
    },
    {
      icon: Zap,
      title: "Pedidos em Tempo Real",
      description: "Receba pedidos instantaneamente. Sem atrasos, sem perdas."
    },
    {
      icon: MessageCircle,
      title: "Chat Integrado",
      description: "Converse com seus clientes diretamente pelo sistema."
    },
    {
      icon: Clock,
      title: "Gestão de Tempo",
      description: "Controle o tempo de preparo e mantenha clientes informados."
    },
    {
      icon: BarChart3,
      title: "Dashboard Completo",
      description: "Veja tudo: pedidos, faturamento, produtos mais vendidos."
    },
    {
      icon: Smartphone,
      title: "Link Exclusivo",
      description: "Seu cardápio com link único: aury.com/suaLoja"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            AURY
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Funcionalidades
            </a>
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como Funciona
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/auth?mode=register">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">
                Plataforma 100% automática
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Automatize seu
              <br />
              <span className="text-muted-foreground">restaurante</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
              Cardápio digital, pedidos em tempo real, chat com clientes e dashboard completo. 
              Tudo em uma plataforma simples e elegante.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?mode=register">
                  Criar Minha Conta
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/demo">Ver Demonstração</Link>
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">aury.com/minha-lanchonete</span>
              </div>
              <div className="p-8 bg-gradient-to-br from-secondary/30 to-background">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Stats Cards Preview */}
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-1">Pedidos Hoje</p>
                    <p className="text-3xl font-bold">47</p>
                    <p className="text-xs text-success mt-1">+12% vs ontem</p>
                  </div>
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-1">Faturamento</p>
                    <p className="text-3xl font-bold">R$ 2.340</p>
                    <p className="text-xs text-success mt-1">+8% vs ontem</p>
                  </div>
                  <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <p className="text-sm text-muted-foreground mb-1">Tempo Médio</p>
                    <p className="text-3xl font-bold">18min</p>
                    <p className="text-xs text-muted-foreground mt-1">de preparo</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Uma plataforma completa para gerenciar seu estabelecimento do início ao fim.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simples assim
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Configure sua loja em minutos e comece a receber pedidos imediatamente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Crie sua conta", desc: "Cadastre-se gratuitamente em segundos" },
              { step: "02", title: "Configure sua loja", desc: "Adicione logo, endereço e informações" },
              { step: "03", title: "Monte seu cardápio", desc: "Adicione produtos, fotos e preços" },
              { step: "04", title: "Receba pedidos", desc: "Compartilhe seu link e venda mais" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-muted-foreground/20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para automatizar?
            </h2>
            <p className="text-primary-foreground/70 mb-10 text-lg">
              Junte-se a milhares de estabelecimentos que já simplificaram suas operações com AURY.
            </p>
            <Button 
              variant="secondary" 
              size="xl" 
              className="bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link to="/auth?mode=register">
                Começar Agora — É Grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-2xl font-bold">AURY</div>
            <p className="text-sm text-muted-foreground">
              © 2024 AURY. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
