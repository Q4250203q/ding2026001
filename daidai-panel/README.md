# 呆呆面板部署指南

本目录包含在服务器/NAS 上部署 [呆呆面板（Daidai Panel）](https://github.com/linzixuanzz/daidai-panel) 的一键部署文件。

## 前置条件

- 一台 Linux 服务器 / NAS / 树莓派（1核 CPU、512MB 内存即可）
- 已安装 Docker 与 Docker Compose

## 一键部署

```bash
git clone https://github.com/Q4250203q/ding2026001.git
cd ding2026001/daidai-panel
docker compose up -d
```

## 访问初始化

部署完成后浏览器打开：

```
http://服务器IP:5700
```

首次访问会进入管理员初始化页面，设置账号密码后即可使用。

## 常用命令

```bash
docker compose ps          # 查看运行状态
docker compose logs -f     # 查看日志
docker compose down        # 停止并移除容器（数据保留在 ./Dumb-Panel）
docker compose pull && docker compose up -d   # 手动升级
```

## 数据备份

面板数据（脚本、环境变量、任务配置、数据库）全部保存在本目录的 `Dumb-Panel/` 文件夹中，
升级不会丢失；备份该文件夹即可完整迁移。

## 说明

- 呆呆面板为 Go + Vue3 + SQLite 的服务端应用，无法运行在 GitHub Pages（纯静态托管）上，
  需要独立的服务器环境；本仓库主页第四板块「面板专区」提供在线演示与快捷入口。
- 内置 Watchtower 自动更新（每小时检查）；如不需要自动更新可删除 compose 中的 `watchtower` 服务。
- Docker Hub 访问慢时，可设置环境变量 `DAIDAI_PANEL_IMAGE` 指向镜像加速地址。

更多用法见官方仓库：https://github.com/linzixuanzz/daidai-panel
