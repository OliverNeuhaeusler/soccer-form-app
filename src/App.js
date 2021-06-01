import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';
import { saveToLocalStorage, loadFromLocalStorage } from './lib/localStorage';
import { Switch, Route } from 'react-router-dom';
import HeaderNavigation from './HeaderNav';
import BuyingList from './BuyingList';

function App() {
  const [players, setPlayers] = useState(loadFromLocalStorage('players') ?? []);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [buyingList, setBuyingList] = useState(
    loadFromLocalStorage('players') ?? []
  );

  useEffect(() => {
    fetch('http://localhost:4000/players')
      .then((result) => result.json())
      .then((playerFromApi) => setPlayers(playerFromApi))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    saveToLocalStorage('buyingList', buyingList);
  }, [buyingList]);

  function addBuyingList(player) {
    setBuyingList([...buyingList, player]);
  }

  useEffect(() => {
    saveToLocalStorage('players', players);
  }, [players]);

  function addPlayer(player) {
    fetch('http://localhost:4000/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    })
      .then((result) => result.json())
      .then((player) => setPlayers([...players, player]))
      .catch((error) => console.error(error));
    /*saveToLocalStorage('players', players); methode eins aber nicht benutzt.*/
  }

  function editPlayer(player) {
    setPlayerToEdit(player);
  }

  function updateAndSavePlayer(playerToUpdateAndSave) {
    const upToDatePlayers = players.filter(
      (player) => player._id !== playerToUpdateAndSave._id
    );

    fetch('http://localhost:4000/players/' + playerToUpdateAndSave._id, {
      method: 'PUT', // Update
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerToUpdateAndSave),
    })
      .then((result) => result.json())
      .then((updatedPlayer) => {
        setPlayers([...upToDatePlayers, updatedPlayer]);
        setPlayerToEdit(null);
      })
      .catch((error) => console.error(error));
  }

  function deletePlayer(player) {
    fetch('http://localhost:4000/players/' + player._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.data && response.data._id) {
          const playersToKeep = players.filter(
            (player) => player._id !== response.data._id
          );
          setPlayers(playersToKeep);
        } else {
          console.log(
            'Player could not be deleted, was not found, or something else went wrong.'
          );
        }
      });
  }

  return (
    <Div>
      <HeaderNavigation />
      <H1>Soccer App</H1>
      <Grid>
        <Switch>
          <Route exact path="/">
            <PlayerForm
              onAddPlayer={addPlayer}
              onUpdateAndSavePlayer={updateAndSavePlayer}
              playerToEdit={playerToEdit}
            />
            <Players>
              {players.map((player) => (
                <PlayerCard
                  player={player}
                  onaddBuyingList={addBuyingList}
                  onEditPlayer={editPlayer}
                  onDeletePlayer={deletePlayer}
                />
              ))}
            </Players>
          </Route>
          <Route path="/player">
            <Players>
              {players.map((player) => (
                <PlayerCard
                  player={player}
                  onEditPlayer={editPlayer}
                  onDeletePlayer={deletePlayer}
                  onaddBuyingList={addBuyingList}
                />
              ))}
            </Players>
          </Route>
          <Route>
            <BuyingList playerItems={buyingList} />
          </Route>
        </Switch>
      </Grid>
    </Div>
  );
}

export default App;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  gap: 1rem;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const H1 = styled.h1`
  display: flex;
  place-items: center;
`;

const Div = styled.div`
  margin-bottom: 3rem;
`;
