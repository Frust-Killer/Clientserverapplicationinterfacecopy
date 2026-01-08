import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { User, Page } from '../App';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

export function Dashboard({ user, onLogout, onNavigate }: DashboardProps) {
  const stats = [
    {
      id: 1,
      label: 'Étudiants Inscrits',
      value: '1,284',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      label: 'Classes & Programmes',
      value: '48',
      change: '+3',
      trend: 'up',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 3,
      label: 'Taux de Paiement',
      value: '87%',
      change: '-5%',
      trend: 'down',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 4,
      label: 'Certificats Émis',
      value: '342',
      change: '+18%',
      trend: 'up',
      icon: FileText,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    }
  ];

  const enrollmentData = [
    { month: 'Jan', students: 120 },
    { month: 'Fév', students: 150 },
    { month: 'Mar', students: 180 },
    { month: 'Avr', students: 160 },
    { month: 'Mai', students: 200 },
    { month: 'Jun', students: 220 }
  ];

  const paymentStatusData = [
    { name: 'Payé', value: 87, color: '#10b981' },
    { name: 'En retard', value: 8, color: '#f59e0b' },
    { name: 'Non payé', value: 5, color: '#ef4444' }
  ];

  const recentActivities = [
    { id: 1, action: 'Nouvel étudiant inscrit', student: 'Koné Ibrahim', time: 'Il y a 5 min', icon: Users },
    { id: 2, action: 'Paiement reçu', student: 'Diallo Fatou', time: 'Il y a 15 min', icon: CheckCircle },
    { id: 3, action: 'Certificat émis', student: 'Bah Mariama', time: 'Il y a 1h', icon: FileText },
    { id: 4, action: 'Notes publiées', student: 'Licence 3 - Réseaux', time: 'Il y a 2h', icon: BookOpen }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="dashboard" onNavigate={onNavigate} userRole={user.role} />
      
      <div className="flex-1">
        <Navbar user={user} onLogout={onLogout} />
        
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Tableau de Bord</h1>
              <p className="text-gray-600">Vue d'ensemble du système de scolarité SUP'PTIC</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`w-6 h-6 ${stat.textColor}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Enrollment Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <h4 className="text-gray-900 mb-6">Inscriptions Mensuelles</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="students" fill="#0f2847" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Payment Status Pie Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <h4 className="text-gray-900 mb-6">Statut des Paiements</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {paymentStatusData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <span className="text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <h4 className="text-gray-900 mb-6">Activités Récentes</h4>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0f2847]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#0f2847]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.student}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
