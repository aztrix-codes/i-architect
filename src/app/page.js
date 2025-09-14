"use client";
import React, { useState, useEffect, useRef } from 'react';

// Main Page Component
export default function HomePage() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [whoWeAreVisible, setWhoWeAreVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [whyChooseUsVisible, setWhyChooseUsVisible] = useState(false);
  const [theme, setTheme] = useState('light');

  const topRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const ourProcessRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const footerRef = useRef(null);

  const themes = {
    light: {
      bg: '#f7f1ee', text: '#3a3a3a', subtleText: '#666', cardBg: '#fdfbf9', cardBorder: '#e8e2dd', cardShadow: '0 15px 35px rgba(222, 212, 204, 0.5)', navBg: 'rgba(255, 255, 255, 0.7)', highlightBg: '#ede8e4', gradientCard: 'linear-gradient(145deg, #b39a82, #8c735e)', darkCard: '#4a3f35', imageOverlay: 'linear-gradient(to top, rgba(45, 35, 25, 0.8), rgba(75, 65, 55, 0.4))', stepNumberColor: 'rgba(212, 197, 182, 0.4)'
    },
    dark: {
      bg: '#121212', text: '#e0e0e0', subtleText: '#a0a0a0', cardBg: '#1e1e1e', cardBorder: '#2c2c2c', cardShadow: '0 15px 35px rgba(0, 0, 0, 0.3)', navBg: 'rgba(26, 26, 26, 0.7)', highlightBg: '#2c2c2c', gradientCard: 'linear-gradient(145deg, #5c5c5c, #3c3c3c)', imageOverlay: 'linear-gradient(to top, rgba(10, 8, 5, 0.9), rgba(30, 25, 20, 0.5))', darkCard: '#2a2a2a', stepNumberColor: 'rgba(100, 100, 100, 0.3)'
    }
  };
  const currentTheme = themes[theme];

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
      const checkVisibility = (ref, isVisible, setVisible) => {
        if (ref.current && !isVisible) {
          if (ref.current.getBoundingClientRect().top < window.innerHeight * 0.8) setVisible(true);
        }
      };
      checkVisibility(whoWeAreRef, whoWeAreVisible, setWhoWeAreVisible);
      checkVisibility(ourProcessRef, processVisible, setProcessVisible);
      checkVisibility(whyChooseUsRef, whyChooseUsVisible, setWhyChooseUsVisible);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [whoWeAreVisible, processVisible, whyChooseUsVisible]);

  const scrollToSection = (ref) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  const navStyle = {
    position: 'fixed', top: '20px', left: '10%', right: '10%', display: 'flex', justifyContent: "space-between", alignItems: "center", padding: 16, borderRadius: 50, zIndex: 1000, background: currentTheme.navBg, backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)', transition: 'background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out, color 0.4s ease-in-out',
  };

  const sectionAnimationStyle = (isVisible) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
  });

  return (
    <>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -ms-overflow-style: none; scrollbar-width: none; transition: background-color 0.4s ease, color 0.4s ease; }
        body::-webkit-scrollbar { display: none; }
        .menu-link { cursor: pointer; padding: 8px 12px; border-radius: 8px; transition: background-color 0.2s ease-in-out; }
        .logo-link { cursor: pointer; }
        .menu-link-hover:hover { background-color: ${currentTheme.highlightBg}; }
        
        .who-we-are { padding: 9rem 5% 3% 5%; }
        .step-number { font-size: 8rem; font-weight: bold; line-height: 1; text-align: right; color: ${currentTheme.stepNumberColor}; }

        /* --- RESPONSIVE STYLES --- */
        @media (max-width: 768px) {
            .section-padding { padding: 4rem 5% !important; }
            .who-we-are { padding: 4rem 5% 3% 5% !important; }
            
            .nav-container { top: 0 !important; left: 0 !important; right: 0 !important; border-radius: 0 !important; padding: 12px 16px !important; }
            .nav-container.transparent-nav { background: transparent !important; backdrop-filter: none !important; boxShadow: none !important; }
            .nav-container.transparent-nav .nav-logo,
            .nav-container.transparent-nav button { color: white !important; }
            .nav-logo { font-size: 20px !important; }
            .nav-menu .menu-link { display: none; }

            .banner-container { height: 94vh !important; }
            .banner { height: 100% !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; border-radius: 0 !important; }
            .banner-content-wrapper { justify-content: center !important; align-items: flex-end !important; padding: 30px !important; }
            .banner-content { flex-direction: column !important; align-items: flex-end !important; text-align: right; gap: 1rem; }
            .banner-text-main, .banner-text-secondary { max-width: 90% !important; }
            .banner-heading { font-size: 2rem !important; }
            
            .who-we-are-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
            .who-we-are-text-content { width: 100% !important; padding: 30px !important; }
            .who-we-are-image-circle { display: none !important; }
            
            .process-container { height: 620px !important; }
            .process-card { flex-direction: column !important; }
            .process-image-content { flex: 0 0 50% !important; }
            .process-text-content { flex: 1 1 auto !important; padding: 1.5rem 1.5rem 1rem !important; display: flex !important; flex-direction: column !important; }
            .step-text-wrapper { flex-grow: 1; }
            .process-text-content h3 { font-size: 1.5rem !important; margin-bottom: 0.75rem !important; }
            .process-text-content p { font-size: 0.9rem !important; line-height: 1.6 !important; }
            .step-number { font-size: 4.5rem !important; color: ${currentTheme.stepNumberColor.replace('0.4', '0.6')}; }

            .why-choose-us-grid { grid-template-columns: 1fr !important; }
            .why-choose-us-grid > div { grid-column: auto !important; grid-row: auto !important; }
            .footer-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .footer-grid > div { text-align: left !important; }
            .footer-grid p { max-width: 100% !important; }
            .footer-contact-item, .footer-social-links { justify-content: flex-start !important; }
        }
      `}</style>
      <div className="min-h-screen" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, transition: 'background-color 0.4s ease, color 0.4s ease' }}>
        <div ref={topRef} className="nav-banner banner-container" style={{position: 'relative', height: '100vh'}}>
          <div className={`nav-container ${isAtTop ? 'transparent-nav' : ''}`} style={navStyle}>
            <div className="logo-link nav-logo" onClick={() => scrollToSection(topRef)} style={{color: currentTheme.text, fontSize: 24, fontWeight: 'bold', paddingLeft: 16}}>i-Architect</div>
            <div className="menu nav-menu" style={{color: currentTheme.text, display: 'flex', alignItems: "center", gap: 18}}>
              <div className="menu-link menu-link-hover" onClick={() => scrollToSection(whoWeAreRef)}>Who we are</div>
              <div className="menu-link menu-link-hover" onClick={() => scrollToSection(ourProcessRef)}>Our process</div>
              <div className="menu-link menu-link-hover" onClick={() => scrollToSection(whyChooseUsRef)}>Why choose us</div>
              <div className="menu-link menu-link-hover" onClick={() => scrollToSection(footerRef)}>Contact us</div>
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', color: 'inherit' }}>
                {theme === 'light' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>}
              </button>
            </div>
          </div>
          <div className="banner" style={{position: 'absolute', top: '5.5%', left: '2%', right: '2%', bottom: '5%', borderRadius: 50, overflow: 'hidden', color: 'white'}} >
             <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2070&auto=format=fit-crop" alt="Stunning modern house exterior" style={{width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: 0}} />
             <div style={{position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.4)', zIndex: 1}}></div>
             <div className="banner-content-wrapper" style={{position: 'relative', zIndex: 2, padding: '60px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                <div className="banner-content" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%'}}>
                    <div className="banner-text-main" style={{maxWidth: '50%'}}>
                        <h2 className="banner-heading" style={{fontSize: '3.5rem', fontWeight: 'bold', lineHeight: '1.1', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
                          Shaping Spaces, Building Dreams: Premier Interior Architecture
                        </h2>
                       <button className="banner-button" style={{marginTop: '2rem', background: 'white', color: 'black', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'}}>
                          Begin Your Design Journey
                       </button>
                    </div>
                    <div className="banner-text-secondary" style={{maxWidth: '30%'}}>
                        <p className="banner-description" style={{fontSize: '0.9rem', lineHeight: '1.6', textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
                          i-Architect simplifies the complex process of interior architecture for all, including homes, hotels, and luxury residences in Greece & Cyprus.
                        </p>
                    </div>
                </div>
             </div>
          </div>
        </div>
        
        <div ref={whoWeAreRef} className="who-we-are" style={sectionAnimationStyle(whoWeAreVisible)}>
          <div className="who-we-are-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '40px', alignItems: 'stretch', minHeight: '30vh'  }}>
            <div className="visual-info-card" style={{ background: currentTheme.gradientCard, color: 'white', padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 15px 35px rgba(141, 115, 94, 0.2)' }}>
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <p style={{fontSize: '0.8rem', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.8)'}}>Our Firm<br/>In Numbers</p>
                  <svg width="60" height="60" viewBox="0 0 100 100" style={{ opacity: '0.3' }} xmlns="http://www.w3.org/2000/svg"><path d="M50 10 C 20 20, 20 80, 50 90 S 80 80, 80 50 S 70 20, 50 10" stroke="white" strokeWidth="4" fill="transparent" /><path d="M50 15 C 25 25, 25 75, 50 85 S 75 75, 75 50 S 65 25, 50 15" stroke="white" strokeWidth="4" fill="transparent" /></svg>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', marginTop: 'auto', textAlign: 'center' }}>
                <div><p style={{ fontSize: '3.5rem', fontWeight: '600', color: '#fff' }}>150+</p><p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Projects Completed</p></div>
                <div><p style={{ fontSize: '3.5rem', fontWeight: '600', color: '#fff' }}>15+</p><p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>Years of Industry<br/>Experience</p></div>
              </div>
            </div>
            <div className="who-we-are-text-card" style={{ background: currentTheme.cardBg, borderRadius: '24px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: currentTheme.cardShadow}}>
              <div className="who-we-are-text-content" style={{padding: '60px', width: '60%'}}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '600', color: currentTheme.text, marginBottom: '20px' }}>Who We Are</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.8', color: currentTheme.subtleText, marginBottom: '20px' }}>
                  At i-Architect, we understand the challenges of creating exceptional spaces that blend elegance, quality, and architectural integrity.
                </p>
                 <p style={{ fontSize: '1rem', lineHeight: '1.8', color: currentTheme.subtleText }}>
                  {`As Greece's premier architectural design firm, we've made it our mission to simplify the design and build process, ensuring that every project is executed flawlessly from initial concept to final handover.`}
                </p>
              </div>
              <div className="who-we-are-image-circle" style={{ position: 'absolute', right: -100, top: -50, bottom: -50, width: '400px', height: 'calc(100% + 100px)', borderRadius: '50%', overflow: 'hidden', border: `10px solid ${currentTheme.cardBg}`, boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)' }}>
                 <img  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format=fit-crop" alt="Team of architects in a modern office" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
        <div ref={ourProcessRef} style={sectionAnimationStyle(processVisible)}><SimplifyExperience theme={theme} themes={themes} /></div>
        <div ref={whyChooseUsRef} style={sectionAnimationStyle(whyChooseUsVisible)}><WhyChooseUs theme={theme} themes={themes} /></div>
        <Footer ref={footerRef} scrollToSection={scrollToSection} refs={{topRef, whoWeAreRef, ourProcessRef, whyChooseUsRef}} />
      </div>
    </>
  );
}

const simplifyData = [
    { step: 1, title: "Initial Consultation", description: "We start by understanding your vision, lifestyle, and requirements. Our team works closely with you to define the project scope and aesthetic goals.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format=fit-crop" },
    { step: 2, title: "Concept & Space Planning", description: "Our architects create detailed 2D and 3D plans to optimize your space for functionality and flow, developing a cohesive design concept.", image: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?q=80&w=2070&auto=format=fit=crop" },
    { step: 3, title: "Material & Finish Selection", description: "We guide you through our curated selection of high-quality materials, finishes, and fixtures to bring your unique architectural vision to life.", image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070&auto=format=fit-crop" },
    { step: 4, title: "Construction & Management", description: "We handle all aspects of procurement, logistics, and on-site management, ensuring your project is built to the highest standards, on time and on budget.", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format=fit-crop" },
    { step: 5, title: "Final Handover & Support", description: "Our commitment extends beyond completion. We conduct a thorough final walkthrough and offer comprehensive support for any final adjustments and maintenance.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format=fit-crop" }
];

function SimplifyExperience({ theme, themes }) {
    const currentTheme = themes[theme];
    const [cards, setCards] = useState(simplifyData);
    const [animation, setAnimation] = useState({ active: false, direction: null });
    
    const triggerAnimation = (direction) => {
      if (animation.active) return;
      setAnimation({ active: true, direction });
  
      setTimeout(() => {
          setCards((prevCards) => {
              const newCards = [...prevCards];
              if (direction === 'next') newCards.push(newCards.shift());
              else newCards.unshift(newCards.pop());
              return newCards;
          });
          setAnimation({ active: false, direction: null });
      }, 500);
    };
  
    return (
      <div className="section-padding" style={{ padding: '8rem 5% 6rem', position: 'relative' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', padding: '0 1rem'}}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '600', color: currentTheme.text }}>
            Our Architectural Process
          </h2>
        </div>
        
        <div className="process-container" style={{ position: 'relative', height: '550px', perspective: '2000px' }}>
          {cards.map((item, index) => {
            const zIndex = cards.length - index;
            const isVisible = index < 3;
            let transform = `translateY(${index * -30}px) scale(${1 - (index * 0.05)})`;
            let opacity = isVisible ? 1 : 0;
            let transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (animation.active && index === 0 && animation.direction === 'next') {
                opacity = 0;
            } else if (animation.active && isVisible) {
                transform = `translateY(${(index - 1) * -30}px) scale(${1 - ((index - 1) * 0.05)})`;
            }
  
            return (
              <div key={item.step} className="process-card" style={{ position: 'absolute', width: '100%', height: '100%', transition, transform, zIndex, opacity, display: 'flex', background: currentTheme.cardBg, borderRadius: '32px', overflow: 'hidden', boxShadow: currentTheme.cardShadow }}>
                <div className="process-image-content" style={{ flex: '0 0 45%' }}><img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div className="process-text-content" style={{ flex: '0 0 55%', padding: '4rem 5rem' }}>
                  <div className="step-text-wrapper">
                    <h3 style={{ fontSize: '2.2rem', fontWeight: '600', color: currentTheme.text, marginBottom: '1.5rem' }}>{item.title}</h3>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: currentTheme.subtleText }}>{item.description}</p>
                  </div>
                  <div className="step-number">{item.step}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem', zIndex: 100, paddingTop: '1rem', justifyContent: 'flex-end', alignItems: 'center', }}>
          <button onClick={() => triggerAnimation('prev')} disabled={animation.active} style={{ background: currentTheme.highlightBg, border: 'none', borderRadius: '50%', width: '56px', height: '56px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s', opacity: animation.active ? 0.5 : 1 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke={currentTheme.subtleText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => triggerAnimation('next')} disabled={animation.active} style={{ background: currentTheme.highlightBg, border: 'none', borderRadius: '50%', width: '56px', height: '56px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s', opacity: animation.active ? 0.5 : 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke={currentTheme.subtleText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    );
}


function WhyChooseUs({ theme, themes }) {
    const currentTheme = themes[theme];
    const [hoveredCard, setHoveredCard] = useState(null);
    const cardStyle = { transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)' };
    const getHoverStyle = (cardNumber) => ({
        transform: hoveredCard === cardNumber ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: hoveredCard === cardNumber ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' : '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
    });
    
    return (
        <div className="section-padding" style={{ padding: '8rem 5% 8rem' }}>
             <h2 style={{ fontSize: '2.8rem', color: currentTheme.text, textAlign: 'center', marginBottom: '5rem' }}>
               <span style={{fontWeight: '400'}}>Why</span> <span style={{fontWeight: '600'}}>Choose i-Architect</span>
            </h2>
            <div className="why-choose-us-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 'minmax(280px, auto)', gap: '32px' }}>
                <div style={{ ...cardStyle, ...getHoverStyle(1), gridColumn: '1 / 2', gridRow: '1 / 2', background: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}`, borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onMouseEnter={() => setHoveredCard(1)} onMouseLeave={() => setHoveredCard(null)}>
                    <div><h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: currentTheme.text, marginBottom: '1rem' }}>End-to-End Solutions</h3><p style={{ fontSize: '1rem', lineHeight: '1.7', color: currentTheme.subtleText }}>We manage every aspect of your architectural project, from concept to completion.</p></div>
                    <div style={{alignSelf: 'flex-end', marginTop: '1rem'}}><svg width="70" height="70" viewBox="0 0 100 100" style={{ opacity: '0.4' }} xmlns="http://www.w3.org/2000/svg"><path d="M20 30 C 40 10, 60 10, 80 30 S 100 70, 80 90 C 60 110, 40 110, 20 90 S 0 50, 20 30" stroke="#b39a82" strokeWidth="4" fill="transparent" /><path d="M30 35 C 45 20, 55 20, 70 35 S 85 65, 70 80 C 55 95, 45 95, 30 80 S 15 50, 30 35" stroke="#b39a82" strokeWidth="4" fill="transparent" /></svg></div>
                </div>
                <div style={{ ...cardStyle, ...getHoverStyle(2), gridColumn: '2 / 3', gridRow: '1 / 2', background: currentTheme.cardBg, border: `1px solid ${currentTheme.cardBorder}`, borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden' }} onMouseEnter={() => setHoveredCard(2)} onMouseLeave={() => setHoveredCard(null)}>
                    <div style={{position: 'absolute', top: '20px', right: '-50px', width: '120px', height: '120px', background: 'rgba(212, 197, 182, 0.5)', borderRadius: '50%', filter: 'blur(30px)'}}></div>
                    <div style={{position: 'absolute', top: '40px', right: '-20px', width: '60px', height: '60px', background: 'rgba(212, 197, 182, 0.8)', borderRadius: '50%'}}></div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: currentTheme.text, marginBottom: '1rem', position: 'relative' }}>Visionary Design</h3><p style={{ fontSize: '1rem', lineHeight: '1.7', color: currentTheme.subtleText, maxWidth: '90%', position: 'relative' }}>We are committed to innovative and timeless design that reflects your unique personality and vision.</p>
                </div>
                <div style={{ ...cardStyle, ...getHoverStyle(3), gridColumn: '1 / 3', gridRow: '2 / 3', borderRadius: '24px', overflow: 'hidden', position: 'relative', color: 'white', display: 'flex', alignItems: 'flex-end' }} onMouseEnter={() => setHoveredCard(3)} onMouseLeave={() => setHoveredCard(null)}>
                    <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format=fit-crop" alt="High-quality architectural materials" style={{width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: 0, transition: 'transform 0.4s ease-out', transform: hoveredCard === 3 ? 'scale(1.05)' : 'scale(1)'}} />
                    <div style={{position: 'absolute', inset: 0, background: currentTheme.imageOverlay, zIndex: 1}}></div>
                    <div style={{position: 'relative', zIndex: 2, padding: '40px'}}><h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '1rem' }}>Superior Craftsmanship</h3><p style={{ fontSize: '1rem', lineHeight: '1.7', maxWidth: '80%', color: 'rgba(255,255,255,0.9)' }}>Our partnerships with the best builders and artisans ensure the finest materials and quality control processes.</p></div>
                </div>
                <div style={{ ...cardStyle, ...getHoverStyle(4), gridColumn: '3 / 4', gridRow: '1 / 3', background: currentTheme.darkCard, color: 'white', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }} onMouseEnter={() => setHoveredCard(4)} onMouseLeave={() => setHoveredCard(null)}>
                    <div><h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1rem' }}>Unrestricted Design Vision</h3><p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', marginBottom: '1rem' }}>We partner with any vendor meeting our quality standards, providing the broadest selection of materials to suit your needs.</p></div>
                    <div><h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1rem' }}>Bespoke Architectural Details</h3><p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>We specialize in sourcing and creating custom-made architectural elements that match your unique vision.</p></div>
                </div>
            </div>
        </div>
    );
}

