import { useState, useRef, useEffect } from 'react'
import { Mail, Lock } from 'lucide-react'
import './LoginForm.css'

export default function LoginForm({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [touched, setTouched] = useState({})
  const [rememberMe, setRememberMe] = useState(false)
  const emailInputRef = useRef(null)

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  const validateEmail = (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)

  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
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
        } else if (value.length < 6) {
          newErrors.password = 'Password is invalid'
        } else {
          delete newErrors.password
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
    setTouched({ email: true, password: true })

    const isValid = Object.keys(formData).every(field => {
      return validateField(field, formData[field])
    })

    if (!isValid) return

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      setSuccess(true)
      if (rememberMe) {
        localStorage.setItem('rememberEmail', formData.email)
      } else {
        localStorage.removeItem('rememberEmail')
      }
      console.log('Login successful:', { email: formData.email, rememberMe })
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close sign in form"
          type="button"
        >
          ×
        </button>
        <div className="form-container">
          <h2 id="login-title">Sign In</h2>
          <p className="form-subtitle">Welcome back to Resumind</p>
          
          {errors.submit && <div className="error-message" role="alert">{errors.submit}</div>}
          {success && <div className="success-message" role="status">Signed in successfully!</div>}
          
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail size={20} className="input-icon" />
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
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
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  autoComplete="current-password"
                />
              </div>
              {touched.password && errors.password && (
                <p id="password-error" className="error-text">{errors.password}</p>
              )}
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading || success}
                  aria-label="Remember me on this device"
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-password">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading || success || Object.keys(errors).length > 0}
              aria-busy={loading}
            >
              {loading && <span className="spinner"></span>}
              {loading ? 'Signing In...' : success ? 'Success!' : 'Sign In'}
            </button>
          </form>

          <p className="form-footer">
            Don't have an account? <a href="#signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}