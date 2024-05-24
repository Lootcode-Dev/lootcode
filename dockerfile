# Use a minimal base image
FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    python3 \
    openjdk-17-jdk \
    gcc \
    g++ \
    bash \
    golang-go \
    mono-complete \
    rustc \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m appuser

# Switch to the non-root user
USER appuser

# Set the working directory
WORKDIR /app

# Set the entry point to a shell
ENTRYPOINT ["/bin/bash"]