import { REGION_LIST, MAP_CONFIG } from '../../data/regionData';
import RegionMarker from './RegionMarker';
import './WorldMap.css';

/**
 * WorldMap - The main interactive map hub for browsing regions
 * 
 * Displays a world map with clickable PokeCenter markers for each region.
 * Uses MAP_CONFIG for background customization.
 */
function WorldMap({ onSelectRegion, activeRegion }) {
  const mapStyle = {
    backgroundImage: MAP_CONFIG.backgroundImage
      ? `url(${MAP_CONFIG.backgroundImage})`
      : MAP_CONFIG.fallbackBackground,
    aspectRatio: MAP_CONFIG.aspectRatio,
  };

  return (
    <div className="world-map-container">
      {/* Header */}
      <div className="map-header">
        <h1 className="map-title">
          <span className="title-icon">🌍</span>
          Pokémon World Map
        </h1>
        <p className="map-subtitle">Select a PokeCenter to begin your adoption journey</p>
      </div>

      {/* Map Area */}
      <div className="world-map" style={mapStyle}>
        {/* Map overlay for better marker visibility */}
        <div className="map-overlay"></div>

        {/* Decorative elements */}
        <div className="map-grid"></div>

        {/* Region markers */}
        {REGION_LIST.map((region) => (
          <RegionMarker
            key={region.id}
            region={region}
            onClick={onSelectRegion}
            isActive={activeRegion?.id === region.id}
          />
        ))}

        {/* Legend */}
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-marker"></div>
            <span>PokeCenter</span>
          </div>
        </div>
      </div>

      {/* Region preview cards (bottom strip) */}
      <div className="region-preview-strip">
        {REGION_LIST.map((region) => (
          <button
            key={region.id}
            className={`region-preview-card ${activeRegion?.id === region.id ? 'active' : ''}`}
            onClick={() => onSelectRegion(region)}
            style={{ '--region-color': region.color }}
          >
            <span className="preview-name">{region.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WorldMap;
