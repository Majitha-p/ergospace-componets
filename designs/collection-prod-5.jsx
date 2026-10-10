export default () => {
  return {
    fields: {
      heading: {
        type: "text",
        label: "Collection Heading (Optional)",
      },
      subheading: {
        type: "text",
        label: "Collection Subheading (Optional)",
      },
      collectionImage: {
        type: "text",
        label: "Collection Image URL (Optional)",
      },
      ctaLabel: {
        type: "text",
        label: "Collection CTA Label",
      },
      bgColor: {
        type: "text",
        label: "Background Color",
      },
      productBorderColor: {
        type: "text",
        label: "Product Border Color",
      },
    },

    defaultProps: {
      heading: "",
      subheading: "",
      collectionImage: "",
      ctaLabel: "Learn More",
      bgColor: "#FFFFFF",
      productBorderColor: "#EBEBEB",
      data: {
        _id: "acoustic-booth-collection",
        collectionTitle: "Premium Acoustic Booth",
        collectionSubTitle:
          "ISO Certified by International Acoustic Standards.",
        collectionImageUrl:
          "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
        customPageRedirectionUrl: "",
      },
    },

    render: ({
      data,
      heading,
      subheading,
      collectionImage,
      ctaLabel,
      bgColor,
      productBorderColor,
    }) => {
      const hasCollectionFields =
        _.has(data, "collectionTitle") ||
        _.has(data, "collectionSubTitle") ||
        _.has(data, "collectionImageUrl") ||
        _.has(data, "collectionsProducts");
      const source = hasCollectionFields ? data : _.get(data, "data", data);
      const collection = _.isArray(source)
        ? _.get(source, "[0]", {})
        : source || {};
      const productsValue = _.get(collection, "collectionsProducts", []);
      const products = _.isArray(productsValue)
        ? productsValue.slice(0, 3)
        : [];
      const firstProduct = _.get(
        _.isArray(products) ? products : [],
        "[0]",
        {}
      );
      const title = heading || _.get(collection, "collectionTitle", "");
      const description =
        subheading || _.get(collection, "collectionSubTitle", "");
      const imageUrl =
        collectionImage ||
        _.get(collection, "collectionImageUrl", "") ||
        _.get(firstProduct, "productImageUrl", "") ||
        _.get(firstProduct, "productVariants[0].variantImageUrl", "");
      const collectionHref = !_.isEmpty(
        _.get(collection, "customPageRedirectionUrl", "")
      )
        ? _.get(collection, "customPageRedirectionUrl", "")
        : `/product-listing?collectionproduct=${_.get(collection, "_id", "")}`;

      return (
        <section
          className="w-full py-10 md:py-14 lg:py-16"
          style={{ backgroundColor: bgColor || "#FFFFFF" }}
        >
          <Container>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-10 lg:gap-16 md:[grid-template-columns:minmax(0,1fr)_minmax(0,2fr)]">
              <div className="order-1 min-w-0 md:order-1">
                {title && (
                  <h2 className="max-w-sm break-words text-3xl font-medium leading-[0.98] tracking-[-0.045em] text-[#343b3e] font-raleway md:text-4xl lg:text-5xl">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-5 max-w-md text-sm leading-6 text-[#4b5153] font-raleway md:text-base">
                    {description}
                  </p>
                )}
                <Link
                  href={collectionHref}
                  className="mt-4 inline-flex items-center gap-3 text-sm font-medium text-[#202729] font-raleway transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4d4f] focus-visible:ring-offset-4"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m4.5 2.5 3.5 3.5-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {ctaLabel || "Learn More"}
                </Link>
              </div>

              <div className="order-2 min-w-0 md:order-2">
                <div className="w-full">
                  {imageUrl ? (
                    <Image
                      src={formatImageUrl(imageUrl)}
                      alt={title || "Collection"}
                      width={1600}
                      height={600}
                      className="block h-auto max-h-[240px] w-full object-contain object-right md:max-h-[280px] lg:max-h-[360px]"
                      sizes="(min-width: 768px) 65vw, 100vw"
                    />
                  ) : (
                    <div className="flex min-h-[220px] w-full items-center justify-center text-sm text-[#7a817f] font-raleway md:min-h-[300px] lg:min-h-[360px]">
                      Add a collection image
                    </div>
                  )}
                </div>
                {_.size(products) > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {_.map(products, (product, index) => {
                      const variant = _.get(product, "productVariants[0]", {});
                      const productImage =
                        _.get(variant, "variantImageUrl", "") ||
                        _.get(product, "productImageUrl", "");
                      const productTitle =
                        _.get(product, "productTitle", "") ||
                        _.get(variant, "extraProductTitle", "");
                      const productSlug =
                        _.get(variant, "slug", "") ||
                        _.get(product, "slug", "");
                      const productHref = productSlug
                        ? `/product-detail/${productSlug}`
                        : "";
                      const price =
                        _.get(variant, "offerPrice", 0) ||
                        _.get(variant, "discountPrice", 0) ||
                        _.get(variant, "price", 0) ||
                        _.get(product, "salePrice", 0);
                      const productContent = (
                        <>
                          <div className="w-full">
                            {productImage && (
                              productHref ? (
                                <Link
                                  href={productHref}
                                  className="block cursor-pointer"
                                >
                                  <Image
                                    src={formatImageUrl(productImage)}
                                    alt={productTitle || "Collection product"}
                                    width={480}
                                    height={320}
                                    className="block h-20 w-full object-contain"
                                    sizes="(min-width: 640px) 20vw, 40vw"
                                  />
                                </Link>
                              ) : (
                                <Image
                                  src={formatImageUrl(productImage)}
                                  alt={productTitle || "Collection product"}
                                  width={480}
                                  height={320}
                                  className="block h-20 w-full object-contain"
                                  sizes="(min-width: 640px) 20vw, 40vw"
                                />
                              )
                            )}
                          </div>
                          {price > 0 && (
                            productHref ? (
                              <Link
                                href={productHref}
                                className="mt-1 block cursor-pointer text-xs font-medium text-[#202729] font-raleway hover:underline"
                              >
                                AED {price}
                              </Link>
                            ) : (
                              <p className="mt-1 text-xs font-medium text-[#202729] font-raleway">
                                AED {price}
                              </p>
                            )
                          )}
                        </>
                      );
                      const cardClassName =
                        "block min-w-0 border p-1.5 transition-opacity hover:opacity-80";
                      const cardStyle = {
                        borderColor: productBorderColor || "#EBEBEB",
                      };

                      return productSlug ? (
                        <Link
                          key={_.get(
                            product,
                            "_id",
                            _.get(product, "slug", index)
                          )}
                          href={`/product-detail/${productSlug}`}
                          className={cardClassName}
                          style={cardStyle}
                        >
                          {productContent}
                        </Link>
                      ) : (
                        <article
                          key={_.get(
                            product,
                            "_id",
                            _.get(product, "slug", index)
                          )}
                          className={cardClassName}
                          style={cardStyle}
                        >
                          {productContent}
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};
