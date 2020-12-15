const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
		'jest/globals': true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		ecmaVersion: 2018,
		experimentalObjectRestSpread: true,
		jsx: true,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
		'react',
		'jest',
		'jsx-a11y',
		'import'
	],
	settings: {
		'import/extensions': [
			'.js',
			'.jsx',
			'.css'
		],
		'react': {
			'version': 'detect'
		}
	},
	rules: {
		'indent': [ERROR, 'tab', {
			'SwitchCase': 1
		}],
		'semi': [ERROR, 'never'],
		'brace-style': [ERROR, '1tbs', {
			allowSingleLine: true
		}],
		'object-curly-spacing': [ERROR, 'always'], 
		'array-bracket-spacing': [ERROR, 'never'], 
		'space-before-blocks': [ERROR, 'always'],
		'class-methods-use-this': OFF,
		'comma-dangle': [ERROR, 'never'],
		'jest/no-disabled-tests': ERROR,
		'jest/no-focused-tests': ERROR,
		'jest/no-identical-title': ERROR,
		'jest/prefer-to-have-length': ERROR,
		'jest/valid-expect': ERROR,
		'jsx-a11y/anchor-is-valid': [ERROR, {
			components: ['Link'],
			specialLink: ['to'],
			aspects: ['noHref', 'invalidHref', 'preferButton']
		}],
		'function-paren-newline': OFF,
		'import/extensions': [ERROR, 'never', {
			'css': 'ignorePackages',
			'svg': 'ignorePackages',
			'jpg': 'ignorePackages',
			'png': 'ignorePackages',
			'gif': 'ignorePackages',
			'json': 'always'
		}],
		'no-unused-expressions': [ERROR, {
			allowShortCircuit: false,
			allowTernary: false
		}],
		'no-unused-vars': OFF,
		'object-curly-newline': OFF,
		'quotes': [ERROR, 'single', {
			allowTemplateLiterals: true
		}],
		'react/jsx-curly-spacing': [ERROR, 'always', {
			spacing: { objectLiterals: 'never' }
		}],
		'react/no-redundant-should-component-update': ERROR,
		'react/prop-types': OFF,
		'react/no-typos': ERROR,
		'react/prefer-stateless-function': OFF,
		'react/react-in-jsx-scope': OFF,
		'eol-last': [ERROR, 'always'],
		'@typescript-eslint/explicit-module-boundary-types': OFF,
		'@typescript-eslint/ban-ts-comment': OFF
	}
}
