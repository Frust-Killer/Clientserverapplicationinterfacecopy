import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard,
  ChevronRight 
} from 'lucide-react';
import type { Page, UserRole } from '../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  userRole: UserRole;
}

interface MenuItem {
  id: Page;
  label: string;
  icon: typeof LayoutDashboard;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Tableau de Bord',
    icon: LayoutDashboard,
    roles: ['administrator', 'academic', 'financial']
  },
  {
    id: 'students',
    label: 'Gestion Étudiants',
    icon: Users,
    roles: ['administrator', 'academic']
  },
  {
    id: 'academic-records',
    label: 'Relevés de Notes',
    icon: FileText,
    roles: ['administrator', 'academic']
  },
  {
    id: 'fees',
    label: 'Frais de Scolarité',
    icon: CreditCard,
    roles: ['administrator', 'financial']
  }
];

export function Sidebar({ currentPage, onNavigate, userRole }: SidebarProps) {
  const accessibleItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-white border-r border-gray-200 min-h-screen p-4"
    >
      <nav className="space-y-2">
        {accessibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-[#0f2847] to-[#1e3a5f] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#14b8a6]'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </nav>
    </motion.aside>
  );
}
