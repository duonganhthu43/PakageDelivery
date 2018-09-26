const _allTypes = {};
const EXTRA_VALUE = '$extra';
export default function JsonSerialize(target) {
    _allTypes[target.name] = target;
    function createInstane(args) {
        const c = function () {
            return target.apply(this, args);
        };
        c.prototype = target.prototype;
        return new c();
    }
    const proxy = function (...args) {
        const inst = createInstane(args);
        return _attachExtraInfo(inst, target.name, args);
    };
    proxy.prototype = target.prototype;
    return proxy;
}
function _attachExtraInfo(inst, className, constructArgs) {
    inst[EXTRA_VALUE] = {
        className: className,
        constructArgs: constructArgs
    };
    return inst;
}
function _deserialize(json, constructor) {
    if (json === null || json === undefined)
        return json;
    let inst = json;
    let constructorName = json.constructor && json.constructor.name;
    if (constructorName === 'Array') {
        inst = [];
        for (const e of json)
            inst.push(_deserialize(e, constructor));
    }
    else if (constructorName === 'Object') {
        if (constructor) {
            constructorName = '$constructor';
            inst = (typeof constructor === 'function' && constructor(json))
                || (constructor[constructorName] && constructor[constructorName](json)) || json;
        }
        else {
            const extra = json[EXTRA_VALUE];
            const type = extra && _allTypes[extra.className];
            inst = (type && new type(extra.constructArgs)) || json;
        }
        Object.keys(json).forEach(e => {
            const val = json[e];
            inst[e] = e === EXTRA_VALUE ? val :
                constructor && constructor[e] ? _deserialize(val, constructor[e]) :
                    !(val instanceof Object) || val instanceof Date ? val : _deserialize(val);
        });
    }
    return inst;
}
export class JsonHelper {
    static deserialize(value, constructor) {
        let constructorName = value && value.constructor && value.constructor.name;
        if (constructorName === 'String')
            value = JSON.parse(value);
        return _deserialize(value, constructor);
    }
    static isJsonSerialize(inst) {
        return inst && inst[EXTRA_VALUE] && _allTypes.hasOwnProperty(inst.constructor.name);
    }
}
//# sourceMappingURL=jsonHelper.js.map