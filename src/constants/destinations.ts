// ✅ Define strict types
export type DestinationSize = "tall" | "square";

export interface Destination {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  rating: number;
  size: DestinationSize;
}

// ✅ Clean, validated dataset
export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    title: "The Taj Mahal Palace",
    location: "Mumbai, India",
    price: 450,
    image: "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg",
    rating: 4.9,
    size: "tall",
  },
  {
    id: "21",
    title: "Aman Tokyo",
    location: "Tokyo, Japan",
    price: 1200,
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg",
    rating: 5.0,
    size: "square",
  },
  {
    id: "24",
    title: "Hotel Ritz Paris",
    location: "Paris, France",
    price: 1500,
    image: "https://images.pexels.com/photos/2363345/pexels-photo-2363345.jpeg",
    rating: 5.0,
    size: "tall",
  }, // ✅ FIXED COMMA HERE
  {
    id: "5",
    title: "Taj Lake Palace",
    location: "Udaipur, India",
    price: 750,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    rating: 4.9,
    size: "square",
  },
  {
    id: "6",
    title: "Rambagh Palace",
    location: "Jaipur, India",
    price: 800,
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    rating: 5.0,
    size: "tall",
  },
];