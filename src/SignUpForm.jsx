import { useState, useRef, useEffect } from 'react'
import { User, Mail, Lock, CheckCircle } from 'lucide-react'
import './SignUpForm.css'

export default function SignUpForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showOtpMessage, setShowOtpMessage] = useState(false)
  const [touched, setTouched] = useState({})
  const nameInputRef = useRef(null)

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  const validateEmail = (em) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(em)
  }

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return 'weak';
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    
    if (strength < 2) return 'weak';
    if (strength < 3) return 'medium';
    return 'strong';
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Full name is required'
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email'
        } else {
          delete newErrors.email
        }
        break

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required'
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters'
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = 'Password must contain at least one uppercase letter'
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = 'Password must contain at least one number'
        } else {
          delete newErrors.password
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        } else if (formData.confirmPassword && value === formData.confirmPassword) {
          delete newErrors.confirmPassword
        }
        break

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password'
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match'
        } else {
          delete newErrors.confirmPassword
        }
        break

      default:
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirmPassword: true })

    const isValid = Object.keys(formData).every(field => {
      return validateField(field, formData[field])
    })

    if (!isValid) return

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      setShowOtpMessage(true)
      setTimeout(() => {
        setShowOtpMessage(false)
        setSuccess(true)
      }, 3000)
      console.log('Sign Up successful:', { 
        name: formData.name, 
        email: formData.email 
      })
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="signup-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close sign up form"
          type="button"
        >
          ×
        </button>
        <div className="form-container">
          <h2 id="signup-title">Create Account</h2>
          <p className="form-subtitle">Join Resumind to build your perfect resume</p>
          
          {errors.submit && <div className="error-message" role="alert">{errors.submit}</div>}
          {showOtpMessage && (
            <div className="otp-message" role="status">
              <CheckCircle size={20} />
              <span>OTP sent! Please check your email.</span>
            </div>
          )}
          {success && <div className="success-message" role="status">Account created successfully!</div>}
          
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input
                  ref={nameInputRef}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading || success}
                  required
                  aria-required="true"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  autoComplete="name"
                />
              </div>
              {touched.name && errors.name && (
                <p id="name-error" className="error-text">{errors.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading || success}
                  required
                  aria-required="true"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                />
              </div>
              {touched.email && errors.email && (
                <p id="email-error" className="error-text">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading || success}
                  required
                  aria-required="true"
                  aria-describedby={errors.password ? 'password-error' : 'password-hint'}
                  autoComplete="new-password"
                />
              </div>
              {touched.password && errors.password && (
                <p id="password-error" className="error-text">{errors.password}</p>
              )}
              {!errors.password && (
                <>
                  <p id="password-hint" className="password-hint">
                    At least 8 characters, 1 uppercase letter, and 1 number
                  </p>
                  {formData.password && (
                    <div className="password-strength-meter">
                      <div className={`strength-bar strength-${getPasswordStrength()}`}></div>
                      <span className={`strength-text ${getPasswordStrength()}`}>
                        {getPasswordStrength() === 'strong' && '✓ Strong'}
                        {getPasswordStrength() === 'medium' && '⊙ Medium'}
                        {getPasswordStrength() === 'weak' && '✗ Weak'}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading || success}
                  required
                  aria-required="true"
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  autoComplete="new-password"
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p id="confirmPassword-error" className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading || success || Object.keys(errors).length > 0}
              aria-busy={loading}
            >
              {loading && <span className="spinner"></span>}
              {loading ? 'Creating Account...' : success ? 'Success!' : 'Create Account'}
            </button>
          </form>

          <p className="form-footer">
            Already have an account? <a href="#login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  )
}