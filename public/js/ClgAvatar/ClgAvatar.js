import { ref as u, computed as a, defineComponent as i, createElementBlock as c, openBlock as v, normalizeStyle as d, normalizeClass as f, unref as m, toDisplayString as p } from "vue";
const g = () => {
  const t = u(""), o = (r) => {
    const [n, e, l] = r.split("-");
    t.value = `var(--color-${e}-${Number(l) + 100})`;
  };
  return { stylesOnHover: a(() => ({
    backgroundColor: t.value
  })), getHoverBackgroundColor: o };
}, y = /* @__PURE__ */ i({
  __name: "ClgAvatar",
  props: {
    src: {},
    initials: {},
    color: { default: "bg-blue-300" }
  },
  setup(t) {
    const o = u(!1), { stylesOnHover: s, getHoverBackgroundColor: r } = g();
    return r(t.color), (n, e) => (v(), c("div", {
      class: f(["flex rounded-full size-12 text-white items-center justify-center duration-300 cursor-default", [n.color]]),
      style: d(o.value ? m(s) : {}),
      onMouseenter: e[0] || (e[0] = (l) => o.value = !0),
      onMouseleave: e[1] || (e[1] = (l) => o.value = !1)
    }, p(n.initials), 39));
  }
});
export {
  y as default
};
