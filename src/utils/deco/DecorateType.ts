export type DecorateInitInfo = {
  ins: InstanceType<any>
  name: string
  cls: Object
}

export type DecorateInitCb = (info: DecorateInitInfo) => void

export type DecorateOnSet = (val: any) => void
export type DecorateOnGet = () => any

export type DecorateWatch = (onSet?: DecorateOnSet, onGet?: DecorateOnGet) => PropertyDecorator

export type DecorateOnInit = (cb?: (info: DecorateInitInfo) => void) => ClassDecorator
