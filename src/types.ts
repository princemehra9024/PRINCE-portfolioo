
export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    gallery?: string[]; // Optional gallery of images
    tech: string[];
    url?: string;
    isFlagship?: boolean;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface Experience {
    id: string;
    year: string;
    role: string;
    company: string;
}

export interface SiteData {
    projects: Project[];
    skills: SkillCategory[];
    experience: Experience[];
    bio: {
        title: string;
        description: string[];
    };
}
