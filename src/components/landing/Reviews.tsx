import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, User, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.offsetWidth;
    scrollContainerRef.current.scrollTo({
      left: width * index,
      behavior: 'smooth'
    });
  };

  const nextReview = () => {
    if (activeIndex < reviews.length - 1) scrollTo(activeIndex + 1);
  };

  const prevReview = () => {
    if (activeIndex > 0) scrollTo(activeIndex - 1);
  };

  const metrics = [
    {
      value: "10years +",
      subtitle: "다양한 산업군, 수많은 프로젝트",
      title: "풍부한 실무 경험",
      desc: "실제로 수많은 웹사이트와 서비스를 성공적으로 런칭해본 시니어급 전문가들이 직접 작업합니다."
    },
    {
      value: "95%",
      subtitle: "재의뢰율이 증명하는",
      title: "막힘없는 커뮤니케이션",
      desc: "기획 의도를 정확히 파악하고, 고객의 언어로 소통하며 답답함 없는 프로젝트 진행을 약속합니다.",
      showAvatars: true
    },
    {
      value: "@ +",
      subtitle: "수백개의 프로젝트에",
      title: "쌓인 노하우",
      desc: "다양한 산업, 다양한 형태의 웹사이트를 직접 제작하며 축적된 온채움랩만의 노하우로 디자인합니다."
    }
  ];

  const reviews = [
    {
      content: "여러 에이전시를 만나봤지만, 온채움랩만큼 완성도와 디테일을 동시에 만족시킨 곳은 없었습니다. 특히 기획부터 디자인까지 완벽해서 내부 보고 때마다 자부심 있게 활용하고 있습니다.",
      author: "@스타트업 대표",
      project: "기업 홈페이지 리뉴얼"
    },
    {
      content: "전체 흐름이 너무 매끄럽습니다. 제가 설명하지 않아도 의도를 정확하게 이해해 주시고, 프로젝트 진행하면서 쭉 함께 작업했어요. 덕분에 프로젝트가 훨씬 수월하게 진행됐어요.",
      author: "@마케팅 담당자",
      project: "프로모션 랜딩페이지"
    },
    {
      content: "단순히 예쁘게만 만드는 게 아니라 '사용자 관점에서 논리가 어떻게 흘러야 하는지'를 잡아줘서 저희 팀도 많이 배웠어요. 다소 애매했던 기획도 전문가 입장에서 자연스럽게 정리해줘서 만족스러웠습니다.",
      author: "@서비스 기획자",
      project: "플랫폼 UX/UI 개선"
    },
    {
      content: "복잡한 쇼핑몰 구축을 빠르고 퀄리티 있게 만들어주셔서 기한 안에 무사히 오픈했습니다. 덕분에 매출도 오르고 좋은 기운 받아갑니다. 감사합니다.",
      author: "@커머스 대표",
      project: "자사몰 구축"
    },
    {
      content: "처음부터 끝까지 책임감 있게 챙겨주셔서 정말 편했습니다. 중간에 저희 쪽에서 누락한 자료가 있었는데 그 부분까지 스스로 체크해서 알려주시는 꼼꼼함에 감동했습니다.",
      author: "@운영팀장",
      project: "브랜드 사이트 제작"
    },
    {
      content: "대형 플랫폼에 들어갈 랜딩페이지라 걱정이 많았는데 1도 없이 완벽하게 구현해 주셨어요. 화면 구성을 알아서 딱 잡아주시고 필요한 내용 정리해서 요청해주시니 일처리가 너무 깔끔해서 정말 만족했습니다.",
      author: "@플랫폼 사업부",
      project: "이벤트 랜딩페이지"
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center mb-16"
        >
          <span className="bg-sub text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full mb-8">
            Review!
          </span>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="flex flex-col items-center md:items-end">
              <div className="flex text-sub mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={24} className="text-sub" />
                ))}
              </div>
              <div className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
                4.9<span className="text-4xl md:text-5xl text-gray-400 font-bold">/5</span>
              </div>
            </div>
            
            <div className="h-16 w-px bg-gray-300 hidden md:block"></div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-point mb-2">
                별처럼 쏟아지는
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Customer Review!
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Dark Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
              className="bg-[#111111] text-white p-8 md:p-10 rounded-[2rem] flex flex-col h-full relative overflow-hidden group"
            >
              {/* Subtle background noise/gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex-grow">
                <h3 className="text-5xl font-bold mb-6 tracking-tighter">{metric.value}</h3>
                <p className="text-gray-400 text-sm mb-1">{metric.subtitle}</p>
                <h4 className="text-xl font-bold mb-8">{metric.title}</h4>
              </div>
              
              <div className="relative z-10 mt-auto pt-8 border-t border-white/10">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {metric.desc}
                </p>
                {metric.showAvatars && (
                  <div className="flex mt-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full bg-gray-800 border-2 border-[#111] flex items-center justify-center ${i !== 0 ? '-ml-3' : ''}`}>
                        <User size={16} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Scrolling Reviews Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="hidden md:block relative overflow-hidden group py-4"
          style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
        >
          {/* Top Row: Left to Right */}
          <div className="flex w-max animate-marquee-reverse group-hover:[animation-play-state:paused] mb-6">
            <div className="flex gap-6 pr-6">
              {reviews.map((review, idx) => (
                <div
                  key={`row1-a-${idx}`}
                  className="w-[320px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between"
                >
                  <p className="text-gray-700 leading-relaxed mb-8">
                    "{review.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm">{review.author}</h5>
                      <p className="text-gray-500 text-xs mt-0.5">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {reviews.map((review, idx) => (
                <div
                  key={`row1-b-${idx}`}
                  className="w-[320px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between"
                >
                  <p className="text-gray-700 leading-relaxed mb-8">
                    "{review.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm">{review.author}</h5>
                      <p className="text-gray-500 text-xs mt-0.5">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Right to Left */}
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            <div className="flex gap-6 pr-6">
              {[...reviews].reverse().map((review, idx) => (
                <div
                  key={`row2-a-${idx}`}
                  className="w-[320px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between"
                >
                  <p className="text-gray-700 leading-relaxed mb-8">
                    "{review.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm">{review.author}</h5>
                      <p className="text-gray-500 text-xs mt-0.5">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[...reviews].reverse().map((review, idx) => (
                <div
                  key={`row2-b-${idx}`}
                  className="w-[320px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between"
                >
                  <p className="text-gray-700 leading-relaxed mb-8">
                    "{review.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm">{review.author}</h5>
                      <p className="text-gray-500 text-xs mt-0.5">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Masks for smooth fading edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#F8F9FA] to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#F8F9FA] to-transparent"></div>
        </motion.div>

        {/* Mobile: Swipeable Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="md:hidden relative mt-8 -mx-6"
        >
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-6 px-6"
            >
              {reviews.map((review, idx) => (
                <div key={idx} className="w-[calc(100vw-3rem)] flex-shrink-0 snap-center">
                  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col h-full min-h-[260px] justify-between">
                    <p className="text-gray-700 leading-relaxed mb-8 text-sm">
                      "{review.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm">{review.author}</h5>
                        <p className="text-gray-500 text-xs mt-0.5">{review.project}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={prevReview} 
              disabled={activeIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-md border border-gray-100 rounded-full text-gray-800 disabled:opacity-0 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextReview} 
              disabled={activeIndex === reviews.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow-md border border-gray-100 rounded-full text-gray-800 disabled:opacity-0 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-point w-6' : 'bg-gray-300 w-2'}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
