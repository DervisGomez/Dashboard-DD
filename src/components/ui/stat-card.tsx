interface StatCardProps {
    title: string;
  
    value: string | number;
  }
  
  export function StatCard({
    title,
    value,
  }: StatCardProps) {
    return (
      <div
        className="
          rounded-xl
          border
          bg-white
          p-6
        "
      >
        <p
          className="
            text-sm
            text-gray-500
          "
        >
          {title}
        </p>
  
        <h3
          className="
            mt-2
            text-3xl
            font-bold
          "
        >
          {value}
        </h3>
      </div>
    );
  }