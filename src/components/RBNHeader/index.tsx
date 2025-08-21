import { useTheme, useParams, useIsMobile } from '@/state/ui';

import { Logo } from '@/components/Logo';
import { Switch } from '@/components/Switch';
import { MenuIcon } from '@/components/Icons';

import { Theme } from '@/declarations/enums';

import './index.scss';

export function RBNHeader() {
  const [isMobile] = useIsMobile();
  const [params] = useParams();
  const [theme, toggleTheme] = useTheme();
  return (
    <header className='yr-header'>
      <Logo />
      {params?.showThemeSwitch && (
        <Switch
          checked={theme === Theme.DARK}
          onChange={(checked: boolean) => toggleTheme(checked ? Theme.DARK : Theme.LIGHT)}
          label='Dark mode'
        />
      )}
      {isMobile && <span className='yr-menu'>{<MenuIcon size={18}/>}</span>}
    </header>
  );
}