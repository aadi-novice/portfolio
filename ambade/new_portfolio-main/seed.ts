import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { projects } from './src/data/projects';
import { blogs } from './src/data/blogs';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function seed() {
  console.log('Seeding projects...');
  for (const p of projects) {
    await addDoc(collection(db, 'projects'), {
      title: p.title,
      description: p.description,
      image: p.image,
      tags: p.tags,
      content: p.content || '',
      createdAt: serverTimestamp()
    });
  }
  
  console.log('Seeding blogs...');
  for (const b of blogs) {
    await addDoc(collection(db, 'blogs'), {
      title: b.title,
      excerpt: b.excerpt,
      content: b.content || '',
      image: b.image,
      date: b.date,
      author: b.author,
      createdAt: serverTimestamp()
    });
  }
  console.log('Done seeding!');
  process.exit(0);
}

seed();
