export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      heading: { type: "text", label: "Heading" },
      description: { type: "textarea", label: "Description" },
      imageTwoUrl: { type: "text", label: "Second column image URL" },
      imageTwoAlt: { type: "text", label: "Second column image alt text" },
      imageThreeUrl: { type: "text", label: "Third column image URL" },
      imageThreeAlt: { type: "text", label: "Third column image alt text" },
    },

    defaultProps: {
      eyebrow: "WORKSPACE / COLLECTION",
      heading: "Make space for better work.",
      description:
        "Thoughtfully designed furniture for focused work and the moments in between.",
      imageTwoUrl: "",
      imageTwoAlt: "",
      imageThreeUrl: "",
      imageThreeAlt: "",
    },

    render: ({
      data,
      eyebrow,
      heading,
      description,
      imageTwoUrl,
      imageTwoAlt,
      imageThreeUrl,
      imageThreeAlt,
    }) => {
      const mapData = Array.isArray(data?.data)
        ? data.data[0] || {}
        : data?.data || data || {};
      const bannerEyebrow = _.get(mapData, "bannerSubTitle", "") || "";
      const bannerHeading = _.get(mapData, "bannerTitle", "") || "";
      const bannerDescription = _.get(mapData, "description", "") || "";
      const resolvedEyebrow = bannerEyebrow.trim() || eyebrow || "";
      const resolvedHeading = bannerHeading || heading || "";
      const resolvedDescription = bannerDescription || description || "";
      const descriptionIsFromBanner = Boolean(bannerDescription);
      const resolvedImageTwoUrl =
        _.get(mapData, "bannerImages[0].bannerImageUrl", "") ||
        imageTwoUrl ||
        "";
      const resolvedImageThreeUrl =
        _.get(mapData, "bannerImages[1].bannerImageUrl", "") ||
        imageThreeUrl ||
        "";
      const imageTwoSrc = resolvedImageTwoUrl
        ? formatImageUrl(resolvedImageTwoUrl)
        : "";
      const imageThreeSrc = resolvedImageThreeUrl
        ? formatImageUrl(resolvedImageThreeUrl)
        : "";

      return (
        <section className="w-full bg-[#f5f3f0]">
          <Container>
            <div
              className="grid min-h-[700px] min-w-full grid-cols-1 items-stretch gap-2 md:grid-cols-12"
              style={{ minHeight: "700px" }}
            >
              <div className="flex min-w-0 flex-col justify-center px-6 py-8 text-[#1B4D4F]">
                {resolvedHeading && (
                  <h1 className="text-4xl font-bold leading-tight">
                    {resolvedHeading}
                  </h1>
                )}
              </div>

              <div className="relative min-h-[260px] min-w-0 overflow-hidden bg-[#eaeaea] md:col-span-7">
                {imageTwoSrc ? (
                  <Image
                    src={imageTwoSrc}
                    alt={(imageTwoAlt || resolvedHeading).trim()}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                  <div className="flex h-full min-h-[260px] items-center justify-center px-4 text-center text-sm text-[#777]">
                    Add the second column image URL in the editor
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-col md:col-span-4">
                <div className="relative min-h-[260px] flex-1 overflow-hidden bg-[#eaeaea]">
                  {imageThreeSrc ? (
                    <Image
                      src={imageThreeSrc}
                      alt={(imageThreeAlt || resolvedHeading).trim()}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover object-center"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-[#777]">
                      Add the third column image URL in the editor
                    </div>
                  )}
                </div>

                <div className="flex flex-none flex-col justify-center bg-[#fffdfa] p-4 text-[#1a1a1a]">
                  {resolvedEyebrow && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-tight text-[#7C4A2D]">
                      {resolvedEyebrow}
                    </p>
                  )}
                  {resolvedDescription && descriptionIsFromBanner ? (
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: resolvedDescription,
                      }}
                    />
                  ) : resolvedDescription ? (
                    <p className="text-sm leading-relaxed">
                      {resolvedDescription}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};
