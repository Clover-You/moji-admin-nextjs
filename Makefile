run:
	@make node_modules
	@pnpm dev

test:
	@make node_modules
	@pnpm test

node_modules: package.json
	@rm -rf $@ && pnpm install

clean:
	@rm -rf .next && echo "remove .next of next build"
	@rm -rf node_modules && echo "remove nodejs packages"
	@rm -rf out && echo "remove out of next build"

build:
	@make node_modules
	@pnpm build

.PHONY: clean run
