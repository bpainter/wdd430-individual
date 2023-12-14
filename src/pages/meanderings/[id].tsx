// pages/meanderings/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../lib/mongodb';
import { IMeandering } from '../../types/meandering';

// export const getStaticPaths: GetStaticPaths = async () => {
//   const db = await connectToDatabase();
//   const collection = db.collection('meanderings');
//   const meanderings = await collection.find({}).toArray();
//   const paths = meanderings.map((meandering) => ({
//     params: { id: meandering._id.toString() },
//   }));

//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const db = await connectToDatabase();
//   const collection = db.collection('meanderings');
//   const meandering = await collection.findOne({ _id: new ObjectId(params?.id as string) });

//   return {
//     props: {
//       meandering: JSON.parse(JSON.stringify(meandering)),
//     },
//   };
// };

type MeanderingPageProps = {
  meandering: IMeandering;
};

const MeanderingPage: React.FC<MeanderingPageProps> = ({  }) => {
  return (
    <>
      <h1>Meandering Detail</h1>
    </>
    // <div className="p-4">
    //   <h1 className="text-4xl font-bold mb-4">{meandering.title}</h1>
    //   <div className="flex justify-between mb-4">
    //     <p>Posted on: {new Date(meandering.postDate).toLocaleDateString()}</p>
    //     {meandering.updateDate && <p>Last updated: {new Date(meandering.updateDate).toLocaleDateString()}</p>}
    //     <p>Written by: Author Name</p> {/* Replace with actual author name */}
    //     <div>
    //       {meandering.category?.map((cat, index) => (
    //         <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{cat}</span>
    //       ))}
    //     </div>
    //   </div>
    //   <p>{meandering.body}</p>
    // </div>
  );
};

export default MeanderingPage;