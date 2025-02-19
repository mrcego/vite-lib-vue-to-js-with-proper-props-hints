import { defineComponent as r, createElementBlock as t, openBlock as o, Fragment as s, renderList as d, toDisplayString as p } from "vue";
const i = ["placeholder", "value"], m = ["value"], _ = /* @__PURE__ */ r({
  __name: "ClgSelect",
  props: {
    modelValue: { default: "" },
    placeholder: { default: "Seleccione..." },
    items: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(c, { emit: u }) {
    const n = u;
    return (l, a) => (o(), t("select", {
      class: "outline-1 outline-blue-400 focus:outline-2 rounded-sm p-1 duration-75 w-1/2",
      type: "select",
      placeholder: l.placeholder,
      value: l.modelValue,
      onChange: a[0] || (a[0] = (e) => n("update:modelValue", e.target.value))
    }, [
      (o(!0), t(s, null, d(l.items, (e) => (o(), t("option", {
        value: e.value
      }, p(e.label), 9, m))), 256))
    ], 40, i));
  }
});
export {
  _ as default
};
