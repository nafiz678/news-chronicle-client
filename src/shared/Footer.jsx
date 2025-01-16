import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Logo Section */}
          <div>
            <div className="flex items-center space-x-3">
              <div className='p-2 rounded-full bg-black'>
                <img className='w-6 h-6 rounded-full' src={logo} alt="logo" />
              </div>
              <span className="text-xl font-semibold text-white">News Chronicle</span>
            </div>
            <p className="mt-2 max-w-xs text-sm">
              Stay informed with reliable and comprehensive news faster than ever.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-12">
            {/* About */}
            <div>
              <h3 className="text-white font-medium mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Forums
                  </a>
                </li>
              </ul>
            </div>

            {/* Project */}
            <div>
              <h3 className="text-white font-medium mb-4">Project</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contribute
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Media assets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Releases
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-white font-medium mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Join Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Follow on Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Email newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    GitHub discussions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-wrap justify-between items-center">
          <p className="text-sm">
            © 2025 News Chronicle. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.56v14.91c0 .59-.23 1.16-.65 1.57a2.21 2.21 0 0 1-1.57.65H2.22a2.21 2.21 0 0 1-1.57-.65A2.21 2.21 0 0 1 0 19.47V4.56C0 3.97.23 3.4.65 2.98c.41-.42.98-.65 1.57-.65h19.56c.59 0 1.16.23 1.57.65.42.42.65.98.65 1.58z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.04C6.64 2.04 2.09 6.6 2.09 12S6.64 21.96 12 21.96 21.91 17.4 21.91 12 17.36 2.04 12 2.04zm0 19.22a8.38 8.38 0 1 1 0-16.76 8.38 8.38 0 0 1 0 16.76zm4.4-10.91h-2.53V8.66h-1.73v1.68H8.6v1.72h1.54v4.58h1.73v-4.57h2.53v4.57h1.73v-4.57H16.4v-1.72z" />
              </svg>
            </a>
            <a href="#" className="hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.67 0H4.33C1.94 0 0 1.94 0 4.33v15.33C0 22.06 1.94 24 4.33 24h15.33c2.39 0 4.34-1.94 4.34-4.33V4.33C24 1.94 22.06 0 19.67 0zM7.47 20.25h-3.5v-8.42h3.5v8.42zm-1.73-9.63c-1.11 0-2-.91-2-2 0-1.1.89-2 2-2s2 .89 2 2c0 1.1-.89 2-2 2zm14.17 9.63h-3.5v-4.42c0-1.05-.02-2.41-1.47-2.41s-1.7 1.15-1.7 2.33v4.5h-3.5v-8.42h3.35v1.15h.05c.47-.89 1.61-1.82 3.31-1.82 3.53 0 4.18 2.33 4.18 5.35v4.14z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;