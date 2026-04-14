import { useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

// Helper for error handling
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  alert(`Error: ${errInfo.error}`);
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs'>('projects');
  
  // Data state
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  // Form state
  const [projectForm, setProjectForm] = useState({ 
    title: '', description: '', image: '', tags: '', content: '',
    specLanguage: '', specFrontend: '', specDeployment: '', specDatabase: '',
    challenge1Title: '', challenge1Desc: '',
    challenge2Title: '', challenge2Desc: '',
    metric1Value: '', metric1Label: '',
    metric2Value: '', metric2Label: '',
    metric3Value: '', metric3Label: '',
    metric4Value: '', metric4Label: ''
  });
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', image: '', date: '', author: '' });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email === 'aditya.ambade2004@gmail.com') {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const projectsSnap = await getDocs(collection(db, 'projects'));
      setProjects(projectsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const blogsSnap = await getDocs(collection(db, 'blogs'));
      setBlogs(blogsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'projects/blogs');
    }
  };

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => signOut(auth);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = typeof projectForm.tags === 'string' ? projectForm.tags.split(',').map(t => t.trim()).filter(t => t) : projectForm.tags;
      
      const projectData = {
        title: projectForm.title,
        description: projectForm.description,
        image: projectForm.image,
        tags: tagsArray,
        content: projectForm.content,
        specLanguage: projectForm.specLanguage, specFrontend: projectForm.specFrontend, specDeployment: projectForm.specDeployment, specDatabase: projectForm.specDatabase,
        challenge1Title: projectForm.challenge1Title, challenge1Desc: projectForm.challenge1Desc,
        challenge2Title: projectForm.challenge2Title, challenge2Desc: projectForm.challenge2Desc,
        metric1Value: projectForm.metric1Value, metric1Label: projectForm.metric1Label,
        metric2Value: projectForm.metric2Value, metric2Label: projectForm.metric2Label,
        metric3Value: projectForm.metric3Value, metric3Label: projectForm.metric3Label,
        metric4Value: projectForm.metric4Value, metric4Label: projectForm.metric4Label,
        updatedAt: serverTimestamp()
      };

      if (editingProjectId) {
        await updateDoc(doc(db, 'projects', editingProjectId), projectData);
      } else {
        await addDoc(collection(db, 'projects'), { ...projectData, createdAt: serverTimestamp() });
      }

      setProjectForm({ 
        title: '', description: '', image: '', tags: '', content: '',
        specLanguage: '', specFrontend: '', specDeployment: '', specDatabase: '',
        challenge1Title: '', challenge1Desc: '', challenge2Title: '', challenge2Desc: '',
        metric1Value: '', metric1Label: '', metric2Value: '', metric2Label: '',
        metric3Value: '', metric3Label: '', metric4Value: '', metric4Label: ''
      });
      setEditingProjectId(null);
      fetchData();
    } catch (error) {
      handleFirestoreError(error, editingProjectId ? OperationType.UPDATE : OperationType.CREATE, 'projects');
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const blogData = {
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        image: blogForm.image,
        date: blogForm.date,
        author: blogForm.author,
        updatedAt: serverTimestamp()
      };

      if (editingBlogId) {
        await updateDoc(doc(db, 'blogs', editingBlogId), blogData);
      } else {
        await addDoc(collection(db, 'blogs'), { ...blogData, createdAt: serverTimestamp() });
      }

      setBlogForm({ title: '', excerpt: '', content: '', image: '', date: '', author: '' });
      setEditingBlogId(null);
      fetchData();
    } catch (error) {
      handleFirestoreError(error, editingBlogId ? OperationType.UPDATE : OperationType.CREATE, 'blogs');
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchData();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-8">
        <h1 className="font-headline text-4xl font-black text-white mb-8 uppercase">Admin_Access</h1>
        <button onClick={login} className="bg-primary-fixed text-black px-8 py-4 font-headline font-bold uppercase hover:bg-white transition-colors">
          Login with Google
        </button>
      </div>
    );
  }

  if (user.email !== 'aditya.ambade2004@gmail.com') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-8">
        <h1 className="font-headline text-4xl font-black text-error mb-4 uppercase">Access_Denied</h1>
        <p className="text-white mb-8">You are not authorized to view this page.</p>
        <button onClick={logout} className="border border-white/20 text-white px-8 py-4 font-headline font-bold uppercase hover:bg-white/10 transition-colors">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b-4 border-primary-fixed pb-8">
          <h1 className="font-headline text-6xl font-black text-white uppercase">CMS_Dashboard</h1>
          <button onClick={logout} className="text-secondary hover:text-white font-headline font-bold uppercase">Logout</button>
        </div>

        <div className="flex gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-headline font-bold uppercase ${activeTab === 'projects' ? 'bg-primary-fixed text-black' : 'bg-surface-container text-white'}`}
          >
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-3 font-headline font-bold uppercase ${activeTab === 'blogs' ? 'bg-primary-fixed text-black' : 'bg-surface-container text-white'}`}
          >
            Blogs
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-panel p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-2xl font-bold text-primary-fixed uppercase">
                  {editingProjectId ? 'Edit_Project' : 'Add_New_Project'}
                </h2>
                {editingProjectId && (
                  <button 
                    onClick={() => { 
                      setEditingProjectId(null); 
                      setProjectForm({ 
                        title: '', description: '', image: '', tags: '', content: '',
                        specLanguage: '', specFrontend: '', specDeployment: '', specDatabase: '',
                        challenge1Title: '', challenge1Desc: '', challenge2Title: '', challenge2Desc: '',
                        metric1Value: '', metric1Label: '', metric2Value: '', metric2Label: '',
                        metric3Value: '', metric3Label: '', metric4Value: '', metric4Label: ''
                      }); 
                    }}
                    className="text-white/50 hover:text-white uppercase font-bold text-xs"
                  >Cancel Edit</button>
                )}
              </div>
              <form onSubmit={handleAddProject} className="space-y-4">
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent" placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent" placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required />
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent" placeholder="Image URL" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} required />
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent" placeholder="Tags (comma separated)" value={projectForm.tags} onChange={e => setProjectForm({...projectForm, tags: e.target.value})} />
                <textarea className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent min-h-[150px]" placeholder="Content (Markdown/HTML)" value={projectForm.content} onChange={e => setProjectForm({...projectForm, content: e.target.value})}></textarea>
                
                <h3 className="font-headline text-lg font-bold text-primary-fixed uppercase mt-8 pt-4 border-t border-white/10">Tech Specs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Spec Language" value={projectForm.specLanguage} onChange={e => setProjectForm({...projectForm, specLanguage: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Spec Frontend" value={projectForm.specFrontend} onChange={e => setProjectForm({...projectForm, specFrontend: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Spec Deployment" value={projectForm.specDeployment} onChange={e => setProjectForm({...projectForm, specDeployment: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Spec Database" value={projectForm.specDatabase} onChange={e => setProjectForm({...projectForm, specDatabase: e.target.value})} />
                </div>

                <h3 className="font-headline text-lg font-bold text-primary-fixed uppercase mt-8 pt-4 border-t border-white/10">System Constraints</h3>
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Challenge 1 Title" value={projectForm.challenge1Title} onChange={e => setProjectForm({...projectForm, challenge1Title: e.target.value})} />
                <textarea className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent min-h-[100px] text-sm" placeholder="Challenge 1 Description" value={projectForm.challenge1Desc} onChange={e => setProjectForm({...projectForm, challenge1Desc: e.target.value})}></textarea>
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Challenge 2 Title" value={projectForm.challenge2Title} onChange={e => setProjectForm({...projectForm, challenge2Title: e.target.value})} />
                <textarea className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent min-h-[100px] text-sm" placeholder="Challenge 2 Description" value={projectForm.challenge2Desc} onChange={e => setProjectForm({...projectForm, challenge2Desc: e.target.value})}></textarea>

                <h3 className="font-headline text-lg font-bold text-primary-fixed uppercase mt-8 pt-4 border-t border-white/10">Impact Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Metric 1 Value (e.g. -84%)" value={projectForm.metric1Value} onChange={e => setProjectForm({...projectForm, metric1Value: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Metric 1 Label" value={projectForm.metric1Label} onChange={e => setProjectForm({...projectForm, metric1Label: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Metric 2 Value" value={projectForm.metric2Value} onChange={e => setProjectForm({...projectForm, metric2Value: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Metric 2 Label" value={projectForm.metric2Label} onChange={e => setProjectForm({...projectForm, metric2Label: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Metric 3 Value" value={projectForm.metric3Value} onChange={e => setProjectForm({...projectForm, metric3Value: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Metric 3 Label" value={projectForm.metric3Label} onChange={e => setProjectForm({...projectForm, metric3Label: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Metric 4 Value" value={projectForm.metric4Value} onChange={e => setProjectForm({...projectForm, metric4Value: e.target.value})} />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-primary-fixed border-b-2 border-transparent text-sm" placeholder="Metric 4 Label" value={projectForm.metric4Label} onChange={e => setProjectForm({...projectForm, metric4Label: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-primary-fixed text-black font-headline font-bold uppercase py-4 hover:bg-white transition-colors">
                  {editingProjectId ? 'Update_Project' : 'Save_Project'}
                </button>
              </form>
            </div>
            <div>
              <h2 className="font-headline text-2xl font-bold text-white mb-6 uppercase">Existing_Projects</h2>
              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p.id} className="bg-surface-container p-4 flex justify-between items-center">
                    <div>
                      <div className="font-headline font-bold text-white">{p.title}</div>
                      <div className="text-xs text-white/50">{p.id}</div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => {
                        setEditingProjectId(p.id);
                        setProjectForm({
                          title: p.title || '',
                          description: p.description || '',
                          image: p.image || '',
                          tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''),
                          content: p.content || '',
                          specLanguage: p.specLanguage || '',
                          specFrontend: p.specFrontend || '',
                          specDeployment: p.specDeployment || '',
                          specDatabase: p.specDatabase || '',
                          challenge1Title: p.challenge1Title || '', challenge1Desc: p.challenge1Desc || '',
                          challenge2Title: p.challenge2Title || '', challenge2Desc: p.challenge2Desc || '',
                          metric1Value: p.metric1Value || '', metric1Label: p.metric1Label || '',
                          metric2Value: p.metric2Value || '', metric2Label: p.metric2Label || '',
                          metric3Value: p.metric3Value || '', metric3Label: p.metric3Label || '',
                          metric4Value: p.metric4Value || '', metric4Label: p.metric4Label || ''
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} className="text-secondary hover:text-white">Edit</button>
                      <button onClick={() => handleDelete('projects', p.id)} className="text-error hover:text-white">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-panel p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-2xl font-bold text-secondary uppercase">
                  {editingBlogId ? 'Edit_Blog' : 'Add_New_Blog'}
                </h2>
                {editingBlogId && (
                  <button 
                    onClick={() => { setEditingBlogId(null); setBlogForm({ title: '', excerpt: '', content: '', image: '', date: '', author: '' }); }}
                    className="text-white/50 hover:text-white uppercase font-bold text-xs"
                  >Cancel Edit</button>
                )}
              </div>
              <form onSubmit={handleAddBlog} className="space-y-4">
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-secondary border-b-2 border-transparent" placeholder="Title" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} required />
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-secondary border-b-2 border-transparent" placeholder="Excerpt" value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} required />
                <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-secondary border-b-2 border-transparent" placeholder="Image URL" value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-secondary border-b-2 border-transparent" placeholder="Date (e.g. OCT 24)" value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})} required />
                  <input className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-secondary border-b-2 border-transparent" placeholder="Author" value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} required />
                </div>
                <textarea className="w-full bg-surface-container p-4 text-white font-body outline-none focus:border-secondary border-b-2 border-transparent min-h-[150px]" placeholder="Content (Markdown/HTML)" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} required></textarea>
                <button type="submit" className="w-full bg-secondary text-black font-headline font-bold uppercase py-4 hover:bg-white transition-colors">
                  {editingBlogId ? 'Update_Blog' : 'Save_Blog'}
                </button>
              </form>
            </div>
            <div>
              <h2 className="font-headline text-2xl font-bold text-white mb-6 uppercase">Existing_Blogs</h2>
              <div className="space-y-4">
                {blogs.map(b => (
                  <div key={b.id} className="bg-surface-container p-4 flex justify-between items-center">
                    <div>
                      <div className="font-headline font-bold text-white">{b.title}</div>
                      <div className="text-xs text-white/50">{b.date}</div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => {
                        setEditingBlogId(b.id);
                        setBlogForm({
                          title: b.title || '',
                          excerpt: b.excerpt || '',
                          content: b.content || '',
                          image: b.image || '',
                          date: b.date || '',
                          author: b.author || ''
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} className="text-primary-fixed hover:text-white">Edit</button>
                      <button onClick={() => handleDelete('blogs', b.id)} className="text-error hover:text-white">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
