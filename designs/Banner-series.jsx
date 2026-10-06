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
                default: "#",
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
                data ||
                {};

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

            return (
                <section className="bg-transparent py-6">
                    <Container >
                        <div
                            className="flex flex-col items-center justify-start gap-4 text-center"
                            style={{
                                minHeight: "700px",
                                backgroundImage:
                            "linear-gradient(135deg, #cbbbae 0%, #f1eeeb 48%, #b1aba5 100%)",
                            }}
                        >
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
                                    className="series-cta inline-flex w-fit items-center gap-2 rounded-full px-0.5 py-0.5 text-sm font-medium text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:px-10 md:py-2.5 md:text-base"
                                    style={{
                                        "--tw-ring-color": "#263d38",
                                    }}
                                >
                                    {heroButtonLabel}
                                    <span aria-hidden="true">→</span>
                                </a>
                            )}
                        </div>

                        {/* Image Carousel */}
                        <div className="series-marquee relative mt-auto mb-10 w-full overflow-hidden py-8">
                            <div
                                className="series-track flex w-max gap-5"
                            >
                                {_.map(carouselSlots, (_, index) => {
                                    const { image, name } = seriesItems[index % seriesItems.length];
                                    return (
                                    <div
                                        key={index}
                                        className="series-slide relative shrink-0 overflow-hidden rounded-xl"
                                    >
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
                                                        boxShadow:
                                                            "inset 0 0 12px 4px #ffffff",
                                                    }}
                                                />
                                                {name && (
                                                    <div className="absolute top-4 left-4 z-20 rounded-lg bg-white/80 px-10 py-2 text-center text-base font-medium text-neutral-800 backdrop-blur-sm">
                                                    {/* <div className="absolute inset-x-0 bottom-0 mx-4 mb-4 rounded bg-white/80 px-4 py-3 text-center text-lg font-medium text-neutral-800 backdrop-blur-sm"> */}

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
                                animation: seriesStepTrack 24s infinite;
                            }

                            .series-slide {
                                width: 70vw;
                                height: auto;
                                aspect-ratio: 370 / 400;
                                animation: seriesStepFocus 24s linear infinite;
                            }

                            @media (max-width: 767px) {
                                .series-track {
                                    animation-name: seriesStepTrackMobile;
                                }
                            }

                            @media (min-width: 768px) {
                                .series-slide {
                                    width: 370px;
                                    height: 400px;
                                }
                            }

                            .series-slide:nth-child(1),
                            .series-slide:nth-child(9),
                            .series-slide:nth-child(17) {
                                animation-delay: 0s;
                            }

                            .series-slide:nth-child(2),
                            .series-slide:nth-child(10),
                            .series-slide:nth-child(18) {
                                animation-delay: -21s;
                            }

                            .series-slide:nth-child(3),
                            .series-slide:nth-child(11),
                            .series-slide:nth-child(19) {
                                animation-delay: -18s;
                            }

                            .series-slide:nth-child(4),
                            .series-slide:nth-child(12),
                            .series-slide:nth-child(20) {
                                animation-delay: -15s;
                            }

                            .series-slide:nth-child(5),
                            .series-slide:nth-child(13),
                            .series-slide:nth-child(21) {
                                animation-delay: -12s;
                            }

                            .series-slide:nth-child(6),
                            .series-slide:nth-child(14),
                            .series-slide:nth-child(22) {
                                animation-delay: -9s;
                            }

                            .series-slide:nth-child(7),
                            .series-slide:nth-child(15),
                            .series-slide:nth-child(23) {
                                animation-delay: -6s;
                            }

                            .series-slide:nth-child(8),
                            .series-slide:nth-child(16),
                            .series-slide:nth-child(24) {
                                animation-delay: -3s;
                            }

                            @keyframes seriesStepTrack {
                                0%, 10% { transform: translateX(-3305px); animation-timing-function: ease; }
                                12.5%, 22.5% { transform: translateX(-3695px); animation-timing-function: ease; }
                                25%, 35% { transform: translateX(-4085px); animation-timing-function: ease; }
                                37.5%, 47.5% { transform: translateX(-4475px); animation-timing-function: ease; }
                                50%, 60% { transform: translateX(-4865px); animation-timing-function: ease; }
                                62.5%, 72.5% { transform: translateX(-5255px); animation-timing-function: ease; }
                                75%, 85% { transform: translateX(-5645px); animation-timing-function: ease; }
                                87.5%, 97.5% { transform: translateX(-6035px); animation-timing-function: ease; }
                                100% { transform: translateX(-6425px); }
                            }

                            @keyframes seriesStepTrackMobile {
                                0%, 10% { transform: translateX(calc(-595vw - 160px)); animation-timing-function: ease; }
                                12.5%, 22.5% { transform: translateX(calc(-665vw - 180px)); animation-timing-function: ease; }
                                25%, 35% { transform: translateX(calc(-735vw - 200px)); animation-timing-function: ease; }
                                37.5%, 47.5% { transform: translateX(calc(-805vw - 220px)); animation-timing-function: ease; }
                                50%, 60% { transform: translateX(calc(-875vw - 240px)); animation-timing-function: ease; }
                                62.5%, 72.5% { transform: translateX(calc(-945vw - 260px)); animation-timing-function: ease; }
                                75%, 85% { transform: translateX(calc(-1015vw - 280px)); animation-timing-function: ease; }
                                87.5%, 97.5% { transform: translateX(calc(-1085vw - 300px)); animation-timing-function: ease; }
                                100% { transform: translateX(calc(-1155vw - 320px)); }
                            }

                            @keyframes seriesStepFocus {
                                0%, 8.33% {
                                    transform: scale(1.15);
                                    animation-timing-function: ease;
                                }
                                12.5%, 22.5% {
                                    transform: translateX(-24px) scale(0.9);
                                    animation-timing-function: ease;
                                }
                                25%, 35% {
                                    transform: translateX(12px) scale(0.78);
                                    animation-timing-function: ease;
                                }
                                37.5%, 72.5% {
                                    transform: scale(0.78);
                                    animation-timing-function: ease;
                                }
                                75%, 85% {
                                    transform: translateX(-12px) scale(0.78);
                                    animation-timing-function: ease;
                                }
                                87.5%, 95.83% {
                                    transform: translateX(24px) scale(0.9);
                                    animation-timing-function: ease;
                                }
                                100% { transform: scale(1.15); }
                            }

                        `}</style>

                        </div>
                    </Container>
                </section>
            );
        },
    };
};