# 🚀 GitLab Runner Setup in Docker

This repository contains a script to easily set up a GitLab Runner inside a Docker container. The runner will be connected to Docker for executing CI/CD jobs.

## Prerequisites

Before you begin, make sure you have the following:

- Docker installed on your system.
- Full access to [http://gitlab.cyberlogitec.com.vn](http://gitlab.cyberlogitec.com.vn) via VPN.
- Permission to create and register a runner on your local machine.

## Quick Start

**Step 1: Pull the GitLab Runner Docker Image**

```bash
docker pull gitlab/gitlab-runner:latest
```

**Step 3: Create and Run the GitLab Runner Container**

```bash
 docker run -d --name gitlab-runner --restart always \
   -v /srv/gitlab-runner/config:/etc/gitlab-runner \
   -v /var/run/docker.sock:/var/run/docker.sock \
   --dns 10.0.0.253 --dns 10.0.0.247 \
   gitlab/gitlab-runner:latest
```

- Explanation of flags:
- `--name gitlab-runner`: Sets the container name to gitlab-runner
- `--restart always`:Ensures that the container automatically restarts in case of failure or system reboot.
- `-v /srv/gitlab-runner/config:/etc/gitlab-runner`: Mounts the `/srv/gitlab-runner/config` directory on the host to `/etc/gitlab-runner` inside the container, so that the GitLab Runner configuration persists.
- `-v /var/run/docker.sock:/var/run/docker.sock`: This is required if you want to use Docker-in-Docker, allowing the GitLab Runner to run Docker commands inside the CI/CD jobs.
- `-dns 10.0.0.253 --dns 10.0.0.247`: Configures the DNS servers had access to gitlab company for the container.

**Step 4: Register the GitLab Runner**

Once the GitLab Runner container is running, you need to register the runner with your GitLab instance.

Get your GitLab registration token:

- Go to your GitLab instance.
- Navigate to Settings > CI / CD.
- Under the Runners section, click Expand
- choose create `New Project Runner`.
- gitlab provide url and token to access with runner in local machine

**Step 5: Register the GitLab Runner**

Go to Exec tab in docker. run copy gitlab config setup in tab exec.

Set up default.

`Now you can run pipelines` with instand in your docker laptop

## 🛠️ Troubleshooting

### **1. Can't connect to gitlab companny when run pipelines**

- contact to IT to having fully access to gitlab company

## **💡 Need Help?**

If you encounter any issues, please contact Project Manager to get more information 🚀
