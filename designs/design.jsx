export default () => {
  return {
    fields: {
      eyebrow: {
        type: "text",
        label: "Eyebrow",
      },
      heading: {
        type: "text",
        label: "Heading",
      },
      imageOne: {
        type: "text",
        label: "Image 1 URL",
        default: "",
      },
      imageOneLabel: {
        type: "text",
        label: "Image 1 Hover Text",
        default: "",
      },
      imageOneLink: {
        type: "text",
        label: "Image 1 Page URL",
        default: "",
      },
      imageTwo: {
        type: "text",
        label: "Image 2 URL",
        default: "",
      },
      imageTwoLabel: {
        type: "text",
        label: "Image 2 Hover Text",
        default: "",
      },
      imageTwoLink: {
        type: "text",
        label: "Image 2 Page URL",
        default: "",
      },
      imageThree: {
        type: "text",
        label: "Image 3 URL",
        default: "",
      },
      imageThreeLabel: {
        type: "text",
        label: "Image 3 Hover Text",
        default: "",
      },
      imageThreeLink: {
        type: "text",
        label: "Image 3 Page URL",
        default: "",
      },
      imageFour: {
        type: "text",
        label: "Image 4 URL",
        default: "",
      },
      imageFourLabel: {
        type: "text",
        label: "Image 4 Hover Text",
        default: "",
      },
      imageFourLink: {
        type: "text",
        label: "Image 4 Page URL",
        default: "",
      },
    },

    defaultProps: {
      eyebrow: "Explore our collection",
      heading: "Designed for better spaces",
      imageOne: "",
      imageOneLabel: "Wood",
      imageOneLink: "",
      imageTwo: "",
      imageTwoLabel: "Marble",
      imageTwoLink: "",
      imageThree: "",
      imageThreeLabel: "Solid",
      imageThreeLink: "",
      imageFour: "",
      imageFourLabel: "Trending",
      imageFourLink: "",
    },

    render: ({
      eyebrow,
      heading,
      imageOne,
      imageOneLabel,
      imageOneLink,
      imageTwo,
      imageTwoLabel,
      imageTwoLink,
      imageThree,
      imageThreeLabel,
      imageThreeLink,
      imageFour,
      imageFourLabel,
      imageFourLink,
    }) => {
      const images = [imageOne, imageTwo, imageThree, imageFour];
      const imageLabels = [
        imageOneLabel,
        imageTwoLabel,
        imageThreeLabel,
        imageFourLabel,
      ];
      const imageLinks = [
        imageOneLink,
        imageTwoLink,
        imageThreeLink,
        imageFourLink,
      ];

      return (
        <section className="bg-white py-12 md:py-16">
          {/* Plain CSS for hover, not Tailwind's group-hover variant — see
              note in the guide about dynamically-authored components not
              being covered by the static Tailwind build. */}
          <style>{`
            .c4h-tile:hover .c4h-image { transform: scale(1.1); }
            .c4h-tile:hover .c4h-overlay { opacity: 0.5; }
            .c4h-tile:hover .c4h-label { opacity: 1; }
          `}</style>

          <Container>
            <div className="mb-8 text-center md:mb-10">
              {eyebrow && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#7C4A2D] font-raleway">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h2 className="text-3xl font-bold leading-tight text-[#1B4D4F] font-raleway md:text-4xl">
                  {heading}
                </h2>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {_.map(images, (image, index) => (
                <Link
                  key={index}
                  href={imageLinks[index] || "#"}
                  className="c4h-tile relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100"
                >
                  {image ? (
                    <Image
                      src={formatImageUrl(image)}
                      alt={`${heading || "Collection"} image ${index + 1}`}
                      width={800}
                      height={1000}
                      className="c4h-image h-full w-full object-cover"
                      style={{ transition: "transform 500ms ease-out" }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-400 font-raleway">
                      Upload image {index + 1}
                    </div>
                  )}
                  <div
                    className="c4h-overlay pointer-events-none absolute inset-0 bg-black"
                    style={{ opacity: 0 }}
                  />
                  <div
                    className="c4h-label pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center"
                    style={{ opacity: 1 }}
                  >
                    <span className="bg-[#7C4A2D] px-6 py-3 text-xl font-semibold uppercase tracking-[0.16em] text-white font-raleway md:text-2xl">
                      {imageLabels[index]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      );
    },
  };
};