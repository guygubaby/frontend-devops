import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getVersion = () => {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')))
  return packageJson.version
}

const getTimeStamp = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}${month}${day}`
}

const generateTag = () => {
  const { GIT_COMMIT: sha } = process.env
  const tagList = [getVersion(), getTimeStamp(), (sha || 'noopnoop').substr(0, 8)]
  return tagList.join('-')
}

const saveTag = (tag) => {
  fs.writeFileSync(path.resolve(__dirname, './tag.txt'), tag, { encoding: 'utf8' })
}

const bootstrap = () => {
  const dockerTag = generateTag()
  saveTag(dockerTag)
}

try {
  bootstrap()
} catch (error) {
  console.log('pre build failed with: ', error)
  process.exit(-1)
}
