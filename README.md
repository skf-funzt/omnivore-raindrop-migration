# Omnivore to Raindrop.io Migration Tool

This project provides tools to convert Omnivore ZIP/JSON exports into a CSV format that can be imported into Raindrop.io.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- Convert Omnivore JSON exports to Raindrop.io compatible CSV files.
- Supports multiple platforms: Linux, macOS, and Windows.
- Handles JSON files and extracts relevant data for Raindrop.io.

### What will be imported to Raindrop.io?

The script exports the following data from Omnivore JSON files to a CSV format that can be imported into Raindrop.io:

- **folder**: A static value "Omnivore" indicating the source folder.
- **url**: The URL of the Omnivore entry.
- **title**: The title of the Omnivore entry.
- **excerpt**: A short description or excerpt of the Omnivore entry.
- **note**: The content of the corresponding Markdown file.
- **highlights**: The content of the Markdown file with '>' symbols replaced by "Highlight:".
- **tags**: A comma-separated list of labels associated with the Omnivore entry.
- **created**: The date and time when the item was saved.
- **cover**: The URL of the thumbnail image for the Omnivore entry.

## Requirements

- [asdf](https://asdf-vm.com/) (optional)

- [Deno](https://deno.land/)

> Recommendation: Use the `asdf` [install](#installation) for this.

### Installation

1. Use `asdf` to install Deno:

    ```zsh
    asdf plugin-add deno
    asdf install
    ```

## Usage

### Get an Omnivore Export

1. **Export your Omnivore data:**

    - Go to the Omnivore web app [Account Export](https://omnivore.app/settings/account).
    - Click on the "Export" button.
    - Download the ZIP file once it finished.

### Using the Conversion Tool

1. **Unzip your Omnivore export:**

    ```zsh
    unzip ./omnivore-export.zip -d ./omnivore-export
    ```

2. **Run the conversion script:**

    ```zsh
    # Using Deno directly:
    deno run --allow-read --allow-write index.ts --folderPath=./omnivore-export --exportFile=./raindrop-import.csv

    # Using the pre-built executables, e.g. for Linux:
    ./build/convert-omnivore-to-raindrop-linux --folderPath=./omnivore-export --exportFile=./raindrop.csv
    ```

### Importing to Raindrop.io

1. **Import the CSV file to Raindrop.io:**

    - Go to the Raindrop.io web app using this [Import explanation](https://help.raindrop.io/import).
    - Select the CSV file you created.
    - Click on the "Import" button.

## Scripts

### `compile.sh`

This script compiles the TypeScript code into executables for different platforms.

### `run.sh`

This script unzips the Omnivore export and runs the conversion process.

### `index.ts`

The main script to read JSON files from the Omnivore export folder and convert them to the Raindrop.io CSV file.

## Folders

### `build`

Contains the compiled executables for different platforms.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
