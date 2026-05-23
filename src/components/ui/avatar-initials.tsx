interface AvatarInitialsProps {
    name: string;
  }
  
  export function AvatarInitials({
    name,
  }: AvatarInitialsProps) {
    const initials = name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("");
  
    return (
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-black
          font-medium
          text-white
        "
      >
        {initials}
      </div>
    );
  }