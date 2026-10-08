export default () => {
  return {
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      heading: { type: "text", label: "Heading" },
      cardBackgroundColor: { type: "text", label: "Card background color" },
      borderColor: { type: "text", label: "Card border color" },
      benefitOneTitle: { type: "text", label: "Benefit 1 title" },
      benefitOneDescription: { type: "textarea", label: "Benefit 1 description" },
      benefitTwoTitle: { type: "text", label: "Benefit 2 title" },
      benefitTwoDescription: { type: "textarea", label: "Benefit 2 description" },
      benefitThreeTitle: { type: "text", label: "Benefit 3 title" },
      benefitThreeDescription: { type: "textarea", label: "Benefit 3 description" },
    },

    defaultProps: {
      eyebrow: "The Ergospace promise",
      heading: "Better value, delivered with care.",
      cardBackgroundColor: "transparent",
      borderColor: "transparent",
      benefitOneTitle: "Affordable prices",
      benefitOneDescription:
        "Thoughtfully designed furniture at prices that make creating a better space easier.",
      benefitTwoTitle: "UAE-wide shipping",
      benefitTwoDescription:
        "We deliver across the UAE, bringing your order straight to your door.",
      benefitThreeTitle: "Quality you can trust",
      benefitThreeDescription:
        "Reliable materials and considered craftsmanship, made for everyday use.",
    },

    render: ({
      eyebrow,
      heading,
      cardBackgroundColor,
      borderColor,
      benefitOneTitle,
      benefitOneDescription,
      benefitTwoTitle,
      benefitTwoDescription,
      benefitThreeTitle,
      benefitThreeDescription,
    }) => {
      const benefits = [
        {
          title: benefitOneTitle,
          description: benefitOneDescription,
          icon: (
            <svg
              width="32"
              height="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="#1b4d4f"
              style={{ display: "block", flexShrink: 0 }}
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.7 15.9V19h-1.4v-1.1c-1.3-.2-2.4-.9-3-2l1.2-.8c.6.9 1.3 1.4 2.4 1.4.9 0 1.8-.4 1.8-1.2 0-.7-.4-1-1.9-1.4-1.7-.5-3.1-1.1-3.1-2.8 0-1.4 1.1-2.3 2.6-2.5V7h1.4v1.1c1.1.2 1.9.8 2.5 1.7l-1.2.8c-.5-.7-1.1-1.1-2.1-1.1-.9 0-1.5.4-1.5 1 0 .7.6.9 2 1.3 1.8.5 3 .9 3 2.8 0 1.6-1.1 2.5-2.7 2.8z" />
            </svg>
          ),
        },
        {
          title: benefitTwoTitle,
          description: benefitTwoDescription,
          icon: (
            <svg
              width="32"
              height="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="#1b4d4f"
              style={{ display: "block", flexShrink: 0 }}
            >
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zm-14 10.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM17 10h2l2 3h-4v-3zm1.5 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          ),
        },
        {
          title: benefitThreeTitle,
          description: benefitThreeDescription,
          icon: (
            <svg
              width="32"
              height="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="#1b4d4f"
              style={{ display: "block", flexShrink: 0 }}
            >
              <path d="m12 2 2.1 4.26 4.7.68-3.4 3.32.8 4.69-4.2-2.21-4.2 2.21.8-4.69-3.4-3.32 4.7-.68L12 2zm-4.2 13.1L7 22l5-2.6 5 2.6-.8-6.9-4.2 2.2-4.2-2.2z" />
            </svg>
          ),
        },
      ];

      return (
        <section className="py-16 md:py-24">
          <Container>
            <header className="mx-auto mb-10 max-w-2xl text-center md:mb-16">
              {eyebrow && (
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7c4a2d] font-raleway md:text-xs">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h2 className="text-3xl font-medium leading-[1.12] tracking-[-0.04em] text-[#1b4d4f] font-raleway md:text-5xl">
                  {heading}
                </h2>
              )}
            </header>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
              {benefits.map(({ title, description, icon }, index) => (
                <article
                  key={index}
                  className="group flex h-full flex-col items-start border p-7 text-left shadow-[0_8px_28px_rgba(27,77,79,0.045)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(27,77,79,0.10)] motion-reduce:transform-none motion-reduce:transition-none md:p-9"
                  style={{
                    backgroundColor: cardBackgroundColor || "transparent",
                    borderColor: borderColor || "transparent",
                  }}
                >
                  <div className="mb-8 flex w-full items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center text-[#1b4d4f]">
                      {icon}
                    </span>
                    <span className="font-raleway text-xs font-medium tracking-[0.16em] text-[#1b4d4f]/40">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    {title && (
                      <h3 className="mb-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#1b4d4f] font-raleway md:text-2xl">
                        {title}
                      </h3>
                    )}
                    {description && (
                      <p className="max-w-sm text-sm leading-7 text-[#626760] font-raleway md:text-[15px]">
                        {description}
                      </p>
                    )}
                  </div>
                </article>
                ))}
            </div>
          </Container>
        </section>
      );
    },
  };
};
