import type { Testimonial } from "@/types";
import { img } from "@/lib/images";

export const testimonials: Testimonial[] = [
  {
    _id: "t-1",
    name: "Amara Okafor",
    role: "Chief Digital Officer",
    company: "Meridian Financial",
    avatar: img("professional corporate headshot of a confident woman, neutral studio background", "square"),
    quote:
      "My Web Helper rebuilt our platform without a single day of downtime. They are the rare partner that is equally strong on strategy, design and engineering.",
    rating: 5,
    featured: true,
    order: 1
  },
  {
    _id: "t-2",
    name: "Daniel Reyes",
    role: "Founder & CEO",
    company: "Verde Living",
    avatar: img("professional corporate headshot of a man, neutral studio background", "square"),
    quote:
      "Our conversion rate jumped 41% in a single quarter. The team obsesses over detail, performance and the numbers that actually matter to the business.",
    rating: 5,
    featured: true,
    order: 2
  },
  {
    _id: "t-3",
    name: "Priya Nair",
    role: "VP Product",
    company: "Northwind Health",
    avatar: img("professional headshot of a woman in a bright office, editorial portrait", "square"),
    quote:
      "They shipped a patient app our users genuinely love — 4.8 stars and climbing. Communication was exceptional from kickoff to launch.",
    rating: 5,
    featured: true,
    order: 3
  },
  {
    _id: "t-4",
    name: "Marcus Feld",
    role: "COO",
    company: "Atlas Freight",
    avatar: img("professional headshot of a man in business attire, neutral background", "square"),
    quote:
      "Our dispatchers reclaimed hours every day. My Web Helper understood the operational reality, not just the technical brief.",
    rating: 5,
    featured: true,
    order: 4
  },
  {
    _id: "t-5",
    name: "Sofia Bianchi",
    role: "Head of Marketing",
    company: "Lumen Analytics",
    avatar: img("professional headshot of a woman, minimal studio lighting", "square"),
    quote:
      "The rebrand and new site lifted demo requests by 64%. It finally reflects the ambition of the company.",
    rating: 5,
    featured: false,
    order: 5
  },
  {
    _id: "t-6",
    name: "James Whitmore",
    role: "CTO",
    company: "Skyline Realty",
    avatar: img("professional headshot of a man, corporate portrait", "square"),
    quote:
      "Fast, secure and maintainable. Their engineering standards are the highest we have seen from an agency partner.",
    rating: 5,
    featured: false,
    order: 6
  }
];
