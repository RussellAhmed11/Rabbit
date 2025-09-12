import React from 'react';
import Topbar from '../Layouts/Topbar';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className='border-b border-gray-200'>
        {/* Topber */}
           <Topbar/> 
           {/* Navbar */}
           <Navbar />
        </header>
    );
};

export default Header;