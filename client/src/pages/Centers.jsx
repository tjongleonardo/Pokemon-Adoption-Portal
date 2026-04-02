import { useState, useEffect } from 'react';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

function Centers() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const placeholderCenters = [
      { id: 1, name: 'Kanto PokeCenter', region: 'Kanto', location: 'Pallet Town', phone: '(555) 001-0001', email: 'kanto@pokecenter.com' },
      { id: 2, name: 'Johto PokeCenter', region: 'Johto', location: 'New Bark Town', phone: '(555) 002-0002', email: 'johto@pokecenter.com' },
      { id: 3, name: 'Hoenn PokeCenter', region: 'Hoenn', location: 'Littleroot Town', phone: '(555) 003-0003', email: 'hoenn@pokecenter.com' },
      { id: 4, name: 'Sinnoh PokeCenter', region: 'Sinnoh', location: 'Twinleaf Town', phone: '(555) 004-0004', email: 'sinnoh@pokecenter.com' },
      { id: 5, name: 'Unova PokeCenter', region: 'Unova', location: 'Nuvema Town', phone: '(555) 005-0005', email: 'unova@pokecenter.com' },
      { id: 6, name: 'Kalos PokeCenter', region: 'Kalos', location: 'Vaniville Town', phone: '(555) 006-0006', email: 'kalos@pokecenter.com' },
      { id: 7, name: 'Alola PokeCenter', region: 'Alola', location: 'Iki Town', phone: '(555) 007-0007', email: 'alola@pokecenter.com' },
      { id: 8, name: 'Galar PokeCenter', region: 'Galar', location: 'Postwick', phone: '(555) 008-0008', email: 'galar@pokecenter.com' },
      { id: 9, name: 'Paldea PokeCenter', region: 'Paldea', location: 'Los Platos', phone: '(555) 009-0009', email: 'paldea@pokecenter.com' },
    ];

    setTimeout(() => {
      setCenters(placeholderCenters);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', color: 'var(--theme-text-muted)' }}>
        Loading Centers...
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>PokeCenter Locations</h1>
      <p style={{ marginBottom: '32px', color: 'var(--theme-text-muted)' }}>
        Find your nearest PokeCenter to adopt a Pokemon partner!
      </p>

      {centers.length === 0 ? (
        <div className="empty-state">
          No PokeCenters available
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {centers.map(center => (
            <div key={center.id} className="custom-card" style={{ transition: 'transform 0.2s ease', cursor: 'pointer' }}
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="custom-card-body">
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--pokedex-red)', marginBottom: '16px' }}>
                  {center.name}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--theme-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EnvironmentOutlined style={{ marginRight: '12px', color: 'var(--theme-text-muted)' }} />
                    <span style={{ fontWeight: '600', marginRight: '8px' }}>Location:</span> {center.location}, {center.region}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneOutlined style={{ marginRight: '12px', color: 'var(--theme-text-muted)' }} />
                    <span style={{ fontWeight: '600', marginRight: '8px' }}>Phone:</span> {center.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MailOutlined style={{ marginRight: '12px', color: 'var(--theme-text-muted)' }} />
                    <span style={{ fontWeight: '600', marginRight: '8px' }}>Email:</span> {center.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Centers;