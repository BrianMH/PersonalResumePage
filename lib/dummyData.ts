/**
 * Some dummy data to have information stored in lieu of a database. This will eventually get moved once a control panel
 * gets implemented on the site (after middleware access is used)
 */
import {EducationEntry, ExperienceEntry, GaugeValue, ProjectBrief} from "@/lib/definitions";

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

export const DummyProjectBriefs : ProjectBrief[] = [
    {
        id: "1",
        title: "Example #1",
        description:
            "An introduction to what this project (1) was about and its contents with a description that is slightly larger than" +
            "the other descriptions to check for characteristics of the overflow...",
        imageRef: null,
    },
    {
        id: "2",
        title: "Example #2",
        description:
            "An introduction to what this project (2) was about",
        imageRef: null,
    },
    {
        id: "3",
        title: "Example #3",
        description:
            "An introduction to what this project (3) was about",
        imageRef: null,
    },
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
                {id: "1", text: "Designed control scheme and software GUI interface for snake-like colonoscopy robot prototype using Python and MATLAB"},
                {id: "2", text: "Tripled robot sensor polling rate by improving on the ARM C-based implementation"},
                {id: "3", text: "Assisted in data collection of robot performance, wrote journal paper drafts, and presented on an MVP publicly"},
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
                {id: "1", text: "Increased student course enrollment by re-structuring the face recognition project to expand on" +
                        "theoretical underpinnings and modifying it to use up-to-date APIs"},
                {id: "2", text: "Mentored several student software development teams simultaneously and functioned as a domain expert and " +
                        "scrum leader, ensuring deadlines were met and goals were feasible"},
                {id: "3", text: "Created student resources & documentation for multiple in-development projects to slowly introduce to the course"},
                {id: "4", text: "Researched and implemented minimum viable products for prospective course project ideas in a team of four"},
            ],
            references: [
                {id: "1", type: "Website", description: "Course Site", href: "https://pib.ucsd.edu/"},
                {id: "2", type: "Project", description: "Project Page", href: "https://sites.google.com/view/ece-196/face-recognition"},
                {id: "3", type: "Github", description: "Course Github", href: "https://github.com/ProjectInABox"},
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
                {id: "1", text: "Engaged in one-on-ones with students during lab sections and office hours sections to futther knowledge of common" +
                        "circuit systems and their issues"},
                {id: "2", text: "Increased student course satisfaction by holding discussion sections that involved difficult-to-solve circuit systems" +
                        "and a more interactive environment"},
            ]
        }
    }
]