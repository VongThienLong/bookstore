import React, { useState } from 'react';
import { useCart } from './shared/CartContext';
import { Link, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  ShoppingCartIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { cartItemsCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Trang chủ', icon: HomeIcon, path: '/' },
    { name: 'Tất cả sách', icon: BookOpenIcon, path: '/store' },
    {
      name: 'Giỏ hàng',
      icon: ShoppingCartIcon,
      path: '/cart',
      badge: cartItemsCount > 0 ? cartItemsCount : null,
    },
  ];

  return (
    <div className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BS</span>
              </div>
              <span className="font-semibold hidden sm:block">Books Store</span>
            </Link>
          </div>

          {/* Desktop & Tablet section */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
              >
                <div className="relative">
                  <item.icon className="h-5 w-5" />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative w-8">
                  <item.icon className="h-5 w-5" />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="ml-3">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
