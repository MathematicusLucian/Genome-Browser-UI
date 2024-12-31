import { cn } from "../cn";

export default function Title({ className, title }) {
  return (
    <h2
      className={cn(
        "text-center text-2xl font-semibold text-primary xl:text-3xl",
        className,
      )}
    >
      {title}
    </h2>
  );
}