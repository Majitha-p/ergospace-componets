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
    },

    defaultProps: {
      heading: "",
      subheading: "",
      collectionImage: "",
      ctaLabel: "View More",
      bgColor: "#FFFFFF",
      data: {
        _id: "default-collection-id",
        collectionTitle: "SOLID COLORS",
        collectionSubTitle:
          "Refined solid shades that create a sleek, contemporary look with effortless versatility.",
        description: "<p>Natural warmth. Timeless character.</p>",
        collectionImageUrl:
          "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
        customPageRedirectionUrl: "",
        collectionsProducts: [
          {
            _id: "default-product-id-1",
            slug: "training-table-1",
            productTitle: "Color Large Round Center Table",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
            sku: "E043939",
            productVariants: [
              {
                variantSku: "E043939",
                price: 960,
                discountPrice: 0,
                offerPrice: 0,
              },
            ],
          },
          {
            _id: "default-product-id-2",
            slug: "training-table-2",
            productTitle: "Color Large Round Center Table",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
            sku: "E043940",
            productVariants: [
              {
                variantSku: "E043940",
                price: 960,
                discountPrice: 0,
                offerPrice: 0,
              },
            ],
          },
          {
            _id: "default-product-id-3",
            slug: "training-table-3",
            productTitle: "Color Large Round Center Table",
            productImageUrl:
              "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
            sku: "E043941",
            productVariants: [
              {
                variantSku: "E043941",
                price: 960,
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
      heading,
      subheading,
      collectionImage,
      ctaLabel,
      bgColor,
    }) => {
      const source = _.get(data, "data", data);
      const collection = _.isArray(source)
        ? _.get(source, "[0]", {})
        : source || {};
      const productsValue = _.get(collection, "collectionsProducts", []);
      const products = _.isArray(productsValue) ? productsValue : [];
      const title = heading || _.get(collection, "collectionTitle", "");
      const description =
        subheading || _.get(collection, "collectionSubTitle", "");
      const imageUrl =
        collectionImage || _.get(collection, "collectionImageUrl", "");
      const collectionDescription = _.get(collection, "description", "");
      const collectionId = _.get(collection, "_id", "collection");
      const carouselId = `collection-products-${String(collectionId).replace(
        /[^a-zA-Z0-9_-]/g,
        "-"
      )}`;
      const collectionHref = !_.isEmpty(
        _.get(collection, "customPageRedirectionUrl", "")
      )
        ? _.get(collection, "customPageRedirectionUrl", "")
        : `/product-listing?collectionproduct=${_.get(collection, "_id", "")}`;

      const imageContent = imageUrl ? (
        <Image
          src={formatImageUrl(imageUrl)}
          alt={title || "Collection"}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-gray-500 font-raleway">
          Add a collection image
        </div>
      );

      return (
        <section
          className="w-full py-8 md:py-12 lg:py-16"
          style={{ backgroundColor: bgColor || "#FFFFFF" }}
        >
          {/* Image sizing lives in plain CSS (not Tailwind arbitrary classes).
              The image is rendered twice and one copy is hidden per breakpoint:
              - below lg: .csi-inline, sits inside the text column between the
                description and the product cards (4:3 mobile, 16:9 tablet)
              - lg+:      .csi-side, its own grid column, stretches to the
                content column's height */}
          <style>{`
            .csi-img {
              position: relative;
              width: 100%;
              overflow: hidden;
              border-radius: 12px;
              background: #f3f4f6;
            }
            .csi-inline { aspect-ratio: 4 / 3; margin-top: 20px; }
            .csi-side { display: none; }
            @media (min-width: 768px) {
              .csi-inline { aspect-ratio: 16 / 9; }
            }
            @media (min-width: 1024px) {
              .csi-inline { display: none; }
              .csi-side { display: block; align-self: stretch; min-height: 420px; }
            }
          `}</style>

          <Container>
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:items-stretch lg:gap-8">

              <div className="flex min-w-0 flex-col justify-between gap-7 lg:py-3">
                <div>
                  {title && (
                    <h2 className="text-4xl font-bold leading-[0.95] tracking-tight text-[#1B4D4F] font-raleway md:text-4xl">
                      {title}
                    </h2>
                  )}
                  {collectionDescription && (
                    <div
                      className="mt-5 max-w-xl text-base leading-7 text-[#172238] font-raleway md:text-lg"
                      dangerouslySetInnerHTML={{
                        __html: collectionDescription,
                      }}
                    />
                  )}

                  <div className="csi-img csi-inline">{imageContent}</div>

                  {_.size(products) > 0 ? (
                    <div className="mt-6 min-w-0">
                      <div className="mb-3 flex justify-end gap-2">
                        <button
                          type="button"
                          aria-label="Previous products"
                          className={`${carouselId}-prev flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500`}
                        >
                          <span aria-hidden="true">&larr;</span>
                        </button>
                        <button
                          type="button"
                          aria-label="Next products"
                          className={`${carouselId}-next flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500`}
                        >
                          <span aria-hidden="true">&rarr;</span>
                        </button>
                      </div>
                      <Swiper
                        modules={[Navigation]}
                        spaceBetween={12}
                        slidesPerView={2}
                        breakpoints={{
                          480: { slidesPerView: 2 },
                          1024: { slidesPerView: 3 },
                        }}
                        navigation={{
                          prevEl: `.${carouselId}-prev`,
                          nextEl: `.${carouselId}-next`,
                        }}
                        className="!w-full !pb-2"
                      >
                        {_.map(products, (product, index) => (
                          <SwiperSlide
                            key={_.get(
                              product,
                              "_id",
                              _.get(product, "slug", index)
                            )}
                            className="!h-auto py-1"
                          >
                            <div className="h-full min-w-0">
                              <ProductItem productItem={product} />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  ) : (
                    <p className="mt-6 text-sm text-gray-500 font-raleway">
                      No products are available in this collection yet.
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                  {description && (
                    <p className="max-w-xl text-3xl font-extrabold leading-[1.05] text-[#172238] font-raleway md:text-4xl">
                      {description}
                    </p>
                  )}
                  <Link
                    href={collectionHref}
                    className="shrink-0 font-raleway transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4d4f]"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.75rem 1.75rem",
                      borderRadius: "9999px",
                      background: "linear-gradient(to right, #1b4d4f, #153f41)",
                      color: "#ffffff",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      lineHeight: 1.25,
                    }}
                  >
                    {ctaLabel || "View More"}
                  </Link>
                </div>
              </div>

              <div className="csi-img csi-side">{imageContent}</div>

            </div>
          </Container>
        </section>
      );
    },
  };
};