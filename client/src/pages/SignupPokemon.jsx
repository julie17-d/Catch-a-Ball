const cardIds = require('../../config/cardIds.json');

import ChooseACard from '../components/ChooseACard';

import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { getUser } from "../api/user";
import withDarkMode from '../components/withDarkMode';
const queryClient = new QueryClient();

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

function SignupPokemon({ darkMode, toggleTheme }) {
  const apiIds = cardIds.signupPokemonIds;
  const [userId, setUserId] = useState(0)
  const [username, setUserName] = useState('')
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
 getUser()
      .then(res => {
        if (res.data.Status === "Success") {
          setUserName(res.data.userData.username)
          setUserId(res.data.userData.id)
        } else {
          console.error(res.data.err)
        }
      })
      .catch(err => console.error("error", err))
  },[])


  shuffle(apiIds);

  return (
    <div className="dark:bg-blue-900 bg-yellow-400 min-h-screen">
      <QueryClientProvider client={queryClient}>
        <ChooseACard
          apiIds={apiIds}
          text={`Hello, ${username}! Choose three cards to start your journey...`}
          username={username} 
          userId={userId}
          maxCardsChosen={3} //choose three pokemon
          hidden={true}
          redirectHome={false}
        />    </QueryClientProvider>
    </div>
  );
}

export default withDarkMode(SignupPokemon);
