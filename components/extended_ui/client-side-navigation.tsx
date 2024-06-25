'use client';
import {usePathname} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Fragment} from "react";

/**
 * Backup for navigation breadcrumbs that uses usePathname instead.
 *
 * TODO: Verify that this logic works for subpages as well.
 */

export default function ClientSideBreadcrumbs({ basePath, baseName } : { basePath : string, baseName: string }) {
    const curPath = usePathname();

    const items = [
        {
            text: baseName,
            href: basePath,
        },
        ...curPath.split(basePath+"/").at(1)!.split("/").map(curSubpath => {

            return {
                text: curSubpath.at(0)!.toUpperCase() + curSubpath.substring(1),
                href: curPath.split(curSubpath).at(0) + curSubpath,
            }
        })
    ];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, i) => {

                    return (
                        <Fragment key={item.text}>
                            {
                                i === 0 ? null : (
                                    <BreadcrumbSeparator />
                                )
                            }

                            <BreadcrumbItem className={`text-xl ${(i === items.length-1) ? 'font-semibold' : ''}`}>
                                <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}