import { useCallback, useState } from 'react';
import { useHotkeys, HotkeysProvider } from 'react-hotkeys-hook';

// TODO: 有bug，暂时没精力去仔细研究了
export const UseHotKeyScope = () => {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const ScopeEditor = () => {
    // 在编辑模式下使用热键
    useHotkeys(
      'ctrl+s',
      (e) => {
        // e.preventDefault();
        if (isEditing) {
          setIsEditing(false);
          console.log('保存内容:', text);
        }
      },
      {
        enabled: isEditing, // 只在编辑模式下启用
        scopes: ['editor'],
      }
    );

    // 在非编辑模式下使用热键
    useHotkeys(
      'e',
      () => {
        if (!isEditing) {
          setIsEditing(true);
        }
      },
      {
        // NOTE: 可以通过enable来只允许单向控制
        enabled: !isEditing,
        scopes: ['viewer'],
      }
    );

    return (
      <div>
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="请输入内容，按 Ctrl+S 保存"
          />
        ) : (
          <div onClick={() => setIsEditing(true)}>
            {text || '点击编辑或按 E 键进入编辑模式'}
          </div>
        )}
      </div>
    );
  };

  return (
    <HotkeysProvider initiallyActiveScopes={['viewer']}>
      <ScopeEditor />
    </HotkeysProvider>
  );
};
