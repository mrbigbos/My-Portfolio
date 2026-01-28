import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "~/components/ui/button/button";
import { ImageUploader, type UploadedImage } from "~/utils/image-upload";
import styles from "./image-upload-button.module.css";

interface ImageUploadButtonProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUploadButton({ value, onChange, label, className }: ImageUploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploaded = await ImageUploader.uploadImage(file);
      onChange(uploaded.url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.uploadArea}>
        {value ? (
          <div className={styles.preview}>
            <img src={value} alt="Preview" className={styles.previewImage} />
            <Button variant="destructive" size="sm" onClick={handleClear} className={styles.clearBtn}>
              <X size={16} />
            </Button>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <ImageIcon size={48} />
            <p>No image selected</p>
          </div>
        )}

        <input ref={inputRef} type="file" accept="image/*" onChange={handleFileSelect} className={styles.input} />

        <Button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className={styles.uploadBtn}>
          <Upload size={16} />
          {uploading ? "Uploading..." : value ? "Change Image" : "Upload Image"}
        </Button>
      </div>
    </div>
  );
}
