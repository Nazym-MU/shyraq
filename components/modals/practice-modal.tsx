"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = usePracticeModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-3">
                        <Image src="/heart.svg" alt="Heart" height={150} width={150} />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">Practice Lesson</DialogTitle>
                    <VisuallyHidden>
                        <DialogTitle className="text-center font-bold text-2xl">Practice Lesson</DialogTitle>
                    </VisuallyHidden>
                    <DialogDescription className="text-center text-base">
                        Use practice lessons to regain points. You cannot lose points in practice lessons.
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button variant="primary" className="w-full" size="lg" onClick={close}>
                             Okay
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}