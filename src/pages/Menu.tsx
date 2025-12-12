import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  GripVertical,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  active: boolean;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Lanches",
      products: [
        { id: "1", name: "X-Burger", description: "Pão, hambúrguer, queijo, alface e tomate", price: 25.90, category: "1", active: true },
        { id: "2", name: "X-Bacon", description: "Pão, hambúrguer, queijo, bacon crocante", price: 29.90, category: "1", active: true },
        { id: "3", name: "X-Tudo", description: "Pão, hambúrguer, queijo, bacon, ovo, presunto", price: 35.90, category: "1", active: false },
      ]
    },
    {
      id: "2",
      name: "Bebidas",
      products: [
        { id: "4", name: "Refrigerante Lata", description: "Coca-Cola, Guaraná ou Fanta", price: 6.00, category: "2", active: true },
        { id: "5", name: "Suco Natural", description: "Laranja, limão ou maracujá", price: 8.00, category: "2", active: true },
      ]
    },
    {
      id: "3",
      name: "Sobremesas",
      products: [
        { id: "6", name: "Pudim", description: "Pudim de leite condensado", price: 12.00, category: "3", active: true },
      ]
    }
  ]);

  const toggleProductActive = (categoryId: string, productId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          products: cat.products.map(prod => 
            prod.id === productId ? { ...prod, active: !prod.active } : prod
          )
        };
      }
      return cat;
    }));
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([...categories, {
        id: Date.now().toString(),
        name: newCategoryName,
        products: []
      }]);
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  const filteredCategories = categories.map(cat => ({
    ...cat,
    products: cat.products.filter(prod => 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => searchQuery === "" || cat.products.length > 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Cardápio</h1>
            <p className="text-muted-foreground">Gerencie seus produtos e categorias</p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Categoria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nova Categoria</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Nome da Categoria</Label>
                    <Input 
                      placeholder="Ex: Combos, Promoções..."
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddCategory} className="w-full">
                    Criar Categoria
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Novo Produto</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Nome do Produto</Label>
                    <Input placeholder="Ex: X-Burger Especial" />
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea placeholder="Descreva os ingredientes..." rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preço</Label>
                      <Input type="number" placeholder="0,00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="">Selecione...</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Imagem</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Clique para adicionar imagem</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    Adicionar Produto
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories and Products */}
        <div className="space-y-6">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <h3 className="font-semibold">{category.name}</h3>
                  <Badge variant="secondary">{category.products.length} itens</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="divide-y divide-border">
                {category.products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab hidden sm:block" />
                    
                    <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium truncate">{product.name}</h4>
                        {!product.active && (
                          <Badge variant="secondary" className="text-xs">Inativo</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-semibold">R$ {product.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleProductActive(category.id, product.id)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        {product.active ? (
                          <ToggleRight className="w-6 h-6 text-success" />
                        ) : (
                          <ToggleLeft className="w-6 h-6 text-muted-foreground" />
                        )}
                      </button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}

                {category.products.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>Nenhum produto nesta categoria</p>
                    <Button variant="link" size="sm" onClick={() => setIsAddingProduct(true)}>
                      Adicionar primeiro produto
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Menu;
