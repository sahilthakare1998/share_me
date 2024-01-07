import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { IoMdAdd, IoMdSearch, IoIosAdd } from 'react-icons/io';
import avatar from '../assets/avatar.png'
const Navbar = ({user,setSearchTerm, searchTerm}) => {

    const navigate = useNavigate();

    if(!user) return null;

    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-md">
            <IoMdSearch fontSize={21} className="ml-1"/>
            <input type="text" 
            onChange={(e)=>setSearchTerm(e.target.value)}
            value={searchTerm}
            onFocus={()=>navigate('/search')}
            className="p-2 w-full outline-none bg-white"
            />
        </div>

        <div className="flex gap-3">
        <Link to={`user-profile/${user._id}`} className="hidden md:block">
            <img  src={avatar} alt="user" className="w-14 h-12 rounded-g"/>
        </Link>

        <Link to={`create-pin`} className="bg-black text-white w-12 h-12 flex items-center m:h-12 m:w-12 justify-center rounded-g">
            <IoIosAdd />
        </Link>
        </div>
        </div>
    )
}

export default Navbar
