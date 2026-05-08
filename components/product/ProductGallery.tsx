import Image from "next/image";
import type { Product } from "@/types";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const gallery = product.galleryImages?.length
    ? product.galleryImages
    : [product.frontImage, product.backImage];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {gallery.map((image, index) => (
        <div
          key={`${product.id}-${index}`}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line-100 bg-cream-100/50"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="object-cover"
            preload={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
