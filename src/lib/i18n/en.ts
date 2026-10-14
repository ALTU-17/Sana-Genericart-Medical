/**
 * English copy for the whole site.
 *
 * This file is the source of truth: its shape becomes the `Dictionary` type,
 * so a missing or misspelled key in `mr.ts` fails the type check.
 */
export const en = {
  meta: {
    title: "Sana Medical | Generic Medicine Store in Chhatrapati Sambhajinagar (Aurangabad)",
    description:
      "Sana Medical, Swast Aushadi Seva - a generic medicine store at Chelipura, Naralibag, Chhatrapati Sambhajinagar (Aurangabad). Generic medicines at 30-70% off, baby care, supplements, surgicals and free home delivery. Open 10 am to 12 am, every day.",
    ogAlt: "Sana Medical - generic medicine store, Chelipura, Chhatrapati Sambhajinagar (Aurangabad)",
  },

  nav: {
    items: [
      { id: "home", label: "Home", href: "#home" },
      { id: "about", label: "Generic", href: "#about" },
      { id: "services", label: "Medicines", href: "#services" },
      { id: "gallery", label: "Store", href: "#gallery" },
      { id: "visit", label: "Timing", href: "#visit" },
      { id: "contact", label: "Contact", href: "#contact" },
    ],
    orderCta: "Order on WhatsApp",
    callCta: "Call",
    languageLabel: "मराठी",
    languageHint: "मराठीत वाचा",
  },

  common: {
    call: "Call",
    whatsapp: "WhatsApp",
    directions: "Directions",
    open: "Open now",
    closed: "Closed now",
  },

  a11y: {
    toggleLanguage: "Change the website language",
    openMenu: "Open the menu",
    closeMenu: "Close the menu",
    backToTop: "Back to top",
    openPhoto: "Open photo",
    closePhoto: "Close photo",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    storeMap: "Map showing the location of Sana Medical in Chelipura",
    logo: "Sana Medical logo",
    skipToContent: "Skip to main content",
    loading: "Loading the website",
  },

  loader: {
    brandSub: "स्वस्त औषधी सेवा",
    statuses: ["Checking the shelves", "Counting the strips", "Opening the shutters"],
    welcome: "Welcome",
    tip: "Generic medicines can cost 30% to 70% less than branded ones - with the same salt.",
  },

  hero: {
    badge: "30% - 70% off on generic medicines",
    eyebrow: "Chelipura · CSN (Aurangabad)",
    titleLead: "Same medicine.",
    titleAccent: "Smaller bill.",
    lead: "A neighbourhood chemist in Chelipura where the generic strip on the shelf does the same job as the costly brand you were prescribed. Honest advice, everyday essentials, and a pharmacist who answers your questions.",
    ctaCall: "Call the store",
    ctaWhatsapp: "Send your medicine list",
    ctaDirections: "Get directions",
    trustRow: "GeneriCart registered · Branch GMMH0906 · Open 10 am - 12 am, every day",
    imageCaption: "Our shop at Chelipura",
    stats: [
      { id: "discount", value: 70, suffix: "%", label: "off the branded price" },
      { id: "hours", value: 14, suffix: " hrs", label: "open every single day" },
      { id: "shelves", value: 8, suffix: "", label: "shelves of everyday care" },
    ],
    deliveryChip: "Free home delivery around Chelipura",
  },

  marquee: {
    items: [
      "Generic Medicine Stores",
      "Branch GMMH0906",
      "Chemist & Druggist",
      "GeneriCart registered",
      "Open 10 am - 12 am, every day",
      "30% - 70% OFF",
      "Qualified pharmacist on the counter",
      "Free home delivery nearby",
    ],
  },

  about: {
    eyebrow: "Your right, our duty",
    title: "Generic medicine is your right",
    lead: "A generic medicine carries the same active salt, in the same strength and dosage form, as the branded medicine you were prescribed. It costs a fraction of the price because the research has already been paid for - not because anything is missing from the tablet.",
    body: "That is the whole idea behind Sana Medical. Our shelves are built around generics, we will tell you honestly when a generic will do exactly the same job as a costly brand, and we will never push an expensive strip on you.",
    points: [
      {
        title: "Same salt, same effect",
        desc: "Same active ingredient, same strength and same dosage form as the branded medicine.",
      },
      {
        title: "30% to 70% cheaper",
        desc: "You pay for the medicine, not for the advertising behind a brand name.",
      },
      {
        title: "Stored and checked properly",
        desc: "Cold-chain items kept cool, and the expiry date checked on every strip we sell.",
      },
      {
        title: "Advice at the counter",
        desc: "A D.Pharm qualified pharmacist answers your dosage, timing and interaction questions.",
      },
    ],
    compareTitle: "What the discount actually means",
    compareBranded: "The branded pack",
    compareGeneric: "The generic equivalent",
    compareCaption: "An illustration, not a quotation - the exact saving depends on the salt and the pack size.",
    helplineTitle: "If a doctor refuses to prescribe a generic",
    helplineBody: "The Medical Council of India wants to hear about it. Call their toll-free helpline - you cannot be denied affordable medicine.",
    helplineCta: "Call the helpline",
    helplineLabel: "Toll-free helpline",
  },

  services: {
    eyebrow: "What we keep",
    title: "Everything a family pharmacy should have",
    lead: "From a single strip to a full month's course, and the small things you remember at 11 at night.",
    items: [
      {
        id: "generic",
        title: "Generic medicines",
        desc: "The same salt and strength as the brand you were prescribed, at 30% to 70% less.",
      },
      {
        id: "prescription",
        title: "Prescription medicines",
        desc: "Chronic and acute prescriptions filled in full, doses checked against your doctor's slip.",
      },
      {
        id: "mother-baby",
        title: "Mother & baby care",
        desc: "Infant formula, baby food, diapers, nursing essentials and paediatric vitamin drops.",
      },
      {
        id: "nutrition",
        title: "Nutrition & supplements",
        desc: "Protein powders, multivitamins, iron and calcium, and the supplements you keep taking.",
      },
      {
        id: "personal-care",
        title: "Personal care & skin",
        desc: "Daily soap, hair oil, oral care, and skin and hair medicines you cannot find elsewhere.",
      },
      {
        id: "devices",
        title: "Health devices",
        desc: "BP monitors, glucometers and strips, nebulisers, thermometers and oximeters.",
      },
      {
        id: "first-aid",
        title: "First aid & surgicals",
        desc: "Bandages, gauze, antiseptic, cotton, crepe rolls, knee caps, hot and cold packs.",
      },
      {
        id: "ayurvedic",
        title: "Ayurvedic & over the counter",
        desc: "Churnas and oils, balms, ORS, cough syrups and everyday remedies for the whole family.",
      },
    ],
    note: "Cannot find something? Call the store - if it is not on our shelf we will arrange it for you.",
  },

  gallery: {
    eyebrow: "Look inside",
    title: "Always stocked",
    lead: "Teal cabinets, packed shelves, and everything arranged so it can be found in a minute.",
    openHint: "Tap a photo to enlarge",
    items: [
      {
        id: "store-front",
        caption: "The shop at Chelipura",
        alt: "The Sana Medical storefront in Chelipura with its teal Sana Medical Swast Aushadi Seva signboard and the GeneriCart logo.",
      },
      {
        id: "interior-1",
        caption: "Shelves you can read at a glance",
        alt: "Inside Sana Medical, glass-fronted teal cabinets filled with rows of generic medicine strips and boxes.",
      },
      {
        id: "interior-2",
        caption: "Our counter and GeneriCart board",
        alt: "The serving counter at Sana Medical with the GeneriCart board, baby care products and a display of daily essentials.",
      },
    ],
  },

  visit: {
    eyebrow: "Come over",
    title: "Open every day, 10 am to 12 am",
    lead: "No lunch-hour shutters, no Sunday closure. If you need a strip at eleven at night, we are still here.",
    hoursTitle: "Store timing",
    addressTitle: "Address",
    landmark: "Landmark: Naralibag, Chelipura",
    mapTitle: "Find us on the map",
    mapOpen: "Open in Google Maps",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    today: "Today",
    sameEveryDay: "10 am - 12 am",
    note: "Timings on public holidays can change. A quick call before a long trip saves you the journey.",
    openNow: "Open right now",
    closedNow: "Closed right now",
    closesAt: "Closes at 12 am",
    reopensAt: "We reopen at 10 am",
    nowLabel: "It is {{time}} in the shop",
  },

  order: {
    eyebrow: "No queue",
    title: "Send a photo of your prescription",
    lead: "Three steps, and your medicines are waiting at the counter when you reach.",
    steps: [
      {
        id: "send",
        title: "Send us the list",
        desc: "WhatsApp a photo of your prescription, or simply type the medicine names.",
      },
      {
        id: "confirm",
        title: "We check and price it",
        desc: "We confirm what is in stock and message you the total. Nothing is charged before you agree.",
      },
      {
        id: "collect",
        title: "Pick up or get it home",
        desc: "Collect it at Chelipura, or we deliver nearby - free, on the way home.",
      },
    ],
    cta: "Send on WhatsApp",
    callCta: "Call instead",
    note: "Please send a clear, complete photo - the doctor's name, the medicine names and the strengths.",
    message:
      "Namaskar Sana Medical. I would like to order medicines. My list is attached below:",
    messageNoPhoto:
      "Namaskar Sana Medical. I would like to know if you have these medicines in stock:",
  },

  contact: {
    eyebrow: "Talk to us",
    title: "One call and it is kept ready",
    lead: "Ring the store line for stock and quick questions, or reach the proprietor directly if you need something arranged before you set out.",
    storeCard: "Store line",
    storeCardHint: "Best for stock, price and delivery questions",
    ownerCard: "Proprietor",
    ownerCardHint: "For anything you would rather discuss with the owner",
    call: "Call now",
    whatsapp: "WhatsApp",
    helplineCard: "Medical Council helpline",
    helplineHint: "Toll free, for reporting a refusal to prescribe a generic",
  },

  faq: {
    eyebrow: "Questions",
    title: "Things people ask us at the counter",
    items: [
      {
        q: "Do you have generic versions of branded medicines?",
        a: "Yes. Our shelves are built around generics, and we keep a generic for almost every common prescription. Bring the strip you were prescribed and we will show you the equivalent.",
      },
      {
        q: "Can I send my prescription on WhatsApp?",
        a: "Please do. Send a clear photo of the prescription, or type the medicine names with their strengths. We reply with availability and price before you commit to anything.",
      },
      {
        q: "Do you deliver?",
        a: "We deliver free in and around Chelipura and Naralibag, and across most of Chhatrapati Sambhajinagar (Aurangabad) for larger orders. Call the store once to confirm your area.",
      },
      {
        q: "Do I need a prescription?",
        a: "Not for everything. Baby food, supplements, devices, first aid and over-the-counter remedies are sold freely. For scheduled prescription medicines we need a valid prescription, as the law requires.",
      },
      {
        q: "Are you open on Sundays and holidays?",
        a: "Yes. We open at 10 am and close at midnight every single day, Sunday included. On public holidays we may open a little later, so a quick call saves you a trip.",
      },
      {
        q: "What if my doctor refuses to prescribe a generic?",
        a: "Generic medicine is your right. You can report the refusal to the Medical Council of India on their toll-free helpline, 1800 111 154.",
      },
    ],
  },

  footer: {
    blurb: "A neighbourhood generic medicine store in Chelipura, run by Mubeen Sardar Patel (D.Pharm). Same medicines, smaller bill.",
    quickLinks: "Explore",
    reachUs: "Reach us",
    timing: "Timing",
    openDaily: "Open every day",
    hours: "10:00 am - 12:00 am",
    managedBy: "Proprietor: Mubeen Sardar Patel (D.Pharm)",
    rights: "All rights reserved.",
    disclaimer: "Medicines are dispensed against a valid prescription wherever the law requires one. This website is for information only and is not a substitute for a doctor's advice.",
    credit: "Website designed and built for Sana Medical.",
    developer: {
      label: "Developed by",
      portfolio: "Portfolio",
      phone: "Phone",
      email: "Email",
    },
  },
};

export type Dictionary = typeof en;
