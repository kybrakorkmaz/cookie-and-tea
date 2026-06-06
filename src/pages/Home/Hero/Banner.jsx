import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText"

const Banner = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(SplitText);

        let ctx = gsap.context(() => {
            if (!textRef.current) return;

            // 1. Split the text into characters
            const split = new SplitText(textRef.current, { type: "chars" });

            // 2. Filter the characters
            const firstLetters = split.chars.filter(char =>
                char.innerText === "c" || char.innerText === "a" || char.innerText === "t"
            );

            // Other letters
            const otherLetters = split.chars.filter(char => !firstLetters.includes(char));

            const tl = gsap.timeline();

            // 3. Animation Sequence
            tl.from(firstLetters, {
                y: -300,
                opacity: 0,
                stagger: 0.2, // Time between 'c', 'a', and 't'
                duration: 0.8,
                ease: "bounce.out"
            })
                .from(otherLetters, {
                    y: -300,
                    opacity: 0,
                    stagger: 0.03, // Faster drop for the rest
                    duration: 0.6,
                    ease: "bounce.out"
                }, "-=0.4"); // Starts slightly before the first letters finish bouncing

        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section ref={sectionRef} className="hidden lg:flex min-w-[65%]">
            <div className="relative w-full">
                <img
                    id="main-hero"
                    className="relative max-w-[25%]"
                    src="/images/main-hero.png"
                    alt="Cookie and Tea Hero"
                />
                <div className="absolute left-[25%] top-[33%] text-white font-logo lg:text-h1-lg xl:text-h1-xl leading-none select-none">
                    <p
                        ref={textRef}
                        style={{
                            WebkitTextStroke: "1px black",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                        }}
                    >
                        <span className="text-black">c</span>ookie
                        <span className="text-black">a</span>nd
                        <span className="text-black">t</span>ea
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Banner;