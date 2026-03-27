import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { portfolioData, categories, Category, PortfolioItem } from '../../data/portfolio';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Category>('전체');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredData = activeTab === '전체' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeTab);

  return (
    <section id="portfolio" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Portfolio</h2>
            <p className="text-gray-500 text-lg">온채움랩이 완성한 감도 높은 프로젝트를 확인하세요.</p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 block w-full lg:w-auto lg:inline-block overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div className="flex items-center whitespace-nowrap relative w-max min-w-full sm:justify-center lg:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 flex-shrink-0 ${
                    activeTab === category 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {activeTab === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-point rounded-full shadow-md"
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
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group cursor-pointer bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      자세히 보기
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-center">
                  <span className="text-sm font-bold text-point mb-3 block">{item.category}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <span className="text-xs font-semibold text-point mb-1 block">{selectedItem.category}</span>
                  <h3 className="text-xl font-bold text-gray-900">{selectedItem.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="overflow-y-auto p-6 md:p-8 bg-gray-50">
                <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="text-sm font-bold text-point mb-2">Project Overview</h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedItem.desc}
                  </p>
                </div>
                <img 
                  src={selectedItem.detailImage} 
                  alt={selectedItem.title} 
                  className="w-full h-auto rounded-xl shadow-sm"
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
