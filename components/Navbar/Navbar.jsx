'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation'
import './Navbar.css'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollContainerRef = useRef(null)

  const handleScroll = useCallback(() => {
    // Check multiple scroll sources
    const mainScroll = document.getElementById('main-scroll-container')?.scrollTop || 0
    const windowScroll = window.scrollY || 0
    const heroHeight = window.innerHeight // Hero section height
    
    // Use whichever scroll value is greater
    const totalScroll = Math.max(mainScroll, windowScroll)
    
    // Trigger background change after scrolling 50px or more
    setIsScrolled(totalScroll > 50)
  }, [])

  useEffect(() => {
    // Listen to window scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Listen to main container scroll if it exists
    const mainContainer = document.getElementById('main-scroll-container')
    if (mainContainer) {
      scrollContainerRef.current = mainContainer
      mainContainer.addEventListener('scroll', handleScroll, { passive: true })
    }
    
    // Initial check
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/capabilities', label: 'Capabilities' },
    { href: '/industries', label: 'Industries' },
    { href: '/quality', label: 'Quality' },
    { href: '/facilities', label: 'Facilities' },
  ]

  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo" onClick={closeSidebar}>
            <Image 
              src="/optimize/logo.webp"
              alt="Forgentis Logo" 
              className="navbar-logo-img"
              width={240}
              height={120}
              priority
              quality={100}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu">
           {navLinks.map((link, index) => {
  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
  
  return (
    <motion.div 
     key={link.href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.9 + index * 0.07,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                >
      <Link 
        href={link.href}
        className={`navbar-link ${isActive ? 'navbar-link-active' : ''}`}
      >
        {link.label}
      </Link>
    </motion.div>
  )
})}
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <Link href="/consultation" className="btn btn-blue navbar-cta">
              Request a Quote <ArrowRight size={16} />
            </Link>
            
            <button 
              className="navbar-toggle"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />

      {/* Mobile Sidebar */}
      <div className={`navbar-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="navbar-logo" onClick={closeSidebar}>
            <Image 
              src="/optimize/logo.webp"
              alt="Forgentis Logo" 
              className="navbar-logo-img"
              width={140}
              height={70}
              priority
              quality={100}
            />
          </Link>
          <button 
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X size={15} strokeWidth={1.5} />
          </button>
        </div>

        <div className="sidebar-links">
          {navLinks.map((link) => {
  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
  
  return (
    <Link 
      key={link.href} 
      href={link.href}
      className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
      onClick={closeSidebar}
    >
      {link.label}
    </Link>
  )
})}
          <Link 
            href="/consultation" 
            className="btn btn-blue sidebar-cta"
            onClick={closeSidebar}
          >
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar