.PHONY: start-server start-services

start-server:
	symfony server:start --port=8055 -d

stop-server:
	symfony server:stop

start-services:
	docker compose up -d

stop-services:
	docker compose down

test-mailer:
	symfony console mailer:test test@example.com
