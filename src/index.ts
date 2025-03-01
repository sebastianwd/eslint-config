import { base } from './flat-base'
import { react } from './flat-react'

interface Configs {
  base: typeof base
  react: typeof react
}

export default {
  configs: {
    base,
    react,
  },
} as const as {
  configs: Configs
}
