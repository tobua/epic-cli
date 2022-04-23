<p align="center">
  <img src="https://github.com/tobua/epic-cli/raw/main/logo.png" alt="epic-cli">
</p>

# epic-cli

Useful commands for everyday Web Development.

## Installation

```
[sudo] npm install -g epic-cli
# or for one-time use
npx -p epic-cli -y update
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

Reinstalls node modules in current directory, first removing the lock file.

```
init [name]
```

Quickly initialize a new node project in the current folder using the parent folder as the default name. Alternative to `npm init`.

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
ios
```

Runs a React Native app in the iOS simulator as an iPhone 11 which uses significantly less resources compared to running the current version. Useful with Intel based Macs. Alias for `npx react-native run-ios --simulator="iPhone 11"`.
