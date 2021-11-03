# An opinionated frontend devops util

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/devops?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/devops)

## Get Started

```bash
pnpm i @bryce-loskie/devops -D
```

## Misc

After install will generate `devops` folder and `.dockerignore` in your project working dir

## About deployment

```bash
dockerTag='docker-registory/name:tag'

docker build -t $dockerTag -f devops/Dockerfile .
docker run -d --restart unless-stopped -p [port]:80 --name [container-name] $dockerTag
```

## License

[MIT](./LICENSE) License © 2021 [guygubaby](https://github.com/guygubaby)