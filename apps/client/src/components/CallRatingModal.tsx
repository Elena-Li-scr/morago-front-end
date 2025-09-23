import { useMemo, useState } from "react";
import MainButton from "@shared/components/MainButton";
import "@shared/styles/callRating.css";
import { rateCall } from "@shared/services/clientApi";
import { useShowRating } from "@shared/store/useStore";

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

export default function CallRatingModal() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const visualValue = hover || rating;
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);
  const { setShowRating } = useShowRating();

  const sendRating = async () => {
    const safe = clamp(rating, 1, 5);
    if (safe < 1) return;
    const callId = sessionStorage.getItem("callId");
    if (!callId) {
      console.error("callId отсутствует в sessionStorage");
      return;
    }

    const id = callId;

    const payload = { rating: safe.toString() };

    try {
      console.log("Отправляем рейтинг:", safe);
      await rateCall({ id, payload });
    } catch (e) {
      console.error(e);
    }
    setShowRating(false);
  };
  return (
    <div className="call-page-rating">
      <div className="rating-modal-container">
        <h2 id="rating-title" className="rating-modal-title">
          Пожалуйста, оцените переводчика
        </h2>

        <div className="rating-modal-stars" role="radiogroup" aria-label="Рейтинг от 1 до 5">
          {stars.map((value) => {
            const filled = visualValue >= value;
            const isSelected = rating === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`${value} ${value === 1 ? "звезда" : value < 5 ? "звезды" : "звезд"}`}
                className={`rating-modal-star ${filled ? "rating-modal-star-filled" : ""}`}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(0)}
                onFocus={() => setHover(value)}
                onBlur={() => setHover(0)}
                onClick={() => setRating(value)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={32}
                  height={32}
                  aria-hidden="true"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.86L18.18 22 12 18.77 5.82 22 7 14.13l-5-4.86 6.91-1.01L12 2z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            );
          })}
        </div>

        <MainButton
          type="button"
          text="Отправить"
          onClick={sendRating}
          className={rating > 0 ? "button button-active" : "button"}
        />
        <MainButton
          type="button"
          text="Позже"
          onClick={() => setShowRating(false)}
          className="button button-active"
        />
      </div>
    </div>
  );
}
