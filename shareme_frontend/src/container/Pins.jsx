import React, { useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import {Navbar, Feed, PinDetail, CreatePin, Search} from '../components';

const Pins = ({user}) => {

    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div className="px-2 md:px-5">
           <div className="bg-gray-50">
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </div>

          <div className="h-full">
              <Routes>
                  <Route path='/' element={<Feed />} />
                  <Route path='/category/:categoryId' element={<Feed />} />
                  <Route path='/pin-detail/:pinId' element={<PinDetail user={user} />} />
                  <Route path='/create-pin' element={<CreatePin user={user} />} />
                  <Route path='/searchTerm' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>} />

              </Routes>
          </div>
        </div>
    )
}

export default Pins
