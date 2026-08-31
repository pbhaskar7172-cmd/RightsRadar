import { useState, useEffect, useRef, useCallback } from 'react';

// Browser-native speech recognition hook (webkitSpeechRecognition & SpeechRecognition)
export function useSpeechRecognition({ onTranscriptChange, onFinalTranscript } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);
  const [state, setState] = useState('idle'); // idle | listening | processing | complete | error

  const recognitionRef = useRef(null);
  const isSupported = typeof window !== 'undefined' && Boolean(
    window.SpeechRecognition || window.webkitSpeechRecognition
  );

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setState('listening');
      setError(null);
    };

    recognition.onresult = (event) => {
      let currentInterim = '';
      let currentFinal = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        if (item.isFinal) {
          currentFinal += item[0].transcript + ' ';
        } else {
          currentInterim += item[0].transcript;
        }
      }

      setInterimTranscript(currentInterim);
      if (currentFinal) {
        setTranscript((prev) => {
          const updated = (prev ? prev.trim() + ' ' : '') + currentFinal.trim();
          onTranscriptChange?.(updated);
          onFinalTranscript?.(updated);
          return updated;
        });
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        setState('idle');
        setIsListening(false);
        return;
      }
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please enable microphone permissions in your browser settings.');
      } else if (event.error === 'network') {
        setError('Network error occurred during speech recognition. Please check your internet connection.');
      } else {
        setError(`Speech recognition encountered an issue (${event.error}).`);
      }
      setState('error');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
      setState((prev) => (prev === 'listening' ? 'complete' : prev));
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore teardown errors
        }
      }
    };
  }, [isSupported, onTranscriptChange, onFinalTranscript]);

  const startListening = useCallback((options = {}) => {
    setError(null);
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser. Please use text input or Chrome/Edge.');
      setState('error');
      return false;
    }

    try {
      if (recognitionRef.current) {
        if (options.lang) {
          recognitionRef.current.lang = options.lang;
        }
        setState('processing');
        recognitionRef.current.start();
        return true;
      }
    } catch {
      // If already started, ignore
      return false;
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setState('complete');
      } catch {
        // Ignore stop error
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
    setState('idle');
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    state,
    startListening,
    stopListening,
    resetTranscript
  };
}
