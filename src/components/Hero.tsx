import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section
      className="relative container grid lg:grid-cols-2 place-items-center py-28 md:py-36 gap-14 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/sxqWV9WX/d1e92bf1-ec0e-430b-8796-d8345ce89505.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#020617]/65 z-0" />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 65% 35%, rgba(96,165,250,0.35) 0%, rgba(2,6,23,0.6) 50%, rgba(2,6,23,0.9) 75%)",
        }}
      />

      {/* Texto */}
      <div className="relative z-10 text-center lg:text-left space-y-7">
        <main className="leading-snug">
          <h1 className="text-3xl md:text-4xl font-semibold text-white/70">
            A place for people who feel too much
          </h1>

          <span className="block mt-2 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-transparent bg-clip-text">
            BoyWithUke
          </span>
        </main>

        <p className="text-base md:text-lg text-white/65 max-w-lg mx-auto lg:mx-0">
          Music, thoughts, and late-night feelings.  
          Made by fans, for fans.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button className="px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            Listen & explore
          </Button>

          <a
            href="#"
            className={`${buttonVariants({
              variant: "outline",
            })} px-8 rounded-full border-blue-400/40 text-white/70 hover:text-white hover:border-blue-400/70`}
          >
            Join the community
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

    {/* Visual */}
<div className="relative z-10 w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden border border-blue-400/30 backdrop-blur-xl bg-blue-500/5 flex group">

  {/* Imagen izquierda */}
  <div
    className="w-1/2 h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    style={{
      backgroundImage:
        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJlkInPNnIZDAP8oICJedK_bayRu6h4qUpNQ&s')",
    }}
  />

  {/* Separador */}
  <div className="w-[1px] h-full bg-white/10" />

  {/* Imagen derecha */}
  <div
    className="w-1/2 h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    style={{
      backgroundImage:
        "url('data:image/jpeg;base64,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')",
    }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/45 via-transparent to-[#020617]/40 pointer-events-none" />

  {/* Glow inferior */}
  <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[70%] h-[200px] bg-blue-500/25 blur-[120px] rounded-full pointer-events-none" />
</div>


      {/* Glow */}
      <div className="absolute top-[30%] right-[20%] w-[500px] h-[500px] bg-blue-500/25 blur-[150px] rounded-full -z-10" />
    </section>
  );
};
