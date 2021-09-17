import dedent from "dedent";
import { join, dirname } from "path";
import { writeFileSync } from "fs";
import { createRequire } from "module";
import config from "config-get-fresh";

const { log, error: consoleError } = console;

const die = (...args) => {
  consoleError(...args);
  process.exit(1);
};

setInterval(async () => {
  const timeout = config.get(`timeout`);
  console.log({ timeout });
}, 1_000);

setInterval(() => {
  const newTimeout = Math.floor(Math.random() * 100);
  const localYamlPath = join(`config`, `local.yaml`);
  const localYamlContent = dedent`
    timeout: ${newTimeout}
  `;
  writeFileSync(localYamlPath, localYamlContent);
  console.log({ newTimeout });
}, 3_000);

setTimeout(process.exit, 50_000, 0);
