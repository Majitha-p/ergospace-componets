export default () => {
  return {
    fields: {
      collectionImage: {
        type: "text",
        label: "Main Image URL Override (Optional)",
      },
      galleryImageTwo: {
        type: "text",
        label: "Gallery Image 2 URL",
      },
      galleryImageThree: {
        type: "text",
        label: "Gallery Image 3 URL",
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
      collectionImage: "",
      galleryImageTwo:
        "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
      galleryImageThree:
        "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
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
          {
            _id: "default-product-id-3",
            slug: "executive-desk-3",
            productTitle: "White Series Workstation",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
            productVariants: [
              {
                slug: "executive-desk-3",
                extraProductTitle: "White Series Workstation",
                variantImageUrl:
                  "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
                price: 2550,
                discountPrice: 0,
                offerPrice: 0,
              },
            ],
          },
          {
            _id: "default-product-id-4",
            slug: "executive-desk-4",
            productTitle: "White Series Meeting Desk",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
            productVariants: [
              {
                slug: "executive-desk-4",
                extraProductTitle: "White Series Meeting Desk",
                variantImageUrl:
                  "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
                price: 8695,
                discountPrice: 0,
                offerPrice: 0,
              },
            ],
          },
        ],
      },
    },

    render: ({
      data,
      collectionImage,
      galleryImageTwo,
      galleryImageThree,
      ctaLabel,
      bgColor,
    }) => {
      const source = _.get(data, "data", data);
      const collection = _.isArray(source)
        ? _.get(source, "[0]", {})
        : source || {};
      const productsValue = _.get(collection, "collectionsProducts", []);
      const products = _.isArray(productsValue) ? productsValue : [];
      const title = _.get(collection, "collectionTitle", "");
      const eyebrow = _.get(collection, "collectionSubTitle", "");
      const description = _.get(collection, "description", "");
      const mainImageUrl =
        collectionImage || _.get(collection, "collectionImageUrl", "");
      const collectionId = _.get(collection, "_id", "collection");
      const carouselId = `cp3-products-${String(collectionId).replace(
        /[^a-zA-Z0-9_-]/g,
        "-"
      )}`;
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
            .cp3-hero {
              display: grid;
              grid-template-columns: minmax(0, 1fr);
              gap: 2rem;
              align-items: center;
            }
            .cp3-bento {
              display: grid;
              grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
              grid-template-rows: minmax(140px, 1fr) minmax(140px, 1fr);
              gap: 0.75rem;
              min-height: 360px;
            }
            .cp3-bento-main {
              grid-column: 1;
              grid-row: 1 / span 2;
            }
            .cp3-tile {
              position: relative;
              overflow: hidden;
              border-radius: 1rem;
              background: #f5f4f1;
              min-height: 140px;
            }
            .cp3-cta-wrap {
              margin-top: 1.75rem;
            }
            .cp3-cta {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 0.75rem 1.75rem;
              border-radius: 9999px;
              background: linear-gradient(to right, #b45309, #9a3412);
              color: #ffffff;
              font-size: 0.875rem;
              font-weight: 600;
              text-decoration: none;
              line-height: 1.25;
            }
            .cp3-cta:hover {
              opacity: 0.9;
            }
            .cp3-products {
              margin-top: 2.5rem;
            }
            .cp3-products-nav {
              display: flex;
              justify-content: flex-end;
              gap: 8px;
              margin-bottom: 12px;
            }
            .cp3-nav-btn {
              width: 36px;
              height: 36px;
              border-radius: 9999px;
              border: 1px solid #e5e5e5;
              background: #ffffff;
              color: #111111;
              box-shadow: 0 2px 8px rgba(17, 17, 17, 0.06);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
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
              aspect-ratio: 1 / 1;
              background: #f7f7f5;
              overflow: hidden;
            }
            .cp3-badge {
              position: absolute;
              top: 8px;
              right: 8px;
              left: auto;
              z-index: 3;
              max-width: calc(100% - 16px);
              padding: 5px 10px;
              border-radius: 6px;
              background: rgba(255, 255, 255, 0.92);
              border: 1px solid #ececec;
              box-shadow: 0 2px 8px rgba(17, 17, 17, 0.08);
              color: #111111;
              font-size: 10px;
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
              top: 10px;
              right: 10px;
              bottom: 10px;
              left: 10px;
              width: calc(100% - 20px);
              height: calc(100% - 20px);
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
              padding: 10px 12px 12px;
              display: flex;
              flex-direction: column;
              gap: 6px;
              flex: 1;
              min-width: 0;
              box-sizing: border-box;
            }
            .cp3-card-title {
              margin: 0;
              font-size: 13px;
              font-weight: 600;
              line-height: 1.35;
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
              font-weight: 500;
              color: #666666;
            }
            .cp3-cart {
              margin-top: auto;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              align-self: flex-start;
              max-width: 100%;
              padding: 6px 12px;
              border-radius: 6px;
              background: #111111;
              color: #ffffff;
              font-size: 11px;
              font-weight: 600;
              line-height: 1;
              text-decoration: none;
              border: 0;
              box-sizing: border-box;
              white-space: nowrap;
            }
            @media (min-width: 1024px) {
              .cp3-hero {
                grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
                gap: 3rem;
              }
              .cp3-bento {
                min-height: 480px;
              }
            }
          `}</style>

          <Container>
            <div className="cp3-hero">
              <div className="text-center lg:text-left">
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
                    className="mt-5 max-w-xl text-base leading-7 text-[#34413f] font-raleway md:text-lg lg:mx-0 mx-auto"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                <div className="cp3-cta-wrap">
                  <Link
                    href={collectionHref}
                    className="cp3-cta font-raleway"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "12px 28px",
                      borderRadius: "9999px",
                      background: "linear-gradient(to right, #b45309, #9a3412)",
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

              <div className="cp3-bento">
                <div className="cp3-tile cp3-bento-main">
                  {renderTile(
                    mainImageUrl,
                    title || "Collection banner",
                    "Add a collection image"
                  )}
                </div>
                <div className="cp3-tile">
                  {renderTile(
                    galleryImageTwo,
                    `${title || "Collection"} gallery image 2`,
                    "Add gallery image 2 URL"
                  )}
                </div>
                <div className="cp3-tile">
                  {renderTile(
                    galleryImageThree,
                    `${title || "Collection"} gallery image 3`,
                    "Add gallery image 3 URL"
                  )}
                </div>
              </div>
            </div>

            {_.size(products) > 0 ? (
              <div className="cp3-products">
                <div className="cp3-products-nav">
                  <button
                    type="button"
                    aria-label="Previous products"
                    className={`${carouselId}-prev cp3-nav-btn`}
                  >
                    <LeftIcon />
                  </button>
                  <button
                    type="button"
                    aria-label="Next products"
                    className={`${carouselId}-next cp3-nav-btn`}
                  >
                    <RightIcon />
                  </button>
                </div>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={12}
                  slidesPerView={2}
                  breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 12 },
                    1024: { slidesPerView: 4, spaceBetween: 14 },
                    1280: { slidesPerView: 5, spaceBetween: 14 },
                  }}
                  navigation={{
                    prevEl: `.${carouselId}-prev`,
                    nextEl: `.${carouselId}-next`,
                  }}
                  className="!w-full !pb-1"
                >
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
                      _.get(variant, "slug", "") || _.get(product, "slug", "");
                    const productHref = productSlug
                      ? `/product-detail/${productSlug}`
                      : "";
                    const price =
                      _.get(variant, "offerPrice", 0) ||
                      _.get(variant, "discountPrice", 0) ||
                      _.get(variant, "price", 0) ||
                      _.get(product, "salePrice", 0);
                    const seriesLabel = getSeriesLabel(productTitle, productImage);

                    return (
                      <SwiperSlide
                        key={_.get(product, "_id", _.get(product, "slug", index))}
                        className="!h-auto py-1"
                      >
                        <article className="cp3-card">
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
                                    top: 10,
                                    right: 10,
                                    bottom: 10,
                                    left: 10,
                                    width: "calc(100% - 20px)",
                                    height: "calc(100% - 20px)",
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
                                      top: 10,
                                      right: 10,
                                      bottom: 10,
                                      left: 10,
                                      width: "calc(100% - 20px)",
                                      height: "calc(100% - 20px)",
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
                                <Link href={productHref} className="cp3-card-title font-raleway">
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
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  alignSelf: "flex-start",
                                  maxWidth: "100%",
                                  padding: "6px 12px",
                                  borderRadius: "6px",
                                  background: "#111111",
                                  color: "#ffffff",
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  lineHeight: 1,
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
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            ) : (
              <p className="mt-10 text-center text-sm text-[#64706d] font-raleway">
                No products are available in this collection yet.
              </p>
            )}
          </Container>
        </section>
      );
    },
  };
};
