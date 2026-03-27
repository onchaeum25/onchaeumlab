import { X, Send, ChevronDown } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useInquiryStore } from '../../store/useInquiryStore';
import '../../styles/common.css';

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
      {/* Invisible placeholder to maintain layout space */}
      <div className="custom-select-ghost">
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Actual expanding container */}
      <div 
        className={`custom-select-main ${isOpen ? 'is-open' : ''}`}
      >
        {/* Header */}
        <div 
          className="custom-select-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedOption ? 'custom-select-value' : 'custom-select-placeholder'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="custom-select-icon" />
        </div>
        
        {/* Options */}
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
    <div className="modal-overlay">
      <div className="modal-bg" onClick={onClose}></div>
      <div className="modal-content">
        <button 
          onClick={onClose}
          className="modal-close-btn"
        >
          <X size={24} />
        </button>

        {/* Header - Fixed */}
        <div className="modal-header">
          <div className="text-center">
            <h2 className="modal-title">무료견적받기</h2>
            <p className="modal-subtitle">프로젝트에 대한 간단한 정보를 남겨주시면 빠르게 연락드리겠습니다.</p>
          </div>
        </div>

        {/* Form - Scrollable */}
        <div className="modal-body">
          <form className="contact-modal-form" onSubmit={handleSubmit}>
            <div className="form-row">
              {/* Name */}
              <div className="form-item">
                <label className="form-item-label">이름 / 회사명 <span className="required">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동 / (주)온채움" 
                  className={`form-item-input ${errors.name ? 'has-error' : ''}`}
                />
                {errors.name && <p className="form-error-msg">{errors.name}</p>}
              </div>
              {/* Email */}
              <div className="form-item">
                <label className="form-item-label">이메일 <span className="required">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com" 
                  className={`form-item-input ${errors.email ? 'has-error' : ''}`}
                />
                {errors.email && <p className="form-error-msg">{errors.email}</p>}
              </div>
              {/* Phone */}
              <div className="form-item">
                <label className="form-item-label">연락처 <span className="required">*</span></label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000" 
                  className={`form-item-input ${errors.phone ? 'has-error' : ''}`}
                />
                {errors.phone && <p className="form-error-msg">{errors.phone}</p>}
              </div>
              {/* Budget */}
              <div className="form-item">
                <label className="form-item-label">예산</label>
                <CustomSelect 
                  options={budgetOptions} 
                  value={formData.budget} 
                  onChange={(val) => handleSelectChange('budget', val)} 
                />
              </div>
            </div>

            {/* Service */}
            <div className="form-item">
              <label className="form-item-label">요청서비스 <span className="required">*</span></label>
              <div className={errors.service ? 'rounded-lg ring-1 ring-red-500' : ''}>
                <CustomSelect 
                  options={serviceOptions} 
                  value={formData.service} 
                  onChange={(val) => handleSelectChange('service', val)} 
                />
              </div>
              {errors.service && <p className="form-error-msg">{errors.service}</p>}
            </div>

            {/* Message */}
            <div className="form-item">
              <label className="form-item-label">문의 내용 <span className="required">*</span></label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="프로젝트에 대한 간단한 설명을 남겨주세요." 
                className={`form-item-textarea ${errors.message ? 'has-error' : ''} resize-none`}
              ></textarea>
              {errors.message && <p className="form-error-msg">{errors.message}</p>}
            </div>

            {/* Submit */}
            <button 
              type="submit"
              className="form-submit-btn"
            >
              문의하기 <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
