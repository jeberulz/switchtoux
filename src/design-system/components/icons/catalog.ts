import {
  Add01Icon,
  Alert02Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  BookOpen01Icon,
  Calendar03Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  Download01Icon,
  File01Icon,
  FilterIcon,
  HelpCircleIcon,
  InformationCircleIcon,
  Link01Icon,
  Mail01Icon,
  Menu01Icon,
  MinusSignIcon,
  Presentation01Icon,
  Search01Icon,
  Share01Icon,
  SidebarLeft01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export const iconCatalog = {
  add: Add01Icon,
  alert: Alert02Icon,
  arrowLeft: ArrowLeft01Icon,
  arrowRight: ArrowRight01Icon,
  arrowUpRight: ArrowUpRight01Icon,
  bookOpen: BookOpen01Icon,
  calendar: Calendar03Icon,
  cancel: Cancel01Icon,
  checkmarkCircle: CheckmarkCircle01Icon,
  clock: Clock01Icon,
  download: Download01Icon,
  file: File01Icon,
  filter: FilterIcon,
  helpCircle: HelpCircleIcon,
  informationCircle: InformationCircleIcon,
  link: Link01Icon,
  mail: Mail01Icon,
  menu: Menu01Icon,
  minus: MinusSignIcon,
  presentation: Presentation01Icon,
  search: Search01Icon,
  share: Share01Icon,
  sidebarLeft: SidebarLeft01Icon,
  userGroup: UserGroupIcon,
} as const satisfies Record<string, IconSvgElement>;

export type IconName = keyof typeof iconCatalog;

export const iconSizeVariables = {
  small: "var(--primitive-dimension-icon-small)",
  medium: "var(--primitive-dimension-icon-medium)",
  large: "var(--primitive-dimension-icon-large)",
} as const;

export type IconSize = keyof typeof iconSizeVariables;
