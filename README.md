<p align="center">
  <img src="https://github.com/tobua/epic-cli/raw/main/logo.png" alt="epic-cli">
</p>

# epic-cli

Useful commands for everyday Web Development.

## Usage or Global Installation

```sh
bunx epic-cli update # One time usage to run any script.
bunx epic-cli@latest update # Avoid using cached version.
```

For repeated usage it's best to install the package globally and use shortcut aliases.

```sh
bunx epic-cli verify # Verify which script aliases are free before installation.
bun install -g epic-cli
update # Directly run any script.
bun update -g epic-cli # Update globally installed version.
```

## Commands

After the installation the following commands can be used from anywhere within the terminal.

```
update
```

Update current package dependency versions. This will update all versions with ranges to the latest version. Exactly specified versions or dist tags will be ignored. Add the `--no-install` flag to avoid updating node modules.

```
refresh
```

Reinstalls node_modules in current directory. Add `--lock` flag to also remove the `bun.lockb` file first.

```sh
run
```

Lists currently available scripts and allows multi-selection of scripts to run.

```sh
commit
```

To be used before committing, runs "check", "types" and "test" scripts if available and lists success or failure.

```sh
types
```

Check TypeScript using `tsc`. Will list number of files checked, add `--files` to list all relative files except ones from node modules.

```
init [name]
```

Quickly initialize a new project in the current folder using the parent folder as the default name.

```
secret
```

Stores and retreives `.env` variables for the current project from iCloud on macOS. Add the `--list` flag to show all currently stored secrets.

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

```
folders "./template/*" "update --no-install"
```

Run an arbitrary command passed as the third argument in every folder matched by the glob passed as the second argument. Use the `--output` flag to show the output when running the command.
