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
      className="w-full bg-dal-gold hover:bg-dal-gold-hover text-dal-black font-semibold h-11"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing In...
        </>
      ) : (
        'Sign In'
      )}
    </Button>
  );
}
