"use client"
import React from "react"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-16 pb-10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Logo + Description */}
          <div className="md:col-span-2 space-y-6">
            
            <div className="flex items-center gap-3">
              <div className="bg-black text-white w-10 h-10 flex items-center justify-center font-bold text-lg">
                S
              </div>
              <h2 className="text-2xl font-semibold">perfumely hub</h2>
            </div>

            <p className="leading-relaxed text-gray-600 max-w-md">
              Your one-stop destination for the latest technology,
              fashion, and lifestyle products. Quality guaranteed
              with fast shipping and excellent customer service.
            </p>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>123 Shop Street, October City, DC 12345</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>(+20) 01093333333</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@shopmart.com</span>
              </div>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-semibold text-lg mb-4">SHOP</h3>
            <ul className="space-y-3">
              <li className="hover:text-black cursor-pointer">Electronics</li>
              <li className="hover:text-black cursor-pointer">Fashion</li>
              <li className="hover:text-black cursor-pointer">Home & Garden</li>
              <li className="hover:text-black cursor-pointer">Sports</li>
              <li className="hover:text-black cursor-pointer">Deals</li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="font-semibold text-lg mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-3">
              <li className="hover:text-black cursor-pointer">Contact Us</li>
              <li className="hover:text-black cursor-pointer">Help Center</li>
              <li className="hover:text-black cursor-pointer">Track Your Order</li>
              <li className="hover:text-black cursor-pointer">Returns & Exchanges</li>
              <li className="hover:text-black cursor-pointer">Size Guide</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-semibold text-lg mb-4">ABOUT</h3>
            <ul className="space-y-3">
              <li className="hover:text-black cursor-pointer">About Shopmart</li>
              <li className="hover:text-black cursor-pointer">Careers</li>
              <li className="hover:text-black cursor-pointer">Press</li>
              <li className="hover:text-black cursor-pointer">Investor Relations</li>
              <li className="hover:text-black cursor-pointer">Sustainability</li>
            </ul>
          </div>

          {/* POLICIES */}
          <div>
            <h3 className="font-semibold text-lg mb-4">POLICIES</h3>
            <ul className="space-y-3">
              <li className="hover:text-black cursor-pointer">Privacy Policy</li>
              <li className="hover:text-black cursor-pointer">Terms of Service</li>
              <li className="hover:text-black cursor-pointer">Cookie Policy</li>
              <li className="hover:text-black cursor-pointer">Shipping Policy</li>
              <li className="hover:text-black cursor-pointer">Refund Policy</li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopMart. All rights reserved.
        </div>

      </div>
    </footer>
  )
}