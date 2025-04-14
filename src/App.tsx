import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import LiveChat from './components/LiveChat';
import Cart from './components/Cart';
import { ChatProvider } from './utils/ChatContext';
import About from './pages/About';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <ChatProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities/:id" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <LiveChat />
        <Cart />
      </div>
    </ChatProvider>
  );
};

export default App; 