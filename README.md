# Sistema de Processos

Sistema simples de cadastro de processos e andamentos com Node.js + MySQL + React, usando Docker.

# Pré-requisitos

Antes de rodar o projeto, instale:

## Git

Windows:https://git-scm.com/downloads

Mac: já vem com o Xcode Command Line Tools, ou Git for Mac

Linux (Ubuntu/Debian):

```bash
sudo apt update
```

```bash

sudo apt install git -y

```

## Docker

**Windows:**
Download Docker Desktop: https://www.docker.com/products/docker-desktop/

**Mac:**

Baixar Docker Desktop via Homebrew
```bash
brew install --cask docker
```
Ou baixar manualmente
Download Docker Desktop: https://www.docker.com/products/docker-desktop


**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

# Docker Compose

**Windows / Mac:** já vem junto com Docker Desktop

**Linux:**
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

```bash
docker-compose --version
```

# Rodando o projeto

Clone o projeto:
```bash
git clone https://github.com/rafaelmr59-oss/sistema-processos.git

```

```bash
cd sistema-processos
```

Subir todos os containers:
```bash
docker-compose up --build -d
```

Conferir se os containers estão rodando:
```bash
docker ps
```

**Portas:**
- Backend → porta 3000
- Frontend → porta 8080
- MySQL → porta 3301 (externa) / 3306 (interna)

**Acessar no navegador:**
- Frontend: http://localhost:8080
- Backend (teste rápido): http://localhost:3000