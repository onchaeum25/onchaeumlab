import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Trash2, ShieldCheck, User as UserIcon, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Navigate } from 'react-router-dom';

export default function UsersPage() {
  const { user, users, addUser, deleteUser } = useAuthStore();
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newPw, setNewPw] = useState('');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  // 총관리자가 아니면 접근 불가 (보강된 보안)
  if (!user?.isSuper) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.find(u => u.id === newId)) {
      alert('이미 존재하는 아이디입니다.');
      return;
    }
    
    addUser({ id: newId, name: newName, password: newPw });
    setNewId(''); setNewName(''); setNewPw('');
    alert('새로운 관리자 계정이 생성되었습니다.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">계정 관리</h2>
          <p className="text-gray-400 mt-2 font-medium">관리자 계정을 추가하거나 삭제할 수 있습니다.</p>
        </div>
        <div className="bg-point/10 px-4 py-2 rounded-2xl flex items-center gap-2 border border-point/20">
          <ShieldCheck size={18} className="text-point" />
          <span className="text-sm font-bold text-point">총관리자 권한 활성화</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 신규 계정 생성 폼 */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-point/10 flex items-center justify-center text-point">
                <UserPlus size={20} />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">신규 관리자 등록</h3>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">아이디</label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" required value={newId} onChange={(e) => setNewId(e.target.value)}
                    placeholder="접속 아이디"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-point/20 outline-none transition-all font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">암호</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="password" required value={newPw} onChange={(e) => setNewPw(e.target.value)}
                    placeholder="초기 비밀번호"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-point/20 outline-none transition-all font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">이름/직책</label>
                <input 
                  type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
                  placeholder="예: 홍길동 팀장"
                  className="w-full px-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-point/20 outline-none transition-all font-medium"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
              >
                계정 생성하기
              </button>
            </form>
          </motion.div>
        </div>

        {/* 관리자 목록 리스트 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">전체 계정 리스트 ({users.length + 1})</h3>
            </div>
            
            <div className="divide-y divide-gray-50">
              {/* 총관리자 카드 (삭제 불가) */}
              <div className="p-6 flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-point flex items-center justify-center text-white font-extra-bold shadow-lg">👑</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">총관리자 (admin)</span>
                      <span className="text-[10px] bg-point text-white px-2 py-0.5 rounded-full font-bold">SYSTEM</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">이 계정은 시스템 기본 계정으로 수정/삭제가 불가능합니다.</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
              </div>

              {/* 생성된 관리자 리스트 */}
              {users.map((u) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={u.id} 
                  className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold border border-blue-100">
                      MS
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{u.name} ({u.id})</span>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase">Staff</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">접속 비밀번호: <span className="blur-[1.5px] group-hover:blur-none transition-all">{u.password}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {showConfirm === u.id ? (
                      <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-300">
                        <button 
                          onClick={() => { deleteUser(u.id); setShowConfirm(null); }}
                          className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 shadow-md shadow-red-200"
                        >
                          삭제 확정
                        </button>
                        <button 
                          onClick={() => setShowConfirm(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-300"
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setShowConfirm(u.id)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        title="계정 삭제"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {users.length === 0 && (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
                    <UserIcon size={32} />
                  </div>
                  <p className="text-gray-400 font-bold">등록된 보조 관리자가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-sm">보안 경고</h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                관리자 계정은 시스템의 중요 데이터를 제어할 수 있습니다. 
                신뢰할 수 있는 담당자에게만 계정을 발급하시기 바라며, 
                계정 정보를 주기적으로 변경할 것을 권장합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
