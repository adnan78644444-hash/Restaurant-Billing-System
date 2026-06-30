import React, { useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X, UtensilsCrossed } from "lucide-react";
import moment from "moment";

export default function ReceiptModal({ open, onClose, order }) {
  const receiptRef = useRef(null);

  if (!order) return null;

  const handlePrint = () => {
    const content = receiptRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html><head><title>Receipt</title>
      <style>
        body { font-family: 'Courier New', monospace; padding: 20px; max-width: 350px; margin: 0 auto; }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .line { border-top: 1px dashed #333; margin: 8px 0; }
        .flex { display: flex; justify-content: space-between; }
        .item { display: flex; justify-content: space-between; font-size: 13px; margin: 4px 0; }
        h1 { font-size: 20px; margin: 4px 0; }
        h2 { font-size: 14px; margin: 2px 0; font-weight: normal; }
        .total { font-size: 18px; font-weight: bold; }
        @media print { body { padding: 0; } }
      </style></head><body>
      ${content.innerHTML}
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5" /> Receipt
          </h2>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={handlePrint} className="text-white hover:bg-white/20 h-8">
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
          </div>
        </div>

        <div ref={receiptRef} className="p-6 font-mono text-sm">
          <div className="text-center mb-4">
            <div className="text-3xl mb-1">🍽️</div>
            <h1 className="text-xl font-bold text-gray-900">SPICE GARDEN</h1>
            <p className="text-xs text-gray-500">Fine Dining & Restaurant</p>
            <p className="text-xs text-gray-400">123 Food Street, Mumbai - 400001</p>
            <p className="text-xs text-gray-400">Phone: +91 98765 43210</p>
            <p className="text-xs text-gray-400">GSTIN: 27AABCS1234B1Z5</p>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 my-3" />

          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Order: <b className="text-gray-800">{order.order_number}</b></span>
            <span>{moment(order.created_date).format("DD/MM/YYYY")}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Customer: <b className="text-gray-800">{order.customer_name || "Walk-in"}</b></span>
            <span>Table: <b>{order.table_number || "T1"}</b></span>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Time: {moment(order.created_date).format("hh:mm A")}</span>
            <span>Payment: {order.payment_method}</span>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 my-3" />

          <div className="grid grid-cols-12 text-xs font-bold text-gray-700 mb-2 pb-1 border-b border-gray-200">
            <span className="col-span-5">Item</span>
            <span className="col-span-2 text-center">Qty</span>
            <span className="col-span-2 text-right">Price</span>
            <span className="col-span-3 text-right">Amount</span>
          </div>
          {order.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 text-xs text-gray-700 py-1">
              <span className="col-span-5 truncate">{item.name}</span>
              <span className="col-span-2 text-center">{item.quantity}</span>
              <span className="col-span-2 text-right">₹{item.price}</span>
              <span className="col-span-3 text-right font-medium">₹{item.subtotal.toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t-2 border-dashed border-gray-300 my-3" />

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Subtotal</span><span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount_percent > 0 && (
              <div className="flex justify-between text-xs text-green-600">
                <span>Discount ({order.discount_percent}%)</span><span>-₹{order.discount_amount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-gray-600">
              <span>CGST (2.5%)</span><span>₹{order.cgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>SGST (2.5%)</span><span>₹{order.sgst.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 my-3" />

          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>TOTAL</span><span>₹{order.total.toFixed(2)}</span>
          </div>

          <div className="border-t-2 border-dashed border-gray-300 my-3" />

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Thank you for dining with us!</p>
            <p className="text-xs text-gray-400">Visit Again 🙏</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
