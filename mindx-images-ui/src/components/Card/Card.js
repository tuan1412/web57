import { Card as BCard } from 'react-bootstrap';

function Card({
  imageUrl,
  title,
  description,
  note
}) {
  return (
    <BCard>
      <BCard.Img variant="top" src={imageUrl} />
      <BCard.Body>
        <BCard.Title>{title}</BCard.Title>
        <BCard.Text>
          {description}
        </BCard.Text>
        <BCard.Text>
          {note}
        </BCard.Text>
      </BCard.Body>
    </BCard>
  );
}

export default Card;
