const _allTypes = {}
const EXTRA_VALUE = '$extra'

export default function JsonSerialize(target: any) {
    _allTypes[target.name] = target

    function createInstane(args) {
        const c: any = function () {
            return target.apply(this, args)
        }
        c.prototype = target.prototype
        return new c()
    }

    const proxy: any = function (...args) {
        const inst = createInstane(args)
        return _attachExtraInfo(inst, target.name, args)
    }

    proxy.prototype = target.prototype
    return proxy
}

function _attachExtraInfo(inst, className, constructArgs) {
    inst[EXTRA_VALUE] = {
        className: className,
        constructArgs: constructArgs
    }
    return inst
}

export interface IDeserializeInfo {
    $constructor: (json?: any) => any
    [property: string]: ((json?: any) => any) | IDeserializeInfo
}

function _deserialize(json: any, constructor?: (() => any) | IDeserializeInfo): any {
    if (json === null || json === undefined)
        return json

    let inst = json
    let constructorName = json.constructor && json.constructor.name
    if (constructorName === 'Array') {
        inst = []
        for (const e of json)
            inst.push(_deserialize(e, constructor))
    } else if (constructorName === 'Object') {
        if (constructor) {
            constructorName = '$constructor'
            inst = (typeof constructor === 'function' && (<any>constructor)(json))
                || (constructor[constructorName] && constructor[constructorName](json)) || json
        } else {
            const extra = json[EXTRA_VALUE]
            const type = extra && _allTypes[extra.className]
            inst = (type && new type(extra.constructArgs)) || json
        }

        Object.keys(json).forEach(e => {
            const val = json[e]
            inst[e] = e === EXTRA_VALUE ? val :
                constructor && constructor[e] ? _deserialize(val, constructor[e]) :
                    !(val instanceof Object) || val instanceof Date ? val : _deserialize(val)
        })
    }

    return inst
}

export class JsonHelper {
    public static deserialize(value: any, constructor?: (() => any) | IDeserializeInfo): any {
        let constructorName = value && value.constructor && value.constructor.name
        if (constructorName === 'String')
            value = JSON.parse(value)

        return _deserialize(value, constructor)
    }

    public static isJsonSerialize(inst: any): boolean {
        return inst && inst[EXTRA_VALUE] && _allTypes.hasOwnProperty(inst.constructor.name)
    }
}