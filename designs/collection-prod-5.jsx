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
      const products = _.get(collection, "collectionsProducts", []);
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
          <style>{`
            .cp5-image {
              position: relative;
              width: 100%;
              min-height: 220px;
            }
            @media (min-width: 768px) {
              .cp5-image { min-height: 300px; }
            }
            @media (min-width: 1024px) {
              .cp5-image { min-height: 360px; }
            }
          `}</style>
          <Container>
            <div
              className="grid grid-cols-2 items-center gap-8 md:gap-10 lg:gap-16"
              style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)" }}
            >
              <div className="col-start-1 row-start-1 min-w-0">
                {title && (
                  <h2 className="max-w-sm text-3xl font-medium leading-[0.98] tracking-[-0.045em] text-[#343b3e] font-raleway md:text-4xl lg:text-5xl">
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

              <div className="cp5-image col-start-2 row-start-1">
                {imageUrl ? (
                  <Image
                    src={formatImageUrl(imageUrl)}
                    alt={title || "Collection"}
                    fill
                    className="object-contain object-right"
                    sizes="(min-width: 768px) 65vw, 100vw"
                  />
                ) : (
                  <div className="flex min-h-[220px] items-center justify-center text-sm text-[#7a817f] font-raleway md:min-h-[300px] lg:min-h-[360px]">
                    Add a collection image
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
