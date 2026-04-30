import UserNavbar from "../../components/UserNavbar.jsx";
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {posts} from "../../constants/index.js";
import { motion } from "framer-motion";

const Posts= () =>{
    const {hash} = useLocation();
    const [highlightedId, setHighlightedId] = useState(null);

    const allPosts = posts[0].posts;
    useEffect(() => {
        if(hash){
            //get post id (#post-2 *> post-2)
            const targetId = hash.replace("#", "");
            setHighlightedId(targetId);

            const element = document.getElementById(targetId);
            // wait until the rendering of page is finish
            if(element){
                setTimeout(()=>{
                    element.scrollIntoView({
                        behavior:"smooth",
                        block: "center" // centralized the target post
                    })
                }, 100);

                // after 3 secs, remove behavior
                const timer = setTimeout(()=>{
                    setHighlightedId(null);
                }, 3000);

                return () =>clearTimeout(timer);
            }

        }
    }, [hash, allPosts]);
    return(
        <div className="min-h-screen">
            <UserNavbar/>
            <div className="flex flex-col gap-10 p-10 max-w-4xl mx-auto">
                {allPosts.map((post) => {
                    const isFocused = highlightedId === `post-${post.post_id}`;

                    return(
                        <motion.div
                            key={post.post_id}
                            id={`post-${post.post_id}`} // match id
                            initial={false}
                            animate={{
                                scale: isFocused ? 1.02 : 1,
                                backgroundColor: isFocused ? "#fefce8" : "#ffffff",
                                borderColor: isFocused ? "#8b5cf6" : "#e5e7eb",
                            }}
                            transition={{ duration: 0.8 }}
                            className={`p-6 rounded-2xl border-2 shadow-sm relative scroll-mt-32`}
                        >
                            <h2 className="text-2xl font-header font-bold mb-4">{post.post_header}</h2>
                            <p className="font-paragraph text-gray-700">{post.post_detail}</p>
                            {/* Diğer post içerikleri... */}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export  default Posts;