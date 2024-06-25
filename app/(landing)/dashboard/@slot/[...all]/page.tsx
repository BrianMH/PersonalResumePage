/**
 * Sets up breadcrumbs for any inner page
 *
 * TODO: Upon updating to Next.js v15, change this to properly allow parallel routes to glob params properly. Currently
 *       it seems to be ignored due to the forced mirror path structure required by parallel routes
 *       [LINK: https://github.com/vercel/next.js/issues/43704 ]
 */
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Fragment} from "react";
import ClientSideBreadcrumbs from "@/components/extended_ui/client-side-navigation";

export default function Page({ params }: { params: { all: string[]; }; }) {
    // const items = [
    //     {
    //         text: 'Dashboard',
    //         href: '/dashboard',
    //     },
    //     ...params.all.map((param) => ({
    //         text: param,
    //         href: `/dashboard/${param}`,
    //     })),
    // ];

    return (
        // <Breadcrumb>
        //     <BreadcrumbList>
        //         {items.map((item, i) => {
        //
        //             return (
        //                 <Fragment key={item.text}>
        //                     {
        //                         i === 0 ? null : (
        //                             <BreadcrumbSeparator />
        //                         )
        //                     }
        //
        //                     <BreadcrumbItem>
        //                         <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
        //                     </BreadcrumbItem>
        //                 </Fragment>
        //             )
        //         })}
        //     </BreadcrumbList>
        // </Breadcrumb>
        <ClientSideBreadcrumbs basePath={"/dashboard"} baseName={"Dashboard"} />
    )
}