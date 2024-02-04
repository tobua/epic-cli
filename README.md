<p align="center">
  <img src="https://github.com/tobua/epic-cli/raw/main/logo.png" alt="epic-cli">
</p>

# epic-cli

Useful commands for everyday Web Development.

## Installation with Node.js or Bun

```sh
[sudo] npm install -g epic-cli
# or for one-time use
npx -p epic-cli -y update
```

```sh
bun install -g epic-cli
bunx epic-cli update # One-time use
```

## Commands

After the installation the following commands can be used from anywhere within the terminal.

```
update
```

Update current package versions to their latest release.

```
refresh
```

Reinstalls node modules in current directory. Add `--lock` flag to also remove the `package-lock.json` file first.

```
init [name]
```

Quickly initialize a new node project in the current folder using the parent folder as the default name. Alternative to `npm init`.

```
secret
```

Stores and retreives `.env` variables for the current project from iCloud on macOS.

```
version
```

Check if node and npm are up-to-date.

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
