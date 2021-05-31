import styled from 'styled-components/macro';

export default function BuyingList({ playerItems }) {
  return (
    <>
      {playerItems.map((player) => (
        <Card>
          <h3>{player.name}</h3>
          <p>{player.price}</p>
        </Card>
      ))}
    </>
  );
}

const Card = styled.article`
  background: hsl(197, 71%, 73%);
  border-radius: 0.8rem;
  color: hsl(197, 90%, 90%);
  padding: 1.3rem 1.1rem;
  height: 10rem;
  min-width: calc((100% -2rem) / 3);
`;
