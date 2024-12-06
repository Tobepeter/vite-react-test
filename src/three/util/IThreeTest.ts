export interface IThreeTest {
  init(): void
  clear?(): void
  update?(delta: number): void
}
