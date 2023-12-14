import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';

const Header: React.FC = () => {
  return (
    <header className="flex h-screen bg-gray-900 text-white">
      <div className="flex flex-col w-3/10 items-end justify-end p-4">
        <Image src="/profile.jpg" alt="Profile" width={200} height={200} className="rounded-full" />
        <div className="flex space-x-4">
          <SocialIcon url="https://instagram.com" className="h-6 w-6 text-white" />
          <SocialIcon url="https://mastodon.social" className="h-6 w-6 text-white" />
          <SocialIcon url="https://github.com" className="h-6 w-6 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
