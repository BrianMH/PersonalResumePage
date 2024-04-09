/**
 * Some dummy data to have information stored in lieu of a database. This will eventually get moved once a control panel
 * gets implemented on the site (after middleware access is used)
 */
import {EducationEntry, GuageValue, ProjectBrief} from "@/lib/definitions";

export const DummyTechnicalGuageData : GuageValue[] = [
    {id: "0", name: "Python", barVal: 90},
    {id: "1", name: "Java", barVal: 85},
    {id: "2", name: "Typescript", barVal: 80},
    {id: "3", name: "Next.JS", barVal: 70},
    {id: "4", name: "Spring Framework", barVal: 75},
    {id: "5", name: "REST API", barVal: 70},
    {id: "6", name: "HTML/CSS", barVal: 80},
    {id: "7", name: "AWS", barVal: 75}
]

export const DummySoftSkillData : GuageValue[] = [
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