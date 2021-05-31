import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import Tags from './Tags';
import validatePlayer from './lib/validation';

export default function PlayerForm({
  onAddPlayer,
  onUpdateAndSavePlayer,
  playerToEdit,
}) {
  const initialPlayerState = {
    name: '',
    price: '',
    free_transfer: false,
    club: '',
    position: '',
    email: '',
    skills: [],
  };

  const [player, setPlayer] = useState(initialPlayerState);
  const [club, setClub] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/clubs')
      .then((result) => result.json())
      .then((clubsFormApi) => setClub(clubsFormApi))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (playerToEdit) {
      setPlayer(playerToEdit);
    }
  }, [playerToEdit]);

  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    }

    setPlayer({ ...player, [fieldName]: fieldValue });
  }

  function updateSkills(skillToAdd) {
    setPlayer({ ...player, skills: [...player.skills, skillToAdd] });
  }

  function deleteSkill(skillToDelete) {
    const skillsToKeep = player.skills.filter(
      (skill) => skill !== skillToDelete
    );
    setPlayer({ ...player, skills: skillsToKeep });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validatePlayer(player)) {
      // Bin ich im Bearbeitungsmodus ? PUT / Update auf den Player : POST / Lege den Spieler neu an
      playerToEdit ? onUpdateAndSavePlayer(player) : onAddPlayer(player);
      setPlayer(initialPlayerState);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
        <h2>{playerToEdit ? 'Edit' : 'Add'} Player</h2>
        {isError && <ErrorBox>You have an error in your form.</ErrorBox>}
        <label htmlFor="playerName">Player Name</label>
        <input
          type="text"
          name="name"
          onChange={updatePlayer}
          value={player.name}
        />
        <label htmlFor="price">Transfer Price (in €)</label>
        <input
          type="name"
          name="price"
          onChange={updatePlayer}
          value={player.price}
          disabled={player.free_transfer}
        />
        <label>
          <input
            type="checkbox"
            name="free_transfer"
            onChange={updatePlayer}
            value={player.free_transfer}
          />
          <span>On a free transfer</span>
        </label>
        <label htmlFor="club">Club</label>
        <select
          name="club"
          id="club"
          onChange={updatePlayer}
          value={player.club}
        >
          <option value="">---Please select ---</option>
          {club &&
            club.length > 0 &&
            club.map((club) => (
              <option key={club._id} value={club.name}>
                {club.name}
              </option>
            ))}
        </select>

        <fieldset>
          <legend>Position</legend>
          <label>
            <input
              type="radio"
              name="position"
              value="striker"
              onChange={updatePlayer}
              checked={player.position === 'striker'}
            />
            Striker
          </label>
          <label>
            <input
              type="radio"
              name="position"
              value="midfield"
              onChange={updatePlayer}
              checked={player.position === 'midfield'}
            />
            Midfield
          </label>
          <label>
            <input
              type="radio"
              name="position"
              value="defence"
              onChange={updatePlayer}
              checked={player.position === 'defence'}
            />
            Defence
          </label>
          <label>
            <input
              type="radio"
              name="position"
              value="goalie"
              onChange={updatePlayer}
              checked={player.position === 'goalie'}
            />
            Goalie
          </label>
        </fieldset>
        <Tags
          tags={player.skills}
          onUpdateTags={updateSkills}
          onDeleteTag={deleteSkill}
        />
        <label htmlFor="email">Contact Email</label>
        <input
          type="text"
          name="email"
          onChange={updatePlayer}
          value={player.email}
        />
        <Button isPrimary>{playerToEdit ? 'Update' : 'Add'} player</Button>
        <Button type="reset" onClick={() => setPlayer(initialPlayerState)}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}

const Form = styled.form`
  display: grid;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 25rem;
  label,
  legend {
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }
  legend {
    margin-bottom: 0.5rem;
    padding: 0;
  }
  input,
  select {
    padding: 0.5rem;
    margin-bottom: 0.3rem;
  }
  fieldset {
    border: none;
    display: flex;
    gap: 0.4rem;
    padding: 0;
    margin: 0;
  }
  fieldset > label {
    font-weight: normal;
  }
  input[type='radio'],
  input[type='checkbox'] {
    transform: scale(1.5);
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 1.5rem;
  border-radius: 0.4rem;
  border: none;
  background: ${(props) =>
    props.isPrimary ? 'hsl(197, 71%, 73%)' : 'hsla(197, 71%, 73%, 0.3)'};
  cursor: pointer;
  font-weight: ${(props) => (props.isPrimary ? '600' : '100')};
  font-size: 1.2rem;
`;

const ErrorBox = styled.div`
  background: hsl(0, 100%, 60%);
  border-radius: 0.8rem;
  color: hsl(0, 30%, 30%);
`;
