import { useState, useEffect } from 'react';
import { Building2, Users, MapPin, X, Send } from 'lucide-react';

export default function Portfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('openQuoteModal', handleOpenModal);
    return () => window.removeEventListener('openQuoteModal', handleOpenModal);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS or Formspree endpoint integration goes here
      // Example: await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(formData) })

      // Simulating API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', budget: '', service: '', message: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="portfolio" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-16">

        {/* Vertical Indicator */}
        <div className="hidden lg:flex flex-col items-center justify-start pt-4 w-12">
          <span className="text-gray-300 text-xs tracking-[0.3em] uppercase font-bold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Service & Portfolio
          </span>
          <div className="w-[1px] h-32 bg-gray-200 mt-6"></div>
        </div>

        <div className="flex-1">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl lg:text-[90px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-primary mb-6 tracking-tighter">
              ONCHAEUM LAB
            </h2>
            <p className="text-2xl text-gray-900 font-bold mb-4">
              Service & Digital Distribution
            </p>
            <p className="text-gray-500 font-medium">
              웹사이트 제작, 쇼핑몰 구축을 통해 차별화된 디지털 문화를 선도하고자 합니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <a
                href="http://pf.kakao.com/_UPzWn/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#FEE500] text-[#191919] font-bold hover:bg-[#FEE500]/90 transition-colors flex items-center justify-center"
              >
                카카오톡 상담하기
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 rounded-full border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center"
              >
                무료견적받기
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Building2 className="w-8 h-8" />, title: "Company", desc: "주식회사 온채움랩 소개" },
              { icon: <Users className="w-8 h-8" />, title: "Partners", desc: "온채움랩 주요고객사" },
              { icon: <MapPin className="w-8 h-8" />, title: "Location", desc: "온채움랩 찾아오시는 길" }
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 p-8 flex items-center justify-between hover:shadow-xl transition-all cursor-pointer group bg-white">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-gray-900">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
                <div className="text-2xl font-light text-gray-400 group-hover:text-primary transition-colors">+</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:px-12 md:pt-12 md:pb-6 text-center flex-shrink-0">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">무료견적받기</h3>
              <p className="text-gray-500">프로젝트에 대한 간단한 정보를 남겨주시면 빠르게 연락드리겠습니다.</p>
            </div>

            <div className="p-8 md:px-12 md:pt-0 md:pb-12 overflow-y-auto">
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/your_form_id" // Replace with actual endpoint
                method="POST"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">이름 / 회사명 *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="홍길동 / (주)온채움"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">이메일 *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">연락처 *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="010-0000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-bold text-gray-700 mb-2">예산</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                    >
                      <option value="">선택해주세요</option>
                      <option value="100-300">100만원 이하</option>
                      <option value="300-500">100만원 ~ 200만원</option>
                      <option value="500-1000">200만원 ~ 300만원</option>
                      <option value="1000+">300만원 이상</option>
                      <option value="undecided">미정</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-2">요청서비스 *</label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="">선택해주세요</option>
                    <option value="랜딩페이지">랜딩페이지</option>
                    <option value="기업&사업 홈페이지">기업&사업 홈페이지</option>
                    <option value="쇼핑몰">쇼핑몰</option>
                    <option value="웹&앱디자인협업">웹&앱 디자인협업</option>
                    <option value="유지보수">유지보수</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">문의 내용 *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                    placeholder="프로젝트에 대한 간단한 설명을 남겨주세요."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? '전송 중...' : (
                    <>
                      문의하기 <Send size={18} />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl text-center font-bold">
                    성공적으로 전송되었습니다. 곧 연락드리겠습니다!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl text-center font-bold">
                    전송에 실패했습니다. 이메일이나 전화로 직접 문의해주세요.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
