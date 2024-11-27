import { useHotkeys } from 'react-hotkeys-hook';

export const UseHotKeyArgs = () => {
  // DOC: https://react-hotkeys-hook.vercel.app/docs/api/use-hotkeys
  useEffect(() => {
    useHotkeys('*', () => alert('All keys pressed'));
    useHotkeys('ctrl+s, shift+w', () => alert('ctrl+s or shift+w pressed'));
    useHotkeys('f5', () => alert('f5 pressed'));
    useHotkeys('w, a, s, d', () => alert('Player moved!'));
    useHotkeys('ctrl+a, shift+b, r, f', (_, handler) => {
      switch (handler.keys.join('')) {
        case 'a':
          alert('You pressed ctrl+a!');
          break;
        case 'b':
          alert('You pressed shift+b!');
          break;
        case 'r':
          alert('You pressed r!');
          break;
        case 'f':
          alert('You pressed f!');
          break;
      }
    });
  }, []);

  return <div>UseHotKeyArgs</div>;
};
