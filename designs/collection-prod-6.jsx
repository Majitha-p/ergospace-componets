export default () => {
  return {
    fields: {
      heading: {
        type: "text",
        label: "Collection Heading (Optional)",
      },
      subheading: {
        type: "text",
        label: "Collection Eyebrow (Optional)",
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
      ctaLabel: "Learn More",
      bgColor: "#FFFFFF",
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
        ? productsValue.slice(0, 6)
        : [];
      const firstProduct = _.get(products, "[0]", {});
      const title = heading || _.get(collection, "collectionTitle", "");
      const eyebrow =
        subheading || _.get(collection, "collectionSubTitle", "");
      const description = _.get(collection, "description", "");
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
      const carouselId = `collection-prod-6-${String(
        _.get(collection, "_id", "collection")
      ).replace(/[^a-zA-Z0-9_-]/g, "-")}`;

      return (
        <section
          className="w-full py-10 md:py-14 lg:py-16"
          style={{ backgroundColor: bgColor || "#FFFFFF" }}
        >
          <Container>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-6 lg:gap-8 md:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)]">
              <div className="order-1 min-w-0 md:col-start-1 md:row-start-1">
                <div className="mb-5 md:hidden">
                  {eyebrow && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7658] font-raleway md:text-sm">
                      {eyebrow}
                    </p>
                  )}
                  {title && (
                    <h2 className="text-3xl font-bold leading-[0.98] tracking-[-0.045em] text-[#343b3e]">
                      {title}
                    </h2>
                  )}
                </div>
                <div className="w-full">
                  {imageUrl ? (
                    <Image
                      src={formatImageUrl(imageUrl)}
                      alt={title || "Collection"}
                      width={1600}
                      height={600}
                      className="block h-auto max-h-[240px] w-full object-contain object-left md:max-h-[280px] lg:max-h-[360px]"
                      sizes="(min-width: 768px) 65vw, 100vw"
                    />
                  ) : (
                    <div className="flex min-h-[220px] w-full items-center justify-center text-sm text-[#7a817f] font-raleway md:min-h-[300px] lg:min-h-[360px]">
                      Add a collection image
                    </div>
                  )}
                </div>
              </div>

              <div className="order-2 min-w-0 md:col-start-2 md:row-start-1">
                <div className="hidden md:block">
                  {eyebrow && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#484848] font-raleway md:text-sm">
                      {eyebrow}
                    </p>
                  )}
                  {title && (
                    <h2 className="text-3xl font-bold leading-[0.98] tracking-[-0.045em] text-[#1B4D4F] md:text-3xl lg:text-3xl">
                      {title}
                    </h2>
                  )}
                </div>
                {description && (
                  <div
                    className="mt-5 text-sm leading-6 text-[#4b5153] font-raleway md:text-base"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                <div className="mt-12 flex justify-start">
                  <Link
                    href={collectionHref}
                    className="inline-flex items-center gap-3 border border-[#1f1f1f] bg-transparent px-4 py-1.5 text-base font-bold font-raleway text-[#1f1f1f] transition-colors duration-200 hover:bg-[#176161] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4d4f] focus-visible:ring-offset-4 md:px-6 md:py-3 md:text-lg"
                  >
                    <svg
                      width="15"
                      height="15"
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
              </div>
            </div>
            {_.size(products) > 0 && (
              <div className="mt-8 w-full min-w-0 md:mt-10">
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
            )}
          </Container>
        </section>
      );
    },
  };
};
