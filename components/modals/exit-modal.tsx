"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from "@/components/ui/button";
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/logo_sad.svg" alt="Logo" height={80} width={80} />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">Wait, don&apos;t go</DialogTitle>
                    <VisuallyHidden>
                        <DialogTitle className="text-center font-bold text-2xl">Wait, don&apos;t go</DialogTitle>
                    </VisuallyHidden>
                    <DialogDescription className="text-center text-base">
                        You&apos;re about to leave the lesson. Are you sure you want to do that?
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button variant="primary" className="w-full" size="lg" onClick={close}>
                                Keep learning
                            </Button>
                            <Button variant="dangerOutline" className="w-full" size="lg" onClick={() => {
                                close();
                                router.push("/learn");
                            }}>
                                Exit session
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}