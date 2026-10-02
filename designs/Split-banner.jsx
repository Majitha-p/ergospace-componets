export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      headingLine1: { type: "text", label: "Heading line 1" },
      description: { type: "textarea", label: "Description" },
      bgColorStart: { type: "text", label: "Gradient start color" },
      bgColorEnd: { type: "text", label: "Gradient end color" },
      eyebrowColor: { type: "text", label: "Eyebrow text color" },
      headingColor: { type: "text", label: "Heading text color" },
      descriptionColor: { type: "text", label: "Description text color" },
      imageUrl: { type: "text", label: "Image URL" },
    },

    defaultProps: {
      eyebrow: "SYNC SERIES",
      headingLine1: "Sync Series.",
      description: "Designed to bring style, function, and flexibility together in every workspace.",
      bgColorStart: "#000000",
      bgColorEnd: "#015c61",
      eyebrowColor: "#E8D5B0",
      headingColor: "#ffffff",
      descriptionColor: "rgba(255, 255, 255, 0.84)",
      imageUrl: "/designs/design.jpeg",
    },

    render: ({
      eyebrow,
      headingLine1,
      description,
      bgColorStart,
      bgColorEnd,
      eyebrowColor,
      headingColor,
      descriptionColor,
      imageUrl,
    }) => {
      const imageSrc = formatImageUrl(imageUrl || "/designs/design.jpeg");

      return (
        <Container>
          <style>{`
            .split-banner-layout {
              display: grid;
              grid-template-columns: minmax(0, 1fr);
            }
            .split-banner-image {
              grid-column: 1;
              grid-row: 2;
            }
            .split-banner-content {
              grid-column: 1;
              grid-row: 1;
            }
            @media (min-width: 768px) {
              .split-banner-layout {
                grid-template-columns: 2fr 3fr;
              }
              .split-banner-image {
                grid-column: 2;
                grid-row: 1;
              }
              .split-banner-content {
                grid-column: 1;
                grid-row: 1;
              }
            }
          `}</style>
          <div className="py-8">
            <section
              className="split-banner-layout overflow-hidden md:min-h-96"
              style={{
                backgroundColor: "#0c3f3a",
              }}
            >
              {/* Image: below content on mobile, right side on desktop */}
              <div
                className="split-banner-image relative h-56 md:h-auto"
                style={{ minHeight: "224px" }}
              >
                <Image
                  src={imageSrc}
                  alt={headingLine1 || "Banner"}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Content: above image on mobile, left side on desktop */}
              <div
                className="split-banner-content relative z-10 flex flex-col items-center justify-center px-6 pt-8 pb-10 text-center md:items-start md:px-10 md:py-12 md:text-left md:shadow-xl"
                style={{
                  background: `linear-gradient(90deg, ${bgColorStart || "#000000"} 0%, ${bgColorEnd || "#015c61"} 100%)`,
                }}
              >
                {eyebrow && (
                  <p
                    className="mb-4 flex items-center gap-3 text-xs font-bold uppercase"
                    style={{ color: eyebrowColor || "#E8D5B0", letterSpacing: "0.22em" }}
                  >
                    <span
                      style={{
                        display: "block",
                        flexShrink: 0,
                        width: "28px",
                        height: "2px",
                        borderRadius: "9999px",
                        backgroundColor: eyebrowColor || "#E8D5B0",
                      }}
                    />
                    {eyebrow}
                  </p>
                )}

                <h1
                  className="text-3xl font-extrabold leading-tight break-words md:text-4xl"
                  style={{ color: headingColor || "#ffffff", letterSpacing: "-0.02em" }}
                >
                  <span className="block">{headingLine1}</span>
                </h1>

                {description && (
                  <p
                    className="mt-5 max-w-md text-sm leading-relaxed md:text-base"
                    style={{ color: descriptionColor || "rgba(255, 255, 255, 0.84)" }}
                  >
                    {description}
                  </p>
                )}
              </div>
            </section>
          </div>
        </Container>
      );
    },
  };
};