import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Layers, PenTool, Archive, Menu, X, AlignLeft } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", icon: BookOpen, label: "Search" },
    { to: "/flashcards", icon: Layers, label: "Cards" },
    { to: "/analyze", icon: AlignLeft, label: "Analyze" },
    { to: "/essay", icon: PenTool, label: "Grader" },
    { to: "/saved-essays", icon: Archive, label: "Essays" },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-stone-50 text-stone-900 overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-stone-200 px-4 py-3 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold tracking-tight text-indigo-900">GRE Master</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar (Desktop) / Overlay Menu (Mobile) */}
      <aside className={`
        fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:border-r lg:border-stone-200 flex flex-col pt-16 lg:pt-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 hidden lg:block">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-900">GRE Master</h1>
        </div>
        <nav className="flex-1 px-4 py-6 lg:py-0 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-stone-600 hover:bg-stone-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label === "Search" ? "Vocabulary Search" : 
               item.label === "Analyze" ? "Sentence Analyzer" :
               item.label === "Cards" ? "Flashcards" : 
               item.label === "Grader" ? "Essay Grader" : "Saved Essays"}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-2 py-1 flex justify-around items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'text-indigo-700' : 'text-stone-400'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
}
