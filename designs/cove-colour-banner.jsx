export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      heading: { type: "text", label: "Heading" },
      description: { type: "textarea", label: "Description" },
      imageUrl: {
        type: "text",
        label: "Background image URL (optional)",
        default: "",
      },
      imageAlt: { type: "text", label: "Background image alt text" },
    },

    defaultProps: {
      eyebrow: "COVE COLOUR SERIES",
      heading: "Modern Workstations, Bold Colours",
      description:
        "Bring style and functionality to your workspace with Cove Colour Series workstations, designed for modern teams and dynamic offices.",
      imageUrl: "",
      imageAlt: "",
    },

    render: ({ data, eyebrow, heading, description, imageUrl, imageAlt }) => {
      const source = _.get(data, "data", data);
      const record = _.isArray(source) ? _.get(source, "[0]", {}) : source || {};
      const nestedRecord = _.get(record, "data", record);
      const mapData = _.isArray(nestedRecord)
        ? _.get(nestedRecord, "[0]", {})
        : nestedRecord || {};
      const cleanText = (value) =>
        typeof value === "string" ? value.trim() : "";
      const cmsEyebrow =
        cleanText(_.get(mapData, "bannerSubTitle", "")) ||
        cleanText(_.get(mapData, "collectionSubTitle", ""));
      const cmsHeading =
        cleanText(_.get(mapData, "bannerTitle", "")) ||
        cleanText(_.get(mapData, "collectionTitle", ""));
      const cmsDescription = cleanText(_.get(mapData, "description", ""));
      const resolvedEyebrow = cmsEyebrow || cleanText(eyebrow);
      const resolvedHeading = cmsHeading || cleanText(heading);
      const manualDescription = cleanText(description);
      const resolvedDescription = cmsDescription || manualDescription;
      const cmsImageUrl =
        cleanText(_.get(mapData, "bannerImages[0].bannerImageUrl", "")) ||
        cleanText(_.get(mapData, "bannerImageUrl", "")) ||
        cleanText(_.get(mapData, "collectionImageUrl", ""));
      const resolvedImageUrl = cleanText(imageUrl) || cmsImageUrl;

      return (
        <section id="cove-colour-series" className="w-full">
          <div
            className="relative w-full overflow-hidden"
            style={!resolvedImageUrl ? { minHeight: "700px" } : undefined}
          >
            {resolvedImageUrl && (
              <img
                src={formatImageUrl(resolvedImageUrl)}
                alt={
                  cleanText(imageAlt) ||
                  resolvedHeading ||
                  "Cove Colour Series workspace"
                }
                className="block h-auto w-full"
              />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center px-4 py-8 sm:px-6">
              <div
                className="flex w-full max-w-2xl flex-col items-center justify-center border-2 border-white px-4 py-8 text-center text-white sm:px-6 md:px-12 md:py-12"
              >
                {resolvedEyebrow && (
                  <p className="mb-1 text-xs font-semibold uppercase leading-tight sm:text-sm">
                    {resolvedEyebrow}
                  </p>
                )}
                {resolvedHeading && (
                  <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                    {resolvedHeading}
                  </h1>
                )}
                {resolvedDescription && (
                  <div className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base md:text-xl">
                    {cmsDescription ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: resolvedDescription,
                        }}
                      />
                    ) : (
                      manualDescription
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    },
  };
};
