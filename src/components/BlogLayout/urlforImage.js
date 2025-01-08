// /my-blog/frontend/src/sanity/urlForImage.js

// import client from "../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

export const imageBuilder = imageUrlBuilder({
  projectId: "fqd3bez7",
  dataset: "production",
  useCdn: true,
});

export function urlForImage(source) {
  return imageBuilder.image(source);
}
