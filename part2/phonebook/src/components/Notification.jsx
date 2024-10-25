import React from 'react'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'white',
    background: '#1a1a1a',
    border: '1px solid white',
    fontSize: '18px',
    borderRadius: '8px',
    padding: '12px 20px',
    marginBottom: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lineHeight: '1.6',
    fontWeight: 'bold'
  }

  if (message === null) {
    return null
  }

  return (
    <div>
      <p style={notificationStyle}>{message}</p>
    </div>
  )
}

export default Notification