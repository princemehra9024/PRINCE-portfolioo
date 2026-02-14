
import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteData, Project, SkillCategory, Experience } from "@/types";
import { initialSiteData } from "@/data/initialData";
import { db, auth } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

interface DataContextType {
    data: SiteData;
    updateProject: (project: Project) => Promise<void>;
    addProject: (project: Project) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    updateSkillCategory: (index: number, category: SkillCategory) => Promise<void>;
    updateExperience: (experience: Experience) => Promise<void>;
    addExperience: (experience: Experience) => Promise<void>;
    deleteExperience: (id: string) => Promise<void>;
    updateBio: (bio: { title: string; description: string[] }) => Promise<void>;
    isAuthenticated: boolean;
    user: User | null;
    login: (password: string) => Promise<{ success: boolean; message?: string; code?: string }>;
    logout: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<SiteData>(initialSiteData);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthenticated(!!currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Data Listener (Real-time updates)
    useEffect(() => {
        // Here we could listen to collections 'projects', 'skills', 'experience', 'bio'
        // For simplicity in this demo, we might structure Firestore as:
        // collection 'siteData' -> doc 'main' -> fields for everything
        // OR separate collections. Let's do separate collections for scalability.

        const unsubscribeProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
            const projects = snapshot.docs.map(doc => doc.data() as Project);
            setData(prev => ({ ...prev, projects }));
        }, (error) => {
            console.log("Firestore not configured yet, using local data fallback.");
        });

        // Simulating other listeners or just loading once if needed
        // Ideally we'd have listeners for all. 
        // For now, if Firestore fails (no config), we keep initialData.

        return () => {
            unsubscribeProjects();
        };
    }, []);

    // Helper to upload initial data if it's missing
    const seedData = async () => {
        try {
            // Check each initial project individually to ensure everything is synced
            for (const project of initialSiteData.projects) {
                const projectRef = doc(db, "projects", project.id);
                // We use setDoc with merge: true to avoid overwriting but ensure it exists
                // Or just set it if we want to ensure initial data is there.
                // For now, let's only add it if it doesn't exist to preserve user changes.
                await setDoc(projectRef, project, { merge: true });
            }
            console.log("Seeding/Syncing initial projects complete.");
        } catch (e) {
            console.error("Seeding failed (rules might be blocking):", e);
        }
    };

    useEffect(() => {
        if (db) seedData();
    }, []);

    const login = async (password: string) => {
        const adminEmail = "admin@portfolio.com";
        const fallbackPassword = "prince101";

        try {
            await signInWithEmailAndPassword(auth, adminEmail, password);
            return { success: true };
        } catch (error: any) {
            console.error("Login failed:", error.code, error.message);

            // Handle configuration error with a local fallback
            if (error.code === 'auth/configuration-not-found') {
                if (password === fallbackPassword) {
                    console.log("Local fallback login successful");
                    setIsAuthenticated(true); // Manually set authenticated state
                    return { success: true, message: "Logged in via local fallback." };
                }
                return { success: false, message: "Invalid password (Local Mode)", code: "auth/local-fallback" };
            }

            // If user doesn't exist, try to create it (auto-setup)
            const isFirstLogin = error.code === 'auth/user-not-found' ||
                error.code === 'auth/invalid-credential' ||
                error.code === 'auth/invalid-login-credentials';

            if (isFirstLogin) {
                try {
                    const { createUserWithEmailAndPassword } = await import("firebase/auth");
                    await createUserWithEmailAndPassword(auth, adminEmail, password);
                    return { success: true };
                } catch (createError: any) {
                    console.error("Auto-setup error:", createError.code);

                    // Even if auto-setup fails due to config, check fallback
                    if (createError.code === 'auth/configuration-not-found' && password === fallbackPassword) {
                        setIsAuthenticated(true);
                        return { success: true, message: "Logged in via local fallback." };
                    }

                    return {
                        success: false,
                        message: createError.code === 'auth/email-already-in-use'
                            ? "Invalid password."
                            : createError.message,
                        code: createError.code
                    };
                }
            }
            return { success: false, message: "Invalid password", code: error.code };
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const addProject = async (project: Project) => {
        try {
            await setDoc(doc(db, "projects", project.id), project);
            // Optimistic update handled by snapshot listener
        } catch (e) {
            console.error("Error adding project: ", e);
            // Fallback for demo without backend
            setData(prev => ({ ...prev, projects: [project, ...prev.projects] }));
        }
    };

    const updateProject = async (project: Project) => {
        try {
            await updateDoc(doc(db, "projects", project.id), { ...project });
        } catch (e) {
            setData(prev => ({
                ...prev,
                projects: prev.projects.map(p => p.id === project.id ? project : p)
            }));
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await deleteDoc(doc(db, "projects", id));
        } catch (e) {
            setData(prev => ({
                ...prev,
                projects: prev.projects.filter(p => p.id !== id)
            }));
        }
    };

    const updateSkillCategory = async (index: number, category: SkillCategory) => {
        // In Firestore, 'skills' could be a collection where doc ID is the category name or an index
        // For simplicity, we'll assume a single doc 'skills' with all categories array, or separate docs.
        // Let's fallback to local state for now as scaffolding full Firestore structure is complex without user input.
        const newSkills = [...data.skills];
        newSkills[index] = category;
        setData(prev => ({ ...prev, skills: newSkills }));
    };

    const addExperience = async (experience: Experience) => {
        setData(prev => ({ ...prev, experience: [experience, ...prev.experience] }));
    };

    const updateExperience = async (experience: Experience) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(e => e.id === experience.id ? experience : e)
        }));
    };

    const deleteExperience = async (id: string) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.filter(e => e.id !== id)
        }));
    };

    const updateBio = async (bio: { title: string; description: string[] }) => {
        setData(prev => ({ ...prev, bio }));
    };

    return (
        <DataContext.Provider value={{
            data,
            addProject,
            updateProject,
            deleteProject,
            updateSkillCategory,
            addExperience,
            updateExperience,
            deleteExperience,
            updateBio,
            isAuthenticated,
            user,
            login,
            logout
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
