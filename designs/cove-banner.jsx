export default () => {
  return {
    fields: {
      sectionLabel: { type: "text", label: "Section label" },
      title: { type: "text", label: "Title override (optional)" },
      subtitle: { type: "text", label: "Subtitle override (optional)" },
      description: { type: "textarea", label: "Description override (optional)" },
      ctaLabel: { type: "text", label: "CTA label" },
      ctaLink: { type: "text", label: "CTA link override (optional)" },
      imageUrl: { type: "text", label: "Hero image URL override (optional)" },
      imageAlt: { type: "text", label: "Hero image alt text" },
    },

    defaultProps: {
      sectionLabel: "COVE SERIES",
      title: "",
      subtitle: "",
      description: "",
      ctaLabel: "View the collection",
      ctaLink: "",
      imageUrl: "",
      imageAlt: "",
      data: {
        _id: "default-cove-collection",
        collectionTitle: "Cove Series",
        collectionSubTitle: "",
        description: "",
        collectionImageUrl: "",
        customPageRedirectionUrl: "",
        collectionsProducts: [],
      },
    },

    render: ({
      data,
      sectionLabel,
      title,
      subtitle,
      description,
      ctaLabel,
      ctaLink,
      imageUrl,
      imageAlt,
    }) => {
      // Match the banner components: records are commonly supplied in data.data.
      const source = _.get(data, "data", data);
      const mapData = _.isArray(source) ? _.get(source, "[0]", {}) : source || {};
      const collection = _.get(mapData, "data", mapData);

      const cleanText = (value) =>
        typeof value === "string" ? value.trim() : "";
      const displayTitle =
        cleanText(title) ||
        _.get(collection, "collectionTitle", "") ||
        _.get(collection, "bannerTitle", "");
      const displaySubtitle =
        cleanText(subtitle) ||
        _.get(collection, "collectionSubTitle", "") ||
        _.get(collection, "bannerSubTitle", "");
      const sourceDescription = _.get(collection, "description", "");
      const displayDescription = cleanText(description) || sourceDescription;
      const productsValue = _.get(collection, "collectionsProducts", []);
      const firstProduct = _.get(
        _.isArray(productsValue) ? productsValue : [],
        "[0]",
        {}
      );
      const displayImage =
        cleanText(imageUrl) ||
        _.get(collection, "bannerImages[0].bannerImageUrl", "") ||
        _.get(collection, "bannerImageUrl", "") ||
        _.get(collection, "collectionImageUrl", "") ||
        _.get(firstProduct, "productImageUrl", "") ||
        _.get(firstProduct, "productVariants[0].variantImageUrl", "");
      const collectionId = _.get(collection, "_id", "");
      const collectionUrl = _.get(collection, "customPageRedirectionUrl", "");
      const isBannerRecord =
        !_.isEmpty(_.get(collection, "bannerImages", [])) ||
        !_.isEmpty(_.get(collection, "link", ""));
      const collectionLink = cleanText(ctaLink)
        ? cleanText(ctaLink)
        : isBannerRecord
          ? generatePageRedirection(collection)
          : !_.isEmpty(collectionUrl)
            ? collectionUrl
            : collectionId
              ? `/product-listing?collectionproduct=${collectionId}`
              : "#cove-series";
      const descriptionIsOverride = Boolean(cleanText(description));

      return (
        <section
          id="cove-series"
          className="w-full px-3 py-3 sm:px-5"
          style={{ backgroundColor: "#f5f5f3" }}
        >
          <Container>
            <div
              className="relative flex min-h-[700px] items-end overflow-hidden"
              style={{
                position: "relative",
                minHeight: "700px",
              }}
            >
              {!_.isEmpty(displayImage) && (
                <Image
                  src={formatImageUrl(displayImage)}
                  alt={cleanText(imageAlt) || displayTitle || "Cove Series"}
                  fill
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover object-center"
                  style={{ zIndex: 0 }}
                  priority
                />
              )}
              <div
                className="relative z-10 mx-8 my-6 max-w-3xl bg-black/50 px-6 pb-8 pt-24 text-white lg:px-12"
                style={{ zIndex: 2 }}
              >
                {!_.isEmpty(displaySubtitle) && (
                  <p className="mb-5 inline-flex rounded-full border border-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-200">
                    {displaySubtitle}
                  </p>
                )}
                {!_.isEmpty(displayTitle) && (
                  <h1 className="max-w-4xl font-serif text-4xl font-medium leading-none tracking-tight text-white md:text-6xl">
                    {displayTitle}
                  </h1>
                )}
                {!_.isEmpty(displayDescription) && (
                  <div className="mt-3 max-w-xl text-sm leading-7 text-gray-200 sm:text-base">
                    {descriptionIsOverride ? (
                      displayDescription
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sourceDescription,
                        }}
                      />
                    )}
                  </div>
                )}
                {!_.isEmpty(ctaLabel) && (
                  <Link
                    href={collectionLink}
                    className="mt-6 inline-flex items-center justify-center border border-black bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ outlineColor: "black" }}
                  >
                    {ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </section>
      );
    },
  };
};
