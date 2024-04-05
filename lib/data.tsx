'use server';
import {GuageValue} from "@/lib/definitions";
import {DummySoftSkillData, DummyTechnicalGuageData} from "@/lib/dummyData";

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