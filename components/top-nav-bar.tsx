"use client";

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle, NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {ProjectBrief, Role} from "@/lib/definitions";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {performLogOut} from "@/lib/helper";

export default function NavigationMenuDemo({ loginLink, userImage, username, userRole, userLogged, projBriefs }
                                               : { loginLink: string, userImage?: string, username: string, userRole: Role, userLogged: boolean, projBriefs : ProjectBrief[] } ) {
    return (
        <div className="flex flex-row justify-between">
            <NavigationMenu className="min-w-fit">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About Me
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px]">
                                {projBriefs.map((component) => (
                                    <ListItem
                                        key={component.name}
                                        title={component.name}
                                        href={`/project/${component.id}`}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href="/blog" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Blog
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuViewport />
                </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu className="min-w-fit flex-grow-0">
                <NavigationMenuList>
                    <NavigationMenuItem className={userLogged ? "hidden" : ""}>
                        <Link href={loginLink} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Login
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem className={userLogged ? "" : "hidden"}>
                        <NavigationMenuTrigger>
                            <div className="flex flex-row">
                                <p className="hidden md:flex flex-col align-middle justify-center pr-2">
                                    {username}
                                </p>
                                <Avatar>
                                    <AvatarImage src={userImage}/>
                                    <AvatarFallback>BH</AvatarFallback>
                                </Avatar>
                            </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="flex flex-col w-[150px]">
                                <ListItem>
                                    <form action={performLogOut}>
                                        <button className="p-4 h-full w-full">Sign Out</button>
                                    </form>
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuViewport className="right-sided"/>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"