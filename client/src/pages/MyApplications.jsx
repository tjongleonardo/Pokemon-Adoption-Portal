import { useState, useEffect } from 'react';
import axios from 'axios';
import { getStatusColor, TOAST_DURATION } from '../utils/helpers';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), TOAST_DURATION);
  };

  const fetchApplications = async () => {
    try {
      const trainerId = localStorage.getItem('trainerId');
      
      if (!trainerId) {
        showToast('Please log in to view your applications');
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:5001/api/applications?trainer=${trainerId}`);
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      showToast('Failed to fetch applications');
      setLoading(false);
    }
  };

  const handleRelease = async (appId) => {
    if (!window.confirm("Are you sure you want to release this Pokemon back into the wild? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`http://localhost:5001/api/applications/${appId}`);
      showToast('Pokemon was released back to the wild successfully!');
      fetchApplications();
    } catch (error) {
      showToast('Failed to release Pokemon');
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'approved': return 'Approved - Complete!';
      case 'rejected': return 'Rejected';
      default: return status.toUpperCase();
    }
  };

  if (loading) {
    return <div style={{ padding: '48px', textAlign: 'center', color: 'var(--theme-text-muted)' }}>Loading Applications...</div>;
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      {toastMsg && <div className="custom-toast">{toastMsg}</div>}

      <h1 style={{ fontSize: '2rem', marginBottom: '32px' }}>My Adoption Applications</h1>

      {applications.length === 0 ? (
        <div className="empty-state">
          You haven't submitted any adoption applications yet
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {applications.map(app => (
            <div key={app._id} className="custom-card">
              {app.pokemon?.imageUrl && (
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '24px', textAlign: 'center' }}>
                  <img
                    alt={app.pokemon.species}
                    src={app.pokemon.imageUrl}
                    style={{ height: '160px', objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
                  />
                </div>
              )}
              
              <div className="custom-card-body">
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                  {app.pokemon?.species || 'Unknown Pokemon'}
                </div>
                {app.status === 'approved' && (
                  <div style={{ fontSize: '0.9rem', color: 'var(--theme-text-muted)' }}>
                    Now named: <span style={{ color: '#fff' }}>{app.proposedName}</span>
                  </div>
                )}
                
                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                  <span className="custom-tag" style={{ backgroundColor: getStatusColor(app.status), border: 'none' }}>
                    {getStatusText(app.status)}
                  </span>
                </div>
                
                <div style={{ fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--theme-text-muted)' }}>Proposed Name:</span> <br/>
                  <strong>{app.proposedName}</strong>
                </div>
                
                {app.message && (
                  <div style={{ marginTop: '12px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--theme-text-muted)' }}>Your Message:</span> <br/>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', marginTop: '4px' }}>
                      {app.message}
                    </div>
                  </div>
                )}

                {app.reviewMessage && (
                  <div style={{ 
                    marginTop: '16px', 
                    padding: '12px', 
                    background: app.status === 'approved' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 77, 79, 0.1)',
                    borderLeft: `4px solid ${app.status === 'approved' ? '#4CAF50' : '#ff4d4f'}`,
                    borderRadius: '4px'
                  }}>
                    <strong style={{ color: app.status === 'approved' ? '#4CAF50' : '#ff4d4f', display: 'block', marginBottom: '4px' }}>
                      {app.status === 'approved' ? '✓ Admin Notice:' : '✗ Rejection Reason:'}
                    </strong>
                    <div style={{ fontSize: '0.9rem' }}>
                      {app.reviewMessage}
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--theme-text-muted)' }}>
                  <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                  
                  {app.status === 'approved' && (
                    <button 
                      onClick={() => handleRelease(app._id)}
                      style={{ background: 'transparent', border: '1px solid #ff4d4f', color: '#ff4d4f', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 77, 79, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      Release Pokemon
                    </button>
                  )}
                  {app.status === 'pending' && (
                    <button 
                      onClick={() => handleRelease(app._id)}
                      style={{ background: 'transparent', border: '1px solid var(--theme-text-muted)', color: 'var(--theme-text-muted)', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      Cancel Pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;
