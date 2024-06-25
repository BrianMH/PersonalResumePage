/**
 * Resume config page. Allows the manipulation of typical resume elements such as the main elements (so the front-page
 * values), skills, education, experience, and projects.
 */
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function ResumeConfigurationPage() {
    return (
        <div className="pt-3 grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                    <CardDescription>
                        Modify technical skills shown on the resume page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Open</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Soft Skills</CardTitle>
                    <CardDescription>
                        Modify soft skills shown on the resume page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Open</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>
                        Modify education entries present on the resume page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Open</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Experience</CardTitle>
                    <CardDescription>
                        Modify experience entries present on the resume page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Open</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>
                        Modify project entries present on the resume page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Link
                        href={"/dashboard/resume/projects"}
                    >
                        <Button>Open</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}