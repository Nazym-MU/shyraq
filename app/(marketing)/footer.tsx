import Image from 'next/image';
import { Button } from '@/components/ui/button';
export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/kaz.svg" alt="Kazakhstan" height={32} width={40} className="mr-4 rounded-md"/>
                    Kazakh
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/math.svg" alt="Math" height={32} width={40} className="mr-4 rounded-md"/>
                    Math
                </Button>
            </div>
        </footer>
    );
};