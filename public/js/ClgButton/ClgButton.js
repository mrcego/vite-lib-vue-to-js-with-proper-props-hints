import { ref as u, computed as a, defineComponent as d, createElementBlock as v, openBlock as c, normalizeStyle as i, normalizeClass as m, unref as p, renderSlot as f, createTextVNode as g, toDisplayString as C } from "vue";
const k = () => {
  const t = u(""), o = (n) => {
    const [r, e, l] = n.split("-");
    t.value = `var(--color-${e}-${Number(l) + 100})`;
  };
  return { stylesOnHover: a(() => ({
    backgroundColor: t.value
  })), getHoverBackgroundColor: o };
}, B = /* @__PURE__ */ d({
  __name: "ClgButton",
  props: {
    text: {},
    color: { default: "bg-red-400" }
  },
  setup(t) {
    const o = u(!1), { stylesOnHover: s, getHoverBackgroundColor: n } = k();
    return n(t.color), (r, e) => (c(), v("button", {
      class: m(["rounded-md p-2 duration-300 text-white", [r.color]]),
      style: i(o.value ? p(s) : {}),
      onMouseenter: e[0] || (e[0] = (l) => o.value = !0),
      onMouseleave: e[1] || (e[1] = (l) => o.value = !1)
    }, [
      f(r.$slots, "default", {}, () => [
        g(C(r.text), 1)
      ])
    ], 38));
  }
});
export {
  B as default
};
