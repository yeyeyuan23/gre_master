import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Layers, PenTool, Archive } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex h-screen bg-stone-50 text-stone-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-indigo-900">GRE Master</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-stone-600 hover:bg-stone-100'
              }`
            }
          >
            <BookOpen className="w-5 h-5" />
            Vocabulary Search
          </NavLink>
          <NavLink
            to="/flashcards"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-stone-600 hover:bg-stone-100'
              }`
            }
          >
            <Layers className="w-5 h-5" />
            Flashcards
          </NavLink>
          <NavLink
            to="/essay"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-stone-600 hover:bg-stone-100'
              }`
            }
          >
            <PenTool className="w-5 h-5" />
            Essay Grader
          </NavLink>
          <NavLink
            to="/saved-essays"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-stone-600 hover:bg-stone-100'
              }`
            }
          >
            <Archive className="w-5 h-5" />
            Saved Essays
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
