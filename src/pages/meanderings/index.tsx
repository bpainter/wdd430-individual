import { GetServerSideProps } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../lib/mongodb';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IMeandering } from '../../types/meandering';

type MeanderingsPageProps = {
  meanderings: IMeandering[];
};

export const getServerSideProps: GetServerSideProps<MeanderingsPageProps> = async (context) => {
  const db = await connectToDatabase();

  let meanderings: IMeandering[] = [];

  try {
    // Fetch all meandering items
    meanderings = await db.collection('meanderings').find().toArray() as IMeandering[];
    console.log(meanderings);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }

  return {
    props: {
      meanderings: JSON.parse(JSON.stringify(meanderings))
    },
  };
};

export const MeanderingsPage: React.FC<MeanderingsPageProps> = ({ meanderings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  type SortOption = 'postDate' | 'updateDate';
  const [sort, setSort] = useState<SortOption>('postDate');
  const [filter, setFilter] = useState('');
  const itemsPerPage = 5;

  const categories = Array.from(new Set(meanderings.flatMap((item) => item.category || [])));
  const categoryCounts = categories.map((category) => ({
    category,
    count: meanderings.filter((item) => item.category?.includes(category)).length,
  }));

  const sortedItems = [...meanderings].sort((a, b) => (a[sort as keyof IMeandering] > b[sort as keyof IMeandering] ? 1 : -1));
  const filteredItems = filter ? sortedItems.filter((item) => item.category?.includes(filter)) : sortedItems;
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  console.log('sorted items', sortedItems);
  console.log('filtered items', filteredItems);
  console.log('current items', currentItems);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  console.log('total pages', totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sort]);

  return (
    <>
      <Head>
        <title>Meanderings - Bermon Painter</title>
        <meta name="description" content="A collection of thoughts, ideas, and musings." />
      </Head>

      <h1 className="text-4xl font-bold p-4">Bermon&apos;s Meanderings</h1>
      <div className="w-full flex justify-between p-4 bg-gray-200">
        <select onChange={(e) => setSort(e.target.value as SortOption)}>
          <option value="postDate">Post Date</option>
          <option value="updateDate">Update Date</option>
        </select>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categoryCounts.map(({ category, count }) => (
            <option key={category} value={category}>
              {category} ({count})
            </option>
          ))}
        </select>
      </div>
      {currentItems.map((item) => (
        <div key={item._id} className="flex border-b-2 py-4 p-4 border-b-2 border-gray-300">
          {item.image && <Image src={item.image} alt={item.title} className="w-1/4 rounded-lg" width={54} height={36} />}
          <div className="ml-4">
            <Link href={`/meanderings/${item._id}`} className="text-lg font-bold">
              {item.title}
            </Link>
            <p>{new Date(item.postDate || item.updateDate).toLocaleDateString()}</p>
            <p>{item.body.length > 150 ? `${item.body.slice(0, 150)}...` : item.body}</p>
            <p>{item.category?.join(', ')}</p>
          </div>
        </div>
      ))}
      
      {filteredItems.length > itemsPerPage && (
        <div className="flex justify-between p-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default MeanderingsPage;