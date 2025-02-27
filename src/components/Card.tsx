import * as React from "react";
import { cn } from "../utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
);

Card.displayName = "Card";

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent: React.FC<CardContentProps> = ({
  className,
  ...props
}: CardContentProps) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

CardContent.displayName = "CardContent";

export { Card, CardContent };
