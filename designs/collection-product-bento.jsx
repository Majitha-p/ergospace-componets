export default () => {
  return {
    fields: {
      upperImageUrl: { type: "text", label: "Upper Center Image URL" },
      lowerImageUrl: { type: "text", label: "Lower Center Image URL" },
      contentBackgroundColor: {
        type: "text",
        label: "Content Panel Background Color",
      },
      contentTextColor: {
        type: "text",
        label: "Content Panel Text Color",
      },
      ctaLabel: { type: "text", label: "Button Label" },
      ctaUrl: { type: "text", label: "Button URL" },
      gridFillColor: { type: "text", label: "Empty Grid Fill Color" },
      backgroundColor: { type: "text", label: "Section Background Color" },
    },

    defaultProps: {
      upperImageUrl: "",
      lowerImageUrl: "",
      contentBackgroundColor: "#30383d",
      contentTextColor: "#ffffff",
      ctaLabel: "Explore the Collection",
      ctaUrl: "",
      gridFillColor: "#c9d2d9",
      backgroundColor: "#ffffff",
      data: {
        collectionTitle: "ORANGE SERIES",
        collectionSubTitle: "Bold Design Brighter Workspaces.",
        description:
          "Discover modern office workstations with vibrant orange accents, designed to bring style and functionality to contemporary offices.",
        collectionImageUrl:
          "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
        collectionsProducts: [
          {
            _id: "default-product-1",
            productTitle: "Color Straight Executive Desk",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
          },
          {
            _id: "default-product-2",
            productTitle: "Color Straight Executive Desk",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
          },
          {
            _id: "default-product-3",
            productTitle: "Color Straight Executive Desk",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
          },
        ],
      },
    },

    render: ({
      data,
      upperImageUrl,
      lowerImageUrl,
      contentBackgroundColor,
      contentTextColor,
      ctaLabel,
      ctaUrl,
      gridFillColor,
      backgroundColor,
    }) => {
      const hasCollectionFields =
        _.has(data, "collectionTitle") ||
        _.has(data, "collectionSubTitle") ||
        _.has(data, "description") ||
        _.has(data, "collectionImageUrl") ||
        _.has(data, "collectionsProducts");
      const source = hasCollectionFields ? data : _.get(data, "data", data);
      const collection = _.isArray(source)
        ? _.get(source, "[0]", {})
        : source || {};
      const heading = _.get(collection, "collectionTitle", "");
      const subheading = _.get(collection, "collectionSubTitle", "");
      const description = _.get(collection, "description", "");
      const collectionId = _.get(collection, "_id", "");
      const customUrl = _.get(collection, "customPageRedirectionUrl", "");
      const ctaHref =
        (typeof ctaUrl === "string" && ctaUrl.trim()) ||
        (typeof customUrl === "string" && customUrl.trim()) ||
        (collectionId
          ? `/product-listing?collectionproduct=${collectionId}`
          : "#collection-products");
      const primaryImageUrl = _.get(collection, "collectionImageUrl", "");
      const productsValue = _.get(collection, "collectionsProducts", []);
      const products = _.isArray(productsValue)
        ? productsValue.slice(0, 3)
        : [];
      const descriptionContainsHtml =
        typeof description === "string" &&
        /<\/?[a-z][\s\S]*>/i.test(description);

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
                  className="flex flex-1 flex-col justify-center px-5 py-6"
                  style={{
                    backgroundColor: contentBackgroundColor || "#30383d",
                    color: contentTextColor || "#ffffff",
                  }}
                >
                  {heading && (
                    <h2 className="text-2xl font-bold tracking-wide">
                      {heading}
                    </h2>
                  )}
                  {subheading && (
                    <p className="mt-2 text-base leading-snug">
                      {subheading}
                    </p>
                  )}
                  {description && (
                    descriptionContainsHtml ? (
                      <div
                        className="mt-3 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    ) : (
                      <p className="mt-3 text-sm leading-relaxed">
                        {description}
                      </p>
                    )
                  )}
                  {ctaLabel && (
                    <a
                      href={ctaHref}
                      className="mt-4 inline-flex self-start rounded-md px-5 py-3 text-sm font-semibold transition-colors"
                      style={{
                        backgroundColor: contentTextColor || "#ffffff",
                        color: contentBackgroundColor || "#30383d",
                      }}
                    >
                      {ctaLabel}
                    </a>
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

              <div
                id="collection-products"
                className="grid min-h-[500px] min-w-0 grid-cols-2 gap-3 md:col-span-2 md:flex md:flex-col"
              >
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <div
                      key={_.get(product, "_id", _.get(product, "slug", index))}
                      className="min-w-0"
                    >
                      <ProductItem productItem={product} />
                    </div>
                  ))
                ) : (
                  <p className="bg-white p-4 text-sm text-gray-700">
                    No products are available in this collection yet.
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};