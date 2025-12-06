/**
 * A somewhat duplicate of the soft skills page, necessary so that the branching works properly. This should just render
 * based on the page template.
 */
import ResumeSkillPageEditor from "@/components/template/skill-adjustment-page";

export default function Page() {

    return (
        <ResumeSkillPageEditor skillType="technical"/>
    )
}