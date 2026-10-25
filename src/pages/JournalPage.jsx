import React, { useState, useRef, useEffect } from 'react';
import { 
  Smile, 
  Meh, 
  Frown, 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Trash2, 
  Edit3, 
  Search, 
  CheckCircle2, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { useJournal } from '../context/JournalContext';

export default function JournalPage() {
  const { entries, addMoodEntry, addTextEntry, addVoiceEntry, deleteEntry } = useJournal();

  // Active Tab: 'mood' | 'text' | 'voice'
  const [activeTab, setActiveTab] = useState('mood');

  // Mood Journal state
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [moodNote, setMoodNote] = useState('');

  // Text Journal state
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  // Voice Journal state (Real Web Audio MediaRecorder)
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [micError, setMicError] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // Search & History state
  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackNotice, setFeedbackNotice] = useState('');

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ── MOOD FORM SUBMIT ──────────────────────────────────────────────────
  const handleSaveMood = async (e) => {
    e.preventDefault();
    await addMoodEntry(selectedMood, moodNote);
    setMoodNote('');
    setFeedbackNotice('Mood entry saved successfully!');
    setTimeout(() => setFeedbackNotice(''), 3000);
  };

  // ── TEXT FORM SUBMIT ──────────────────────────────────────────────────
  const handleSaveText = (e) => {
    e.preventDefault();
    if (!textContent.trim()) {
      alert('Please write something in your journal entry.');
      return;
    }
    addTextEntry(textTitle.trim() || 'My Thoughts', textContent.trim());
    setTextTitle('');
    setTextContent('');
    setFeedbackNotice('Journal entry saved successfully!');
    setTimeout(() => setFeedbackNotice(''), 3000);
  };

  // ── REAL VOICE RECORDING HANDLERS ─────────────────────────────────────
  const startRecording = async () => {
    setMicError('');
    setAudioBlob(null);
    setAudioUrl(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 300) { // 5 minutes max limit
            stopRecording();
            return 300;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn('Microphone access denied or unsupported:', err);
      setMicError('Microphone permission denied. Using voice simulation mode.');
      // Graceful fallback simulation
      setIsRecording(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // simulated blob
      setAudioBlob(new Blob(['simulated voice content'], { type: 'audio/wav' }));
      setAudioUrl('#simulated-voice');
    }
  };

  const togglePlayback = () => {
    if (!audioPlayerRef.current) return;
    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play().catch(e => console.warn(e));
      setIsPlaying(true);
    }
  };

  const handleSaveVoice = () => {
    const durStr = formatTime(recordingSeconds);
    addVoiceEntry(audioBlob, durStr);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingSeconds(0);
    setFeedbackNotice('Voice journal recording saved successfully!');
    setTimeout(() => setFeedbackNotice(''), 3000);
  };

  // Filtered past entries
  const filteredEntries = entries.filter(e => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.title?.toLowerCase().includes(q) ||
      e.note?.toLowerCase().includes(q) ||
      e.mood?.toLowerCase().includes(q) ||
      e.type?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="journal-page-wrap" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header style={{ marginBottom: '1.75rem' }}>
        <h1 className="page-title">My Journal</h1>
        <p className="page-description">
          A personal space to express, reflect and understand yourself better.
        </p>
      </header>

      {/* ── TABS (Screens 11, 12, 13) ────────────────────────────────────── */}
      <div className="journal-tabs-group">
        <button 
          className={`journal-tab-btn ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
          id="tab-mood-journal"
        >
          Mood Journal
        </button>
        <button 
          className={`journal-tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
          id="tab-text-journal"
        >
          Text Journal
        </button>
        <button 
          className={`journal-tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
          onClick={() => setActiveTab('voice')}
          id="tab-voice-journal"
        >
          Voice Journal
        </button>
      </div>

      {/* Notification banner */}
      {feedbackNotice && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          fontWeight: 600,
          fontSize: '0.92rem',
          marginBottom: '1.5rem'
        }}>
          <CheckCircle2 size={18} />
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* ── TAB 1: MOOD JOURNAL (Screen 11) ──────────────────────────────── */}
      {activeTab === 'mood' && (
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
            How are you feeling today?
          </h3>

          <div className="mood-picker-row">
            {[
              { id: 'Very Sad', label: 'Very Sad', icon: '😫' },
              { id: 'Sad', label: 'Sad', icon: '🙁' },
              { id: 'Neutral', label: 'Neutral', icon: '😐' },
              { id: 'Happy', label: 'Happy', icon: '🙂' },
              { id: 'Very Happy', label: 'Very Happy', icon: '😄' }
            ].map((m) => (
              <div 
                key={m.id}
                className={`mood-option-item ${selectedMood === m.id ? 'selected' : ''}`}
                onClick={() => setSelectedMood(m.id)}
                role="button"
                tabIndex={0}
              >
                <div className="mood-emoji-wrap">{m.icon}</div>
                <span className="mood-label-text">{m.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSaveMood}>
            <div className="form-group">
              <input 
                type="text"
                className="form-input"
                placeholder="Add a note (optional)..."
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                id="btn-save-mood-entry"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── TAB 2: TEXT JOURNAL (Screen 12) ──────────────────────────────── */}
      {activeTab === 'text' && (
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.25rem' }}>
            Write your thoughts
          </h3>

          <form onSubmit={handleSaveText}>
            <div className="form-group">
              <label className="form-label" htmlFor="text-journal-title">Title (optional)</label>
              <input 
                id="text-journal-title"
                type="text"
                className="form-input"
                placeholder="Give a title to your entry"
                value={textTitle}
                onChange={(e) => setTextTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <textarea 
                className="form-input"
                rows={5}
                placeholder="What's on your mind today?"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                required
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button 
                type="submit" 
                className="btn btn-primary"
                id="btn-save-text-entry"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── TAB 3: VOICE JOURNAL (Screen 13) ─────────────────────────────── */}
      {activeTab === 'voice' && (
        <div className="card voice-recorder-wrap">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            Record your thoughts
          </h3>

          <div className={`voice-mic-circle ${isRecording ? 'recording' : ''}`}>
            <Mic size={40} />
          </div>

          <div className="recording-timer">
            {formatTime(recordingSeconds)} / 05:00
          </div>

          {micError && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-warning)',
              fontSize: '0.85rem',
              marginBottom: '1rem'
            }}>
              <AlertCircle size={15} />
              <span>{micError}</span>
            </div>
          )}

          {/* Hidden audio element for preview */}
          {audioUrl && (
            <audio 
              ref={audioPlayerRef} 
              src={audioUrl} 
              onEnded={() => setIsPlaying(false)} 
            />
          )}

          {/* Voice Controls */}
          <div className="voice-controls-row">
            {!isRecording ? (
              <button 
                type="button" 
                className="btn"
                style={{ background: '#EF4444', color: '#fff' }}
                onClick={startRecording}
                id="btn-voice-record"
              >
                <Mic size={16} />
                <span>Record</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={stopRecording}
                id="btn-voice-stop"
              >
                <Square size={16} />
                <span>Stop</span>
              </button>
            )}

            <button 
              type="button" 
              className="btn btn-outline"
              disabled={!audioBlob || isRecording}
              onClick={togglePlayback}
              id="btn-voice-play"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>

          {audioBlob && !isRecording && (
            <div style={{ marginTop: '1.75rem' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSaveVoice}
                id="btn-save-voice-entry"
              >
                Save Voice Entry
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── JOURNAL HISTORY (Screen 14: Past Entries) ────────────────────── */}
      <section className="history-section">
        <div className="history-header-row">
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text)' }}>
            Past Entries
          </h2>

          <div style={{ position: 'relative' }}>
            <input 
              type="text"
              className="history-search-input"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>
            <p>No journal entries found. Begin by sharing your mood, writing a thought, or recording an audio reflection above.</p>
          </div>
        ) : (
          <div className="history-list">
            {filteredEntries.map((entry) => {
              const isMood = entry.type === 'mood';
              const isVoice = entry.type === 'voice';

              let iconEmoji = '📝';
              let typeLabel = 'Text Journal';
              if (isMood) {
                typeLabel = 'Mood Journal';
                if (entry.mood === 'Happy' || entry.mood === 'Very Happy') iconEmoji = '😊';
                else if (entry.mood === 'Sad' || entry.mood === 'Very Sad') iconEmoji = '🙁';
                else iconEmoji = '😐';
              } else if (isVoice) {
                typeLabel = 'Voice Journal';
                iconEmoji = '🎙️';
              }

              return (
                <div key={entry.id} className="history-item-card">
                  <div className="history-item-left">
                    <div className="history-item-icon">
                      {iconEmoji}
                    </div>
                    <div>
                      <h4 className="history-item-title">
                        {entry.title}
                      </h4>
                      <p className="history-item-meta">
                        {typeLabel} · {entry.date} {entry.duration ? `(${entry.duration})` : ''}
                      </p>
                      {entry.note && (
                        <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', maxWidth: '520px' }}>
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="history-actions">
                    <button 
                      className="icon-btn"
                      onClick={() => alert(`Entry Details:\n\nTitle: ${entry.title}\nType: ${typeLabel}\nDate: ${entry.date}\nContent: ${entry.note || 'Audio reflection'}`)}
                      title="View entry details"
                    >
                      <Edit3 size={17} />
                    </button>
                    <button 
                      className="icon-btn"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this journal entry?')) {
                          deleteEntry(entry.id);
                        }
                      }}
                      title="Delete entry"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
