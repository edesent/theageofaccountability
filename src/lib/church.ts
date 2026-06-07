export const SITE_URL = "https://perthbible.church";

export const CONTACT = {
  email: "office@perthbiblechurch.org",
  phone: "518-533-0082",
  address: "1863 County Hwy 107, Amsterdam, NY 12010",
  maps:
    "https://maps.app.goo.gl/APy5vWc79FNCGvc19",
};

export const SERVICE_TIMES = [
  { label: "Sunday School", time: "9:00 AM" },
  { label: "Sunday Morning Service", time: "10:00 AM" },
  { label: "Sunday Evening Service", time: "6:00 PM" },
  { label: "Wednesday Bible Study", time: "6:30 PM" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/perthbible/" },
  { label: "Instagram", href: "https://www.instagram.com/perthbible/" },
  { label: "YouTube", href: "https://www.youtube.com/@perthbiblechurch3230" },
];

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "I'm New", href: "/imnew" },
  { label: "Who We Are", href: "/who-we-are" },
  {
    label: "Connect",
    href: "/connect",
    children: [
      { label: "Children", href: "/children" },
      { label: "Teens", href: "/aliveyouth" },
      { label: "Young Adults", href: "/young-adults" },
      { label: "Senior Saints", href: "/senior-saints" },
      { label: "Men", href: "/men" },
      { label: "Women", href: "/women" },
      { label: "Groups", href: "/groups" },
      { label: "Outreach", href: "/outreach" },
      { label: "Serve", href: "/serve" },
    ],
  },
  { label: "Upcoming", href: "/upcoming" },
  { label: "Academy", href: "/pbca" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Biblical Counseling", href: "/biblical-counseling" },
      { label: "Celebrate Recovery", href: "/celebraterecovery" },
      { label: "Prayer Requests", href: "/prayer" },
      { label: "Church Newsletter", href: "/church-newsletter" },
      { label: "Facilities Request", href: "/facilities" },
      { label: "Ministry Reports", href: "/ministry-reports" },
      { label: "Memorials", href: "/memorials" },
      { label: "Volunteer Signup", href: "/volunteer-signup" },
    ],
  },
  { label: "Watch", href: "/watch" },
  { label: "Give", href: "/give" },
];

export type Card = {
  title: string;
  text: string;
  href?: string;
  image?: string;
};

export type ChurchPage = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  heroImage?: string;
  intro?: string;
  sections: {
    title: string;
    body?: string;
    items?: string[];
  }[];
  cards?: Card[];
  cta?: {
    label: string;
    href: string;
    text: string;
  };
};

const ministryCards: Card[] = [
  {
    title: "Children",
    text: "Safe, age-appropriate Sunday and Wednesday environments where children learn about Jesus.",
    href: "/children",
    image: "/church/children.jpeg",
  },
  {
    title: "Teens",
    text: "AliveYouth gives students a place to grow in Scripture, friendships, worship, and service.",
    href: "/aliveyouth",
    image: "/church/youth.jpeg",
  },
  {
    title: "Young Adults",
    text: "A community for post-high-school adults to study, pray, serve, and walk with Christ together.",
    href: "/young-adults",
    image: "/church/missions.jpg",
  },
  {
    title: "Women",
    text: "Bible studies, discipleship, and gatherings that encourage women to follow Jesus faithfully.",
    href: "/women",
    image: "/church/women.jpeg",
  },
  {
    title: "Men",
    text: "Men's Bible studies and events focused on practical faith, friendship, and spiritual leadership.",
    href: "/men",
    image: "/church/men.jpg",
  },
  {
    title: "Outreach",
    text: "Local and global ministry opportunities for proclaiming the gospel and serving our neighbors.",
    href: "/outreach",
    image: "/church/missions.jpg",
  },
];

