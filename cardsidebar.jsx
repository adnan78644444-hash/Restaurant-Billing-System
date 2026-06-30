import React, { useState } from "react";
import { ShoppingCart, Minus, Plus, Trash2, Receipt, X, User, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const GST_RATE = 2.5; // CGST + SGST = 5% total

export default function CartSidebar({ cart, onAdd, onRemove, onClear, onPlaceOrder }) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const cgst = (afterDiscount * GST_RATE) / 100;
  const sgst = (afterDiscount * GST_RATE) / 100;
  const total = afterDiscount + cgst + sgst;

  const handlePlaceOrder = () => {
    onPlaceOrder({
      customerName: customerName || "Walk-in Customer",
      tableNumber: tableNumber || "T1",
      discount,
      discountAmount,
      paymentMethod,
      subtotal,
      cgst,
      sgst,
      total,
    });
    setCustomerName("");
    setTableNumber("");
    setDiscount(0);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
          <ShoppingCart className="w-10 h-10 text-orange-300" />
        </div>
        <h3 className="font-bold text-gray-800 mb-1">Your cart is empty</h3>
        <p className="text-sm text-gray-400">Add delicious dishes to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <ShoppingCart className="w-5 h-5" />
          <h3 className="font-bold text-lg">Your Order</h3>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {cart.reduce((s, i) => s + i.quantity, 0)} items
          </span>
        </div>
        <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 h-8" onClick={onClear}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 max-h-[280px] overflow-y-auto space-y-3">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-3 p-2 rounded-xl bg-orange-50/50"
            >
              <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop"; }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-orange-600 font-medium">₹{item.price} each</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => onRemove(item)} className="w-6 h-6 rounded-full border border-orange-300 flex items-center justify-center text-orange-500 hover:bg-orange-100">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                <button onClick={() => onAdd(item)} className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <span className="text-sm font-bold text-gray-700 w-16 text-right">₹{item.price * item.quantity}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-orange-100 p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-gray-500 mb-1 flex items-center gap-1"><User className="w-3 h-3" /> Customer</Label>
            <Input placeholder="Walk-in" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="h-8 text-sm rounded-lg" />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Hash className="w-3 h-3" /> Table</Label>
            <Input placeholder="T1" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} className="h-8 text-sm rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-gray-500 mb-1">Discount %</Label>
            <Input type="number" min={0} max={100} value={discount} onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))} className="h-8 text-sm rounded-lg" />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1">Payment</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="h-8 text-sm rounded-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t border-orange-100 p-4 space-y-1.5 bg-orange-50/30">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({discount}%)</span><span>-₹{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-gray-600">
          <span>CGST (2.5%)</span><span>₹{cgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>SGST (2.5%)</span><span>₹{sgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-orange-200">
          <span>Total</span><span className="text-orange-600">₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-4">
        <Button
          onClick={handlePlaceOrder}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-base shadow-lg shadow-orange-200"
        >
          <Receipt className="w-5 h-5 mr-2" /> Place Order & Generate Bill
        </Button>
      </div>
    </div>
  );
}
