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

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold">Contact Us</h1>
      {hasSubmitted ? (
        <div>Thank you for your message. We will get back to you soon.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" onChange={handleChange} required />

          <button type="submit" disabled={isSubmitting}>Submit</button>
        </form>
      )}
    </div>
  );
}