import { getSkeletonURL } from '@/declarations/constants';
import '../../styles/index.scss';

export default function MobileMock() {
  return (
    <>
      <div className="yr-main-content">
        <section className="yr-model">
          <picture className="yr-model__placeholder yr-image yr-model__hidden">
            <img
              fetchPriority="high"
              alt="Model"
              height="170"
              width="350"
              src={getSkeletonURL()}
            />
          </picture>
        </section>
      </div>
      <div className="yr-footer">
        <div className="yr-footer-price-info">
          <div className="yr-footer--price">
            <div className="yr-footer-final-price yr-skeleton">
              <label>$180.00</label>
            </div>
            <div className="yr-footer-total-price yr-skeleton">
              <label>$200.00</label>
            </div>
            <div className="yr-footer-discount-price yr-skeleton">
              <label>-20%</label>
            </div>
          </div>
          <div className="yr-footer--cart">
            <button className="yr-button yr-button-square yr-add-to-cart-button yr-skeleton">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}
