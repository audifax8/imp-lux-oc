import { useTheme } from '@/state/ui';

import { Theme } from '@/declarations/enums';

import { RemixLogoBlack } from '@/components2/logo//RemixLogoBlack';
import { RemixLogoWhite } from '@/components2/logo/RemixLogoWhite';

export function Logo() {
  const [theme] = useTheme();
  return <span className="yr-logo">{theme === Theme.DARK ? <RemixLogoWhite /> : <RemixLogoBlack />}</span>;
}
