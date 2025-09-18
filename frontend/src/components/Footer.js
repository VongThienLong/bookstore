import React from 'react';
import { ChevronRight } from 'lucide-react';
import { FaLocationDot, FaThreads } from 'react-icons/fa6';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FaPhoneAlt, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiZalo } from 'react-icons/si';
import logoImage from '../assets/footer/LogoVie4Books.png';

const Footer = () => {
  return (
    <footer>
      <div className="w-full md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto px-4 pt-20 mb-12">
        {/* Main content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 border-t pt-8 md:gap-8">
          {/* Logo and Brand Section */}
          <div className="flex flex-col items-start">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4">
              <img src={logoImage} alt="Logo" className="object-contain" />
            </div>
            <h3 className="font-bold text-xl">Vie4Books</h3>
            <p className="text-sm text-gray-600">Sách Việt - Thương hiệu Việt</p>
          </div>

          {/* Menu Section */}
          <div>
            <h3 className="font-bold mb-4">Danh mục</h3>
            <ul className="space-y-2">
              {['Trang chủ', 'Danh mục sách', 'Tài khoản', 'Hỗ trợ'].map((item) => (
                <li key={item}>
                  <a href="/#" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-bold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              {[
                'Hướng dẫn mua hàng',
                'Chính sách đổi trả',
                'Chính sách khách sỉ',
                'Chính sách bảo mật',
              ].map((item) => (
                <li key={item}>
                  <a href="/#" className="text-gray-600 hover:text-blue-600 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="xl:col-auto">
            <h3 className="font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.bookstore.vn"
                  className="text-gray-600 hover:text-blue-600 flex items-center"
                >
                  <AiOutlineGlobal className="w-4 h-4 mr-2" />
                  www.bookstore.vn
                </a>
              </li>
              <li>
                <a
                  href="mailto:bookstore@gmail.com"
                  className="text-gray-600 hover:text-blue-600 flex items-center"
                >
                  <MdEmail className="w-4 h-4 mr-2" />
                  bookstore@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+84123456789"
                  className="text-gray-600 hover:text-blue-600 flex items-center"
                >
                  <FaPhoneAlt className="w-4 h-4 mr-2" />
                  (+84) 123 456 789
                </a>
              </li>
              <li>
                <span className="text-gray-600 flex items-center">
                  <FaLocationDot className="w-4 h-4 mr-2" />
                  TP. Hồ Chí Minh, Việt Nam
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter and Social Media Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-8">
          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-4">Đăng ký nhận khuyến mãi</h3>
            <div className="relative">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
              />
              <button className="absolute right-0 top-0 h-full px-6 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
                Gửi
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4">Mạng xã hội</h3>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/yourpage"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4267B2] to-[#4267B2] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <FaFacebook size={20} style={{ color: '#ffffff' }} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/yourprofile"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <FaInstagram size={20} style={{ color: '#ffffff' }} />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@yourprofile"
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <FaTiktok
                  size={22}
                  className="text-white"
                  style={{
                    filter: 'drop-shadow(1px 1px 0 #25F4EE) drop-shadow(-1px -1px 0 #FE2C55)',
                  }}
                />
              </a>

              {/* Threads */}
              <a
                href="https://www.threads.net/@yourprofile"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#010101] to-[#010101] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <FaThreads size={20} style={{ color: '#ffffff' }} />
              </a>

              {/* Zalo */}
              <a
                href="https://zalo.me/yourid"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0088FF] to-[#0088FF] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <SiZalo size={20} style={{ color: '#ffffff' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>© Copyright 2024 BOOKSTORE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
