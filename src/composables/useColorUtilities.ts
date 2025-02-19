import { computed, ref } from 'vue';

const useColorUtilities = () => {
  const hoverBackgroundColor = ref('');

  const getHoverBackgroundColor = (color: string) => {
    const [_, tint, tone] = color.split('-');

    hoverBackgroundColor.value = `var(--color-${tint}-${Number(tone) + 100})`;
  };

  const stylesOnHover = computed(() => {
    return {
      backgroundColor: hoverBackgroundColor.value
    };
  });

  return { stylesOnHover, getHoverBackgroundColor };
};

export default useColorUtilities;
