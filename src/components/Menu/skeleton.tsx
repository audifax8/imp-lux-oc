export default function MenuSkeleton() {
  return (
    <div className='yr-customizer'>
      <details className='yr-accordion'>
        <summary className='yr-accordion-summary'>
          <div className='yr-skeleton yr-image yr-accordion-summary-image'></div>
          <div className='yr-accordion-header'>
            <h3 className='yr-skeleton yr-accordion-header-title'>Front</h3>
            <p className='yr-skeleton yr-accordion-header-selected'>Black</p>
          </div>
          <button className='yr-button yr-button-rounded yr-skeleton' tabIndex={-1}></button>
        </summary>
      </details>
      <details className='yr-accordion'>
        <summary className='yr-accordion-summary'>
          <div className='yr-skeleton yr-image yr-accordion-summary-image'></div>
          <div className='yr-accordion-header'>
            <h3 className='yr-skeleton yr-accordion-header-title'>Temple</h3>
            <p className='yr-skeleton yr-accordion-header-selected'>Black</p>
          </div>
          <button className='yr-button yr-button-rounded yr-skeleton' tabIndex={-1}></button>
        </summary>
      </details>
      <details className='yr-accordion'>
        <summary className='yr-accordion-summary'>
          <div className='yr-skeleton yr-image yr-accordion-summary-image'></div>
          <div className='yr-accordion-header'>
            <h3 className='yr-skeleton yr-accordion-header-title'>Lenses</h3>
            <p className='yr-skeleton yr-accordion-header-selected'>Green G-15</p>
          </div>
          <button className='yr-button yr-button-rounded yr-skeleton' tabIndex={-1}></button>
        </summary>
      </details>
    </div>
  );
}