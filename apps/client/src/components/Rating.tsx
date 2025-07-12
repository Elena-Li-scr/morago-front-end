interface RatingProps {
  count: number;
}

export default function Rating({ count }: RatingProps) {
  return (
    <div className="rating">
      {Array.from({ length: count }, (_, i) => (
        <img
          key={`gold-${i}`}
          src="/assets/home/gold-star.png"
          alt="gold-star"
        />
      ))}
      {Array.from({ length: 5 - count }, (_, i) => (
        <img
          key={`grey-${i}`}
          src="/assets/home/grey-star.png"
          alt="grey-star"
        />
      ))}
    </div>
  );
}
