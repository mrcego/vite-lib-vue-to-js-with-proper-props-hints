import { defineComponent as n, createElementBlock as a, openBlock as p } from "vue";
const d = ["value", "type"], s = /* @__PURE__ */ n({
  __name: "ClgField",
  props: {
    modelValue: { default: "" },
    type: { default: "text" },
    placeholder: {}
  },
  emits: ["update:modelValue"],
  setup(m, { emit: l }) {
    const o = l;
    return (e, t) => (p(), a("input", {
      value: e.modelValue,
      onInput: t[0] || (t[0] = (u) => o("update:modelValue", u.target.value)),
      type: e.type,
      class: "outline-1 outline-blue-400 focus:outline-2 rounded-sm p-1 duration-75"
    }, null, 40, d));
  }
});
export {
  s as default
};
