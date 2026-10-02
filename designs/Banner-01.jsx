export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow", default: "SYNC SERIES" },
      descriptionText: {
        type: "textarea",
        label: "Description",
        default: "",
      },
      imageUrl: { type: "text", label: "Image URL", default: "" },
      hoverImageUrl: { type: "text", label: "Hover image URL", default: "" },
      tag1: { type: "text", label: "Tag 1", default: "STYLISH" },
      tag2: { type: "text", label: "Tag 2", default: "MODERN" },
      tag3: { type: "text", label: "Tag 3", default: "FLAWLESS" },
    },

    defaultProps: {
      eyebrow: "SYNC SERIES",
      descriptionText: "Create a workspace that feels more open, efficient, and human — built for everyday focus.",
      imageUrl: "",
      hoverImageUrl: "",
      tag1: "STYLISH",
      tag2: "MODERN",
      tag3: "FLAWLESS",
    },

    render: ({ data, eyebrow, description, descriptionText, manualDescription, imageUrl, hoverImageUrl, tag1, tag2, tag3 }) => {
      const mapData = Array.isArray(data?.data) ? data.data[0] : data?.data || data || {};
      const sourceDescription = _.get(mapData, "description", "");
      const titleText = "White Series";
      const eyebrowText = eyebrow || "";
      const manualDescriptionText = descriptionText || manualDescription || description || "";
      const resolvedImageUrl = _.get(mapData, "bannerImages[0].bannerImageUrl", "") || imageUrl || "";
      const resolvedHoverImageUrl = (hoverImageUrl || "").trim();
      const hasImage = !_.isEmpty(resolvedImageUrl);
      const hasHoverImage = !_.isEmpty(resolvedHoverImageUrl);
      const hasTags = !_.isEmpty(tag1) || !_.isEmpty(tag2) || !_.isEmpty(tag3);

      const tagClassName =
        "banner-tag inline-flex min-w-0 flex-1 items-center justify-center rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase md:flex-none md:px-5 md:py-2 font-raleway";

      return (
        <section className="w-full py-6 md:py-10">
          <style>{`
            .banner-grid {
              min-height: 700px;
            }
            .banner-image-fade {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: linear-gradient(to bottom, transparent 58%, var(--banner-bg-color) 100%);
            }
            .banner-image-hover {
              opacity: 0;
              transition: opacity 500ms ease-in-out;
            }
            .banner-tag {
              border: 1px solid rgba(23, 97, 97, 0.22);
              background: rgba(164, 211, 202, 0.2);
              color: #176161;
              transition: background-color 180ms ease, border-color 180ms ease;
            }
            .banner-tag:hover {
              border-color: rgba(23, 97, 97, 0.42);
              background: rgba(164, 211, 202, 0.38);
            }
            .group:hover .banner-image-hover {
              opacity: 1;
            }
            @media (min-width: 768px) {
              .banner-image-fade {
                background: linear-gradient(to right, transparent 58%, var(--banner-bg-color) 100%);
              }
            }
            @media (max-width: 767px) {
              .banner-grid {
                min-height: 0;
              }
            }
          `}</style>
          <Container>
            <div
              className="banner-grid mx-auto grid w-full grid-cols-1 overflow-hidden rounded-none md:grid-cols-12"
            >
              {/* Left Column: Image with Hover Transition */}
              <div
                className="group relative h-[360px] w-full overflow-hidden bg-gray-100 sm:h-[420px] md:col-span-7 md:h-auto lg:col-span-7"
                style={{ "--banner-bg-color": "#faf9f7" }}
              >
                {hasImage && (
                  <Image
                    src={formatImageUrl(resolvedImageUrl)}
                    alt="Ergospace office furniture"
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                )}
                {hasHoverImage && (
                  <Image
                    src={formatImageUrl(resolvedHoverImageUrl)}
                    alt="Ergospace office furniture"
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="absolute inset-0 object-cover object-center banner-image-hover"
                  />
                )}

                <div className="banner-image-fade" />

              </div>

              {/* Right Column: Centered Content Panel */}
              <div
                className="flex min-w-0 flex-col justify-center px-6 py-4 text-center md:col-span-5 md:px-8 md:py-12 lg:col-span-5 lg:px-12"
                style={{ backgroundColor: "#faf9f7" }}
              >
                <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
                  {eyebrowText && (
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#176161] font-raleway md:mb-3">
                      {eyebrowText}
                    </p>
                  )}

                  {titleText && (
                    <h1 className="mb-3 text-3xl font-extrabold tracking-tight  font-raleway md:mb-4 md:text-4xl">
                      {titleText}
                    </h1>
                  )}

                  {!_.isEmpty(sourceDescription) ? (
                    <div
                      className="text-base font-medium md:text-xl "
                      dangerouslySetInnerHTML={{ __html: sourceDescription }}
                    />
                  ) : !_.isEmpty(manualDescriptionText) ? (
                    <div className="text-base font-medium md:text-xl">
                      {manualDescriptionText}
                    </div>
                  ) : null}

                  {hasTags && (
                    <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2 border-t border-dashed text-[#176161] pt-4 md:mt-8 md:gap-3 md:pt-6">
                      {tag1 && <span className={tagClassName}>{tag1}</span>}
                      {tag2 && <span className={tagClassName}>{tag2}</span>}
                      {tag3 && <span className={tagClassName}>{tag3}</span>}
                    </div>
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