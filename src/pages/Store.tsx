import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  X, 
  MessageCircle, 
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  Send,
  Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
}

const Store = () => {
  const { storeSlug } = useParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("1");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const store = {
    name: "Minha Lanchonete",
    description: "Os melhores lanches da cidade",
    isOpen: true,
    prepTime: "20-30 min",
    address: "Rua Exemplo, 123 - Centro",
    phone: "(11) 99999-9999",
  };

  const categories: Category[] = [
    {
      id: "1",
      name: "Lanches",
      products: [
        { id: "1", name: "X-Burger", description: "Pão, hambúrguer artesanal 150g, queijo, alface e tomate", price: 25.90 },
        { id: "2", name: "X-Bacon", description: "Pão, hambúrguer artesanal 150g, queijo, bacon crocante", price: 29.90 },
        { id: "3", name: "X-Tudo", description: "Pão, hambúrguer 150g, queijo, bacon, ovo, presunto, alface e tomate", price: 35.90 },
        { id: "4", name: "X-Salada", description: "Pão, hambúrguer 150g, queijo, alface, tomate e maionese especial", price: 23.90 },
      ]
    },
    {
      id: "2",
      name: "Bebidas",
      products: [
        { id: "5", name: "Refrigerante Lata", description: "Coca-Cola, Guaraná ou Fanta 350ml", price: 6.00 },
        { id: "6", name: "Suco Natural 500ml", description: "Laranja, limão ou maracujá", price: 8.00 },
        { id: "7", name: "Água Mineral", description: "Com ou sem gás 500ml", price: 4.00 },
      ]
    },
    {
      id: "3",
      name: "Sobremesas",
      products: [
        { id: "8", name: "Pudim", description: "Pudim de leite condensado tradicional", price: 12.00 },
        { id: "9", name: "Brownie", description: "Brownie de chocolate com nozes", price: 10.00 },
      ]
    }
  ];

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <span className="text-xl font-bold">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg truncate">{store.name}</h1>
                <Badge variant={store.isOpen ? "success" : "secondary"} className="shrink-0">
                  {store.isOpen ? "Aberto" : "Fechado"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{store.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {store.prepTime}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{store.address}</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-t border-border">
          <div className="max-w-lg mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Products */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {categories.filter(c => c.id === activeCategory).map((category) => (
          <div key={category.id} className="space-y-4">
            {category.products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold">R$ {product.price.toFixed(2)}</span>
                    <Button size="sm" onClick={() => addToCart(product)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsChatOpen(true)}
            className="shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
          
          {cartCount > 0 ? (
            <Button 
              className="flex-1 justify-between" 
              size="lg"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Ver Carrinho ({cartCount})
              </span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </Button>
          ) : (
            <div className="flex-1 text-center text-muted-foreground text-sm">
              Adicione itens ao carrinho
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-foreground/20 z-50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl max-h-[85vh] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Seu Pedido</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4 max-h-[40vh] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon-sm"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon-sm"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-6 pt-6">
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <Button size="xl" className="w-full" onClick={handlePlaceOrder}>
                    Finalizar Pedido
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-foreground/20 z-50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl h-[70vh] flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{store.name}</p>
                    <p className="text-xs text-muted-foreground">Normalmente responde em minutos</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-center text-sm text-muted-foreground py-8">
                  Inicie uma conversa com a loja
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Digite sua mensagem..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Order Success */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Pedido Enviado!</h2>
              <p className="text-muted-foreground mb-6">
                Seu pedido foi recebido e está sendo preparado.<br />
                Tempo estimado: {store.prepTime}
              </p>
              <Button onClick={() => { setOrderPlaced(false); setCart([]); }}>
                Fazer Novo Pedido
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Store;
