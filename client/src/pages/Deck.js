import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pokemon from "pokemontcgsdk";
import Sidebar from "../components/SideBar";

async function ApiCall(id) {
  try {
    pokemon.configure({ apiKey: process.env.REACT_APP_API_KEY });
    const card = await pokemon.card.find(id);
    return card;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; 
    } else {
      throw error;
    }
  }
}

function Deck() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userData, setUserData] = useState("");
  const [deckData, setDeckData] = useState([]);
  const [battleLvl, setBattleLvl] = useState(0); // Declare battleLvl state
  const [deckInfo, setDeckInfo] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "/user")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUserData(res.data.userData);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log("error", err));
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "/deck")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDeckData(res.data.deckData);
        } else {
          console.log("err");
        }
      })
      .catch((err) => console.log("error", err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const deckInfoArray = [];
      let battleLvl = 0;
      for (const deckItem of deckData) {
        const data = await ApiCall(deckItem.card_api);
        const battleChosen = deckItem.Chosen_For_Battle;
        battleLvl += deckItem.Experience;
        setDeckInfo((value) => [...value, data]);
        setAvatar(await ApiCall(userData.avatar_api));
      }
      setBattleLvl(battleLvl); // Update battleLvl state
    };

    fetchData();
  }, [deckData, userData]);

  return (
    <div>
      {auth ? (
        <div class="h-screen bg-homeN bg-cover opacity-100">
          <div className="text-center w-full text-yellow-500 p-5">
            <h1> Current Battle level : {battleLvl} </h1>
          </div>
          <div className="px-5 pt-5">
            <div className="grid grid-cols-2 md:grid-cols-3 place-items-center">
              {deckInfo.length > 0 &&
                deckInfo.map((card, index) => (
                  <div key={index} className="relative">
                    <img
                      className="hover:scale-150 transition w-30 p-2 md:w-64"
                      src={card.images?.large}
                      alt={card.name}
                    />
                    {deckData[index].Chosen_For_Battle && (
                      <img
                        src="success.png"
                        className="absolute bottom-0 right-0 h-1/6"
                        alt="chosen for battle"
                      />
                    )}
                  </div>
                ))}
            </div>
            <Sidebar />
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
}

export default Deck;
