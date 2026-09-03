function Footer() {
    return (
        <footer className= "bg-black text-white mt-16">
             <div className="max-w-[1320px] mx-auto px-4 py-14">
                <div className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    
                    {/* Store information */}
                <div>

                <h2 className ="text-2xl font-bold">
                    Shop<span className="text-gray-400">Ease</span>
                </h2>

                <p className= "text-gray-400 mt-4 leading-7">
                     A simple and modern shopping experience built with React.
                </p>
             </div>

             {/* Quick navigation */}
             <div>
                <h3 className="text-lg font-semibold mb-4">
                    Quick Links
                </h3>
                <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition-colors">
                Home
              </li>
              <li className="hover:text-white transition-colors">
                Products
              </li>
              <li className="hover:text-white transition-colors">
                Categories
              </li>
              <li className="hover:text-white transition-colors">
                Cart
              </li>
            </ul>
             </div>

             {/* Customer support */}

             <div className="text-lg font-semibold mb-4">
                Customer Support
            
             <ul className="space-y-3 text-gray-400">
                <li>Help Center</li>
                <li>Shipping Information</li>
                <li>Returns & Refunds</li>
                <li>Privacy Policy</li>
             </ul>
              </div>

              {/* Contact information */}

              <div >
                <h3 className="text-lg font-semibold mb-4">
                    Contact Us

                </h3>
              
              <ul className="space-y-3 text-gray-400">
                <li>Email: info@shopease.com</li>
                <li>Phone: +1 (123) 456-7890</li>
                <li>📍 Worldwide Online Store</li>
              </ul>
            </div>
            </div>

             {/* Copyright */}
             <div className="border-t border-gray-800 mt-12 pt-6 text-center">
                <p className="text-gray-500 text-sm">
                 © {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
            </div>
            </div>
          </footer>
        );
      }

      export default Footer;