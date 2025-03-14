FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install additional OS packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    gnupg \
    lsb-release \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get -y install gh \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Set up non-root user
USER node

# Set up development environment
WORKDIR /workspace

# Install global packages
RUN npm install -g npm@latest 