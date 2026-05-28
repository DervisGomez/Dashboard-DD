import { cn } from "@/lib/utils";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const inputId =
    id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={cn(
          "ui-input",
          error && "border-red-400 focus:border-red-500",
          className
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
