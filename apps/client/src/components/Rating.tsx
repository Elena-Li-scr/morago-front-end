interface RatingProps {
  count: number;
}

export default function Rating({ count }: RatingProps) {
  const safeCount = Math.max(0, Math.min(count, 5));

  return (
    <div className="rating">
      {Array.from({ length: safeCount }, (_, i) => (
        <img key={`gold-${i}`} src="/assets/home/gold-star.png" alt="gold-star" />
      ))}
      {Array.from({ length: 5 - safeCount }, (_, i) => (
        <img key={`grey-${i}`} src="/assets/home/grey-star.png" alt="grey-star" />
      ))}
    </div>
  );
}
