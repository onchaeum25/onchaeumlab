import { motion } from 'motion/react';

export default function Services() {
  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
        
        {/* Vertical Indicator */}
        <div className="hidden lg:flex flex-col items-center justify-start pt-4 w-12">
          <span className="text-gray-300 text-xs tracking-[0.3em] uppercase font-bold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Business Area
          </span>
          <div className="w-[1px] h-32 bg-gray-200 mt-6"></div>
        </div>

        {/* Left Titles */}
        <div className="lg:w-1/3">
          <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-900">What We Do</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            프리미엄 웹사이트<br />다채로운 서비스
          </h2>
          <p className="text-gray-600 leading-relaxed mb-12 font-medium">
            온채움랩은 웹사이트 제작에 진심인 사람들이 모여, 건강하고 퀄리티 높은 결과물을 제공하는 에이전시입니다. 오랜 경험을 바탕으로 관공서, 대기업, 스타트업 등 다양한 고객에게 맞춤형 웹 서비스를 제공합니다.
          </p>
          <button className="border-b-2 border-gray-900 pb-1 font-bold text-gray-900 hover:text-primary hover:border-primary transition-colors flex items-center gap-2">
            All Business <span>+</span>
          </button>
        </div>

        {/* Right Staggered Grid */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="space-y-8 mt-0 md:mt-24"
          >
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6">
                <img src="https://picsum.photos/seed/web1/600/800" alt="Web" className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-900">기업 홈페이지</h4>
              <p className="text-gray-600 font-medium leading-relaxed">프리미엄 디자인과 다채로운 서비스로 기업의 브랜드 가치를 더욱 풍요롭게 채워드립니다.</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="space-y-16"
          >
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6">
                <img src="https://picsum.photos/seed/web2/600/600" alt="Web" className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-900">쇼핑몰 제작</h4>
              <p className="text-gray-600 font-medium leading-relaxed">철저한 분석을 통하여 전환율을 극대화하는 최적의 커머스 환경을 구축합니다.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-6">
                <img src="https://picsum.photos/seed/web3/600/500" alt="Web" className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-900">랜딩페이지</h4>
              <p className="text-gray-600 font-medium leading-relaxed">최신 트렌드를 반영하여 고객의 시선을 사로잡는 강력한 프로모션 페이지를 제작합니다.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
