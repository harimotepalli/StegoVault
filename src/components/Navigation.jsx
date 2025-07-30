import React from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';

export const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">StegoVault</h1>
              <p className="text-sm text-gray-500">Advanced Image Steganography Tool</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onTabChange('encode')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'encode'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <EyeOff className="h-4 w-4" />
              <span>Hide Message</span>
            </button>
            <button
              onClick={() => onTabChange('decode')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'decode'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Extract Message</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
