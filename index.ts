import { stringify } from "@std/csv/stringify";
import { writeAll } from "@std/io/write-all";
import { exists } from "@std/fs/exists";
import { parseArgs } from "@std/cli/parse-args";
import { resolve } from "@std/path";

// Parse command line arguments
const args = parseArgs(Deno.args);
const folderPath = resolve(Deno.cwd(), args.folderPath || "./omnivore-export");
const exportFile = resolve(Deno.cwd(), args.exportFile || "./output.csv");

// Define the folder containing Markdown files
const highlightsFolderPath = `${folderPath}/highlights`;

/**
 * Function to read JSON files from a folder
 * @param {string} folderPath - Path to the folder containing JSON files
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of JSON data
 */
async function readJsonFiles(folderPath: string) {
  const jsonData = [];
  for await (const dirEntry of Deno.readDir(folderPath)) {
    if (dirEntry.isFile && dirEntry.name.endsWith(".json")) {
      const filePath = `${folderPath}/${dirEntry.name}`;
      const decoder = new TextDecoder("utf-8");
      const fileContent = await Deno.readFile(filePath);
      const data = JSON.parse(decoder.decode(fileContent));
      jsonData.push(...data);
    }
  }
  return jsonData;
}

/**
 * Function to read the content of a Markdown file
 * @param {string} slug - The slug of the Markdown file
 * @returns {Promise<string>} - Returns a promise that resolves to the content of the Markdown file
 */
async function readMarkdownFile(slug: string) {
  const filePath = `${highlightsFolderPath}/${slug}.md`;
  try {
    if (!await exists(filePath)) {
      return "";
    }

    const decoder = new TextDecoder("utf-8");
    const fileContent = await Deno.readFile(filePath);
    // If file is empty, return an empty string
    if (fileContent.byteLength === 0) {
      return "";
    }
    return decoder.decode(fileContent);
  } catch (error) {
    console.error(`Error reading Markdown file: ${filePath}`, error);
    return "";
  }
}

/**
 * Convert the markdown notes to highlights.
 * By converting every occurrence of the Markdown symbol '>' to 'Highlight:'
 * Lightdrop should pickup the highlights and display them in the highlights section.
 * @param {string} markdown - The markdown content
 * @returns {string} - The converted highlights content
 */
function convertMarkdownToHighlights(markdown: string) {
  return markdown.replace(/>/g, "Highlight:");
}

// Read JSON data from the folder
const jsonData = await readJsonFiles(folderPath);

// Convert JSON to CSV format
const csvData = [];
for (const item of jsonData) {
  const markdownContent = await readMarkdownFile(item.slug);
  csvData.push({
    folder: "Omnivore",
    url: item.url,
    title: item.title,
    excerpt: item.description,
    note: markdownContent,
    highlights: convertMarkdownToHighlights(markdownContent),
    tags: item.labels.join(", "),
    created: item.savedAt,
    cover: item.thumbnail,
  });
}

// Convert the data to CSV string
const csvString = await stringify(csvData, { columns: ["folder", "title", "excerpt", "note", "url", "tags", "created", "cover", "favorite", "highlights"] });

// Write the CSV string to a file
const encoder = new TextEncoder();
const contentBytes = encoder.encode(csvString);
const file = await Deno.open(exportFile, { write: true, create: true });
await writeAll(file, contentBytes);
file.close();

console.log(`CSV file has been written to ${exportFile}`);