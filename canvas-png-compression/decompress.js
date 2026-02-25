/**
 * Decompresses a base64-encoded PNG string (produced by canvas compression) back into a Uint8Array.
 *
 * Why it matters: The decode side of the canvas PNG trick. Decompression must be async
 * because we rely on an <img> element's onload event — the browser decodes and decompresses
 * the PNG automatically. We then read the RGB pixel values back to recover the original bytes,
 * filtering out the alpha channel which was forced to 255 during encoding to avoid
 * cross-browser inconsistencies.
 *
 * Source: "Using the Browser's Canvas for Data Compression" — Jacob Strieb (Feb 2026)
 * https://jstrieb.github.io/posts/canvas-compression/
 */

/**
 * Decompress a base64 PNG string into a Uint8Array.
 * @param {string} base64
 * @returns {Promise<Uint8Array>}
 */
function decompress(base64) {
  // Decompression must be async. There is a race
  // if we don't wait for the image to load before
  // using its pixels
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onerror = () => reject(
      new Error("Could not extract image data")
    );
    img.onload = () => {
      try {
        const c =
          document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const context = c.getContext("2d");
        context.drawImage(img, 0, 0);
        const raw = context.getImageData(
          0, 0, c.width, c.height,
        ).data;
        // Filter out the alpha channel
        const r = raw.filter((_, i) => i % 4 != 3);
        resolve(new Uint8Array(
          r.slice(1, r.length - 3 + r[0] + 1),
        ));
      } catch (e) { reject(e); }
    };
    img.src = `data:image/png;base64,${base64}`;
  });
}
