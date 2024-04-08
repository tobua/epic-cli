<p align="center">
  <img src="https://github.com/tobua/epic-cli/raw/main/logo.png" alt="epic-cli">
</p>

# epic-cli

Useful commands for everyday Web Development.

## Installation

```sh
bun install -g epic-cli
bunx epic-cli update # One-time use TODO doesn't work!
```

## Commands

After the installation the following commands can be used from anywhere within the terminal.

```
update
```

Update current package dependency versions. This will update all versions with ranges to the latest version. Exactly specified versions or dist tags will be ignored.

```
refresh
```

Reinstalls node_modules in current directory. Add `--lock` flag to also remove the `package-lock.json` file first.

```
init [name]
```

Quickly initialize a new project in the current folder using the parent folder as the default name.

```
secret
```

Stores and retreives `.env` variables for the current project from iCloud on macOS. Run `secret list` to show all currently stored secrets.

```
global
```

List and update globally installed packages.

```
format
```

Format `package.json` in current folder.

```
files
```

List nested files inside current folder in a tree structure.

```
workspaces "update"
```

Run an arbitrary command passed as the second argument in every workspace of the current project. Use the `--output` flag to show the output when running the command.
