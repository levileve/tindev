import React, {useEffect, useState} from "react";
import logo from '../assets/logo.svg';

import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import api from '../services/api';

import './Main.css';

export default function Main({match}) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loaderUsers() {
      const res = await api.get('/devs', {
        headers: {
          user: match.params.id
        }
      });
      setUsers(res.data);
    }
    loaderUsers();
  }, [match.params.id]);

  async function handleLike(id) {
    console.log('Like', id);
    await api.post(`/dev/${id}/likes`, null, {
      headers: {user: match.params.id}
    })
  }

  async function handleDislike(id) {
    console.log('Dislike', id);
    await api.post(`/dev/${id}/dislikes`, null, {
      headers: {user: match.params.id}
    })
  }

  return(
    <div className="main-container">
      <img src={logo} alt="Tindev"/>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src= {user.avatar} alt={user.name}/>
            <footer>
              <strong> {user.name} </strong>
              <p> {user.bio} </p>
            </footer>
            <div className="buttons">
              <button type='button' onClick={() => handleDislike(user._id)}>
                <img src={dislike} alt="Dislike"/>
              </button>
              <button type='button' onClick={() => handleLike(user._id)}>
                <img src={like} alt="Like"/>
              </button>
            </div>
          </li>
        ))}
        
      </ul>
    </div>
  )
}