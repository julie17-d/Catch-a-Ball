import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import pokemon from 'pokemontcgsdk'
import LoadingPage from '../LoadingPage';

import Sidebar from "../components/SideBar";


async function ApiCall(id) {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });

    const card = await pokemon.card.find(id);

    return card;
}

function Home() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [mess, setMess] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userData, setUserData] = useState('');
    const [deckData, setDeckData] = useState([]);
    const [deckInfo, setDeckInfo] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://' + process.env.REACT_APP_URL + ':1117/user')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setUserData(res.data.userData);
                } else {
                    setAuth(false);
                    setMess(res.data.err);
                }
            })
            .catch(err => console.log("error", err));
    }, []);

    useEffect(() => {
        axios.get('http://' + process.env.REACT_APP_URL + ':1117/deck')
            .then(res => {
                if (res.data.Status === "Success") {
                    setDeckData(res.data.deckData);
                } else {
                    setMess(res.data.err);
                }
            })
            .catch(err => console.log("error", err));
    }, []);

    useEffect(() => {
        deckData.map(async (deckItem) => {
            const data = await ApiCall(deckItem.card_api);
            setDeckInfo((value) => [...value, data]);
            setAvatar(await ApiCall(userData.avatar_api));
        });
    }, [deckData]);

    return (
        <div className='bg-gray-700'>
            {
                auth ?
                    <div class="min-h-screen min-w-screen bg-homeN bg-cover opacity-100">
                        <div className="text-center min-h-screen px-5 py-5">
                            <div className='flex'>
                               
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-3 place-items-center'>
                                {deckInfo.length > 0 && deckInfo.map((card) => {
                                    return (
                                        <img className="hover:scale-150 transition w-36 p-2 md:w-64" src={card.images?.large} alt={card.name} />
                                    )
                                })}
                            </div>
                            <Sidebar />
                        </div>
                    </div>
                    : navigate('/')
            }

        </div>
    )
}
export default Home;