export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      heading: { type: "text", label: "Heading" },
      description: { type: "textarea", label: "Description" },
      backgroundColor: { type: "text", label: "Section background color" },
      eyebrowColor: { type: "text", label: "Eyebrow text color" },
      headingColor: { type: "text", label: "Heading text color" },
      descriptionColor: { type: "text", label: "Description text color" },
      imageUrl: { type: "text", label: "Left image URL" },
      imageAlt: { type: "text", label: "Image alt text" },
    },

    defaultProps: {
      eyebrow: "NEW COLLECTION 2025",
      heading: "Timeless Furniture for Living",
      description:
        "Handcrafted pieces built with premium sustainable materials designed to elevate your home and endure through the years.",
      backgroundColor: "#f5f3f0",
      eyebrowColor: "#7C4A2D",
      headingColor: "#000000",
      descriptionColor: "#4a4a4a",
      imageUrl: "",
      imageAlt: "Timeless furniture collection",
    },

    render: ({
      data,
      eyebrow,
      heading,
      description,
      backgroundColor,
      eyebrowColor,
      headingColor,
      descriptionColor,
      imageUrl,
      imageAlt,
    }) => {
      const source = _.get(data, "data", data);
      const record = _.isArray(source) ? _.get(source, "[0]", {}) : source || {};
      const nestedRecord = _.get(record, "data", record);
      const mapData = _.isArray(nestedRecord)
        ? _.get(nestedRecord, "[0]", {})
        : nestedRecord || {};
      const cleanText = (value) =>
        typeof value === "string" ? value.trim() : "";
      const cmsEyebrow = cleanText(_.get(mapData, "bannerSubTitle", ""));
      const cmsHeading = cleanText(_.get(mapData, "bannerTitle", ""));
      const cmsDescription = cleanText(_.get(mapData, "description", ""));
      const resolvedEyebrow = cmsEyebrow || cleanText(eyebrow);
      const resolvedHeading = cmsHeading || cleanText(heading);
      const resolvedDescription = cmsDescription || cleanText(description);
      const resolvedImageUrl =
        cleanText(imageUrl) ||
        cleanText(_.get(mapData, "bannerImages[0].bannerImageUrl", "")) ||
        cleanText(_.get(mapData, "bannerImageUrl", ""));
      const resolvedImageAlt =
        cleanText(imageAlt) || resolvedHeading || "Furniture collection";
      const resolvedBackgroundColor = cleanText(backgroundColor) || "#f5f3f0";
      const resolvedEyebrowColor = cleanText(eyebrowColor) || "#7C4A2D";
      const resolvedHeadingColor = cleanText(headingColor) || "#000000";
      const resolvedDescriptionColor = cleanText(descriptionColor) || "#4a4a4a";

      return (
        <section className="w-full py-8 md:py-12">
          <Container>
            <div
              className="relative overflow-hidden bg-[#f5f3f0]"
              style={{
                minHeight: "700px",
                backgroundColor: resolvedBackgroundColor,
              }}
            >
              {resolvedImageUrl && (
                <Image
                  src={formatImageUrl(resolvedImageUrl)}
                  alt={resolvedImageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  priority
                />
              )}
              <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-10 md:px-12">
                <div className="flex w-full max-w-lg flex-col items-start">
                  {resolvedEyebrow && (
                    <p
                      className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] md:text-base"
                      style={{ color: resolvedEyebrowColor }}
                    >
                      {resolvedEyebrow}
                    </p>
                  )}
                  {resolvedHeading && (
                    <h1
                      className="max-w-lg font-serif text-[50px] font-medium leading-tight tracking-tight md:text-6xl lg:!text-[75px]"
                      style={{ color: resolvedHeadingColor }}
                    >
                      {resolvedHeading}
                    </h1>
                  )}
                  {resolvedDescription &&
                    (cmsDescription ? (
                      <div
                        className="mt-5 max-w-lg text-base leading-relaxed md:text-lg"
                        style={{ color: resolvedDescriptionColor }}
                        dangerouslySetInnerHTML={{ __html: resolvedDescription }}
                      />
                    ) : (
                      <p
                        className="mt-5 max-w-lg text-base leading-relaxed md:text-lg"
                        style={{ color: resolvedDescriptionColor }}
                      >
                        {resolvedDescription}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};
