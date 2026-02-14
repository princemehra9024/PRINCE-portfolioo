
import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, Save, LogOut, LayoutGrid, Award, User, Image as ImageIcon } from "lucide-react";

export default function Admin() {
    const { data, addProject, deleteProject, updateSkillCategory, updateBio, isAuthenticated, logout } = useData();
    const [activeTab, setActiveTab] = useState("projects");
    const [newProject, setNewProject] = useState({
        title: "",
        category: "",
        description: "",
        image: "https://images.unsplash.com/photo-1481487125483-37748370ad75?q=80&w=2066&auto=format&fit=crop", // Default stylish placeholder
        tech: ""
    });

    const handleAddProject = () => {
        if (!newProject.title) return;
        addProject({
            id: Date.now().toString(),
            ...newProject,
            tech: newProject.tech.split(",").map(t => t.trim())
        });
        setNewProject({
            title: "",
            category: "",
            description: "",
            image: "https://images.unsplash.com/photo-1481487125483-37748370ad75?q=80&w=2066&auto=format&fit=crop",
            tech: ""
        });
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="heading-md font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your content dynamically</p>
                    </div>
                    <Button variant="destructive" onClick={logout} className="gap-2 shadow-lg shadow-destructive/20">
                        <LogOut size={16} /> Logout
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
                    {/* Sidebar Nav */}
                    <Card className="glass h-fit p-6 border-white/5 hidden lg:block sticky top-24">
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-4 px-2">Core Content</p>
                                <nav className="space-y-1">
                                    <button
                                        onClick={() => setActiveTab("projects")}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === "projects" ? "bg-primary text-primary-foreground shadow-[0_10px_20px_rgba(255,140,0,0.2)]" : "text-muted-foreground hover:bg-white/5"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <LayoutGrid size={18} /> Projects
                                        </div>
                                        <ArrowRight size={14} className={`transition-transform duration-300 ${activeTab === "projects" ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("skills")}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === "skills" ? "bg-primary text-primary-foreground shadow-[0_10px_20px_rgba(255,140,0,0.2)]" : "text-muted-foreground hover:bg-white/5"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Award size={18} /> Skills
                                        </div>
                                        <ArrowRight size={14} className={`transition-transform duration-300 ${activeTab === "skills" ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("bio")}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === "bio" ? "bg-primary text-primary-foreground shadow-[0_10px_20px_rgba(255,140,0,0.2)]" : "text-muted-foreground hover:bg-white/5"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <User size={18} /> Bio
                                        </div>
                                        <ArrowRight size={14} className={`transition-transform duration-300 ${activeTab === "bio" ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                                    </button>
                                </nav>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <Card className="bg-primary/5 border-primary/20 p-4 rounded-2xl">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Editor Mode</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">Changes are synced in real-time with Firebase Firestore.</p>
                                </Card>
                            </div>
                        </div>
                    </Card>

                    {/* Mobile Tabs */}
                    <div className="lg:hidden mb-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-white/10 rounded-xl p-1">
                                <TabsTrigger value="projects" className="rounded-lg">Projects</TabsTrigger>
                                <TabsTrigger value="skills" className="rounded-lg">Skills</TabsTrigger>
                                <TabsTrigger value="bio" className="rounded-lg">Bio</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-10">
                        {activeTab === "projects" && (
                            <div className="space-y-12 animate-fade-in">
                                {/* Add Project Card */}
                                <Card className="glass border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                                    <div className="p-8 md:p-10 space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-2xl font-display font-black uppercase tracking-tight">Create <span className="text-primary">Masterpiece</span></h2>
                                                <p className="text-sm text-muted-foreground">Draft your next showcase item with precision.</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Plus className="text-primary" size={24} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-5">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">Project Name</label>
                                                    <Input
                                                        placeholder="Enter title..."
                                                        value={newProject.title}
                                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                                        className="h-12 bg-black/40 border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-lg"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">Category</label>
                                                    <Input
                                                        placeholder="e.g. Mobile, Web, Brand"
                                                        value={newProject.category}
                                                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                                        className="h-12 bg-black/40 border-white/10 rounded-xl focus:border-primary transition-all font-mono text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">Technologies</label>
                                                    <Input
                                                        placeholder="React, GSAP, Firebase..."
                                                        value={newProject.tech}
                                                        onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                                                        className="h-12 bg-black/40 border-white/10 rounded-xl focus:border-primary transition-all font-mono text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-5">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">Cover Image</label>
                                                    <div className="relative group cursor-pointer border-2 border-dashed border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors">
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={async (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (!file) return;
                                                                try {
                                                                    const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
                                                                    const { storage } = await import("@/lib/firebase");
                                                                    const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
                                                                    const snapshot = await uploadBytes(storageRef, file);
                                                                    const url = await getDownloadURL(snapshot.ref);
                                                                    setNewProject({ ...newProject, image: url });
                                                                } catch (error) {
                                                                    console.error("Upload failed", error);
                                                                    alert("Upload failed.");
                                                                }
                                                            }}
                                                            className="absolute inset-0 opacity-0 cursor-pointer z-10 h-full"
                                                        />
                                                        <div className="aspect-[16/9] flex flex-col items-center justify-center space-y-3 bg-black/40">
                                                            {newProject.image ? (
                                                                <img src={newProject.image} alt="Preview" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <>
                                                                    <ImageIcon className="text-muted-foreground" size={32} />
                                                                    <span className="text-xs text-muted-foreground font-mono">Click to upload or drag image</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Input
                                                    placeholder="...or paste external URL"
                                                    value={newProject.image}
                                                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                                    className="h-10 bg-black/20 border-white/5 rounded-lg text-xs"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">Impact Description</label>
                                            <Textarea
                                                placeholder="Describe the problem you solved..."
                                                value={newProject.description}
                                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                                className="min-h-[120px] bg-black/40 border-white/10 rounded-2xl focus:border-primary transition-all text-base leading-relaxed"
                                            />
                                        </div>

                                        <Button
                                            onClick={handleAddProject}
                                            className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_15px_30px_rgba(255,140,0,0.3)] hover:scale-[1.01] transition-all"
                                        >
                                            Publish to Showcase
                                        </Button>
                                    </div>
                                </Card>

                                {/* Project Management */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-xl font-display font-black uppercase tracking-tight">Active Showcase</h3>
                                        <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{data.projects.length} Items Live</span>
                                    </div>
                                    <div className="grid gap-4">
                                        {data.projects.map((project) => (
                                            <div key={project.id} className="glass border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/20 transition-all duration-500">
                                                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/5 bg-black/40">
                                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="font-display font-bold uppercase tracking-tight text-lg group-hover:text-primary transition-colors">{project.title}</h4>
                                                        <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-black uppercase tracking-tighter">{project.category}</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-1 italic font-light">"{project.description}"</p>
                                                    <div className="flex gap-2 pt-2">
                                                        {project.tech.slice(0, 4).map(t => (
                                                            <span key={t} className="text-[9px] font-mono uppercase bg-white/5 px-2 py-0.5 rounded opacity-40">{t}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)} className="h-12 w-12 rounded-xl text-destructive hover:bg-destructive/10 shrink-0 lg:opacity-0 group-hover:opacity-100 transition-all">
                                                        <Trash2 size={18} />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "skills" && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                                    {data.skills.map((category, index) => (
                                        <Card key={index} className="glass border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-700 h-full flex flex-col">
                                            <div className="p-8 space-y-6 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xl font-display font-black uppercase text-primary tracking-tight">{category.category}</h3>
                                                    <Award className="text-primary/40" size={20} />
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {category.items.map((item, i) => (
                                                        <div key={i} className="bg-white/5 border border-white/5 text-muted-foreground px-4 py-2 rounded-xl text-xs font-mono uppercase hover:bg-white/10 transition-colors">
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="p-8 pt-0 border-t border-white/5 bg-black/20">
                                                <Input
                                                    placeholder={`Add ${category.category} skill...`}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            const val = e.currentTarget.value.trim();
                                                            if (val) {
                                                                const newItems = [...category.items, val];
                                                                updateSkillCategory(index, { ...category, items: newItems });
                                                                e.currentTarget.value = "";
                                                            }
                                                        }
                                                    }}
                                                    className="h-10 bg-transparent border-dashed border-white/10 rounded-lg text-xs"
                                                />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "bio" && (
                            <div className="space-y-6 animate-fade-in">
                                <Card className="glass border-white/5 rounded-3xl overflow-hidden">
                                    <div className="p-8 md:p-10 space-y-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                                <User className="text-primary" size={32} />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-display font-black uppercase tracking-tight">Identity <span className="text-primary">Manifesto</span></h2>
                                                <p className="text-sm text-muted-foreground">Shape how the world perceives your digital persona.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.4em] font-black text-primary ml-1">Hero Title</label>
                                                <Input
                                                    value={data.bio.title}
                                                    onChange={(e) => updateBio({ ...data.bio, title: e.target.value })}
                                                    className="h-14 bg-black/40 border-white/10 rounded-2xl font-display text-xl uppercase tracking-tighter"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.4em] font-black text-primary ml-1">Story Narrative</label>
                                                <Textarea
                                                    value={data.bio.description.join("\n\n")}
                                                    onChange={(e) => updateBio({ ...data.bio, description: e.target.value.split("\n\n") })}
                                                    className="min-h-[350px] bg-black/40 border-white/10 rounded-3xl leading-relaxed text-base italic font-light p-6"
                                                />
                                                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest pl-2">Use double line breaks to start new paragraphs.</p>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => alert("Manifesto Updated.")}
                                            className="w-full h-14 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-xl"
                                        >
                                            <Save size={18} className="mr-3" /> Execute Updates
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
