export default () => {
  return {
    fields: {
      bgColor: { type: "text", label: "Background Color" },
      eyebrow: { type: "text", label: "Subtitle" },
      heading: { type: "text", label: "Heading", default: "" },
      collectionImage: {
        type: "text",
        label: "Collection Image URL (Optional)",
        default: "",
      },

      imageAlt: { type: "text", label: "Image alt text" },
      ctaLabel: { type: "text", label: "Button label" },
      ctaUrl: { type: "text", label: "Button URL" },
      detailOneTop: { type: "text", label: "Card 1 text" },
      detailTwoTop: { type: "text", label: "Card 2 text" },
      detailThreeTop: { type: "text", label: "Card 3 text" },
      detailFourTop: { type: "text", label: "Card 4 text" },
      text1: { type: "text", label: "Text 1" },
      text2: { type: "text", label: "Text 2" },
      text3: { type: "text", label: "Text 3" },
      text4: { type: "text", label: "Text 4" },
    },

    defaultProps: {
      bgColor: "",
      eyebrow: "",
      heading: "",
      collectionImage: "",
      imageAlt: "sync series collection",
      ctaLabel: "Explore the Collection",
      ctaUrl: "",
      detailOneTop: "36mm table top",
      detailTwoTop: "40x15 aluminum leg",
      detailThreeTop: "40x18mm front panel",
      detailFourTop: "12mm pet panel",
      text1: "Text 1",
      text2: "Text 2",
      text3: "Text 3",
      text4: "Text 4",
      data: {
        collectionImageUrl:
          "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
      },
    },

    render: ({
      bgColor,
      data,
      eyebrow,
      heading,
      collectionImage,
      imageAlt,
      ctaLabel,
      ctaUrl,
      detailOneTop,
      detailTwoTop,
      detailThreeTop,
      detailFourTop,
      text1,
      text2,
      text3,
      text4,
    }) => {
      const source = _.get(data, "data", data);
      const collection = _.isArray(source)
        ? _.get(source, "[0]", {})
        : source || {};
      const resolvedHeading =
        (heading || "").trim() ||
        (_.get(collection, "collectionTitle") || "").trim();
      const productsValue = _.get(collection, "collectionsProducts", []);
      const products = _.isArray(productsValue)
        ? productsValue.slice(0, 5)
        : [];
      const resolvedEyebrow =
        (eyebrow || "").trim() ||
        (_.get(collection, "collectionSubTitle") || "").trim();
      const resolvedDescription =
        (_.get(collection, "description") || "").trim();
      const imageUrl =
        collectionImage || _.get(collection, "collectionImageUrl", "") || "";
      const customUrl = (
        _.get(collection, "customPageRedirectionUrl") || ""
      ).trim();
      const collectionId = _.get(collection, "_id", "");
      const sourceLink = customUrl
        ? customUrl
        : collectionId
          ? `/product-listing?collectionproduct=${collectionId}`
          : "";
      const configuredCtaUrl = (ctaUrl || "").trim();
      const ctaHref =
        (configuredCtaUrl && configuredCtaUrl !== "#collection-products"
          ? configuredCtaUrl
          : "") ||
        sourceLink ||
        "#collection-products";
      const carouselId = `collection-intro-products-${String(
        collectionId || "collection"
      ).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
      const details = [
        detailOneTop,
        detailTwoTop,
        detailThreeTop,
        detailFourTop,
      ];

      return (
        <section
          className="w-full pt-10 pb-6 text-[#1f1f1f] md:py-8"
          style={{ backgroundColor: bgColor || "transparent" }}
        >
          <Container>
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12 md:gap-6">
              <div className="relative h-[500px] overflow-hidden rounded-xl md:col-span-8">
                {imageUrl && (
                  <Image
                    src={formatImageUrl(imageUrl)}
                    alt={imageAlt || heading || "Collection"}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover object-center"
                    priority
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-1.5 bg-black/70 p-2 md:grid-cols-4">
                  {details.map((text, index) => (
                    <div
                      key={index}
                      className="min-w-0 rounded-md border border-gray-600 p-2 text-center"
                    >
                      <p className="break-words text-xs font-semibold leading-tight text-white sm:text-sm">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4">
                {resolvedEyebrow && (
                  <p
                    className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-700"
                  >
                    {resolvedEyebrow}
                  </p>
                )}
                {resolvedHeading && (
                  <h2 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                    {resolvedHeading}
                  </h2>
                )}
                {resolvedDescription && (
                  <div
                    className="max-w-md text-base leading-relaxed text-gray-700"
                    dangerouslySetInnerHTML={{ __html: resolvedDescription }}
                  >
                  </div>
                )}
                {ctaLabel && (
                  <a
                    href={ctaHref}
                    className="mt-5 inline-flex rounded-lg bg-black/50 px-5 py-3 text-sm font-semibold text-white"
                  >
                    {ctaLabel}
                  </a>
                )}
                {[text1, text2, text3, text4].some(Boolean) && (
                  <div className="mt-4 grid grid-cols-2 pr-[60px]">
                    <div className="py-2">{text1 && <span>{text1}</span>}</div>
                    <div className="py-2 text-right">
                      {text2 && <span>{text2}</span>}
                    </div>
                    <div className="border-t py-2">
                      {text3 && <span>{text3}</span>}
                    </div>
                    <div className="border-t py-2 text-right">
                      {text4 && <span>{text4}</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {products.length > 0 && (
              <div id="collection-products" className="mt-4 min-w-0">
                <div className="mb-3 flex justify-end gap-2">
                  <button
                    type="button"
                    aria-label="Previous products"
                    className={`${carouselId}-prev flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-800 transition-colors`}
                    style={{ cursor: "pointer" }}
                  >
                    <span aria-hidden="true">&larr;</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Next products"
                    className={`${carouselId}-next flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-800 transition-colors`}
                    style={{ cursor: "pointer" }}
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
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                  }}
                  navigation={{
                    prevEl: `.${carouselId}-prev`,
                    nextEl: `.${carouselId}-next`,
                  }}
                  className="!w-full !pb-2"
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
                    const seriesMatch = String(productTitle).match(/\b([\w&'-]+)\s+Series\b/i);
                    const seriesLabel = seriesMatch
                      ? seriesMatch[1]
                      : (() => {
                          const imageSeries = String(productImage).match(/\/series\/([^/?#]+)/i);
                          return imageSeries
                            ? decodeURIComponent(imageSeries[1])
                                .replace(/[-_]+/g, " ")
                                .replace(/\b\w/g, (letter) => letter.toUpperCase())
                            : "";
                        })();

                    return (
                      <SwiperSlide
                        key={_.get(product, "_id", _.get(product, "slug", index))}
                        className="!h-auto py-1"
                      >
                        <article
                          className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#ececec] bg-white shadow-sm"
                          onMouseEnter={(event) => {
                            const primary = event.currentTarget.querySelector(
                              ".collection-product-image-primary"
                            );
                            const alternate = event.currentTarget.querySelector(
                              ".collection-product-image-hover"
                            );
                            if (primary && alternate) {
                              primary.style.opacity = "0";
                              alternate.style.opacity = "1";
                            }
                          }}
                          onMouseLeave={(event) => {
                            const primary = event.currentTarget.querySelector(
                              ".collection-product-image-primary"
                            );
                            const alternate = event.currentTarget.querySelector(
                              ".collection-product-image-hover"
                            );
                            if (primary && alternate) {
                              primary.style.opacity = "1";
                              alternate.style.opacity = "0";
                            }
                          }}
                        >
                          {productHref && (
                            <Link
                              href={productHref}
                              className="absolute inset-0 z-10"
                              aria-label={productTitle || "View product"}
                            />
                          )}

                          <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f8f8]">
                            {seriesLabel && (
                              <span className="absolute right-2 top-2 z-20 max-w-full truncate rounded-md border border-[#ececec] bg-white/90 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-[#176161]">
                                {seriesLabel}
                              </span>
                            )}
                            {productImage ? (
                              <>
                                <Image
                                  src={formatImageUrl(productImage)}
                                  alt={productTitle || "Product"}
                                  fill
                                  className="collection-product-image-primary object-contain transition-opacity duration-300"
                                  style={{ opacity: 1 }}
                                />
                                {hoverImage !== productImage && (
                                  <Image
                                    src={formatImageUrl(hoverImage)}
                                    alt={`${productTitle || "Product"} in a room setting`}
                                    fill
                                    className="collection-product-image-hover object-contain transition-opacity duration-300"
                                    style={{ opacity: 0 }}
                                  />
                                )}
                              </>
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                                Product image
                              </span>
                            )}
                          </div>

                          <div className="relative z-20 flex min-w-0 flex-1 flex-col gap-1 p-3">
                            {productTitle &&
                              (productHref ? (
                                <Link
                                  href={productHref}
                                  className="relative line-clamp-2 text-xs font-semibold leading-snug text-[#1f1f1f]"
                                >
                                  {productTitle}
                                </Link>
                              ) : (
                                <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-[#1f1f1f]">
                                  {productTitle}
                                </h3>
                              ))}

                            {price > 0 && (
                              <p className="m-0 text-base font-bold text-[#176161]">
                                <span className="text-xs font-medium">AED</span>{" "}
                                {price}
                              </p>
                            )}

                            {productHref && (
                              <Link
                                href={productHref}
                                className="relative mt-auto flex items-center justify-center rounded-md bg-black/70 px-4 py-1.5 text-sm font-semibold text-white"
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
            )}
          </Container>
        </section>
      );
    },
  };
};
