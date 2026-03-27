import { useState, useEffect } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // TODO: Uncomment once other pages are built
  // Redirect if already logged in
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     window.location.href = '/';
  //   }
  // }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  // Client-side validation
  const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (isRegistering) {
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          errors.email = 'Please enter a valid email';
        }
      }

      if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const url = isRegistering ? '/api/trainers/register' : '/api/trainers/login';
      const payload = isRegistering
        ? { username: formData.username, email: formData.email, password: formData.password, region: formData.region }
        : { username: formData.username, password: formData.password };

      const res = await axios.post(url, payload);

      // Store JWT and user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('trainer', JSON.stringify(res.data.trainer));

      // Show success message, then redirect
      const name = res.data.trainer.username;
      setSuccess(isRegistering
        ? `Welcome, ${name}! Account created successfully!`
        : `Welcome back, ${name}!`);

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setSuccess('');
    setFieldErrors({});
  };

  return (
    <div className="login-page">
      {/* Floating pokeball decorations */}
      <div className="pokeball-bg pokeball-bg-1"></div>
      <div className="pokeball-bg pokeball-bg-2"></div>
      <div className="pokeball-bg pokeball-bg-3"></div>

      <div className="login-card">
        <div className="login-header">
          <div className="pokeball-icon">
            <div className="pokeball-top"></div>
            <div className="pokeball-center"></div>
            <div className="pokeball-bottom"></div>
          </div>
          <h1>Pokémon Adoption Portal</h1>
          <p className="login-subtitle">
            {isRegistering
              ? 'Create your Trainer account'
              : 'Welcome back, Trainer!'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="tab-switcher">
          <button
            className={`tab-btn ${!isRegistering ? 'active' : ''}`}
            onClick={() => { setIsRegistering(false); setError(''); setFieldErrors({}); }}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${isRegistering ? 'active' : ''}`}
            onClick={() => { setIsRegistering(true); setError(''); setFieldErrors({}); }}
          >
            Register
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className={`input-group ${fieldErrors.username ? 'has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
            {fieldErrors.username && <span className="field-error">{fieldErrors.username}</span>}
          </div>

          {isRegistering && (
            <div className={`input-group ${fieldErrors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>
          )}

          <div className={`input-group ${fieldErrors.password ? 'has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>
            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
          </div>

          {isRegistering && (
            <div className={`input-group ${fieldErrors.confirmPassword ? 'has-error' : ''}`}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
            </div>
          )}

          {isRegistering && (
            <div className="input-group">
              <label htmlFor="region">Region</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
              >
                <option value="">Select a region</option>
                <option value="Kanto">Kanto</option>
                <option value="Johto">Johto</option>
                <option value="Hoenn">Hoenn</option>
                <option value="Sinnoh">Sinnoh</option>
                <option value="Unova">Unova</option>
                <option value="Kalos">Kalos</option>
                <option value="Alola">Alola</option>
                <option value="Galar">Galar</option>
                <option value="Paldea">Paldea</option>
              </select>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="spinner-wrapper">
                <span className="spinner"></span>
                Loading...
              </span>
            ) : (
              isRegistering ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <p className="switch-text">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" className="switch-link" onClick={switchMode}>
            {isRegistering ? 'Sign In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}
