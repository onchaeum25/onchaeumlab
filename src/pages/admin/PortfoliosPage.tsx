import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { categories, Category, PortfolioItem } from '../../data/portfolio';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  Upload,
  Link as LinkIcon,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function PortfoliosPage() {
  const { portfolios, isLoading, fetchPortfolios, addPortfolio, updatePortfolio, deletePortfolio, uploadImage, uploadImages } = usePortfolioStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isUploading, setIsUploading] = useState({ thumbnail: false, detailImage: false });

  // Quill Modules Configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'clean']
    ],
  };

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const [formData, setFormData] = useState<Omit<PortfolioItem, 'id'>>({
    title: '',
    category: '랜딩페이지',
    shortDesc: '',
    desc: '',
    thumbnail: '',
    detailImage: [],
    siteUrl: ''
  });

  const filteredItems = portfolios.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.includes(searchTerm)
  );

  const handleOpenModal = (item?: PortfolioItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category,
        shortDesc: item.shortDesc || '',
        desc: item.desc,
        thumbnail: item.thumbnail,
        detailImage: Array.isArray(item.detailImage) ? item.detailImage : (item.detailImage ? [item.detailImage] : []),
        siteUrl: item.siteUrl || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: '랜딩페이지',
        shortDesc: '',
        desc: '',
        thumbnail: '',
        detailImage: [],
        siteUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnail') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(prev => ({ ...prev, [field]: true }));
    try {
      const url = await uploadImage(file);
      if (url) {
        setFormData(prev => ({ ...prev, [field]: url }));
      }
    } finally {
      setIsUploading(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleMultipleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(prev => ({ ...prev, detailImage: true }));
    try {
      const urls = await uploadImages(files);
      setFormData(prev => ({ 
        ...prev, 
        detailImage: [...prev.detailImage, ...urls]
      }));
    } finally {
      setIsUploading(prev => ({ ...prev, detailImage: false }));
    }
  };

  const removeDetailImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      detailImage: prev.detailImage.filter((_, i) => i !== index)
    }));
  };

  const moveDetailImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...formData.detailImage];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newImages.length) return;
    
    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    setFormData(prev => ({ ...prev, detailImage: newImages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      await updatePortfolio(editingItem.id, formData);
    } else {
      await addPortfolio(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePortfolio(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">포트폴리오 관리</h1>
          <p className="text-gray-500 text-sm mt-1">웹사이트에 노출되는 프로젝트 리스트를 관리합니다.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-point text-white px-5 py-2.5 rounded-xl hover:bg-point/90 transition-all font-medium shadow-lg shadow-point/20"
        >
          <Plus size={18} />
          프로젝트 추가
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="제목 또는 카테고리로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-point/20 outline-none transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-point" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div 
              layout
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <img 
                  src={item.thumbnail || 'https://via.placeholder.com/600x400?text=No+Image'} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm text-point text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                    {item.category}
                  </span>
                  {item.siteUrl && (
                    <span className="bg-point/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                      <LinkIcon size={10} /> Link
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 truncate">{item.title}</h3>
                <p className="text-gray-500 text-[11px] line-clamp-2 mb-6 h-8">
                  {item.shortDesc}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-2 text-gray-400 hover:text-point hover:bg-point/5 rounded-lg transition-colors"
                      title="수정"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-[10px] text-gray-300 font-medium tracking-tighter">
                    ID: {item.id}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? '프로젝트 수정' : '새 프로젝트 등록'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-admin-scroll p-8">
                <form onSubmit={handleSubmit} id="portfolio-form" className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">프로젝트 제목</label>
                      <input
                        required
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="프로젝트 명칭 입력"
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-point/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">카테고리</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-point/20 outline-none transition-all appearance-none"
                      >
                        {categories.filter(c => c !== '전체').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-sm font-bold text-gray-700">서브 내용 (썸네일 노출용)</label>
                      <span className={`text-[10px] font-medium ${formData.shortDesc.length > 100 ? 'text-rose-500' : 'text-gray-400'}`}>
                        {formData.shortDesc.length}/100자
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      maxLength={100}
                      value={formData.shortDesc}
                      onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      placeholder="썸네일에 노출될 100자 이내의 간략한 설명을 입력하세요."
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-point/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">사이트 바로가기 링크</label>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="url"
                        value={formData.siteUrl}
                        onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-point/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">상세 설명 (에디터)</label>
                    <div className="quill-wrapper bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                      <ReactQuill 
                        theme="snow"
                        value={formData.desc}
                        onChange={(content) => setFormData({ ...formData, desc: content })}
                        modules={quillModules}
                        placeholder="프로젝트에 대한 상세 설명을 작성하세요."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {/* Thumbnail Upload */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 ml-1">섬네일 이미지</label>
                      <div className="relative group max-w-sm">
                        <div className="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-point/40">
                          {formData.thumbnail ? (
                            <>
                              <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-gray-100 transition-colors">
                                  변경하기
                                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'thumbnail')} />
                                </label>
                              </div>
                            </>
                          ) : (
                            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                              {isUploading.thumbnail ? <Loader2 className="animate-spin text-point mb-2" /> : <Upload className="text-gray-300 mb-2" />}
                              <span className="text-xs font-bold text-gray-400">이미지 업로드</span>
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'thumbnail')} />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Detail Image Upload (Multi) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-700 ml-1">상세 레이아웃 이미지 (여러 개 업로드 가능)</label>
                        <span className="text-[10px] text-gray-400 font-medium">드래그하여 순서 조정(준비중) / 업로드 순서대로 나열됨</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        <AnimatePresence>
                          {formData.detailImage.map((url, index) => (
                            <motion.div 
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              key={url} 
                              className="aspect-[3/4] bg-gray-50 rounded-xl relative group overflow-hidden border border-gray-100 shadow-sm"
                            >
                              <img src={url} alt={`Detail ${index}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                <div className="flex gap-1">
                                  <button 
                                    type="button"
                                    onClick={() => moveDetailImage(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                                  >
                                    <Plus className="rotate-180" size={14} />
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => moveDetailImage(index, 'down')}
                                    disabled={index === formData.detailImage.length - 1}
                                    className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => removeDetailImage(index)}
                                  className="bg-rose-500 text-white p-1.5 rounded-lg hover:bg-rose-600 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                {index + 1}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        <label className="aspect-[3/4] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-point/40 transition-colors group">
                          {isUploading.detailImage ? <Loader2 className="animate-spin text-point" /> : <Plus className="text-gray-300 group-hover:text-point transition-colors" />}
                          <span className="text-[10px] font-bold text-gray-400 mt-2">이미지 추가</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            multiple 
                            onChange={handleMultipleFilesChange} 
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-white transition-colors"
                >
                  취소
                </button>
                <button 
                  form="portfolio-form"
                  type="submit"
                  disabled={isUploading.thumbnail || isUploading.detailImage}
                  className="flex-[2] py-3 bg-point text-white rounded-xl font-bold hover:bg-point/90 shadow-lg shadow-point/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {editingItem ? '수정 완료' : '프로젝트 등록'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .quill-wrapper .ql-container {
          min-height: 150px;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
          border: none !important;
          background: #F9FAFB;
        }
        .quill-wrapper .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #F3F4F6 !important;
          background: #fff;
        }
        .description-preview * {
          margin: 0;
          font-size: 11px !important;
        }
      `}</style>
    </div>
  );
}
