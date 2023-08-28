import { expect, test } from "@jest/globals";
import * as fs from "fs/promises";
import { incrementVersion } from "..";

test("should increment version", async () => {
	const input = await fs.readFile("src/tests/version");

	const newVersion = incrementVersion(input.toString(), "patch", "1");

	expect(newVersion).toBe("1.0.1");
});
