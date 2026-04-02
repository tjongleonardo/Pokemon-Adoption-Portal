import { useState, useEffect, useCallback, useRef } from 'react';
import { ANIMATION_CONFIG } from '../../data/regionData';
import './ProfessorDialogue.css';

/**
 * ProfessorDialogue - Persona-inspired dialogue scene
 * 
 * Features:
 * - Dramatic portrait area (supports custom PNG or styled fallback)
 * - Cinematic dialogue box with typewriter effect
 * - Click to skip typewriter animation and show full text instantly
 * - Click again to advance to next dialogue
 * - Region theming
 */
function ProfessorDialogue({ region, onComplete, onClose }) {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  
  // Ref to track the typewriter interval so we can clear it on skip
  const typewriterRef = useRef(null);

  const { professor, dialogues, name: regionName, color, accentColor, subtitle } = region;
  const currentDialogue = dialogues[currentDialogueIndex];
  const isLastDialogue = currentDialogueIndex === dialogues.length - 1;

  // Typewriter effect
  useEffect(() => {
    if (!currentDialogue) return;
    
    setIsTyping(true);
    setDisplayedText('');
    
    let charIndex = 0;
    typewriterRef.current = setInterval(() => {
      if (charIndex < currentDialogue.length) {
        setDisplayedText(currentDialogue.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typewriterRef.current);
        typewriterRef.current = null;
      }
    }, ANIMATION_CONFIG.dialogueTypeSpeed);

    return () => {
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
        typewriterRef.current = null;
      }
    };
  }, [currentDialogue]);

  const handleAdvance = useCallback(() => {
    if (isTyping) {
      // Skip typewriter animation - show full text instantly
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current);
        typewriterRef.current = null;
      }
      setDisplayedText(currentDialogue);
      setIsTyping(false);
      return;
    }

    if (isLastDialogue) {
      // Transition out
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, ANIMATION_CONFIG.transitionDuration);
    } else {
      setCurrentDialogueIndex(prev => prev + 1);
    }
  }, [isTyping, isLastDialogue, currentDialogue, onComplete]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, ANIMATION_CONFIG.transitionDuration);
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleAdvance();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAdvance, handleClose]);

  const sceneStyle = {
    '--region-color': color,
    '--region-accent': accentColor,
  };

  return (
    <div 
      className={`professor-dialogue-scene ${isExiting ? 'exiting' : ''}`}
      style={sceneStyle}
      onClick={handleAdvance}
    >
      {/* Cinematic bars */}
      <div className="cinematic-bar top"></div>
      <div className="cinematic-bar bottom"></div>

      {/* Background with region theming */}
      <div className="dialogue-background">
        <div className="bg-gradient"></div>
        <div className="bg-particles"></div>
        <div className="bg-scanlines"></div>
      </div>

      {/* Region banner */}
      <div className="region-banner">
        <div className="banner-content">
          <span className="banner-region">{regionName}</span>
          <span className="banner-subtitle">{subtitle}</span>
        </div>
      </div>

      {/* Close button */}
      <button 
        className="dialogue-close"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label="Close dialogue"
      >
        ✕
      </button>

      {/* Professor portrait area */}
      <div className="professor-portrait-container">
        {professor.portrait ? (
          <img 
            src={professor.portrait} 
            alt={professor.name}
            className="professor-portrait-image"
          />
        ) : (
          <div className="professor-portrait-fallback">
            <div 
              className="portrait-initial"
              style={{ background: professor.fallbackColor }}
            >
              {professor.fallbackInitial}
            </div>
            <div className="portrait-frame"></div>
          </div>
        )}
        
        {/* Professor glow effect */}
        <div className="portrait-glow"></div>
      </div>

      {/* Dialogue box - Persona inspired */}
      <div className="dialogue-box-container">
        {/* Name tag */}
        <div className="professor-name-tag">
          <span className="name-text">{professor.name}</span>
          <span className="name-title">{professor.title}</span>
        </div>

        {/* Main dialogue box */}
        <div className="dialogue-box">
          <div className="dialogue-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">▌</span>}
          </div>

          {/* Continue indicator */}
          {!isTyping && (
            <div className="dialogue-continue">
              {isLastDialogue ? (
                <span className="continue-text">Click to meet the Pokémon ▶</span>
              ) : (
                <span className="continue-arrow">▼</span>
              )}
            </div>
          )}
        </div>

        {/* Dialogue progress */}
        <div className="dialogue-progress">
          {dialogues.map((_, idx) => (
            <div 
              key={idx}
              className={`progress-dot ${idx === currentDialogueIndex ? 'active' : ''} ${idx < currentDialogueIndex ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="dialogue-decor left"></div>
      <div className="dialogue-decor right"></div>
    </div>
  );
}

export default ProfessorDialogue;
