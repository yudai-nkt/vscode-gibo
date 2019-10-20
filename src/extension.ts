// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const extName = 'vscode-gibo';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand(`${extName}.append-to-gitignore`, appendToGitignore));
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getBoilerplatesList(): string[] {
  const stdout = childProcess.execSync('gibo list').toString();
  return stdout.trim().split('\n');
}

async function dumpBoilerplates(): Promise<string | void> {
  const selected = await vscode.window.showQuickPick(getBoilerplatesList(), {placeHolder: 'Select boilerplate(s) to dump', canPickMany: true});
  if (selected === undefined) {
    return;
  } else if (selected.length === 0) {
    vscode.window.showErrorMessage('No boilderplates selected.');
    return;
  } else {
    const {stdout, stderr} = await util.promisify(childProcess.exec)(`gibo dump ${selected.join(' ')}`);
    if (stderr === '') {
      return stdout;
    } else {
      vscode.window.showErrorMessage(stderr);
    }
  }
}

async function appendToGitignore(): Promise<void> {
  const folders = vscode.workspace.workspaceFolders;
  let rootPath;
  if (folders === undefined) {
    vscode.window.showErrorMessage('No folders opened in your workspace.');
    return;
  } else if (folders.length === 1) {
    rootPath = folders[0].uri.fsPath;
  } else {
    const selected = await vscode.window.showWorkspaceFolderPick({placeHolder: 'Select workspace folder to create a .gitignore in'});
    if (selected === undefined) {
      return;
    } else {
      rootPath = selected.uri.fsPath;
    }
  }
  const content = await dumpBoilerplates();
  if (content !== undefined) {
    fs.promises.appendFile(path.join(rootPath, '.gitignore'), content);
  }
  return;
}
