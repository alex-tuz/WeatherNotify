"use client"

import { useState } from "react"
import { api } from '../services/api'

export default function SubscriptionForm({ onSubscribe, city }) {
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setIsValid(validateEmail(value) || value === "")
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !validateEmail(email)) {
      setIsValid(false)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await api.subscribe(email, city)
      onSubscribe(email)
      setEmail("")
    } catch (err) {
      setError(err.message || 'Failed to subscribe to updates')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="subscription-form mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Subscribe to Weather Updates</h4>
          <p className="card-text">
            Get daily weather notifications for {city}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${!isValid ? "is-invalid" : ""}`}
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {!isValid && <div className="invalid-feedback">Please enter a valid email address.</div>}
              {error && <div className="text-danger mt-2">{error}</div>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
