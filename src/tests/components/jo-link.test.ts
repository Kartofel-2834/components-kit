import { mount } from "@vue/test-utils";

// Types
import { VueWrapper } from "@vue/test-utils";

// Component
import JoLink from "@/components/jo-link.vue";

/* <--------- Behavior ---------> */

describe("Behavior", () => {
  test("If href not provided link element must be button", () => {
    const link: VueWrapper = mount(JoLink);

    expect(link.element instanceof HTMLButtonElement).toBeTruthy();
  });
});

/* <--------- Styles ---------> */

describe("Styles", () => {
  const link: VueWrapper = mount(JoLink);

  function findClass(regex: RegExp): string | undefined {
    return link.classes().find((className: string) => regex.test(className));
  }

  test("User can hide JoLink underline", async () => {
    await link.setProps({ withoutLine: true });

    expect(findClass(/.+_without-line$/)).toBeTruthy();
  });
});
