import { getSkeletonURL } from "@/declarations/constants";
import { getImgData } from "@/libs/helpers";

export function ModelSkeleton() {
  const skeletonURL = getSkeletonURL();
  const imageData = getImgData();
  return (
    <section className="yr-model">
      <picture className={('yr-model__placeholder yr-image')}>
        <img
          src={skeletonURL}
          alt="product loader"
          height={imageData.dimentions.height}
          width={imageData.dimentions.width}
        />
      </picture>
    </section>
  );
}
