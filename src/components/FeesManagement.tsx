import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { 
  Search, 
  Plus, 
  Download,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  X,
  Calendar
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { toast } from 'sonner@2.0.3';
import type { User, Page } from '../App';

interface FeesManagementProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

interface FeeRecord {
  id: string;
  studentName: string;
  matricule: string;
  program: string;
  level: string;
  totalAmount: number;
  paidAmount: number;
  status: 'paid' | 'partial' | 'unpaid' | 'late';
  dueDate: string;
  lastPaymentDate?: string;
}

export function FeesManagement({ user, onLogout, onNavigate }: FeesManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | null>(null);

  const feeRecords: FeeRecord[] = [
    {
      id: '1',
      studentName: 'Ibrahim Koné',
      matricule: '2024001',
      program: 'Réseaux et Télécommunications',
      level: 'Licence 3',
      totalAmount: 850000,
      paidAmount: 850000,
      status: 'paid',
      dueDate: '2024-10-15',
      lastPaymentDate: '2024-09-20'
    },
    {
      id: '2',
      studentName: 'Fatou Diallo',
      matricule: '2024002',
      program: 'Génie Logiciel',
      level: 'Master 1',
      totalAmount: 1200000,
      paidAmount: 600000,
      status: 'partial',
      dueDate: '2024-11-30',
      lastPaymentDate: '2024-10-05'
    },
    {
      id: '3',
      studentName: 'Mariama Bah',
      matricule: '2024003',
      program: 'Cybersécurité',
      level: 'Licence 2',
      totalAmount: 750000,
      paidAmount: 0,
      status: 'late',
      dueDate: '2024-09-30'
    },
    {
      id: '4',
      studentName: 'Amadou Traoré',
      matricule: '2024004',
      program: 'Systèmes Informatiques',
      level: 'Licence 1',
      totalAmount: 700000,
      paidAmount: 700000,
      status: 'paid',
      dueDate: '2024-10-20',
      lastPaymentDate: '2024-09-15'
    },
    {
      id: '5',
      studentName: 'Aïcha Camara',
      matricule: '2024005',
      program: 'Réseaux et Télécommunications',
      level: 'Master 2',
      totalAmount: 1300000,
      paidAmount: 0,
      status: 'unpaid',
      dueDate: '2024-12-15'
    }
  ];

  const paymentStatusData = [
    { name: 'Payé', value: 40, color: '#10b981', count: 2 },
    { name: 'Partiel', value: 20, color: '#f59e0b', count: 1 },
    { name: 'Non payé', value: 20, color: '#6b7280', count: 1 },
    { name: 'En retard', value: 20, color: '#ef4444', count: 1 }
  ];

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 45000000 },
    { month: 'Fév', revenue: 52000000 },
    { month: 'Mar', revenue: 48000000 },
    { month: 'Avr', revenue: 55000000 },
    { month: 'Mai', revenue: 58000000 },
    { month: 'Jun', revenue: 62000000 }
  ];

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.matricule.includes(searchQuery);
    
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalRevenue: feeRecords.reduce((sum, r) => sum + r.paidAmount, 0),
    expectedRevenue: feeRecords.reduce((sum, r) => sum + r.totalAmount, 0),
    paidCount: feeRecords.filter(r => r.status === 'paid').length,
    unpaidCount: feeRecords.filter(r => r.status === 'unpaid' || r.status === 'late').length
  };

  const collectionRate = ((totalStats.totalRevenue / totalStats.expectedRevenue) * 100).toFixed(1);

  const handleRecordPayment = (record: FeeRecord) => {
    setSelectedRecord(record);
    setShowPaymentModal(true);
  };

  const handleSavePayment = () => {
    toast.success(`Paiement enregistré pour ${selectedRecord?.studentName}`);
    setShowPaymentModal(false);
    setSelectedRecord(null);
  };

  const handleExportReport = () => {
    toast.success('Rapport des paiements exporté avec succès');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      paid: { label: 'Payé', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      partial: { label: 'Partiel', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      unpaid: { label: 'Non payé', color: 'bg-gray-100 text-gray-800', icon: Clock },
      late: { label: 'En retard', color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    return configs[status as keyof typeof configs] || configs.unpaid;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="fees" onNavigate={onNavigate} userRole={user.role} />
      
      <div className="flex-1">
        <Navbar user={user} onLogout={onLogout} />
        
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-gray-900 mb-2">Gestion des Frais de Scolarité</h1>
                <p className="text-gray-600">Suivi et gestion des paiements étudiants</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportReport}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0f2847] to-[#1e3a5f] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                Exporter Rapport
              </motion.button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600">+12%</span>
                </div>
                <h3 className="text-gray-900 mb-1">{formatCurrency(totalStats.totalRevenue)}</h3>
                <p className="text-sm text-gray-600">Revenus Collectés</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-blue-600">{collectionRate}%</span>
                </div>
                <h3 className="text-gray-900 mb-1">{formatCurrency(totalStats.expectedRevenue)}</h3>
                <p className="text-sm text-gray-600">Revenus Attendus</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-gray-900 mb-1">{totalStats.paidCount}</h3>
                <p className="text-sm text-gray-600">Paiements Complets</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-red-50">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <h3 className="text-gray-900 mb-1">{totalStats.unpaidCount}</h3>
                <p className="text-sm text-gray-600">Paiements En Attente</p>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <h4 className="text-gray-900 mb-6">Revenus Mensuels</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [formatCurrency(value), 'Revenus']}
                    />
                    <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Payment Status Pie Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <h4 className="text-gray-900 mb-6">Répartition des Paiements</h4>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
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
                      <span className="text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom ou matricule..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="paid">Payé</option>
                    <option value="partial">Partiel</option>
                    <option value="unpaid">Non payé</option>
                    <option value="late">En retard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fee Records Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Étudiant</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Matricule</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Programme</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Montant Total</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Payé</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Date Limite</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.map((record, index) => {
                      const statusConfig = getStatusConfig(record.status);
                      const Icon = statusConfig.icon;
                      const remainingAmount = record.totalAmount - record.paidAmount;
                      const paymentProgress = (record.paidAmount / record.totalAmount) * 100;

                      return (
                        <motion.tr
                          key={record.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">{record.studentName}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{record.matricule}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{record.program}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(record.totalAmount)}</td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <p className="text-sm text-gray-900">{formatCurrency(record.paidAmount)}</p>
                              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full transition-all"
                                  style={{ width: `${paymentProgress}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${statusConfig.color}`}>
                              <Icon className="w-3 h-3" />
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(record.dueDate).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4">
                            {record.status !== 'paid' && (
                              <button
                                onClick={() => handleRecordPayment(record)}
                                className="px-3 py-1 bg-[#14b8a6] text-white rounded-lg hover:shadow-md transition-all text-sm"
                              >
                                Enregistrer
                              </button>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Enregistrer un Paiement</h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Étudiant</p>
                  <p className="text-gray-900">{selectedRecord.studentName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Matricule</p>
                  <p className="text-gray-900">{selectedRecord.matricule}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Montant Total</p>
                    <p className="text-gray-900">{formatCurrency(selectedRecord.totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Déjà Payé</p>
                    <p className="text-gray-900">{formatCurrency(selectedRecord.paidAmount)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Montant Restant</p>
                  <p className="text-green-600">{formatCurrency(selectedRecord.totalAmount - selectedRecord.paidAmount)}</p>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Montant du Paiement</label>
                  <input
                    type="number"
                    placeholder="Entrez le montant"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    max={selectedRecord.totalAmount - selectedRecord.paidAmount}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Date du Paiement</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Mode de Paiement</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]">
                    <option>Espèces</option>
                    <option>Virement Bancaire</option>
                    <option>Mobile Money</option>
                    <option>Chèque</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSavePayment}
                    className="px-4 py-2 bg-gradient-to-r from-[#0f2847] to-[#1e3a5f] text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
