import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Contact() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  return (
    <section id="contact" className="py-32 bg-[#f8f9fa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-16">

        {/* Vertical Indicator */}
        <div className="hidden lg:flex flex-col items-center justify-start pt-4 w-12">
          <span className="text-gray-300 text-xs tracking-[0.3em] uppercase font-bold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Customer Support
          </span>
          <div className="w-[1px] h-32 bg-gray-200 mt-6"></div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-900">FAQ</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                자주 묻는 질문<br />무엇이든 물어보세요
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                웹사이트 제작 및 프로젝트 진행에 대해 고객님들이 가장 궁금해하시는 질문들을 모았습니다. 추가 문의사항은 언제든 연락주세요.
              </p>
              <button className="border-b-2 border-gray-900 pb-1 font-bold text-gray-900 hover:text-primary hover:border-primary transition-colors flex items-center gap-2">
                Contact Us <span>+</span>
              </button>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-24">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border border-gray-200 bg-white transition-all duration-300 ${openIndex === idx ? 'shadow-md' : 'hover:border-gray-300'}`}
              >
                <button
                  className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className={`text-lg font-bold pr-8 ${openIndex === idx ? 'text-primary' : 'text-gray-900'}`}>
                    <span className="text-primary mr-4">Q.</span>{faq.q}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8 pt-2 text-gray-600 leading-relaxed font-medium border-t border-gray-100 mx-8 mt-2">
                    <span className="text-gray-400 font-bold mr-4">A.</span>{faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info Banner */}
          <div className="bg-[#1a1a1a] text-white p-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-2">원하시는 답변을 찾지 못하셨나요?</h4>
              <p className="text-gray-400">전문 매니저가 친절하고 상세하게 상담해 드립니다.</p>
            </div>
            {/* <div className="flex gap-4 flex-wrap">
              <a href="tel:010-900-3279" className="px-8 py-4 bg-primary text-white font-bold hover:bg-primary-hover transition-colors">
                전화 상담하기
              </a>
              <a href="mailto:ceo@onchaeumlab.co.kr" className="px-8 py-4 border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">
                이메일 문의
              </a>
            </div> */}
          </div>

        </div >
      </div >
    </section >
  );
}
