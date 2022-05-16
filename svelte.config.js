import preprocess from 'svelte-preprocess'
import inlineSvg from 'rollup-plugin-inline-svg'
import adapter from '@sveltejs/adapter-node'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true,
    scss: true,
    sourceMap: true
  }),

  kit: {
    adapter: adapter({ out: 'build' }),
    vite: {
      define: {
        global: 'globalThis'
      },
      resolve: {
        alias: {
          $assets: path.resolve('./src/assets'),
          $variables: path.resolve('./src/variables.ts'),
          $components: path.resolve('./src/components'),
          $icons: path.resolve('./src/components/icons'),
          $nav: path.resolve('./src/components/nav'),
          $grid: path.resolve('./src/components/grid'),
          $typography: path.resolve('./src/components/typography'),
          $footer: path.resolve('./src/components/footer'),
          $helpers: path.resolve('./src/helpers'),
          $zilpay: path.resolve('./src/zilpay'),
          $store: path.resolve('./src/store'),
          $apis: path.resolve('./src/apis'),
          $lib: path.resolve('./src/lib')
        }
      },
      plugins: [
        inlineSvg({
          removeTags: false,
          removingTags: ['title', 'desc', 'defs', 'style'],
          warnTags: [],
          removeSVGTagAttrs: true,
          removingTagAttrs: [],
          warnTagAttrs: []
        })
      ]
    }
  }
}

export default config
