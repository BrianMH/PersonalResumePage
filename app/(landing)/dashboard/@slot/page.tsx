/**
 * Breadcrumb slot
 */
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Fragment} from "react";

export default function Page() {
    const items = [
        {
            text: 'Dashboard',
            href: '/dashboard',
        },
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

                            <BreadcrumbItem className="text-xl font-semibold">
                                <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}