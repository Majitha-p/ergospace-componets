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
      secondGridImage: {
        type: "text",
        label: "Second Grid Image URL (Optional)",
      },
      thirdGridImage: {
        type: "text",
        label: "Third Grid Image URL (Optional)",
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
      secondGridImage: "",
      thirdGridImage: "",
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
      secondGridImage,
      thirdGridImage,
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
      const title = heading || _.get(collection, "collectionTitle", "");
      const eyebrow =
        subheading || _.get(collection, "collectionSubTitle", "");
      const description = _.get(collection, "description", "");
      const gridImages = [
        _.get(collection, "collectionImageUrl", ""),
        secondGridImage || "",
        thirdGridImage || "",
      ];
      const collectionHref = !_.isEmpty(
        _.get(collection, "customPageRedirectionUrl", "")
      )
        ? _.get(collection, "customPageRedirectionUrl", "")
        : `/product-listing?collectionproduct=${_.get(collection, "_id", "")}`;
      const carouselId = `collection-prod-5-${String(
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
            <div className="mt-8 grid w-full grid-cols-1 gap-0 overflow-hidden md:mt-10 md:grid-cols-2">
              {[
                {
                  key: "first",
                  imageUrl: gridImages[0],
                  alt: `${title} collection`,
                  emptyText: "Add a collection image",
                  className: "aspect-video md:col-span-2 md:aspect-[4/1]",
                  sizes: "100vw",
                },
                {
                  key: "second",
                  imageUrl: gridImages[1],
                  alt: `${title} second image`,
                  emptyText: "Add a second grid image URL",
                  className: "aspect-[4/3] md:aspect-[3/2]",
                  sizes: "(min-width: 768px) 50vw, 100vw",
                },
                {
                  key: "third",
                  imageUrl: gridImages[2],
                  alt: `${title} third image`,
                  emptyText: "Add a third grid image URL",
                  className: "aspect-[4/3] md:aspect-[3/2]",
                  sizes: "(min-width: 768px) 50vw, 100vw",
                },
              ].map(({ key, imageUrl, alt, emptyText, className, sizes }) =>
                imageUrl ? (
                  <div
                    key={key}
                    className={`group relative overflow-hidden ${className}`}
                  >
                    <Image
                      src={formatImageUrl(imageUrl)}
                      alt={alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes={sizes}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="translate-y-2 text-center text-lg font-semibold tracking-wide text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:text-2xl">
                        {title || "Explore Collection"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    key={key}
                    className={`flex w-full items-center justify-center bg-[#f3f4f2] text-sm text-[#7a817f] font-raleway ${className}`}
                  >
                    {emptyText}
                  </div>
                )
              )}
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
