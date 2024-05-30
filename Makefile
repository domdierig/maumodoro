build-container:
	docker build -t maumodoro:latest .

remove-artifacts:
	rm -f maumodoro.tar

save-container:
	docker save maumodoro:latest > maumodoro.tar

build: remove-artifacts build-container save-container 