import { Image } from '@/components/Image';
import { Button } from '@/components/Button';

type AccordionProps = {
  item: {
    name: string;
    selected: string;
    upcharge: string | null;
    img: string;
  };
  open?: boolean;
};

export function AccordionSkeleton({ item }: AccordionProps) {
  return (
    <details open={false} className="yr-accordion">
      <summary className="yr-accordion-summary">
        <Image showSkeleton={true} alt={item.name} className="yr-accordion-summary-image" />
        <div className="yr-accordion-header">
          <h3 className={'yr-skeleton yr-accordion-header-title'}>{item.name}</h3>
          <p className={'yr-skeleton yr-accordion-header-selected'}>{item.selected}</p>
        </div>
        <Button className='yr-skeleton' tabIndex={-1} />
      </summary>
    </details>
  );
}
