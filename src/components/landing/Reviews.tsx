import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, User, ChevronLeft, ChevronRight, X, ChevronDown } from 'lucide-react';
import { useReviewStore } from '../../store/useReviewStore';
import { categories } from '../../data/portfolio';
import '../../styles/components/Reviews.css';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function CustomSelect({ options, value, onChange, placeholder = "선택해주세요" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="custom-select-wrap">
      <div className="custom-select-ghost">
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="w-5 h-5" />
      </div>

      <div className={`custom-select-main ${isOpen ? 'is-open' : ''}`}>
        <div className="custom-select-header" onClick={() => setIsOpen(!isOpen)}>
          <span className={selectedOption ? 'custom-select-value' : 'custom-select-placeholder'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="custom-select-icon" />
        </div>

        <div className="custom-select-options">
          <div className="custom-select-options-inner">
            {options.map((option) => (
              <div
                key={option.value}
                className={`custom-select-option ${value === option.value ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const { reviews, fetchReviews, addReview, isLoading } = useReviewStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    project: categories[1] as string, // Cast or explicitly type the state
    rating: 0,
    content: ''
  });

  const resetForm = () => {
    setNewReview({
      author: '',
      project: categories[1] as string,
      rating: 0,
      content: ''
    });
    setIsSubmitted(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

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
    if (activeIndex < visibleReviews.length - 1) scrollTo(activeIndex + 1);
  };

  const prevReview = () => {
    if (activeIndex > 0) scrollTo(activeIndex - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!newReview.author || !newReview.content || newReview.rating === 0) {
      return;
    }
    const success = await addReview({
      ...newReview,
      is_visible: true
    });
    if (success) {
      alert('소중한 리뷰가 등록되었습니다!');
      setIsModalOpen(false);
      resetForm();
    } else {
      alert('리뷰 등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const visibleReviews = reviews.filter(r => r.is_visible);

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
        {visibleReviews.length > 0 && (
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
                {visibleReviews.map((review, idx) => (
                  <div key={`row1-a-${idx}`} className="review-card">
                    <p className="review-text">"{review.content}"</p>
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
                {visibleReviews.map((review, idx) => (
                  <div key={`row1-b-${idx}`} className="review-card">
                    <p className="review-text">"{review.content}"</p>
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
                {[...visibleReviews].reverse().map((review, idx) => (
                  <div key={`row2-a-${idx}`} className="review-card">
                    <p className="review-text">"{review.content}"</p>
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
                {[...visibleReviews].reverse().map((review, idx) => (
                  <div key={`row2-b-${idx}`} className="review-card">
                    <p className="review-text">"{review.content}"</p>
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
        )}

        {/* Mobile: Swipeable Carousel */}
        {visibleReviews.length > 0 && (
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
                {visibleReviews.map((review, idx) => (
                  <div key={idx} className="mobile-review-item">
                    <div className="mobile-review-card">
                      <p className="mobile-review-text">"{review.content}"</p>
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
                disabled={activeIndex === visibleReviews.length - 1}
                className="nav-btn nav-btn-next"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="pagination-wrap">
              {visibleReviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`dot-btn ${activeIndex === idx ? 'is-active' : ''}`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="reviews-action-wrap"
        >
          <button
            className="write-review-btn"
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            리뷰 작성하기
          </button>
        </motion.div>

      </div>

      {/* Review Write Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="review-modal-overlay"
            onClick={() => {
              setIsModalOpen(false);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="review-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="review-modal-header">
                <h3>소중한 리뷰를 들려주세요</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="review-modal-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label>작성자 <span className="required">*</span></label>
                    <input
                      type="text"
                      placeholder="예) 스타트업 대표"
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      className={`review-input ${isSubmitted && !newReview.author ? 'has-error' : ''}`}
                    />
                    {isSubmitted && !newReview.author && (
                      <p className="form-error-msg">작성자명을 입력해주세요.</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>프로젝트 구분</label>
                    <CustomSelect
                      options={categories.filter(c => c !== '전체').map(c => ({ value: c, label: c }))}
                      value={newReview.project}
                      onChange={(val) => setNewReview({ ...newReview, project: val })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>평점 <span className="required">*</span></label>
                  <div className="rating-select">
                    <div className={`rating-stars-wrap ${isSubmitted && newReview.rating === 0 ? 'has-error-stars' : ''}`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`star-btn ${newReview.rating >= star ? 'is-active' : ''}`}
                        >
                          <Star size={24} fill={newReview.rating >= star ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                    {isSubmitted && newReview.rating === 0 && (
                      <p className="form-error-msg">평점을 선택해주세요.</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>리뷰 내용 <span className="required">*</span></label>
                  <textarea
                    rows={8}
                    placeholder="프로젝트 만족하신 내용을 텍스트로 남겨주세요"
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    className={`review-textarea ${isSubmitted && !newReview.content ? 'has-error' : ''}`}
                  ></textarea>
                  {isSubmitted && !newReview.content && (
                    <p className="form-error-msg">리뷰 내용을 입력해주세요.</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? '등록 중...' : '리뷰 등록 완료'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
