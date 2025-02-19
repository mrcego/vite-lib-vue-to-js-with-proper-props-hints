import { ref as u, computed as a, defineComponent as d, createElementBlock as v, openBlock as i, normalizeStyle as c, normalizeClass as f, unref as p, renderSlot as m, createTextVNode as g, toDisplayString as C } from "vue";
const k = () => {
  const r = u(""), o = (n) => {
    const [t, e, l] = n.split("-");
    r.value = `var(--color-${e}-${Number(l) + 100})`;
  };
  return { stylesOnHover: a(() => ({
    backgroundColor: r.value
  })), getHoverBackgroundColor: o };
}, B = /* @__PURE__ */ d({
  __name: "ClgButton",
  props: {
    text: {},
    color: { default: "bg-red-400" },
    rounded: { default: "rounded-xs" }
  },
  setup(r) {
    const o = u(!1), { stylesOnHover: s, getHoverBackgroundColor: n } = k();
    return n(r.color), (t, e) => (i(), v("button", {
      class: f(["p-2 duration-300 text-white", [t.color, t.rounded]]),
      style: c(o.value ? p(s) : {}),
      onMouseenter: e[0] || (e[0] = (l) => o.value = !0),
      onMouseleave: e[1] || (e[1] = (l) => o.value = !1)
    }, [
      m(t.$slots, "default", {}, () => [
        g(C(t.text), 1)
      ])
    ], 38));
  }
});
export {
  B as default
};
