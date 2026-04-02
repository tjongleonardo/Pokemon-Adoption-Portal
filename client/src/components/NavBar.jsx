import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, HomeOutlined, ShopOutlined, FileTextOutlined } from '@ant-design/icons';
import './NavBar.css';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedTrainer = localStorage.getItem('trainer');
    if (storedTrainer) {
      setTrainer(JSON.parse(storedTrainer));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('trainer');
    localStorage.removeItem('trainerId');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="pokedex-leds">
            <div className="led big-blue"></div>
            <div className="led small-red"></div>
            <div className="led small-yellow"></div>
            <div className="led small-green"></div>
          </div>
          <span className="brand-text">Pokemon Adoption Portal</span>
        </div>

        <nav className="navbar-menu-custom">
          <Link to="/browse" className={location.pathname === '/browse' ? 'active' : ''}>
            <HomeOutlined /> Browse Pokemon
          </Link>
          <Link to="/centers" className={location.pathname === '/centers' ? 'active' : ''}>
            <ShopOutlined /> PokeCenter
          </Link>
          <Link to="/applications" className={location.pathname === '/applications' ? 'active' : ''}>
            <FileTextOutlined /> My Applications
          </Link>
          {trainer?.role === 'admin' && (
            <Link to="/admin" className={`admin-link ${location.pathname === '/admin' ? 'active' : ''}`}>
               <UserOutlined /> Admin Review
            </Link>
          )}
        </nav>

        <div className="navbar-user" ref={dropdownRef}>
          <div className="user-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="avatar-placeholder"><UserOutlined /></div>
            <span className="username">{trainer?.username || 'Trainer'}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          
          {dropdownOpen && (
            <div className="custom-dropdown">
              <div className="dropdown-info">
                <strong>{trainer?.username || 'Trainer'}</strong>
                <span>Region: {trainer?.region || 'Unknown'}</span>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-btn" onClick={handleLogout}>
                <LogoutOutlined /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
