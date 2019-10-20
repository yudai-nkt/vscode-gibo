# `vscode-gibo` extension
gibo interface for Visual Studio Code.

<!-- TODO: put demo here. -->

## Overview
[gibo][] is a command line tool that helps you create .gitignore files by populating [GitHub's gitignore templates][github/gitignore].
`vscode-gibo` enables you to use gibo from within Visual Studio Code.

## Prerequisites
gibo of version 2.2 or later needs to be installed.

## Installation
This extension has not been published on Visual Studio Marketplace yet.
You need to manually clone the repository, and package the VSIX format to install this extension.

## Usage
Invoke 'Create or append to .gitignore' from the command palette, and then select boilerplate(s) you want to use.
If you have multiple folders in your workspace, you will be asked to select in which folder you want to create a .gitignore before boilerplate selection. 

## Contribution
Contributions are highly welcome. Feel free to report an [issue][] or submit a [pull request][].
 
## License
This package is distributed under the MIT License.
See [LICENSE.md](./LICENSE.md) for details.

[gibo]: https://github.com/simonwhitaker/gibo
[github/gitignore]: https://github.com/github/gitignore
[issue]: https://github.com/yudai-nkt/vscode-gibo/issues
[pull request]: https://github.com/yudai-nkt/vscode-gibo/pulls
