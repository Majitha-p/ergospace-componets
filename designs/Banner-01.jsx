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
        "banner-tag inline-flex min-w-0 items-center justify-center rounded-full px-3 py-2 text-center text-[11px] font-semibold tracking-[0.08em] uppercase md:px-5 md:py-2.5 font-raleway";

      return (
        <section className="w-full pt-8 pb-6 md:py-10">
          <style>{`
            .banner-description,
            .banner-description * {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-align: left !important;
            }
            .banner-image-fade {
              position: absolute;
              inset: 0;
              pointer-events: none;
            }
            .banner-layout {
              min-height: 700px;
            }
            .banner-image-panel {
              min-height: 700px;
            }
            .banner-image-default {
              visibility: visible;
              transition:  1s linear 300ms, visibility 3s linear 300ms;
            }
            .banner-image-hover {
              opacity: 0;
              visibility: hidden;
              transition: opacity 300ms ease-in-out, visibility 3s linear 300ms;
            }
            .banner-tag {
              background: rgba(164, 211, 202, 0.2);
              color: #176161;
              transition: background-color 180ms ease;
            }
            .banner-tag:hover {
              background: rgba(164, 211, 202, 0.38);
            }
            @media (hover: hover) and (pointer: fine) {
              .banner-has-hover-image:hover .banner-image-default {
                opacity: 0;
                visibility: hidden;
                transition-delay: 0s;
              }
              .banner-has-hover-image:hover .banner-image-hover {
                opacity: 1;
                visibility: visible;
                transition: opacity 300ms ease-in-out, visibility 0s;
              }
            }
            @media (max-width: 767px) {
              .banner-layout {
                min-height: 0;
                grid-template-rows: 420px auto;
              }
              .banner-image-panel {
                min-height: 420px;
                height: 420px;
              }
            }
            @media (min-width: 768px) {
              .banner-image-fade {
                background: linear-gradient(to right, transparent 58%, var(--banner-bg-color) 100%);
              }
            }
          `}</style>
          <Container>
            <div className="banner-layout mx-auto grid w-full grid-cols-1 overflow-hidden rounded-none md:grid-cols-12">
              {/* Left Column: Image with Hover Transition */}
              <div
                className={`banner-image-panel relative w-full overflow-hidden bg-gray-100 md:col-span-7 lg:col-span-7${hasHoverImage ? " banner-has-hover-image" : ""}`}
                style={{ "--banner-bg-color": "#f7fafa" }}
              >
                {hasImage && (
                  <Image
                    src={formatImageUrl(resolvedImageUrl)}
                    alt="Ergospace office furniture"
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover object-center banner-image-default"
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

              {/* Right Column: Left-Aligned Content Panel */}
              <div
                className="flex min-w-0 flex-col justify-center px-5 py-4 text-left md:col-span-5 md:px-8 md:py-12 lg:col-span-5 lg:px-12"
                style={{ backgroundColor: "#f7fafa" }}
              >
                <div className="flex w-full max-w-md flex-col justify-center text-left">
                  {eyebrowText && (
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#176161] font-raleway md:mb-5 lg:mb-6">
                      {eyebrowText}
                    </p>
                  )}

                  {titleText && (
                    <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-[#176161] font-raleway md:mb-6 md:text-5xl lg:mb-8 lg:text-6xl">
                      {titleText}
                    </h1>
                  )}

                  {!_.isEmpty(sourceDescription) ? (
                    <div
                      className="banner-description text-base font-medium md:mt-2 md:text-xl lg:mt-3"
                      dangerouslySetInnerHTML={{ __html: sourceDescription }}
                    />
                  ) : !_.isEmpty(manualDescriptionText) ? (
                    <div className="banner-description text-base font-medium md:mt-2 md:text-xl lg:mt-3">
                      {manualDescriptionText}
                    </div>
                  ) : null}

                  {hasTags && (
                    <div className="mt-3 flex w-full flex-wrap items-left justify-left gap-2 pt-2 text-[#176161] md:mt-8 md:gap-3 md:pt-6">
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