const Footer = React.forwardRef(({ scrollToSection, refs }, ref) => {
    const [isEmailCopied, setIsEmailCopied] = useState(false);
    const [isPhoneCopied, setIsPhoneCopied] = useState(false);

    const handleCopy = (text, type) => {
      const showFeedback = () => {
        if (type === 'email') {
            setIsEmailCopied(true);
            setTimeout(() => setIsEmailCopied(false), 2000);
        } else if (type === 'phone') {
            setIsPhoneCopied(true);
            setTimeout(() => setIsPhoneCopied(false), 2000);
        }
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(() => {
            showFeedback();
          })
          .catch(err => {
            console.error('Failed to copy with Clipboard API:', err);
          });
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          showFeedback();
        } catch (err) {
          console.error('Fallback copy method failed:', err);
        }
        
        document.body.removeChild(textArea);
      }
    };

    const footerLinkStyle = { color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', marginBottom: '0.75rem', display: 'inline-block', transition: 'color 0.3s', cursor: 'pointer' };
    const footerIconStyle = { width: 24, height: 24, stroke: 'currentColor' };
    const socialLinkStyle = { color: 'rgba(255, 255, 255, 0.7)', transition: 'color 0.3s' };

    const copyIcon = (isCopied) => isCopied ? (
        <svg style={footerIconStyle} fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    ) : (
        <svg style={footerIconStyle} fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
    );

    return (
        <footer ref={ref} style={{ background: '#262626', color: 'white', padding: '6rem 5% 2rem' }}>
            <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '2rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div>
                  <div onClick={() => scrollToSection(refs.topRef)} style={{...footerLinkStyle, fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>i-Architect</div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7', maxWidth: '80%' }}>Simplifying the complex process of interior architecture for all, including homes, hotels, and luxury residences.</p>
                </div>
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>Quick Links</h4>
                    <div onClick={() => scrollToSection(refs.whoWeAreRef)} style={footerLinkStyle}>Who we are</div><br />
                    <div onClick={() => scrollToSection(refs.ourProcessRef)} style={footerLinkStyle}>Our process</div><br />
                    <div onClick={() => scrollToSection(refs.whyChooseUsRef)} style={footerLinkStyle}>Why choose us</div><br />
                    <a onClick={() => scrollToSection(ref)} style={{...footerLinkStyle}}>Contact</a>
                </div>
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>Legal</h4>
                    <a href="#" style={{...footerLinkStyle}}>Privacy Policy</a><br />
                    <a href="#" style={{...footerLinkStyle}}>Terms of Service</a><br />
                </div>
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>Get in Touch</h4>
                    <p style={{...footerLinkStyle, cursor: 'text'}}>123 Modern Lane, Athens, Greece</p>
                    <div className="footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                        <span style={{...footerLinkStyle, marginBottom: 0}}>+30 210 123 4567</span>
                        <button onClick={() => handleCopy('+30 210 123 4567', 'phone')} style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer', position: 'relative', padding: 0 }}>
                            {copyIcon(isPhoneCopied)}
                            {isPhoneCopied && <span style={{ position: 'absolute', bottom: '135%', left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', whiteSpace: 'nowrap' }}>Copied!</span>}
                        </button>
                    </div>
                    <div className="footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{...footerLinkStyle, marginBottom: 0}}>contact@i-Architect.com</span>
                        <button onClick={() => handleCopy('contact@i-Architect.com', 'email')} style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer', position: 'relative', padding: 0 }}>
                            {copyIcon(isEmailCopied)}
                            {isEmailCopied && <span style={{ position: 'absolute', bottom: '135%', left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', whiteSpace: 'nowrap' }}>Copied!</span>}
                        </button>
                    </div>
                    <div className="footer-social-links" style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <a href="#" aria-label="Facebook" style={socialLinkStyle}><svg style={{...footerIconStyle, fill:'currentColor'}} viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                        <a href="#" aria-label="Instagram" style={socialLinkStyle}><svg style={{...footerIconStyle, fill:'currentColor'}} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"></line></svg></a>
                        <a href="#" aria-label="LinkedIn" style={socialLinkStyle}><svg style={{...footerIconStyle, fill:'currentColor'}} viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '2rem', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} i-Architect. All Rights Reserved.
            </div>
        </footer>
    );
});