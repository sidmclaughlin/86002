const fs = require('fs');
const path = require('path');

// Create scopes array based on workspace folders
const scopes = [];
const workspaces = fs.readdirSync(__dirname).filter(f => f.endsWith('.code-workspace'));
if (workspaces.length === 0) throw new Error('Could not find .code-workspace');

const workspace = fs.readFileSync(path.join(__dirname, workspaces[0]), 'utf-8');
const json = JSON.parse(workspace);
scopes.push(...json.folders.filter(f => !f.name.startsWith('-')).map(f => f.name.replace('@', '').replace('/', ':')));

// Use types from .versionrc.js for consistency
const commitTypes = require('./.versionrc.js').types.map(t => t.type);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', scopes],
    'type-enum': [2, 'always', commitTypes],
  },
};
