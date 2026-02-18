export function Card({ className = "", ...props }) {
  return (
    <div
      {...props}
      className={`rounded-lg bg-white shadow ${className}`}
    />
  );
}

export function CardHeader({ className = "", ...props }) {
  return (
    <div
      {...props}
      className={`px-6 py-4 ${className}`}
    />
  );
}

export function CardTitle({ className = "", ...props }) {
  return (
    <h3
      {...props}
      className={`text-lg font-semibold ${className}`}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  return (
    <div
      {...props}
      className={`px-6 py-4 ${className}`}
    />
  );
}
