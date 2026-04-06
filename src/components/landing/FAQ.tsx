import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useFAQStore } from '../../store/useFAQStore';
import '../../styles/components/FAQ.css';

export default function FAQ() {
  const { faqs } = useFAQStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  // 추출된 카테고리 목록 (중복 제거)
  const categories = ['전체', ...Array.from(new Set(faqs.map(f => f.category)))];

  // 카테고리에 맞는 FAQ 필터링
  const filteredFaqs = activeCategory === '전체' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">

        {/* Left Vertical Text */}
        <div className="faq-sidebar">
          <span className="faq-sidebar-text">
            Customer Support
          </span>
          <div className="faq-sidebar-line"></div>
        </div>

        {/* Main Content */}
        <div className="faq-main">
          <div className="faq-header">
            <div>
              <h3 className="faq-subtitle">FAQ</h3>
              <h2 className="faq-title">
                자주 묻는 질문<br />무엇이든 물어보세요
              </h2>
            </div>
            <div className="faq-desc-box">
              <p className="faq-desc">
                웹사이트 제작 및 프로젝트 진행에 대해 고객님들이 가장 궁금해하시는 질문들을 모았습니다. 추가 문의사항은 언제든 연락주세요.
              </p>
              
              {/* 🔹 카테고리 탭 (헤더 영역으로 이동) */}
              <div className="faq-filters">
                <div className="faq-filter-inner">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setOpenIndex(null);
                      }}
                      className={`faq-filter-btn ${activeCategory === cat ? 'is-active' : ''}`}
                    >
                      <span className="faq-filter-btn-text">{cat}</span>
                      {activeCategory === cat && (
                        <motion.div 
                          layoutId="faqTabBackground"
                          className="faq-filter-active-bg"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      className="faq-btn"
                      onClick={() => toggleFAQ(idx)}
                    >
                      <div className="faq-q-text">
                        <span className="faq-q-mark">Q.</span>
                        {/* 🔹 카테고리 태그 노출 */}
                        <span className="faq-category-tag">{faq.category}</span>
                        {faq.question}
                      </div>
                      <span className="faq-icon-box">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>

                    <div className="faq-ans-wrap">
                      <div className="faq-ans-inner">
                        <span className="faq-a-mark">A.</span>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="faq-empty">등록된 질문이 없습니다.</div>
            )}
          </div>

          <div className="faq-footer">
            <div>
              <h4 className="faq-footer-title">원하시는 답변을 찾지 못하셨나요?</h4>
              <p className="faq-footer-desc">전문 매니저가 친절하고 상세하게 상담해 드립니다.</p>
            </div>
            <button 
              type="button" 
              onClick={() => window.dispatchEvent(new Event('open-contact-modal'))} 
              className="faq-footer-btn"
            >
              상담 문의하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
