import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HomeIcon, InboxIcon, ChatBubbleLeftIcon, UsersIcon, CalendarIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Meanderings', href: '/meanderings', icon: InboxIcon },
  { name: 'Speaking', href: '/speaking', icon: ChatBubbleLeftIcon },
  { name: 'Office Hours', href: '/office-hours', icon: CalendarIcon },
  { name: 'Contact', href: '/contact', icon: EnvelopeIcon },
];

const Navigation: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className="flex flex-col w-1/5 items-stretch justify-end bg-indigo-600 p-4">  
      <div className="space-y-1">
        {navigation.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex items-center space-x-3 py-2 px-3 rounded-md ${pathname === item.href ? 'bg-white text-gray-900' : 'hover:bg-indigo-700 hover:text-white focus:bg-indigo-700 focus:text-white'}`}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
