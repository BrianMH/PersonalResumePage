/**
 * A card to represent a given project. Has no direct interactivity, but it can be wrapped within a Link in order
 * to allow manipulation.
 */
import {fetchSingleProjectById} from "@/lib/data";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {convertNumericalDateToMM_YY} from "@/lib/helper";

export default async function DashResumeProjCard({ projId } : { projId : string }) {
    // first get the actual contents of the project
    const relProj = await fetchSingleProjectById(projId);

    if(relProj == undefined)
        return null;

    // adjust the dates to proper rendering format
    relProj.projectStart = await convertNumericalDateToMM_YY(relProj.projectStart);
    relProj.projectEnd = await convertNumericalDateToMM_YY(relProj.projectEnd);

    return (
        <Card className="max-w-96 hover:bg-gray-100">
            <CardHeader>
                <CardTitle className="text-lg">{relProj.title}</CardTitle>
                <CardDescription>{relProj.projectRole}</CardDescription>
                <CardDescription>{relProj.projectStart} - {relProj.projectEnd}</CardDescription>
            </CardHeader>
            <CardContent>
                {relProj.shortDescription}
            </CardContent>
        </Card>
    )
}