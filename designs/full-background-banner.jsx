export default () => {
  return {
    fields: {
      heading: { type: "text", label: "Heading" },
      subtitle: { type: "text", label: "Subtitle" },
      description: { type: "textarea", label: "Description" },
      imageUrl: { type: "text", label: "Background image URL" },
      imageAlt: { type: "text", label: "Image alt text" },
      backgroundColor: { type: "text", label: "Text panel background color" },
    },

    defaultProps: {
      heading: "add your heading here",
      subtitle: "add your subtitle here",
      description: "",
      imageUrl: "",
      imageAlt: "",
      backgroundColor: "rgba(0, 0, 0, 0.25)",
    },

    render: ({
      data,
      heading,
      subtitle,
      description,
      imageUrl,
      imageAlt,
      backgroundColor,
    }) => {
      const source = _.get(data, "data", data);
      const record = _.isArray(source) ? _.get(source, "[0]", {}) : source || {};
      const nestedRecord = _.get(record, "data", record);
      const mapData = _.isArray(nestedRecord)
        ? _.get(nestedRecord, "[0]", {})
        : nestedRecord || {};
      const cleanText = (value) => (typeof value === "string" ? value.trim() : "");
      const sourceDescription = cleanText(_.get(mapData, "description", ""));
      const resolvedHeading =
        cleanText(_.get(mapData, "bannerTitle", "")) || cleanText(heading);
      const resolvedSubtitle =
        cleanText(_.get(mapData, "bannerSubTitle", "")) || cleanText(subtitle);
      const resolvedDescription =
        sourceDescription || cleanText(description);
      const resolvedImageUrl =
        cleanText(_.get(mapData, "bannerImages[0].bannerImageUrl", "")) ||
        cleanText(imageUrl);
      const resolvedImageAlt =
        cleanText(imageAlt) || resolvedHeading || "Banner";
      const resolvedBackgroundColor =
        cleanText(backgroundColor) || "rgba(0, 0, 0, 0.25)";
      const descriptionIsOverride = !sourceDescription && Boolean(cleanText(description));

      return (
        <section className="w-full px-3 py-3 sm:px-5">
          <Container>
            <style>{`
              .full-background-banner-layout {
                min-height: 700px;
              }
              .full-background-banner-image {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
              }
              @media (max-width: 767px) {
                .full-background-banner-layout {
                  min-height: 420px;
                }
              }
            `}</style>
            <div
              className={`${resolvedImageUrl ? "full-background-banner-layout" : ""} relative w-full overflow-hidden rounded-lg`}
            >
              {resolvedImageUrl && (
                <img
                  src={formatImageUrl(resolvedImageUrl)}
                  alt={resolvedImageAlt}
                  className="full-background-banner-image"
                />
              )}

              {(resolvedHeading || resolvedSubtitle || resolvedDescription) && (
                <div
                  className="absolute left-0 top-4 w-full max-w-3xl overflow-y-auto p-4 sm:w-3/4 md:p-6"
                  style={{
                    position: resolvedImageUrl ? "absolute" : "relative",
                    top: resolvedImageUrl ? "50%" : "auto",
                    bottom: "auto",
                    left: resolvedImageUrl ? 0 : "auto",
                    transform: resolvedImageUrl ? "translateY(-50%)" : "none",
                    width: resolvedImageUrl ? undefined : "100%",
                    maxWidth: resolvedImageUrl ? "48rem" : "none",
                    maxHeight: resolvedImageUrl ? "calc(100% - 2rem)" : "none",
                    overflowY: resolvedImageUrl ? "auto" : "visible",
                    padding: "clamp(1rem, 3vw, 2rem)",
                    color: resolvedImageUrl ? "#ffffff" : "#000000",
                    zIndex: 1,
                    backgroundColor: resolvedImageUrl
                      ? resolvedBackgroundColor
                      : "transparent",
                    borderTopRightRadius: resolvedImageUrl ? "1.5rem" : 0,
                    borderBottomRightRadius: resolvedImageUrl ? "1.5rem" : 0,
                  }}
                >
                  {resolvedHeading && (
                    <h1
                      className="m-0 font-bold leading-tight [overflow-wrap:anywhere]"
                      style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
                    >
                      {resolvedHeading}
                    </h1>
                  )}
                  {resolvedSubtitle && (
                    <p
                      className="mt-2 mb-0 leading-snug [overflow-wrap:anywhere]"
                      style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
                    >
                      {resolvedSubtitle}
                    </p>
                  )}
                  {resolvedDescription && (
                    <div
                      className="mt-3 text-sm leading-relaxed sm:text-base [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2"
                      style={{ textAlign: "left", overflowWrap: "anywhere" }}
                    >
                      {descriptionIsOverride ? (
                        resolvedDescription
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{ __html: sourceDescription }}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>
        </section>
      );
    },
  };
};
