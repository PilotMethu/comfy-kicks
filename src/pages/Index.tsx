
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Menu } from 'lucide-react';

const FeaturedProduct = ({ image, name, price }: { image: string; name: string; price: number }) => (
  <motion.div 
    className="product-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative overflow-hidden">
      <img src={image} alt={name} className="product-image" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <h3 className="text-white font-medium">{name}</h3>
        <p className="text-white/90">${price}</p>
      </div>
    </div>
  </motion.div>
);

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: "Classic Runner",
      price: 129,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      id: 2,
      name: "Urban Street",
      price: 149,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"
    },
    {
      id: 3,
      name: "Sport Elite",
      price: 189,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 flex items-center justify-center lg:justify-start">
              <h1 className="text-xl font-semibold">TRENDY TREADS</h1>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">New Arrivals</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Men</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Women</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Sale</a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2">
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 z-40 bg-white transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        initial={false}
        animate={{ x: isMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            ×
          </button>
          <div className="space-y-4 mt-16">
            <a href="#" className="block text-lg py-2">New Arrivals</a>
            <a href="#" className="block text-lg py-2">Men</a>
            <a href="#" className="block text-lg py-2">Women</a>
            <a href="#" className="block text-lg py-2">Sale</a>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="hero-section mt-16">
        <motion.div 
          className="relative h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-2xl px-4">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Step into Style
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-white/90 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Discover our new collection of premium footwear
              </motion.p>
              <motion.button 
                className="btn-primary"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Featured Collection</h2>
          <p className="text-gray-600">Discover our most popular styles</p>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <FeaturedProduct
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for exclusive offers and updates</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">About Us</h4>
              <p className="text-gray-600">Trendy Treads offers premium footwear for the modern fashion enthusiast.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Shipping Information</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Men's Collection</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Women's Collection</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-gray-600">
            <p>&copy; 2024 Trendy Treads. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
