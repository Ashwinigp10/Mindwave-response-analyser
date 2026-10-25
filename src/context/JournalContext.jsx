import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const JournalContext = createContext(null);
const API_BASE = 'http://localhost:5000';

export function JournalProvider({ children }) {
  const { token } = useAuth();
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('mindwave_journal_entries');
      if (saved) return JSON.parse(saved);
    } catch {}

    // Default reference entries matching screenshot
    return [
      {
        id: 'ref-1',
        type: 'mood',
        title: 'Happy Day',
        mood: 'Happy',
        note: 'Feeling positive and productive today after morning meditation.',
        date: '20 Aug 2024',
        timestamp: Date.now() - 86400000 * 2
      },
      {
        id: 'ref-2',
        type: 'text',
        title: 'My first thoughts',
        note: 'Starting my journal journey to track mood variations and reflection patterns over time.',
        date: '18 Aug 2024',
        timestamp: Date.now() - 86400000 * 4
      },
      {
        id: 'ref-3',
        type: 'voice',
        title: 'Recorded thoughts',
        note: 'Voice reflection on daily stress and positive milestones.',
        duration: '01:24',
        date: '15 Aug 2024',
        timestamp: Date.now() - 86400000 * 7
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('mindwave_journal_entries', JSON.stringify(entries));
    } catch {}
  }, [entries]);

  // Sync mood entries from backend if logged in
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/api/moods`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const backendMoods = data.map(m => ({
              id: `mood-${m.id}`,
              backendId: m.id,
              type: 'mood',
              title: `${m.mood} Mood`,
              mood: m.mood,
              note: m.note || '',
              date: m.created_at ? new Date(m.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today',
              timestamp: new Date(m.created_at).getTime()
            }));

            setEntries(prev => {
              const nonMoods = prev.filter(e => e.type !== 'mood');
              return [...backendMoods, ...nonMoods];
            });
          }
        })
        .catch(err => console.warn('Could not load backend moods:', err));
    }
  }, [token]);

  const addMoodEntry = async (mood, note = '') => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newEntry = {
      id: `entry-${Date.now()}`,
      type: 'mood',
      title: `${mood} Day`,
      mood,
      note,
      date: todayStr,
      timestamp: Date.now()
    };

    setEntries(prev => [newEntry, ...prev]);

    if (token) {
      try {
        await fetch(`${API_BASE}/api/moods`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ mood, note })
        });
      } catch (err) {
        console.warn('Backend mood sync failed:', err);
      }
    }
    return newEntry;
  };

  const addTextEntry = (title, note) => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newEntry = {
      id: `entry-${Date.now()}`,
      type: 'text',
      title: title || 'Journal Entry',
      note,
      date: todayStr,
      timestamp: Date.now()
    };

    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const addVoiceEntry = (audioBlob, durationStr) => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    let audioUrl = '';
    if (audioBlob) {
      try {
        audioUrl = URL.createObjectURL(audioBlob);
      } catch {}
    }

    const newEntry = {
      id: `entry-${Date.now()}`,
      type: 'voice',
      title: 'Recorded thoughts',
      duration: durationStr || '00:30',
      audioUrl,
      date: todayStr,
      timestamp: Date.now()
    };

    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const deleteEntry = async (id) => {
    const target = entries.find(e => e.id === id);
    if (target?.backendId && token) {
      try {
        await fetch(`${API_BASE}/api/moods/${target.backendId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {}
    }
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <JournalContext.Provider value={{
      entries,
      addMoodEntry,
      addTextEntry,
      addVoiceEntry,
      deleteEntry
    }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  return useContext(JournalContext);
}
