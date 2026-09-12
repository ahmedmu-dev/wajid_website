import React from 'react'
import './ErrorMessage.css'

interface ErrorMessageProps {
  message: string
  onDismiss?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="error-message">
      <span className="error-message__icon">⚠️</span>
      <span className="error-message__text">{message}</span>
      {onDismiss && (
        <button className="error-message__dismiss" onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  )
}
