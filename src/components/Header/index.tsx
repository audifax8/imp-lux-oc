import {
  //useIsCustomizerOpen,
  useTheme,
  //useIsMobile,
  useParams
} from '@/state/ui';

import { Theme } from '@/declarations/enums';

import { useGetProduct } from '@/libs/yr-react/hooks/configure';
import { useClsxWithSkeleton } from '@/hooks/useClsxWithSkeleton';

import { Switch } from '@/components/Switch';
//import { Button } from '@/components/Button';
//import { ArrowIcon } from '@/components/Icons';

/*
{isCustomizerOpen && isMobile ? (
        <Button
          className="yr-header-go-back-button"
          icon={<ArrowIcon direction="right" size={24} />}
          onClick={() => toggleCustomizer(false)}
        />
      )
*/

export function Header() {
  const [params] = useParams();
  //const [isMobile] = useIsMobile();
  const [theme, toggleTheme] = useTheme();
  //const [isCustomizerOpen, toggleCustomizer] = useIsCustomizerOpen();
  const product = useGetProduct();
  const clsxWithSkeleton = useClsxWithSkeleton();
  const name = product?.name ?? 'test';

  return (
    <header className="yr-custom-header">
      <div className={clsxWithSkeleton('yr-header-title')}>
        <span >{name}</span>
      </div>
      
      {params?.showThemeSwitch && (
        <Switch
          checked={theme === Theme.DARK}
          onChange={(checked: boolean) => toggleTheme(checked ? Theme.DARK : Theme.LIGHT)}
          label="Dark mode"
        />
      )}
    </header>
  );
}