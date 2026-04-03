export type UseCaseCard = {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
};

export const USECASE_CARDS: UseCaseCard[] = [
  {
    title: "Membership Use",
    description:
      "By becoming a member, you can enjoy daily access to Kosugiyu Tonari. Use it freely for your everyday work, meals, weekend relaxation, or community gatherings.",
    bullets: [
      "Looking for a remote work environment",
      "Want to cook or dine in a spacious kitchen",
      "Interested in community activities or events",
      "Looking to create a space outside of home",
    ],
    image: "/figma-assets/usecase-1-23bd32.png",
    id: "membership",
  },
  {
    title: "Drop in Use",
    description:
      "The co-working and cafe space is open to everyone. On weekends, the cafe menu is available from morning until early afternoon. We also offer a drop-in plan that includes a bath ticket.",
    bullets: [
      "Need a space for a work or reading",
      "Enjoy a drink after a bath",
      "Want a cozy place to relax on your day off",
      "Seeking casual neighborhood connections",
    ],
    image: "/figma-assets/usecase-2-d783d7.png",
    id: "dropin",
  },
  {
    title: "Take away",
    description:
      "Takeout drinks are available daily. Enjoy a refreshing craft cola, beer, or other beverages, perfect for that post-bath treat.",
    bullets: [
      "Pick up a drink on the way home",
      "Grab a quick refreshment after your bath",
      "Bring the neighborhood mood with you",
    ],
    image: "/figma-assets/usecase-3-48e433.png",
    id: "takeaway",
  },
];

