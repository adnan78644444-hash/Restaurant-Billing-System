import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, LayoutDashboard, ClipboardList, ChefHat, BookOpen } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: UtensilsCrossed, label: "Menu & Order", path: "/order" },
  { icon: BookOpen, label: "Menu Management", path: "/menu-management" },
  { icon: ClipboardList, label: "Orders", path: "/orders" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white flex flex-col z-50">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">Spice Garden</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Restaurant POS</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">GST: 5%</p>
          <p className="text-xs text-gray-400 mt-0.5">CGST 2.5% + SGST 2.5%</p>
        </div>
      </div>
    </aside>
  );
}
