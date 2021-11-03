import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import appRoot from 'app-root-path'

const tryMkdirSync = (dir) => {
  if (!fs.existsSync(dir))
    fs.mkdirSync(dir)
}

const copy = (src, dest) => {
  const stat = fs.statSync(src)
  if (stat.isDirectory())
    // eslint-disable-next-line no-use-before-define
    copyDir(src, dest)
  else
    fs.copyFileSync(src, dest)
}

const copyDir = (srcDir, destDir) => {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url))

const bootstrap = () => {
  const appPath = appRoot.path

  const rawPath = path.resolve(__dirname, './raw')
  const targetPath = path.resolve(appPath, 'devops')

  tryMkdirSync(targetPath)
  copyDir(rawPath, targetPath)
  copy(__dirname, appPath)
}

try {
  bootstrap()
}
catch (error) {
  console.log('devops util error: ', error)
  process.exit(-1)
}
