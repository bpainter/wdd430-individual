// pages/speaking/index.tsx
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ISpeaking } from '../../types/speaking';
import { IPresentation } from '../../types/presentation';

type SpeakingPageProps = {
  speaking: (ISpeaking & { presentation: IPresentation })[];
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('/api/speaking');
  const speaking: ISpeaking[] = await res.json();

  // Fetch the presentation data for each speaking engagement
  const speakingWithPresentation = await Promise.all(
    speaking.map(async (speak) => {
      const res = await fetch(`/api/presentations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: speak.presentation }),
      });
      const presentation: IPresentation = await res.json();
      return { ...speak, presentation };
    })
  );

  return {
    props: {
      speaking: speakingWithPresentation,
    },
  };
};

const SpeakingPage: React.FC<SpeakingPageProps> = ({ speaking }) => {
  // Extract unique years from speaking array
  const years = Array.from(new Set(speaking.map(speak => new Date(speak.date).getFullYear())));

  // State for selected year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Filter speaking array based on selected year
  const filteredSpeaking = speaking.filter(speak => new Date(speak.date).getFullYear() === selectedYear);
  
  
  return (
    <div className="p-4">
      <Listbox value={selectedYear} onChange={setSelectedYear}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Year</Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="ml-3 block truncate">{selectedYear}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {years.map((year, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={year}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? 'font-medium' : 'font-normal'
                            } block truncate`}
                          >
                            {year}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? 'text-white' : 'text-indigo-600'
                              } absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      {filteredSpeaking
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((speak, index) => (
          <div key={index} className="mb-4">
            <Link 
              href={`/speaking/${speak._id}`}
              className="text-2xl font-bold"
            >
              {speak.title}
            </Link>
            <p className="mt-2">{new Date(speak.date).toLocaleDateString()}</p>
            <p className="mt-2">{speak.presentation.title}</p>
            {speak.presentation.topics?.map((topic, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{topic}</span>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SpeakingPage;