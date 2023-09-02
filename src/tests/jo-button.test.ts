import { mount } from "@vue/test-utils";

// Component
import JoButton from "@/components/jo-button.vue";

describe("JoButton", () => {
  const wrapper = mount(JoButton);

  test("You can't click disabled jo-button", async () => {
    await wrapper.setProps({
      disabled: true,
    });

    await wrapper.trigger("click");

    const events = Object.keys(wrapper.emitted());

    expect(events).not.toContain("click");
  });
});
