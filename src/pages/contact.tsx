// contact.tsx
import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    await axios.post('/api/contact', formData);
  
    setIsSubmitting(false);
    setHasSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      {hasSubmitted ? (
        <div>Thank you for your message. We will get back to you soon.</div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} required className="block rounded-md w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 sm:leading-6" />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="mt-2">
              <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} required className="block rounded-md w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 sm:leading-6" />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
            <div className="mt-2">
              <textarea id="message" name="message" onChange={handleChange} value={formData.message} required className="block rounded-md w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 sm:leading-6" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 col-span-full">
            <button type="button" onClick={handleClear} className="text-sm font-semibold leading-6 text-gray-900">Clear</button>
            <button type="submit" disabled={isSubmitting} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}