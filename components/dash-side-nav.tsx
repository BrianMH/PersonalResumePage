'use client';
/**
 * Side navigation buttons for the dashboard. Links are hardcoded for this implementation.
 */
import Link from "next/link";
import {usePathname} from "next/navigation";

const navLinks = [
    {name: "General", href: "/dashboard"},
    {name: "Resume", href: "/dashboard/resume"},
    {name: "Blog", href: "/dashboard/blog"}
]

export function DashSideNav() {
    const curPath = usePathname();

    return (
        <nav className="bg-card py-6 grid gap-4 text-muted-foreground">
            {navLinks.map(link => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`${((curPath === link.href) || (link.href !== "/dashboard" && curPath.startsWith(link.href))) ? 'font-semibold' : ''}`}
                    >
                        {link.name}
                    </Link>
                )
            })}
        </nav>
    )
}