/**
 * Some dummy data to have information stored in lieu of a database. This will eventually get moved once a control panel
 * gets implemented on the site (after middleware access is used)
 */
import {
    BlogPost,
    EducationEntry,
    ExperienceEntry,
    GaugeValue, Project,
    ProjectEntry,
    TagElement
} from "@/lib/definitions";

export const DummyTechnicalGuageData : GaugeValue[] = [
    {id: "0", name: "Python", barVal: 90},
    {id: "1", name: "Java", barVal: 85},
    {id: "8", name: "Deep Learning", barVal: 85},
    {id: "9", name: "Data Analysis", barVal: 80},
    {id: "2", name: "Typescript", barVal: 80},
    {id: "3", name: "Next.JS", barVal: 70},
    {id: "4", name: "Spring Framework", barVal: 75},
    {id: "5", name: "REST API", barVal: 70},
    {id: "6", name: "HTML/CSS", barVal: 80},
    {id: "7", name: "AWS", barVal: 75}
]

export const DummySoftSkillData : GaugeValue[] = [
    {id: "0", name: "Project Management", barVal: 95},
    {id: "1", name: "Documentation", barVal: 85},
    {id: "2", name: "Communication", barVal: 95},
    {id: "3", name: "Leadership", barVal: 85},
    {id: "4", name: "Adaptability", barVal: 90}
]

export const DummyEducationEntries: EducationEntry[] = [
    {
        id: "3",
        degreeType: "Further Education",
        degreeFocus: "Full Stack Java Development",
        degreeLocation: "Per Scholas",
        degreeStart: "Dec '23",
        degreeEnd: "Mar '24",
        description: {
            topics: ["Java", "Spring Framework", "Web Development", "Typescript", "Next.JS", "React.JS",
                "REST", "Microservices", "HTML/CSS"]
        },
    },
    {
        id: "2",
        degreeType: "MS",
        degreeFocus: "Electrical Engineering (Machine Learning & Data Science)",
        degreeLocation: "University of California - San Diego (UCSD)",
        degreeStart: "Sep 18",
        degreeEnd: "Jun '20",
        description: {
            focus: "Machine Learning & Data Science",
            gpa: 3.34,
            topics: ["Data Analytics", "Deep Learning", "Generative Models", "Python", "Data Mining", "Hadoop",
                "Spark", "Linear Algebra" ,"Git"]
        },
    },
    {
        id: "1",
        degreeType: "BS",
        degreeFocus: "Electrical Engineering",
        degreeLocation: "University of California - San Diego (UCSD)",
        degreeStart: "Sep '14",
        degreeEnd: "Jun '18",
        description: {
            focus: "Machine Learning",
            gpa: 3.73,
            topics: ["ARM C++", "C++", "Rapid Prototyping", "Python", "Machine Learning", "Statistical Learning",
                "Data Structures", "Data Analysis", "Java", "Git", "Project Management", "Computer Vision"]
        },
    },
]

export const DummyExperienceEntries: ExperienceEntry[] = [
    {
        id: "1",
        jobTitle: "Student Research Intern",
        jobLocation: "University of California - San Diego",
        jobTimeStart: "Aug '18",
        jobTimeEnd: "Sep '18",
        jobType: "Research",
        description: {
            bullets: [
                "Designed control scheme and software GUI interface for snake-like colonoscopy robot prototype using Python and MATLAB",
                "Tripled robot sensor polling rate by improving on the ARM C-based implementation",
                "Assisted in data collection of robot performance, wrote journal paper drafts, and presented on an MVP publicly",
            ],
        },
    },
    {
        id: "2",
        jobTitle: "Makerspace Tutor",
        jobLocation: "University of California - San Diego",
        jobTimeStart: "Sep '17",
        jobTimeEnd: "Sep '19",
        jobType: "Contract",
        description: {
            bullets: [
                "Increased student course enrollment by re-structuring the face recognition project to expand on" +
                    "theoretical underpinnings and modifying it to use up-to-date APIs",
                "Mentored several student software development teams simultaneously and functioned as a domain expert and " +
                        "scrum leader, ensuring deadlines were met and goals were feasible",
                "Created student resources & documentation for multiple in-development projects to slowly introduce to the course",
                "Researched and implemented minimum viable products for prospective course project ideas in a team of four",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Course Site", href: "https://pib.ucsd.edu/"},
                {id: "2", icon: "BOOK_ICON", description: "Project Page", href: "https://sites.google.com/view/ece-196/face-recognition"},
                {id: "3", icon: "GITHUB_ICON", description: "Course Github", href: "https://github.com/ProjectInABox"},
            ]
        }
    },
    {
        id: "3",
        jobTitle: "Teaching Assistant",
        jobLocation: "University of California - San Diego",
        jobTimeStart: "Jul '19",
        jobTimeEnd: "Sep '19",
        jobType: "Contract",
        description: {
            bullets: [
                "Engaged in one-on-ones with students during lab sections and office hours sections to further knowledge of common" +
                        "circuit systems and their issues",
                "Increased student course satisfaction by holding discussion sections that involved difficult-to-solve circuit systems" +
                        "and a more interactive environment",
            ]
        }
    }
]

