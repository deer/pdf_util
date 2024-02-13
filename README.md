# PDF Util

PDF Util is a command-line utility built with Deno for managing PDF files. It
allows users to merge multiple PDF files into a single document, with options
for selecting specific pages from each PDF.

This is mostly a practice project to explore [Cliffy](https://cliffy.io/). Its
scope might increase if I end up using it.

## Features

- Merge multiple PDF files into one.
- Select specific pages to include in the merge.

## Installation

```bash
deno install --allow-read --allow-write https://raw.githubusercontent.com/deer/pdf_util/main/src/pdf_utiil.ts
```

## Installation from Source

Ensure you have [Deno](https://deno.land/) installed on your system. To install
PDF Util, clone the repository to your local machine:

```bash
git clone https://github.com/deer/pdf_util.git
cd pdf_util
deno install --allow-read --allow-write src/pdf_util.ts
```

## Change Installed Name

You can use `-n yourDesiredName` to change the name of the executable, if you
don't want to type `pdf_util merge ...` all the time.

Personally, I have it installed like
`deno install --allow-read --allow-write src/pdf_util.ts -n pdf` so that I can
run `pdf merge ...`.

## Usage

### Merging PDFs

To merge PDF files, run:

```bash
deno run --allow-read --allow-write src/pdf_util.ts merge -o output.pdf -f A.pdf:1-2 B.pdf:3
```

This command merges pages 1-2 from `A.pdf` and page 3 from `B.pdf` into a single
PDF named `output.pdf`.

### Arguments and Options

- `-o, --output <output:string>`: Output filename for the merged PDF. Defaults
  to `merged.pdf` if not specified.
- `-f, --files <filesAndPages...:string>`: The PDF files to merge with optional
  page ranges in brackets, e.g., `A.pdf[1-2]`. Specify multiple files by
  separating them with a space.

## Contributing

Contributions to PDF Util are welcome! Here are a few ways you can help:

- Report bugs and request features by opening issues.
- Submit pull requests with bug fixes and feature implementations.

Before submitting a pull request, please ensure your code follows the project's
coding standards and includes unit tests for new features or bug fixes.

## License

PDF Util is released under the MIT License. See the LICENSE file for more
information.
