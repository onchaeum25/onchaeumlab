import { motion } from 'motion/react';

export default function About() {
  const features = [
    { num: "01", title: "디자인의\n신선함", desc: "신선한 아이디어를 엄선하여, 계절의 변화를 담은 특별한 메뉴를 제공하듯 트렌디한 UI를 만듭니다.", img: "https://picsum.photos/seed/f1/400/600" },
    { num: "02", title: "건강하고\n맛있는 코드", desc: "웹표준을 준수하고 최적화된 코드로 빠르고 안정적인 웹사이트를 구축합니다.", img: "https://picsum.photos/seed/f2/400/600" },
    { num: "03", title: "맞춤형\n유지보수", desc: "오픈 이후에도 지속적인 관리와 업데이트를 통해 최상의 상태를 유지합니다.", img: "https://picsum.photos/seed/f3/400/600" },
    { num: "04", title: "철저한\n보안 관리", desc: "고객의 소중한 데이터를 안전하게 보호하기 위해 강력한 보안 시스템을 적용합니다.", img: "https://picsum.photos/seed/f4/400/600" }
  ];

  return (
    <section id="about" className="py-32 bg-[#f8f9fa] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Vertical Indicator */}
        <div className="hidden lg:flex flex-col items-center justify-start pt-4 w-12">
          <span className="text-gray-300 text-xs tracking-[0.3em] uppercase font-bold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            About Onchaeum
          </span>
          <div className="w-[1px] h-32 bg-gray-200 mt-6"></div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-900">Who We Are</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                완성도의 비중을 높여<br />최적의 디지털 경험 제공
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                기본에 충실한 좋은 결과물을 만드는 것은 기본입니다. 기대를 상회하는 가치를 지키는 기업 온채움랩.<br/>
                정직과 신뢰를 바탕으로 소중한 인연을 이어 나가겠습니다.
              </p>
              <button className="border-b-2 border-gray-900 pb-1 font-bold text-gray-900 hover:text-primary hover:border-primary transition-colors flex items-center gap-2">
                All About Us <span>+</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative h-[500px] bg-black overflow-hidden group"
              >
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40" />
                <div className="absolute inset-0 p-8 flex flex-col">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 border border-white/20">
                    <span className="text-white font-bold text-lg">{item.num}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white whitespace-pre-line mb-4 leading-tight">{item.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
