import React, { useState, useEffect } from 'react';
import { Lock, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { ImageUpload } from './ImageUpload.jsx';
import SteganographyUtils from '../types/steganography.js';

export const MessageEncoder = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [processing, setProcessing] = useState({
    isProcessing: false,
    progress: 0,
    status: ''
  });
  const [result, setResult] = useState(null);
  const [imageCapacity, setImageCapacity] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      SteganographyUtils.getImageCapacity(selectedImage).then(setImageCapacity);
    }
  }, [selectedImage]);

  const handleImageUpload = (file) => {
    setSelectedImage(file);
    setResult(null);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageCapacity(null);
    setResult(null);
  };

  const handleEncode = async () => {
    if (!selectedImage || !message.trim()) return;

    setProcessing({ isProcessing: true, progress: 0, status: 'Preparing image...' });

    try {
      // Simulate progress updates
      const progressSteps = [
        { progress: 25, status: 'Converting image...' },
        { progress: 50, status: 'Encoding message...' },
        { progress: 75, status: 'Applying steganography...' },
        { progress: 90, status: 'Finalizing...' }
      ];

      for (const step of progressSteps) {
        setProcessing(prev => ({ ...prev, ...step }));
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      const encodingResult = await SteganographyUtils.encodeMessage(
        selectedImage,
        message,
        usePassword ? password : undefined
      );

      setProcessing(prev => ({ ...prev, progress: 100, status: 'Complete!' }));
      setResult(encodingResult);

      if (encodingResult.success) {
        setMessage('');
        setPassword('');
      }
    } catch (error) {
      setResult({ success: false, error: 'Encoding failed' });
    } finally {
      setTimeout(() => {
        setProcessing({ isProcessing: false, progress: 0, status: '' });
      }, 1000);
    }
  };

  const handleDownload = () => {
    if (result?.imageUrl) {
      const link = document.createElement('a');
      link.href = result.imageUrl;
      link.download = `encoded_${selectedImage?.name || 'image.png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const canEncode = selectedImage && message.trim() && (!usePassword || password.trim());
  const messageLength = new Blob([message]).size;
  const isMessageTooLong = imageCapacity !== null && messageLength > imageCapacity;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Hide Secret Message</h1>
        <p className="text-lg text-gray-600">
          Embed your secret message into an image using advanced steganography
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ImageUpload
            title="Cover Image"
            subtitle="Select an image to hide your message in"
            onImageUpload={handleImageUpload}
            currentImage={selectedImage}
            onRemoveImage={handleRemoveImage}
          />

          {imageCapacity && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Maximum message capacity:</span> {imageCapacity} characters
              </p>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Secret Message</h3>
          <p className="text-sm text-gray-600 mb-4">Enter the text you want to hide</p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your secret message here..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />

          <div className="flex justify-between items-center mt-3">
            <span className={`text-sm ${isMessageTooLong ? 'text-red-600' : 'text-gray-500'}`}>
              {messageLength} / {imageCapacity || '?'} characters
            </span>
            {isMessageTooLong && (
              <div className="flex items-center text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">Message too long</span>
              </div>
            )}
          </div>

          {/* Password Protection */}
          <div className="mt-6 space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={usePassword}
                onChange={(e) => setUsePassword(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Password protect message</span>
              </div>
            </label>

            {usePassword && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={handleEncode}
          disabled={!canEncode || processing.isProcessing || isMessageTooLong}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {processing.isProcessing ? 'Encoding...' : 'Hide Message'}
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
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
              {result.success ? 'Message Hidden Successfully!' : 'Encoding Failed'}
            </h3>
          </div>

          {result.success ? (
            <div className="space-y-4">
              <p className="text-green-700">
                Your secret message has been successfully hidden in the image. Download the encoded image below.
              </p>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download Encoded Image</span>
              </button>
            </div>
          ) : (
            <p className="text-red-700">{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
};
