export default () => {
  return {
    fields: {
      collectionLabel: { type: "text", label: "Collection label" },
      topRightLabel: { type: "text", label: "Top right label" },
      eyebrow: { type: "text", label: "Eyebrow" },
      heading: { type: "text", label: "Heading" },
      description: { type: "textarea", label: "Description" },
      imageUrl: { type: "text", label: "Image URL" },
      imageAlt: { type: "text", label: "Image alt text" },
      footerLeft: { type: "text", label: "Left footer text" },
      footerRight: { type: "text", label: "Right footer text" },
      detailsHeading: { type: "text", label: "Details heading" },
      detailOneTop: { type: "text", label: "Detail 1 title" },
      detailOneBottom: { type: "text", label: "Detail 1 description" },
      detailTwoTop: { type: "text", label: "Detail 2 title" },
      detailTwoBottom: { type: "text", label: "Detail 2 description" },
      detailThreeTop: { type: "text", label: "Detail 3 title" },
      detailThreeBottom: { type: "text", label: "Detail 3 description" },
      detailFourTop: { type: "text", label: "Detail 4 title" },
      detailFourBottom: { type: "text", label: "Detail 4 description" },
    },

    defaultProps: {
      collectionLabel: "THE COLLECTION",
      topRightLabel: "DESIGNED FOR WORK",
      eyebrow: "01 / THE SYNC SERIES",
      heading: "Space to work together.",
      description:
        "A versatile collection for the ways teams work today. Considered surfaces and modular forms bring clarity to shared spaces.",
      imageUrl: "/designs/design.jpeg",
      imageAlt: "A collaborative office meeting space",
      footerLeft: "Modular workspace collection",
      footerRight: "Made in UAE",
      detailsHeading: "The details.",
      detailOneTop: "36mm Table Top",
      detailOneBottom: "Modular Design",
      detailTwoTop: "40 x 15mm Aluminum Leg",
      detailTwoBottom: "Easy Installation & Relocation",
      detailThreeTop: "40 x 18mm Front Panel",
      detailThreeBottom: "5 Years Warranty",
      detailFourTop: "12mm PET Panel",
      detailFourBottom: "Made in UAE",
    },

    render: ({
      collectionLabel,
      topRightLabel,
      eyebrow,
      heading,
      description,
      imageUrl,
      imageAlt,
      footerLeft,
      footerRight,
      detailsHeading,
      detailOneTop,
      detailOneBottom,
      detailTwoTop,
      detailTwoBottom,
      detailThreeTop,
      detailThreeBottom,
      detailFourTop,
      detailFourBottom,
    }) => {
      const details = [
        { title: detailOneTop, description: detailOneBottom },
        { title: detailTwoTop, description: detailTwoBottom },
        { title: detailThreeTop, description: detailThreeBottom },
        { title: detailFourTop, description: detailFourBottom },
      ];

      return (
        <section className="w-full bg-[#f8f8f8] py-8 text-[#1f1f1f]">
          <Container>
            <div className="mb-6 flex items-center gap-4">
              <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-[#176161] md:text-xs">
                {collectionLabel}
              </p>
              <div className="hidden flex-1 border-t border-[#e0e0e0] md:block" />
              <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-[#176161] md:text-xs">
                {topRightLabel}
              </p>
            </div>

            <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-5 md:gap-8">
              <div className="md:col-span-2">
                {eyebrow && (
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#176161]">
                    {eyebrow}
                  </p>
                )}
                {heading && (
                  <h2 className="mb-4 font-serif text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                    {heading}
                  </h2>
                )}
                {description && (
                  <p className="max-w-md text-sm leading-[1.4] text-[#333] md:text-base">
                    {description}
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#e0e0e0] pt-3 text-[11px] text-[#555] md:mt-6 md:text-xs">
                  <span>{footerLeft}</span>
                  <span className="shrink-0">{footerRight}</span>
                </div>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden rounded-4xl md:col-span-3">
                {imageUrl && (
                  <Image
                    src={formatImageUrl(imageUrl)}
                    alt={imageAlt || heading || "Collection"}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-[#e0e0e0] pt-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-5 md:gap-4">
                <h3 className="font-serif text-xl font-medium">
                  {detailsHeading}
                </h3>
                {details.map(({ title, description: detailDescription }, index) => (
                  <div
                    key={index}
                    className="border-t border-[#e0e0e0] pt-3 text-sm"
                  >
                    <p>{title}</p>
                    <p className="mt-2">{detailDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};
