const cardIds = require('../../config/cardIds.json');

import ChooseACard from '../components/ChooseACard';

import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import withDarkMode from '../components/withDarkMode';
const queryClient = new QueryClient();

function SignupAvatar({ darkMode, toggleTheme }) {
  const apiIds = cardIds.signupAvatarIds;
  const [userId, setUserId] = useState(0);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + '/user')
      .then(res => {
        if (res.data.Status === "Success") {
          setUserId(res.data.userData.id)
        } else {
          console.error(res.data.err)
        }
      })
      .catch(err => console.error("error", err))
  }, [])


  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark:bg-blue-900 bg-yellow-400 min-h-screen">
        <ChooseACard apiIds={apiIds}
          text={"Choose your trainer!"}
          maxCardsChosen={1} //choose one trainer
          hidden={false}
          userId={userId}
          redirectHome={true}
        />
      </div>
    </QueryClientProvider>
  )

}

export default withDarkMode(SignupAvatar);