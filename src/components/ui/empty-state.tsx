interface EmptyStateProps {
    title: string;
  
    description: string;
  }
  
  export function EmptyState({
    title,
    description,
  }: EmptyStateProps) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-xl
          border
          p-10
          text-center
        "
      >
        <h3 className="text-lg font-semibold">
          {title}
        </h3>
  
        <p className="mt-2 text-gray-500">
          {description}
        </p>
      </div>
    );
  }