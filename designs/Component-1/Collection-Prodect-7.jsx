export default () => {
  return {
    fields: {
      collection1Heading: { type: "text", label: "Collection 1 Heading" },
      collection1Subheading: { type: "text", label: "Collection 1 Subheading" },
      collection1Description: { type: "textarea", label: "Collection 1 Description" },
      collection1ImageUrl: { type: "text", label: "Collection 1 Image URL" },
      collection1BgColor: { type: "text", label: "Collection 1 Background Color" },
      collection1MobileBgColor: { type: "text", label: "Collection 1 Background Color (Mobile)" },
      collection1BorderColor: { type: "text", label: "Collection 1 Border Color" },
      collection1CtaLabel: { type: "text", label: "Collection 1 CTA Label" },
      collection1Url: { type: "text", label: "Collection 1 Destination URL (Optional)" },
      collection2Heading: { type: "text", label: "Collection 2 Heading" },
      collection2Subheading: { type: "text", label: "Collection 2 Subheading" },
      collection2Description: { type: "textarea", label: "Collection 2 Description" },
      collection2ImageUrl: { type: "text", label: "Collection 2 Image URL" },
      collection2BgColor: { type: "text", label: "Collection 2 Background Color" },
      collection2MobileBgColor: { type: "text", label: "Collection 2 Background Color (Mobile)" },
      collection2BorderColor: { type: "text", label: "Collection 2 Border Color" },
      collection2CtaLabel: { type: "text", label: "Collection 2 CTA Label" },
      collection2Url: { type: "text", label: "Collection 2 Destination URL (Optional)" },
    },

    defaultProps: {
      collection1Heading: "",
      collection1Subheading: "",
      collection1Description: "",
      collection1ImageUrl: "",
      collection1BgColor: "",
      collection1MobileBgColor: "",
      collection1BorderColor: "",
      collection1CtaLabel: "Learn More",
      collection1Url: "",
      collection2Heading: "",
      collection2Subheading: "",
      collection2Description: "",
      collection2ImageUrl: "",
      collection2BgColor: "",
      collection2MobileBgColor: "",
      collection2BorderColor: "",
      collection2CtaLabel: "Learn More",
      collection2Url: "",
      // Existing single-collection data continues to populate column 1.
      // Supply a second collection in this data object/array to populate column 2.
      data: {
        _id: "acoustic-booth-collection",
        collectionTitle: "Premium Acoustic Booth",
        collectionSubTitle: "ISO Certified by International Acoustic Standards.",
        collectionImageUrl:
          "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
        customPageRedirectionUrl: "",
      },
    },

    render: ({
      data,
      collection1Heading,
      collection1Subheading,
      collection1Description,
      collection1ImageUrl,
      collection1BgColor,
      collection1MobileBgColor,
      collection1BorderColor,
      collection1CtaLabel,
      collection1Url,
      collection2Heading,
      collection2Subheading,
      collection2Description,
      collection2ImageUrl,
      collection2BgColor,
      collection2MobileBgColor,
      collection2BorderColor,
      collection2CtaLabel,
      collection2Url,
    }) => {
      const hasCollectionFields =
        _.has(data, "collectionTitle") ||
        _.has(data, "collectionSubTitle") ||
        _.has(data, "collectionImageUrl") ||
        _.has(data, "collectionsProducts");
      const source = hasCollectionFields ? data : _.get(data, "data", data);
      const collections = _.isArray(source)
        ? source
        : [
            _.get(source, "collection1", source),
            _.get(source, "collection2", {}),
          ];

      const collection2ProductsValue = _.get(
        collections[1],
        "collectionsProducts",
        []
      );
      const firstCollectionProductsValue = _.get(
        collections[0],
        "collectionsProducts",
        []
      );
      const collection2Products =
        _.isArray(collection2ProductsValue) && _.size(collection2ProductsValue) > 0
          ? collection2ProductsValue.slice(0, 3)
          : _.isArray(firstCollectionProductsValue)
            ? firstCollectionProductsValue.slice(3, 6)
            : [];

      const renderCollection = (collection, index, overrides, productsOverride) => {
        const item = collection || {};
        const productsValue = _.get(item, "collectionsProducts", []);
        const products =
          productsOverride === undefined
            ? _.isArray(productsValue)
              ? productsValue.slice(0, 3)
              : []
            : _.isArray(productsOverride)
              ? productsOverride
              : [];
        const firstProduct = _.get(products, "[0]", {});
        const title = overrides.heading || _.get(item, "collectionTitle", "");
        const description = overrides.subheading || _.get(item, "collectionSubTitle", "");
        const puckDescription =
          typeof overrides.description === "string"
            ? overrides.description.trim()
            : "";
        const sourceDescription = _.get(item, "description", "");
        const collectionDescription =
          puckDescription ||
          (typeof sourceDescription === "string" ? sourceDescription.trim() : "");
        const imageUrl =
          overrides.imageUrl ||
          _.get(item, "collectionImageUrl", "") ||
          _.get(firstProduct, "productImageUrl", "") ||
          _.get(firstProduct, "productVariants[0].variantImageUrl", "");
        const collectionId = _.get(item, "_id", "");
        const collectionHref =
          overrides.url ||
          _.get(item, "customPageRedirectionUrl", "") ||
          `/product-listing?collectionproduct=${collectionId}`;
        const descriptionContainsHtml = /<\/?[a-z][\s\S]*>/i.test(
          collectionDescription
        );

        return (
          <article
            key={index}
            className="collection-prodect-7-column flex h-full min-w-0 flex-col p-5 text-left md:p-6"
            style={{
              "--collection-mobile-bg": overrides.mobileBgColor || "transparent",
            }}
          >
            {description && (
              <p
                className="mb-2 text-xs font-semibold uppercase text-[#4b5153] font-raleway"
                style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
              >
                {description}
              </p>
            )}
            {title && (
              <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-3xl">
                {title}
              </h2>
            )}
            {imageUrl ? (
              <Image
                src={formatImageUrl(imageUrl)}
                alt={title || `Collection ${index + 1}`}
                width={900}
                height={520}
                className=" block h-44 w-full object-contain sm:h-52 md:h-44 lg:h-56"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ) : (
              <div className="flex h-44 w-full items-center justify-center text-sm text-[#7a817f] font-raleway sm:h-52 md:h-44 lg:h-56">
                Add a collection image
              </div>
            )}

            {_.size(products) > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {_.map(products, (product, productIndex) => {
                  const variant = _.get(product, "productVariants[0]", {});
                  const productImage =
                    _.get(variant, "variantImageUrl", "") ||
                    _.get(product, "productImageUrl", "");
                  const productTitle =
                    _.get(product, "productTitle", "") ||
                    _.get(variant, "extraProductTitle", "");
                  const productSlug =
                    _.get(variant, "slug", "") || _.get(product, "slug", "");
                  const productHref = productSlug
                    ? `/product-detail/${productSlug}`
                    : "";
                  const price =
                    _.get(variant, "offerPrice", 0) ||
                    _.get(variant, "discountPrice", 0) ||
                    _.get(variant, "price", 0) ||
                    _.get(product, "salePrice", 0);
                  const key = _.get(product, "_id", _.get(product, "slug", productIndex));
                  const card = (
                    <>
                      {productImage && (
                        <Image
                          src={formatImageUrl(productImage)}
                          alt={productTitle || "Collection product"}
                          width={480}
                          height={320}
                          className="block h-20 w-full object-contain"
                          sizes="(min-width: 640px) 20vw, 40vw"
                        />
                      )}
                      {price > 0 && (
                        <p className="mt-1 text-xs font-medium text-[#202729] font-raleway">
                          AED {price}
                        </p>
                      )}
                    </>
                  );
                  const className =
                    "block min-w-0 border p-1.5 transition-opacity hover:opacity-80";
                  const style = { borderColor: overrides.borderColor || "#EBEBEB" };

                  return productHref ? (
                    <Link key={key} href={productHref} className={className} style={style}>
                      {card}
                    </Link>
                  ) : (
                    <article key={key} className={className} style={style}>
                      {card}
                    </article>
                  );
                })}
              </div>
            )}

            <div
              className={`flex flex-1 flex-col items-start ${
                collectionDescription ? "pt-5" : ""
              }`}
            >
              {collectionDescription && (
                descriptionContainsHtml ? (
                  <div
                    className=" max-w-xl text-base leading-7 text-[#172238] font-raleway md:text-lg"
                    dangerouslySetInnerHTML={{
                      __html: collectionDescription,
                    }}
                  />
                ) : (
                  <div className=" max-w-xl text-base leading-7 text-[#172238] font-raleway md:text-lg">
                    {collectionDescription}
                  </div>
                )
              )}
              <Link
                href={collectionHref}
                aria-label={`${overrides.ctaLabel || "Learn More"}${title ? `: ${title}` : ""}`}
                className="mt-4 inline-flex items-center gap-3 text-sm font-medium text-[#202729] font-raleway transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4d4f] focus-visible:ring-offset-4"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="m4.5 2.5 3.5 3.5-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {overrides.ctaLabel || "Learn More"}
              </Link>
            </div>
          </article>
        );
      };

      const settings = [
        {
          heading: collection1Heading,
          subheading: collection1Subheading,
          description: collection1Description,
          imageUrl: collection1ImageUrl,
          bgColor: collection1BgColor,
          mobileBgColor: collection1MobileBgColor,
          borderColor: collection1BorderColor,
          ctaLabel: collection1CtaLabel,
          url: collection1Url,
        },
        {
          heading: collection2Heading,
          subheading: collection2Subheading,
          description: collection2Description,
          imageUrl: collection2ImageUrl,
          bgColor: collection2BgColor,
          mobileBgColor: collection2MobileBgColor,
          borderColor: collection2BorderColor,
          ctaLabel: collection2CtaLabel,
          url: collection2Url,
        },
      ];

      return (
        <>
          <style>{`
            @media (max-width: 767px) {
              .collection-prodect-7-column {
                background-color: var(--collection-mobile-bg);
                box-shadow: 0 0 0 100vmax var(--collection-mobile-bg);
                clip-path: inset(-20px -100vmax);
              }
            }
          `}</style>
          <section className="collection-prodect-7-section relative w-full py-10 md:py-14 lg:py-16">
            <div className="absolute inset-0 hidden grid-cols-2 md:grid">
              <div style={{ backgroundColor: collection1BgColor || "transparent" }} />
              <div style={{ backgroundColor: collection2BgColor || "transparent" }} />
            </div>
            <div className="relative z-10">
              <Container>
                <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
                  {settings.map((overrides, index) =>
                    index === 1
                      ? renderCollection(
                          collections[index],
                          index,
                          overrides,
                          collection2Products
                        )
                      : renderCollection(collections[index], index, overrides)
                  )}
                </div>
              </Container>
            </div>
          </section>
        </>
      );
    },
  };
};
