import { useState, useEffect } from 'react';
import axios from 'axios';
import { getStatusColor, TOAST_DURATION } from '../utils/helpers';

function AdminReview() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewAction, setReviewAction] = useState(null); // 'approve' or 'reject'
  const [reviewMessage, setReviewMessage] = useState('');
  const [currentTrainer, setCurrentTrainer] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const trainer = localStorage.getItem('trainer');
    if (trainer) {
      const trainerData = JSON.parse(trainer);
      setCurrentTrainer(trainerData);
      
      if (trainerData.role !== 'admin') {
        showToast('Access denied. Admin role required.');
        window.location.href = '/browse';
        return;
      }
    }
    fetchApplications();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), TOAST_DURATION);
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/applications');
      setApplications(response.data);
      setLoading(false);
    } catch (error) {
      showToast('Failed to fetch applications');
      setLoading(false);
    }
  };

  const showReviewModal = (app, action) => {
    setSelectedApplication(app);
    setReviewAction(action);
    setReviewMessage('');
    setIsModalVisible(true);
  };

  const handleReview = async () => {
    if (!reviewMessage.trim()) {
      showToast('Please provide a reason for your decision');
      return;
    }

    try {
      await axios.put(`http://localhost:5001/api/applications/${selectedApplication._id}`, {
        status: reviewAction === 'approve' ? 'approved' : 'rejected',
        reviewMessage: reviewMessage.trim(),
        reviewedBy: currentTrainer._id
      });

      showToast(
        reviewAction === 'approve' 
          ? `Application approved! ${selectedApplication.proposedName} is now adopted!`
          : 'Application rejected'
      );
      
      setIsModalVisible(false);
      fetchApplications();
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update application');
    }
  };

  const renderApplicationCard = (app) => (
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
      
      <div className="custom-card-body" style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{app.pokemon?.species || 'Unknown Pokemon'}</span>
          <span className="custom-tag" style={{ backgroundColor: getStatusColor(app.status), border: 'none' }}>
            {app.status.toUpperCase()}
          </span>
        </div>
        
        <div style={{ marginTop: '12px' }}>
          <span style={{ color: 'var(--theme-text-muted)' }}>Trainer:</span> <strong>{app.trainer?.username || 'Unknown'}</strong>
          {app.trainer?.region && ` (${app.trainer.region})`}
        </div>
        
        <div>
          <span style={{ color: 'var(--theme-text-muted)' }}>Proposed Name:</span> <strong>{app.proposedName}</strong>
        </div>

        {app.message && (
          <div style={{ marginTop: '12px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', fontSize: '0.9rem' }}>
            <strong style={{ color: 'var(--theme-text-muted)' }}>Trainer's Message:</strong>
            <div style={{ marginTop: '4px' }}>{app.message}</div>
          </div>
        )}

        {app.reviewMessage && (
          <div style={{ marginTop: '12px', background: app.status === 'approved' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 77, 79, 0.1)', padding: '8px', borderRadius: '4px', fontSize: '0.9rem', borderLeft: `4px solid ${getStatusColor(app.status)}` }}>
            <strong style={{ color: getStatusColor(app.status) }}>Review Reason:</strong>
            <div style={{ marginTop: '4px' }}>{app.reviewMessage}</div>
            {app.reviewedAt && (
              <div style={{ marginTop: '4px', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                Reviewed: {new Date(app.reviewedAt).toLocaleString()}
              </div>
            )}
          </div>
        )}
        
        <div style={{ marginTop: 'auto', paddingTop: '16px', fontSize: '0.8rem', color: 'var(--theme-text-muted)', textAlign: 'right' }}>
          Applied: {new Date(app.createdAt).toLocaleDateString()}
        </div>
      </div>

      {app.status === 'pending' && (
        <div style={{ display: 'flex', borderTop: '1px solid var(--theme-border)' }}>
          <button 
            style={{ flex: 1, padding: '16px', background: 'transparent', border: 'none', color: '#4CAF50', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s', borderRight: '1px solid var(--theme-border)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(76, 175, 80, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => showReviewModal(app, 'approve')}
          >
            ✓ APPROVE
          </button>
          <button 
            style={{ flex: 1, padding: '16px', background: 'transparent', border: 'none', color: '#ff4d4f', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 77, 79, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => showReviewModal(app, 'reject')}
          >
            ✕ REJECT
          </button>
        </div>
      )}
    </div>
  );

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  const getActiveApplications = () => {
    switch(activeTab) {
      case 'pending': return pendingApplications;
      case 'approved': return approvedApplications;
      case 'rejected': return rejectedApplications;
      default: return [];
    }
  };

  const activeApps = getActiveApplications();

  if (loading) {
    return <div style={{ padding: '48px', textAlign: 'center', color: 'var(--theme-text-muted)' }}>Loading Admin Portal...</div>;
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      {toastMsg && <div className="custom-toast">{toastMsg}</div>}

      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Admin: Review Adoption Applications</h1>
      <p style={{ marginBottom: '32px', color: 'var(--theme-text-muted)' }}>
        Review and manage all adoption applications
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--theme-border)' }}>
        <button 
          onClick={() => setActiveTab('pending')}
          style={{ background: 'transparent', border: 'none', padding: '12px 24px', color: activeTab === 'pending' ? '#fff' : 'var(--theme-text-muted)', borderBottom: activeTab === 'pending' ? '2px solid var(--pokedex-red)' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          Pending ({pendingApplications.length})
        </button>
        <button 
          onClick={() => setActiveTab('approved')}
          style={{ background: 'transparent', border: 'none', padding: '12px 24px', color: activeTab === 'approved' ? '#fff' : 'var(--theme-text-muted)', borderBottom: activeTab === 'approved' ? '2px solid var(--pokedex-red)' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          Approved ({approvedApplications.length})
        </button>
        <button 
          onClick={() => setActiveTab('rejected')}
          style={{ background: 'transparent', border: 'none', padding: '12px 24px', color: activeTab === 'rejected' ? '#fff' : 'var(--theme-text-muted)', borderBottom: activeTab === 'rejected' ? '2px solid var(--pokedex-red)' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          Rejected ({rejectedApplications.length})
        </button>
      </div>

      {activeApps.length === 0 ? (
        <div className="empty-state">
          No {activeTab} applications
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {activeApps.map(app => renderApplicationCard(app))}
        </div>
      )}

      {isModalVisible && selectedApplication && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-window">
            <div className="custom-modal-header">
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: reviewAction === 'approve' ? '#4CAF50' : '#ff4d4f' }}>
                {reviewAction === 'approve' ? 'Approve' : 'Reject'} Adoption of {selectedApplication.pokemon?.species}
              </div>
              <button className="custom-modal-close" onClick={() => setIsModalVisible(false)}>✕</button>
            </div>

            <div className="custom-modal-content">
              <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--theme-input-bg)', borderRadius: '8px', border: '1px solid var(--theme-border)' }}>
                <div><span style={{ color: 'var(--theme-text-muted)' }}>Trainer:</span> <strong>{selectedApplication.trainer?.username}</strong></div>
                <div style={{ marginTop: '8px' }}><span style={{ color: 'var(--theme-text-muted)' }}>Proposed Name:</span> <strong>{selectedApplication.proposedName}</strong></div>
                {selectedApplication.message && (
                  <div style={{ marginTop: '12px' }}>
                    <span style={{ color: 'var(--theme-text-muted)' }}>Trainer's Message:</span>
                    <div style={{ fontSize: '0.9rem', marginTop: '4px', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px' }}>{selectedApplication.message}</div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: 'var(--theme-text-muted)' }}>
                  {reviewAction === 'approve' ? 'Approval Message (required):' : 'Reason for Rejection (required):'}
                </label>
                <textarea
                  className="custom-input"
                  placeholder={reviewAction === 'approve' ? 'e.g., Great application!' : 'e.g., We need more information...'}
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  rows={4}
                  maxLength={500}
                  style={{ resize: 'vertical' }}
                />
                <div style={{ textAlign: 'right', color: 'var(--theme-text-muted)', fontSize: '0.8rem' }}>
                  {reviewMessage.length}/500
                </div>
              </div>
            </div>

            <div className="custom-modal-footer">
              <button className="custom-btn" onClick={() => setIsModalVisible(false)}>
                Cancel
              </button>
              <button 
                className="custom-btn" 
                style={{ background: reviewAction === 'approve' ? '#4CAF50' : '#ff4d4f', color: '#fff', border: 'none' }}
                onClick={handleReview}
              >
                {reviewAction === 'approve' ? 'Approve Application' : 'Reject Application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminReview;
