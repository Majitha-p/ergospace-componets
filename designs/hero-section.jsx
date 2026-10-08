export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      title: { type: "text", label: "Main heading" },
      description: { type: "textarea", label: "Description" },
      leftImageUrl: { type: "text", label: "Left image URL" },
      leftImageAlt: { type: "text", label: "Left image alt text" },
      backgroundImage: { type: "text", label: "Right image URL" },
      rightImageAlt: { type: "text", label: "Right image alt text" },
      textColor: { type: "text", label: "Text color" },
      backgroundColor: { type: "text", label: "Background color" },
      buttonLabel: { type: "text", label: "Button label" },
      buttonLink: { type: "text", label: "Button link" },
    },

    defaultProps: {
      eyebrow: "DESIGNED FOR EVERY DAY",
      title: "Make room for better work.",
      description:
        "Thoughtful design brings clarity to your day, shaping spaces for focus, comfort, and better work.",
      leftImageUrl: "",
      leftImageAlt: "People in a thoughtfully designed workspace",
      backgroundImage: "",
      rightImageAlt: "A closer look at thoughtfully designed furniture",
      textColor: "#171815",
      backgroundColor: "#f2f0eb",
      buttonLabel: "Explore the collection",
      buttonLink: "/collections",
    },

    render: ({
      eyebrow,
      title,
      description,
      leftImageUrl,
      leftImageAlt,
      backgroundImage,
      rightImageAlt,
      textColor,
      backgroundColor,
      buttonLabel,
      buttonLink,
    }) => {
      const leftImageSrc = leftImageUrl ? formatImageUrl(leftImageUrl) : "";
      const rightImageSrc = backgroundImage ? formatImageUrl(backgroundImage) : "";

      return (
        <section
          className="hero-section w-full py-8 sm:py-10 md:py-14"
          style={{
            backgroundColor: backgroundColor || "#f2f0eb",
            color: textColor || "#171815",
          }}
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
                  {eyebrow && <p className="hero-section-eyebrow">{eyebrow}</p>}
                  {title && <h1 className="hero-section-title">{title}</h1>}
                </div>

                <div className="hero-section-details">
                  {description && <p className="hero-section-description">{description}</p>}
                  {buttonLabel && (
                    <Link className="hero-section-cta" href={buttonLink || "#"}>
                      {buttonLabel}
                    </Link>
                  )}
                </div>
              </div>

              <div className="hero-section-gallery">
                <div className="hero-section-image-panel">
                  {leftImageSrc && (
                    <Image
                      src={leftImageSrc}
                      alt={leftImageAlt || ""}
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
                      alt={rightImageAlt || ""}
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
