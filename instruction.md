# Component Authoring Guide — Page Builder Components

This file gives an AI coding agent (GitHub Copilot, etc.) the context needed
to correctly write new components for our CRM's visual page builder. Read
this in full before generating or editing any component.

## 1. What this system is

- **Framework:** Next.js (React), styled with **Tailwind CSS**.
- **Page builder:** components follow the [Puck](https://puckeditor.com)
  config shape (`fields` / `defaultProps` / `render`), authored inside our
  CRM's built-in code editor.
- Components are placed on page templates by non-developers via drag-and-drop,
  then either:
  - **filled in manually** using the `fields` you declare, or
  - **bound to a saved content record** (e.g. a "Banner" or "Product
    Collection" entity created through its own admin CRUD form) — in that
    mode your prop names must match that content type's schema exactly, or
    the bound values won't populate.
- Unless told otherwise, default to building components for **manual/local
  field entry** (no external content-type binding).
- **Binding isn't all-or-nothing.** A single component can take a `data`
  prop bound to an external content record *and* declare its own local
  `fields` at the same time — e.g. `render: ({ data, bgColor })`, where
  `data` comes from a bound "Product Collection" record but `bgColor` is a
  plain field the page editor sets per placement. Use this when part of a
  component (content) should come from the CMS but another part (styling,
  a toggle) should stay editable per-instance.

## 2. Critical sandbox rule: no arbitrary imports

Code is evaluated inside the CRM's editor sandbox, **not** a normal bundled
Next.js file. There is **no `import` statement** for anything — every
dependency below is injected as a **global**. Do not write `import ... from`
for any of these; just reference them directly. Do not invent or assume a
global that isn't listed here — if something's missing, ask rather than
guessing an import path.

## 3. Available globals

```
Container                          // page-width wrapper
Link                                // navigation link (next/link-like)
Image                               // next/image-like, supports fill or height/width
CustomImage: ImageFallback          // image with built-in fallback handling
formatImageUrl                      // resolves/prefixes an image path to a full URL
generatePageRedirection             // builds an href from a record's page/pageReference/linkType/link fields
Button                              // shared button component
Pagination                          // pagination controls
ProductItem: ProductCard            // single product card — usage: <ProductItem productItem={product} />
                                     // (takes the whole product record as one "productItem" prop,
                                     // not spread-out individual fields)
ProductCardV3                       // product card, variant 3
ProductCardV3V1: ProductCardV3      // alias of ProductCardV3
ProductCardV4                       // product card, variant 4
RightIcon: MoveRightIcon            // arrow/carousel icon
LeftIcon: MoveLeftIcon              // arrow/carousel icon
loadMuiIcon                         // dynamically loads a named MUI icon (avoids bundling the whole icon set)
Swiper                              // carousel container (swiper/react)
SwiperSlide                         // individual slide wrapper, used inside <Swiper>
Navigation                          // swiper module — pass as modules={[Navigation]} on <Swiper>,
                                     // then point navigation.nextEl/prevEl at your own button selectors
                                     // (see carousel pattern in section 5)
_: { get, isEmpty, isArray, size, map, find, filter, cloneDeep, has, set }
                                     // lodash, only these methods — always use _.get()
                                     // for reading nested data safely
Icon: { Box, Typography, Stack, Grid: MuiGrid }
                                     // MUI layout primitives (naming as provided by
                                     // the platform — confirm with the team if this
                                     // still looks like a mislabeled namespace)
```

If you need something not on this list (e.g. a different product card
variant, a carousel library, a form input), **stop and ask** rather than
importing a new package — the sandbox likely can't resolve it.

## 4. Component skeleton

Every component is a factory function, default-exported, returning
`fields`, `defaultProps`, and `render`:

```jsx
export default () => {
  return {
    fields: {
      // one entry per editable prop; declare an explicit "type" so the
      // CRM editor renders the correct input (text, textarea, image, etc.)
      exampleTitle: { type: "text", label: "Title" },
    },

    defaultProps: {
      // starting values — also used as the live preview while editing
      exampleTitle: "Sample text",
    },

    render: ({ exampleTitle }) => {
      // pure function: props in, JSX out. Style with Tailwind only.
      return (
        <Container>
          <h2 className="text-2xl font-bold text-black font-raleway">
            {exampleTitle}
          </h2>
        </Container>
      );
    },
  };
};
```

Notes:
- Props in `render` are **flat**, named exactly as declared in `fields` —
  do not assume a `{ data: { data: [...] } }` wrapper unless the component
  is explicitly meant to bind to an external content-type source.
- Use `_.get(obj, "path", fallback)` any time you're reading from a record
  that might be missing fields (especially when binding to external data).
- All images should go through `formatImageUrl()` before being passed to
  `Image`.

## 5. External content-type data shapes (confirmed so far)

These are shapes we've directly seen bound as a component's `data` prop.
**More will be added as they're confirmed** — do not assume a field exists
on a content type just because a similar-sounding one exists elsewhere;
check here first, and ask if a needed shape isn't documented yet.

### Banner (v2 — includes subtitle)

```js
{
  "_id": "6a845507715413b697e2f700",
  "countryId": "663209ff5ded1a6bb444797a",
  "bannerTitle": "Jade Color Series",
  "bannerSubTitle": "                               ",
  "description": "<p><span style=\"color: oklch(...); font-family: Inter...\">The Jade Colour Series adds color to the workspace...</span></p>",
  "blocks": 1,
  "bannerImages": [
    {
      "bannerImageUrl": "https://ergospaceae.s3.me-central-1.amazonaws.com/banner/Main-Image-color-products-page.jpg.jpeg",
      "bannerImage": ""
    }
  ],
  "page": "jade-color-series",
  "pageReference": "top",
  "linkType": "custom",
  "link": "/contact-us",
  "position": 1,
  "showOrder": 0,
  "layout": [ /* ...2 layout instance objects... */ ],
  "relation": [],
  "metaTitle": "",
  "status": "1",
  "createdAt": "2026-08-18T12:50:15.519Z",
  "updatedAt": "2026-08-18T12:50:15.521Z",
  "__v": 0
}
```

### Product Collection

```js
{
    "_id": "6959172cf53ea1f1d7b19f6a",
    "collectionTitle": "Cove Series Three-Person Workstations",
    "slug": "three-person-workstationsss",
    "collectionSubTitle": "Optimize your office layout with stylish and functional three-person workstation solutions.",
    "collectionImageUrl": "https://ergospaceae.s3.me-central-1.amazonaws.com/collection/collectionImage-1767446316429-838707078.webp",
    "description": "<p>Working with a small team? Our Cove Colour Series Three-Person Workstations add colour while keeping the space balanced and easy to use. Create a setup that keeps teamwork smooth.</p>",


"collectionsProducts": [
  {
    "_id": "6aa42d9e8330a2e84e60717f",
    "brand": "691c48b8f4aba342e690eb2a",
    "productTitle": "Cove Color L-Shape Three Person Workstation With Front Partition (Custom Made)",
    "slug": "cove-color-l-shape-three-person-workstation-with-front-partition-custom-made-e043939",
    "starRating": 0,
    "productImageUrl": "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
    "sku": "E043939",
    "productVariants": [
      {
        "_id": "6aa42d9e8330a2e84e607184",
        "productId": "6aa42d9e8330a2e84e60717f",
        "countryId": "663209ff5ded1a6bb444797a",
        "offerId": null,
        "variantSku": "E043939",
        "variantImageUrl": "https://ergospaceae.s3.me-central-1.amazonaws.com/product/series/cove/color/es_cove97_lw3.webp",
        "slug": "cove-color-l-shape-three-person-workstation-with-front-partition-custom-made-e043939",
        "extraProductTitle": "Cove Color L-Shape Three Person Workstation With Front Partition (Custom Made)",
        "variantDescription": "The Ergospace Color Three Person L Shape Workstation with Front Acoustic Partition is a high-capacity office solution...",
        "variantLongDescription": "<div>...spec table with Material, Tabletop, Tabletop Size, Leg Frame, Modesty Panel, Partition, Drawer, Wire Manager, Brand name, Warranty...</div>",
        "price": 4769,
        "discountPrice": 0,
        "offerPrice": 0,
        "quantity": 20,
        "isDefault": 1,
        "isVoucher": 0,
        "status": "1"
      }
    ]
  }
]

}
```
```js
existing banner
export default () => {
  return {
    render: ({ data, }) => {
      let mapData = Array.isArray(data.data) ? data?.data?.[0] : data?.data;
      console.log("uasc", mapData)
      return (
        <section className="bg-white py-8">
          <Container>
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-black font-raleway">{_.get(mapData, "bannerTitle")}</h1>
            </div>

            <Link href={generatePageRedirection(mapData)}>            
            <div className="w-full relative overflow-hidden mb-6">
              <Image
                src={formatImageUrl(_.get(mapData, "bannerImages[0].bannerImageUrl"))}
                alt={_.get(mapData, "bannerTitle")}
                priority
                // height={800}
                // width={160}
                className="w-full h-auto object-cover object-center" />
            </div>
            </Link>

            <div className="text-lg text-gray-900 font-raleway leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: _.get(mapData, "description") }} 
            />

          </Container>
        </section>
      );
    },
    defaultProps: {
      data: {
        data: [
          {
            bannerTitle: "Sync White Series",
            description: "The Sync White Series has a clean white look that makes offices feel bright and open. It matches easily with any office style and saves space. Perfect for single or team workstations. It supports productivity and daily comfort.",
            bannerImages: [
              {
                bannerImageUrl: "https://www.endocr0eative.com/wp-content/uploads/2014/11/banner-772x250.png",
              },
            ],
            page: "home",
            pageReference: "top",
            linkType: "custom",
            link: "/",
            layout: {
              layoutInstanceId: "Default-banner-instance",
              pageSlug: "home",
              pageEndPoint: "home",
            },
          },
        ]
      }
    },
  };
};
```

existing collection product
```js
export default () => {
  return {
    fields: {
      collectionImage: {
        type: "text",
        label: "Collection Image URL (Optional)",
        default: "",
      },
      bgColor: {
        type: "text",
        label: "Background Color",
        default: "#FFFFFF",
      },
    },

    render: ({ data, collectionImage, bgColor }) => {
      const collectionProducts = data?.collectionsProducts ? data : [];
      const productsList = _.get(collectionProducts, "collectionsProducts", []);
      const backgroundStyle = bgColor ? bgColor : "transparent";

      const displayTitle = _.get(collectionProducts, "collectionTitle");
      const displaySubtitle = _.get(collectionProducts, "collectionSubTitle");
      const description = _.get(collectionProducts, "description", "");

      const bannerImg = collectionImage || _.get(collectionProducts, "collectionImageUrl", "");

      return (
        <div className="w-full py-8" style={{ backgroundColor: backgroundStyle }}>
          <Container>
            <div className="mb-4 md:mb-6">
              {displayTitle && (
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1B4D4F] tracking-wide uppercase font-raleway">
                  {displayTitle}
                </h2>
              )}
            </div>

            {bannerImg && (
              <div className="w-full mb-6 md:mb-8 overflow-hidden">
                <Image
                  src={formatImageUrl(bannerImg)}
                  width={1600}
                  height={600}
                  alt={displayTitle || "Collection Banner Image"}
                  className="w-full h-auto max-h-[500px] object-cover"
                  priority
                />
              </div>
            )}

            {productsList.length > 0 && (
              <div className="w-full relative">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={2}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                    1280: { slidesPerView: 5, spaceBetween: 24 },
                  }}
                  className="!pb-5 !pt-2 !px-1 collection-product-swiper"
                >
                  {_.map(productsList, (product, index) => (
                    <SwiperSlide key={index} className="!h-auto py-2">
                      <ProductItem productItem={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Link
                href={
                  !_.isEmpty(_.get(collectionProducts, "customPageRedirectionUrl"))
                    ? _.get(collectionProducts, "customPageRedirectionUrl")
                    : `/product-listing?collectionproduct=${_.get(
                        collectionProducts,
                        "_id"
                      )}`
                }
                className="text-base md:text-lg font-bold text-black hover:text-gray-700 flex items-center transition-colors font-raleway"
              >
                View More
              </Link>
            </div>
          </Container>
        </div>
      );
    },

    defaultProps: {
      bgColor: "#FFFFFF",
      collectionImage: "",
      data: {
        _id: "default-collection-id",
        collectionTitle: "TRAINING TABLES",
        collectionSubTitle: "",
        description: "",
        collectionImageUrl: "https://via.placeholder.com/1600x600",
        customPageRedirectionUrl: "",
        collectionsProducts: [
          {
            _id: "default-product-id-1",
            slug: "training-table-1",
            productTitle: "Training Table Executive L-Shape 1",
            productImageUrl: "https://via.placeholder.com/600x450",
            salePrice: 2150,
          },
          {
            _id: "default-product-id-2",
            slug: "training-table-2",
            productTitle: "Training Table Executive L-Shape 2",
            productImageUrl: "https://via.placeholder.com/600x450",
            salePrice: 2550,
          },
          {
            _id: "default-product-id-3",
            slug: "training-table-3",
            productTitle: "Training Table Executive L-Shape 3",
            productImageUrl: "https://via.placeholder.com/600x450",
            salePrice: 2150,
          },
          {
            _id: "default-product-id-4",
            slug: "training-table-4",
            productTitle: "Training Table Executive L-Shape 4",
            productImageUrl: "https://via.placeholder.com/600x450",
            salePrice: 5695,
          },
          {
            _id: "default-product-id-5",
            slug: "training-table-5",
            productTitle: "Training Table Executive L-Shape 5",
            productImageUrl: "https://via.placeholder.com/600x450",
            salePrice: 8695,
          },
        ],
      },
    },
  };
};
```





Note the **two different link-resolution patterns** in use, depending on
content type:
- **Banner-style records** → use `generatePageRedirection(mapData)`, which
  reads `page` / `pageReference` / `linkType` / `link`.
- **Collection-style records** → build the link manually:
  ```js
  !_.isEmpty(_.get(record, "customPageRedirectionUrl"))
    ? _.get(record, "customPageRedirectionUrl")
    : `/product-listing?collectionproduct=${_.get(record, "_id")}`
  ```
  i.e. an explicit override URL if set, otherwise a generated listing URL
  keyed by the record's `_id`. Don't mix the two patterns up — check which
  content type you're binding to before picking one.

## 6. Lodash — why it's mandatory here, not just a preference

`_` is available with a fixed set of methods: `get, isEmpty, isArray, size,
map, find, filter, cloneDeep, has, set`. This isn't a style choice — always
reach for these over plain JS equivalents when handling `data` from a
bound content record, because:

- **Records don't guarantee their own shape.** A field can be missing
  entirely (not just `null`) if a content editor never filled it in, or if
  the schema changed after older records were created. Optional chaining
  (`data?.bannerImages?.[0]?.bannerImageUrl`) still throws or misbehaves in
  edge cases lodash handles cleanly, and mixing styles makes the codebase
  inconsistent.

**`_.get(obj, "path", fallback)`** — the default way to read *any* field
off a bound record. Always pass a fallback (`""`, `[]`, or a sensible
default), so a missing field degrades quietly instead of rendering
`undefined` or crashing:
```js
const title = _.get(mapData, "bannerTitle", "");
const images = _.get(mapData, "bannerImages", []);
```

**`_.isEmpty(value)`** — check whether an optional value is usable before
branching on it. This is the standard way to implement an "override if
set, otherwise fall back" link, as seen in the Product Collection example:
```js
!_.isEmpty(_.get(record, "customPageRedirectionUrl"))
  ? _.get(record, "customPageRedirectionUrl")
  : `/product-listing?collectionproduct=${_.get(record, "_id")}`
```
Also use it to guard whole sections — e.g. don't render a product carousel
at all if `_.isEmpty(productsList)`.

**`_.isArray(value)`** — used to normalize a `data` prop that might arrive
either as a single object or wrapped in an array (the same check as native
`Array.isArray`, but prefer the lodash version for consistency with the
rest of this list):
```js
const mapData = _.isArray(data.data) ? data.data[0] : data.data;
```

**`_.map(collection, iteratee)`** — the standard way to render a list of
products/slides, instead of `.map()` directly on the array:
```js
{_.map(productsList, (product, index) => (
  <SwiperSlide key={index}><ProductItem productItem={product} /></SwiperSlide>
))}
```

**`_.size(value)`** — safe length/count check (works on arrays, objects,
and strings alike, and won't throw on `undefined`) — use before deciding
whether to show a carousel, a "View More" link, or an empty state.

**`_.find(collection, predicate)` / `_.filter(collection, predicate)`** —
for querying inside a products array, e.g. finding a specific product by
`slug`/`_id`, or filtering out out-of-stock items before rendering.

**`_.has(obj, path)`** — check whether a key path *exists* (regardless of
its value) when you need to decide whether to render an optional block at
all, as distinct from `_.get`'s "give me the value or a fallback."

**`_.cloneDeep(obj)`** — use only if you need to derive a modified copy of
a record for local computation (e.g. sorting products for display without
mutating the original prop). Components should otherwise stay pure —
don't mutate `data` or `defaultProps` in place.

**`_.set(obj, path, value)`** — rarely needed; use when constructing a new
object with a nested path assigned dynamically, rather than hand-writing
nested spreads.

## 7. Styling conventions observed so far

- Tailwind utility classes only, no custom CSS files (inline `style={{}}`
  is used only for dynamic values Tailwind can't express, like a
  CMS-editable hex color or an rgba/backdrop-blur glass effect).
- Primary font class: `font-raleway`.
- Headings: bold; color varies by component (plain black, or a specific
  brand hex like `#E86B24` / `#7C4A2D` set inline) — match whatever
  reference design you're given rather than assuming black by default.
- CTA buttons: pill-shaped, gradient background
  (`bg-gradient-to-r from-amber-700 to-orange-800 text-white rounded-full`).
- "Glass" overlay pattern for text-on-image banners: a semi-transparent
  panel using inline `backgroundColor: rgba(...)`, `backdropFilter: "blur(10px)"`,
  and a soft `boxShadow`, centered over the image with
  `absolute inset-0 flex items-center justify-center`.
- Keep components self-contained — one file, no shared state, no
  side effects on mount.

## 8. Working with the agent

When asking Copilot/an agent to build a new component here, describe:
1. What the component should show (and ideally a screenshot/reference).
2. Whether it's for **manual field entry** or must **bind to an existing
   content type** (and if so, which one, and its exact field names).
3. Any product/data fields involved that aren't already documented above —
   the agent should ask rather than invent field names for things like
   product schemas, since guessing wrong breaks the CMS binding silently.

**This is a living document.** Section 5's data shapes and section 6's
lodash patterns are only what's been confirmed so far — more content types
(and likely a full product schema) will be added as they're provided. If a
task needs a shape or pattern not yet listed here, ask for it instead of
guessing.