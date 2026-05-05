export const index = [
    { id: 1, name: "Elif Yılmaz" },
    { id: 2, name: "Mert Kaya" },
    { id: 3, name: "Zeynep Demir" }
];

export const offers=[
    {
        id:1,
        text:"Leave a support message or follow index! There’s no race condition with likes. " +
            "You can show your support without a like button!"
    },
    {
        id:2,
        text: "We prioritize anonymity, so you can support others without revealing who you are."
    }
];

export const offerImages = {
    img1: "/images/donate-icons/donate-tea-icon.png",
    alt1: "donate-tea",
    img2: "/images/donate-icons/donate-cookie-icon.png",
    alt2: "donate-cookie",
    img3: "/images/donate-icons/donate-both-icon.png",
    alt3: "donate-both"
};

export const frequentlyAskedQuestions=[
    {
        id:1,
        question:"Who uses cookie and tea?",
        answer:"If you have people who follow your work, this space is for you. From video creators " +
            "and musicians to writers, developers, and beyond—anyone creating something meaningful can join. " +
            "Cookie and Tea connects creators with a community that’s ready to support them."
    },
    {
        id:2,
        question: "How do I get paid?",
        answer: "Get your earnings sent straight to your bank account. We currently support reliable payouts " +
            "for creators across 110+ countries, so you can access your money with ease."
    },
    {
        id: 3,
        question: "How can my audience pay?",
        answer: "We support all major credit and debit cards, Apple Pay, Google Pay, Cash App and " +
            "other global payment methods."
    },
    {
        id:4,
        question: "Is there a fee to use cookie and tea?",
        answer: "We do not charge a monthly fee. All features including publishing and emails are free for everyone. " +
            "We charge a 5% transaction fee, and creators keep 95% of the earnings. We make money only when you do. " +
            "We'll never show ads and we'll never sell your data."
    },
    {
        id:5,
        question: "Is cookie and tea safe and reliable?",
        answer: "We take security seriously and keep things simple and reliable. Here’s how we protect your data and your supporters:\n" +
            "We don’t store any payment details on our servers. Donations are handled through trusted third-party providers.\n" +
            "We use modern protection tools (like Arcjet or similar) to guard against abuse and keep the platform safe.\n" +
            "The platform runs over secure connections (SSL) and follows standard best practices to protect your data.\n"
    }
];

export const yourPassionSocialPlatforms=[
    {
        id:1,
        name:"X"
    },
    {
        id:2,
        name: "Instagram"
    }
]
export const yourPassionReviews =[
    {
        id:1,
        social_platform_id:1,
        name:"angel",
        username:"angelscorner",
        account_url:"https://x.com/",
        image_url:"/images/people/angel.jpg",
        review:"Used #CookieAndTea as a creator, and in just 2 weeks, made $95! 🍪🍵\n"+
            "Hey, I’m Angel (@angelscorner). As a woman building my own content, " +
            "I didn’t expect support to come this easily. The platform is super " +
            "simple — no friction, just genuine support from people who enjoy what you do. " +
            "Who knew strangers would send you cookies and tea?" +
            "Check out @cookieandtea and share the warmth!"
    },
    {
        id:2,
        social_platform_id:1,
        name:"john",
        username:"johnscorner",
        account_url:"https://x.com/",
        image_url:"/images/people/john.jpg",
        review:"I’m John (@Johnscorner). Gave #CookieAndTea a shot and ended up making $130 in 2 weeks 🍪🍵\n" +
            "What I like most is how simple it is — no pressure, just genuine support from your audience. " +
            "It’s a small thing, but it really makes a difference when you’re building something. " +
            "Check out @cookieandtea"
    },
    {
        id:3,
        social_platform_id:2,
        name:"kate",
        username:"katescorner",
        account_url: "https://www.instagram.com/",
        image_url:"/images/people/kate.jpg",
        review:"Used #CookieAndTea as a creator, and in just 2 weeks, made $95! 🍪🍵\n"+
            "Hey, I’m Kate (@katescorner). As a woman building my own content, " +
            "I didn’t expect support to come this easily. The platform is super " +
            "simple — no friction, just genuine support from people who enjoy what you do. " +
            "Who knew strangers would send you cookies and tea?\n" +
            "Check out @cookieandtea and share the warmth!"
    },
    {
        id:4,
        social_platform_id:2,
        name:"mike",
        username:"mikescorner",
        account_url: "https://www.instagram.com/",
        image_url:"/images/people/mike.jpg",
        review:"I’m Mike (@mikescorner). Gave #CookieAndTea a shot and ended up making $130 in 2 weeks 🍪🍵\n" +
            "What I like most is how simple it is — no pressure, just genuine support from your audience. " +
            "It’s a small thing, but it really makes a difference when you’re building something.\n" +
            "Check out @cookieandtea"
    },
]

