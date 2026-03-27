import { X, Send, ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useInquiryStore } from '../../store/useInquiryStore';

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

  const headerContent = (
    <>
      <span className={`block truncate ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <ChevronDown className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-point' : ''}`} />
    </>
  );

  return (
    <div ref={selectRef} className="relative w-full">
      {/* Invisible placeholder to maintain layout space */}
      <div className="w-full px-4 py-3 border border-transparent opacity-0 pointer-events-none flex justify-between items-center">
        {headerContent}
      </div>

      {/* Actual expanding container */}
      <div 
        className={`absolute top-0 left-0 w-full bg-white transition-all duration-300 overflow-hidden ${
          isOpen 
            ? 'border-point ring-1 ring-point rounded-lg shadow-xl z-50' 
            : 'border-gray-200 border rounded-lg z-10 hover:border-point'
        }`}
      >
        {/* Header */}
        <div 
          className="w-full px-4 py-3 cursor-pointer flex justify-between items-center bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {headerContent}
        </div>
        
        {/* Options */}
        <div 
          className={`transition-all duration-300 ease-in-out bg-white ${
            isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 overflow-y-auto max-h-60 py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  value === option.value 
                    ? 'bg-indigo-50/50 text-point font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const budgetOptions = [
  { value: "100이하", label: "100만원 이하" },
  { value: "100-200", label: "100만원 ~ 200만원" },
  { value: "200-300", label: "200만원 ~ 300만원" },
  { value: "300이상", label: "300만원 이상" },
  { value: "미정", label: "미정" }
];

const serviceOptions = [
  { value: "landing", label: "랜딩&광고페이지" },
  { value: "corporate", label: "기업&사업 홈페이지" },
  { value: "shop", label: "쇼핑몰" },
  { value: "uxui", label: "UXUI 디자인협업" },
  { value: "other", label: "기타" }
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const addInquiry = useInquiryStore((state) => state.addInquiry);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    service: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "이름을 입력해주세요.";
    
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
    } else if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(formData.phone) && !/^\d{9,11}$/.test(formData.phone)) {
      newErrors.phone = "올바른 연락처 형식이 아닙니다. (예: 010-0000-0000)";
    }

    if (!formData.service) newErrors.service = "요청 서비스를 선택해주세요.";
    if (!formData.message.trim()) newErrors.message = "문의 내용을 입력해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // 전역 상태 저장소에 데이터 추가 (관리자 페이지 연동)
      addInquiry(formData);
      
      alert("접수가 되었습니다. 빠른 확인후 연락 드리겠습니다.");
      
      // 폼 초기화 및 닫기
      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: "",
        service: "",
        message: ""
      });
      setErrors({});
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드 에러 제거
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 text-left">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Header - Fixed */}
        <div className="px-8 pt-8 sm:px-10 sm:pt-10 pb-6 shrink-0 border-b border-gray-100">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">무료견적받기</h2>
            <p className="text-gray-500 text-sm sm:text-base text-center">프로젝트에 대한 간단한 정보를 남겨주시면 빠르게 연락드리겠습니다.</p>
          </div>
        </div>

        {/* Form - Scrollable */}
        <div className="px-8 sm:px-10 pb-8 sm:pb-10 pt-6 overflow-y-auto flex-1">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">이름 / 회사명 <span className="text-point">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동 / (주)온채움" 
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} focus:border-point focus:ring-1 focus:ring-point outline-none transition-all`}
                />
                {errors.name && <p className="text-red-500 text-xs font-semibold">{errors.name}</p>}
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">이메일 <span className="text-point">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com" 
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} focus:border-point focus:ring-1 focus:ring-point outline-none transition-all`}
                />
                {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email}</p>}
              </div>
              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">연락처 <span className="text-point">*</span></label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000" 
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} focus:border-point focus:ring-1 focus:ring-point outline-none transition-all`}
                />
                {errors.phone && <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>}
              </div>
              {/* Budget */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">예산</label>
                <CustomSelect 
                  options={budgetOptions} 
                  value={formData.budget} 
                  onChange={(val) => handleSelectChange('budget', val)} 
                />
              </div>
            </div>

            {/* Service */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">요청서비스 <span className="text-point">*</span></label>
              <div className={errors.service ? 'ring-1 ring-red-500 rounded-lg' : ''}>
                <CustomSelect 
                  options={serviceOptions} 
                  value={formData.service} 
                  onChange={(val) => handleSelectChange('service', val)} 
                />
              </div>
              {errors.service && <p className="text-red-500 text-xs font-semibold">{errors.service}</p>}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">문의 내용 <span className="text-point">*</span></label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="프로젝트에 대한 간단한 설명을 남겨주세요." 
                className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} focus:border-point focus:ring-1 focus:ring-point outline-none transition-all resize-none`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs font-semibold">{errors.message}</p>}
            </div>

            {/* Submit */}
            <button 
              type="submit"
              className="w-full bg-[#12114B] hover:bg-[#1a1866] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-4"
            >
              문의하기 <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
