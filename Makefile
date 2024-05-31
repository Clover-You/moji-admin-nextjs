run:
	@make node_modules
	@pnpm dev

node_modules: package.json
	@rm -rf $@ && pnpm install

clean:
	@rm -rf .next && echo "remove .next of next build"
	@rm -rf node_modules && echo "remove nodejs packages"
	@rm -rf out && echo "remove out of next build"

.PHONY: clean run
