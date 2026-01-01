
import React, { useState, useEffect, useRef } from 'react';
import { 
  Coffee, 
  Dog, 
  VolumeX, 
  Instagram, 
  Mail, 
  MessageCircle,
  MapPin,
  X,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  Loader2,
  Info,
  Phone,
  BookOpen,
  Sparkles,
  Flame,
  Droplets,
  Wind,
  ArrowRight,
  Car,
  Train,
  Navigation
} from 'lucide-react';

// --- Types ---
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

interface MenuItem {
  name: string;
  price: string;
  image: string;
  description: string;
  tag?: string;
}

// --- Components ---

const MenuModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'cafe' | 'dessert' | 'pet'>('cafe');

  const menuData: Record<'cafe' | 'dessert' | 'pet', MenuItem[]> = {
    cafe: [
      {
        name: "시그니처 크림 라떼",
        price: "6,500원",
        description: "부드럽고 쫀쫀한 수제 생크림이 올라간 로컬 카페 대표 메뉴",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400",
        tag: "Best"
      },
      {
        name: "바닐라 빈 라떼",
        price: "5,800원",
        description: "마다가스카르산 바닐라빈으로 직접 만든 시럽의 깊은 풍미",
        image: "https://images.unsplash.com/photo-1595434066389-99c30732facb?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "동네 아메리카노",
        price: "3,500원",
        description: "매일 아침 직접 로스팅한 신선한 원두의 깔끔한 맛",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400",
        tag: "Local"
      }
    ],
    dessert: [
      {
        name: "생딸기 케이크",
        price: "7,500원",
        description: "제철 딸기가 듬뿍 들어간 입안에서 녹는 부드러운 케이크",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400",
        tag: "Seasonal"
      },
      {
        name: "브라운 치즈 크로플",
        price: "9,000원",
        description: "겉바속촉 크로플 위에 단짠단짠 브라운 치즈와 바닐라 아이스크림",
        image: "https://images.unsplash.com/photo-1544908082-84384d820ad5?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "수제 르뱅 쿠키",
        price: "4,200원",
        description: "초콜릿과 견과류가 아낌없이 들어간 묵직한 정통 쿠키",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400"
      }
    ],
    pet: [
      {
        name: "수제 연어 져키",
        price: "5,000원",
        description: "첨가물 없이 저온 건조하여 영양 가득한 건강 간식",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400",
        tag: "Health"
      },
      {
        name: "퍼피치노 (멍푸치노)",
        price: "3,000원",
        description: "락토프리 우유와 캐롭 가루로 만든 강아지 전용 음료",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400",
        tag: "Favorite"
      },
      {
        name: "닭가슴살 컵케이크",
        price: "4,500원",
        description: "생일이나 특별한 날 선물하기 좋은 수제 영양 컵케이크",
        image: "https://images.unsplash.com/photo-1589924691106-073b13f153c2?auto=format&fit=crop&q=80&w=400"
      }
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-[#FFFDFB] w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col transition-all transform scale-100">
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-gray-100 bg-white flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Our Delicious Menu</h2>
            <p className="text-sm md:text-base text-gray-500 font-medium mt-1">로컬 카페가 제안하는 정성 가득한 메뉴입니다.</p>
          </div>
          <div className="flex bg-[#F7F2EE] p-1 rounded-2xl gap-1">
            {['cafe', 'dessert', 'pet'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 md:px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-[#D95D22] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab === 'cafe' ? '커피 & 음료' : tab === 'dessert' ? '디저트' : '댕댕이 간식'}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="hidden md:flex p-2 hover:bg-[#F7F2EE] rounded-full transition-all">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {menuData[activeTab].map((item, index) => (
              <div key={index} className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-50">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {item.tag && (
                    <div className="absolute top-4 left-4 bg-[#D95D22] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {item.tag}
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-lg font-bold text-gray-900 leading-tight">{item.name}</h4>
                    <span className="text-[#D95D22] font-bold text-sm whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Close Button */}
        <button onClick={onClose} className="md:hidden p-5 bg-gray-900 text-white font-bold text-sm flex items-center justify-center gap-2">
          <X className="w-5 h-5" /> 메뉴 닫기
        </button>
      </div>
    </div>
  );
};

const ReservationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', time: '', guests: '2' });

  useEffect(() => {
    if (!isOpen) setStep('form');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden transition-all transform scale-100">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#F7F2EE]/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900">방문 예약하기</h2>
            <div className="mt-1 flex items-center gap-1.5 text-[#912235] bg-[#912235]/10 px-3 py-0.5 rounded-full inline-flex">
              <Info className="w-3 h-3" />
              <span className="text-[10px] font-bold tracking-tight">최대 예약 인원: 총 20명</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-8">
          {step === 'form' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('processing'); setTimeout(() => setStep('success'), 1500); }} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2 px-1">예약자 성함</label>
                <input required type="text" placeholder="이름을 입력해주세요" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#D95D22] outline-none text-sm transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 flex items-center gap-2 px-1">연락처</label>
                <input required type="tel" placeholder="010-0000-0000" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#D95D22] outline-none text-sm transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 flex items-center gap-2 px-1">날짜</label>
                  <input required type="date" className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#D95D22] outline-none text-sm bg-white" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 flex items-center gap-2 px-1">시간</label>
                  <select required className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#D95D22] outline-none text-sm bg-white appearance-none" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}>
                    <option value="">시간 선택</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 py-4 rounded-2xl font-bold text-white bg-[#D95D22] hover:bg-[#c24e1a] transition-all shadow-lg active:scale-95">예약 완료</button>
              </div>
            </form>
          )}
          {step === 'processing' && <div className="py-12 flex flex-col items-center justify-center space-y-4"><Loader2 className="w-10 h-10 text-[#D95D22] animate-spin" /><p className="text-lg font-bold text-gray-900">예약 처리 중...</p></div>}
          {step === 'success' && (
            <div className="py-8 flex flex-col items-center text-center space-y-6">
              <div className="bg-green-50 p-4 rounded-full"><CheckCircle2 className="w-16 h-16 text-green-500" /></div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900">예약 완료!</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">정상적으로 접수되었습니다.<br />선택하신 시간에 뵙겠습니다.</p>
              </div>
              <button onClick={onClose} className="w-full py-4 rounded-2xl font-bold text-white bg-gray-900 hover:bg-black transition-all">확인</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{ activeSection: string; onNavClick: (id: string) => void }> = ({ activeSection, onNavClick }) => (
  <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <div 
        className="flex items-center gap-3 group cursor-pointer"
        onClick={() => onNavClick('about')}
      >
        <div className="bg-[#FDF2ED] p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-300">
           <Coffee className="text-[#D95D22] w-5 h-5" />
        </div>
        <span className="text-xl font-black tracking-tight group-hover:text-[#D95D22] transition-colors text-gray-900">Local Cafe</span>
      </div>
      <nav className="hidden md:flex items-center gap-10">
        {['About', 'Beans', 'Visit', 'Location'].map((menu) => {
          const id = menu.toLowerCase();
          const isActive = activeSection === id;
          return (
            <button 
              key={menu} 
              onClick={() => onNavClick(id)}
              className={`text-sm font-bold transition-colors relative group ${isActive ? 'text-[#D95D22]' : 'text-gray-500 hover:text-[#D95D22]'}`}
            >
              {menu}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#D95D22] transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          );
        })}
      </nav>
    </div>
  </header>
);

const Hero: React.FC<{ onMenuOpen: () => void }> = ({ onMenuOpen }) => (
  <section id="about" className="pt-40 pb-20 px-6 overflow-hidden bg-[#FFFDFB]">
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D95D22]/10 rounded-full blur-3xl" />
        <div className="relative rounded-[60px] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square max-w-[540px] mx-auto lg:mx-0 ring-1 ring-gray-100">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" alt="Cafe" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Roastery & Bakery</p>
            <h3 className="text-xl font-bold flex items-center gap-2">Today's Special Blend <Sparkles className="w-4 h-4 text-yellow-400" /></h3>
          </div>
        </div>
      </div>
      
      <div className="flex-1 text-center lg:text-left space-y-8">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 bg-[#FDF2ED] text-[#D95D22] rounded-full text-xs font-bold tracking-widest uppercase">Welcome to our local home</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-gray-900">
            커피를 마시는<br />곳이 아니라<br /><span className="text-[#D95D22]">머무는 공간</span>
          </h1>
        </div>
        <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
          동네 사람을 위한 합리적인 가격, 동네 분위기에 맞는 조용함, 언제 와도 편안한 자리. 바쁜 일상 속 쉼표를 찍는 당신의 아지트가 되겠습니다.
        </p>
        
        {/* Minimal Info Chips - No border, No bg */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#D95D22]" />
            <span className="text-sm font-bold text-gray-700 whitespace-nowrap">아메리카노 <span className="text-[#D95D22]">3,500원</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-700 whitespace-nowrap">🏷️ 주민 할인 <span className="text-[#D95D22]">10% OFF</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Dog className="w-4 h-4 text-[#D95D22]" />
            <span className="text-sm font-bold text-gray-700 whitespace-nowrap">애견동반 <span className="text-[#D95D22]">가능</span></span>
          </div>
        </div>

        <div className="pt-2">
          <button onClick={onMenuOpen} className="w-full sm:w-auto bg-[#D95D22] text-white px-10 py-4 rounded-[24px] font-black text-lg hover:bg-[#c24e1a] transition-all shadow-xl shadow-[#D95D22]/30 inline-flex items-center justify-center gap-3 group active:scale-95">
            메뉴 보기 <BookOpen className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, isSelected, onClick }) => (
  <div onClick={(e) => { e.stopPropagation(); onClick(); }} className={`cursor-pointer relative bg-white p-10 rounded-[50px] shadow-md flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700 ${isSelected ? 'scale-150 z-50 border-4 border-[#912235] shadow-2xl ring-[20px] ring-[#912235]/5' : 'hover:-translate-y-2 border border-gray-100 hover:shadow-xl'}`}>
    <div className={`p-4 rounded-2xl mb-6 transition-all ${isSelected ? 'bg-[#912235]/10 rotate-[15deg]' : 'bg-[#FDF2ED]'}`}>
      {React.cloneElement(icon as React.ReactElement, { className: `w-7 h-7 ${isSelected ? 'text-[#912235]' : 'text-[#D95D22]'}` })}
    </div>
    <h3 className={`text-xl font-black mb-3 ${isSelected ? 'text-[#912235]' : 'text-gray-900'}`}>{title}</h3>
    <p className={`text-sm text-gray-500 leading-relaxed font-medium ${isSelected ? 'text-[9px] leading-tight' : ''}`}>{description}</p>
    {isSelected && <span className="block mt-2 text-[8px] font-black text-[#912235] uppercase tracking-widest animate-pulse">Click to close</span>}
  </div>
);

const BeansSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const features = [
    { icon: <Coffee />, title: "로컬 로스터리", description: "직접 로스팅한 원두를 사용하여 아메리카노 3500원이라는 합리적인 가격에 제공합니다." },
    { icon: <Dog />, title: "반려동물 환영", description: "반려동물을 위한 편안한 자리와 물그릇이 준비된 전용 프렌들리 공간입니다." },
    { icon: <VolumeX />, title: "소음 없는 공간", description: "집중과 휴식을 위해 소음을 최소화했습니다. 책을 읽기에 완벽한 환경입니다." }
  ];

  return (
    <section id="beans" className="py-24 px-6 bg-[#F7F2EE] relative overflow-hidden" onClick={() => setSelectedIndex(null)}>
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-500 pointer-events-none ${selectedIndex !== null ? 'opacity-100' : 'opacity-0'}`} />
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D95D22]/10 text-[#D95D22] rounded-full text-xs font-black uppercase tracking-wider"><Flame className="w-3 h-3" /> 8:00 AM Fresh Roasting</div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">가장 신선한 순간을<br />담아내는 <span className="text-[#D95D22]">매일의 정성</span></h2>
            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">우리는 매일 아침 로스터리 룸에서 그날 사용할 원두를 직접 볶습니다. 생두가 가진 최상의 잠재력을 끌어내어 당신의 잔에 담습니다.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[ {icon:<Droplets/>,t:'1. 정밀 선별'}, {icon:<Flame/>,t:'2. 맞춤 로스팅'}, {icon:<Wind/>,t:'3. 쿨링 & 숙성'} ].map((step,i)=>(
                <div key={i} className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-2">
                  {React.cloneElement(step.icon as any, {className:'w-5 h-5 text-[#D95D22]'})}
                  <h5 className="font-bold text-xs text-gray-900">{step.t}</h5>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full"><div className="grid grid-cols-2 gap-4 h-[400px] md:h-[500px]">
            <div className="rounded-[40px] overflow-hidden shadow-lg border-4 border-white"><img src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="1" /></div>
            <div className="rounded-[40px] overflow-hidden shadow-lg row-span-2 border-4 border-white"><img src="https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="2" /></div>
            <div className="rounded-[40px] overflow-hidden shadow-lg border-4 border-white"><img src="https://images.unsplash.com/photo-1521127474489-d524412fd439?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="3" /></div>
          </div></div>
        </div>

        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">Bean Selection</h3>
            <p className="text-sm md:text-base text-gray-500 font-medium italic">당신의 기호에 맞는 최적의 밸런스를 선택하세요.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[ {l:'A',n:'House Blend: Brown Sugar',d:'고소함과 흑설탕의 단맛이 조화로운 묵직한 바디감',t:['#Nutty','#Sweet']}, {l:'B',n:'Single Origin: Ethiopia Aricha',d:'화사한 꽃향기와 베리의 산미가 돋보이는 깔끔한 맛',t:['#Floral','#Light']} ].map((bean,i)=>(
              <div key={i} className="bg-white p-8 rounded-[40px] shadow-md border border-gray-100 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-[#FDF2ED] rounded-full flex items-center justify-center font-black text-[#D95D22] text-xl">{bean.l}</div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-gray-900">{bean.n}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">{bean.d}</p>
                </div>
                <div className="flex gap-2">{bean.t.map(tag=><span key={tag} className="text-[10px] font-bold text-gray-400 italic">{tag}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} isSelected={selectedIndex === i} onClick={() => setSelectedIndex(selectedIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA: React.FC<{ onReserve: () => void }> = ({ onReserve }) => (
  <section id="visit" className="py-24 md:py-32 px-6 text-center bg-[#FFFDFB]">
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Visit Us Today</h2>
      <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed">오늘 하루, 고요한 위로가 필요하신가요?<br />따뜻한 커피 한 잔과 정성 가득한 디저트를 준비해두겠습니다.</p>
      <button onClick={onReserve} className="w-full sm:w-auto bg-[#D95D22] text-white px-12 py-5 rounded-[24px] font-black text-lg hover:bg-[#c24e1a] transition-all shadow-xl shadow-[#D95D22]/30 active:scale-95 flex items-center justify-center gap-2 group mx-auto">방문 예약하기 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>
    </div>
  </section>
);

const LocationSection: React.FC = () => (
  <section id="location" className="py-20 md:py-24 px-6 bg-[#F7F2EE]">
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">Find Us Here</h2>
        <p className="text-sm md:text-base text-gray-500 font-medium italic">골목 어귀, 따뜻한 조명이 켜진 곳에서 기다리고 있겠습니다.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[1.5] relative rounded-[40px] overflow-hidden shadow-lg h-[350px] lg:h-auto min-h-[350px] group border-4 border-white">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]" alt="Map" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><div className="relative"><div className="absolute inset-0 bg-[#D95D22] rounded-full animate-ping opacity-30" /><div className="relative bg-[#D95D22] p-4 rounded-full shadow-2xl"><MapPin className="w-6 h-6 text-white" /></div></div></div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-md border border-gray-100 space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FDF2ED] rounded-xl"><MapPin className="w-5 h-5 text-[#D95D22]" /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Address</p>
                <p className="text-base font-bold text-gray-900 leading-snug">서울시 마포구 독막로 123-45<br /><span className="text-xs font-medium text-gray-400">상수역 1번 출구 도보 5분</span></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FDF2ED] rounded-xl"><Clock className="w-5 h-5 text-[#D95D22]" /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Open Hours</p>
                <p className="text-base font-bold text-gray-900">평일 09:00 - 21:00<br /><span className="text-[#D95D22]">주말 10:00 - 22:00</span></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#FDF2ED] rounded-xl"><Phone className="w-5 h-5 text-[#D95D22]" /></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                <p className="text-base font-bold text-gray-900">02-1234-5678</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 px-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500"><Car className="w-3.5 h-3.5" /> 주차 가능</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500"><Train className="w-3.5 h-3.5" /> 대중교통 이용 권장</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-16 px-6 border-t border-gray-100 bg-[#FFFDFB]">
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
      <div className="flex items-center gap-6">
        <a href="#" className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#D95D22] transition-all hover:-translate-y-1 shadow-sm"><Instagram className="w-6 h-6" /></a>
        <a href="#" className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#D95D22] transition-all hover:-translate-y-1 shadow-sm"><Mail className="w-6 h-6" /></a>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#FDF2ED] p-2 rounded-lg">
             <Coffee className="text-[#D95D22] w-5 h-5" />
          </div>
          <div className="font-black text-xl text-gray-900">Local Cafe</div>
        </div>
        <p className="text-xs font-bold text-gray-400 flex items-center justify-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#D95D22]" /> 서울시 마포구 독막로 123-45</p>
      </div>
      <div className="text-[9px] font-black tracking-[0.4em] text-gray-300 uppercase">© 2023 Local Cafe. All rights reserved.</div>
    </div>
  </footer>
);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Smooth scroll handler
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Intersection Observer for Active State
  useEffect(() => {
    const sections = ['about', 'beans', 'visit', 'location'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Adjust detection area
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      <Header activeSection={activeSection} onNavClick={handleNavClick} />
      <main>
        <Hero onMenuOpen={() => setIsMenuOpen(true)} />
        <BeansSection />
        <CTA onReserve={() => setIsBookingOpen(true)} />
        <LocationSection />
      </main>
      <Footer />
      <ReservationModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
