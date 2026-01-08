import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { 
  ArrowLeft, 
  Download, 
  Mail, 
  Phone,
  Calendar,
  Award,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User, Page } from '../App';

interface StudentProfileProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
  studentId: string;
}

interface Grade {
  subject: string;
  grade: number;
  coefficient: number;
  semester: string;
}

export function StudentProfile({ user, onLogout, onNavigate, studentId }: StudentProfileProps) {
  // Mock student data
  const student = {
    id: studentId,
    matricule: '2024001',
    firstName: 'Ibrahim',
    lastName: 'Koné',
    email: 'ibrahim.kone@supptic.edu',
    phone: '+225 07 12 34 56 78',
    dateOfBirth: '2002-03-15',
    program: 'Réseaux et Télécommunications',
    level: 'Licence 3',
    status: 'active',
    enrollmentDate: '2022-09-15',
    address: 'Abidjan, Cocody',
    nationality: 'Ivoirienne',
    gender: 'Masculin'
  };

  const grades: Grade[] = [
    { subject: 'Réseaux Informatiques', grade: 16.5, coefficient: 4, semester: 'Semestre 1' },
    { subject: 'Sécurité Réseau', grade: 14.0, coefficient: 3, semester: 'Semestre 1' },
    { subject: 'Programmation Système', grade: 15.5, coefficient: 3, semester: 'Semestre 1' },
    { subject: 'Architecture des Systèmes', grade: 13.0, coefficient: 2, semester: 'Semestre 1' },
    { subject: 'Télécommunications', grade: 17.0, coefficient: 4, semester: 'Semestre 2' },
    { subject: 'Administration Réseau', grade: 16.0, coefficient: 3, semester: 'Semestre 2' }
  ];

  const calculateAverage = (semester: string) => {
    const semesterGrades = grades.filter(g => g.semester === semester);
    const totalPoints = semesterGrades.reduce((sum, g) => sum + (g.grade * g.coefficient), 0);
    const totalCoef = semesterGrades.reduce((sum, g) => sum + g.coefficient, 0);
    return (totalPoints / totalCoef).toFixed(2);
  };

  const overallAverage = () => {
    const totalPoints = grades.reduce((sum, g) => sum + (g.grade * g.coefficient), 0);
    const totalCoef = grades.reduce((sum, g) => sum + g.coefficient, 0);
    return (totalPoints / totalCoef).toFixed(2);
  };

  const handleDownloadCertificate = () => {
    toast.success('Certificat de scolarité téléchargé avec succès');
  };

  const handleDownloadTranscript = () => {
    toast.success('Relevé de notes téléchargé avec succès');
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
            {/* Back Button */}
            <button
              onClick={() => onNavigate('students')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#0f2847] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la liste des étudiants
            </button>

            {/* Student Header Card */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0f2847] to-[#14b8a6] flex items-center justify-center text-white text-3xl">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>
                </div>

                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h1 className="text-gray-900 mb-2">
                        {student.firstName} {student.lastName}
                      </h1>
                      <p className="text-gray-600 mb-2">Matricule: {student.matricule}</p>
                      <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                        Actif
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadCertificate}
                        className="flex items-center gap-2 px-4 py-2 bg-[#14b8a6] text-white rounded-lg hover:shadow-lg transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Certificat
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownloadTranscript}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0f2847] to-[#1e3a5f] text-white rounded-lg hover:shadow-lg transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Relevé de Notes
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{student.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Inscrit le {new Date(student.enrollmentDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <h3 className="text-gray-900 mb-4">Informations Personnelles</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Date de Naissance</p>
                    <p className="text-gray-900">{new Date(student.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Genre</p>
                    <p className="text-gray-900">{student.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nationalité</p>
                    <p className="text-gray-900">{student.nationality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="text-gray-900">{student.address}</p>
                  </div>
                </div>
              </motion.div>

              {/* Academic Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <h3 className="text-gray-900 mb-4">Informations Académiques</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Programme</p>
                    <p className="text-gray-900">{student.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Niveau</p>
                    <p className="text-gray-900">{student.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Année d'Inscription</p>
                    <p className="text-gray-900">{new Date(student.enrollmentDate).getFullYear()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <span className="inline-flex px-2 py-1 rounded bg-green-100 text-green-800 text-sm">
                      Actif
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Academic Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gradient-to-br from-[#0f2847] to-[#1e3a5f] rounded-xl p-6 text-white shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5" />
                  <h3 className="text-white">Performance Académique</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Moyenne Générale</p>
                    <p className="text-3xl">{overallAverage()}/20</p>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Excellent rendement</span>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/80">Semestre 1</span>
                      <span className="text-white">{calculateAverage('Semestre 1')}/20</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Semestre 2</span>
                      <span className="text-white">{calculateAverage('Semestre 2')}/20</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Grades Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#0f2847]" />
                  <h3 className="text-gray-900">Relevé de Notes</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Matière</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Note</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Coefficient</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Semestre</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Appréciation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {grades.map((grade, index) => {
                      const getAppreciation = (score: number) => {
                        if (score >= 16) return { text: 'Très Bien', color: 'text-green-600 bg-green-50' };
                        if (score >= 14) return { text: 'Bien', color: 'text-blue-600 bg-blue-50' };
                        if (score >= 12) return { text: 'Assez Bien', color: 'text-yellow-600 bg-yellow-50' };
                        if (score >= 10) return { text: 'Passable', color: 'text-orange-600 bg-orange-50' };
                        return { text: 'Insuffisant', color: 'text-red-600 bg-red-50' };
                      };

                      const appreciation = getAppreciation(grade.grade);

                      return (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">{grade.subject}</td>
                          <td className="px-6 py-4 text-gray-900">{grade.grade.toFixed(1)}/20</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{grade.coefficient}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{grade.semester}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 rounded text-xs ${appreciation.color}`}>
                              {appreciation.text}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
