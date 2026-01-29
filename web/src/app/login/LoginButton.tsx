'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full bg-dal-gold hover:bg-dal-gold-hover text-dal-black font-semibold"
        >
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                </>
            ) : (
                'Login'
            )}
        </Button>
    );
}
