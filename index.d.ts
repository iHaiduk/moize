interface Config {
    isPromise?: boolean; // is the result a promise
    isReact?: boolean; // is the method a functional React component
    maxAge?: number; // amount of time in milliseconds before the cache will expire
    maxArgs?: number; // maximum number of arguments to use as key for caching
    maxSize?: number; // maximum size of cache for this method
    serialize?: boolean; // should the parameters be serialized instead of directly referenced
    serializeFunctions?: boolean; // should functions be included in the serialization of multiple parameters
    promiseLibrary?: PromiseLibrary<any>; // provide a promise library to be used and override default
    serializer?: (...args: any[]) => any; // provide a serializer and override default
}

interface PromiseLibrary<T> {
    (callback: (resolve: (r?: T | PromiseLike<T>) => void, reject: (e?: any) => void) => void): PromiseLike<T>;
    reject: (err: Error) => any;
    resolve: (v: T) => any;
}

type Fn = (...args: any[]) => any;

type Moizer<T extends Fn> = (t: T) => T;

function moize<T extends Fn>(c: Config): ((t: T) => T);
function moize<T extends Fn>(t: T, c?: Config): T;

namespace moize {
    function maxAge<T extends Fn>(a: number): (t: T) => T;
    function maxArgs<T extends Fn>(a: number): (t: T) => T;
    function maxSize<T extends Fn>(a: number): (t: T) => T;
    function promise<T extends Fn>(t: T): T;
    function react<T extends Fn>(t: T): T;
    function reactSimple<T extends Fn>(t: T): T;
    function serialize<T extends Fn>(t: T): T;
    function simple<T extends Fn>(t: T): T;

    function compose<T extends Fn>(...fns: Array<Moizer<T>>): Moizer<T>;
}

export default moize;
