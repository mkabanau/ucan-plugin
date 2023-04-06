# CI CD Template
goals of this project are next
1. helps to setup typescript jest npm project
2. configure ci/cd to build and publish npm packages
3. configure linters (remote,local)
4. configure tests (remote, local)
5. help to configure local enviroment to access npm gitlab registry
6. configure build platforms(ex:netlify) to access npm gitlab registry

There are at least 2 types of projects:
1. libraries/components imported by other projects. this projects should just be pushed to npm registry.
2. apps delivered to clients. this projects should be distributed via servers(ex:cdn, nginx server).


## Configurateion
[original gitlab intstuctions][1]

> Warning: all tokens are revoked with account. so for ci/cd it is better to use account which belongs to owner and hiden behind protected environment variables. pipeline artifacts also should be protected so passwords are not leacked
## Register (Personal Access Token) for local development
[follow original gitlab intstructions for more info][2]

short:
1. In the top-right corner, select your avatar.
2. Select Edit profile.
3. On the left sidebar, select Access Tokens.
4. Enter a name and optional expiry date for the token.
5. Select the desired scopes.
6. Select Create personal access token.

scope:
1. api

exapmple of token:

read_npm_repository = glpat-21KhqRkmNPwQ7YBChFE3

import GITLAB_PAT=read_npm_repository
> Note: taken already revoked and required only for exapmple of format

configure .npmrc as in .npmrc-exmples

check that package can be accessed
```
npm install @pixie-wallet/ucan-plugin@latest
```
## CI/CD for package builds
[follow original gitlab intstructions for more info][3]

If you’re using npm with GitLab CI/CD, a CI job token can be used instead of a personal access token or deploy token. The token inherits the permissions of the user that generates the pipeline.

## commit prefixes for semantic release

<type>(<scope>): <short summary>

types:
1. fix - patch  0.0.1
2. feat - minor 0.1.0
3. perf - major 1.0.0

scope is component which was modified with current commit

short summary is description of change
## local gitlab runner for macos

```
docker volume create gitlab-runner-config
docker run -d --name gitlab-runner --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v gitlab-runner-config:/etc/gitlab-runner \
    gitlab/gitlab-runner:latest

```

```

test3
-----------------------
[1]: https://docs.gitlab.com/ee/user/packages/npm_registry/
[2]: https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html
[3]: https://docs.gitlab.com/ee/user/packages/npm_registry/#authenticate-with-a-ci-job-token
[4]: https://github.com/semantic-release/semantic-release
