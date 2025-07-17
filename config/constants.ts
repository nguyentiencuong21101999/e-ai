export const pathNamePrevent = ["/sign-in", "/forget-password", "/signup"];

export const listMenu1 = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Comps", href: "/" },
  { id: 3, label: "My Entries", href: "/entries" },
  { id: 4, label: "My Settings", href: "/" },
  { id: 5, label: "Invite your mates", href: "/" },
];

export const listMenuMore = [
  { id: 1, label: "Results", href: "/" },
  { id: 2, label: "Event Calender", href: "/" },
  { id: 3, label: "Terms and Conditions", href: "/" },
  { id: 4, label: "Privacy Policy", href: "/" },
  { id: 5, label: "Code of Conduct", href: "/" },
];

export const listMenuHelp = [
  { id: 1, label: "Live Chat", href: "/" },
  { id: 2, label: "Get Help", href: "/" },
  { id: 3, label: "Responsible Gambling", href: "/" },
  { id: 4, label: "Give Feedback", href: "/" },
];


const { env } = process
export const GOOGLE_PLACE_API_KEY =
  env.NEXT_PUBLIC_BASE_GOOGLE_PLACE_API_KEY;

export const BE_API_KEY = env.NEXT_PUBLIC_BE_API_KEY;

export const ENTRY_TYPE_FRONT = 0;
export const ENTRY_TYPE_BACK = 1;



export const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};
