import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#37003c] text-white py-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand/Info */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Thanawit Kamkaew</h2>
            <p className="text-sm">สร้างสรรค์เนื้อหาเกี่ยวกับฟุตบอลและอื่น ๆ</p>
          </div>
          {/* Social Media Links */}
          <div className="flex gap-4">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="/"
              className="text-gray-400 hover:text-white transition"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="/"
              className="text-gray-400 hover:text-white transition"
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="border-t border-gray-500 mt-4 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Thanawit Kamkaew. สงวนลิขสิทธิ์.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
