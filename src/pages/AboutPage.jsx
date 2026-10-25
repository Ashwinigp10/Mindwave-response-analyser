import React from 'react';
import { Eye, Target, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="about-page-wrap">
      {/* ── HEADER & INTRO ────────────────────────────────────────────────── */}
      <section className="about-header-wrap">
        <div>
          <h1 className="page-title">About MindWave</h1>
          <p className="page-description">
            MindWave is a psychological response analyzer designed to help individuals understand their mental well-being through scientifically inspired screening tools, personalized insights and reflective journaling.
          </p>
        </div>

        {/* Abstract organic petals/shapes */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg width="220" height="180" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M160,30 C210,50 230,110 210,150 C190,190 120,200 80,170 C40,140 30,80 60,40 C90,0 130,20 160,30 Z" 
              fill="#DCE8FF" 
              fillOpacity="0.85" 
            />
            <path 
              d="M170,60 C210,90 200,140 170,170 C140,200 90,180 70,140 C50,100 80,50 120,40 C140,30 160,50 170,60 Z" 
              fill="#ECE8FF" 
              fillOpacity="0.9" 
            />
            <circle cx="170" cy="50" r="12" fill="#7560D9" fillOpacity="0.25" />
          </svg>
        </div>
      </section>

      {/* ── 3 CORE VALUES / PILLARS (Screen 2 Middle) ────────────────────── */}
      <section className="values-grid">
        <div className="value-card">
          <div className="value-card-header">
            <div className="brand-icon-wrap" style={{ width: '32px', height: '32px' }}>
              <Eye size={18} />
            </div>
            <h3 className="value-card-title">Our Vision</h3>
          </div>
          <p className="value-card-text">
            A healthier and more aware society.
          </p>
        </div>

        <div className="value-card">
          <div className="value-card-header">
            <div className="brand-icon-wrap" style={{ width: '32px', height: '32px' }}>
              <Target size={18} />
            </div>
            <h3 className="value-card-title">Our Mission</h3>
          </div>
          <p className="value-card-text">
            To provide accessible mental health screening and self-reflection tools.
          </p>
        </div>

        <div className="value-card">
          <div className="value-card-header">
            <div className="brand-icon-wrap" style={{ width: '32px', height: '32px' }}>
              <Heart size={18} />
            </div>
            <h3 className="value-card-title">Our Values</h3>
          </div>
          <p className="value-card-text">
            Privacy, Awareness, Support and Empathy.
          </p>
        </div>
      </section>

      {/* ── CONTACT DETAILS CARD (Screen 2 Bottom) ────────────────────────── */}
      <section className="contact-card-box">
        <h3 className="contact-card-title">Contact Details</h3>
        <div className="contact-items-row">
          <div className="contact-item">
            <div className="contact-icon-pill">
              <Mail size={18} />
            </div>
            <span>mindwave@example.com</span>
          </div>

          <div className="contact-item">
            <div className="contact-icon-pill">
              <Phone size={18} />
            </div>
            <span>+91 98765 43210</span>
          </div>

          <div className="contact-item">
            <div className="contact-icon-pill">
              <MapPin size={18} />
            </div>
            <span>Bangalore, India</span>
          </div>
        </div>
      </section>
    </div>
  );
}
