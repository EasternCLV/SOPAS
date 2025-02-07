# 🚀 GitLab CI/CD with pnpm & Nx

This repository uses **GitLab CI/CD** to automate builds, tests, and deployments with **pnpm** and **Nx**.

## 📂 Folder Structure

```
/project
│── .gitlab-ci.yml       # GitLab CI/CD pipeline configuration
│── pnpm-lock.yaml       # Lock file for pnpm dependencies
│── nx.json              # Nx workspace configuration
│── package.json         # Project dependencies
│── apps/                # Application modules
│── libs/                # Shared libraries
└── ...
```

## 🚀 GitLab CI/CD Workflow

### **1. For Dev branch**

This pipeline executes the following steps:

- **Install Dependencies** (using `pnpm` with a lockfile)
- **Run Nx Affected Commands** (for linting, testing, building, and E2E tests)
- **Cache Dependencies** (to speed up builds)

### \*_2. For feature/_ branch (Optional)\*

This pipeline executes the following steps:

- **Install Dependencies** (using `pnpm` with a lockfile)
- **Run Commands** (for linting, testing, building, and E2E tests)
- **Cache Dependencies** (to speed up builds)

### **2. CI/CD Configuration** (`.gitlab-ci.yml`)

- #### **2.1 CI/CD Configuration for Dev Branch** (`.gitlab-ci.yml`)

```yaml
stages:
  - lint
  - test
  - build

default:
  image: node:20-alpine
  before_script:
    - apk add --no-cache git # Install Git
    - corepack enable
    - cd backend
    - npm install
    - export NX_HEAD=$CI_COMMIT_SHA
    - export NX_BASE=${CI_MERGE_REQUEST_DIFF_BASE_SHA:-$CI_COMMIT_BEFORE_SHA}

variables:
  GIT_DEPTH: 0

cache:
  key:
    files:
      - package.json
  paths:
    - node_modules

.lint-test-build-template:
  interruptible: true
  only:
    - merge_requests
    - main
    - featues/*
  script:
    - npx nx affected --base=$NX_BASE --head=$NX_HEAD -t $NX_TASK

lint:
  extends: .lint-test-build-template
  stage: lint
  variables:
    NX_TASK: lint

test:
  extends: .lint-test-build-template
  stage: test
  variables:
    NX_TASK: test

build:
  extends: .lint-test-build-template
  stage: build
  variables:
    NX_TASK: build
```

- #### 2.2 CI/CD Configuration for Dev feature/\* Branch (`.gitlab-ci.yml`)

```yaml
stages:
  - lint
  - build
  - test

default:
  image: node:20-alpine
  before_script:
    - apk add --no-cache git # Install git
    - corepack enable
    - cd backend
    - npm install

workflow:
  auto_cancel:
    on_new_commit: conservative

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - /node_modules/

# Set default NX_BASE to "dev" if not provided
variables:
  NX_BASE: ${NX_BASE:-feature/*}
  TARGETS: ${all} # Define a variable for the targets all or gateway, userService,...

lint:
  stage: lint
  script:
    - |
      if [ "$TARGETS" == "all" ]; then
        npx nx run-many --target=lint --all
      else
        npx nx run-many --target=lint --projects=$TARGETS
      fi
  interruptible: true

build:
  stage: build
  script:
    - |
      if [ "$TARGETS" == "all" ]; then
        npx nx run-many --targets=build --all
      else
        npx nx run-many --targets=build --projects=$TARGETS
      fi

test:
  stage: test
  script:
    - |
      if [ "$TARGETS" == "all" ]; then
        npx nx run-many --target=test --all
      else
        npx nx run-many --target=test --projects=$TARGETS
      fi
  interruptible: true
```

### **3. Understanding CI/CD Commands**

| Command                                                            | Description                                                |
| ------------------------------------------------------------------ | ---------------------------------------------------------- |
| `pnpm install --frozen-lockfile`                                   | Ensures dependencies are installed as per `pnpm-lock.yaml` |
| `NX_HEAD=$CI_COMMIT_SHA`                                           | Sets the latest commit SHA                                 |
| `NX_BASE=${CI_MERGE_REQUEST_DIFF_BASE_SHA:-$CI_COMMIT_BEFORE_SHA}` | Determines the base commit for affected commands           |
| `npx nx affected -t lint test build`                               | Runs linting, tests, and builds only for affected projects |

## 📦 Caching Strategy

To speed up the pipeline, we cache dependencies:

- `package.json` ensures consistent dependency resolution.

## 🛠️ Troubleshooting

### **1. `npm ci` Error**

If you see an error related to `npm ci`:

- Ensure you are using `pnpm install --frozen-lockfile` instead.
- The `package-lock.json` is not needed for `pnpm`.

### **2. Cache Issues**

- If dependencies do not install properly, clear cache:
  ```sh
  gitlab-runner cache clear
  ```
- Ensure `.pnpm-store` is cached instead of `node_modules/`.

### **💡 Need Help?**

If you encounter any issues, please contact Project Manager to get more information 🚀
