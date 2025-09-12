import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const SearchBar = () => {
    const [searchItem,setSearchItem]=useState('')
    const [isOpen,setIsopen]=useState(false)
    const handleSearchBarToggle=()=>{
        setIsopen(!isOpen)
    }
    const handleSearch=(e)=>{
       e.preventDefault()
       console.log('search submit work')
       setIsopen(false)
    }
    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50":"w-auto"} `}>
            {
                isOpen ? <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
                    <div className='relative w-1/2'>
                      <input onChange={(e)=>setSearchItem(e.target.value)} type='text' placeholder='Search' value={searchItem} className='bg-gray-100 px-4 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text=gray-700'/>
                      <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gay-700 hover:text-gray-800'>
                      <HiMagnifyingGlass className='h-6 w-6'/>
                      </button>
                      {/* close button */}
                      <button onClick={handleSearchBarToggle} className='absolute right- top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                        <HiMiniXMark className='h-6 w-6'/>
                      </button>
                    </div>
                </form>:<button onClick={handleSearchBarToggle}>
                    <HiMagnifyingGlass className='h-6 w-6'/>
                </button>
            }
        </div>
    );
};

export default SearchBar;