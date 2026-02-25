/**
 * Demonstrates a full round-trip: compress a string into a PNG-backed base64 blob,
 * then decompress it back — entirely in the browser with no server or external library.
 *
 * Why it matters: This pattern is particularly useful for storing SPA state in the
 * URL fragment (#) where keeping the payload small matters. The canvas PNG trick works
 * in browsers that predate the Compression Streams API (widely available May 2023).
 *
 * Source: "Using the Browser's Canvas for Data Compression" — Jacob Strieb (Feb 2026)
 * https://jstrieb.github.io/posts/canvas-compression/
 */

async function example() {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const original = "Hello, canvas compression!";
  const bytes = encoder.encode(original);

  // Compress: Uint8Array → base64 PNG string
  const base64 = compress(bytes);
  console.log("Compressed base64:", base64);
  console.log("Compressed length:", base64.length, "vs original:", bytes.length);

  // Decompress: base64 PNG string → Uint8Array
  const recovered = await decompress(base64);
  console.log("Recovered:", decoder.decode(recovered));
  // => "Hello, canvas compression!"
}

example();
