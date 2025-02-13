interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 border border-gray-100 dark:border-gray-700 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}