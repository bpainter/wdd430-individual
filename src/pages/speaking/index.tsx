// pages/speaking/index.tsx
// import { GetStaticProps } from 'next';
import { GetServerSideProps } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../lib/mongodb';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ISpeaking } from '../../types/speaking';
import { IPresentation } from '../../types/presentation';
import { Speaking } from '../../models/speaking'; 
import { Presentation } from '../../models/presentation';

type SpeakingPageProps = {
  speaking: (ISpeaking & { presentation: IPresentation })[];
  speakings: ISpeaking[];
  presentations: IPresentation[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const db = await connectToDatabase();

  let speakings: ISpeaking[] = [];
  let presentations: IPresentation[] = [];

  try {
    // Fetch all speaking items
    speakings = await db.collection('speakings').find().toArray() as ISpeaking[];

    // Fetch all presentations
    presentations = await db.collection('presentations').find().toArray() as IPresentation[];
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }

  return {
    props: {
      speakings: JSON.parse(JSON.stringify(speakings)),
      presentations: JSON.parse(JSON.stringify(presentations))
    },
  };
};


const SpeakingPage: React.FC<SpeakingPageProps> = ({ speakings, presentations }) => {
  // Extract unique years from speakings array and add 'All' option
  const years = ['All', ...Array.from(new Set(speakings.map(speak => new Date(speak.date).getFullYear())))];

  // State for selected year
  const [selectedYear, setSelectedYear] = useState('All');

  // Filter speakings array based on selected year
  const filteredSpeakings = selectedYear === 'All' ? speakings : speakings.filter(speak => new Date(speak.date).getFullYear() === Number(selectedYear));
  
  return (
    <>
      <Head>
        <title>Speaking Engagements - Bermon Painter</title>
        <meta name="description" content="Bermon's Speaking Engagements" />
      </Head>

      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4">Speaking Engagements</h1>
        <Listbox value={selectedYear} onChange={setSelectedYear}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Filter Speaking Engagements</Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 mb-8">
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

        {filteredSpeakings
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((speak, index) => {
            // Find the related presentations
            const relatedPresentations = presentations.filter(pres => pres.speaking.toString() === speak._id.toString());

            return (
                <div key={index} className="mb-4 pt-4 pb-4 border-b-2 border-gray-300">
                <h2 className="text-3xl font-bold">
                  <Link href={`/speaking/${speak._id}`}>
                    {speak.title}
                  </Link>
                </h2>
                
                <p className="mt-2">{new Date(speak.date).toLocaleDateString()}</p>

                {relatedPresentations.map((presentation, presIndex) => (
                  <div key={presIndex}>
                    <p className="mt-2 mb-6">{presentation.title}</p>
                    {presentation.topics?.map((topic, topicIndex) => (
                      <span key={topicIndex} className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 ">{topic}</span>
                    ))}
                  </div>
                ))}
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default SpeakingPage;