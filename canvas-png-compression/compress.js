/**
 * Compresses a Uint8Array into a base64-encoded PNG string using the browser's canvas element.
 *
 * Why it matters: Before the Compression Streams API was widely available (May 2023),
 * browsers had no direct JS API for compression. However, browsers internally compress
 * PNG pixel data. By encoding arbitrary bytes as pixel RGB values and exporting as PNG,
 * we can piggyback on the browser's built-in deflate compression — useful for storing
 * SPA state in URL hashes or other size-constrained scenarios.
 *
 * Source: "Using the Browser's Canvas for Data Compression" — Jacob Strieb (Feb 2026)
 * https://jstrieb.github.io/posts/canvas-compression/
 */

/**
 * Compress a Uint8Array into a base64 PNG string.
 * @param {Uint8Array} data
 * @returns {string} base64-encoded PNG
 */
function compress(data) {
  data = Array.from(data);
  // Last pixel can have 1-3 data bytes. Store
  // that number in the first byte
  data.unshift(data.length % 3);
  const c = document.createElement("canvas");
  const numPixels = Math.ceil(data.length / 3);
  c.width = numPixels;
  c.height = 1;
  const context = c.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 0, c.width, c.height);
  const image = context.getImageData(
    0, 0, c.width, c.height,
  );
  let offset = 0;
  for (const b of data) {
    // The alpha channel must be fully opaque or
    // there will be cross-browser inconsistencies
    // when encoding and decoding pixel data
    if (offset % 4 == 3) {
      image.data[offset++] = 255;
    }
    image.data[offset++] = b;
  }
  context.putImageData(image, 0, 0);
  const url = c.toDataURL("image/png");
  return url.match(/,(.*)/)[1];
}
