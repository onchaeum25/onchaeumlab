import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Formspree or EmailJS integration goes here
    // Example using Formspree:
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // }).then(() => alert('문의가 성공적으로 접수되었습니다.'));
    
    alert('문의가 성공적으로 접수되었습니다. (현재는 데모 상태입니다.)');
    setFormData({ name: '', email: '', phone: '', budget: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              프로젝트에 대해<br />이야기해 볼까요?
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              온채움랩은 언제나 열려있습니다. 궁금한 점이나 프로젝트 의뢰가 있으시다면 아래 폼을 통해 문의해 주세요. 확인 후 빠르게 답변 드리겠습니다.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">이메일</h4>
                <a href="mailto:ceo@onchaeumlab.co.kr" className="text-point hover:underline">ceo@onchaeumlab.co.kr</a>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">전화번호</h4>
                <a href="tel:010-900-3279" className="text-gray-600 hover:text-point">010-900-3279</a>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">카카오톡</h4>
                <a href="http://pf.kakao.com/_UPzWn/chat" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-point">온채움랩 채널 바로가기</a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="bg-gray-50 p-8 md:p-10 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">이름 / 기업명 *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-point/20 focus:border-point transition-colors bg-white"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-point/20 focus:border-point transition-colors bg-white"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-point/20 focus:border-point transition-colors bg-white"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">예산</label>
                <select 
                  id="budget" 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-point/20 focus:border-point transition-colors bg-white"
                >
                  <option value="">선택해주세요</option>
                  <option value="100만원 미만">100만원 미만</option>
                  <option value="100만원 ~ 300만원">100만원 ~ 300만원</option>
                  <option value="300만원 ~ 500만원">300만원 ~ 500만원</option>
                  <option value="500만원 이상">500만원 이상</option>
                  <option value="미정">미정</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">문의 내용 *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-point/20 focus:border-point transition-colors bg-white resize-none"
                  placeholder="프로젝트에 대한 간단한 설명을 남겨주세요."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-point text-white font-bold py-4 rounded-xl hover:bg-[#1a1b66] transition-colors shadow-md shadow-point/20"
              >
                문의 보내기
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
