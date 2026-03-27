import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckSquare } from 'lucide-react';
import '../../styles/components/WhyUs.css';

const featuresLeft = [
  // ... (stays same)
  {
    title: "완성도 높은 결과물",
    desc: "디자인, 퍼블리싱, 워드프레스 제작까지 퀄리티를 보장합니다."
  },
  {
    title: "웹표준 준수 및 크로스브라우징",
    desc: "모든 브라우저와 디바이스에서 원활하게 작동하도록 개발합니다."
  },
  {
    title: "맞춤 기능 구현 가능",
    desc: "필요한 기능을 정확하게 개발하여 최적의 결과를 제공합니다."
  },
  {
    title: "검색 엔진 최적화(SEO) 기본 적용",
    desc: "사이트가 검색 엔진에서 잘 노출될 수 있도록 최적화합니다."
  }
];

const featuresRight = [
  // ... (stays same)
  {
    title: "디테일한 인터랙션 반응",
    desc: "부드러운 인터랙션 효과로 방문자의 긍정적인 브랜드 경험을 제공합니다."
  },
  {
    title: "기한 없는 하자보증",
    desc: "기능상의 오류 및 오타 보완 작업은 별도기간 제한없이 무상 지원합니다."
  },
  {
    title: "콘텐츠 저작권 보호",
    desc: "고객의 소중한 콘텐츠가 무단으로 복제되지 않도록 안전하게 지켜드립니다."
  }
];

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % 7;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className="whyus-section">
      <div className="whyus-container">
        <div className="whyus-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="whyus-title"
          >
            Why OnchaeumLAB
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="whyus-desc"
          >
            많은 고객들이 온채움랩을 선택하는 이유는<br className="hidden md:block" />
            온채움랩의 차별화된 장점과 기술력 때문입니다.
          </motion.p>
        </div>

        <div className="whyus-grid">
          {/* Left Column */}
          <div className="whyus-col-side whyus-col-left order-2 lg:order-1">
            {featuresLeft.map((feature, idx) => {
              const isActive = activeIndex === idx;
              const staggerClass = idx % 2 === 0 ? 'whyus-card-even' : 'whyus-card-odd';
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                  onMouseEnter={() => {
                    setActiveIndex(idx);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`whyus-card ${staggerClass} ${isActive ? 'is-active' : ''}`}
                >
                  <div className="whyus-card-icon">
                    <CheckSquare size={24} strokeWidth={2} />
                  </div>
                  <div className="whyus-card-content">
                    <h3 className="whyus-card-title">{feature.title}</h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <p className="whyus-card-text">{feature.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Column (Image) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="whyus-col-center order-1 lg:order-2"
          >
            <div className="whyus-image-wrap">
              <img 
                src="/cube-logo.png" 
                alt="OnchaeumLAB 3D Logo" 
                className="whyus-image"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="whyus-col-side whyus-col-right order-3 lg:order-3">
            {featuresRight.map((feature, idx) => {
              const globalIdx = idx + 4;
              const isActive = activeIndex === globalIdx;
              const staggerClass = idx % 2 === 0 ? 'whyus-card-even' : 'whyus-card-odd';
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: globalIdx * 0.2, duration: 0.5 }}
                  onMouseEnter={() => {
                    setActiveIndex(globalIdx);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`whyus-card ${staggerClass} ${isActive ? 'is-active' : ''}`}
                >
                  <div className="whyus-card-icon">
                    <CheckSquare size={24} strokeWidth={2} />
                  </div>
                  <div className="whyus-card-content">
                    <h3 className="whyus-card-title">{feature.title}</h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <p className="whyus-card-text">{feature.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

