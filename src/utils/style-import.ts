import { App } from 'vue'
import { ElIcon, ElLoading, ElCard, ElButton } from 'element-plus'

/**
 *Element Plus
 * Vite https://github.com/element-plus/vite-plugin-element-plus
 * @param app {App}
 */
export default function styleImport(app: App) {
  ;[ElButton, ElCard, ElLoading, ElIcon].forEach((v) => {
    app.use(v)
  })
  return app
}