const resourceCards: Card[] = [
  {
    title: "Biblical Counseling",
    text: "Care rooted in Scripture for people walking through hard seasons, decisions, and relationships.",
    href: "/biblical-counseling",
  },
  {
    title: "Prayer Requests",
    text: "Share a request with the church team so the body can pray with you and for you.",
    href: "/prayer",
  },
  {
    title: "Church Newsletter",
    text: "Monthly updates, announcements, and ways to stay connected with the Perth Bible family.",
    href: "/church-newsletter",
  },
  {
    title: "Facilities Request",
    text: "Request space or support for ministry events and church-connected gatherings.",
    href: "/facilities",
  },
  {
    title: "Volunteer Signup",
    text: "Find a serving opportunity that matches your gifts, availability, and ministry burden.",
    href: "/volunteer-signup",
  },
  {
    title: "Church App",
    text: "Sermons, updates, giving, and event information in one place.",
    href: "https://subsplash.com/perthbiblechurch/app",
  },
];

export const PAGES: ChurchPage[] = [
  {
    slug: "imnew",
    title: "We're Excited to Meet You",
    eyebrow: "Plan your visit",
    summary: "Worship with Perth Bible Church on Sundays at 10:00 AM and 6:00 PM.",
    heroImage: "/church/im-new.jpg",
    intro:
      "A typical service lasts about 90 minutes. You can expect a mix of contemporary and traditional music, biblical preaching, friendly people, and childcare for ages up through 4th grade.",
    sections: [
      {
        title: "Location",
        body: CONTACT.address,
        items: ["Use the main entrance and our greeters will help you find the auditorium, children's check-in, or a class."],
      },
      {
        title: "What to Expect",
        body:
          "Come as you are. Perth Bible is made up of imperfect people with every kind of story imaginable, and the church wants guests to find the love, grace, and forgiveness Jesus gives.",
      },
      {
        title: "Frequently Asked Questions",
        items: [
          "Wear what is comfortable. The church cares more about your presence than your attire.",
          "If you have children, visit the Adventure Time check-in area when you arrive.",
          "Plan to stay after service for fellowship and meeting new people.",
        ],
      },
    ],
    cta: {
      label: "Get Directions",
      href: CONTACT.maps,
      text: "First time guest? Start with the address, service time, and a warm hello at the door.",
    },
  },
  {
    slug: "who-we-are",
    title: "Who We Are",
    eyebrow: "About Perth Bible",
    summary: "A church family seeking to love God absolutely and love others sacrificially.",
    heroImage: "/church/hero.jpeg",
    intro:
      "Perth Bible Church is a family of imperfect people who are unrelenting in the desire to be like Jesus in character and action.",
    sections: [
      {
        title: "Where We Come From",
        body:
          "The church's roots reach back to Scottish immigrants who settled in Perth, New York in the mid 1770s. More than two centuries later, Perth Bible continues that legacy of worship, instruction, and gospel witness.",
      },
      {
        title: "Where We're Headed",
        items: [
          "Maintain regular services for instruction and public worship.",
          "Proclaim salvation through personal faith in Christ's finished work.",
          "Cooperate through prayer, gifts, and service to preach the gospel to the world.",
          "Promote systematic Bible study and training for Christian service.",
          "Practice true religion and Christian philanthropy as taught in Scripture.",
        ],
      },
      {
        title: "What This Means for You",
        body:
          "Wherever you are in your faith journey, you are welcome at Perth Bible Church. There is a seat for you, a next step for you, and people ready to walk with you.",
      },
    ],
    cards: [
      { title: "What We Believe", text: "Core doctrines and the convictions that shape worship, ministry, and mission.", href: "/what-we-believe" },
      { title: "Membership", text: "Learn how to belong, serve, and commit to the Perth Bible church family.", href: "/membership" },
      { title: "Contact Us", text: "Talk with a person on the leadership team or ask a question before visiting.", href: `mailto:${CONTACT.email}` },
    ],
  },
  {
    slug: "connect",
    title: "Connect",
    eyebrow: "Find your people",
    summary: "Every age and season has a place to grow, serve, and be known.",
    heroImage: "/church/upcoming.jpg",
    sections: [
      {
        title: "Ministry Life",
        body:
          "Connection at Perth Bible is practical: Bible study, prayer, fellowship, serving, outreach, and age-specific discipleship.",
      },
      {
        title: "Start Here",
        items: ["Pick a ministry below.", "Visit on Sunday.", "Ask a ministry leader how to take the next step."],
      },
    ],
    cards: ministryCards,
  },
  {
    slug: "children",
    title: "Children",
    eyebrow: "Adventure Time",
    summary: "Safe, age-appropriate ministry for infants through 4th grade on Sundays.",
    heroImage: "/church/children.jpeg",
    sections: [
      {
        title: "Sunday Programs",
        body:
          "Children experience creative and relevant environments where they learn about Jesus. Adventure Time meets Sundays at 10:00 AM and 6:00 PM.",
      },
      {
        title: "Your First Visit",
        items: [
          "Look for the first-time families area at the Adventure Time table.",
          "A volunteer will help check in your child and guide them to their room.",
          "Parents receive a matching tag for secure checkout after service.",
        ],
      },
      {
        title: "Wednesday Programs",
        body:
          "Kids age 3 through 6th grade are welcome for Word of Life Gophers and Olympians on Wednesday evenings from 6:30 to 8:00 PM.",
      },
    ],
  },
  {
    slug: "aliveyouth",
    title: "Teens",
    eyebrow: "AliveYouth",
    summary: "Middle and high school students growing in Christ, community, and service.",
    heroImage: "/church/youth.jpeg",
    sections: [
      {
        title: "A Place to Grow",
        body:
          "AliveYouth helps students build friendships, study Scripture, ask honest questions, and learn what faithfulness looks like in daily life.",
      },
      {
        title: "Weekly Rhythm",
        items: ["Sunday youth class at 9:00 AM.", "Wednesday youth Bible study at 6:30 PM.", "Seasonal events, service opportunities, and retreats."],
      },
    ],
  },
  {
    slug: "young-adults",
    title: "Young Adults",
    eyebrow: "Life together",
    summary: "A ministry for young adults seeking Scripture, friendship, prayer, and purpose.",
    heroImage: "/church/missions.jpg",
    sections: [
      {
        title: "Faith After High School",
        body:
          "This ministry creates space for young adults to keep growing in Christ while navigating college, work, relationships, and calling.",
      },
      {
        title: "What to Expect",
        items: ["Bible-centered discussion.", "Prayer and fellowship.", "Opportunities to serve inside and outside the church."],
      },
    ],
  },
  {
    slug: "senior-saints",
    title: "Senior Saints",
    eyebrow: "55 and up",
    summary: "Fellowship, encouragement, and faithful service for older adults.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Encouragement and Fellowship",
        body:
          "Senior Saints gathers adults 55 and up for friendship, prayer, encouragement, and meaningful ministry involvement.",
      },
      {
        title: "Stay Connected",
        items: ["Watch for calendar events.", "Invite someone to join you.", "Serve the church through prayer, hospitality, and discipleship."],
      },
    ],
  },
  {
    slug: "men",
    title: "Men",
    eyebrow: "Men's Ministry",
    summary: "Bible study, accountability, and service for men of Perth Bible Church.",
    heroImage: "/church/men.jpg",
    sections: [
      {
        title: "Strengthened by Scripture",
        body:
          "Men's ministry exists to help men follow Jesus with humility, courage, integrity, and love for their homes, church, and neighbors.",
      },
      {
        title: "Ways to Join",
        items: ["Come to a men's Bible study.", "Watch the men's calendar for gatherings.", "Ask about serving alongside other men."],
      },
    ],
  },
  {
    slug: "women",
    title: "Women",
    eyebrow: "Women's Ministry",
    summary: "Bible studies, discipleship, and encouragement for women in every season.",
    heroImage: "/church/women.jpeg",
    sections: [
      {
        title: "Rooted Together",
        body:
          "Women's ministry provides spaces for study, prayer, discipleship, friendship, and encouragement in the Word.",
      },
      {
        title: "Ways to Join",
        items: ["Join a women's Bible study.", "Invite someone to a gathering.", "Serve through care, hospitality, and mentoring."],
      },
    ],
  },
  {
    slug: "groups",
    title: "Groups",
    eyebrow: "Discipleship",
    summary: "Smaller settings for Bible study, prayer, care, and spiritual growth.",
    heroImage: "/church/upcoming.jpg",
    sections: [
      {
        title: "Why Groups Matter",
        body:
          "Groups help the church move from rows to relationships. They make room for prayer, discussion, practical care, and steady growth.",
      },
      {
        title: "Find a Fit",
        items: ["Ask about current adult Bible studies.", "Try a group before committing.", "Bring questions and a willingness to know others."],
      },
    ],
  },
  {
    slug: "outreach",
    title: "Outreach",
    eyebrow: "Mission",
    summary: "Serving neighbors and supporting gospel witness near and far.",
    heroImage: "/church/missions.jpg",
    sections: [
      {
        title: "Local and Global Witness",
        body:
          "Perth Bible wants the gospel proclaimed in the community and around the world through prayer, generosity, relationships, and hands-on service.",
      },
      {
        title: "Take Part",
        items: ["Pray for missionaries and local outreach.", "Join a service opportunity.", "Invite someone to worship with you."],
      },
    ],
  },
  {
    slug: "serve",
    title: "Serve",
    eyebrow: "Use your gifts",
    summary: "Find a ministry role where your gifts can strengthen the church.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Serving Is Family Life",
        body:
          "Every believer has a part to play. Serving helps the church care for people, welcome guests, disciple children, support worship, and reach the community.",
      },
      {
        title: "Common Teams",
        items: ["Children and youth ministry.", "Greeting and hospitality.", "Music and media.", "Facilities and events.", "Outreach and care."],
      },
    ],
    cta: {
      label: "Volunteer Signup",
      href: "/volunteer-signup",
      text: "Tell the team where you are interested in serving and someone will follow up.",
    },
  },
  {
    slug: "upcoming",
    title: "Upcoming",
    eyebrow: "Church calendar",
    summary: "See what's happening in every ministry of Perth Bible Church.",
    heroImage: "/church/upcoming.jpg",
    sections: [
      {
        title: "Highlighted Calendars",
        body:
          "Use the ministry calendars to follow church-wide events, children's ministry, AliveYouth, men's and women's ministry, missions, facilities, and Senior Saints.",
      },
    ],
    cards: [
      { title: "Church-Wide Calendar", text: "Main events and gatherings for the whole church family.", href: "/general-calendar", image: "/church/hero.jpeg" },
      { title: "Upcoming Events", text: "Featured church events and current opportunities.", href: "/events-calendar", image: "/church/upcoming.jpg" },
      { title: "Children's Calendar", text: "Adventure Time and children's ministry dates.", href: "/children-s-calendar", image: "/church/children.jpeg" },
      { title: "AliveYouth Calendar", text: "Events and gatherings for teens.", href: "/youth-calendar", image: "/church/youth.jpeg" },
      { title: "Men's Calendar", text: "Men's Bible studies and gatherings.", href: "/men-s-ministry-calendar", image: "/church/men.jpg" },
      { title: "Women's Calendar", text: "Women's ministry studies and gatherings.", href: "/women-s-ministry-calendar", image: "/church/women.jpeg" },
    ],
  },
  {
    slug: "pbca",
    title: "Perth Bible Christian Academy",
    eyebrow: "Academy",
    summary: "Academic excellence. Biblical foundation. Serving grades K3-12.",
    heroImage: "/church/im-new.jpg",
    intro:
      "PBCA partners with parents to raise Christian leaders who think clearly and live faithfully.",
    sections: [
      {
        title: "How PBCA Works",
        body:
          "Early learners receive teacher-led instruction that builds a strong foundation. As students grow, PBCA uses a mastery-based approach so students do not advance with gaps.",
      },
      {
        title: "Next Steps",
        items: ["Request information.", "Schedule a short call.", "Attend a family meeting and student visit/testing."],
      },
      {
        title: "Contact",
        body: "Email academy@perthbiblechurch.org or call 518-533-0082.",
      },
    ],
    cards: [
      { title: "New Student Application", text: "Begin the admissions journey for your family.", href: "https://subsplash.com/u/-BW3DWC/forms/d/5a53d65e-0dc2-4a16-b942-64121660ae7e" },
      { title: "Re-Enrollment", text: "Secure your student's spot for the next school year.", href: "https://subsplash.com/u/-BW3DWC/forms/d/8b4c1a20-7318-4ab7-a014-2193d0501a0d" },
      { title: "Tuition Payment", text: "Make an online tuition or fundraiser payment.", href: "https://give.tithe.ly/?formId=bd74f440-d19b-11ee-90fc-1260ab546d11" },
    ],
  },
  {
    slug: "resources",
    title: "Resources",
    eyebrow: "Help and next steps",
    summary: "Forms, care, media, prayer, and tools for church life.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Everything in One Place",
        body:
          "Use these resources to request prayer, connect with counseling, download the app, sign up to serve, or access church forms.",
      },
    ],
    cards: resourceCards,
  },
  {
    slug: "biblical-counseling",
    title: "Biblical Counseling",
    eyebrow: "Care",
    summary: "Scripture-shaped care for people walking through difficult seasons.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Counsel Rooted in Scripture",
        body:
          "Biblical counseling brings the truth, comfort, and wisdom of God's Word into real struggles with compassion and practical care.",
      },
      {
        title: "Start a Conversation",
        items: ["Share a brief description of what is going on.", "A ministry leader will follow up.", "Care is handled with seriousness and discretion."],
      },
    ],
    cta: { label: "Email the Office", href: `mailto:${CONTACT.email}`, text: "Reach out and the church team will help you take the next step." },
  },
  {
    slug: "celebraterecovery",
    title: "Celebrate Recovery",
    eyebrow: "Recovery",
    summary: "A Christ-centered path for hurts, habits, and hang-ups.",
    heroImage: "/church/upcoming.jpg",
    sections: [
      {
        title: "Hope and Honesty",
        body:
          "Celebrate Recovery creates a place to pursue healing with biblical truth, honest community, and practical next steps.",
      },
      {
        title: "You Are Welcome",
        items: ["Come with questions.", "Move at a faithful pace.", "Invite someone who needs hope and support."],
      },
    ],
  },
  {
    slug: "prayer",
    title: "Prayer Requests",
    eyebrow: "Pray with us",
    summary: "Share a request so the church can pray with you.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Prayer Is Family Work",
        body:
          "The church wants to carry burdens together. Share what you can, and the team will pray faithfully.",
      },
      {
        title: "Helpful Details",
        items: ["Your name and contact information.", "What you would like prayer for.", "Whether the request may be shared more broadly."],
      },
    ],
    cta: { label: "Send a Prayer Request", href: `mailto:${CONTACT.email}`, text: "Email the church office and include 'Prayer Request' in the subject." },
  },
  {
    slug: "church-newsletter",
    title: "Church Newsletter",
    eyebrow: "Stay current",
    summary: "Monthly updates, ministry highlights, and church family news.",
    heroImage: "/church/upcoming.jpg",
    sections: [
      {
        title: "Know What's Happening",
        body:
          "The newsletter keeps you current on upcoming events, church announcements, ministry needs, and ways to pray.",
      },
    ],
    cta: { label: "Sign Up", href: "http://eepurl.com/iLck7U", text: "Join the email list for regular Perth Bible updates." },
  },
  {
    slug: "facilities",
    title: "Facilities Request",
    eyebrow: "Church forms",
    summary: "Request rooms, setup, or facilities support for ministry events.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Plan With Clarity",
        body:
          "Facilities requests help the church coordinate calendars, rooms, setup, and support for ministry gatherings.",
      },
      {
        title: "Include These Details",
        items: ["Event name and ministry.", "Date and time.", "Room or setup needs.", "Main contact person."],
      },
    ],
  },
  {
    slug: "ministry-reports",
    title: "Ministry Reports",
    eyebrow: "Stewardship",
    summary: "Updates and reports from ministry areas across Perth Bible Church.",
    heroImage: "/church/upcoming.jpg",
    sections: [
      {
        title: "Shared Ministry Awareness",
        body:
          "Reports help leaders and members understand what God is doing, what needs prayer, and where support is needed.",
      },
    ],
  },
  {
    slug: "memorials",
    title: "Memorials",
    eyebrow: "Remembering faithfully",
    summary: "Information for memorial gifts and honoring loved ones.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Care in Grief",
        body:
          "The church walks with families through seasons of grief and helps coordinate memorial information with care.",
      },
    ],
    cta: { label: "Contact the Office", href: `mailto:${CONTACT.email}`, text: "For memorial details, reach out to the church office." },
  },
  {
    slug: "volunteer-signup",
    title: "Volunteer Signup",
    eyebrow: "Serve",
    summary: "Let the church know where you are ready to help.",
    heroImage: "/church/missions.jpg",
    sections: [
      {
        title: "There Is a Place to Serve",
        body:
          "Whether you are gifted in hospitality, teaching, music, media, facilities, care, or outreach, your service strengthens the body.",
      },
      {
        title: "Common Serving Areas",
        items: ["Children and youth.", "Welcome team.", "Music and media.", "Facilities and events.", "Outreach and missions."],
      },
    ],
    cta: { label: "Email Interest", href: `mailto:${CONTACT.email}`, text: "Tell the team where you would like to serve." },
  },
  {
    slug: "watch",
    title: "Watch",
    eyebrow: "Sermons",
    summary: "Catch up on recent sermons and browse the media library.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Most Recent Messages",
        body:
          "Perth Bible's media library includes recent services and sermon series so you can stay connected when you are away.",
      },
      {
        title: "Browse By",
        items: ["Series.", "Topics.", "Speakers.", "Scripture."],
      },
    ],
    cta: { label: "Open Sermon Library", href: "https://subsplash.com/u/-BW3DWC/media", text: "Watch sermons through Perth Bible's media library." },
  },
  {
    slug: "give",
    title: "Giving",
    eyebrow: "Worship through generosity",
    summary: "For where your treasure is, there your heart will be also. Matthew 6:21",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Why Give?",
        body:
          "God is generous and calls his people to generosity. Giving helps proclaim the gospel and supports the ministry of the church.",
      },
      {
        title: "Ways to Give",
        items: [
          "Give online.",
          "Give in person using designated giving boxes in the auditorium.",
          `Mail a check to ${CONTACT.address}.`,
        ],
      },
    ],
    cta: { label: "Give Online", href: "https://give.tithe.ly/?formId=bd74f440-d19b-11ee-90fc-1260ab546d11", text: "Online giving is available through Tithe.ly." },
  },
  {
    slug: "what-we-believe",
    title: "What We Believe",
    eyebrow: "Doctrine",
    summary: "Biblical convictions that guide worship, discipleship, and mission.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Centered on the Gospel",
        body:
          "Perth Bible Church proclaims salvation through personal faith in Christ's finished work and seeks to shape every ministry by Scripture.",
      },
      {
        title: "Core Commitments",
        items: ["The authority of Scripture.", "The finished work of Jesus Christ.", "Regular public worship and Bible instruction.", "Gospel witness to all the world.", "Christian service, mercy, and discipleship."],
      },
    ],
  },
  {
    slug: "membership",
    title: "Membership",
    eyebrow: "Belong",
    summary: "A committed way to belong, serve, and help carry the mission of the church.",
    heroImage: "/church/hero.jpeg",
    sections: [
      {
        title: "Why Membership?",
        body:
          "Membership gives visible shape to church family life: shared doctrine, shared care, shared service, and shared mission.",
      },
      {
        title: "Next Steps",
        items: ["Attend regularly.", "Learn the church's beliefs and expectations.", "Talk with a leader about membership."],
      },
    ],
  },
  {
    slug: "home",
    title: "Welcome Home",
    eyebrow: "Perth Bible Church",
    summary: "Love God absolutely. Love others sacrificially.",
    heroImage: "/church/hero.jpeg",
    sections: [],
  },
];

export const PAGE_BY_SLUG = new Map(PAGES.map((page) => [page.slug, page]));

export const PAGE_SLUGS = PAGES.map((page) => page.slug);

export function getPage(slug: string) {
  return PAGE_BY_SLUG.get(slug);
}

export function getNavCards(items = NAV_ITEMS): Card[] {
  return items
    .flatMap((item) => item.children ?? [item])
    .filter((item) => item.href.startsWith("/") && item.href !== "/")
    .map((item) => ({
      title: item.label,
      text: `Explore ${item.label.toLowerCase()} at Perth Bible Church.`,
      href: item.href,
    }));
}
