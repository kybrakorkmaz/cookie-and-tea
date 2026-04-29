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
        id: 1,
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
    }
];

export const latestPosts = [
    {
        id:1,
        user_id:1,
        posts:[
            {
                post_id:1,
                post_type:"text",
                post_date: "23/04/2026",
                post_header: "First Day of Spring",
                post_detail: "Soft light, fresh air, and a quiet reminder that new beginnings are here 🌿",
                post_image:"",
                post_video:""
            },
            {
                post_id:2,
                post_type:"text",
                post_date: "28/04/2026",
                post_header: "Golden Hour Walk",
                post_detail: "Warm light, quiet streets, and a moment worth keeping.",
                post_image:"",
                post_video:""
            },
            {
                post_id:3,
                post_type:"image",
                post_date: "24/04/2026",
                post_header: "My Cat and I",
                post_detail: "She loves cuddling",
                post_image:"/images/posts/my_cat_and_i.jpg",
                post_video:""
            },
            {
                post_id:4,
                post_type:"video",
                post_date: "25/04/2026",
                post_header: "Nowadays Favorite Song",
                post_detail: "",
                post_image:"",
                post_video: "https://www.youtube.com/watch?v=9E6b3swbnWg&list=RD9E6b3swbnWg&start_radio=1"
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
                name:"John",
                username:"@johnscorner"
            },
            {
                id:4,
                follower_user_id:3,
                img:"/images/people/kate.jpg",
                name:"Kate",
                username:"@katescorner"
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