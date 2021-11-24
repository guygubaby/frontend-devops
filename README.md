# An opinionated frontend devops util

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/devops?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/devops)

## Get Started

```bash
pnpm i @bryce-loskie/devops -D
```

## Misc

After install will generate `devops` and `scripts` folder and `.dockerignore` in your project working dir

## About deployment

1. Add script in `package.json`

```json
{
  "sciprts": {
    "prebuild": "node scripts/pre-build.mjs"
  }
}
```

2. **Optional** If you use `pnpm` as package manager, create `.pnpmrc` and add flowing key into it.

```.npmrc
enable-pre-post-scripts=true
```

3. CI/CD pipline

```bash
set -e

npx pnpm i && npx pnpm build
dockerTag=$(cat scripts/tag.txt)
dockerImage=docker-registory/docker-image-name:${dockerTag}
docker build -t $dockerImage -f devops/Dockerfile .
docker push $dockerImage
```

## License

[MIT](./LICENSE) License © 2021 [guygubaby](https://github.com/guygubaby)
