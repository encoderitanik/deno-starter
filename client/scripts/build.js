const { exec } = require('child_process')

const build = async () => {
	await exec('yarn build')

	const args = process.argv.slice(2)

	if (args.includes('--clean')) {
		exec('rm -rf ../public/*')
	}

	exec(`cp -rf ./dist/* ../public`)
}

build()