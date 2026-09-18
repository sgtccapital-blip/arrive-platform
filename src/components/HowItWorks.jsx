import React from 'react';
import { useApp } from '../context/AppContext';
import { CalendarCheck, QrCode, Wine } from 'lucide-react';

export const HowItWorks = () => {
  const { locale = 'es' } = useApp();
  const isEs = locale === 'es';

  const steps = [
    {
      icon: <CalendarCheck size={28} />,
      number: '01',
      title: isEs ? 'Elige tu Noche' : 'Choose Your Night',
      desc: isEs ? 'Mira los planes de la semana y elige el que más te guste.' : 'Browse the weekly schedule and pick your favorite event.',
    },
    {
      icon: <QrCode size={28} />,
      number: '02',
      title: isEs ? 'Activa tu Pase' : 'Claim Your Pass',
      desc: isEs ? 'Obtén tu pase digital QR instantáneo. Gratis, sin registro.' : 'Get your instant digital QR pass. Free, no registration needed.',
    },
    {
      icon: <Wine size={28} />,
      number: '03',
      title: isEs ? 'Disfruta Open Bar' : 'Enjoy Open Bar',
      desc: isEs ? 'Muestra tu pase en puerta y disfruta Gin & Sangría de cortesía.' : 'Show your pass at entry and enjoy complimentary drinks and perks.',
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="how-header">
          <h2 className="how-title">{isEs ? '¿Cómo Funciona?' : 'How It Works'}</h2>
          <p className="how-subtitle">{isEs ? '3 pasos para disfrutar Open Bar gratis esta semana' : '3 simple steps to access complimentary passes this week'}</p>
        </div>

        <div className="how-steps">
          {steps.map((step, i) => (
            <div key={step.number} className="how-step" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="how-step-icon">
                {step.icon}
              </div>
              <div className="how-step-number">{step.number}</div>
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="how-step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
