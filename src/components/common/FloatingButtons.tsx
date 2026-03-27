import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';
import '../../styles/common.css';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleOpenModal = () => setIsModalOpen(true);

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('open-contact-modal', handleOpenModal);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('open-contact-modal', handleOpenModal);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openChat = () => {
    setIsModalOpen(true);
  };

  const openKakao = () => {
    window.open('http://pf.kakao.com/_UPzWn/chat', '_blank');
  };

  return (
    <>
      <div className="floating-wrap">
        <div className="floating-inner">
          {/* Chat Icon */}
          <button onClick={openChat} className="floating-btn" aria-label="Customer Service">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 32" fill="none">
              <path d="M18 32L17.884 27.7939H15C10.8307 27.7939 7.28867 26.4437 4.374 23.7434C1.45933 21.043 0.00133425 17.7609 9.1366e-07 13.8969C-0.00133242 10.033 1.45667 6.75144 4.374 4.05234C7.29133 1.35325 10.8333 0.00247057 15 0C17.0853 0 19.0373 0.361938 20.856 1.08581C22.6747 1.80845 24.2633 2.79915 25.622 4.0579C26.9807 5.31666 28.05 6.78788 28.83 8.47157C29.61 10.1577 30 11.9662 30 13.8969C30 15.7857 29.7007 17.5997 29.102 19.339C28.5033 21.0782 27.6753 22.7218 26.618 24.2696C25.5607 25.8174 24.294 27.2442 22.818 28.5499C21.342 29.8556 19.736 31.0068 18 32ZM20 28.4424C22.3667 26.5895 24.292 24.4203 25.776 21.9349C27.26 19.4495 28.0013 16.7702 28 13.8969C28 10.5308 26.7413 7.68222 24.224 5.35124C21.7067 3.02027 18.632 1.85416 15 1.85292C11.368 1.85169 8.29333 3.0178 5.776 5.35124C3.25867 7.68469 2 10.5333 2 13.8969C2 17.2606 3.25867 20.1098 5.776 22.4445C8.29333 24.7792 11.368 25.9446 15 25.9409H20V28.4424Z" fill="currentColor"/>
              <path d="M9.97683 15.4508C10.3285 15.0992 10.526 14.6223 10.526 14.125C10.526 13.6277 10.3285 13.1508 9.97683 12.7991C9.62519 12.4475 9.14828 12.25 8.651 12.25C8.15372 12.25 7.67681 12.4475 7.32518 12.7991C6.97355 13.1508 6.776 13.6277 6.776 14.125C6.776 14.6223 6.97355 15.0992 7.32518 15.4508C7.67681 15.8025 8.15372 16 8.651 16C9.14828 16 9.62519 15.8025 9.97683 15.4508Z" fill="currentColor"/>
              <path d="M16.4768 15.4508C16.8285 15.0992 17.026 14.6223 17.026 14.125C17.026 13.6277 16.8285 13.1508 16.4768 12.7991C16.1252 12.4475 15.6483 12.25 15.151 12.25C14.6537 12.25 14.1768 12.4475 13.8252 12.7991C13.4735 13.1508 13.276 13.6277 13.276 14.125C13.276 14.6223 13.4735 15.0992 13.8252 15.4508C14.1768 15.8025 14.6537 16 15.151 16C15.6483 16 16.1252 15.8025 16.4768 15.4508Z" fill="currentColor"/>
              <path d="M22.9768 15.4508C22.6252 15.8025 22.1483 16 21.651 16C21.1537 16 20.6768 15.8025 20.3252 15.4508C19.9735 15.0992 19.776 14.6223 19.776 14.125C19.776 13.6277 19.9735 13.1508 20.3252 12.7991C20.6768 12.4475 21.1537 12.25 21.651 12.25C22.1483 12.25 22.6252 12.4475 22.9768 12.7991C23.3285 13.1508 23.526 13.6277 23.526 14.125C23.526 14.6223 23.3285 15.0992 22.9768 15.4508Z" fill="currentColor"/>
            </svg>
          </button>

          {/* Kakao Text */}
          <button onClick={openKakao} className="floating-btn" aria-label="Kakao Channel">
            <span className="floating-btn-text">kakao</span>
          </button>
        </div>

        {/* Go up Text */}
        <div className="scroll-up-wrap" style={{ 
          gridTemplateRows: isVisible ? '1fr' : '0fr',
          opacity: isVisible ? 1 : 0,
          marginTop: isVisible ? '0.5rem' : '0',
          pointerEvents: isVisible ? 'auto' : 'none'
        }}>
          <div className="scroll-up-inner">
            <button 
              onClick={scrollToTop}
              className="scroll-up-btn"
            >
              <span className="scroll-up-text">
                Go up —
              </span>
            </button>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
