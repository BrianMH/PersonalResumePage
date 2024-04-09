'use server';
import {EducationEntry, GuageValue, ProjectBrief} from "@/lib/definitions";
import {DummyEducationEntries, DummyProjectBriefs, DummySoftSkillData, DummyTechnicalGuageData} from "@/lib/dummyData";

/**
 * This is where all the database retrievals will happen.
 */

export async function fetchTechnicalSkills() : Promise<GuageValue[]> {
    // first load our data via a fetch operation
    const skillData = Promise.resolve(DummyTechnicalGuageData);

    // and then return it
    return skillData;
}

export async function fetchSoftSkills() : Promise<GuageValue[]> {
    // first load in our data
    const skillData = Promise.resolve(DummySoftSkillData);

    // and then return it
    return skillData;
}

export async function fetchProjectBriefs() : Promise<ProjectBrief[]> {
    // first load in data
    const briefData = Promise.resolve(DummyProjectBriefs);

    // and return it
    return briefData;
}

export async function fetchEducationEntries() : Promise<EducationEntry[]> {
    // first load in data
    const eduData = Promise.resolve(DummyEducationEntries);

    // and return it
    return eduData;
}