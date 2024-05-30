build-container:
	docker build -t maumodoro:latest .

remove-artifacts:
	rm -f maumodoro.tar

save-container:
	docker save maumodoro:latest > maumodoro.tar

prune-images:
	docker image prune -f

build: remove-artifacts build-container prune-images save-container 