'use client';

import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toogle';

export const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        'bg-background fixed top-0 flex items-center w-full p-2 justify-around dark:bg-[#1a1919]',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <h1 className='text-center text-2xl'>useLLM</h1>
      <ModeToggle />
    </div>
  );
};
