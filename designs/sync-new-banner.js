export default () => {
  return {
    fields: {
      heading: { type: "text", label: "Heading", default: "Work smarter in a brighter space" },
      subtitle: { type: "text", label: "Subtitle", default: "Flexible furniture for modern teams" },
      descriptionText: { type: "textarea", label: "Description", default: "Create a workspace that feels more open, efficient, and human — built for everyday focus." },
      buttonLabel: { type: "text", label: "Button label", default: "Explore collection" },
      buttonLink: { type: "text", label: "Button link", default: "/collections" },
      imageUrl: { type: "text", label: "Background image URL", default: "/designs/design.jpeg" },
      overlaySide: {
        type: "select",
        label: "Overlay side",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
        default: "right",
      },
      overlayColor: { type: "text", label: "Overlay color", default: "rgba(0,0,0,0.4)" },
      minHeight: { type: "text", label: "Min height", default: "460px" },
      maxHeight: { type: "text", label: "Max height", default: "760px" },
    },

    defaultProps: {
      heading: "Work smarter in a brighter space",
      subtitle: "Flexible furniture for modern teams",
      descriptionText: "Create a workspace that feels more open, efficient, and human — built for everyday focus.",
      buttonLabel: "Explore collection",
      buttonLink: "/collections",
      imageUrl: "/designs/design.jpeg",
      overlaySide: "right",
      overlayColor: "rgba(78, 70, 70, 0.4)",
      minHeight: "460px",
      maxHeight: "760px",
    },

    render: ({ data, heading, subtitle, descriptionText, buttonLabel, buttonLink, imageUrl, overlaySide, overlayColor, minHeight, maxHeight }) => {
      let mapData = Array.isArray(data?.data) ? data?.data?.[0] : data?.data;
      mapData = mapData || {};

      const bannerTitle = _.get(mapData, "bannerTitle") || heading || "";
      const bannerSubTitle = _.get(mapData, "bannerSubTitle") || subtitle || "";
      const bannerDescription = _.get(mapData, "description") || descriptionText || "";
      const visibleDescription = bannerDescription;
      const bannerImageUrl = _.get(mapData, "bannerImages[0].bannerImageUrl") || imageUrl || "/designs/design.jpeg";
      const linkHref = generatePageRedirection ? generatePageRedirection(mapData) : (_.get(mapData, "link") || buttonLink || "/");
      const imageSrc = formatImageUrl(bannerImageUrl);
      const safeOverlayColor = overlayColor || "rgba(78, 70, 70, 0.4)";

      return (
        <section className="w-full py-12">
          <style>{`
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(10px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* Mobile: show the right side of the photo */
            .hero-bg-img {
              object-fit: cover;
              object-position: 75% center !important;
            }

            /* Desktop: back to centered, unchanged */
            @media (min-width: 768px) {
              .hero-bg-img {
                object-position: center !important;
              }
            }

            /* Mobile only: taller section and taller text card */
            @media (max-width: 767px) {
              .hero-mobile-wrap {
                min-height: 640px !important;
              }
              .hero-mobile-card {
                min-height: 500px;
                padding-top: 50px !important;
                padding-bottom: 50px !important;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            }
          `}</style>
          <Container>
            <div
              className="hero-mobile-wrap relative w-full overflow-hidden"
              style={{ minHeight: minHeight || "460px", maxHeight: maxHeight || "760px" }}
            >
              <Image
                src={imageSrc}
                alt={bannerTitle || "Banner"}
                fill
                className="hero-bg-img"
                priority
              />

              <div
                className={`absolute inset-y-0 ${overlaySide === "right" ? "left-0" : "right-0"} flex h-full w-full items-center justify-center px-6 py-12 text-center md:w-1/2 md:justify-start md:px-8 md:text-left`}
              >
                <div className="absolute inset-0 hidden md:block" style={{ background: safeOverlayColor }} />
                <div className="hero-mobile-card relative z-10 w-full max-w-[28rem] rounded-lg px-4 py-6 text-center md:max-w-none md:rounded-none md:p-0 md:text-left">
                  <div className="absolute inset-0 rounded-lg md:hidden" style={{ background: safeOverlayColor }} />
                  <div className="relative z-10">
                    {bannerTitle && (
                      <h1 className="mb-3 text-3xl font-bold uppercase leading-none tracking-[-0.06em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        {bannerTitle}
                      </h1>
                    )}

                    {bannerSubTitle && (
                      <div className="inline-flex flex-col items-center md:items-start">
                        <p className="text-base font-medium text-white md:text-xl">
                          {bannerSubTitle}
                        </p>
                        <div
                          style={{
                            marginTop: "12px",
                            height: "1px",
                            width: "calc(100% + 30px)",
                            backgroundColor: "rgba(218, 219, 223, 0.7)",
                          }}
                        />
                      </div>
                    )}

                    {visibleDescription && (
                      <div
                        className="mt-8 text-sm leading-relaxed text-white md:text-base animate-[fadeInUp_0.7s_ease-out_forwards]"
                        dangerouslySetInnerHTML={{ __html: visibleDescription }}
                      />
                    )}

                    {buttonLabel && (
                      <Link
                        href={linkHref}
                        className="mt-6 inline-flex items-center justify-center rounded-full border-0 bg-white px-5 py-2.5 text-[11px] font-semibold tracking-[0.08em] text-slate-900 uppercase shadow-sm transition-all duration-200 ease-out hover:bg-[#d9c5a6] hover:text-slate-900 active:bg-[#c7af85] active:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:text-xs"
                      >
                        {buttonLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};