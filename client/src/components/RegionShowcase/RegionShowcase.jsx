import { useState, useEffect } from 'react';
import axios from 'axios';
import { ANIMATION_CONFIG } from '../../data/regionData';
import { getTypeColor, TOAST_DURATION } from '../../utils/helpers';
import './RegionShowcase.css';

function RegionShowcase({ region, onBack }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [proposedName, setProposedName] = useState('');
  const [adoptionMessage, setAdoptionMessage] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const { name: regionName, color, accentColor, subtitle, description, featuredPokemon } = region;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/pokemon');
        const regionPokemon = response.data.filter(p => p.region === regionName);
        
        const sorted = regionPokemon.sort((a, b) => {
          const aFeatured = featuredPokemon.includes(a.species);
          const bFeatured = featuredPokemon.includes(b.species);
          if (aFeatured && !bFeatured) return -1;
          if (!aFeatured && bFeatured) return 1;
          return a.species.localeCompare(b.species);
        });
        
        setPokemon(sorted);
        setLoading(false);
      } catch (error) {
        showToast('Failed to load Pokemon');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [regionName, featuredPokemon]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showIntro && pokemon.length > 0 && revealedCount < pokemon.length) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, ANIMATION_CONFIG.showcaseStagger);
      return () => clearTimeout(timer);
    }
  }, [showIntro, revealedCount, pokemon.length]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), TOAST_DURATION);
  };

  const showAdoptionModal = (poke) => {
    setSelectedPokemon(poke);
    setProposedName('');
    setAdoptionMessage('');
    setIsModalVisible(true);
  };

  const handleAdopt = async () => {
    if (!proposedName.trim()) {
      showToast('Please enter a name for your Pokemon!');
      return;
    }

    try {
      const trainerId = localStorage.getItem('trainerId');
      
      if (!trainerId) {
        showToast('Please log in to adopt a Pokemon');
        return;
      }

      await axios.post('http://localhost:5001/api/applications', {
        trainer: trainerId,
        pokemon: selectedPokemon._id,
        proposedName: proposedName.trim(),
        message: adoptionMessage.trim()
      });

      showToast(`Application submitted! You want to name ${selectedPokemon.species} "${proposedName}"`);
      setIsModalVisible(false);
      
      const response = await axios.get('http://localhost:5001/api/pokemon');
      const regionPokemon = response.data.filter(p => p.region === regionName);
      setPokemon(regionPokemon);
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to submit application');
    }
  };

  const sceneStyle = {
    '--region-color': color,
    '--region-accent': accentColor,
  };

  return (
    <div className="region-showcase" style={sceneStyle}>
      {toastMsg && <div className="custom-toast">{toastMsg}</div>}

      {showIntro && (
        <div className="showcase-intro">
          <div className="intro-content">
            <div className="intro-pokeball"></div>
            <h2 className="intro-title">Welcome to {regionName}</h2>
            <p className="intro-subtitle">{subtitle}</p>
          </div>
        </div>
      )}

      <div className="showcase-header">
        <button className="back-button" onClick={onBack}>← Back to Map</button>
        <div className="header-content">
          <h1 className="showcase-title">{regionName} Pokémon</h1>
          <p className="showcase-subtitle">{description}</p>
        </div>
        <div className="header-stats">
          <span className="stat-badge">
            {pokemon.filter(p => p.status === 'available').length} Available
          </span>
        </div>
      </div>

      <div className="choose-banner">
        <div className="banner-box">
          <span className="banner-text">Choose your partner Pokémon!</span>
          <span className="banner-arrow">▼</span>
        </div>
      </div>

      <div className="pokemon-showcase-grid">
        {loading ? (
          <div className="loading-state">
            <div className="loading-pokeball"></div>
            <p>Loading Pokémon...</p>
          </div>
        ) : pokemon.length === 0 ? (
          <div className="empty-state">
            <p>No Pokémon available in {regionName} right now.</p>
            <button className="custom-btn return-button" onClick={onBack}>Explore Other Regions</button>
          </div>
        ) : (
          pokemon.map((poke, index) => {
            const isFeatured = featuredPokemon.includes(poke.species);
            const isRevealed = index < revealedCount;
            
            return (
              <div
                key={poke._id}
                className={`pokemon-showcase-card ${isRevealed ? 'revealed' : ''} ${isFeatured ? 'featured' : ''}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="custom-card showcase-card-inner">
                  <div className="pokemon-image-container">
                    {isFeatured && <div className="featured-badge">★ Featured</div>}
                    <img alt={poke.species} src={poke.imageUrl} className="pokemon-image" />
                    <div className="image-glow"></div>
                  </div>
                  
                  <div className="custom-card-body">
                    <span className="pokemon-name">{poke.species}</span>
                    <div className="pokemon-details">
                      <span className="custom-tag type-tag" style={{ backgroundColor: getTypeColor(poke.type) }}>
                        {poke.type}
                      </span>
                      <div className="pokemon-stats">
                        <span>Level {poke.level}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="custom-btn adopt-button"
                    onClick={() => showAdoptionModal(poke)}
                    disabled={poke.status !== 'available'}
                  >
                    {poke.status === 'available' ? '✨ Adopt Me!' : 'Not Available'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalVisible && selectedPokemon && (
        <div className="custom-modal-overlay">
          <div className="retro-terminal-modal custom-modal-window">
            <div className="custom-modal-header">
              <div className="retro-modal-title">
                ADOPT {selectedPokemon.species.toUpperCase()}
              </div>
              <button className="custom-modal-close" onClick={() => setIsModalVisible(false)}>✕</button>
            </div>

            <div className="custom-modal-content">
              <div className="retro-screen-content">
                <div className="modal-pokemon-preview">
                  <img src={selectedPokemon.imageUrl} alt={selectedPokemon.species} className="modal-pokemon-image" />
                  <div className="modal-pokemon-info">
                    <span className="retro-text">{selectedPokemon.species.toUpperCase()}</span>
                    <span className="retro-text">LVL {selectedPokemon.level}</span>
                    <span className="custom-tag retro-tag" style={{ backgroundColor: 'transparent', borderColor: '#111', color: '#E8E8E8' }}>
                      {selectedPokemon.type}
                    </span>
                  </div>
                </div>
                
                <div className="modal-form">
                  <label className="retro-label">NICKNAME (REQ):</label>
                  <input
                    type="text"
                    placeholder="Enter name..."
                    value={proposedName}
                    onChange={(e) => setProposedName(e.target.value)}
                    maxLength={20}
                    className="custom-input retro-input"
                  />
                  <label className="retro-label">TRAINER MEMO (OPT):</label>
                  <textarea
                    placeholder="Tell us why..."
                    value={adoptionMessage}
                    onChange={(e) => setAdoptionMessage(e.target.value)}
                    rows={3}
                    className="custom-input retro-input retro-textarea"
                  />
                </div>
              </div>
            </div>

            <div className="custom-modal-footer">
              <button className="custom-btn retro-btn-cancel" onClick={() => setIsModalVisible(false)}>
                CANCEL [B]
              </button>
              <button className="custom-btn retro-btn-submit" onClick={handleAdopt}>
                ADOPT [A]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegionShowcase;
