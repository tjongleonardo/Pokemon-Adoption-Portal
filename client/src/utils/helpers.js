/**
 * Shared utility functions for the Pokemon Adoption Portal
 */

/**
 * Returns the color associated with an application status
 * @param {string} status - The application status ('pending', 'approved', 'rejected')
 * @returns {string} Hex color code
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return '#faad14';
    case 'approved': return '#4CAF50';
    case 'rejected': return '#ff4d4f';
    default: return '#888';
  }
};

/**
 * Returns the color associated with a Pokemon type
 * @param {string} type - The Pokemon type string
 * @returns {string} Hex color code
 */
export const getTypeColor = (type) => {
  const typeColors = {
    Fire: '#EE8130',
    Water: '#6390F0',
    Grass: '#7AC74C',
    Electric: '#F7D02C',
    Psychic: '#F95587',
    Ice: '#96D9D6',
    Dragon: '#6F35FC',
    Dark: '#705746',
    Fairy: '#D685AD',
    Normal: '#A8A77A',
    Fighting: '#C22E28',
    Flying: '#A98FF3',
    Poison: '#A33EA1',
    Ground: '#E2BF65',
    Rock: '#B6A136',
    Bug: '#A6B91A',
    Ghost: '#735797',
    Steel: '#B7B7CE',
  };
  
  for (const [typeName, colorVal] of Object.entries(typeColors)) {
    if (type.includes(typeName)) return colorVal;
  }
  return '#777';
};

/**
 * Toast display duration in milliseconds
 */
export const TOAST_DURATION = 4000;
