import './chrome-mod.css'

/**
 * 测试在chrome source面板直接修改css
 * @desc 从element面板找过去的，好像并不能生效，因为vite使用的是hmr的css
 * @desc 但是是可以直接搜素文件去进行修改的
 *
 * TODO：不知道有没有css sourcemap之类的能够让chrome跳转过去
 */
export const ChromeModCSS = () => {
  return <div id='chrome-mod-css'>ChromeModCSS</div>
}
