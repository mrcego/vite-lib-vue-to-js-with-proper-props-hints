import { defineComponent as t, createElementBlock as o, openBlock as l } from "vue";
const n = ["value"], r = /* @__PURE__ */ t({
  __name: "ClgTextField",
  props: {
    value: { default: "" }
  },
  setup(u) {
    return (e, a) => (l(), o("input", {
      type: "text",
      value: e.value,
      class: "outline-1 outline-blue-400 focus:outline-2 rounded-sm p-1 duration-75"
    }, null, 8, n));
  }
});
export {
  r as default
};
