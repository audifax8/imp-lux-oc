import { useTheme, useParams, useIsMobile } from '@/state/ui';

import { Logo } from '@/components2/logo';
import { Switch } from '@/components2/switch';
import { MenuIcon } from '@/components2/Icons';

import { Theme } from '@/declarations/enums';

import './index.scss';

export function RBNHeader() {
  const [isMobile] = useIsMobile();
  const [params] = useParams();
  const [theme, toggleTheme] = useTheme();
  return (
    <header className='yr-rbn-header'>
      <Logo />
      {params?.showThemeSwitch && (
        <Switch
          checked={theme === Theme.DARK}
          onChange={(checked: boolean) => toggleTheme(checked ? Theme.DARK : Theme.LIGHT)}
          label='Dark mode'
        />
      )}
      {isMobile && <span className='yr-menu-icon'>{<MenuIcon size={18}/>}</span>}
    </header>
  );
}