export const DummyProjectData : ProjectEntry[] = [
    {
        id: "1",
        name: "Example Storefront",
        description: "A full-stack app developed using Java Spring + Next.JS with basic NextAuth.JS integration.",
        imageRef: "",
        content: {

        }
    },
    {
        id: "2",
        name: "PIB Face Recognition Project",
        description: "An end-to-end data science project using TensorFlow, Flask, and AWS/Azure services.",
        imageRef: "",
        content: {

        }
    },
    {
        id: "3",
        name: "STM32F4 Micromouse HAL using ARM C++",
        description: "An embedded API created to encapsulate low-level hardware calls for a competition.",
        imageRef: "",
        content: {

        }
    }
]

/**
 * Project Data present in the Resume page is largely an overview of what was done in the project. There can be better
 * representations for it, but sticking with the typical general resume bullet format and then maybe adding a line
 * regarding the objective of the project may be more useful. Much like with the experience section, this can include
 * references.
 */
export const DummyResumeProjectData : Project[] = [
    {
        id: '1',
        title: "Example Project #1",
        shortDescription: "An implementation of X using A, B, and C technologies.",
        projectRole: "Software Developer",
        projectType: "Coursework",
        projectStart: "01-01-2001",
        projectEnd: "02-02-2002",
        content: {
            bullets: [
                "Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 Bullet #1 ",
                "Bullet #2",
                "Bullet #3",
                "Bullet #4",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Example #1", href: "/"},
                {id: "2", icon: "LINKEDIN_ICON", description: "Example #2", href: "/"},
            ],
        }
    },
    {
        id: '2',
        title: "Example Project #2",
        shortDescription: "An implementation of X using A, B, and C technologies.",
        projectRole: "PCB Designer",
        projectType: "Personal Project",
        projectStart: "01-01-2001",
        projectEnd: "02-02-2002",
        content: {
            bullets: [
                "Bullet #1",
                "Bullet #2",
                "Bullet #3",
                "Bullet #4",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Example #1", href: "/"},
                {id: "2", icon: "LINKEDIN_ICON", description: "Example #2", href: "/"},
            ],
        }
    },
    {
        id: '3',
        title: "Example Project #3",
        shortDescription: "An implementation of X using A, B, and C technologies.",
        projectRole: "PCB Designer",
        projectType: "Personal Project",
        projectStart: "01-01-2001",
        projectEnd: "02-02-2002",
        content: {
            bullets: [
                "Bullet #1",
                "Bullet #2",
                "Bullet #3",
                "Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 ",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Example #1", href: "/"},
                {id: "2", icon: "LINKEDIN_ICON", description: "Example #2", href: "/"},
            ],
        }
    },
    {
        id: '4',
        title: "Example Project #4",
        shortDescription: "An implementation of X using A, B, and C technologies.",
        projectRole: "PCB Designer",
        projectType: "Personal Project",
        projectStart: "01-01-2001",
        projectEnd: "02-02-2002",
        content: {
            bullets: [
                "Bullet #1",
                "Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2",
                "Bullet #3",
                "Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 ",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Example #1", href: "/"},
                {id: "2", icon: "LINKEDIN_ICON", description: "Example #2", href: "/"},
            ],
        }
    },
    {
        id: '5',
        title: "Example Project #5",
        shortDescription: "An implementation of X using A, B, and C technologies.",
        projectRole: "PCB Designer",
        projectType: "Personal Project",
        projectStart: "01-01-2001",
        projectEnd: "02-02-2002",
        content: {
            bullets: [
                "Bullet #1",
                "Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2",
                "Bullet #3",
                "Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 ",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Example #1", href: "/"},
                {id: "2", icon: "LINKEDIN_ICON", description: "Example #2", href: "/"},
            ],
        }
    },
    {
        id: '6',
        title: "Example Project #6",
        shortDescription: "An implementation of X using A, B, and C technologies.",
        projectRole: "PCB Designer",
        projectType: "Personal Project",
        projectStart: "01-01-2001",
        projectEnd: "02-02-2002",
        content: {
            bullets: [
                "Bullet #1",
                "Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2",
                "Bullet #3",
                "Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 ",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Example #1", href: "/"},
                {id: "2", icon: "LINKEDIN_ICON", description: "Example #2", href: "/"},
            ],
        }
    },
    {
        id: '7',
        title: "Example Project #7",
        shortDescription: "An implementation of X using A, B, and C technologies.",
        projectRole: "PCB Designer",
        projectType: "Personal Project",
        projectStart: "01-01-2001",
        projectEnd: "02-02-2002",
        content: {
            bullets: [
                "Bullet #1",
                "Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2",
                "Bullet #3",
                "Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 ",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Example #1", href: "/"},
                {id: "2", icon: "LINKEDIN_ICON", description: "Example #2", href: "/"},
            ],
        }
    },
    {
        id: '8',
        title: "Example Project #8",
        shortDescription: "An implementation of X using A, B, and C technologies.",
        projectRole: "PCB Designer",
        projectType: "Personal Project",
        projectStart: "01-01-2001",
        projectEnd: "02-02-2002",
        content: {
            bullets: [
                "Bullet #1",
                "Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2Bullet #2",
                "Bullet #3",
                "Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 Bullet #4 ",
            ],
            references: [
                {id: "1", icon: "WEB_ICON", description: "Example #1", href: "/"},
                {id: "2", icon: "LINKEDIN_ICON", description: "Example #2", href: "/"},
            ],
        }
    }
]

