/**
 * Used for creating CHANGELOG.md automatically
 * Anything under the internalSection shouldn't concern the end user
 *
 * Check out the description of types: https://github.com/commitizen/conventional-commit-types/blob/master/index.json
 */

const internalSection = 'Internals';

module.exports = {
  types: [
    { type: 'feat', section: 'Features', hidden: false },
    { type: 'fix', section: 'Bug Fixes', hidden: false },
    { type: 'perf', section: 'Performance Updates', hidden: false },
    { type: 'docs', section: 'Documentation', hidden: false },
    // Other changes that don't modify source or test files
    { type: 'chore', section: internalSection, hidden: false },
    // Add missing or correcting existing test(s)
    { type: 'test', section: internalSection, hidden: false },
    // Changes to our CI configuration files and scripts
    { type: 'ci', section: internalSection, hidden: false },
    // A code change that neither fixes a bug nor adds a feature
    { type: 'refactor', section: internalSection, hidden: false },
    // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc...)
    { type: 'style', section: internalSection, hidden: false },
  ],
};
