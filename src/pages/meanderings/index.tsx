import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IMeandering } from '../../types/meandering';

type MeanderingsPageProps = {
  meanderings: IMeandering[];
};

export const MeanderingsPage: React.FC<MeanderingsPageProps> = ({ meanderings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('postDate');
  const [filter, setFilter] = useState('');
  const itemsPerPage = 5;

  const categories = Array.from(new Set(meanderings.flatMap((item) => item.category || [])));
  const categoryCounts = categories.map((category) => ({
    category,
    count: meanderings.filter((item) => item.category?.includes(category)).length,
  }));

  const sortedItems = [...meanderings].sort((a, b) => (a[sort as keyof IMeandering] > b[sort as keyof IMeandering] ? 1 : -1));
  const filteredItems = sortedItems.filter((item) => item.category?.includes(filter));
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sort]);

  return (
    <div>
      <div className="w-full flex justify-between p-4 bg-gray-200">
      <select onChange={(e) => setSort(e.target.value)}>
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
        <div key={item._id} className="flex border-b-2 py-4">
          {item.image && <Image src={item.image} alt={item.title} className="w-1/4 rounded-lg" />}
          <div className="ml-4">
            <Link href={`/meanderings/${item._id}`}>
              <a className="text-lg font-bold">{item.title}</a>
            </Link>
            <p>{(item.postDate || item.updateDate).toLocaleDateString()}</p>
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meandering`);
  const data = await res.json();

  return {
    props: {
      meanderings: data,
    },
    revalidate: 1, // In seconds
  };
};

export default MeanderingsPage;