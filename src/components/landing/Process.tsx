import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Layout, Code2, Settings, Rocket } from 'lucide-react';

export default function Process() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    {
      icon: <Lightbulb size={32} />,
      title: "서비스 기획",
      desc: "고객의 아이디어를 듣고 전문적인 서비스를 기획합니다. 온채움랩의 기획 전문가들이 고객의 요구사항을 정확히 분석하여 UX 설계부터 프로젝트 로드맵까지 체계적인 기획을 해드립니다."
    },
    {
      icon: <Layout size={32} />,
      title: "UI 디자인",
      desc: "서비스의 본질을 이해하고 최적화된 디자인을 제공합니다. 온채움랩 디자인팀이 사용자 중심의 UI/UX 원칙을 바탕으로, 브랜드 아이덴티티가 돋보이는 완성도 높은 디자인을 선사합니다."
    },
    {
      icon: <Code2 size={32} />,
      title: "전문 프로그래밍",
      desc: "안정적이고 확장 가능한 시스템이 필요하신가요? 최신 웹 기술을 활용한 전문적인 프론트엔드 및 백엔드 개발로 고객의 비즈니스에 딱 맞는 솔루션을 제공해드립니다."
    },
    {
      icon: <Settings size={32} />,
      title: "전문적 품질 관리",
      desc: "품질은 타협하지 않습니다. 체계적인 테스트와 다각도의 품질 검수를 통해, 고객이 신뢰할 수 있는 완성도 높은 서비스를 제공합니다."
    },
    {
      icon: <Rocket size={32} />,
      title: "지속적 유지보수",
      desc: "하자보수 기간 동안 안정적인 서비스 운영을 책임집니다. 그 이후에도 지속적인 서비스 관리를 원하시는 경우, 맞춤형 유지보수 계약을 통해 전문적인 기술지원을 제공해드립니다."
    }
  ];

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % steps.length;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isHovered, steps.length]);

  return (
    <section className="py-24 bg-[#1a1a1a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Production Process
          </h2>
          <p className="text-[#ababab] text-lg leading-relaxed max-w-3xl mx-auto">
            웹사이트 제작에 익숙하지 않아도, 체계적인 제작 과정을 통해<br className="hidden md:block" />
            온채움랩은 클라이언트의 비즈니스를 성공으로 이끌어드립니다.
          </p>
        </motion.div>

        {/* Process Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 py-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.6,
              }
            }
          }}
        >
          {steps.map((step, idx) => {
            const isActive = activeIndex === idx;
            return (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0, 
                  transition: { duration: 0.5, ease: "easeOut" } 
                }
              }}
              className="relative flex"
              onMouseEnter={() => {
                setActiveIndex(idx);
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className={`bg-[#2a2a2a] rounded-2xl p-8 w-full transition-all duration-500 ease-out flex flex-col ${
                  isActive 
                    ? 'border-2 border-[#EEAB1B] scale-105 shadow-[0_10px_30px_rgba(238,171,27,0.15)] z-10' 
                    : 'border-2 border-white/5 scale-100 z-0'
                }`}
              >
                <div className="text-[#EEAB1B] mb-6 transition-transform duration-500">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow Connector (Hidden on mobile/tablet, visible on desktop) */}
              {idx < steps.length - 1 && (
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.4 } }
                  }}
                  className="hidden lg:flex absolute top-1/2 left-full ml-3 -translate-x-1/2 -translate-y-1/2 z-10 text-[#EEAB1B]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6V18Z" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          )})}
        </motion.div>

      </div>
    </section>
  );
}
