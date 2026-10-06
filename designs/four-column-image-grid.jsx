export default () => {
  const cardTitles = [
    "Sync Series Single Person Workstation",
    "Sync Series Two Person Workstation",
    "Sync Series Three Person Workstation",
    "Sync Series Four Person Workstation",
    "Sync Series Five Person Workstation",
    "Sync Series Six Person Workstation",
    "Sync Series Seven Person Workstation",
    "Sync Series Eight Person Workstation",
    "Sync Series Nine Person Workstation",
    "Sync Series Ten Person Workstation",
    "Sync Series Eleven Person Workstation",
    "Sync Series Twelve Person Workstation",
  ];
  const cards = cardTitles.map((title, index) => {
    const number = index + 1;
    return {
      imageField: `card${number}Image`,
      titleField: `card${number}Title`,
      buttonLabelField: `card${number}ButtonLabel`,
      buttonUrlField: `card${number}ButtonUrl`,
      title,
    };
  });

  const fields = {
    heading: { type: "text", label: "Heading" },
    subheading: { type: "text", label: "Subheading" },
  };
  const defaultProps = {
    heading: "Sync Series Workstations",
    subheading: "Single-person, two-person, three-person and more.",
  };

  cards.forEach((card, index) => {
    const number = index + 1;
    fields[card.imageField] = {
      type: "text",
      label: `Card ${number} image URL`,
    };
    fields[card.titleField] = {
      type: "text",
      label: `Card ${number} title`,
    };
    fields[card.buttonLabelField] = {
      type: "text",
      label: `Card ${number} button label`,
    };
    fields[card.buttonUrlField] = {
      type: "text",
      label: `Card ${number} button URL`,
    };

    defaultProps[card.imageField] = "";
    defaultProps[card.titleField] = card.title;
    defaultProps[card.buttonLabelField] = "View details";
    defaultProps[card.buttonUrlField] = "/product-listing";
  });

  return {
    fields,
    defaultProps,

    render: (props) => {
      const rows = Array.from({ length: 3 }, (_, rowIndex) =>
        cards.slice(rowIndex * 4, rowIndex * 4 + 4).map((card) => ({
          image: props[card.imageField] || "",
          title: props[card.titleField] || "",
          buttonLabel: props[card.buttonLabelField] || "",
          buttonUrl: props[card.buttonUrlField] || "/product-listing",
        }))
      );

      return (
        <section className="bg-white py-12 md:py-16">
          <style>{`
            .four-column-image-grid-overlay {
              position: absolute;
              z-index: 2;
              right: 0;
              bottom: 0;
              left: 0;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
              padding: 5rem 1.5rem 1.5rem;
              background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.82));
              color: #ffffff;
            }
            .four-column-image-grid-title {
              margin: 0;
              max-width: 18ch;
              color: #ffffff;
              font-size: 1.25rem;
              font-weight: 600;
              line-height: 1.2;
            }
            .four-column-image-grid-button {
              display: inline-flex;
              min-height: 2.5rem;
              align-items: center;
              justify-content: center;
              border: 1px solid #ffffff;
              padding: 0.5rem 1.25rem;
              color: #ffffff;
              font-size: 0.75rem;
              font-weight: 600;
              letter-spacing: 0.12em;
              text-decoration: none;
              text-transform: uppercase;
            }
            .four-column-image-grid-button:hover {
              background: #ffffff;
              color: #20352e;
            }
            @media (min-width: 1024px) {
              .four-column-image-grid-panels {
                display: flex;
                height: 560px;
              }
              .four-column-image-grid-panel {
                position: relative;
                flex: 1 1 0%;
                min-width: 0;
                transition: flex-grow 350ms ease-out;
              }
              .four-column-image-grid-photo {
                position: absolute;
                inset: 0;
              }
              .four-column-image-grid-image {
                transition: transform 350ms ease-out;
              }
              .four-column-image-grid-panel:hover .four-column-image-grid-image {
                transform: scale(1.02);
              }
              .four-column-image-grid-panels:hover .four-column-image-grid-panel {
                flex-grow: 0.65;
              }
              .four-column-image-grid-panels:hover .four-column-image-grid-panel:hover {
                flex-grow: 2.5;
              }
              .four-column-image-grid-panels:hover
                .four-column-image-grid-panel:not(:hover)
                .four-column-image-grid-title,
              .four-column-image-grid-panels:hover
                .four-column-image-grid-panel:not(:hover)
                .four-column-image-grid-button {
                display: none;
              }
            }
          `}</style>
          <Container>
            {(props.heading || props.subheading) && (
              <div className="mb-8 text-center md:mb-10">
                {props.heading && (
                  <h2 className="text-3xl font-semibold text-[#20352e] md:text-4xl">
                    {props.heading}
                  </h2>
                )}
                {props.subheading && (
                  <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#56645e] md:text-base">
                    {props.subheading}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="four-column-image-grid-panels grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {row.map(({ image, title, buttonLabel, buttonUrl }, index) => (
                    <div
                      key={rowIndex * 4 + index}
                      className="four-column-image-grid-panel relative aspect-[4/5] overflow-hidden bg-[#e5e8e2] lg:aspect-auto"
                    >
                      <div className="four-column-image-grid-photo relative h-full w-full overflow-hidden">
                        {image && (
                          <Image
                            src={formatImageUrl(image)}
                            alt={title || "Workstation"}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            className="four-column-image-grid-image object-cover object-center"
                          />
                        )}
                      </div>
                      <div className="four-column-image-grid-overlay">
                        {title && (
                          <h3 className="four-column-image-grid-title">{title}</h3>
                        )}
                        {buttonLabel && (
                          <Link
                            href={buttonUrl}
                            className="four-column-image-grid-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                          >
                            {buttonLabel}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Container>
        </section>
      );
    },
  };
};
