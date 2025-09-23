import { IoStar } from "react-icons/io5";

type StarRatingProps = {
  rating: number; 
  max?: number;  
};

export const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
  return (
    <div className="stars">
      {Array.from({ length: max }, (_, i) => (
        <span key={i}>
          <IoStar className={` star-icon ${i < rating?  'active' : 'tar'} `}  />
        </span>
      ))}
    </div>
  );
};

