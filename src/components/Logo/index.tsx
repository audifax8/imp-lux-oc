import { useTheme } from '../../state/ui';
import { RemixLogoBlack } from './RemixLogoBlack';
import { RemixLogoWhite } from './RemixLogoWhite';
import { Theme } from '../../declarations/enums';

export function Logo() {
  const [theme] = useTheme();
  return <span className="yr-logo">{theme === Theme.DARK ? <RemixLogoWhite /> : <RemixLogoBlack />}</span>;
}
