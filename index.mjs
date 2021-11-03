import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import appRoot from 'app-root-path'

const tryMkdirSync = (dir) => {
  if (!fs.existsSync(dir))
    fs.mkdirSync(dir, { recursive: true })
}

const copyFile = (src, dest) => {
  const existed = fs.existsSync(dest)
  if(existed) return
  fs.copyFileSync(src, dest)
}

const copyDir = (srcDir, destDir) => {
  tryMkdirSync(destDir)
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copyFile(srcFile, destFile)
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const bootstrap = () => {
  const appPath = appRoot.path

  const appname = appPath.split('/').pop()
  if(appname==='frontend-devops') return

  const dockerignorePath = path.resolve(__dirname, 'dockerignore')
  const rawPath = path.resolve(__dirname, './raw')
  
  const targetPath = path.resolve(appPath, 'devops')
  const dockerignoreTargetPath = path.resolve(appPath, '.dockerignore')

  tryMkdirSync(targetPath)

  copyDir(rawPath, targetPath)
  copyFile(dockerignorePath, dockerignoreTargetPath)
}

try {
  bootstrap()
}
catch (error) {
  console.log('devops util error: ', error)
  process.exit(-1)
}
