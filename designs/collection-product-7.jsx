export default () => {
  return {
    fields: {
      heading: { type: "text", label: "Heading" },
      description: { type: "textarea", label: "Description" },
      featureImageUrl: { type: "text", label: "Left feature image URL" },
      bannerImageUrl: { type: "text", label: "Banner image URL" },
      backgroundColor: { type: "text", label: "Background color" },
      ctaLabel: { type: "text", label: "Button label" },
      ctaUrl: { type: "text", label: "Button URL" },
    },

    defaultProps: {
      heading: "",
      description: "",
      featureImageUrl: "",
      bannerImageUrl: "",
      backgroundColor: "#ffff",
      ctaLabel: "Explore the Collection",
      ctaUrl: "",
      data: {
        _id: "default-workspace-collection",
        collectionTitle: "Interactive Family Tree",
        collectionSubTitle:
          "See photos, dates, and relationships at a glance. Explore the details that make every space feel considered.",
        collectionImageUrl:
          "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
        collectionsProducts: [
          {
            _id: "default-product-id-1",
            productTitle: "Color Full Height CEO Cabinet",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
          },
          {
            _id: "default-product-id-2",
            productTitle: "Color Full Height CEO Cabinet",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
          },
          {
            _id: "default-product-id-3",
            productTitle: "Color Full Height Two Door Storage Cabinet",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
          },
        ],
      },
    },

    render: ({
      data,
      heading,
      description,
      featureImageUrl,
      bannerImageUrl,
      backgroundColor,
      ctaLabel,
      ctaUrl,
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
      const productsValue = _.get(collection, "collectionsProducts", []);
      const products = _.isArray(productsValue) ? productsValue.slice(0, 3) : [];
      const title =
        heading ||
        _.get(collection, "collectionTitle", "") ||
        "Interactive Family Tree";
      const subtitle = _.get(collection, "collectionSubTitle", "");
      const sourceDescription = _.get(collection, "description", "");
      const body = description || sourceDescription;
      const collectionImage =
        bannerImageUrl ||
        _.get(collection, "bannerImages[0].bannerImageUrl", "") ||
        _.get(collection, "bannerImageUrl", "") ||
        _.get(collection, "collectionImageUrl", "");
      const descriptionContainsHtml = /<\/?[a-z][\s\S]*>/i.test(body);
      const resolvedBackground = backgroundColor || "#fff";
      const customUrl = (
        _.get(collection, "customPageRedirectionUrl") || ""
      ).trim();
      const collectionId = _.get(collection, "_id", "");
      const ctaHref =
        (ctaUrl || "").trim() ||
        customUrl ||
        (collectionId
          ? `/product-listing?collectionproduct=${collectionId}`
          : "#collection-products");

      const renderImage = (imageUrl, alt) =>
        imageUrl ? (
          <Image
            src={formatImageUrl(imageUrl)}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#d8cec1] px-6 text-center text-sm text-[#695e50]">
            Add an image URL
          </div>
        );

      return (
        <section
          className="w-full py-8 text-[#30200f] sm:py-10 lg:py-14"
          style={{ backgroundColor: resolvedBackground }}
        >
          <Container>
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-4">
              <div className="flex min-w-0 flex-col gap-6">
                <div className="max-w-xl">
                  {subtitle && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7658] sm:text-sm">
                      {subtitle}
                    </p>
                  )}
                  {title && (
                    <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">
                      {title}
                    </h2>
                  )}
                  {body && (
                    descriptionContainsHtml ? (
                      <div
                        className="mt-5 max-w-lg text-base leading-[1.3] sm:text-lg"
                        dangerouslySetInnerHTML={{ __html: body }}
                      />
                    ) : (
                      <p className="mt-5 max-w-lg text-base leading-[1.3] sm:text-lg">
                        {body}
                      </p>
                    )
                  )}
                  {ctaLabel && (
                    <a
                      href={ctaHref}
                      className="mt-5 inline-flex rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#176161]"
                    >
                      {ctaLabel}
                    </a>
                  )}
                </div>

                <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:min-h-80 md:flex-1">
                  {renderImage(collectionImage, title || "Collection banner")}
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-3">
                <div className="relative min-h-64 w-full flex-1 overflow-hidden sm:min-h-80 lg:min-h-[420px]">
                  {renderImage(featureImageUrl, title || "Featured collection")}
                </div>

                {products.length > 0 ? (
                  <div
                    id="collection-products"
                    className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {products.map((product, index) => (
                      <div
                        key={_.get(product, "_id", _.get(product, "slug", index))}
                        className="min-w-0"
                      >
                        <ProductItem productItem={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="bg-white p-4 text-sm text-[#695e50]">
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