#!/usr/bin/env node
import { execSync } from 'child_process'

execSync('npx react-native run-ios --simulator="iPhone 11"', { stdio: 'inherit' })
