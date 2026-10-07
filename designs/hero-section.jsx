export default () => {
  return {
    fields: {
      title: { type: "text", label: "Main heading" },
      backgroundImage: { type: "text", label: "Background image URL" },
      textColor: { type: "text", label: "Title color" },
      backgroundColor: { type: "text", label: "Background color" },
      buttonLabel: { type: "text", label: "Button label" },
      buttonLink: { type: "text", label: "Button link" },
    },

    defaultProps: {
      title: "Make room for better work.",
      backgroundImage: "",
      textColor: "#ffffff",
      backgroundColor: "#123d3c",
      buttonLabel: "Explore All",
      buttonLink: "#",
    },

    render: ({ title, backgroundImage, textColor, backgroundColor, buttonLabel, buttonLink }) => {
      const imageSrc = backgroundImage ? formatImageUrl(backgroundImage) : "";

      return (
        <section className="w-full py-10 md:py-14">
          <Container>
            <div
              className="hero-section relative isolate flex min-h-[70vh] w-full items-start justify-center overflow-hidden px-6 py-20 text-center"
              style={{ backgroundColor: backgroundColor || "#123d3c" }}
            >
              <style>{`
                .hero-section {
                  min-height: clamp(480px, 70vh, 860px);
                }
                .hero-section-image {
                  position: absolute;
                  inset: 0;
                  z-index: 0;
                  object-fit: contain;
                  object-position: center;
                }
                .hero-section-title {
                  font-size: clamp(3rem, 9vw, 8rem);
                  letter-spacing: -0.065em;
                  line-height: 0.9;
                  overflow-wrap: anywhere;
                }
                .hero-section-content {
                  position: relative;
                  z-index: 2;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 1rem;
                }
                .hero-section-cta {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  padding: 10px 20px;
                  background-color: #ffffff;
                  color: #123d3c;
                  font-weight: 700;
                  text-decoration: none;
                  transition: background-color 180ms ease;
                }
                .hero-section-cta:hover {
                  background-color: #e8efed;
                }
                .hero-section-cta:focus-visible {
                  outline: 2px solid currentColor;
                  outline-offset: 4px;
                }
              `}</style>

              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  sizes="100vw"
                  className="hero-section-image"
                  priority
                />
              )}

              <div className="hero-section-content">
                <h1
                  className="hero-section-title mx-auto max-w-7xl font-extrabold font-raleway"
                  style={{ color: textColor || "#ffffff" }}
                >
                  {title}
                </h1>
                {buttonLabel && (
                  <Link className="hero-section-cta" href={buttonLink || "#"}>
                    {buttonLabel}
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};
