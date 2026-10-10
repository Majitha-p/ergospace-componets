export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      title: { type: "text", label: "Main heading" },
      description: { type: "textarea", label: "Description" },
      leftImageUrl: { type: "text", label: "Left image URL" },
      leftImageAlt: { type: "text", label: "Left image alt text", default: "" },
      rightImageUrl: { type: "text", label: "Right image URL" },
      textColor: { type: "text", label: "Text color" },
      backgroundColor: { type: "text", label: "Background color" },
      buttonLabel: { type: "text", label: "Button label" },
      buttonLink: { type: "text", label: "Button link" },
    },

    defaultProps: {
      eyebrow: "",
      title: "",
      description: "",
      leftImageUrl: "",
      leftImageAlt: "",
      rightImageUrl: "",
      textColor: "#171815",
      backgroundColor: "#f2f0eb",
      buttonLabel: "Explore the collection",
      buttonLink: "/collections",
    },

    render: ({
      data,
      eyebrow,
      title,
      description,
      leftImageUrl,
      leftImageAlt,
      rightImageUrl,
      textColor,
      backgroundColor,
      buttonLabel,
      buttonLink,
    }) => {
      let mapData = Array.isArray(data?.data) ? data?.data?.[0] : data?.data;
      mapData = mapData || {};
      const resolvedEyebrow = (eyebrow || "").trim() || (_.get(mapData, "bannerSubTitle") || "").trim();
      const resolvedTitle = (title || "").trim() || (_.get(mapData, "bannerTitle") || "").trim();
      const resolvedDescription = (description || "").trim() || (_.get(mapData, "description") || "").trim();
      const resolvedRightImageUrl =
        _.get(mapData, "bannerImages[0].bannerImageUrl") || rightImageUrl || "/two-person-workstation.jpeg";
      const resolvedLeftImageUrl = (leftImageUrl || "").trim();
      const resolvedTextColor = (textColor || "").trim() || "#171815";
      const resolvedButtonLabel = (buttonLabel || "").trim();
      const resolvedButtonLink = (buttonLink || "").trim();
      const leftImageSrc = resolvedLeftImageUrl ? formatImageUrl(resolvedLeftImageUrl) : "";
      const rightImageSrc = resolvedRightImageUrl ? formatImageUrl(resolvedRightImageUrl) : "";

      return (
        <section
          className="hero-section w-full py-8 sm:py-10 md:py-14"
          style={{ backgroundColor: backgroundColor || "#f2f0eb" }}
        >
          <style>{`
            .hero-section-layout {
              display: grid;
              gap: 1.5rem;
            }
            .hero-section-intro {
              display: grid;
              align-items: end;
              gap: 1.25rem;
              padding: 0 0.75rem;
            }
            .hero-section-title {
              max-width: 14ch;
              font-size: clamp(2.25rem, 5vw, 4rem);
              font-weight: 500;
              letter-spacing: -0.055em;
              line-height: 1.04;
            }
            .hero-section-eyebrow {
              margin-bottom: 0.75rem;
              font-size: 0.7rem;
              font-weight: 600;
              letter-spacing: 0.18em;
              opacity: 0.65;
              text-transform: uppercase;
            }
            .hero-section-details {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
              max-width: 22rem;
            }
            .hero-section-description {
              font-size: 0.95rem;
              line-height: 1.65;
              opacity: 0.76;
            }
            .hero-section-cta {
              display: inline-flex;
              min-height: 2.75rem;
              align-items: center;
              justify-content: center;
              border-radius: 9999px;
              padding: 0.65rem 1.25rem;
              background-color: #171815;
              color: #ffffff;
              font-size: 0.875rem;
              font-weight: 500;
              text-decoration: none;
              transition: background-color 180ms ease;
            }
            .hero-section-cta:hover {
              background-color: #3a3b37;
            }
            .hero-section-cta:focus-visible {
              outline: 2px solid currentColor;
              outline-offset: 4px;
            }
            .hero-section-gallery {
              display: grid;
              grid-template-columns: minmax(0, 0.58fr) minmax(0, 1fr);
              gap: 0.5rem;
              height: clamp(18rem, 45vw, 34rem);
            }
            .hero-section-image-panel {
              position: relative;
              min-width: 0;
              overflow: hidden;
              background-color: #deddd9;
            }
            .hero-section-image {
              object-fit: cover;
              object-position: center;
            }
            @media (min-width: 768px) {
              .hero-section-intro {
                grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.52fr);
                gap: 2rem;
              }
              .hero-section-details {
                justify-self: end;
                align-items: flex-end;
                text-align: right;
              }
            }
            @media (max-width: 639px) {
              .hero-section-intro {
                gap: 1rem;
                padding: 0 0.25rem;
              }
              .hero-section-details {
                max-width: 30rem;
              }
              .hero-section-gallery {
                grid-template-columns: minmax(0, 1fr);
                height: auto;
              }
              .hero-section-image-panel:first-child {
                aspect-ratio: 4 / 3;
              }
              .hero-section-image-panel:last-child {
                aspect-ratio: 16 / 9;
              }
            }
          `}</style>

          <Container>
            <div className="hero-section-layout mx-auto max-w-7xl">
              <div className="hero-section-intro">
                <div>
                  {resolvedEyebrow && (
                    <p className="hero-section-eyebrow" style={{ color: resolvedTextColor }}>
                      {resolvedEyebrow}
                    </p>
                  )}
                  {resolvedTitle && (
                    <h1 className="hero-section-title" style={{ color: resolvedTextColor }}>
                      {resolvedTitle}
                    </h1>
                  )}
                </div>

                <div className="hero-section-details">
                  {resolvedDescription && (
                    <div
                      className="hero-section-description"
                      style={{ color: resolvedTextColor }}
                      dangerouslySetInnerHTML={{ __html: resolvedDescription }}
                    />
                  )}
                  {resolvedButtonLabel && (
                    <Link className="hero-section-cta" href={resolvedButtonLink || "#"}>
                      {resolvedButtonLabel}
                    </Link>
                  )}
                </div>
              </div>

              <div className="hero-section-gallery">
                <div className="hero-section-image-panel">
                  {leftImageSrc && (
                    <Image
                      src={leftImageSrc}
                      alt={(leftImageAlt || "").trim()}
                      fill
                      sizes="(min-width: 640px) 36vw, 100vw"
                      className="hero-section-image"
                      priority
                    />
                  )}
                </div>
                <div className="hero-section-image-panel">
                  {rightImageSrc && (
                    <Image
                      src={rightImageSrc}
                      alt={resolvedTitle || ""}
                      fill
                      sizes="(min-width: 640px) 62vw, 100vw"
                      className="hero-section-image"
                      priority
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
