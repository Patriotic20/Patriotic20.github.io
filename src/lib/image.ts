const MAX_SOURCE_BYTES = 10 * 1024 * 1024;

export async function resizeImageToDataUrl(
  file: File,
  maxSize = 480,
  quality = 0.85,
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file");
  }
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error("Image is larger than 10 MB");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported in this browser");

    ctx.drawImage(img, 0, 0, width, height);

    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
    return canvas.toDataURL(outputType, quality);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode this image"));
    img.src = src;
  });
}
