import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { MessageEncoder } from './components/MessageEncoder';
import { MessageDecoder } from './components/MessageDecoder';
import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'encode' | 'decode'>('encode');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        {activeTab === 'encode' ? <MessageEncoder /> : <MessageDecoder />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;