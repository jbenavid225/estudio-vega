export function Label({ className = "", ...props }) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    />
  );
}
