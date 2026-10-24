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
      secondGridImage: {
        type: "text",
        label: "Second Grid Image URL (Optional)",
      },
      thirdGridImage: {
        type: "text",
        label: "Third Grid Image URL (Optional)",
      },
      gridGap: {
        type: "text",
        label: "Grid Gap (px)",
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
      secondGridImage: "",
      thirdGridImage: "",
      gridGap: "12",
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
      secondGridImage,
      thirdGridImage,
      gridGap,
      ctaLabel,
      bgColor,
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
      const products = _.isArray(productsValue)
        ? productsValue.slice(0, 6)
        : [];
      const firstProduct = _.get(products, "[0]", {});
      const parsedGridGap = Number(gridGap);
      const resolvedGridGap = Number.isFinite(parsedGridGap)
        ? Math.max(0, parsedGridGap)
        : 12;
      const title = heading || _.get(collection, "collectionTitle", "");
      const eyebrow =
        subheading || _.get(collection, "collectionSubTitle", "");
      const description = _.get(collection, "description", "");
      const gridImages = [
        collectionImage ||
          _.get(collection, "collectionImageUrl", "") ||
          _.get(firstProduct, "productImageUrl", "") ||
          _.get(firstProduct, "productVariants[0].variantImageUrl", ""),
        secondGridImage || "",
        thirdGridImage || "",
      ];
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
          className="w-full pt-10 pb-6 md:pt-14 md:pb-8 lg:pt-16 lg:pb-10"
          style={{ backgroundColor: bgColor || "#FFFFFF" }}
        >
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10 lg:gap-16">
              <div className="min-w-0 md:w-1/2">
                {eyebrow && (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7658] font-raleway md:text-sm">
                    {eyebrow}
                  </p>
                )}
                {title && (
                  <h2 className="max-w-2xl text-3xl font-bold leading-[1.02] tracking-[-0.045em] text-[#1B4D4F] md:text-4xl lg:text-5xl">
                    {title}
                  </h2>
                )}
              </div>

              <div className="min-w-0 md:w-1/2 md:pb-1">
                {description && (
                  <div
                    className="text-sm leading-6 text-[#4b5153] font-raleway md:text-base md:leading-7"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                <div className="mt-6 flex justify-start">
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
            <div
              className="mt-8 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:mt-10"
              style={{ gap: `${resolvedGridGap}px` }}
            >
              {gridImages.map((imageUrl, index) => {
                const key = ["first", "second", "third"][index];
                const emptyText = [
                  "Add a collection image",
                  "Add a second grid image URL",
                  "Add a third grid image URL",
                ][index];

                return imageUrl ? (
                  <div
                    key={key}
                    className="group relative aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={formatImageUrl(imageUrl)}
                      alt={`${title} ${index === 0 ? "collection" : `${key} image`}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                ) : (
                  <div
                    key={key}
                    className="flex aspect-[4/3] w-full items-center justify-center bg-[#f3f4f2] text-sm text-[#7a817f] font-raleway"
                  >
                    {emptyText}
                  </div>
                );
              })}
            </div>
            {_.size(products) > 0 && (
              <div className="mt-8 flex w-full min-w-0 items-center gap-2 md:mt-10">
                <button
                  type="button"
                  aria-label="Previous products"
                  className={`${carouselId}-prev flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  <span aria-hidden="true">&larr;</span>
                </button>
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
                  className="!w-full min-w-0 flex-1 !pb-2 !pt-2 !px-1"
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
                <button
                  type="button"
                  aria-label="Next products"
                  className={`${carouselId}-next flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            )}
          </Container>
        </section>
      );
    },
  };
};
