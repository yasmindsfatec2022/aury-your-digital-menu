import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegister, setIsRegister] = useState(searchParams.get("mode") === "register");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    storeName: "",
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Check if user has a store
        checkUserStore(session.user.id);
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkUserStore(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserStore = async (userId: string) => {
    const { data: store } = await supabase
      .from('stores')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();

    if (store) {
      navigate('/dashboard');
    }
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        // Sign up
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });

        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            toast({
              title: "Email já cadastrado",
              description: "Este email já está em uso. Tente fazer login.",
              variant: "destructive",
            });
          } else {
            throw signUpError;
          }
          return;
        }

        if (authData.user) {
          // Create store for the user
          const slug = generateSlug(formData.storeName);
          const { error: storeError } = await supabase
            .from('stores')
            .insert({
              user_id: authData.user.id,
              name: formData.storeName,
              slug: slug,
              description: `Bem-vindo ao ${formData.storeName}`,
            });

          if (storeError) {
            console.error('Store creation error:', storeError);
            toast({
              title: "Erro ao criar loja",
              description: "Conta criada, mas houve um erro ao criar a loja.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Conta criada com sucesso!",
              description: "Bem-vindo ao AURY!",
            });
            navigate('/dashboard');
          }
        }
      } else {
        // Sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          if (signInError.message.includes('Invalid login credentials')) {
            toast({
              title: "Credenciais inválidas",
              description: "Email ou senha incorretos.",
              variant: "destructive",
            });
          } else {
            throw signInError;
          }
          return;
        }

        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!",
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isRegister ? "Criar conta" : "Entrar"}
            </h1>
            <p className="text-muted-foreground">
              {isRegister 
                ? "Comece a automatizar seu negócio hoje" 
                : "Bem-vindo de volta ao AURY"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="storeName">Nome do Estabelecimento</Label>
                <Input
                  id="storeName"
                  placeholder="Minha Lanchonete"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="h-12"
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 pr-12"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isRegister ? "Criando..." : "Entrando..."}
                </>
              ) : (
                isRegister ? "Criar Conta" : "Entrar"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-foreground font-medium hover:underline"
                disabled={isLoading}
              >
                {isRegister ? "Entrar" : "Criar conta"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex w-1/2 bg-primary items-center justify-center p-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-primary-foreground"
        >
          <div className="text-6xl font-bold mb-6">AURY</div>
          <p className="text-xl text-primary-foreground/70 max-w-md">
            Automatize seu restaurante. Cardápio digital, pedidos em tempo real e muito mais.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-4 text-left">
            {[
              "Cardápio digital",
              "Pedidos em tempo real",
              "Chat com clientes",
              "Dashboard completo",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
