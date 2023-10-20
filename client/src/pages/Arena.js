import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar'
import Searchbar from '../components/SearchBar'

function Arena() {
  const items = ['Alex', 'Woirda', 'Julie', 'Julie2'];
  const [users, setUsers] = useState(['']);

  useEffect(() => {
    axios.get('http://' + process.env.REACT_APP_URL + ':1117/users')
        .then(res => {
            if (res.data.Status === "Success") {
                setUsers(res.data.usersData);
                console.log('users :>> ', users);
            } else {
                console.log('res.data.err :>> ', res.data.err);
            }
        })
        .catch(err => console.log("error", err));
}, []);

console.log('users :>> ', users);

  return (
    <div className='min-h-screen bg-blue-700'>
      <div className=" min-h-screen min-w-screen bg-townYN bg-cover h-screen flex flex-col items-center justify-center ">
        <div className="search w-1/2 mb-8 fixed top-20  ">

          <Searchbar />
        </div>
        <div className='flex h-3/4  mt-32 w-full'>
          <div className='flex-1 '>
            <div className='bg-pink-200 w-2/3 h-5/6 flex mt-12 ml-24 flex-col'>
              <div className='bg-red-500 h-1/6 flex-1'><h1 className='font-bold text-white text-center m-3 '> Recommended Opponents</h1></div>
              <div className='bg-gray-200 h-5/6 '>      {users.length > 0 && users.map((user, index) => (
                <div key={index} className="flex w-full ">
                  <div
                    className='rounded-full  relative p-2 mt-10 w-full h-14 flex '>
                    <div className='flex-1'>
                      <div className='bg-white ml-4 rounded-full w-12 h-12'>

                      </div>
                    </div>
                    <div className='flex-1 mt-3'>  <p className='font-bold '>{user.username}</p></div>
                    <div className='flex-1  font-bold mt-3 w-1/6'><p>L V L    {user.lvl}</p></div>
                  </div>

                  <div className='bg-yellow-300 text-center font-bold  rounded-full ml-3 mr-4 w-25 mt-10  '> <p className='mt-3'>B A T T L E</p></div>
                </div>
              ))}</div>
            </div>
          </div>
          <div className='flex-1 '>
            <div className=' flex flex-col mx-5 px-5'>
              <h2 className='text-center font-bold text-white'>I N &nbsp; P R O G R E S S :</h2>

              <div className='bg-red-500 flex-1 rounded-full flex mt-5 p-3'>
                <p className='text-white flex-1 w-2/3 font-bold text-xl m-3 '> You vs JulieD5432</p><p className='flex-1 ml-auto'> 2 h</p>
              </div>
              <div className='bg-black flex-1 rounded-full mt-5 p-3 '>
                <p className='text-red-500 font-bold text-xl m-3'> You vs JulieD5432</p>
              </div>
              <div className='bg-white flex-1 rounded-full mt-5 p-3 '>
                <p className='text-black font-bold text-xl m-3'> You vs JulieD5432</p>
              </div>

            </div>
          </div>
        </div>


        <Sidebar />
      </div>
    </div>
  );
}

export default Arena;
