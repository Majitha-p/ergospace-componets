export default () => {
  return {
    fields: {
      heading: { type: "text", label: "Collection Heading" },
      subheading: { type: "text", label: "Collection Subheading" },
      description: { type: "textarea", label: "Collection Description" },
      primaryImageUrl: { type: "text", label: "Left Collection Image URL" },
      upperImageUrl: { type: "text", label: "Upper Center Image URL" },
      lowerImageUrl: { type: "text", label: "Lower Center Image URL" },
      contentBackgroundColor: {
        type: "text",
        label: "Content Panel Background Color",
      },
      gridFillColor: { type: "text", label: "Empty Grid Fill Color" },
      backgroundColor: { type: "text", label: "Section Background Color" },
    },

    defaultProps: {
      heading: "ORANGE SERIES",
      subheading: "Bold Design Brighter Workspaces.",
      description:
        "Discover modern office workstations with vibrant orange accents, designed to bring style and functionality to contemporary offices.",
      primaryImageUrl:
        "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
      upperImageUrl: "",
      lowerImageUrl: "",
      contentBackgroundColor: "#30383d",
      gridFillColor: "#c9d2d9",
      backgroundColor: "#ffffff",
    },

    render: ({
      heading,
      subheading,
      description,
      primaryImageUrl,
      upperImageUrl,
      lowerImageUrl,
      contentBackgroundColor,
      gridFillColor,
      backgroundColor,
    }) => {
      const renderImage = (imageUrl, alt) => {
        const imageSrc =
          typeof imageUrl === "string" ? imageUrl.trim() : "";

        return imageSrc ? (
          <Image
            src={formatImageUrl(imageSrc)}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            role="img"
            aria-label={alt}
            style={{ backgroundColor: gridFillColor || "#c9d2d9" }}
          />
        );
      };

      return (
        <section
          className="w-full py-5"
          style={{ backgroundColor: backgroundColor || "#ffffff" }}
        >
          <Container>
            <div className="grid w-full grid-cols-1 gap-3 md:min-h-[420px] md:grid-cols-12">
              <div className="flex min-h-[500px] min-w-0 flex-col gap-3 md:col-span-6">
                <div
                  className="relative min-h-[260px] flex-1 overflow-hidden"
                  style={{ flex: "2.6" }}
                >
                  {renderImage(primaryImageUrl, heading || "Collection")}
                </div>
                <div
                  className="flex flex-1 flex-col justify-center px-5 py-6 text-white"
                  style={{
                    backgroundColor: contentBackgroundColor || "#30383d",
                  }}
                >
                  {heading && (
                    <h2 className="text-xl font-semibold uppercase tracking-wide">
                      {heading}
                    </h2>
                  )}
                  {subheading && (
                    <p className="mt-1 text-base leading-snug">
                      {subheading}
                    </p>
                  )}
                  {description && (
                    <p className="mt-2 text-sm leading-relaxed text-white">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex min-h-[500px] min-w-0 flex-col gap-3 md:col-span-4">
                <div className="relative min-h-[180px] flex-1 overflow-hidden">
                  {renderImage(upperImageUrl, `${heading} upper feature`)}
                </div>
                <div className="relative min-h-[180px] flex-1 overflow-hidden">
                  {renderImage(lowerImageUrl, `${heading} lower feature`)}
                </div>
              </div>

              <div className="flex min-h-[500px] min-w-0 flex-col gap-3 md:col-span-2">
                {[1, 2, 3].map((tile) => (
                  <div
                    key={tile}
                    className="min-h-[95px] flex-1"
                    style={{ backgroundColor: gridFillColor || "#c9d2d9" }}
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};