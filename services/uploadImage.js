import * as ImageManipulator from "expo-image-manipulator";
 
export async function uploadImageAsync(localUri, storagePath, options = {}) {
  const { maxWidth = 600, quality = 0.5 } = options;
 
  const manipulated = await ImageManipulator.manipulateAsync(
    localUri,
    [{ resize: { width: maxWidth } }],
    {
      compress: quality,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    }
  );
 
  if (!manipulated.base64) {
    throw new Error("Failed to encode image.");
  }
 
  const approxBytes = manipulated.base64.length * 0.75;
  if (approxBytes > 700_000) {
    throw new Error(
      "Image is still too large after compression. Try a smaller maxWidth or lower quality."
    );
  }

  return `data:image/jpeg;base64,${manipulated.base64}`;
}
 