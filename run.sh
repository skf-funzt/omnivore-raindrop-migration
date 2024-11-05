#!/bin/bash

unzip -o ./omnivore-export.zip -d ./omnivore-export

# Use Deno directly
deno run --allow-read --allow-write index.ts --folderPath=./omnivore-export --exportFile=./raindrop-import.csv

# Use a pre-compiled binary, e.g. Linux
# ./build/convert-omnivore-to-raindrop-linux --folderPath=./omnivore-export --exportFile=./raindrop.csv

rm -rf ./omnivore-export