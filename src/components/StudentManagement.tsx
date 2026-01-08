import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Filter,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User, Page } from '../App';

interface StudentManagementProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page, studentId?: string) => void;
}

interface Student {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  level: string;
  status: 'active' | 'inactive';
  enrollmentDate: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    matricule: '2024001',
    firstName: 'Ibrahim',
    lastName: 'Koné',
    email: 'ibrahim.kone@supptic.edu',
    phone: '+225 07 12 34 56 78',
    program: 'Réseaux et Télécommunications',
    level: 'Licence 3',
    status: 'active',
    enrollmentDate: '2022-09-15'
  },
  {
    id: '2',
    matricule: '2024002',
    firstName: 'Fatou',
    lastName: 'Diallo',
    email: 'fatou.diallo@supptic.edu',
    phone: '+225 05 98 76 54 32',
    program: 'Génie Logiciel',
    level: 'Master 1',
    status: 'active',
    enrollmentDate: '2021-09-10'
  },
  {
    id: '3',
    matricule: '2024003',
    firstName: 'Mariama',
    lastName: 'Bah',
    email: 'mariama.bah@supptic.edu',
    phone: '+225 01 23 45 67 89',
    program: 'Cybersécurité',
    level: 'Licence 2',
    status: 'active',
    enrollmentDate: '2023-09-12'
  },
  {
    id: '4',
    matricule: '2024004',
    firstName: 'Amadou',
    lastName: 'Traoré',
    email: 'amadou.traore@supptic.edu',
    phone: '+225 07 11 22 33 44',
    program: 'Systèmes Informatiques',
    level: 'Licence 1',
    status: 'active',
    enrollmentDate: '2024-09-05'
  },
  {
    id: '5',
    matricule: '2024005',
    firstName: 'Aïcha',
    lastName: 'Camara',
    email: 'aicha.camara@supptic.edu',
    phone: '+225 05 44 55 66 77',
    program: 'Réseaux et Télécommunications',
    level: 'Master 2',
    status: 'active',
    enrollmentDate: '2020-09-08'
  }
];

export function StudentManagement({ user, onLogout, onNavigate }: StudentManagementProps) {
  const [students] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const programs = ['Tous', 'Réseaux et Télécommunications', 'Génie Logiciel', 'Cybersécurité', 'Systèmes Informatiques'];
  const levels = ['Tous', 'Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricule.includes(searchQuery) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProgram = filterProgram === 'all' || student.program === filterProgram;
    const matchesLevel = filterLevel === 'all' || student.level === filterLevel;

    return matchesSearch && matchesProgram && matchesLevel;
  });

  const handleViewStudent = (studentId: string) => {
    onNavigate('student-profile', studentId);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowAddModal(true);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    toast.success(`Étudiant ${selectedStudent?.firstName} ${selectedStudent?.lastName} supprimé avec succès`);
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  const handleSaveStudent = () => {
    if (selectedStudent) {
      toast.success('Étudiant modifié avec succès');
    } else {
      toast.success('Nouvel étudiant ajouté avec succès');
    }
    setShowAddModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="students" onNavigate={onNavigate} userRole={user.role} />
      
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
                <h1 className="text-gray-900 mb-2">Gestion des Étudiants</h1>
                <p className="text-gray-600">{filteredStudents.length} étudiant(s) trouvé(s)</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedStudent(null);
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0f2847] to-[#1e3a5f] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                Ajouter un Étudiant
              </motion.button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher par nom, matricule, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={filterProgram}
                    onChange={(e) => setFilterProgram(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  >
                    <option value="all">Tous les programmes</option>
                    {programs.slice(1).map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
                  >
                    <option value="all">Tous les niveaux</option>
                    {levels.slice(1).map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Matricule</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Nom Complet</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Programme</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Niveau</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">{student.matricule}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{student.program}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{student.level}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            student.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {student.status === 'active' ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewStudent(student.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Voir le profil"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(student)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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

      {/* Add/Edit Student Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">
                  {selectedStudent ? 'Modifier l\'Étudiant' : 'Ajouter un Nouvel Étudiant'}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">Prénom</label>
                    <input
                      type="text"
                      defaultValue={selectedStudent?.firstName}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                      placeholder="Prénom"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">Nom</label>
                    <input
                      type="text"
                      defaultValue={selectedStudent?.lastName}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                      placeholder="Nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedStudent?.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    placeholder="email@supptic.edu"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Téléphone</label>
                  <input
                    type="tel"
                    defaultValue={selectedStudent?.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    placeholder="+225 XX XX XX XX XX"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">Programme</label>
                    <select
                      defaultValue={selectedStudent?.program}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    >
                      {programs.slice(1).map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-700">Niveau</label>
                    <select
                      defaultValue={selectedStudent?.level}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    >
                      {levels.slice(1).map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveStudent}
                    className="px-4 py-2 bg-gradient-to-r from-[#0f2847] to-[#1e3a5f] text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    {selectedStudent ? 'Enregistrer' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer l'étudiant <span className="font-medium">{selectedStudent.firstName} {selectedStudent.lastName}</span> ? Cette action est irréversible.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
