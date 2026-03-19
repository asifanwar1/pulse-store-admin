import { objectContainsKey } from "@/utils/common.utils";

type KeyType = string | number;
type ObjectType = Record<KeyType, unknown>;

const getDisplayTextKey = function (
    this: { displayTextKeys: ObjectType },
    value: KeyType,
): string {
    const objHasKey = objectContainsKey(this.displayTextKeys, value);
    if (objHasKey) {
        return String(this.displayTextKeys[value]);
    }
    return "";
};

const getLabelClass = function (
    this: { labelClasses: ObjectType },
    value: KeyType,
): string {
    const objHasKey = objectContainsKey(this.labelClasses, value);
    if (objHasKey) {
        return String(this.labelClasses[value]);
    }
    return "";
};

const injectBaseConstantMethods = function <T extends object>(
    constantsObj: T,
    displayTextKeysObject: ObjectType,
    labelClassObject: ObjectType,
): T & {
    getDisplayTextKey: (value: KeyType) => string;
    getLabelClass: (value: KeyType) => string;
} {
    Object.defineProperties(constantsObj, {
        getDisplayTextKey: {
            configurable: false,
            enumerable: false,
            value: getDisplayTextKey,
            writable: false,
        },
        displayTextKeys: {
            configurable: false,
            enumerable: false,
            value: displayTextKeysObject,
            writable: false,
        },
        labelClasses: {
            configurable: false,
            enumerable: false,
            value: labelClassObject,
            writable: false,
        },
        getLabelClass: {
            configurable: false,
            enumerable: false,
            value: getLabelClass,
            writable: false,
        },
    });

    return constantsObj as T & {
        getDisplayTextKey: (value: KeyType) => string;
        getLabelClass: (value: KeyType) => string;
    };
};

export { injectBaseConstantMethods };
