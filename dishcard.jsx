import React from "react";
import { Plus, Minus, Flame, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const spiceColors = {
  "Mild": "text-green-500",
  "Medium": "text-yellow-500",
  "Spicy": "text-orange-500",
  "Extra Spicy": "text-red-500",
};

export default function DishCard({ item, quantity, onAdd, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-orange-100"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          {item.is_veg ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
              <Leaf className="w-3 h-3" /> Veg
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
              Non-Veg
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-bold text-orange-600">
            ₹{item.price}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-1 truncate">{item.name}</h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 text-xs font-medium ${spiceColors[item.spice_level] || "text-gray-400"}`}>
            <Flame className="w-3.5 h-3.5" />
            {item.spice_level}
          </div>
          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 rounded-full border-orange-300 text-orange-600 hover:bg-orange-50"
                onClick={() => onRemove(item)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-6 text-center font-bold text-orange-600">{quantity}</span>
              <Button
                size="sm"
                className="h-8 w-8 p-0 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => onAdd(item)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="h-8 px-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs font-semibold shadow-md"
              onClick={() => onAdd(item)}
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
