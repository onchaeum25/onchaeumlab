import { motion } from 'motion/react';
import { MessageSquare, Target, Palette, Code2, Handshake, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import '../../styles/components/About.css';

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      
      // Check for boundaries to create a looping effect
      if (direction === 'right' && current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
        // Reached the end, loop back to start
        current.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === 'left' && current.scrollLeft <= 10) {
        // Reached the start, loop to end
        current.scrollTo({ left: current.scrollWidth, behavior: 'smooth' });
      } else {
        // Normal scroll
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const features = [
    {
      num: "01",
      subtitle: "NEEDS CONSULTING",
      title: "니즈 컨설팅",
      desc: "충분한 대화와 소통을 통해 고객이 정말로 필요로 하는 것(니즈)을 파악하고, 그 본질을 웹사이트에 녹여냅니다. 웹사이트는 단순한 결과물이 아니라, 비즈니스의 목표를 달성하기 위한 전략적인 도구가 되어야 합니다.",
      icon: <MessageSquare size={60} strokeWidth={1.5} className="text-[#232589]" />
    },
    {
      num: "02",
      subtitle: "STRATEGIC PLANNING",
      title: "전략적 기획",
      desc: "단순하고 화려한 제작을 넘어 비즈니스적 신뢰감과 전문성을 동시에 전달할 수 있는 설계가 중요하며, 브랜딩 목적에 맞는 브랜딩형(인지도와 신뢰도 강화), 센터형(특정분야 전문성 강조), 랜딩형(광고 전환율 극대화)으로 제작합니다. 따라서 유형별로 설계방향과 컨텐츠 및 기능의 사용 편의성 UX적략을 수립합니다.",
      icon: <Target size={60} strokeWidth={1.5} className="text-[#232589]" />
    },
    {
      num: "03",
      subtitle: "SENSITIVE DESIGN",
      title: "감각적 디자인",
      desc: "브랜드 고유한 아이덴티티를 돋보이게 담아낸 맞춤형 디자인 시스템의 구축 컨텐츠 배치전략, 트렌디 및 세련된 디자인 제공으로 홈페이지에서 전달하는 핵심 메시지 빠른 인지와 매출의 자연스런 연결 유도를 도출합니다.",
      icon: <Palette size={60} strokeWidth={1.5} className="text-[#232589]" />
    },
    {
      num: "04",
      subtitle: "STABLE DEVELOPMENT",
      title: "안정적 개발",
      desc: "지난 18년간 웹사이트 제작뿐만 아니라, APP, ERP, 웹진, 강의사이트, 예약 플랫폼, 쇼핑몰 등 다양한 프로젝트를 성공적으로 수행했습니다. 이러한 풍부한 제작 경험과 기술력을 바탕으로, 빠르고 안정적 및 모바일 최적화와 빠른 로딩속도을 넘어 필요한 혁신적인 기능까지 구현합니다.",
      icon: <Code2 size={60} strokeWidth={1.5} className="text-[#232589]" />
    },
    {
      num: "05",
      subtitle: "RELIABLE PARTNERSHIP",
      title: "든든한 파트너십",
      desc: "웹사이트 완성 후에도 끝이 아닙니다. 온채움은 지속적인 유지보수와 업데이트를 통해 고객의 사업 성장을 오랜 기간 돕는 든든한 파트너가 되어 드립니다.",
      icon: <Handshake size={60} strokeWidth={1.5} className="text-[#232589]" />
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        
        {/* Header Section */}
        <div className="about-header">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="about-title">
              OnchaeumLAB<br />
              Own Way
            </h2>
            <p className="about-desc">
              온채움랩만의 5가지 브랜드 원칙이 당신의 성공을 만듭니다.
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="about-nav"
          >
            <button 
              onClick={() => scroll('left')}
              className="about-nav-btn"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="about-nav-btn"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Cards Carousel */}
      <motion.div 
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="about-carousel-wrap"
      >
        <div 
          ref={scrollRef}
          className="about-carousel"
        >
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="about-card-wrap"
              >
                <div className="about-card-inner">
                  <div className="about-card-box">
                    {/* Gradient Background (shows as border) */}
                    <div className="about-card-gradient"></div>
                    
                    {/* Inner White Background */}
                    <div className="about-card-bg"></div>

                    {/* Content */}
                    <div className="about-card-content">
                      <div className="about-card-header">
                    <span className="about-card-num">
                      {feature.num}
                    </span>
                    <div className="about-card-icon">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="about-card-title">
                      {feature.title}
                    </h3>
                    <p className="about-card-subtitle">
                      {feature.subtitle}
                    </p>
                    <p className="about-card-text">
                      {feature.desc}
                    </p>
                  </div>
                </div>
                </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
    </section>
  );
}
