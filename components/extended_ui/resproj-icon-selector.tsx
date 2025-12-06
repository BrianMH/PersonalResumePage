/**
 * Selector for the resume project default icon values. This should keep all the logic separate from the rest of the
 * program and allow me to modify only this page.
 */
import {BookOpenCheckIcon, GithubIcon, GlobeIcon, LinkedinIcon, LucideIcon} from "lucide-react";

const IconMap: {[key : string]: LucideIcon} = {
    "GITHUB_ICON": GithubIcon,
    "LINKEDIN_ICON": LinkedinIcon,
    "BOOK_ICON": BookOpenCheckIcon,
    "WEB_ICON": GlobeIcon,
}

export default function ResProjIconSelector({ iconString, className } : { iconString : string, className : string }) {
    const RelativeIcon = IconMap[iconString]

    return (
        <RelativeIcon className={className}/>
    )
}