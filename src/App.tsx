import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { StudentManagement } from './components/StudentManagement';
import { StudentProfile } from './components/StudentProfile';
import { AcademicRecords } from './components/AcademicRecords';
import { FeesManagement } from './components/FeesManagement';
import { Toaster } from 'sonner@2.0.3';

export type UserRole = 'administrator' | 'academic' | 'financial';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

export type Page = 'dashboard' | 'students' | 'student-profile' | 'academic-records' | 'fees';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    setSelectedStudentId(null);
  };

  const handleNavigate = (page: Page, studentId?: string) => {
    setCurrentPage(page);
    if (studentId) {
      setSelectedStudentId(studentId);
    }
  };

  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'dashboard' && (
        <Dashboard user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {currentPage === 'students' && (
        <StudentManagement user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {currentPage === 'student-profile' && selectedStudentId && (
        <StudentProfile 
          user={user} 
          onLogout={handleLogout} 
          onNavigate={handleNavigate}
          studentId={selectedStudentId}
        />
      )}
      {currentPage === 'academic-records' && (
        <AcademicRecords user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      {currentPage === 'fees' && (
        <FeesManagement user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
}
