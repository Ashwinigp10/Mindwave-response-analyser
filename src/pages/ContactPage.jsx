import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page-wrap" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 className="page-title">Contact Us</h1>
        <p className="page-description">
          Have questions or feedback about MindWave? We are here to support you.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Contact info cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card">
            <div className="value-card-header">
              <div className="contact-icon-pill">
                <Mail size={18} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Email</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>mindwave@example.com</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="value-card-header">
              <div className="contact-icon-pill">
                <Phone size={18} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Phone</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="value-card-header">
              <div className="contact-icon-pill">
                <MapPin size={18} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.98rem' }}>Location</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Send a Message
          </h3>

          {submitted && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              fontWeight: 600,
              fontSize: '0.9rem',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={18} />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Name</label>
              <input 
                id="contact-name"
                type="text" 
                className="form-input" 
                placeholder="Your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email</label>
              <input 
                id="contact-email"
                type="email" 
                className="form-input" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-msg">Message</label>
              <textarea 
                id="contact-msg"
                rows={4} 
                className="form-input" 
                placeholder="How can we help?" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required 
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              <Send size={16} />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
