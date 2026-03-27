import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import '../../styles/components/FAQ.css';

const faqs = [
  {
    q: "제작 기간은 보통 얼마나 걸리나요?",
    a: "프로젝트 규모와 요구사항에 따라 다르지만, 일반적인 기업 홈페이지의 경우 기획부터 디자인, 개발, 오픈까지 약 4~6주 정도 소요됩니다. 쇼핑몰이나 복잡한 기능이 포함된 경우 일정이 추가될 수 있습니다."
  },
  {
    q: "유지보수도 해주시나요?",
    a: "네, 사이트 오픈 후 1년간 기본적인 버그 수정 및 안정화에 대한 무상 유지보수를 지원합니다. 이후에는 별도의 유지보수 계약을 통해 지속적인 관리와 업데이트를 제공해 드립니다."
  },
  {
    q: "제작 비용은 어떻게 산정되나요?",
    a: "제작 비용은 필요한 페이지 수, 디자인 퀄리티, 추가 기능(결제, 다국어 등)에 따라 맞춤 산정됩니다. 프로젝트 문의를 통해 대략적인 요구사항을 남겨주시면 상세한 견적을 안내해 드립니다."
  },
  {
    q: "디자인 수정은 몇 번까지 가능한가요?",
    a: "기획 단계에서 와이어프레임을 확정하고, 메인 시안 작업 시 충분한 협의를 거칩니다. 기본적으로 시안 단계에서 2~3회의 수정 과정을 포함하여 고객님이 만족하실 수 있는 결과물을 도출합니다."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
              <button 
                type="button" 
                onClick={() => window.dispatchEvent(new Event('open-contact-modal'))} 
                className="faq-contact-link"
              >
                Contact Us <span>+</span>
              </button>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    className="faq-btn"
                    onClick={() => toggleFAQ(idx)}
                  >
                    <span className="faq-q-text">
                      <span className="faq-q-mark">Q.</span>
                      {faq.q}
                    </span>
                    <span className="faq-icon-box">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <div className="faq-ans-wrap">
                    <div className="faq-ans-inner">
                      <span className="faq-a-mark">A.</span>
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
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
