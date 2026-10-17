export default () => {
  return {
    fields: {
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
      data,
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
      const source = _.get(data, "data", data);
      const collection = _.isArray(source)
        ? _.get(source, "[0]", {})
        : source || {};
      const productsValue = _.get(collection, "collectionsProducts", []);
      const products = _.isArray(productsValue) ? productsValue.slice(0, 2) : [];
      const details = [
        { label: detailOneTop, icon: "layers" },
        { label: detailFourTop, icon: "panel" },
        { label: detailOneBottom, icon: "expand" },
        { label: detailTwoTop, icon: "ruler" },
        { label: detailThreeTop, icon: "frame" },
        { label: detailTwoBottom, icon: "tool" },
      ];

      return (
        <section className="w-full bg-white py-8 text-black md:py-12">
          <Container>
            <div className="grid grid-cols-1 items-start gap-y-0 gap-x-6 md:grid-cols-5">
              <div className="pb-4 md:col-span-2">
                {eyebrow && (
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-teal-800">
                    {eyebrow}
                  </p>
                )}
                {heading && (
                  <h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-black md:text-3xl">
                    {heading}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 max-w-md text-sm leading-7 text-gray-800 md:text-base">
                    {description}
                  </p>
                )}
                {(footerLeft || footerRight) && (
                  <div className="mt-2 flex items-center justify-between gap-2 border-t border-gray-200 pt-2 text-xs text-gray-600">
                    <span>{footerLeft}</span>
                    <span className="shrink-0">{footerRight}</span>
                  </div>
                )}
              </div>

              <div className="relative h-[400px] w-full overflow-hidden bg-gray-50 md:col-span-3">
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

              <div className="grid grid-cols-2 items-start gap-2 pt-4 md:col-span-3">
                {_.map(products, (product, index) => (
                  <div
                    key={_.get(product, "_id", _.get(product, "slug", index))}
                    className="min-w-0 self-start"
                  >
                    <ProductItem productItem={product} />
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 md:col-span-2">
                {(detailsHeading ||
                  details.some(({ label }) => label) ||
                  detailThreeBottom ||
                  detailFourBottom) && (
                  <div className="grid grid-cols-1 gap-3 rounded-sm border border-gray-200 bg-gray-50 p-4 md:grid-cols-3">
                    <h3 className="border-b border-gray-200 pb-2 font-serif text-xl font-medium md:col-span-3">
                      {detailsHeading}
                    </h3>
                    {_.map(
                      _.filter(details, ({ label }) => label),
                      ({ label, icon }, index) => (
                        <div
                          key={`detail-${index}`}
                          className="flex items-center gap-2 text-sm"
                        >
                          <svg
                            className="h-4 w-4 shrink-0 text-gray-700"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            {icon === "layers" && (
                              <>
                                <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                                <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
                              </>
                            )}
                            {icon === "panel" && (
                              <>
                                <path d="M6 3h12v18H6z" />
                                <path d="m9 16 6-8" />
                              </>
                            )}
                            {icon === "expand" && (
                              <>
                                <path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" />
                                <path d="m3 3 6 6m12-6-6 6M3 21l6-6m12 6-6-6" />
                              </>
                            )}
                            {icon === "ruler" && (
                              <path d="M12 3v18M8 5h4M9 9h3M8 13h4M9 17h3M8 21h4" />
                            )}
                            {icon === "frame" && (
                              <>
                                <rect x="4" y="5" width="16" height="14" rx="1" />
                                <path d="M8 9h2m4 0h2" />
                              </>
                            )}
                            {icon === "tool" && (
                              <path d="M14 6a5 5 0 0 0-6.7 6.7L3 17l4 4 4.3-4.3A5 5 0 0 0 18 10l-3 3-4-4 3-3Z" />
                            )}
                          </svg>
                          <span>{label}</span>
                        </div>
                      )
                    )}
                    <p className="sr-only">
                      {detailThreeBottom} {detailFourBottom}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};
