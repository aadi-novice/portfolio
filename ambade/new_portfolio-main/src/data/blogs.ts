export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "The Future of Web Development in 2024",
    excerpt: "Exploring the latest trends in frontend and backend technologies, from AI integration to edge computing.",
    content: "Full content of the blog post goes here...",
    date: "March 20, 2024",
    image: "https://picsum.photos/seed/web/800/600",
    author: "Aditya Ambade"
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS for Modern UIs",
    excerpt: "Tips and tricks for building beautiful, responsive user interfaces faster than ever with utility-first CSS.",
    content: "Full content of the blog post goes here...",
    date: "March 15, 2024",
    image: "https://picsum.photos/seed/css/800/600",
    author: "Aditya Ambade"
  },
  {
    id: 3,
    title: "Why TypeScript is Essential for Large Scale Apps",
    excerpt: "How static typing can save you from countless bugs and improve your developer experience.",
    content: "Full content of the blog post goes here...",
    date: "March 10, 2024",
    image: "https://picsum.photos/seed/ts/800/600",
    author: "Aditya Ambade"
  }
];
