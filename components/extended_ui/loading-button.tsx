'use client';
/**
 * A shadcn Button that has been extended to take into account the parent form's loading state
 */

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

type LoadingButtonProps = ButtonProps & {
    loading?: boolean;
    loadingMessage: string;
    hideLoader?: boolean;
    forceChildren?: boolean;
};

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
    function LoadingButton({ loading, loadingMessage, forceChildren, hideLoader, children, ...props }, ref) {
        const { pending } = useFormStatus();

        const isLoading = loading ?? pending;

        return (
            <Button ref={ref} disabled={isLoading} {...props}>
                <>
                    {hideLoader || ( isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> )}
                    {(!forceChildren && isLoading) ? loadingMessage : children}
                </>
            </Button>
        );
    },
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;