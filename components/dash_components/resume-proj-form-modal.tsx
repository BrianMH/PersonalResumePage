'use client';
/**
 * Opens up a dialog to allow the user to either manipulate a given resume project or post a new one.
 */
import {Project, ReferenceEntry} from "@/lib/definitions";
import {ReactNode, useRef, useState} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {TextArea} from "@/components/extended_ui/text-area-input";
import {
    ArrowRightIcon,
    BookOpenCheckIcon,
    ChevronDown, EditIcon,
    GithubIcon,
    GlobeIcon,
    LinkedinIcon,
    Plus,
    PlusCircleIcon,
    XIcon
} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import ResProjIconSelector from "@/components/extended_ui/resproj-icon-selector";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {KeyboardEvent} from "react";
import {ResumeProjectStatus, submitResumeProject} from "@/lib/clientDatabaseOps";
import {PopoverClose} from "@radix-ui/react-popover";

export default function ResumeProjectUpdateForm({ project, triggerElem } : { project? : Project, triggerElem : ReactNode }) {
    // state of bullets
    const [currentBullets, setBullets] = useState<string[]>(project ? project.content.bullets : []);

    // state of references
    const [currentRefs, setRefs] = useState<ReferenceEntry[]>(project ? project.content.references : []);

    // and then our holder for the reference addition mechanism along with the necessary functor
    const refLinkInputRef = useRef<HTMLInputElement>(null);
    const [currentIconState, setIconState] = useState<string>("WEB_ICON");
    const refLinkAdder = function (event: KeyboardEvent<HTMLInputElement> | string) {
        if(!event)
            return

        if((typeof event === "string" && event === "Enter") || (typeof event !== "string" && event.key === "Enter" && refLinkInputRef.current?.value && !currentRefs.some((curRef) => curRef.href === refLinkInputRef.current!.value))) {
            if(typeof event !== "string")
                event.preventDefault();

            setRefs(currentRefs.concat([{
                id: null,
                icon: currentIconState,
                description: refLinkInputRef.current!.value,
                href: refLinkInputRef.current!.value,
            }]));
            refLinkInputRef.current!.value = "";
        }
    }
    const refLinkRemover = function (linkToRemove : string) {
        setRefs(currentRefs.filter((curRef) => curRef.href !== linkToRemove));
    }

    // this is used by the popover in order to change the values present within the reference array
    const refReferenceDescriptionInput = useRef<HTMLInputElement>(null);
    const refReferenceLinkInput = useRef<HTMLInputElement>(null);
    const refLinkAdjuster = function (idToAdjust : number) {
        // first manipulate our entry
        let toAdjust = currentRefs.at(idToAdjust)!;
        toAdjust.description = refReferenceDescriptionInput.current!.value;
        toAdjust.href = refReferenceLinkInput.current!.value;

        // and then set it into place
        setRefs(currentRefs.slice(0, idToAdjust).concat([toAdjust], currentRefs.slice(idToAdjust+1)));
    }

    // likewise controlling our bullet points requires its own reference
    const hiddenInputRef = useRef<HTMLLIElement>(null);
    const hiddenInputButtonRef = useRef<HTMLLIElement>(null);
    const bulletNewInputRef = useRef<HTMLInputElement>(null);

    const bulletPointKeyHandler = function (event: KeyboardEvent<HTMLInputElement>) {
        if(event.key === "Enter" && bulletNewInputRef.current?.value) {
            event.preventDefault() // prevent submission

            // add our new bullet point
            setBullets(currentBullets.concat([bulletNewInputRef.current!.value]));

            // and then hide our input element
            bulletNewInputRef.current!.value = "";
            hiddenInputButtonRef.current!.hidden = false;
            hiddenInputRef.current!.hidden = true;
        }
    }

    // And now we can create the functor used for the form submission
    const initialState : ResumeProjectStatus = {message: null}
    const [formState, setFormState] = useState(initialState);
    async function editFormDispatch(formData: FormData) {
        // first build our form data component
        if(project)
            formData.append("id", project.id);
        formData.append("references", JSON.stringify(currentRefs));
        formData.append("bullets", JSON.stringify(currentBullets));

        // and we can pass this to our server function that handles the main part of the submission
        const responseStatus = await submitResumeProject(formData);

        // and we can display errors if necessary
        if(responseStatus.errors) {
            setFormState(responseStatus);
        } else {
            setOpen(false);
        }
    }

    // form control element (we want to decorate close to forget old states so we can do that as well)
    const [open, setOpen] = useState<boolean>(false);
    const setOpenDecorated = function(newState: boolean) {
        if(open && !newState) {
            setFormState(initialState);
        }

        setOpen(newState);
    }

    return (
        <Dialog open={open} onOpenChange={setOpenDecorated}>
            <DialogTrigger asChild>
                {triggerElem}
            </DialogTrigger>
            <DialogContent className="max-w-[80%]">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                    <DialogDescription>
                        Make changes to the project entries below. Click save to save the values.
                    </DialogDescription>
                    <DialogDescription className="flex flex-row w-full align-middle justify-center h-[1.5em] text-destructive">
                        {formState.message}
                    </DialogDescription>
                </DialogHeader>
                {/*TODO: Make this more responsive for smaller screen sizes using dialog component.*/}
                <form
                    action={editFormDispatch}
                >
                    <div className="grid grid-cols-4 gap-8 py-4">
                        <div className="col-span-2 grid h-fit gap-0.5">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                    {
                                        formState.errors?.title && (
                                            <div className="text-destructive text-xs font-light">
                                                {formState.errors.title}
                                            </div>
                                        )
                                    }
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={project ? project.title : ""}
                                    className={`col-span-3 ${formState.errors?.title ? "border-destructive focus-visible:border-0 focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                    {
                                        formState.errors?.shortDescription && (
                                            <div className="text-destructive text-xs font-light">
                                                {formState.errors.shortDescription}
                                            </div>
                                        )
                                    }
                                </Label>
                                <TextArea
                                    id="description"
                                    name="description"
                                    defaultValue={project ? project.shortDescription : ""}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                    Role
                                    {
                                        formState.errors?.projectRole && (
                                            <div className="text-destructive text-xs font-light">
                                                {formState.errors.projectRole}
                                            </div>
                                        )
                                    }
                                </Label>
                                <Input
                                    id="role"
                                    name="role"
                                    defaultValue={project ? project.projectRole : ""}
                                    className={`col-span-3 ${formState.errors?.projectRole ? "border-destructive focus-visible:border-0 focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    Type
                                    {
                                        formState.errors?.projectType && (
                                            <div className="text-destructive text-xs font-light">
                                                {formState.errors.projectType}
                                            </div>
                                        )
                                    }
                                </Label>
                                <Input
                                    id="type"
                                    name="type"
                                    defaultValue={project ? project.projectType : ""}
                                    className={`col-span-3 ${formState.errors?.projectType ? "border-destructive focus-visible:border-0 focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="start" className="text-right">
                                    Date Start
                                    {
                                        formState.errors?.projectStart && (
                                            <div className="text-destructive text-xs font-light">
                                                {formState.errors.projectStart}
                                            </div>
                                        )
                                    }
                                </Label>
                                <Input
                                    type="date"
                                    id="start"
                                    name="start"
                                    defaultValue={project ? project.projectStart : undefined}
                                    className={`col-span-3 ${formState.errors?.projectStart ? "border-destructive focus-visible:border-0 focus-visible:ring-destructive" : ""}`}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="end" className="text-right">
                                    Date End
                                    {
                                        formState.errors?.projectEnd && (
                                            <div className="text-destructive text-xs font-light">
                                                {formState.errors.projectEnd}
                                            </div>
                                        )
                                    }
                                </Label>
                                <Input
                                    type="date"
                                    id="end"
                                    name="end"
                                    defaultValue={(project && project.projectEnd) ? project.projectEnd : undefined}
                                    className={`col-span-3 ${formState.errors?.projectEnd ? "border-destructive focus-visible:border-0 focus-visible:ring-destructive" : ""}`}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4 pt-4">
                                <Label htmlFor="bullets" className="text-right">
                                    References
                                </Label>
                                {/*Here would be all of our references*/}
                                <div className="col-span-3 flex flex-col gap-0.5">
                                    <div className="flex flex-row flex-wrap h-fit">
                                        {currentRefs.map(((refEntry, index) => {

                                            return (
                                                <div
                                                    key={refEntry.href}
                                                    className="flex flex-row relative [&>div]:hover:visible pl-2"
                                                >
                                                    <div className="flex h-full flex-col align-middle justify-center">
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger
                                                                    onClick={event => {event.preventDefault();}}
                                                                    className="cursor-default"
                                                                >
                                                                    <ResProjIconSelector iconString={refEntry.icon} className="h-8 w-8" />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>{refEntry.description}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                    {/*Modification tools for the entry.*/}
                                                    <div className="invisible h-full">
                                                        <div className="flex flex-col">
                                                            <Button
                                                                variant="destructive"
                                                                type="button"
                                                                className="p-0.5 h-5"
                                                                onClick={refLinkRemover.bind(null, refEntry.href)}
                                                            >
                                                                <XIcon className="text-white h-full w-full" />
                                                            </Button>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        type="button"
                                                                        className="p-0.5 h-5"
                                                                    >
                                                                        <EditIcon className="text-white h-full w-full" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-80">
                                                                    <div className="grid gap-4">
                                                                        <div className="space-y-2">
                                                                            <h4 className="font-medium leading-none">Reference</h4>
                                                                            <p className="text-sm text-muted-foreground">
                                                                                Adjust reference parameters.
                                                                            </p>
                                                                        </div>
                                                                        <div className="grid gap-2">
                                                                            <div
                                                                                className="grid grid-cols-3 items-center gap-4">
                                                                                <Label htmlFor="href">Link</Label>
                                                                                <Input
                                                                                    id="href"
                                                                                    ref={refReferenceLinkInput}
                                                                                    defaultValue={refEntry.href}
                                                                                    className="col-span-2 h-8"
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="grid grid-cols-3 items-center gap-4">
                                                                                <Label htmlFor="ref_description">Description</Label>
                                                                                <Input
                                                                                    id="ref_description"
                                                                                    ref={refReferenceDescriptionInput}
                                                                                    defaultValue={refEntry.description}
                                                                                    className="col-span-2 h-8"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <PopoverClose asChild className="w-full flex flex-row mt-6 align-middle">
                                                                        <Button
                                                                            type="button"
                                                                            onClick={refLinkAdjuster.bind(null, index)}
                                                                            className="w-fit"
                                                                        >
                                                                            Save
                                                                        </Button>
                                                                    </PopoverClose>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }))}
                                    </div>

                                    {/*Idea for view would be a selector on the left with link input and + sign on the right that mimics an Input elem...*/}
                                    <div
                                        className="flex flex-row h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {/* USE px-3 py-2 TO ENSURE EQUAL SPACING FOR THE INNER TEXT CONTENT */}
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button type="button" variant="outline"
                                                        className="h-full p-1.5 pr-0 border-none">
                                                    <ResProjIconSelector iconString={currentIconState}
                                                                         className="h-full"/>
                                                    <ChevronDown className="w-3" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit p-0">
                                                <div className="flex flex-col gap-0.5 overflow-y-scroll">
                                                    <Button type="button" variant="outline" className="border-0 p-2"
                                                            onClick={() => {setIconState("GITHUB_ICON")}}
                                                    >
                                                        <GithubIcon />
                                                    </Button>
                                                    <Button type="button" variant="outline" className="border-0 p-2"
                                                            onClick={() => {setIconState("LINKEDIN_ICON")}}
                                                    >
                                                        <LinkedinIcon />
                                                    </Button>
                                                    <Button type="button" variant="outline" className="border-0 p-2"
                                                            onClick={() => {setIconState("WEB_ICON")}}
                                                    >
                                                        <GlobeIcon />
                                                    </Button>
                                                    <Button type="button" variant="outline" className="border-0 p-2"
                                                            onClick={() => {setIconState("BOOK_ICON")}}
                                                    >
                                                        <BookOpenCheckIcon />
                                                    </Button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <Input
                                            ref={refLinkInputRef}
                                            className="border-none h-full focus-visible:ring-0 rounded-none"
                                            onKeyDown={refLinkAdder}
                                            placeholder="Enter a valid URL."
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-full p-2 border-none"
                                            onClick={refLinkAdder.bind(null, "Enter")}
                                        >
                                            <Plus className="w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 h-fit pr-14">
                        <div className="flex flex-row items-center gap-4">
                                <Label htmlFor="bullets" className="text-right">
                                    Bullets
                                    {
                                        formState.errors?.content && (
                                            <div className="text-destructive text-nowrap text-xs font-light">
                                                {formState.errors.content}
                                            </div>
                                        )
                                    }
                                </Label>
                                {/*Container for all of our bullets. Will contain content-editable elements.*/}
                                <ul className="flex flex-col gap-0.5 pl-4 w-full">
                                    {currentBullets.map((curString, ind) => {

                                        return (
                                            <li
                                                key={ind}
                                                className="relative list-disc list-item list-outside rounded-lg p-1 hover:bg-secondary [&>Button]:hover:opacity-100"
                                            >
                                                <p>
                                                    {curString}
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    className="absolute -top-3 -left-3 h-5 w-5 p-0.5 opacity-0"
                                                    onClick={() => {
                                                        // remove this specific index and leave the rest of the list in-tact
                                                        setBullets(currentBullets.slice(0, ind).concat(currentBullets.slice(ind+1)));
                                                    }}
                                                >
                                                    <XIcon className="h-full w-full"/>
                                                </Button>
                                            </li>
                                        )
                                    })}


                                    {/*New Point generator*/}
                                    <li
                                        className="flex flex-row h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        ref={hiddenInputRef}
                                        hidden
                                    >
                                        <Input
                                            className="border-none h-full focus-visible:ring-0 rounded-none"
                                            ref={bulletNewInputRef}
                                            placeholder="Enter a new bullet point."
                                            onKeyDown={bulletPointKeyHandler}
                                        />
                                        <ArrowRightIcon className="h-full p-0.5 w-5" />
                                    </li>
                                    <li
                                        className="block rounded-lg border shadow-sm p-1 hover:bg-gray-50"
                                        ref={hiddenInputButtonRef}
                                    >
                                        <button
                                            className="w-full h-full"
                                            type="button"
                                            onClick={() => {
                                                hiddenInputRef.current!.hidden = false;
                                                hiddenInputButtonRef.current!.hidden = true;
                                                bulletNewInputRef.current!.focus();
                                            }}
                                        >
                                            <PlusCircleIcon className="w-full"/>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}