/**
 * Used as an example of what can be parsed by the editor in the new blog post page.
 */
export const NewPostExampleContent = `
    <section>
        <h3>Section 1-1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <h3>Section 1-2</h3>
        <p>Porta non pulvinar neque laoreet suspendisse interdum consectetur. Erat imperdiet sed euismod nisi porta lorem mollis aliquam. Id consectetur purus ut faucibus pulvinar. Tempor orci dapibus ultrices in iaculis. Vehicula ipsum a arcu cursus vitae congue mauris. Luctus accumsan tortor posuere ac ut consequat. Pellentesque elit eget gravida cum sociis natoque penatibus et. Faucibus vitae aliquet nec ullamcorper sit amet risus. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Cras fermentum odio eu feugiat pretium nibh. Nec sagittis aliquam malesuada bibendum arcu vitae elementum. Sem integer vitae justo eget magna fermentum iaculis eu. Urna duis convallis convallis tellus. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Volutpat ac tincidunt vitae semper quis. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Amet commodo nulla facilisi nullam. Orci a scelerisque purus semper eget duis at tellus.</p>
    </section>
    <section>
        <h3>Section 2-1</h3>
        <p>Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Nulla porttitor massa id neque. At volutpat diam ut venenatis tellus in. Sagittis orci a scelerisque purus semper eget. Urna nec tincidunt praesent semper feugiat nibh sed. Ultricies mi eget mauris pharetra et ultrices. Imperdiet sed euismod nisi porta lorem mollis. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. Non nisi est sit amet. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Lectus vestibulum mattis ullamcorper velit sed. Lacus sed turpis tincidunt id aliquet risus feugiat in. Fermentum iaculis eu non diam phasellus vestibulum lorem sed. Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper.</p>
    </section>
    <section>
        <h3>Section 3-1</h3>
        <p>Porttitor leo a diam sollicitudin tempor id eu nisl. Facilisis magna etiam tempor orci eu. Tincidunt eget nullam non nisi est sit amet. Tempus iaculis urna id volutpat lacus laoreet. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Tristique sollicitudin nibh sit amet commodo nulla. Felis eget velit aliquet sagittis id consectetur purus ut. Vulputate enim nulla aliquet porttitor. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Ac odio tempor orci dapibus. Justo laoreet sit amet cursus sit amet. Diam maecenas sed enim ut sem. Aliquet lectus proin nibh nisl. Et tortor at risus viverra. Leo duis ut diam quam nulla porttitor massa id neque. Nisl purus in mollis nunc sed. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor.</p>
    </section>
`