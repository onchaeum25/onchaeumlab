import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, User, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/components/Reviews.css';

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
    // ... (stays same)
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
    // ... (stays same)
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
    <section id="reviews" className="reviews-section">
      <div className="reviews-container">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="reviews-header-wrap"
        >
          <span className="reviews-badge">
            Review!
          </span>
          
          <div className="reviews-header-content">
            <div className="reviews-score-wrap">
              <div className="reviews-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={24} />
                ))}
              </div>
              <div className="reviews-score-main">
                4.9<span className="reviews-score-max">/5</span>
              </div>
            </div>
            
            <div className="reviews-separator"></div>
            
            <div className="reviews-title-wrap">
              <h2 className="reviews-title-sub">
                별처럼 쏟아지는
              </h2>
              <h3 className="reviews-title-main">
                Customer Review!
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Dark Metrics Cards */}
        <div className="reviews-metrics-grid">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
              className="metric-card"
            >
              <div className="metric-card-bg"></div>
              
              <div className="metric-header">
                <h3 className="metric-value">{metric.value}</h3>
                <p className="metric-subtitle">{metric.subtitle}</p>
                <h4 className="metric-title">{metric.title}</h4>
              </div>
              
              <div className="metric-footer">
                <p className="metric-desc">
                  {metric.desc}
                </p>
                {metric.showAvatars && (
                  <div className="avatar-group">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="avatar-item">
                        <User size={16} className="avatar-icon" />
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
          className="reviews-marquee-wrap"
        >
          {/* Top Row: Left to Right */}
          <div className="marquee-row marquee-animate-reverse">
            <div className="marquee-group">
              {reviews.map((review, idx) => (
                <div
                  key={`row1-a-${idx}`}
                  className="review-card"
                >
                  <p className="review-text">
                    "{review.content}"
                  </p>
                  <div className="review-footer">
                    <div className="review-avatar">
                      <User size={20} className="review-avatar-icon" />
                    </div>
                    <div>
                      <h5 className="review-author">{review.author}</h5>
                      <p className="review-project">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-group">
              {reviews.map((review, idx) => (
                <div
                  key={`row1-b-${idx}`}
                  className="review-card"
                >
                  <p className="review-text">
                    "{review.content}"
                  </p>
                  <div className="review-footer">
                    <div className="review-avatar">
                      <User size={20} className="review-avatar-icon" />
                    </div>
                    <div>
                      <h5 className="review-author">{review.author}</h5>
                      <p className="review-project">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Right to Left */}
          <div className="marquee-row marquee-animate">
            <div className="marquee-group">
              {[...reviews].reverse().map((review, idx) => (
                <div
                  key={`row2-a-${idx}`}
                  className="review-card"
                >
                  <p className="review-text">
                    "{review.content}"
                  </p>
                  <div className="review-footer">
                    <div className="review-avatar">
                      <User size={20} className="review-avatar-icon" />
                    </div>
                    <div>
                      <h5 className="review-author">{review.author}</h5>
                      <p className="review-project">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-group">
              {[...reviews].reverse().map((review, idx) => (
                <div
                  key={`row2-b-${idx}`}
                  className="review-card"
                >
                  <p className="review-text">
                    "{review.content}"
                  </p>
                  <div className="review-footer">
                    <div className="review-avatar">
                      <User size={20} className="review-avatar-icon" />
                    </div>
                    <div>
                      <h5 className="review-author">{review.author}</h5>
                      <p className="review-project">{review.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="marquee-mask-left"></div>
          <div className="marquee-mask-right"></div>
        </motion.div>

        {/* Mobile: Swipeable Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mobile-carousel-wrap"
        >
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="mobile-scroll-container"
            >
              {reviews.map((review, idx) => (
                <div key={idx} className="mobile-review-item">
                  <div className="mobile-review-card">
                    <p className="mobile-review-text">
                      "{review.content}"
                    </p>
                    <div className="review-footer">
                      <div className="review-avatar">
                        <User size={18} className="review-avatar-icon" />
                      </div>
                      <div>
                        <h5 className="review-author">{review.author}</h5>
                        <p className="review-project">{review.project}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={prevReview} 
              disabled={activeIndex === 0}
              className="nav-btn nav-btn-prev"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextReview} 
              disabled={activeIndex === reviews.length - 1}
              className="nav-btn nav-btn-next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="pagination-wrap">
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`dot-btn ${activeIndex === idx ? 'is-active' : ''}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

