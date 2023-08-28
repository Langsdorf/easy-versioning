import * as core from "@actions/core";

export function incrementVersion(
	input: string,
	increment: string = "patch",
	value: number = 1
) {
	const [major, minor, patch] = input.split(".").map((v) => parseInt(v));

	let newVersion = "";

	switch (increment) {
		case "major":
			newVersion = `${major + value}.0.0`;
			break;
		case "minor":
			if (minor + value > 9) {
				newVersion = `${major + value}.0.0`;
			} else {
				newVersion = `${major}.${minor + value}.0`;
			}
			break;
		case "patch":
			if (patch + value > 9) {
				if (minor + value > 9) {
					newVersion = `${major + value}.0.0`;
				} else {
					newVersion = `${major}.${minor + value}.0`;
				}
			} else {
				newVersion = `${major}.${minor}.${patch + value}`;
			}
			break;
		case "value":
			newVersion = value.toString();
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

		const newVersion = incrementVersion(
			input,
			increment || undefined,
			value ? Number(value) : undefined
		);

		core.info(`Successfully incremented version to ${newVersion}`);

		core.setOutput("version", newVersion);
	} catch (error) {
		core.setFailed((error as Error).message);
	}
}

run();
