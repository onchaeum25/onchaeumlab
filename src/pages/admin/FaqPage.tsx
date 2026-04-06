import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useFAQStore, FAQItem } from '../../store/useFAQStore';

export default function FaqPage() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useFAQStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    category: '서비스',
    question: '',
    answer: '',
    order: 0
  });

  const categories = ['서비스', '결제', '포트폴리오', '기타'];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingFAQ(null);
    setFormData({
      category: '서비스',
      question: '',
      answer: '',
      order: faqs.length
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setFormData({
      category: faq.category,
      question: faq.question,
      answer: faq.answer,
      order: faq.order
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFAQ) {
      updateFAQ(editingFAQ.id, formData);
    } else {
      addFAQ(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말 이 FAQ를 삭제하시겠습니까?')) {
      deleteFAQ(id);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ 관리</h1>
          <p className="text-gray-500">자주 묻는 질문들을 관리합니다.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#232589] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          FAQ 추가
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <HelpCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 질문</p>
              <h3 className="text-2xl font-bold">{faqs.length}개</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Plus size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">카테고리 수</p>
              <h3 className="text-2xl font-bold">{new Set(faqs.map(f => f.category)).size}개</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search & List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="질문 또는 답변 내용으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
          />
        </div>

        <div className="divide-y divide-gray-100">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {faq.category}
                      </span>
                      <span className="font-semibold text-gray-900 border-b border-transparent hover:border-gray-900 transition-colors">
                        Q. {faq.question}
                      </span>
                      {expandedId === faq.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="수정"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="삭제"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                {expandedId === faq.id && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="bg-gray-50 p-4 rounded-lg text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                      <span className="font-bold text-[#232589] mr-2">A.</span>
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              등록된 FAQ가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingFAQ ? 'FAQ 수정' : '새 FAQ 등록'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">카테고리</label>
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        formData.category === cat 
                          ? 'bg-[#232589] text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">질문 (Question)</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  placeholder="질문 내용을 입력하세요"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">답변 (Answer)</label>
                <textarea
                  required
                  rows={6}
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  placeholder="답변 내용을 상세히 입력하세요"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-[#232589] text-white hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-900/10"
                >
                  {editingFAQ ? '수정 완료' : '등록 완료'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
