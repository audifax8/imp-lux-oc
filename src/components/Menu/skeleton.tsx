
import { HeaderSkeleton } from '@/components/menu/accordion/skeleton-header';
import { MOCK_RBN_MENU_ITEMS } from '@/declarations/constants';

export default function MenuSkeleton() {
  return (
    <>
      {MOCK_RBN_MENU_ITEMS
        .map(
          (_menu, index) =>
            <HeaderSkeleton key={index} />
          ) 
      }
    </>
  );
}