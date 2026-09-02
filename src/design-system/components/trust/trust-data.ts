export interface CredibilityItem {
  label: string;
  value: string;
}

export interface AudienceRoute {
  action: string;
  href: string;
  index: string;
  problem: string;
  title: string;
}

export interface InstructorCareerItem {
  company: string;
  role: string;
}

export interface InstructorFixture {
  bio: string;
  career: readonly InstructorCareerItem[];
  name: string;
  placeholder: string;
  principles: readonly string[];
  role: string;
}

export interface ConvergencePath {
  href: string;
  label: string;
}

export const credibilityItems: readonly CredibilityItem[] = [
  { label: "Practice", value: "13+ years in product design" },
  { label: "Teaching", value: "200+ designers taught" },
  { label: "Level", value: "Staff-level AI product experience" },
  { label: "Companies", value: "Algolia, Amazon and Booking.com" },
];

export const audienceRoutes: readonly AudienceRoute[] = [
  {
    action: "See the flagship course",
    href: "/courses/ai-native-product-designer",
    index: "01",
    problem:
      "Update your workflow, build stronger prototypes and contribute more deeply to AI product decisions.",
    title: "Working product designers",
  },
  {
    action: "Start with foundations",
    href: "/courses/ai-native-product-design-foundations",
    index: "02",
    problem:
      "Learn current product design practice from the start, including AI collaboration, working prototypes and evaluation.",
    title: "Serious career switchers",
  },
  {
    action: "Discuss team training",
    href: "/contact?enquiry=team-training",
    index: "03",
    problem:
      "Build a shared approach to AI opportunities, interaction patterns, prototyping and quality.",
    title: "Design and product teams",
  },
];

export const instructorFixture: InstructorFixture = {
  bio: "I am John Iseghohi, a Staff Product Designer working on AI Agent Studio at Algolia. Across more than 13 years, I have designed products at Algolia, Amazon, Booking.com, Etisalat, Konga and eTranzact. I have also taught UX, facilitated workshops and helped more than 200 designers develop their practice.",
  career: [
    { company: "eTranzact", role: "Early web and product design work" },
    { company: "Konga", role: "Founding product design experience" },
    { company: "Etisalat Nigeria", role: "UX leadership" },
    { company: "Booking.com", role: "Connected travel products, Amsterdam" },
    { company: "Amazon UK", role: "Insurance and financial products" },
    { company: "Algolia", role: "Staff Product Designer, AI Agent Studio" },
  ],
  name: "John Iseghohi",
  placeholder:
    "Founder photograph pending. The public site will use a real portrait of John Iseghohi. No likeness is shown here.",
  principles: [
    "Evidence before confidence",
    "Working behaviour before presentation theatre",
    "Human control before invisible automation",
    "Failure testing before launch confidence",
    "Clear judgment before visual volume",
  ],
  role: "Staff Product Designer, Algolia",
};

export const convergencePaths: readonly ConvergencePath[] = [
  { href: "/courses", label: "Courses" },
  { href: "/workshops", label: "Workshops" },
  { href: "/resources", label: "Resources" },
];

export const newsletterCopy = {
  body: "Field notes on grounded AI product work. Separate from course waitlist emails.",
  eyebrow: "Design With AI",
  title: "Get the newsletter",
} as const;

export const convergenceCopy = {
  action: "Join the waitlist",
  body: "Pilot dates and founding-cohort details go to the waitlist first.",
  title: "Start with one programme.",
} as const;
