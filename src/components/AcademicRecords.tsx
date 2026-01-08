import { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { 
  Search, 
  Download, 
  Filter,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';
import type { User, Page } from '../App';

interface AcademicRecordsProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

interface ClassRecord {
  id: string;
  className: string;
  program: string;
  level: string;
  students: number;
  averageGrade: number;
  passRate: number;
  semester: string;
}

export function AcademicRecords({ user, onLogout, onNavigate }: AcademicRecordsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSemester, setFilterSemester] = useState('all');

  const classRecords: ClassRecord[] = [
    {
      id: '1',
      className: 'Licence 3 - Réseaux A',
      program: 'Réseaux et Télécommunications',
      level: 'Licence 3',
      students: 45,
      averageGrade: 14.2,
      passRate: 88,
      semester: 'Semestre 1'
    },
    {
      id: '2',
      className: 'Master 1 - Génie Logiciel',
      program: 'Génie Logiciel',
      level: 'Master 1',
      students: 38,
      averageGrade: 15.5,
      passRate: 95,
      semester: 'Semestre 1'
    },
    {
      id: '3',
      className: 'Licence 2 - Cybersécurité',
      program: 'Cybersécurité',
      level: 'Licence 2',
      students: 52,
      averageGrade: 13.8,
      passRate: 82,
      semester: 'Semestre 2'
    },
    {
      id: '4',
      className: 'Licence 1 - Systèmes Informatiques',
      program: 'Systèmes Informatiques',
      level: 'Licence 1',
      students: 60,
      averageGrade: 12.5,
      passRate: 75,
      semester: 'Semestre 1'
    },
    {
      id: '5',
      className: 'Master 2 - Réseaux B',
      program: 'Réseaux et Télécommunications',
      level: 'Master 2',
      students: 28,
      averageGrade: 16.3,
      passRate: 100,
      semester: 'Semestre 2'
    }
  ];

  const performanceData = [
    { level: 'L1', average: 12.5, students: 60 },
    { level: 'L2', average: 13.8, students: 52 },
    { level: 'L3', average: 14.2, students: 45 },
    { level: 'M1', average: 15.5, students: 38 },
    { level: 'M2', average: 16.3, students: 28 }
  ];

  const filteredRecords = classRecords.filter(record => {
    const matchesSearch = 
      record.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSemester = filterSemester === 'all' || record.semester === filterSemester;

    return matchesSearch && matchesSemester;
  });

  const handleExportRecords = () => {
    toast.success('Relevés de notes exportés avec succès');
  };

  const handleExportClassReport = (className: string) => {
    toast.success(`Rapport de ${className} téléchargé avec succès`);
  };

  const overallStats = {
    totalStudents: classRecords.reduce((sum, r) => sum + r.students, 0),
    averageGrade: (classRecords.reduce((sum, r) => sum + r.averageGrade, 0) / classRecords.length).toFixed(1),
    overallPassRate: Math.round(classRecords.reduce((sum, r) => sum + r.passRate, 0) / classRecords.length)
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="academic-records" onNavigate={onNavigate} userRole={user.role} />
      
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
                <h1 className="text-gray-900 mb-2">Relevés de Notes</h1>
                <p className="text-gray-600">Gestion et consultation des résultats académiques</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportRecords}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0f2847] to-[#1e3a5f] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                Exporter Tout
              </motion.button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-green-600">+5%</span>
                </div>
                <h3 className="text-gray-900 mb-1">{overallStats.totalStudents}</h3>
                <p className="text-sm text-gray-600">Total Étudiants</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm text-green-600">+0.8</span>
                </div>
                <h3 className="text-gray-900 mb-1">{overallStats.averageGrade}/20</h3>
                <p className="text-sm text-gray-600">Moyenne Générale</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600">+3%</span>
                </div>
                <h3 className="text-gray-900 mb-1">{overallStats.overallPassRate}%</h3>
                <p className="text-sm text-gray-600">Taux de Réussite</p>
              </motion.div>
            </div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6"
            >
              <h4 className="text-gray-900 mb-6">Performance par Niveau</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="level" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[0, 20]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}/20`, 'Moyenne']}
                  />
                  <Bar dataKey="average" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une classe ou un programme..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={filterSemester}
                    onChange={(e) => setFilterSemester(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  >
                    <option value="all">Tous les semestres</option>
                    <option value="Semestre 1">Semestre 1</option>
                    <option value="Semestre 2">Semestre 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Class Records Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Classe</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Programme</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Étudiants</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Moyenne</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Taux de Réussite</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Semestre</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">{record.className}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{record.program}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{record.students}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">{record.averageGrade.toFixed(1)}/20</span>
                            {record.averageGrade >= 14 ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-orange-600" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  record.passRate >= 90
                                    ? 'bg-green-500'
                                    : record.passRate >= 75
                                    ? 'bg-blue-500'
                                    : 'bg-orange-500'
                                }`}
                                style={{ width: `${record.passRate}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-900 w-12">{record.passRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{record.semester}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleExportClassReport(record.className)}
                            className="p-2 text-[#14b8a6] hover:bg-[#14b8a6]/10 rounded transition-colors"
                            title="Télécharger le rapport"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
