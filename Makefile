ifndef DEBUG
  DEBUG="njs*"
endif

ifndef NODE_ENV
  NODE_ENV="development"
endif

run: install
	@echo "Booting application..."
	@NODE_PATH=. DEBUG=$(DEBUG) node index.js

install:
	@echo "Installing dependencies..."
	@npm install

clean:
	@echo "Removing dependencies, components and built assets."
	@rm -rf components node_modules public
	@echo "Done.\n"

.PHONY: run clean
