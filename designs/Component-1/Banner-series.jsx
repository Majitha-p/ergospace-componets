export default () => {
    return {
        fields: {
            title: {
                type: "text",
                label: "Title",
                default: "Our Series Collection",
            },
            description: {
                type: "textarea",
                label: "Description",
                default: "Thoughtfully designed furniture collections for modern workspace",
            },
            buttonLabel: {
                type: "text",
                label: "Button Label",
                default: "View More",
            },
            buttonLink: {
                type: "text",
                label: "Button Link",
                default: "",
            },
            image1: { type: "text", label: "Image 1 URL", default: "" },
            image2: { type: "text", label: "Image 2 URL", default: "" },
            image3: { type: "text", label: "Image 3 URL", default: "" },
            image4: { type: "text", label: "Image 4 URL", default: "" },
            image5: { type: "text", label: "Image 5 URL", default: "" },
            image6: { type: "text", label: "Image 6 URL", default: "" },
            image7: { type: "text", label: "Image 7 URL", default: "" },
            image8: { type: "text", label: "Image 8 URL", default: "" },
            image1Text: { type: "text", label: "Image 1 text", default: "SYNC SERIES" },
            image2Text: { type: "text", label: "Image 2 text", default: "JADE SERIES" },
            image3Text: { type: "text", label: "Image 3 text", default: "VIOL SERIES" },
            image4Text: { type: "text", label: "Image 4 text", default: "QUAD SERIES" },
            image5Text: { type: "text", label: "Image 5 text", default: "QUAD SERIES" },
            image6Text: { type: "text", label: "Image 6 text", default: "QUAD SERIES" },
            image7Text: { type: "text", label: "Image 7 text", default: "QUAD SERIES" },
            image8Text: { type: "text", label: "Image 8 text", default: "QUAD SERIES" },
        },
        defaultProps: {
            title: "Our Series Collection",
            description: "Thoughtfully designed furniture collections for modern workspace",
            buttonLabel: "View More",
            buttonLink: "#",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            image5: "",
            image6: "",
            image7: "",
            image8: "",
            image1Text: "SYNC SERIES",
            image2Text: "JADE SERIES",
            image3Text: "VIOL SERIES",
            image4Text: "QUAD SERIES",
            image5Text: "QUAD SERIES",
            image6Text: "QUAD SERIES",
            image7Text: "QUAD SERIES",
            image8Text: "QUAD SERIES",
        },
        render: ({
            data, title, description, buttonLabel, buttonLink, image1, image2, image3, image4, image5, image6, image7, 
            image8, image1Text, image2Text, image3Text, image4Text, image5Text, image6Text, image7Text, image8Text,
        }) => {
            const mapData =
                (Array.isArray(data?.data) ? data.data[0] : data?.data) ||
                data || {};
            const heroTitle = _.get(mapData, "heroTitle") || title || "";
            const heroDescription = _.get(mapData, "heroDescription") || description || "";
            const heroButtonLabel = _.get(mapData, "heroButtonLabel") || buttonLabel || "";
            const heroButtonLink = _.get(mapData, "heroButtonLink") || buttonLink || "";
            const images = [
                _.get(mapData, "image1") || image1 || "",
                _.get(mapData, "image2") || image2 || "",
                _.get(mapData, "image3") || image3 || "",
                _.get(mapData, "image4") || image4 || "",
                _.get(mapData, "image5") || image5 || "",
                _.get(mapData, "image6") || image6 || "",
                _.get(mapData, "image7") || image7 || "",
                _.get(mapData, "image8") || image8 || "",
            ];
            const seriesItems = [
                { image: images[0], name: image1Text },
                { image: images[1], name: image2Text },
                { image: images[2], name: image3Text },
                { image: images[3], name: image4Text },
                { image: images[4], name: image5Text },
                { image: images[5], name: image6Text },
                { image: images[6], name: image7Text },
                { image: images[7], name: image8Text },
            ];
            const carouselSlots = [...seriesItems, ...seriesItems, ...seriesItems];
            const centerSlotIndex = seriesItems.length;
            const moveCarousel = (event, direction) => {
                const section = event.currentTarget.closest("section");
                const carousel = section.querySelector(".series-marquee");
                const track = carousel.querySelector(".series-track");
                const activeIndex = Number(carousel.dataset.activeIndex || 0);
                const nextIndex =
                    (activeIndex + direction + seriesItems.length) %
                    seriesItems.length;
                carousel.dataset.activeIndex = nextIndex;
                track.style.setProperty(
                    "--series-track-offset",
                    `${nextIndex * 390}px`,);
                track.style.setProperty(
                    "--series-track-offset-mobile",
                    `calc(${nextIndex * 70}vw + ${nextIndex * 20}px)`,);
                track.querySelectorAll(".series-slide").forEach((slide, index) => {
                    const offset = index - (nextIndex + seriesItems.length);
                    slide.style.transform =
                        offset === 0
                            ? "scale(1.15)"
                            : offset === -1
                              ? "translateX(-24px) scale(0.9)"
                              : offset === 1
                                ? "translateX(24px) scale(0.9)"
                                : "scale(0.78)";
                });};
            return (
                <section className="bg-transparent py-6">
                    <Container >
                        <div
                            className="flex flex-col items-center justify-start gap-4 text-center"
                            style={{
                                minHeight: "700px",
                                backgroundImage:
                            "linear-gradient(135deg, #cbbbae 0%, #f1eeeb 48%, #b1aba5 100%)",
                            }} >
                        <div className="flex flex-col mt-6 items-center gap-2  p-12 ">
                            <div className="mb-2 flex items-center gap-4 text-xs font-medium uppercase ">
                                <span className="block shrink-0 w-10 h-1 bg-black " 
                                style={{ transform: "scaleY(0.15)" }}/>
                                <span className="text-[10px] md:text-xs">explore our collections</span>
                                <span className="block shrink-0 w-10 h-1 bg-black" 
                                style={{ transform: "scaleY(0.15)" }}/>
                            </div>
                            {heroTitle && (
                                <h1 className="text-4xl font-bold "
                                style={{ color: "#354f52" }}>
                                    {heroTitle}
                                </h1>
                            )}
                            {heroDescription && (
                                <p className="text-lg " style={{ color: "#1b1d1c" }}>
                                    {heroDescription}
                                </p>
                            )}
                            {heroButtonLabel && (
                                <a
                                    href={heroButtonLink}
                                    className="series-cta mt-3 inline-flex w-fit items-center gap-2 rounded-full px-10  py-2.5 md:py-2 text-base font-medium md:text-sm text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                    style={{
                                        "--tw-ring-color": "#263d38",
                                    }}
                                >
                                    {heroButtonLabel}
                                    <span aria-hidden="true">→</span>
                                </a>
                            )}
                        </div>
                        <div
                            className="series-marquee relative w-full overflow-hidden py-8"
                            data-active-index="0"
                        >
                            <div
                                className="series-track flex w-max gap-5"
                                style={{
                                    "--series-track-offset": "0px",
                                    "--series-track-offset-mobile": "0px",
                                }}
                            >
                                {_.map(carouselSlots, (_, index) => {
                                    const offset = index - centerSlotIndex;
                                    const imageIndex =
                                        (offset + seriesItems.length) %
                                        seriesItems.length;
                                    const { image, name } = seriesItems[imageIndex];
                                    const slideStyle = {
                                        transform:
                                            offset === 0
                                                ? "scale(1.15)"
                                                : offset === -1
                                                  ? "translateX(-24px) scale(0.9)"
                                                  : offset === 1
                                                    ? "translateX(24px) scale(0.9)"
                                                    : "scale(0.78)",
                                    };
                                    return (
                                    <div
                                        key={index}
                                        className="series-slide relative shrink-0 overflow-hidden rounded-xl"
                                        style={slideStyle}>
                                        {image ? (
                                            <>
                                                <img
                                                    src={image}
                                                    alt={`Series ${(index % 8) + 1}`}
                                                    className="h-full w-full object-cover "
                                                />
                                                <div
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute inset-0 z-10 rounded-xl"
                                                    style={{
                                                        border: "2px solid #ffffff",
                                                        
                                                    }}
                                                />
                                                {name && (
                                                    <div className="absolute top-4 left-4 z-20 rounded-lg bg-white/80 px-10 py-2 text-center text-base font-medium text-neutral-800 backdrop-blur-sm">
                                                        {name}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="h-full w-full" />
                                        )}
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mx-auto py-2 flex justify-center gap-4">
                            <button className="cursor-pointer" style={{ color: "#354f52"}}
                                type="button"
                                aria-label="Previous image"
                                onClick={(event) => moveCarousel(event, -1)}
                            >
                                {"<"}
                            </button>
                            <button className="cursor-pointer" style={{ color: "#354f52"}}
                                type="button"
                                aria-label="Next image"
                                onClick={(event) => moveCarousel(event, 1)}
                            >
                                {">"}
                            </button>
                        </div>

                        <style>{`
                            .series-cta {
                                background-color: #354f52;
                            }
                            .series-cta:hover {
                                background-color: #2f3e46;
                            }
                            .series-track {
                                position: relative;
                                left: 50%;
                                transform: translateX(
                                    calc(-3305px - var(--series-track-offset))
                                );
                            }
                            .series-slide {
                                width: 70vw;
                                height: auto;
                                aspect-ratio: 370 / 400;
                                transform: scale(0.78);
                            }
                            @media (max-width: 767px) {
                                .series-track {
                                    transform: translateX(
                                        calc(-595vw - 160px - var(--series-track-offset-mobile))
                                    );
                                }
                            }
                            @media (min-width: 768px) {
                                .series-slide {
                                    width: 370px;
                                    height: 400px;
                                }
                            }
                        `}</style>
                        </div>
                    </Container>
                </section>
            );
        },
    };
};