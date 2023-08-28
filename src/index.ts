import * as core from "@actions/core";

export function incrementVersion(
	input: string,
	increment: string = "patch",
	value: string = "1"
) {
	const [major, minor, patch] = input.split(".").map((v) => Number(v));
	const valueToIncrement = Number.isNaN(Number(value)) ? 1 : Number(value);

	core.info(`Current version is ${major}.${minor}.${patch}`);

	let newVersion = "";

	switch (increment) {
		case "major":
			newVersion = `${major + valueToIncrement}.0.0`;
			break;
		case "minor":
			if (minor + valueToIncrement > 9) {
				newVersion = `${major + valueToIncrement}.0.0`;
			} else {
				newVersion = `${major}.${minor + valueToIncrement}.0`;
			}
			break;
		case "patch":
			if (patch + valueToIncrement > 9) {
				if (minor + valueToIncrement > 9) {
					newVersion = `${major + valueToIncrement}.0.0`;
				} else {
					newVersion = `${major}.${minor + valueToIncrement}.0`;
				}
			} else {
				newVersion = `${major}.${minor}.${patch + valueToIncrement}`;
			}
			break;
		case "value":
			newVersion = valueToIncrement.toString();
			break;
		default:
			throw new Error("Invalid increment type");
	}

	return newVersion;
}

async function run() {
	try {
		const input = core.getInput("input");
		const increment = core.getInput("increment");
		const value = core.getInput("value");

		const newVersion = incrementVersion(input, increment || undefined, value);

		core.info(`Successfully incremented version to ${newVersion}`);

		core.setOutput("version", newVersion);
	} catch (error) {
		core.setFailed((error as Error).message);
	}
}

run();
