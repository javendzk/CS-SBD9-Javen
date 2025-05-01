import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroBackground from "./assets/images/tokonet_hero.png"; 
import NavigationBar from "./assets/elements/navigationBar_translucent.jsx";

function App() {
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const secondWords = ["Prices", "Deals", "Shopping"];

  useEffect(() => {
    const handleTypewriter = () => {
      const currentWord = secondWords[loopIndex % secondWords.length];
      const updatedText = isDeleting
        ? currentWord.substring(0, typewriterText.length - 1)
        : currentWord.substring(0, typewriterText.length + 1);

      setTypewriterText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 800); 
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopIndex(loopIndex + 1);
      }
    };

    const timer = setTimeout(handleTypewriter, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, loopIndex]);

  return (
    <div className="relative">
      <div className="animated-gradient-container">
        <div className="animated-gradient"></div>
      </div>
      <NavigationBar />
      <section className="relative flex flex-col items-center h-screen pt-16">
        <div className="flex flex-col items-center justify-center mt-20 mb-8">
          <h1 className="text-5xl font-bold font-courier-new text-center hero-text">
            <span className="text-white">Cheapest </span>
            <span className="text-yellow-400">{typewriterText}</span>
            <span className="border-r-2 border-white animate-blink"></span>
          </h1>
          <p className="mt-6 text-xl text-white text-center max-w-2xl hero-text">
            Welcome to Toko Netlab, FTUI's number one e-commerce! 
            Browse thousands of products at unbeatable prices. 
            Fast shipping, secure payment, and excellent customer service guaranteed.
          </p>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <img 
            src={HeroBackground} 
            alt="Tokonet Hero" 
            className="max-h-[60vh] object-contain hero-image"
          />
        </div>
      </section>
      <section className="shop-section">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-orange-500 mb-3">Let's Shop!</h2>
          <p className="text-gray-500 text-center max-w-lg mx-auto mb-8">
            What are you waiting for? Our exclusive deals won't last forever. 
            We're ready to ship your favorite items right to your doorstep!
          </p>
          <div className="flex justify-center">
            <Link to="/login" className="gradient-button text-lg">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
