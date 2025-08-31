.PHONY: help build serve clean install debug benchmark build-ghpages serve-ghpages dev all

help: ## Show this help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

build: install ## Build the site for production
	npm run build

serve: install ## Start local development server with live reload
	npm run start

dev: serve ## Alias for serve

clean: ## Remove build artifacts and cache
	rm -rf _site
	rm -rf node_modules/.cache

debug: install ## Run in debug mode with verbose output
	npm run debug

debugstart: install ## Start debug server with live reload
	npm run debugstart

benchmark: install ## Run performance benchmarks
	npm run benchmark

build-ghpages: install ## Build for GitHub Pages deployment
	npm run build-ghpages

serve-ghpages: install ## Serve with GitHub Pages path prefix
	npm run start-ghpages

all: install build ## Install dependencies and build

watch: serve ## Alias for serve (common make convention)