import { useTheme, useParams, useIsMobile } from '@/state/ui';

import { Logo } from '@/components/logo';
import { Switch } from '@/components/switch';
import { MenuIcon } from '@/components/Icons';

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