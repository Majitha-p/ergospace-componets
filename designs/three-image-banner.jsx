export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      heading: { type: "text", label: "Heading" },
      description: { type: "textarea", label: "Description" },
      buttonLabel: { type: "text", label: "Button label" },
      buttonLink: { type: "text", label: "Button link" },
      backgroundColor: { type: "text", label: "Background color" },
      imageLeftUrl: { type: "text", label: "Bottom left image URL" },
      imageCenterUrl: { type: "text", label: "Bottom center image URL" },
    },

    defaultProps: {
      eyebrow: "DESIGNED FOR EVERY DAY",
      heading: "Make room for better work.",
      description:
        "Thoughtful furniture, considered details, and flexible spaces that help great work happen.",
      buttonLabel: "Explore the collection",
      buttonLink: "/collections",
      backgroundColor: "#f5f4ef",
      imageLeftUrl: "",
      imageCenterUrl: "",
    },

    render: ({
      data,
      eyebrow,
      heading,
      description,
      buttonLabel,
      buttonLink,
      backgroundColor,
      imageLeftUrl,
      imageCenterUrl,
    }) => {
      const mapData = Array.isArray(data?.data)
        ? data.data[0] || {}
        : data?.data || data || {};
      const bannerSubTitle = _.get(mapData, "bannerSubTitle", "") || "";
      const bannerEyebrow = bannerSubTitle.trim() || eyebrow;
      const bannerHeading = _.get(mapData, "bannerTitle", "") || heading;
      const bannerDescription = _.get(mapData, "description", "");
      const visibleDescription = bannerDescription || description;
      const bannerButtonLink = _.get(mapData, "link", "");
      const linkHref =
        !_.isEmpty(mapData) && generatePageRedirection
          ? generatePageRedirection(mapData)
          : bannerButtonLink || buttonLink || "/";
      const imageRightUrlResolved = _.get(mapData, "bannerImages[0].bannerImageUrl", "");
      const imageRightSrc = imageRightUrlResolved ? formatImageUrl(imageRightUrlResolved) : "";
      const imageLeftSrc = imageLeftUrl ? formatImageUrl(imageLeftUrl) : "";
      const imageCenterSrc = imageCenterUrl ? formatImageUrl(imageCenterUrl) : "";

      return (
        <section
          className="w-full py-8 md:py-12"
          style={{ backgroundColor: backgroundColor || "#f5f4ef" }}
        >
          <style>{`
            .three-image-banner-layout {
              display: grid;
              grid-template-columns: minmax(0, 1fr);
              grid-template-areas:
                "feature"
                "copy"
                "gallery";
            }
            .three-image-banner-copy {
              grid-area: copy;
            }
            .three-image-banner-feature {
              grid-area: feature;
            }
            .three-image-banner-gallery {
              grid-area: gallery;
            }
            @media (max-width: 767px) {
              .three-image-banner-feature {
                display: block;
                height: 340px;
              }
              .three-image-banner-gallery {
                display: none;
              }
            }
            @media (min-width: 768px) {
              .three-image-banner-layout {
                column-gap: 1rem;
                row-gap: 0;
                min-height: 680px;
                grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
                grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
                grid-template-areas:
                  "copy feature"
                  "gallery feature";
              }
              .three-image-banner-gallery {
                display: grid;
              }
            }
          `}</style>
          <Container>
            <div
              className="three-image-banner-layout mx-auto max-w-7xl overflow-hidden"
              style={{ backgroundColor: backgroundColor || "#f5f4ef" }}
            >
              <div className="three-image-banner-copy flex flex-col items-start justify-center px-6 py-10 sm:px-10 md:px-12 md:py-12 lg:px-16">
                {bannerEyebrow && (
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#557267]">
                    {bannerEyebrow}
                  </p>
                )}
                {bannerHeading && (
                  <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#20352e] sm:text-5xl lg:text-6xl">
                    {bannerHeading}
                  </h1>
                )}
                {visibleDescription && (
                  <div className="mt-5 max-w-lg text-base leading-relaxed text-[#56645e] md:mt-6 md:text-lg">
                    {bannerDescription ? (
                      <div dangerouslySetInnerHTML={{ __html: bannerDescription }} />
                    ) : (
                      description
                    )}
                  </div>
                )}
                {buttonLabel && (
                  <Link
                    href={linkHref}
                    className="mt-5 inline-flex min-h-12 items-center justify-center px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#38574b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#557267] focus-visible:ring-offset-2"
                    style={{
                      backgroundColor: "#20352e",
                      borderRadius: 0,
                      color: "#ffffff",
                      textDecoration: "none",
                    }}
                  >
                    {buttonLabel}
                  </Link>
                )}
              </div>

              <div className="three-image-banner-feature relative min-h-[340px] overflow-hidden bg-[#e5e8e2] sm:min-h-[440px] md:min-h-0">
                {imageRightSrc && (
                  <Image
                    src={imageRightSrc}
                    alt={bannerHeading || "Featured workspace"}
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                )}
              </div>

              <div className="three-image-banner-gallery grid grid-cols-2 gap-3 sm:gap-4 sm:px-10 sm:pb-10 md:px-0 md:pb-0">
                <div className="relative min-h-[170px] overflow-hidden bg-[#e5e8e2] sm:min-h-[210px] md:min-h-0">
                  {imageLeftSrc && (
                    <Image
                      src={imageLeftSrc}
                      alt="Workspace detail"
                      fill
                      sizes="(min-width: 768px) 24vw, 50vw"
                      className="object-cover object-center"
                    />
                  )}
                </div>
                <div className="relative min-h-[170px] overflow-hidden bg-[#e5e8e2] sm:min-h-[210px] md:min-h-0">
                  {imageCenterSrc && (
                    <Image
                      src={imageCenterSrc}
                      alt="Workspace detail"
                      fill
                      sizes="(min-width: 768px) 24vw, 50vw"
                      className="object-cover object-center"
                    />
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};
