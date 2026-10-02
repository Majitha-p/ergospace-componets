export default () => {
  return {
    fields: {
      galleryImageTwo: {
        type: "text",
        label: "Second Collection Image URL",
      },
      ctaLabel: {
        type: "text",
        label: "Collection Link Label",
      },
      bgColor: {
        type: "text",
        label: "Background Color",
      },
    },

    defaultProps: {
      galleryImageTwo:
        "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
      ctaLabel: "Explore collection",
      bgColor: "#FFFFFF",
      data: {
        _id: "executive-desk-white-series",
        collectionTitle: "Executive Desks — White Series",
        collectionSubTitle:
          "A clean, bright finish for considered executive workspaces.",
        description:
          "<p>Explore executive desks from the White Series, designed to bring a calm, contemporary look to your office.</p>",
        collectionImageUrl:
          "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
        customPageRedirectionUrl: "",
        collectionsProducts: [
          {
            _id: "default-product-id-1",
            slug: "executive-desk-1",
            productTitle: "White Series Executive Desk",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
            productVariants: [
              {
                slug: "executive-desk-1",
                extraProductTitle: "White Series Executive Desk",
                variantImageUrl:
                  "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
                price: 4769,
                discountPrice: 0,
                offerPrice: 0,
              },
            ],
          },
          {
            _id: "default-product-id-2",
            slug: "executive-desk-2",
            productTitle: "White Series L-Shape Desk",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
            productVariants: [
              {
                slug: "executive-desk-2",
                extraProductTitle: "White Series L-Shape Desk",
                variantImageUrl:
                  "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
                price: 5695,
                discountPrice: 0,
                offerPrice: 0,
              },
            ],
          },
        ],
      },
    },

    render: ({ data, galleryImageTwo, ctaLabel, bgColor }) => {
      const source = _.get(data, "data", data);
      const collection = _.isArray(source)
        ? _.get(source, "[0]", {})
        : source || {};
      const productsValue = _.get(collection, "collectionsProducts", []);
      const products = (_.isArray(productsValue) ? productsValue : []).slice(
        0,
        2
      );
      const title = _.get(collection, "collectionTitle", "");
      const eyebrow = _.get(collection, "collectionSubTitle", "");
      const description = _.get(collection, "description", "");
      const mainImageUrl = _.get(collection, "collectionImageUrl", "");
      const collectionHref = !_.isEmpty(
        _.get(collection, "customPageRedirectionUrl", "")
      )
        ? _.get(collection, "customPageRedirectionUrl", "")
        : `/product-listing?collectionproduct=${_.get(collection, "_id", "")}`;

      const formatSeriesLabel = (value) => {
        const raw = String(value || "").trim();
        if (_.isEmpty(raw)) return "";
        const matches = [
          ...raw.matchAll(
            /([A-Za-z][A-Za-z0-9&'-]*(?:\s+[A-Za-z][A-Za-z0-9&'-]*)*)\s+Series/gi
          ),
        ];
        const last = matches[_.size(matches) - 1];
        return last ? _.get(last, "[1]", "").trim() : "";
      };

      const seriesFromImageUrl = (url) => {
        const match = String(url || "").match(/\/series\/([^/?#]+)/i);
        const slug = decodeURIComponent(_.get(match, "[1]", "")).replace(
          /[-_]+/g,
          " "
        );
        if (_.isEmpty(slug)) return "";
        const titled = slug.replace(/\b\w/g, (letter) => letter.toUpperCase());
        return titled.replace(/\s*series$/i, "").trim();
      };

      const getSeriesLabel = (productTitle, imageUrl) =>
        formatSeriesLabel(productTitle) ||
        seriesFromImageUrl(imageUrl) ||
        formatSeriesLabel(title);

      const renderTile = (src, alt, placeholder) =>
        src ? (
          <Image
            src={formatImageUrl(src)}
            alt={alt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-[#7a817f] font-raleway">
            {placeholder}
          </div>
        );

      return (
        <section
          className="w-full py-8 md:py-12 lg:py-16"
          style={{ backgroundColor: bgColor || "#FFFFFF" }}
        >
          <style>{`
            .cp4-layout {
              display: grid;
              grid-template-columns: minmax(0, 1fr);
              gap: 2rem;
              align-items: start;
            }
            .cp4-gallery {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 0.75rem;
              min-height: 300px;
            }
            .cp4-tile {
              position: relative;
              height: 100%;
              min-height: 0;
              overflow: hidden;
              border-radius: 1rem;
              background: #f5f4f1;
            }
            .cp4-copy {
              text-align: left;
            }
            .cp4-cta-wrap {
              margin-top: 1.75rem;
            }
            .cp4-cta {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0.75rem 1.75rem;
              border-radius: 9999px;
              background: linear-gradient(to right, #1b4d4f, #153f41);
              color: #ffffff;
              font-size: 0.875rem;
              font-weight: 600;
              text-decoration: none;
              line-height: 1.25;
            }
            .cp4-cta:hover {
              opacity: 0.9;
            }
            .cp4-products {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 12px;
              margin-top: 2rem;
            }
            .cp3-card {
              height: 100%;
              min-width: 0;
              max-width: 100%;
              display: flex;
              flex-direction: column;
              background: #ffffff;
              border: 1px solid #ececec;
              border-radius: 12px;
              box-shadow: 0 6px 18px rgba(17, 17, 17, 0.06);
              overflow: hidden;
              box-sizing: border-box;
            }
            .cp3-card-media {
              position: relative;
              aspect-ratio: 4 / 3;
              background: #f7f7f5;
              overflow: hidden;
            }
            .cp3-badge {
              position: absolute;
              top: 6px;
              right: 6px;
              left: auto;
              z-index: 3;
              max-width: calc(100% - 12px);
              padding: 4px 8px;
              border-radius: 6px;
              background: rgba(255, 255, 255, 0.92);
              border: 1px solid #ececec;
              box-shadow: 0 2px 8px rgba(17, 17, 17, 0.08);
              color: #111111;
              font-size: 9px;
              font-weight: 600;
              letter-spacing: 0.06em;
              line-height: 1.2;
              text-transform: uppercase;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              pointer-events: none;
            }
            .cp3-card-img {
              position: absolute;
              top: 8px;
              right: 8px;
              bottom: 8px;
              left: 8px;
              width: calc(100% - 16px);
              height: calc(100% - 16px);
              object-fit: contain;
              object-position: center;
              transition: opacity 0.35s ease;
            }
            .cp3-card-img--hover {
              opacity: 0;
            }
            .cp3-card:hover .cp3-card-img--hover,
            .cp3-card:focus-within .cp3-card-img--hover {
              opacity: 1;
            }
            .cp3-card:hover .cp3-card-img--primary,
            .cp3-card:focus-within .cp3-card-img--primary {
              opacity: 0;
            }
            .cp3-card-body {
              padding: 8px 10px 10px;
              display: flex;
              flex-direction: column;
              gap: 5px;
              flex: 1;
              min-width: 0;
              box-sizing: border-box;
            }
            .cp3-card-title {
              margin: 0;
              font-size: 13px;
              font-weight: 600;
              line-height: 1.3;
              color: #111111;
              text-decoration: none;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .cp3-card-price {
              margin: 0;
              font-size: 12px;
              font-weight: 600;
              color: #555555;
            }
            .cp3-cart {
              margin-top: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              padding: 8px 14px;
              border-radius: 6px;
              background: #111111;
              color: #ffffff;
              font-size: 12px;
              font-weight: 600;
              line-height: 1.2;
              text-decoration: none;
              border: 0;
              box-sizing: border-box;
              white-space: nowrap;
              transition: background-color 0.2s ease, opacity 0.2s ease;
            }
            .cp3-cart:hover {
              background: #262626;
              color: #ffffff;
            }
            @media (min-width: 640px) {
              .cp4-gallery {
                min-height: 400px;
              }
            }
            @media (min-width: 1024px) {
              .cp4-layout {
                grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
                gap: 2rem;
                align-items: stretch;
              }
              .cp4-gallery {
                min-height: 0;
              }
              .cp4-copy {
                text-align: left;
              }
            }
          `}</style>

          <Container>
            <div className="cp4-layout">
              <div className="cp4-gallery">
                <div className="cp4-tile">
                  {renderTile(
                    mainImageUrl,
                    title || "Collection image",
                    "Add a collection image in the collection data"
                  )}
                </div>
                <div className="cp4-tile">
                  {renderTile(
                    galleryImageTwo,
                    `${title || "Collection"} gallery image`,
                    "Add a second image URL in Puck"
                  )}
                </div>
              </div>

              <div>
                <div className="cp4-copy">
                  {eyebrow && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7658] font-raleway md:text-sm">
                      {eyebrow}
                    </p>
                  )}
                  {title && (
                    <h2 className="text-3xl font-bold leading-tight text-[#1B4D4F] font-raleway md:text-5xl lg:text-6xl">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <div
                      className="mt-5 max-w-xl text-base leading-7 text-[#34413f] font-raleway md:text-lg lg:mx-0"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                  <div className="cp4-cta-wrap">
                    <Link
                      href={collectionHref}
                      className="cp4-cta font-raleway"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "12px 28px",
                        borderRadius: "9999px",
                        background:
                          "linear-gradient(to right, #1b4d4f, #153f41)",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      {ctaLabel || "Explore collection"}
                    </Link>
                  </div>
                </div>

                {_.size(products) > 0 ? (
                  <div className="cp4-products">
                    {_.map(products, (product, index) => {
                      const variant = _.get(product, "productVariants[0]", {});
                      const productTitle =
                        _.get(product, "productTitle", "") ||
                        _.get(variant, "extraProductTitle", "");
                      const productImage =
                        _.get(variant, "variantImageUrl", "") ||
                        _.get(product, "productImageUrl", "");
                      const hoverImage = productImage.replace(
                        /3(?=\.[^./?#]+(?:[?#]|$))/,
                        "1"
                      );
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
                      const seriesLabel = getSeriesLabel(
                        productTitle,
                        productImage
                      );

                      return (
                        <article
                          key={_.get(
                            product,
                            "_id",
                            _.get(product, "slug", index)
                          )}
                          className="cp3-card"
                        >
                          <div className="cp3-card-media">
                            {seriesLabel && (
                              <span className="cp3-badge font-raleway">
                                {seriesLabel}
                              </span>
                            )}
                            {productImage ? (
                              <>
                                <Image
                                  src={formatImageUrl(productImage)}
                                  alt={productTitle || "Product"}
                                  width={480}
                                  height={480}
                                  className="cp3-card-img cp3-card-img--primary"
                                  style={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    bottom: 8,
                                    left: 8,
                                    width: "calc(100% - 16px)",
                                    height: "calc(100% - 16px)",
                                    objectFit: "contain",
                                    objectPosition: "center",
                                  }}
                                />
                                {hoverImage !== productImage && (
                                  <Image
                                    src={formatImageUrl(hoverImage)}
                                    alt={`${productTitle || "Product"} in a room setting`}
                                    width={480}
                                    height={480}
                                    className="cp3-card-img cp3-card-img--hover"
                                    style={{
                                      position: "absolute",
                                      top: 8,
                                      right: 8,
                                      bottom: 8,
                                      left: 8,
                                      width: "calc(100% - 16px)",
                                      height: "calc(100% - 16px)",
                                      objectFit: "contain",
                                      objectPosition: "center",
                                    }}
                                  />
                                )}
                              </>
                            ) : (
                              <span
                                className="font-raleway"
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                  color: "#7a817f",
                                }}
                              >
                                Product image
                              </span>
                            )}
                          </div>
                          <div className="cp3-card-body">
                            {productTitle &&
                              (productHref ? (
                                <Link
                                  href={productHref}
                                  className="cp3-card-title font-raleway"
                                >
                                  {productTitle}
                                </Link>
                              ) : (
                                <h3 className="cp3-card-title font-raleway">
                                  {productTitle}
                                </h3>
                              ))}
                            {price > 0 && (
                              <p className="cp3-card-price font-raleway">
                                AED {price}
                              </p>
                            )}
                            {productHref && (
                              <Link
                                href={productHref}
                                className="cp3-cart font-raleway"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "100%",
                                  padding: "8px 14px",
                                  borderRadius: "6px",
                                  background: "#111111",
                                  color: "#ffffff",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  lineHeight: 1.2,
                                  textDecoration: "none",
                                  boxSizing: "border-box",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Add to cart
                              </Link>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-10 text-center text-sm text-[#64706d] font-raleway">
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
