const Banner = () => {
    return (
        <section className="hidden lg:flex min-w-[65%]">
            <div className="relative w-full">
                <img
                    id="main-hero"
                    className="relative max-w-[25%]"
                    src="/images/main-hero.png"
                    alt="Cookie and Tea Hero"
                />
                <div className="absolute left-[25%] top-[33%] text-white font-logo lg:text-h1-lg xl:text-h1-xl leading-none select-none">
                    <p style={{
                        WebkitTextStroke: "1px black",
                        textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                    }}>
                        <span className="text-black  ">c</span>ookie
                        <span className="text-black ">a</span>nd
                        <span className="text-black ">t</span>ea
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Banner;