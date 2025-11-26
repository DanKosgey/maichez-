import React, { useState, useMemo } from 'react';
import { useAdminPortal } from '../AdminPortalContext';
import { StudentProfile } from '../../../types';
import { 
  Users, Search, Filter, Edit2, Trash2, Save, X, AlertTriangle, CheckCircle 
} from 'lucide-react';

const StudentManagementTab: React.FC = () => {
  const { students, trades, refreshData, updateStudentProfile, deleteStudentProfile } = useAdminPortal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editedStudent, setEditedStudent] = useState<Partial<StudentProfile> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Enhance student data with trade information
  const enhancedStudents = useMemo(() => {
    return students.map(student => {
      // Find trades for this student
      const studentTrades = trades.filter(trade => trade.studentId === student.id);
      
      // Calculate additional trade stats
      const totalTrades = studentTrades.length;
      const wins = studentTrades.filter(t => t.status === 'win').length;
      const losses = studentTrades.filter(t => t.status === 'loss').length;
      const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
      const totalPnL = studentTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
      
      return {
        ...student,
        stats: {
          ...student.stats,
          tradesCount: totalTrades,
          winRate,
          totalPnL
        },
        recentTrades: studentTrades.slice(0, 3) // Last 3 trades
      };
    });
  }, [students, trades]);

  // Transform StudentProfile data to match the table structure
  const tableData = enhancedStudents.map(student => ({
    id: student.id,
    name: student.name || 'Unknown',
    email: student.email || '',
    tier: student.tier || 'free',
    status: student.status || 'inactive',
    joinDate: student.joinedDate || '',
    trades: student.stats?.tradesCount || 0,
    winRate: `${student.stats?.winRate || 0}%`,
    totalPnL: student.stats?.totalPnL || 0,
    avgRiskReward: student.stats?.avgRiskReward || 0,
    recentTrades: student.recentTrades || []
  }));

  const filteredStudents = tableData.filter(student => 
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.tier.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterTier === 'all' || student.tier === filterTier)
  );

  const handleEditClick = (student: any) => {
    setEditingStudentId(student.id);
    setEditedStudent({
      id: student.id,
      name: student.name,
      email: student.email,
      tier: student.tier,
      status: student.status
    });
  };

  const handleSaveEdit = async () => {
    if (!editedStudent || !editingStudentId) return;

    try {
      setLoading(true);
      setError(null);
      
      // Update the profile in the database
      await updateStudentProfile(editingStudentId, {
        name: editedStudent.name,
        email: editedStudent.email,
        tier: editedStudent.tier
      });

      // Reset editing state
      setEditingStudentId(null);
      setEditedStudent(null);
      setSuccess('Student profile updated successfully!');
      
      // Refresh the data
      await refreshData();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error updating student profile:', err);
      // Provide more specific error messages
      if (err.message && err.message.includes('No profile found')) {
        setError('Student profile not found. The user may have been deleted.');
      } else if (err.code === '403' || (err.message && err.message.includes('permission'))) {
        setError('Permission denied. You may not have access to modify this profile.');
      } else {
        setError('Failed to update student profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${studentName}'s profile? This action cannot be undone.`)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Delete the profile from the database
      await deleteStudentProfile(studentId);

      setSuccess('Student profile deleted successfully!');
      
      // Refresh the data
      await refreshData();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error deleting student profile:', err);
      // Provide more specific error messages
      if (err.code === '403' || (err.message && err.message.includes('permission'))) {
        setError('Permission denied. You may not have access to delete this profile.');
      } else {
        setError('Failed to delete student profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
    setEditedStudent(null);
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'elite': return 'bg-purple-500/20 text-purple-400';
      case 'professional': return 'bg-blue-500/20 text-blue-400';
      case 'foundation': return 'bg-green-500/20 text-green-400';
      case 'free': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'at-risk': return 'bg-yellow-500/20 text-yellow-400';
      case 'inactive': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-trade-neon to-blue-400">Student Management</h2>
        <p className="text-gray-400">Manage student profiles, subscription tiers, and accounts</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <span className="text-green-400">{success}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <span className="text-red-400">{error}</span>
          <button 
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search students by name, email, or tier..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-trade-neon focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select 
            value={filterTier} 
            onChange={e => setFilterTier(e.target.value)} 
            className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-trade-neon outline-none"
          >
            <option value="all">All Tiers</option>
            <option value="elite">Elite</option>
            <option value="professional">Professional</option>
            <option value="foundation">Foundation</option>
            <option value="free">Free</option>
          </select>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700/50">
                <th className="pb-4 font-medium">Student</th>
                <th className="pb-4 font-medium">Tier</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Join Date</th>
                <th className="pb-4 font-medium">Trades</th>
                <th className="pb-4 font-medium">Win Rate</th>
                <th className="pb-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-900/50 transition-colors">
                  {editingStudentId === student.id ? (
                    // Editing row
                    <>
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getTierColor(student.tier).includes('purple') ? 'bg-purple-600/30' : 'bg-gray-700/50'}`}>
                            {editedStudent?.name?.charAt(0) || student.name?.charAt(0) || '?'}
                          </div>
                          <div className="flex flex-col">
                            <input
                              type="text"
                              value={editedStudent?.name || ''}
                              onChange={(e) => setEditedStudent({...editedStudent, name: e.target.value})}
                              className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white mb-1"
                            />
                            <input
                              type="email"
                              value={editedStudent?.email || ''}
                              onChange={(e) => setEditedStudent({...editedStudent, email: e.target.value})}
                              className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white text-xs"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <select
                          value={editedStudent?.tier || student.tier}
                          onChange={(e) => setEditedStudent({...editedStudent, tier: e.target.value})}
                          className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-white"
                        >
                          <option value="free">Free</option>
                          <option value="foundation">Foundation</option>
                          <option value="professional">Professional</option>
                          <option value="elite">Elite</option>
                        </select>
                      </td>
                      <td className="py-4">
                        <span className={`text-xs font-bold uppercase px-3 py-1 rounded ${getStatusColor(student.status).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{new Date(student.joinDate).toLocaleDateString()}</td>
                      <td className="py-4 text-white">{student.trades}</td>
                      <td className="py-4 text-white">{student.winRate}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSaveEdit}
                            disabled={loading}
                            className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-lg disabled:opacity-50"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            disabled={loading}
                            className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    // Normal row
                    <>
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getTierColor(student.tier).includes('purple') ? 'bg-purple-600/30' : 'bg-gray-700/50'}`}>
                            {student.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <div className="font-bold text-white">{student.name || 'Unknown'}</div>
                            <div className="text-xs text-gray-400">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`text-xs font-bold uppercase px-3 py-1 rounded ${getTierColor(student.tier).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                          {student.tier}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`text-xs font-bold uppercase px-3 py-1 rounded ${getStatusColor(student.status).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{new Date(student.joinDate).toLocaleDateString()}</td>
                      <td className="py-4 text-white">{student.trades}</td>
                      <td className="py-4 text-white">{student.winRate}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditClick(student)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id, student.name)}
                            disabled={loading}
                            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <p className="text-gray-500">No students found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagementTab;