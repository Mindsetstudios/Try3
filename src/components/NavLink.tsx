import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => (
  <a 
    href={href}
    className="text-gray-300 hover:text-white transition"
  >
    {children}
  </a>
);

export const MobileNavLink = ({ href, children }: NavLinkProps) => (
  <a 
    href={href}
    className="block px-3 py-2 text-gray-300 hover:text-white transition"
  >
    {children}
  </a>
);