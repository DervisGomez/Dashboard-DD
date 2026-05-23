export function UsersTableSkeleton() {
    return (
      <div className="overflow-hidden rounded-xl border">
        <div className="space-y-4 p-4">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="
                h-12
                animate-pulse
                rounded
                bg-gray-100
              "
            />
          ))}
        </div>
      </div>
    );
  }