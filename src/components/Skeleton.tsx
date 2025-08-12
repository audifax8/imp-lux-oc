export function ModelSkeleton() {
  return (
    <section className="yr-model">
      <picture className={('yr-skeleton yr-model__placeholder yr-image')}>
        <img
          src={
            'https://cdn-prod.fluidconfigure.com/static/fluid-implementation-lux.s3.amazonaws.com/lux-ocp/rbn/assets/img/sk.webp'
          }
          alt="Model"
        />
      </picture>
    </section>
  );
}
