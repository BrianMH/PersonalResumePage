/**
 * Implements an error display that can be dismissed by the user.
 */
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle, CircleXIcon} from "lucide-react";
import {ErrorStructs} from "@/lib/errors";
import Link from "next/link";

export default function RemovableAlert({ errorValue } : { errorValue : string }) {

    return (
            <div className="absolute top-0 z-20 flex flex-row align-middle justify-center w-full">
                <Alert variant="destructive" className="relative bg-card drop-shadow-lg w-96">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>{ErrorStructs[errorValue].name}</AlertTitle>
                    <AlertDescription>
                        <p>{ErrorStructs[errorValue].message}</p>
                        <p>{ErrorStructs[errorValue].context}</p>
                    </AlertDescription>
                    <Link href={"/"} className="absolute right-3 top-3">
                        <CircleXIcon className="h-5 w-5"/>
                    </Link>
                </Alert>
            </div>
    )
}