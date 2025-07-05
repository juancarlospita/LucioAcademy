import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="w-[95%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-[20px] lg:text-[22px] font-bold text-gray-900 dark:text-white">About ELearning</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed">
              Empowering learners worldwide with cutting-edge programming courses and expert-led tutorials.
            </p>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-[20px] lg:text-[22px] font-bold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-[20px] lg:text-[22px] font-bold text-gray-900 dark:text-white">Connect With Us</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  YouTube Channel
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.github.com/"
                  className="text-[14px] sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#39c1f3] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-[20px] lg:text-[22px] font-bold text-gray-900 dark:text-white">Contact Information</h3>
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#39c1f3] to-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] lg:text-base text-gray-600 dark:text-gray-400 break-words">
                    +91 9373642448
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#39c1f3] to-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] lg:text-base text-gray-600 dark:text-gray-400 break-words">
                    Building Name, Flat-1102, Warje, Pune, Maharashtra, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-[#39c1f3] to-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] lg:text-base text-gray-600 dark:text-gray-400 break-words">
                    begroup.project4@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section for Desktop */}
        <div className="hidden lg:block mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Stay Updated with Our Latest Courses
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Subscribe to our newsletter and never miss out on new courses and learning opportunities.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39c1f3] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#39c1f3] to-[#2563eb] text-white rounded-lg hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8 lg:mt-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-center lg:text-left text-[14px] lg:text-base text-gray-600 dark:text-gray-400">
              Copyright © 2023 ELearning | All Rights Reserved
            </p>
            <div className="flex items-center justify-center lg:justify-end gap-6">
              <Link href="/terms" className="text-[14px] lg:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-[14px] lg:text-base text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] dark:hover:text-[#39c1f3] transition-colors duration-300">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer