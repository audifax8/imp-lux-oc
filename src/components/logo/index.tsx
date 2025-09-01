import { useTheme } from '@/state/ui';

import { Theme } from '@/declarations/enums';

import { RemixLogoBlack } from '@/components/logo/RemixLogoBlack';
import { RemixLogoWhite } from '@/components/logo/RemixLogoWhite';

export function Logo() {
  const [theme] = useTheme();
  return <span className="yr-logo">{theme === Theme.DARK ? <RemixLogoWhite /> : <RemixLogoBlack />}</span>;
}
