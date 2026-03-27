import { useEffect, useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  X,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { useReviewStore } from '../../store/useReviewStore';
import { Review } from '../../data/review';
import { categories } from '../../data/portfolio';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function CustomSelect({ options, value, onChange, placeholder = "선택해주세요" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="custom-select-wrap">
      <div className="custom-select-ghost">
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="w-5 h-5" />
      </div>

      <div className={`custom-select-main ${isOpen ? 'is-open' : ''}`}>
        <div className="custom-select-header" onClick={() => setIsOpen(!isOpen)}>
          <span className={selectedOption ? 'custom-select-value' : 'custom-select-placeholder'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="custom-select-icon" />
        </div>
        
        <div className="custom-select-options">
          <div className="custom-select-options-inner">
            {options.map((option) => (
              <div
                key={option.value}
                className={`custom-select-option ${value === option.value ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const { reviews, fetchReviews, addReview, updateReview, deleteReview, isLoading } = useReviewStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    author: '',
    project: categories[1] as string,
    content: '',
    rating: 5,
    is_visible: true
  });

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filteredReviews = reviews.filter(review =>
    review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      author: '',
      project: categories[1],
      content: '',
      rating: 5,
      is_visible: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      author: review.author,
      project: review.project,
      content: review.content,
      rating: review.rating,
      is_visible: review.is_visible
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      await updateReview(editingReview.id, formData);
    } else {
      await addReview(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('정말 이 리뷰를 삭제하시겠습니까?')) {
      await deleteReview(id);
    }
  };

  const toggleVisibility = async (review: Review) => {
    await updateReview(review.id, { is_visible: !review.is_visible });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">리뷰 관리</h1>
          <p className="text-gray-500">고객 리얼 리뷰를 관리하고 노출 여부를 설정합니다.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-[#232589] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          리뷰 직접 등록
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 리뷰</p>
              <h3 className="text-2xl font-bold">{reviews.length}개</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <Eye size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">노출 중</p>
              <h3 className="text-2xl font-bold">{reviews.filter(r => r.is_visible).length}개</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
              <Star size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">평균 평점</p>
              <h3 className="text-2xl font-bold">
                {reviews.length > 0 
                  ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                  : '0.0'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search & List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-bottom border-gray-200 bg-gray-50 flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="작성자, 프로젝트, 내용으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-sm w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 text-sm uppercase">
                <th className="px-6 py-4 font-semibold">작성자/프로젝트</th>
                <th className="px-6 py-4 font-semibold">평점</th>
                <th className="px-6 py-4 font-semibold w-1/3">리뷰 내용</th>
                <th className="px-6 py-4 font-semibold">작성일</th>
                <th className="px-6 py-4 font-semibold">상태</th>
                <th className="px-6 py-4 font-semibold text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{review.author}</div>
                      <div className="text-xs text-gray-500">{review.project}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{review.content}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleVisibility(review)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          review.is_visible 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {review.is_visible ? <Eye size={12} /> : <EyeOff size={12} />}
                        {review.is_visible ? '노출 중' : '숨김'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(review)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="수정"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="삭제"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    등록된 리뷰가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingReview ? '리뷰 수정' : '새 리뷰 등록'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">작성자</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="@홍길동"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">프로젝트 구분</label>
                  <CustomSelect 
                    options={categories.filter(c => c !== '전체').map(c => ({ value: c, label: c }))}
                    value={formData.project}
                    onChange={(val) => setFormData({...formData, project: val as any})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">평점</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({...formData, rating: s})}
                      className={`p-2 transition-transform hover:scale-110 ${formData.rating >= s ? 'text-yellow-400' : 'text-gray-200'}`}
                    >
                      <Star size={24} fill={formData.rating >= s ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">리뷰 내용</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="리뷰 내용을 입력하세요"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={formData.is_visible}
                  onChange={(e) => setFormData({...formData, is_visible: e.target.checked})}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isVisible" className="text-sm font-medium text-gray-700">사이트에 노출함</label>
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
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#232589] text-white hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-900/10"
                >
                  {isLoading ? '저장 중...' : (editingReview ? '수정 완료' : '등록 완료')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
