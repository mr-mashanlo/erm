import cssnano from 'cssnano';
import tailwindcss from '@tailwindcss/postcss';

export default {
  plugins: [
    tailwindcss(),
    cssnano()
  ]
};