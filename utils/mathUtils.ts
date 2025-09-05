import Decimal from "decimal.js";

type NValue = number | string | null | undefined;

class MathUtils {
  private static safeValue(value: NValue) {
    if (value === undefined || value === null) {
      return new Decimal(0);
    }
    const num = new Decimal(value);
    if (num.isNaN()) {
      return new Decimal(0);
    }
    return num;
  }

  static add(a: NValue, b: NValue) {
    return this.safeValue(a).plus(this.safeValue(b));
  }

  static sub(a: NValue, b: NValue) {
    return this.safeValue(a).minus(this.safeValue(b));
  }

  static mul(a: NValue, b: NValue) {
    return this.safeValue(a).times(this.safeValue(b));
  }

  static div(a: NValue, b: NValue) {
    return this.safeValue(a).div(this.safeValue(b));
  }

  static trans(a: NValue) {
    return this.safeValue(a).toFixed(2);
  }
}

export default MathUtils;
