export default () => {
  const images = Array.from({ length: 46 }, (_, index) => ({
    src: `https://ergospaceae.s3.me-central-1.amazonaws.com/gallery/${index + 1}.webp`,
    number: String(index + 1).padStart(2, "0"),
  }));

  const tileClasses = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
  ];

  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      heading: { type: "text", label: "Heading" },
      description: { type: "text", label: "Description" },
    },

    defaultProps: {
      eyebrow: "Ergospace / Gallery",
      heading: "Spaces with a point of view.",
      description:
        "A collection of considered details, tactile materials, and the places they create.",
    },

    render: ({ eyebrow, heading, description }) => (
      <section className="overflow-hidden bg-[#171715] py-16 text-[#f5f1e9] md:py-24">
        <Container>
          <header className="mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              {eyebrow && (
                <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c9a77b] font-raleway">
                  <span className="h-px w-8 bg-[#c9a77b]" />
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h1 className="max-w-2xl text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-[#f5f1e9] font-raleway md:text-7xl">
                  {heading}
                </h1>
              )}
            </div>
            <div className="flex max-w-xs items-end justify-between gap-8 border-t border-white/20 pt-4 md:mb-1 md:block md:border-t-0 md:pt-0">
              {description && (
                <p className="text-sm leading-6 text-[#b9b4aa] font-raleway md:mb-5">
                  {description}
                </p>
              )}
              <p className="whitespace-nowrap text-xs uppercase tracking-[0.18em] text-[#f5f1e9]/60 font-raleway">
                46 perspectives
              </p>
            </div>
          </header>

          <div className="grid auto-rows-[150px] grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[180px] md:grid-cols-4 md:auto-rows-[156px] md:gap-4 lg:auto-rows-[176px]">
            {images.map(({ src, number }, index) => (
              <figure
                key={src}
                className={`group relative overflow-hidden rounded-[1.25rem] bg-[#2b2a26] ${tileClasses[index % tileClasses.length]}`}
              >
                <Image
                  src={src}
                  alt={`Ergospace gallery image ${number}`}
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:rotate-[1deg]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-1 items-end justify-between p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 font-raleway">
                    Collection
                  </span>
                  <span className="text-sm font-medium tracking-[0.08em] text-white font-raleway">
                    {number}
                  </span>
                </figcaption>
                <span className="absolute right-4 top-4 text-[10px] tracking-[0.16em] text-white/70 transition duration-500 group-hover:opacity-0 font-raleway">
                  {number}
                </span>
              </figure>
            ))}
          </div>

          <footer className="mt-8 flex items-center justify-between border-t border-white/15 pt-5 text-[10px] uppercase tracking-[0.2em] text-[#b9b4aa] font-raleway">
            <span>Material / Form / Light</span>
            <span>Scroll to explore</span>
          </footer>
        </Container>
      </section>
    ),
  };
};
