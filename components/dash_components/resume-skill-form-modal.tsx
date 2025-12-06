'use client';
/**
 * An encapsulated dialog with a settable trigger for the resume skill
 */
import {GaugeValue} from "@/lib/definitions";
import {ReactNode, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

export default function ResumeSkillUpdateForm({ skill, triggerElem } : { skill? : GaugeValue; triggerElem: ReactNode; }) {
    // form control element (we want to decorate close to forget old states so we can do that as well)
    const [open, setOpen] = useState<boolean>(false);
    const setOpenDecorated = function(newState: boolean) {
        if(open && !newState) {
            setFormState(initialState);
        }

        setOpen(newState);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerElem}
            </DialogTrigger>

            <DialogContent className="max-w-fit">
                <DialogHeader>
                    <DialogTitle>
                        Edit Skill
                    </DialogTitle>
                    <DialogDescription>
                        Modify skill attributes.
                    </DialogDescription>
                </DialogHeader>

                {/*Our actual form element with the requisite slider*/}
                <form>

                </form>
            </DialogContent>
        </Dialog>
    )
}