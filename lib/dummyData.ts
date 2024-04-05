/**
 * Some dummy data to have information stored in lieu of a database. This will eventually get moved once a control panel
 * gets implemented on the site (after middleware access is used)
 */
import {GuageValue} from "@/lib/definitions";

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