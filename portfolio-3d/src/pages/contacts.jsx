import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Fox from "../models/fox";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");

    // Set isLoading to false after a delay
    const delayDebounce = setTimeout(() => {
      setIsLoading(false);
      setCurrentAnimation("idle");
    }, 2000);

    // Clear the timeout and setIsLoading to false immediately if needed
    return () => {
      setCurrentAnimation("idle");
      clearTimeout(delayDebounce);
      setIsLoading(false); // Ensures setIsLoading is always false when the component unmounts
    };
  };

  const handleFocus = () => {
    setCurrentAnimation("walk");
  };
  const handleBlur = () => {
    setCurrentAnimation("idle");
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {/* TODO: Use when alert message needed */}
      {/* <Alertbox message="" /> */}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text font-poppins">Get in Touch</h1>
        <form
          action=""
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500 font-semibold font-poppins">
            Name{" "}
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Enter your name. (john)"
              required
              value={formData?.name}
              onChange={handleFormChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold font-poppins">
            Email{" "}
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Enter your email. (john@gmail.com)"
              required
              value={formData?.email}
              onChange={handleFormChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold font-poppins">
            Your Message{" "}
            <textarea
              name="message"
              className="input"
              placeholder="Let me know how can i help you."
              required
              value={formData?.message}
              onChange={handleFormChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending" : "Send Message"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
              currentAnimation={currentAnimation}
            ></Fox>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
