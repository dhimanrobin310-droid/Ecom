import { useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((value) => !value)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-top-left">Free shipping on orders over $50</div>
        <div className="header-top-right">
          <a href="tel:1234567890">Call: 123-456-7890</a>
          <a href="#!">Wishlist</a>
          <a href="/login">Login</a>
        </div>
      </div>

      <div className="header-main">
        <div className="brand">
          <a href="/">
            Multikart <span>Store</span>
          </a>
        </div>

        <nav className={`header-nav${isMenuOpen ? ' open' : ''}`}>
          <div className="nav-header">
            <span>Menu</span>
            <button className="nav-close" type="button" onClick={closeMenu} aria-label="Close menu">
              ×
            </button>
          </div>

          <Link to="/" onClick={closeMenu} className="active">
            Home
          </Link>
          <Link to="/category" onClick={closeMenu}>
            Category
          </Link>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
          <Link to="/add" onClick={closeMenu}>
            Add Product
          </Link>

          <div className="mobile-menu-footer">
            <a href="tel:1234567890" onClick={closeMenu}>Call Us</a>
            <a href="/login" onClick={closeMenu}>Login</a>
          </div>
        </nav>

        <div className="header-actions desktop-only">
          <a href="/cart" className="action-link cart-link" aria-label="Cart">
            🛒
            <span>2</span>
          </a>
        </div>

        <button
          className="menu-toggle mobile-only"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-overlay${isMenuOpen ? ' visible' : ''}`} onClick={closeMenu} />
    </header>
  )
}
