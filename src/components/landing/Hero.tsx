import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="hero-wrapper">
      {/* Subtle overlay to ensure text remains readable */}
      <div className="hero-overlay"></div>

      <div className="hero-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
              }
            }
          }}
          className="hero-content-inner"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="hero-subtitle"
          >
            Research institute that fully fills the brand's value
          </motion.h2>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
            }}
            className="hero-title"
          >
            당신의 브랜드가 빛나는 공간,<br />
            <span className="text-point">복잡한 과정은 온채움랩이 채우다</span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="hero-description"
          >
            기획부터 디자인, 개발까지! 비즈니스의 성공을 위한 최적으로 구축합니다. <br className="hidden md:block" />
            온채움랩과 함께 당신만의 특별한 디지털 경험을 만들어보세요.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="hero-button-group"
          >
            <a href="#portfolio" className="hero-btn-primary">
              포트폴리오 보기
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-contact-modal'))}
              className="hero-btn-secondary"
            >
              프로젝트 문의하기
            </button>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
