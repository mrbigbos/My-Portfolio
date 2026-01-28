// Image upload utility for admin panel
// Converts images to base64 and stores in localStorage for demo purposes
// In production, replace with actual file upload to cloud storage (AWS S3, Cloudinary, etc.)

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
  uploadedAt: string;
}

export class ImageUploader {
  static async uploadImage(file: File): Promise<UploadedImage> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("File must be an image"));
        return;
      }

      // Check file size (max 5MB for localStorage)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        reject(new Error("Image size must be less than 5MB"));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        const uploadedImage: UploadedImage = {
          id: `img_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          url: base64,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };

        // Save to media library
        this.saveToMediaLibrary(uploadedImage);
        resolve(uploadedImage);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  }

  static saveToMediaLibrary(image: UploadedImage): void {
    const library = this.getMediaLibrary();
    library.push(image);
    localStorage.setItem("portfolio_media", JSON.stringify(library));
  }

  static getMediaLibrary(): UploadedImage[] {
    try {
      const data = localStorage.getItem("portfolio_media");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static deleteImage(id: string): void {
    const library = this.getMediaLibrary();
    const filtered = library.filter((img) => img.id !== id);
    localStorage.setItem("portfolio_media", JSON.stringify(filtered));
  }

  static clearLibrary(): void {
    localStorage.removeItem("portfolio_media");
  }
}

// Image input component helper
export function createImageInput(onUpload: (image: UploadedImage) => void) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.style.display = "none";

  input.addEventListener("change", async (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      try {
        const uploaded = await ImageUploader.uploadImage(files[0]);
        onUpload(uploaded);
      } catch (error) {
        console.error("Upload failed:", error);
        alert(error instanceof Error ? error.message : "Upload failed");
      }
    }
  });

  return input;
}
