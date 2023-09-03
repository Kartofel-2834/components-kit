import { mount } from "@vue/test-utils";

// Types
import { VueWrapper } from "@vue/test-utils";

// Component
import JoSwitch from "@/components/jo-switch.vue";

/* <--------- Behavior ---------> */

describe("Behavior", () => {
  const joSwitch: VueWrapper = mount(JoSwitch);

  function getCurrentValue(): boolean {
    const input: HTMLInputElement | null = joSwitch.element.querySelector(
      "input[type='checkbox']"
    );

    return !!(input && input.checked);
  }

  test("Value toggles on click", async () => {
    const prevValue: boolean = getCurrentValue();

    await joSwitch.trigger("click");

    const currentValue: boolean = getCurrentValue();

    expect(prevValue === currentValue).toBeFalsy();
  });

  test("Value not toggles on click, when JoSwitch disabled", async () => {
    await joSwitch.setProps({
      disabled: true,
    });

    const prevValue: boolean = getCurrentValue();

    await joSwitch.trigger("click");

    const currentValue: boolean = getCurrentValue();

    expect(prevValue === currentValue).toBeTruthy();
  });
});

/* <--------- Styles ---------> */

describe("Styles", () => {
  const joSwitch: VueWrapper = mount(JoSwitch);

  function findClass(regex: RegExp): string | undefined {
    return joSwitch
      .classes()
      .find((className: string) => regex.test(className));
  }

  function checkIsActive(): boolean {
    const input: HTMLInputElement | null = joSwitch.element.querySelector(
      "input[type='checkbox']"
    );

    return !!(input?.checked && findClass(/.+_active$/));
  }

  test("JoSwitch must be active if value is truthy", async () => {
    await joSwitch.setProps({
      value: true,
    });

    const isActive = checkIsActive();

    expect(isActive).toBeTruthy();
  });

  test("JoCheckbox must be active if modelValue is truthy", async () => {
    await joSwitch.setProps({
      modelValue: true,
    });

    const isActive = checkIsActive();

    expect(isActive).toBeTruthy();
  });
});
