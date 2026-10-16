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
      const firstCollectionProducts = _.isArray(firstCollectionProductsValue)
        ? firstCollectionProductsValue.slice(0, 3)
        : [];
      const collection2Products =
        _.isArray(collection2ProductsValue) && _.size(collection2ProductsValue) > 0
          ? collection2ProductsValue.slice(0, 3)
          : _.isArray(firstCollectionProductsValue)
            ? firstCollectionProductsValue.slice(3, 6)
            : [];
      const products = [...firstCollectionProducts, ...collection2Products];
      const carouselId = `collection-prodect-7-${String(
        _.get(collections[0], "_id", "collection")
      ).replace(/[^a-zA-Z0-9_-]/g, "-")}`;

      const renderCollection = (collection, index, overrides, imageProducts) => {
        const item = collection || {};
        const firstProduct = _.get(imageProducts, "[0]", {});
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
            className="collection-prodect-7-column flex h-full min-w-0 flex-col text-left"
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
                className="mt-4 inline-flex items-center gap-3 text-lg font-bold text-[#202729] font-raleway transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4d4f] focus-visible:ring-offset-4"
              >
                <svg width="15" height="15" viewBox="0 0 12 12" fill="none" aria-hidden="true">
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
                    renderCollection(
                      collections[index],
                      index,
                      overrides,
                      index === 1 ? collection2Products : firstCollectionProducts
                    )
                  )}
                </div>
              </Container>
            </div>
          </section>
          {_.size(products) > 0 && (
            <section className="w-full py-8 md:py-10">
              <Container>
                <div className="w-full min-w-0">
                  <div className="mb-4 flex justify-end gap-2 px-1">
                    <button
                      type="button"
                      aria-label="Previous products"
                      className={`${carouselId}-prev flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500`}
                    >
                      <span aria-hidden="true">&larr;</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Next products"
                      className={`${carouselId}-next flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500`}
                    >
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                  <Swiper
                    modules={[Navigation]}
                    navigation={{
                      prevEl: `.${carouselId}-prev`,
                      nextEl: `.${carouselId}-next`,
                    }}
                    spaceBetween={24}
                    slidesPerView={2}
                    breakpoints={{
                      640: { slidesPerView: 2, spaceBetween: 24 },
                      768: { slidesPerView: 3, spaceBetween: 24 },
                      1024: { slidesPerView: 5, spaceBetween: 24 },
                    }}
                    className="!w-full !pb-2 !pt-2 !px-1"
                  >
                    {_.map(products, (product, index) => (
                      <SwiperSlide
                        key={_.get(product, "_id", _.get(product, "slug", index))}
                        className="!h-auto py-1"
                      >
                        <div className="h-full min-w-0">
                          <ProductItem productItem={product} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Container>
            </section>
          )}
        </>
      );
    },
  };
};
