import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Store, 
  Clock, 
  CreditCard, 
  Link as LinkIcon, 
  Upload,
  Copy,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [storeSettings, setStoreSettings] = useState({
    name: "Minha Lanchonete",
    slug: "minha-lanchonete",
    description: "Os melhores lanches da cidade",
    phone: "(11) 99999-9999",
    address: "Rua Exemplo, 123 - Centro",
    prepTime: "20",
    isOpen: true,
    payments: {
      pix: true,
      credit: true,
      debit: true,
      cash: true,
    }
  });

  const storeUrl = `aury.com/${storeSettings.slug}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${storeUrl}`);
    setCopied(true);
    toast({
      title: "Link copiado!",
      description: "O link da sua loja foi copiado para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações da sua loja</p>
        </div>

        {/* Store Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">Link da Loja</h2>
              <p className="text-sm text-muted-foreground">Compartilhe com seus clientes</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary">
              <span className="text-muted-foreground">https://</span>
              <span className="font-medium">{storeUrl}</span>
            </div>
            <Button variant="outline" onClick={copyUrl}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Store Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 rounded-xl border border-border bg-card space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Store className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">Informações da Loja</h2>
              <p className="text-sm text-muted-foreground">Dados básicos do seu estabelecimento</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Alterar logo
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Estabelecimento</Label>
                <Input
                  id="name"
                  value={storeSettings.name}
                  onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL da Loja</Label>
                <div className="flex">
                  <span className="flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                    aury.com/
                  </span>
                  <Input
                    id="slug"
                    value={storeSettings.slug}
                    onChange={(e) => setStoreSettings({ ...storeSettings, slug: e.target.value })}
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={storeSettings.description}
                onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={storeSettings.phone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={storeSettings.address}
                  onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Operating Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-6 rounded-xl border border-border bg-card space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">Funcionamento</h2>
              <p className="text-sm text-muted-foreground">Horários e tempo de preparo</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
            <div>
              <p className="font-medium">Loja Aberta</p>
              <p className="text-sm text-muted-foreground">
                {storeSettings.isOpen ? "Recebendo pedidos" : "Fechada para pedidos"}
              </p>
            </div>
            <Switch
              checked={storeSettings.isOpen}
              onCheckedChange={(checked) => setStoreSettings({ ...storeSettings, isOpen: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prepTime">Tempo médio de preparo (minutos)</Label>
            <Input
              id="prepTime"
              type="number"
              value={storeSettings.prepTime}
              onChange={(e) => setStoreSettings({ ...storeSettings, prepTime: e.target.value })}
              className="max-w-[200px]"
            />
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-6 rounded-xl border border-border bg-card space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">Formas de Pagamento</h2>
              <p className="text-sm text-muted-foreground">Métodos aceitos na sua loja</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { key: "pix", label: "PIX" },
              { key: "credit", label: "Cartão de Crédito" },
              { key: "debit", label: "Cartão de Débito" },
              { key: "cash", label: "Dinheiro" },
            ].map((method) => (
              <div
                key={method.key}
                className="flex items-center justify-between p-4 rounded-lg border border-border"
              >
                <span className="font-medium">{method.label}</span>
                <Switch
                  checked={storeSettings.payments[method.key as keyof typeof storeSettings.payments]}
                  onCheckedChange={(checked) => setStoreSettings({
                    ...storeSettings,
                    payments: { ...storeSettings.payments, [method.key]: checked }
                  })}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave}>
            Salvar Alterações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
