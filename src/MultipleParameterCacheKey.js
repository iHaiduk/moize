// @flow

/**
 * @private
 *
 * @class MultipleParameterCacheKey
 *
 * @classdesc
 * cache key used when there are multiple standard parameters
 */
class MultipleParameterCacheKey {
  constructor(key: Array<any>) {
    this.key = key;
    this.size = key.length;

    return this;
  }

  isMultiParamKey: boolean = true;
  key: any = null;
  size: number = 0;

  /**
   * @function matches
   * @memberof MultipleParameterCacheKey
   * @instance
   *
   * @description
   * does the passed key match the key in the instance
   *
   * @param {Array<*>} key the key to test
   * @param {boolean} isMultiParamKey is the key a multi-parameter key
   * @returns {boolean} does the key passed match that in the instance
   */
  matches(key: Array<any>, isMultiParamKey: boolean): boolean {
    if (!isMultiParamKey || key.length !== this.size) {
      return false;
    }

    let index: number = 0;

    while (index < this.size) {
      if (key[index] !== this.key[index]) {
        return false;
      }

      index++;
    }

    return true;
  }

  /**
   * @function matchesCustom
   * @memberof SingleParameterCacheKey
   * @instance
   *
   * @description
   * does the passed key match the key in the instance based on the custom equality function passed
   *
   * @param {Array<*>} key the key to test
   * @param {boolean} isMultiParamKey is the key a multi-parameter key
   * @param {function} isEqual method to compare equality of the keys
   * @returns {boolean} does the key passed match that in the instance
   */
  matchesCustom(key: Array<any>, isMultiParamKey: boolean, isEqual: Function): boolean {
    return isMultiParamKey && isEqual(key, this.key);
  }
}

export default MultipleParameterCacheKey;
