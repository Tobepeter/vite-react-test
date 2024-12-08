import { PixiDomConfig } from './dom/PixiDomUtil'
import { PixiInputConfig } from './PixiInput'

export interface ITest {
  init(): void
  clear?(): void
  config?: ITestConfig
  update?(delta: number): void
}

export type ITestConfig = {
  dom?: PixiDomConfig
  input?: PixiInputConfig
}
