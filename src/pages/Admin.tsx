import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package, Download, Printer, Truck, ArrowLeft,
  Search, Filter, RefreshCw, Eye, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

type OrderStatus = "pending" | "printed" | "shipped";

interface Order {
  id: string;
  customerName: string;
  bookTitle: string;
  bookType: string;
  pages: number;
  format: string;
  status: OrderStatus;
  createdAt: string;
  price: string;
}

const demoOrders: Order[] = [
  { id: "ORD-001", customerName: "Priya Sharma", bookTitle: "Rahaa's Space Adventure", bookType: "Kids Story", pages: 12, format: "A4 Hardcover", status: "pending", createdAt: "2026-03-11", price: "₹899" },
  { id: "ORD-002", customerName: "Arjun Kumar", bookTitle: "Maya's Fairy Tale", bookType: "Kids Story", pages: 10, format: "A5 Softcover", status: "pending", createdAt: "2026-03-11", price: "₹599" },
  { id: "ORD-003", customerName: "Sarah Ali", bookTitle: "Zara's Jungle Explorer", bookType: "Kids Story", pages: 12, format: "A4 Hardcover", status: "printed", createdAt: "2026-03-10", price: "₹899" },
  { id: "ORD-004", customerName: "Ravi Menon", bookTitle: "Ananya's Birthday Book", bookType: "Birthday", pages: 8, format: "A5 Softcover", status: "shipped", createdAt: "2026-03-09", price: "₹499" },
  { id: "ORD-005", customerName: "Fatima Begum", bookTitle: "Imran & Fatima's Wedding", bookType: "Wedding", pages: 20, format: "A4 Premium", status: "printed", createdAt: "2026-03-09", price: "₹1499" },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "bg-accent/15 text-accent border-accent/30", icon: Package },
  printed: { label: "Printed", color: "bg-secondary/15 text-secondary border-secondary/30", icon: Printer },
  shipped: { label: "Shipped", color: "bg-green-100 text-green-700 border-green-300", icon: Truck },
};

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const { toast } = useToast();

  const filteredOrders = orders.filter((o) => {
    const matchSearch = o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    toast({
      title: "Order Updated",
      description: `${id} marked as ${newStatus}`,
    });
  };

  const downloadPdf = (order: Order) => {
    toast({ title: "Downloading PDF", description: `Preparing ${order.bookTitle} for print...` });
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    printed: orders.filter((o) => o.status === "printed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-gradient-royal text-secondary-foreground border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={logo} alt="The Printing House" className="h-10 w-auto" />
              <div>
                <span className="font-display text-base font-bold block leading-none">The Printing House</span>
                <span className="text-[10px] font-accent uppercase tracking-widest opacity-70">Admin Dashboard</span>
              </div>
            </Link>
          </div>
          <Button variant="ghost" asChild className="text-secondary-foreground hover:bg-secondary-foreground/10">
            <Link to="/"><ArrowLeft size={16} className="mr-2" /> Back to Site</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total, icon: Package, color: "text-foreground", bg: "bg-card" },
            { label: "Pending", value: stats.pending, icon: RefreshCw, color: "text-accent", bg: "bg-accent/5" },
            { label: "Printed", value: stats.printed, icon: Printer, color: "text-secondary", bg: "bg-secondary/5" },
            { label: "Shipped", value: stats.shipped, icon: Truck, color: "text-green-600", bg: "bg-green-50" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${s.bg} rounded-xl p-5 border border-border/50 shadow-warm`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-accent text-muted-foreground">{s.label}</span>
                <s.icon size={18} className={s.color} />
              </div>
              <p className={`text-3xl font-bold font-accent ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, customer, or book..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "pending", "printed", "shipped"] as const).map((s) => (
              <Button
                key={s}
                variant={filterStatus === s ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(s)}
                className={filterStatus === s ? "bg-gradient-crimson text-primary-foreground" : "font-accent"}
              >
                <Filter size={14} className="mr-1" />
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-accent font-bold">Order ID</TableHead>
                <TableHead className="font-accent font-bold">Customer</TableHead>
                <TableHead className="font-accent font-bold">Book</TableHead>
                <TableHead className="font-accent font-bold">Pages</TableHead>
                <TableHead className="font-accent font-bold">Format</TableHead>
                <TableHead className="font-accent font-bold">Price</TableHead>
                <TableHead className="font-accent font-bold">Status</TableHead>
                <TableHead className="font-accent font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const sc = statusConfig[order.status];
                return (
                  <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono font-semibold text-sm">{order.id}</TableCell>
                    <TableCell className="font-medium">{order.customerName}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium text-sm">{order.bookTitle}</span>
                        <span className="block text-xs text-muted-foreground">{order.bookType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-accent">{order.pages}</TableCell>
                    <TableCell className="text-sm">{order.format}</TableCell>
                    <TableCell className="font-semibold font-accent">{order.price}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${sc.color} font-accent text-xs`}>
                        <sc.icon size={12} className="mr-1" />
                        {sc.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => downloadPdf(order)}
                          title="Download PDF"
                        >
                          <Download size={14} />
                        </Button>
                        {order.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-secondary hover:text-secondary"
                            onClick={() => updateStatus(order.id, "printed")}
                            title="Mark as Printed"
                          >
                            <Printer size={14} />
                          </Button>
                        )}
                        {order.status === "printed" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:text-green-700"
                            onClick={() => updateStatus(order.id, "shipped")}
                            title="Mark as Shipped"
                          >
                            <Truck size={14} />
                          </Button>
                        )}
                        {order.status === "shipped" && (
                          <CheckCircle2 size={14} className="text-green-500 mx-2" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground font-accent">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