export const profile = [
    {
        user_id: 1,
        name: "angel",
        username: "angelscorner",
        about: "Hi, I’m Angel, a 25-year-old who loves capturing little moments through my camera. " +
            "Photography is just a hobby for me, but it’s something that brings me a lot of joy. " +
            "When I’m not taking photos, I’m usually spending time with dogs or exploring new places. " +
            "If you enjoy what I share, you can support me here on Cookie and Tea ☕",
        backgroundImage:"/images/profile/angels-background.jpg",
        backgroundAlt:"angels-background-img",
        profileImage:"/images/people/angel.jpg",
        profileAlt: "angels-profile-image",
        earnings:{
            "Last 30 days":85,
            "Last 90 days":500,
            "Yearly":2000,
        },
        socials:[
            {
                name:"twitter",
                url:"https://x.com/"
            },
            {
                name:"instagram",
                url:"https://www.instagram.com/"
            },
            {
                name:"pinterest",
                url:""
            },
            {
                name:"youtube",
                url:""
            }
        ],
    },
    {
        user_id: 2,
        name: "John",
        username: "johnscorner",
        about: "Hi, I’m John.",
        backgroundImage:"",
        backgroundAlt:"",
        profileImage:"/images/people/john.jpg",
        profileAlt: "johns-profile-image",
        earnings:{
            "Last 30 days":85,
            "Last 90 days":500,
            "Yearly":2000,
        },
        socials:[
            {
                name:"twitter",
                url:"https://x.com/"
            },
            {
                name:"instagram",
                url:"https://www.instagram.com/"
            },
            {
                name:"pinterest",
                url:""
            },
            {
                name:"youtube",
                url:""
            }
        ],
    },
    {
        user_id: 3,
        name: "Kate",
        username: "katescorner",
        about: "Hi, I’m Kate.",
        backgroundImage:"",
        backgroundAlt:"",
        profileImage:"/images/people/kate.jpg",
        profileAlt: "kates-profile-image",
        earnings:{
            "Last 30 days":85,
            "Last 90 days":500,
            "Yearly":2000,
        },
        socials:[
            {
                name:"twitter",
                url:"https://x.com/"
            },
            {
                name:"instagram",
                url:"https://www.instagram.com/"
            },
            {
                name:"pinterest",
                url:""
            },
            {
                name:"youtube",
                url:""
            }
        ],
    },
    {
        user_id: 4,
        name: "Mike",
        username: "mikescorner",
        about: "Hi, I’m Mike.",
        backgroundImage:"",
        backgroundAlt:"",
        profileImage:"/images/people/mike.jpg",
        profileAlt: "mikes-profile-image",
        earnings:{
            "Last 30 days":85,
            "Last 90 days":500,
            "Yearly":2000,
        },
        socials:[
            {
                name:"twitter",
                url:"https://x.com/"
            },
            {
                name:"instagram",
                url:"https://www.instagram.com/"
            },
            {
                name:"pinterest",
                url:""
            },
            {
                name:"youtube",
                url:""
            }
        ],
    }
];

