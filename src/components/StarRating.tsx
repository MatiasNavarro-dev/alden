"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readonly?: boolean;
}

export function StarRating({
  value,
  onChange,
  size = 20,
  readonly = false,
}: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={readonly ? "cursor-default" : "cursor-pointer"}
          aria-label={`${star} estrellas`}
        >
          <Star
            size={size}
            className={
              star <= value
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-slate-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export function StarDisplay({ value, size = 16 }: { value: number; size?: number }) {
  return <StarRating value={Math.round(value)} readonly size={size} />;
}
