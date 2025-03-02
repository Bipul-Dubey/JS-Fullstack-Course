import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden " />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompts Share is an open-source AI prompting tool for modern world
        discover, create and share creative prompts
      </p>

      {/* feed */}
      <Feed />
    </section>
  );
}
