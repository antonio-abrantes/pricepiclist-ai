import imageCompression from 'browser-image-compression';

export async function compressAndConvertToJpeg(file: File, maxSizeMB: number = 2): Promise<File> {
  try {
    const options = {
      maxSizeMB,
      useWebWorker: true,
      maxWidthOrHeight: 1920,
      initialQuality: 0.8,
      fileType: 'image/jpeg',
    };
    const compressedFile = await imageCompression(file, options);
    return new File([compressedFile], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: 'image/jpeg' });
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error('Failed to compress and convert image');
  }
} 