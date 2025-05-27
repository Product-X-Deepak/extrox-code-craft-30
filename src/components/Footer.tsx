
import React from 'react';
import { Code, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-br from-black to-gray-900 relative">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Code className="w-4 h-4 text-black font-bold" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white">Extrox</span>
                <span className="text-emerald-400 font-bold">.dev</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm mb-6">
              The future of AI-powered development. Transform ideas into production-ready applications with unprecedented speed and precision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Product</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Press Kit</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Status Page</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; 2025 Extrox.dev. All rights reserved. Built with ❤️ for developers worldwide.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
