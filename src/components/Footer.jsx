import React from 'react';
import { Github, Shield, Lock, Eye } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">StegoVault</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Secure your messages with advanced LSB steganography. Hide and extract secret information 
              within images using state-of-the-art encryption techniques.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Features</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-blue-400" />
                <span>Password Protection</span>
              </li>
              <li className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-green-400" />
                <span>LSB Steganography</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>Secure Processing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="h-4 w-4 text-gray-400" />
                <span>Open Source</span>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Security Notice</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>
                All processing happens locally in your browser. No images or messages are sent to external servers.
              </p>
              <p>
                For maximum security, use PNG format images and strong passwords for sensitive information.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 StegoVault. Built with React, JavaScript, and advanced cryptography.
          </p>
        </div>
      </div>
    </footer>
  );
};
