import Navbar from "../../components/Navbar.jsx";
import { frequentlyAskedQuestions } from "../../constants/index.js";
import Questions from "./Questions.jsx";
import Footer from "../../components/Footer.jsx";

const Faq = () => {
    return (
        <div className="bg-cream min-h-screen">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65"/>

            <div className="flex flex-col items-center justify-center px-4 py-40 mb-10">
                <div className="text-center mb-12">
                    <h2 className="font-header text-h-2 text-primary-dark">Frequently Asked Questions</h2>
                    <h3 className="font-header text-sh pt-4 max-w-2xl mx-auto">
                        If you can't find an answer... feel free to drop us <span className="text-primary">an email.</span>
                    </h3>
                </div>

                {/* ✅ ARTIK BURADA GAP VAR: Her soru kendi kutusunda */}
                <div className="w-full max-w-3xl flex flex-col gap-6">
                    {frequentlyAskedQuestions.map(fq => (
                        <Questions
                            key={fq.id}
                            id={fq.id}
                            question={fq.question}
                            answer={fq.answer}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Faq;