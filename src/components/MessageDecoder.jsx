import React, { useState } from 'react';
import { Lock, Eye, AlertCircle, CheckCircle, Copy } from 'lucide-react';
import { ImageUpload } from './ImageUpload.jsx';
import { SteganographyUtils } from '../utils/steganography.js';

export const MessageDecoder = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [processing, setProcessing] = useState({
    isProcessing: false,
    progress: 0,
    status: ''
  });
  const [result, setResult] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleImageUpload = (file) => {
    setSelectedImage(file);
    setResult(null);
    setShowMessage(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setResult(null);
    setShowMessage(false);
  };

  const handleDecode = async () => {
    if (!selectedImage) return;

    setProcessing({ isProcessing: true, progress: 0, status: 'Loading image...' });

    try {
      // Simulate progress updates
      const progressSteps = [
        { progress: 25, status: 'Analyzing image...' },
        { progress: 50, status: 'Extracting hidden data...' },
        { progress: 75, status: 'Decoding message...' },
        { progress: 90, status: 'Finalizing...' }
      ];

      for (const step of progressSteps) {
        setProcessing(prev => ({ ...prev, ...step }));
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      const decodingResult = await SteganographyUtils.decodeMessage(
        selectedImage,
        usePassword ? password : undefined
      );

      setProcessing(prev => ({ ...prev, progress: 100, status: 'Complete!' }));
      setResult(decodingResult);

      if (decodingResult.success) {
        setPassword('');
      }
    } catch (error) {
      setResult({ success: false, error: 'Decoding failed' });
    } finally {
      setTimeout(() => {
        setProcessing({ isProcessing: false, progress: 0, status: '' });
      }, 1000);
    }
  };

  const copyToClipboard = async () => {
    if (result?.message) {
      try {
        await navigator.clipboard.writeText(result.message);
        // Optionally, show a toast here
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const toggleMessageVisibility = () => {
    setShowMessage(!showMessage);
  };

  const canDecode = selectedImage && (!usePassword || password.trim());

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Extract Hidden Message</h1>
        <p className="text-lg text-gray-600">
          Reveal secret messages hidden within images
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ImageUpload
            title="Stego Image"
            subtitle="Select an image that contains a hidden message"
            onImageUpload={handleImageUpload}
            currentImage={selectedImage}
            onRemoveImage={handleRemoveImage}
          />
        </div>

        {/* Password Input */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Decode Settings</h3>
          <p className="text-sm text-gray-600 mb-6">Configure decoding options</p>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={usePassword}
                onChange={(e) => setUsePassword(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Message is password protected</span>
              </div>
            </label>

            {usePassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the password used to encode the message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={handleDecode}
          disabled={!canDecode || processing.isProcessing}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {processing.isProcessing ? 'Extracting...' : 'Extract Message'}
        </button>
      </div>

      {/* Progress Bar */}
      {processing.isProcessing && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">{processing.status}</span>
            <span className="text-sm text-gray-500">{processing.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${processing.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className={`rounded-xl shadow-lg p-6 ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center space-x-3 mb-4">
            {result.success ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-600" />
            )}
            <h3 className={`text-lg font-semibold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.success ? 'Message Extracted Successfully!' : 'Extraction Failed'}
            </h3>
          </div>
          
          {result.success && result.message ? (
            <div className="space-y-4">
              <p className="text-green-700">
                Hidden message found and extracted successfully.
              </p>
              
              <div className="bg-white rounded-lg border border-green-300 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Hidden Message:</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={toggleMessageVisibility}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>{showMessage ? 'Hide' : 'Show'}</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 hover:text-green-800 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
                  {showMessage ? (
                    <p className="text-gray-800 whitespace-pre-wrap break-words font-mono text-sm">
                      {result.message}
                    </p>
                  ) : (
                    <div className="flex items-center justify-center h-16">
                      <p className="text-gray-500 text-sm">Click "Show" to reveal the hidden message</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  Message length: {result.message.length} characters
                </div>
              </div>
            </div>
          ) : (
            <p className="text-red-700">{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
};
