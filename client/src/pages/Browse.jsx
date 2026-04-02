import { useState, useCallback } from 'react';
import WorldMap from '../components/WorldMap/WorldMap';
import ProfessorDialogue from '../components/ProfessorDialogue/ProfessorDialogue';
import RegionShowcase from '../components/RegionShowcase/RegionShowcase';
import { ANIMATION_CONFIG } from '../data/regionData';

/**
 * Browse - Immersive Pokemon World Map Experience
 * 
 * Flow:
 * 1. User sees interactive world map with PokeCenter markers
 * 2. User clicks a region marker
 * 3. Professor dialogue scene plays
 * 4. Region Pokemon showcase appears with adoption functionality
 * 5. User can return to map to explore other regions
 */

// View states for the Browse experience
const VIEW_STATES = {
  MAP: 'map',
  DIALOGUE: 'dialogue',
  SHOWCASE: 'showcase'
};

function Browse() {
  const [currentView, setCurrentView] = useState(VIEW_STATES.MAP);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle region selection from the map
  const handleSelectRegion = useCallback((region) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSelectedRegion(region);
    
    // Small delay for smoother transition
    setTimeout(() => {
      setCurrentView(VIEW_STATES.DIALOGUE);
      setIsTransitioning(false);
    }, ANIMATION_CONFIG.transitionDuration / 2);
  }, [isTransitioning]);

  // Handle dialogue completion - transition to showcase
  const handleDialogueComplete = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentView(VIEW_STATES.SHOWCASE);
      setIsTransitioning(false);
    }, 100);
  }, []);

  // Handle closing dialogue - return to map
  const handleDialogueClose = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentView(VIEW_STATES.MAP);
      setSelectedRegion(null);
      setIsTransitioning(false);
    }, 100);
  }, []);

  // Handle returning to map from showcase
  const handleBackToMap = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentView(VIEW_STATES.MAP);
      setSelectedRegion(null);
      setIsTransitioning(false);
    }, ANIMATION_CONFIG.transitionDuration / 2);
  }, []);

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case VIEW_STATES.DIALOGUE:
        return selectedRegion ? (
          <ProfessorDialogue
            region={selectedRegion}
            onComplete={handleDialogueComplete}
            onClose={handleDialogueClose}
          />
        ) : null;

      case VIEW_STATES.SHOWCASE:
        return selectedRegion ? (
          <RegionShowcase
            region={selectedRegion}
            onBack={handleBackToMap}
          />
        ) : null;

      case VIEW_STATES.MAP:
      default:
        return (
          <WorldMap
            onSelectRegion={handleSelectRegion}
            activeRegion={selectedRegion}
          />
        );
    }
  };

  return (
    <div className={`browse-experience ${isTransitioning ? 'transitioning' : ''}`}>
      {renderCurrentView()}
      
      {/* Global transition overlay */}
      {isTransitioning && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 999,
            pointerEvents: 'none',
            animation: 'fadeInOut 0.5s ease-in-out'
          }}
        />
      )}
      
      <style>{`
        .browse-experience {
          min-height: calc(100vh - 64px);
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Browse;
