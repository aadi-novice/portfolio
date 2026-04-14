export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured online store built with React and Node.js. Includes cart functionality, payment integration, and user authentication.",
    image: "https://i.postimg.cc/28dbXJ6m/Gemini-Generated-Image-yvnq8syvnq8syvnq.png",
    tags: ["React", "Node.js", "Tailwind", "Stripe"],
    link: "#"
  },
  {
    id: 2,
    title: "AI Chatbot Assistant",
    description: "An intelligent assistant powered by Gemini API that can answer questions, summarize text, and generate code snippets.",
    image: "https://picsum.photos/seed/ai/800/600",
    tags: ["Gemini", "TypeScript", "Vite", "Motion"],
    link: "#"
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "A comprehensive analytics dashboard for tracking social media performance across multiple platforms.",
    image: "https://picsum.photos/seed/dashboard/800/600",
    tags: ["D3.js", "React", "Recharts"],
    link: "#"
  }
];
