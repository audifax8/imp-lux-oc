

import {
  useIsCustomizerOpen,
  useTheme,
  useIsMobile,
  useParams
} from '@/state/ui';

import { Theme } from '@/declarations/enums';

import { useGetProduct } from '@/libs/yr-react/hooks/configure';
import { useClsxWithSkeleton } from '@/hooks/useClsxWithSkeleton';

import { Button } from '@/components/Button';
import { Switch } from '@/components/Switch';
import { TryOnIcon, ArrowIcon } from '@/components/Icons';
import { Logo } from '@/components/Logo';

export function Header() {
  const [params] = useParams();
  const [isMobile] = useIsMobile();
  const [theme, toggleTheme] = useTheme();
  const [isCustomizerOpen, toggleCustomizer] = useIsCustomizerOpen();
  const product = useGetProduct();
  const clsxWithSkeleton = useClsxWithSkeleton();

  return (
    <header className="yr-header">
      {isCustomizerOpen && isMobile ? (
        <Button
          className="yr-header-go-back-button"
          icon={<ArrowIcon direction="right" size={24} />}
          onClick={() => toggleCustomizer(false)}
        />
      ) : (
        <Logo />
      )}
      {params?.showThemeSwitch && (
        <Switch
          checked={theme === Theme.DARK}
          onChange={(checked: boolean) => toggleTheme(checked ? Theme.DARK : Theme.LIGHT)}
          label="Dark mode"
        />
      )}
      <h2 className={clsxWithSkeleton('yr-header-title')}>{product?.name}</h2>
      <div className="yr-header-cta-container">
        <Button variant="rounded" icon={<TryOnIcon size={18} />}>
          Try on
        </Button>
      </div>
    </header>
  );
}
