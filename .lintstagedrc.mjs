import path from 'node:path'
import process from 'node:process'

const buildEslintCommand = createCommand('eslint --fix ', '')

function createCommand(prefix, join) {
  return (filenames) =>
    `${prefix} ${filenames.map((f) => path.relative(process.cwd(), f)).join(` ${join} `)}`
}

export default {
  '*.{js,jsx,ts,tsx,vue}': [buildEslintCommand],
}
