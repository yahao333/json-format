'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export default function ThemeToggle() {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // To prevent hydration mismatch, we render a placeholder on the server.
    // This also prevents layout shift.
    return <div className="w-8 h-8" />;
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? t('theme.toggle.light') : t('theme.toggle.dark')}
      style={{ boxSizing: 'border-box', width: '36px', height: '36px' }}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
}