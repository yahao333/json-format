import ThemeToggle from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div></div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
}