export const posts = [
    {
        id:1,
        posts:[
            {
                user_id:1,
                post_id:1,
                post_type:"text",
                post_date: "23/04/2026",
                post_header: "First Day of Spring",
                post_detail: "Soft light, fresh air, and a quiet reminder that new beginnings are here 🌿. Soft light spills " +
                    "gently across everything, turning even the simplest corners into something a little more special. The air feels lighter, " +
                    "fresher—like the world has quietly reset itself overnight. There’s a calm kind of energy in these " +
                    "first days of spring, where nothing is rushed but everything feels possible.\n" +
                    "\n" +
                    "Walking outside, you start to notice the small changes—the way the sunlight lingers a bit longer, " +
                    "the subtle colors returning to trees and streets, the quiet sounds of life coming back. It’s not loud or " +
                    "dramatic, just a soft shift that you feel more than you see. Moments like this make you slow down without even trying.\n" +
                    "\n" +
                    "There’s something comforting about new beginnings arriving so gently. No pressure, no expectations—just a " +
                    "reminder that change doesn’t always have to be overwhelming. Sometimes it’s as simple as a new season, a breath of " +
                    "fresh air, or a peaceful moment you didn’t plan for.\n" +
                    "\n" +
                    "Spring always feels like a quiet invitation to start again, in your own way, at your own pace.",
                post_image:[],
                post_video:"",
                comment:2,
                donation:5
            },
            {
                user_id:1,
                post_id:2,
                post_type:"text",
                post_date: "28/04/2026",
                post_header: "Golden Hour Walk",
                post_detail: "Warm light, quiet streets, and a moment worth keeping.",
                post_image:[],
                post_video:"",
                comment:0,
                donation:0
            },
            {
                user_id:1,
                post_id:3,
                post_type:"image",
                post_date: "24/04/2026",
                post_header: "Cat cups I recently made",
                post_detail: "",
                post_image:[
                    "/images/posts/cat_cups.jpg",
                    "/images/posts/cat_cups2.jpg",
                    "/images/posts/cat_cups3.jpg",
                    "/images/posts/cat_cups4.jpg",
                    "/images/posts/cat_cups5.jpg"],
                post_video:"",
                comment:1,
                donation:500
            },
            {
                user_id:1,
                post_id:4,
                post_type:"video",
                post_date: "25/04/2026",
                post_header: "Music I am working on nowadays",
                post_detail: "",
                post_image:[],
                post_video: ["https://www.youtube.com/watch?v=9E6b3swbnWg&list=RD9E6b3swbnWg&start_radio=1",
                    "https://www.youtube.com/watch?v=9AuzJ2GBCGw&list=RD9AuzJ2GBCGw&start_radio=1","https://www.youtube.com/watch?v=9E6b3swbnWg&list=RD9E6b3swbnWg&start_radio=1",
                    "https://www.youtube.com/watch?v=9AuzJ2GBCGw&list=RD9AuzJ2GBCGw&start_radio=1","https://www.youtube.com/watch?v=9AuzJ2GBCGw&list=RD9AuzJ2GBCGw&start_radio=1"],
                comment:0,
                donation:200
            },
            {
                user_id:1,
                post_id:5,
                post_type:"image",
                post_date: "12/03/2026",
                post_header: "Morning Light",
                post_detail: "The day begins quietly, with soft light slowly filling the room. " +
                    "There’s something comforting about these early moments, when everything feels still " +
                    "and unhurried. It’s a gentle reminder to take things one step at a time.",
                post_image:["/images/posts/morning-light.jpg"],
                post_video: [],
                comment:0,
                donation:0
            },
            {
                user_id:1,
                post_id:6,
                post_type:"text",
                post_date: "18/04/2026",
                post_header: "City Rain",
                post_detail: "Raindrops fall steadily, turning streets into " +
                    "reflections of light and motion. The sound blends into the background, " +
                    "creating a strange kind of calm in the middle of the city’s chaos. It’s the kind of " +
                    "moment that makes you pause without realizing it.",
                post_image:[],
                post_video: [],
                comment:0,
                donation:0
            },
            {
                user_id:1,
                post_id:7,
                post_type:"text",
                post_date: "25/04/2026",
                post_header: "A Walk Alone",
                post_detail: "Sometimes, walking alone is exactly what you need. No distractions, " +
                    "just your thoughts and the rhythm of your steps. It’s in these quiet moments that " +
                    "things start to feel a little clearer.",
                post_image:[],
                post_video: [],
                comment:0,
                donation:0
            },
            {
                user_id:1,
                post_id:8,
                post_type:"text",
                post_date: "02/05/2026",
                post_header: "Spring Breeze",
                post_detail: "A soft breeze moves through the air, carrying that fresh feeling only spring can bring. " +
                    "Everything seems lighter, as if the world is slowly waking up again. It’s a small but meaningful " +
                    "shift.",
                post_image:[],
                post_video: [],
                comment:0,
                donation:0
            },
            {
                user_id:1,
                post_id:9,
                post_type:"text",
                post_date: "10/05/2026",
                post_header: "Late Night Thoughts",
                post_detail: "Late hours bring a different kind of silence. With fewer distractions, " +
                    "thoughts flow more freely, and ideas begin to take shape." +
                    " There’s something peaceful about being awake when everything else is at rest.",
                post_image:[],
                post_video: [],
                comment:0,
                donation:0
            }
        ]
    }
]


