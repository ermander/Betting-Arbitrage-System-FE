import React from 'react';
import Link from 'next/link';

const menu = [
  { label: 'Dashboards', active: true },
  { label: 'Analytics' },
  { label: 'CRM' },
  { label: 'Ecommerce' },
  { label: 'Crypto' },
  { label: 'Projects' },
  { label: 'NFT' },
  { label: 'Job' },
  { label: 'Blog', badge: 'New' },
  { label: 'Apps' },
  { label: 'Layouts', badge: 'Hot' },
];

const pages = [
  { label: 'Authentication' },
  { label: 'Pages' },
  { label: 'Landing' },
];

const components = [
  { label: 'Base UI' },
];

export default function SidebarMenu() {
  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col relative shadow-sm">
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-16 border-b">
        <span className="font-extrabold text-2xl tracking-wide text-gray-900">VELZON</span>
      </div>
      {/* User Profile Card */}
      <div className="flex items-center gap-3 px-5 py-4 mt-4 mb-2 bg-gray-50 rounded-lg mx-3 shadow-sm">
        <div className="w-11 h-11 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
          {/* Placeholder avatar */}
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base text-gray-900 truncate">Anna Adame</div>
          <div className="text-xs text-green-500 flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span> Online
          </div>
        </div>
      </div>
      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 mt-2">
        <div className="text-[11px] font-bold text-gray-400 px-4 mb-2 tracking-widest uppercase">Menu</div>
        <ul className="space-y-1">
          {menu.map((item) => (
            <li key={item.label}>
              <Link
                href="#"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-[15px] font-medium group ${
                  item.active
                    ? 'bg-[#f3f3f9] text-[#405189]' // active color
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {/* Placeholder icon */}
                <span className={`w-5 h-5 rounded flex items-center justify-center bg-gray-200 group-hover:bg-gray-300 ${item.active ? 'bg-[#e9ecef]' : ''}`}></span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${
                      item.badge === 'New'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-pink-100 text-pink-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-[11px] font-bold text-gray-400 px-4 mt-6 mb-2 tracking-widest uppercase">Pages</div>
        <ul className="space-y-1">
          {pages.map((item) => (
            <li key={item.label}>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-[15px] font-medium text-gray-700 hover:bg-gray-100"
              >
                <span className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center" />
                <span className="flex-1">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-[11px] font-bold text-gray-400 px-4 mt-6 mb-2 tracking-widest uppercase">Components</div>
        <ul className="space-y-1">
          {components.map((item) => (
            <li key={item.label}>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-[15px] font-medium text-gray-700 hover:bg-gray-100"
              >
                <span className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center" />
                <span className="flex-1">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Settings Button (bottom right) */}
      <button className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-[#405189] text-white flex items-center justify-center shadow-lg hover:bg-[#29304d] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.142-.854-.108-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.774-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.149-.894z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </aside>
  );
} 