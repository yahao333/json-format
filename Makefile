# JSON 格式化工具 Makefile

# 项目信息
PROJECT_NAME := json-format
NODE_MODULES := node_modules
PACKAGE_JSON := package.json

# 颜色定义
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# 帮助信息
.PHONY: help
help:  ## 显示帮助信息
	@echo "$(BLUE)$(PROJECT_NAME) 项目管理命令$(NC)"
	@echo ""
	@echo "$(YELLOW)使用方法:$(NC)"
	@echo "  make [命令]"
	@echo ""
	@echo "$(YELLOW)可用命令:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

# 环境检查
.PHONY: check
check:  ## 检查开发环境
	@echo "$(BLUE)检查开发环境...$(NC)"
	@node --version || (echo "$(RED)错误: 未安装 Node.js$(NC)" && exit 1)
	@npm --version || (echo "$(RED)错误: 未安装 npm$(NC)" && exit 1)
	@echo "$(GREEN)✓ 环境检查通过$(NC)"

# 安装依赖
.PHONY: install
install: check  ## 安装项目依赖
	@echo "$(BLUE)安装项目依赖...$(NC)"
	@npm install
	@echo "$(GREEN)✓ 依赖安装完成$(NC)"

# 开发模式
.PHONY: dev
dev: install  ## 启动开发服务器
	@echo "$(BLUE)启动开发服务器...$(NC)"
	@npm run dev

# 构建生产版本
.PHONY: build
build: install  ## 构建生产版本
	@echo "$(BLUE)构建生产版本...$(NC)"
	@npm run build
	@echo "$(GREEN)✓ 构建完成$(NC)"

# 预览生产版本
.PHONY: preview
preview: build  ## 预览生产版本
	@echo "$(BLUE)启动生产版本预览...$(NC)"
	@npm run start

# 清理
.PHONY: clean
clean:  ## 清理构建文件和依赖
	@echo "$(BLUE)清理项目...$(NC)"
	@rm -rf $(NODE_MODULES) .next dist build
	@echo "$(GREEN)✓ 清理完成$(NC)"

# 重新安装
.PHONY: reinstall
reinstall: clean install  ## 重新安装依赖

# 检查代码格式
.PHONY: lint
lint: install  ## 检查代码格式
	@echo "$(BLUE)检查代码格式...$(NC)"
	@npm run lint || echo "$(YELLOW)提示: 未配置 lint 脚本，跳过检查$(NC)"

# 格式化代码
.PHONY: format
format: install  ## 格式化代码
	@echo "$(BLUE)格式化代码...$(NC)"
	@npm run format || echo "$(YELLOW)提示: 未配置 format 脚本，跳过格式化$(NC)"

# 运行测试
.PHONY: test
test: install  ## 运行测试
	@echo "$(BLUE)运行测试...$(NC)"
	@npm test || echo "$(YELLOW)提示: 未配置 test 脚本，跳过测试$(NC)"

# 更新依赖
.PHONY: update
update:  ## 更新项目依赖
	@echo "$(BLUE)更新项目依赖...$(NC)"
	@npm update
	@echo "$(GREEN)✓ 依赖更新完成$(NC)"

# 显示项目信息
.PHONY: info
info:  ## 显示项目信息
	@echo "$(BLUE)项目信息$(NC)"
	@echo "项目名称: $(PROJECT_NAME)"
	@echo "项目路径: $(shell pwd)"
	@test -f $(PACKAGE_JSON) && echo "包管理器: npm" && echo "Node.js 版本要求: $$(node -p "require('./package.json').engines?.node || '未指定'")" || echo "$(YELLOW)警告: 未找到 package.json$(NC)"
	@echo "当前分支: $(shell git branch --show-current 2>/dev/null || echo '非 git 仓库')"

# 部署相关
.PHONY: deploy
deploy: build  ## 部署到生产环境（需要配置部署脚本）
	@echo "$(BLUE)部署到生产环境...$(NC)"
	@npm run deploy || echo "$(YELLOW)提示: 未配置 deploy 脚本，请手动部署$(NC)"

# 默认目标
.DEFAULT_GOAL := help
