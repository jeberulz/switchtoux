import { HugeiconsIcon } from "@hugeicons/react";
import { iconCatalog, iconSizeVariables, type IconName, type IconSize } from "./catalog";
import styles from "./icon.module.css";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface IconProps {
  alt?: IconName;
  className?: string;
  name: IconName;
  showAlt?: boolean;
  size?: IconSize;
}

export function Icon({
  alt,
  className,
  name,
  showAlt = false,
  size = "medium",
}: IconProps) {
  return (
    <HugeiconsIcon
      altIcon={alt ? iconCatalog[alt] : undefined}
      aria-hidden="true"
      className={classes(styles.icon, className)}
      color="currentColor"
      data-icon={showAlt && alt ? alt : name}
      data-size={size}
      focusable="false"
      icon={iconCatalog[name]}
      showAlt={Boolean(alt) && showAlt}
      size={iconSizeVariables[size]}
    />
  );
}
