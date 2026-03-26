import React from 'react'
import { Heart, ExternalLink, ArrowUpRight } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Support', href: '#support' },
  ]

  return (
    <footer className="bg-white/80 backdrop-blur-xl border-t border-neutral-100">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left - Copyright */}
            <div className="flex items-center gap-2 order-2 sm:order-1">
              <span className="text-xs sm:text-sm text-neutral-400">
                © {currentYear}
              </span>
              <span className="w-1 h-1 bg-neutral-300 rounded-full hidden sm:block" />
              <span className="text-xs sm:text-sm text-neutral-500">
                All rights reserved
              </span>
            </div>

            {/* Center - Links */}
            <div className="flex items-center gap-1 order-1 sm:order-2">
              {footerLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    className="px-3 py-1.5 text-xs sm:text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span className="w-1 h-1 bg-neutral-200 rounded-full" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right - ClickMyze Credit */}
            <div className="flex items-center gap-2 order-3">
              <span className="text-xs sm:text-sm text-neutral-400">
                Design & Developed by
              </span>
              <a
                href="https://clickmyze.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-neutral-900/20"
              >
                <span>ClickMyze</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer