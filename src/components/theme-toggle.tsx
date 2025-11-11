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
    <div className="flex items-center gap-4">
      <Button
        size="sm"
        variant="outline"
        className="w-8 h-8 p-1.5 flex items-center justify-center hover:scale-110 transition-transform"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label={isDark ? t('theme.toggle.light') : t('theme.toggle.dark')}
        title={isDark ? t('theme.toggle.light') : t('theme.toggle.dark')}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
    </div>
  );
}