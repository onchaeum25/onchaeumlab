import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { portfolioData, categories, Category, PortfolioItem } from '../../data/portfolio';
import '../../styles/components/Portfolio.css';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Category>('전체');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredData = activeTab === '전체'
    ? portfolioData
    : portfolioData.filter(item => item.category === activeTab);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">

        {/* Header & Filters */}
        <div className="portfolio-header-wrap">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="portfolio-header"
          >
            <h2 className="portfolio-title">Portfolio</h2>
            <p className="portfolio-subtitle">온채움랩이 완성한 감도 높은 프로젝트를 확인하세요.</p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="portfolio-filters"
          >
            <div className="portfolio-filter-inner">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`portfolio-filter-btn ${activeTab === category ? 'is-active' : ''}`}
                >
                  {activeTab === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="portfolio-filter-active-bg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="portfolio-grid">
          <AnimatePresence>
            {filteredData.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="portfolio-card"
                onClick={() => setSelectedItem(item)}
              >
                <div className="portfolio-card-img-wrap">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="portfolio-card-img"
                    referrerPolicy="no-referrer"
                  />
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-card-badge">
                      자세히 보기
                    </span>
                  </div>
                </div>
                <div className="portfolio-card-info">
                  <span className="portfolio-card-cat">{item.category}</span>
                  <h3 className="portfolio-card-title">{item.title}</h3>
                  <p className="portfolio-card-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="portfolio-modal-overlay"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="portfolio-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="portfolio-modal-header">
                <div className="portfolio-modal-title-wrap">
                  <span className="portfolio-modal-cat">{selectedItem.category}</span>
                  <h3 className="portfolio-modal-title">{selectedItem.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="portfolio-modal-close"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="portfolio-modal-body">
                <div className="portfolio-modal-overview">
                  <h4 className="portfolio-modal-overview-title">Project Overview</h4>
                  <p className="portfolio-modal-overview-text">
                    {selectedItem.desc}
                  </p>
                </div>
                <img
                  src={selectedItem.detailImage}
                  alt={selectedItem.title}
                  className="portfolio-modal-img"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

