'use client';

import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Link2Icon, UploadIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useState, useRef, RefObject} from "react";
import {useToast} from "@/components/ui/use-toast";
import {BlogStatus} from "@/lib/clientDatabaseOps";

/**
 * Provides the ability to adjust the header for the new post.
 */
export default function PostHeaderForm({ blogState, titleRef, imageRef, defaultImagePath, initialTitle } :
        { blogState : BlogStatus; titleRef : RefObject<HTMLInputElement>;
            imageRef :  RefObject<HTMLImageElement>; defaultImagePath : string, initialTitle? : string }) {
    // use to manipulate inputs
    const [imageSrc, setImageSrc] = useState(defaultImagePath);
    const inputUrlRef = useRef<HTMLInputElement>(null);

    // reports toasts to users
    const { toast } = useToast();

    return (
        <div className="flex flex-col align-middle justify-center pt-10 p-4">
            {
                initialTitle ? (
                    <h1 className="text-3xl w-[100%] text-center font-bold">
                        Modifying Post
                    </h1>
                ) : (
                    <h1 className="text-3xl w-[100%] text-center font-bold">
                        Create New Blog Post
                    </h1>
                )
            }

            <Separator className="my-10 bg-black h-1 rounded-full"/>

            <p className="text-sm font-light">Posted: TBD</p>

            {/*We want an image along with an overlay to be able to adjust the actual image being shown*/}
            <div className="relative">
                <img
                    src={imageSrc}
                    ref={imageRef}
                    alt="Header of the current post"
                    width={0}
                    height={0}
                    sizes='100vw'
                    className="rounded-lg"
                    style={{width: '100%', height: '100%'}}
                    onError={() => {
                        // and report the faulty link via toast
                        toast({
                            variant: "destructive",
                            title: "Invalid Image URL",
                            description: "Given URL was inaccessible or not valid.",
                        })

                        // default back to original image
                        setImageSrc(defaultImagePath);
                    }}
                />
                <div
                    className="absolute left-0 top-0 rounded-t-lg text-white w-[100%] flex flex-row-reverse align-middle p-3 gap-x-3 opacity-50 transition-colors hover:opacity-100 hover:bg-gray-900/50">
                    <Dialog>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DialogTrigger>
                                        <Link2Icon className="hover:text-gray-400"/>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Change Image Source</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    Enter Header Image URL
                                </DialogTitle>
                                <DialogDescription>
                                    Make sure image is accessible without any authentication or authorization and submit
                                    when ready.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="newImageUrl" className="text-right">
                                        Image URL
                                    </Label>
                                    <Input
                                        id="newImageUrl"
                                        ref={inputUrlRef}
                                        defaultValue=""
                                        placeholder="Enter a valid URL"
                                        className="col-span-3"
                                        type="url"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        type="submit"
                                        onClick={() => {
                                            // swap image if URL is present
                                            if (inputUrlRef.current?.value) {
                                                inputUrlRef.current.defaultValue = inputUrlRef.current.value;
                                                setImageSrc(inputUrlRef.current.value);
                                            }
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DialogTrigger>
                                        <UploadIcon className="hover:text-gray-400"/>
                                    </DialogTrigger>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Upload New Image
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    Upload an Image
                                </DialogTitle>
                                <DialogDescription>
                                    Upload an image for the header. The ideal image should have a 2:1 ratio and be
                                    larger
                                    than 600x300 to display properly on the page.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                Image upload here...
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex flex-row justify-center align-middle" id="imageUrlError" aria-live="polite"
                     aria-atomic="true">
                    {blogState.errors?.headerUrl && blogState.errors.headerUrl.map((error: string) => (
                        <p className="text-sm text-red-500 pt-1" key={error}>{error}</p>
                    ))}
                </div>
            </div>

            {/*We allow users to modify this directly to adjust the title*/}
            <Input
                ref={titleRef}
                className="font-semibold text-3xl text-center mt-6 border-none"
                aria-placeholder="Post Title"
                placeholder="Enter A Post Title"
                defaultValue={initialTitle}
                contentEditable={true}
            />
            <div className="flex flex-row justify-center align-middle" id="titleError" aria-live="polite" aria-atomic="true">
                {blogState.errors?.title && blogState.errors.title.map((error: string) => (
                    <p className="text-sm text-red-500 pt-1" key={error}>{error}</p>
                ))}
            </div>
        </div>
    )
}