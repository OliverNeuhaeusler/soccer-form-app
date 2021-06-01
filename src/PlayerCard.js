import styled from 'styled-components/macro';

export default function PlayerCard({
  player,
  onaddBuyingList,
  onEditPlayer,
  onDeletePlayer,
}) {
  return (
    <Card>
      <h3>{player.name}</h3>
      <p>{player.price}</p>
      <p>{player.club}</p>
      <p>{player.position}</p>
      <p>
        {player.skills.map((skill) => (
          <span>{skill}</span>
        ))}
      </p>
      <p>
        <a href={`malito:${player.email}`}>{player.email}</a>
      </p>
      <Button onClick={() => onaddBuyingList(player)}>Get the Player</Button>
      <Button onClick={() => onEditPlayer(player)}>Edit the player</Button>
      <Button onClick={() => onDeletePlayer(player)}>Delete Player</Button>
    </Card>
  );
}

const Card = styled.article`
  background: hsl(197, 71%, 73%);
  border-radius: 0.8rem;
  color: hsl(197, 90%, 25%);
  padding: 1.3rem 1.1rem;
  height: 10rem;
  min-width: calc((100% -2rem) / 3);

  h3 {
    margin-top: 0;
  }

  p {
    margin: 0.3rem 0;
  }
`;

const Button = styled.button`
  padding: 0.3rem;
  margin: 0.2rem;
  background: transparent;
  border-radius: 100vw;
`;
