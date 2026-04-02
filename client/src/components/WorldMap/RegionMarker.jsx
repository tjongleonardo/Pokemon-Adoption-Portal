import { useState } from 'react';
import { ANIMATION_CONFIG } from '../../data/regionData';
import './WorldMap.css';

/**
 * RegionMarker - Clickable PokeCenter marker on the world map
 * 
 * Supports both styled fallback and custom image markers.
 * To use a custom image, set `region.markerImage` to your PNG path.
 */
function RegionMarker({ region, onClick, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const { markerPosition, markerImage, name, color, accentColor } = region;
  
  const markerStyle = {
    left: `${markerPosition.x}%`,
    top: `${markerPosition.y}%`,
    '--region-color': color,
    '--region-accent': accentColor,
    transform: isHovered ? `translate(-50%, -50%) scale(${ANIMATION_CONFIG.markerHoverScale})` : 'translate(-50%, -50%)',
  };

  return (
    <button
      className={`region-marker ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
      style={markerStyle}
      onClick={() => onClick(region)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={`Visit ${name} PokeCenter`}
    >
      {markerImage ? (
        // Custom image marker
        <img 
          src={markerImage} 
          alt={`${name} PokeCenter`} 
          className="marker-image"
        />
      ) : (
        // Styled fallback marker (PokeCenter style)
        <div className="marker-fallback">
          <div className="marker-pokecenter">
            <div className="pokecenter-roof"></div>
            <div className="pokecenter-body">
              <div className="pokecenter-cross"></div>
            </div>
          </div>
          <div className="marker-pulse"></div>
        </div>
      )}
      
      {/* Region label tooltip */}
      <div className="marker-tooltip">
        <span className="tooltip-name">{name}</span>
        <span className="tooltip-subtitle">{region.subtitle}</span>
      </div>
    </button>
  );
}

export default RegionMarker;
