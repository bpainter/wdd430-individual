// office-hours.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { CalendarIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import moment from 'moment';

declare let Calendly: any;

export default function OfficeHours() {
  type Slot = {
    start_time: string;
    end_time: string;
  };
  
  const [availability, setAvailability] = useState<Slot[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    head?.appendChild(script);
  }, []);

  useEffect(() => {
    axios.get('https://api.calendly.com/v2/users/me/event_types', {
      headers: {
        'Authorization': `Bearer ${process.env.CALENDLY_SECRET}`
      }
    }).then(response => {
      setAvailability(response.data.collection[0].availability);
    });
  }, []);

  const openModal = (time: string) => {
    setSelectedTime(time);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-semibold">Office Hours</h1>
        <a href="https://calendly.com/bermon-painter/office-hours" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded">
          <CalendarIcon className="h-5 w-5" />
          <span>View Office Hours on Calendly.com</span>
        </a>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {availability.map((slot, index) => (
            <tr key={index}>
              <td>{moment(slot.start_time).format('MMMM Do YYYY')}</td>
              <td>{moment(slot.start_time).format('h:mm a')} - {moment(slot.end_time).format('h:mm a')}</td>
              <td><button onClick={() => openModal(slot.start_time)}>Book</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Transition appear show={modalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Dialog 
              as="div" 
              onClose={closeModal}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Book Office Hours
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  You have selected {moment(selectedTime).format('MMMM Do YYYY, h:mm a')}. Click the button below to confirm your booking.
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Confirm
                </button>
              </div>
            </Dialog>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}