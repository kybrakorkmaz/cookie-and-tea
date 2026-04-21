import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const About = ()=>{
    return(
        <div className="bg-cream min-h-screen">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />
            <div className="px-72 py-52">
                <h2 className="font-header text-h-2 text-primary-dark text-center">Our Story</h2>
                <h3 className="font-header text-sh text-center py-10">Where Creativity Meets Real Support</h3>
                <p className="font-paragraph text-p ">
                    At Cookie and Tea, we see everyone as a creator in their own way. Our aim is to make it easier
                    for people to earn from what they create, without pressure, noise, or competition. <br/>
                    When we built Cookie and Tea, the focus wasn’t just simplicity—it was intention.
                    We wanted to remove the “like race” completely. There are no popularity contests here,
                    no chasing numbers. Instead, it’s a space where support is based on appreciation for effort
                    and creativity. People don’t compete for attention; they connect through genuine support.
                    The idea is straightforward: if someone values what you create, they can send a small
                    contribution along with a message. These contributions are visible on posts, turning support
                    into something meaningful and encouraging rather than transactional. <br/>
                    We also cared about comfort and privacy. Supporters don’t have to reveal who they are.
                    You can back someone’s work, send a kind message, and stay anonymous if you prefer.
                    That changes the dynamic—it becomes less about recognition and more about sincerity. <br/>
                    Cookie and Tea is built for creators who want a quieter, more authentic connection with
                    their audience. No algorithms deciding your worth, no pressure to perform—just people
                    supporting people. <br/>
                    Sometimes, a small gesture and a kind message are enough to keep someone creating.
                </p>
            </div>
            <Footer/>
        </div>
    )
}

export default About;