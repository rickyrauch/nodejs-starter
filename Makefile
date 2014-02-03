ifndef DEBUG
  DEBUG="njs*"
endif

ifndef NODE_ENV
  NODE_ENV="development"
endif

run: node_modules components build
	@echo "Booting application..."
	@NODE_PATH=lib DEBUG=$(DEBUG) node index.js

node_modules:
	@echo "Installing dependencies..."
	@npm install

components:
	@echo "Installing components..."
	@node ./bin/njs-install

build:
	@echo "Compiling components to ./public..."
	@node ./bin/njs-build

clean:
	@echo "Removing dependencies, components and built assets."
	@rm -rf components node_modules public
	@echo "Done.\n"

.PHONY: run build clean

