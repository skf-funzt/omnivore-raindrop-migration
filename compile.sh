#!/bin/bash

# Create a build folder
mkdir -p build

# Compile for Windows
deno compile \
  --allow-read \
  --allow-write \
  --target x86_64-pc-windows-msvc \
  -o ./build/convert-omnivore-to-raindrop.exe \
  index.ts

# Compile for macOS
deno compile \
  --allow-read \
  --allow-write \
  --target x86_64-apple-darwin \
  -o ./build/convert-omnivore-to-raindrop-macos \
  index.ts

# Compile for Linux
deno compile \
  --allow-read \
  --allow-write \
  --target x86_64-unknown-linux-gnu \
  -o ./build/convert-omnivore-to-raindrop-linux \
  index.ts