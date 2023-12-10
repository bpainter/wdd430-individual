// pages/speaking/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { ObjectId } from 'mongodb';
import { ISpeaking } from '../../types/speaking';
import { IPresentation } from '../../types/presentation';

type SpeakingPageProps = {
  speaking: ISpeaking & { presentation: IPresentation };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('/api/speaking');
  const speaking: ISpeaking[] = await res.json();

  const paths = speaking.map((speak) => ({
    params: { id: speak._id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || Array.isArray(params.id)) {
    return { notFound: true };
  }

  const res = await fetch('/api/speaking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: new ObjectId(params.id) }),
  });

  const speaking: ISpeaking = await res.json();

  const presRes = await fetch('/api/presentations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: new ObjectId(speaking.presentation) }),
  });
  const presentation: IPresentation = await presRes.json();

  return {
    props: {
      speaking: { ...speaking, presentation },
    },
  };
};

const SpeakingPage: React.FC<SpeakingPageProps> = ({ speaking }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{speaking.title}</h1>
      <p className="text-gray-500">{new Date(speaking.date).toLocaleDateString()}</p>
      <div className="flex flex-wrap">
        {speaking.presentation.topics?.map((topic, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{topic}</span>
        ))}
      </div>
      <a href={speaking.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Website</a>
      <p className="text-gray-700">{speaking.presentation.description}</p>

      {/* Vimeo / Youtube Embed */}
      {speaking.videoUrl && (
        <div className="relative aspect-w-16 aspect-h-9">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={speaking.videoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* SpeakerDeck Embed */}
      {speaking.presentation.presentationUrl && (
        <div className="relative aspect-w-16 aspect-h-9">
          <iframe
            className="speakerdeck-iframe absolute top-0 left-0 w-full h-full bg-gray-200 rounded-lg shadow-md"
            src={speaking.presentation.presentationUrl}
            title="Presentation"
            allowFullScreen
            data-ratio="1.7777777777777777"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SpeakingPage;