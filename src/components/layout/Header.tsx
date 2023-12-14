import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white w-1/4">
      <div className="flex flex-col h-full items-end justify-end p-8">
        <div className="relative w-full">
          <Image
            src="https://media.discordapp.net/attachments/1056056212157894707/1184636671468261477/bermon.painter_an_illustrated_avatar_of_a_man_with_long_brown_c_42be8352-4e39-4538-a24a-b317ae662670.png?ex=658cb1df&is=657a3cdf&hm=c7794ac1bc2d7bf104ea12ce5ee1b3205f701b375b2f7e52b208ad324786e8a0&=&format=webp&quality=lossless&width=1088&height=1088"
            alt="Profile"
            className="rounded-full max-w-l h-auto mb-8"
            width={1088}
            height={1088}
          />
            <h3 className="font-bold text-lg text-center uppercase resize-x mb-1 leading-tight">Bermon Painter</h3>
            <p className="text-xs text-center uppercase mb-8">
            Designer
            <span className="text-red-500">. </span>
            Developer
            <span className="text-blue-500">. </span>
            Strategist
            <span className="text-green-500">.</span>
          </p>
        </div>
        <div className="flex w-full justify-center items-center space-x-4">
          <SocialIcon url="https://instagram.com" className="h-6 w-6 text-white" />
          <SocialIcon url="https://mastodon.social" className="h-6 w-6 text-white" />
          <SocialIcon url="https://github.com" className="h-6 w-6 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
