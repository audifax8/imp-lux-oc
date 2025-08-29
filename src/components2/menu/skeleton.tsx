
import { HeaderSkeleton } from '@/components2/menu/accordion/components/skeleton-header';
import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

export default function MenuSkeleton() {
  return (
    <>
      {MOCK_RBN_MENU_ITEMS
        .map(
          ({ id, caName, alias, selectedAvId, selectedAvName, icon }) =>
            <HeaderSkeleton
              id={id}
              key={id}
              alias={caName || alias}
              icon={icon}
              selectedAvName={selectedAvName}
              selectedAvId={selectedAvId}
            />
          ) 
      }
    </>
  );
}