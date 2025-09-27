import React from 'react'

function Footer() {
  return (
    <footer style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        padding: "15px",
        background: "black",
        color: "white",
        textAlign: "center"
      }}>
        <p>© {new Date().getFullYear()} WeCare. All Rights Reserved.</p>
      </footer>
  )
}

export default Footer