import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = ({ 
  faqs = [], 
  locale = 'es',
  title = null,
  subtitle = null
}) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  const defaultTitle = locale === 'es' 
    ? 'PREGUNTAS FRECUENTES' 
    : 'FREQUENTLY ASKED QUESTIONS';

  const defaultSubtitle = locale === 'es'
    ? 'Todo lo que necesitas saber sobre dress code, accesos VIP, pases de cortesía y reservas en Panamá.'
    : 'Everything you need to know about dress code, VIP access, complimentary passes and bookings in Panama.';

  const toggleAccordion = (idx) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className="faq_section" aria-label="Preguntas Frecuentes">
      <div className="faq_container">
        <div className="faq_header">
          <div className="faq_eyebrow">
            <HelpCircle size={14} color="#c10230" />
            <span>FAQ &amp; GUÍA VIP</span>
          </div>
          <h2 className="faq_title">{title || defaultTitle}</h2>
          <p className="faq_subtitle">{subtitle || defaultSubtitle}</p>
        </div>

        <div className="faq_accordion" role="region" aria-label="FAQ Accordion">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`faq_item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq_question_btn"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq_question_text">{item.question}</span>
                  <ChevronDown 
                    size={18} 
                    className={`faq_chevron ${isOpen ? 'rotated' : ''}`} 
                  />
                </button>
                <div 
                  className={`faq_answer_wrapper ${isOpen ? 'open' : ''}`}
                  style={{ maxHeight: isOpen ? '400px' : '0' }}
                >
                  <div className="faq_answer_inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
