// generateDummyData.ts
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import Boss from '../models/boss';
import { Meandering } from '../models/meandering';
import { Presentation } from '../models/presentation';
import { IPresentation } from '../types/presentation';
import { Speaking } from '../models/speaking';
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI as string;
const BOSS_USERNAME  = process.env.BOSS_USERNAME as string;
const BOSS_NAME     = process.env.BOSS_NAME as string;
const BOSS_SECRET    = process.env.BOSS_SECRET as string;
const BOSS_AVATAR    = process.env.BOSS_AVATAR as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const generateDummyData = async (numBosses: number, numMeanderings: number, numSpeakingEngagements: number, numPresentations: number): Promise<void> => {

  await mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error('MongoDB connection error:', err));

  for (let i = 0; i < numBosses; i++) {
    // Generate data for Boss collection
    const hashedPassword = await bcrypt.hash(BOSS_SECRET, 12);
    const boss = new Boss({
      username: BOSS_USERNAME,
      password: hashedPassword,
      name: BOSS_NAME,
      avatar: BOSS_AVATAR,
    });

    await boss.save();
    
    // Generate data for Meanderings collection
    for (let i = 0; i < numMeanderings; i++) {
      const meandering = new Meandering({
        author: boss._id,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(4),
        image: 'https://media.discordapp.net/attachments/.../bermon.painter_an_inspiring_image_for_a_blog_post_ultra_details_8570a93e-930b-4f2c-ad42-c0c20d44fcb9.png',
        status: 'published',
        postDate: new Date(),
      });

      await meandering.save();
    }

    for (let i = 0; i < numSpeakingEngagements; i++) {  
      const speaking = new Speaking({
        author: boss._id,
        title: faker.company.name(),
        date: faker.date.future(),
        websiteUrl: faker.internet.url(),
        videoUrl: 'https://player.vimeo.com/video/619459522?h=1f8cbe71fe',
        createdAt: new Date(),
      });
  
      await speaking.save();

      for (let i = 0; i < numPresentations; i++) {
        const presentation = new Presentation({
          author: boss._id,
          speaking: speaking._id,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          presentationUrl: 'https://speakerdeck.com/player/eed6990e2de6471798907346b99654e1',
          topics: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
          createdAt: new Date(),
        });
  
        await presentation.save();
      }
    }
  }

  await mongoose.disconnect();
};

generateDummyData(1, 5, 5, 1).catch(console.error);