import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const Header = () => {
    return (
        <div className='p-4 flex justify-between items-center'>
            <h1 className='flex text-2xl items-center'>
            <Image className='mr-2' src={'./logo.svg'} alt="logo" width={30} height={30} />
        <span>Create</span>  
            </h1>
            <div className="flex gap-5">
                <Button variant="ghost">Sign In</Button>
                <Button className='text-white bg-primary hover:bg-primary/70 transition-all duration-300'>Get Started</Button>
            </div>
        </div>
    );
};

export default Header;