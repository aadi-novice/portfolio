import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock data for projects and blogs (In a real app, this would be in a DB or file)
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store built with React and Node.js.",
      image: "https://picsum.photos/seed/shop/800/600",
      tags: ["React", "Node.js", "Tailwind"],
      link: "#"
    },
    {
      id: 2,
      title: "AI Chatbot",
      description: "An intelligent assistant powered by Gemini API.",
      image: "https://picsum.photos/seed/ai/800/600",
      tags: ["Gemini", "TypeScript", "Vite"],
      link: "#"
    }
  ];

  const blogs = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends in frontend and backend technologies.",
      date: "2024-03-20",
      image: "https://picsum.photos/seed/web/800/600"
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt: "Tips and tricks for building beautiful UIs faster.",
      date: "2024-03-15",
      image: "https://picsum.photos/seed/css/800/600"
    }
  ];

  app.get("/api/projects", (req, res) => {
    res.json(projects);
  });

  app.get("/api/blogs", (req, res) => {
    res.json(blogs);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