export const followers = [
    {
        user_id: 1,
        followers:[
            {
                id:1,
                follower_user_id:2,
                img:"/images/people/john.jpg",
                name:"John",
                username:"@johnscorner"
            },
            {
                id:2,
                follower_user_id:3,
                img:"/images/people/kate.jpg",
                name:"Kate",
                username:"@katescorner"
            },
            {
                id:3,
                follower_user_id:2,
                img:"/images/people/john.jpg",
                name:"River",
                username:"@riverscorner"
            },
            {
                id:4,
                follower_user_id:3,
                img:"/images/people/kate.jpg",
                name:"Alice",
                username:"@alicescorner"
            },
        ]
    }
]

export const following = [
    {
        user_id: 1,
        following:[
            {
                id: 1,
                following_user_id: 4,
                img: "/images/people/mike.jpg",
                name: "Mike",
                username: "@mikescorner"
            }
        ]
    }
]

export const comments = [
    {
        comment_id:1,
        commenter_id:2,
        commented_to_user_id:1,
        commented_to_post_id:1,
        commented_date:"30/04/2026",
        comment:"A calm and well-written post with soft, vivid imagery that captures the feeling of spring nicely. " +
            "It flows smoothly and feels peaceful, though adding a small personal touch could make it more memorable."
    },
    {
        comment_id: 2,
        commenter_id: 3,
        commented_to_user_id:1,
        commented_to_post_id: 3,
        commented_date: "30/04/2026",
        comment:"They are lovely, good job!"
    },
    {
        comment_id: 3,
        commenter_id: 4,
        commented_to_user_id:1,
        commented_to_post_id:1,
        commented_date: "01/05/2026",
        comment: "A soft and refreshing piece that captures the gentle mood of spring. " +
            "It feels calm and hopeful, even in just a few lines."
    }
]

export const donations = [
    {
        donation_id:1,
        donator_id: 2,
        donated_to_user_id:1,
        donated_to_post_id:1,
        donated_date:"30/04/2026",
        donated_amount:5
    },
    {
        donation_id: 2,
        donator_id: 3,
        donated_to_user_id:1,
        donated_to_post_id: 3,
        donated_date:"30/04/2026",
        donated_amount: 400
    },
    {
        donation_id: 3,
        donator_id: 4,
        donated_to_user_id:1,
        donated_to_post_id: 3,
        donated_date:"28/04/2026",
        donated_amount: 100
    },
    {
        donation_id: 4,
        donator_id: 2,
        donated_to_user_id:1,
        donated_to_post_id: 4,
        donated_date:"01/05/2026",
        donated_amount: 200
    }

]

export const DONATE_ICON = {
    donate_5_dollars: "/images/donate-icons/donate-tea-icon.png",
    donate_7_dollars: "/images/donate-icons/donate-cookie-icon.png",
    donate_12_dollars: "/images/donate-icons/donate-both-icon.png"
};

export const published_images=[

]