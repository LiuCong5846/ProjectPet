#!/usr/bin/env node
"use strict";
const { execSync } = require('child_process');
const { rmSync, mkdirSync, existsSync, readFileSync, writeFileSync } = require('fs');
const { join, resolve } = require('path');

function debugLog(message) {
    console.log(`[DEBUG] ${message}`);
}

function errorLog(message) {
    console.error(`[ERROR] ${message}`);
}

function validateArg(arg, name) {
    if (typeof arg === 'undefined') {
        errorLog(`Need to specify the ${name}`);
        process.exit(1);
    }
    return resolve(arg);
}

const protoPath = validateArg(process.argv[2], 'proto file directory path');
debugLog(`protoPath: ${protoPath}`);

const pbJsOutPath = validateArg(process.argv[3], 'pb javascript file out directory path');
debugLog(`pbJsOutPath: ${pbJsOutPath}`);

const pbTsOutPath = validateArg(process.argv[4], 'pb typescript file out directory path');
debugLog(`pbTsOutPath: ${pbTsOutPath}`);

const pbBaseName = process.argv[5];
if (typeof pbBaseName === 'undefined') {
    errorLog('Need to specify the pb file base name');
    process.exit(1);
}
debugLog(`pbBaseName: ${pbBaseName}`);

function ensureDirectoryExists(path) {
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
        debugLog(`Created directory: ${path}`);
    }
}

function executeCommand(cmd) {
    try {
        debugLog(`Executing command: ${cmd}`);
        execSync(cmd, { stdio: 'inherit' });
    } catch (err) {
        errorLog(`Failed to execute command: ${cmd}`);
        console.error(err.message);
        process.exit(1);
    }
}

function correctEsModule(path) {
    let content = readFileSync(path, 'utf8');
    content = content
        .replace(`const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});`, "const $root = {};")
        .replace(/\$protobuf\./g, "$protobuf.default.");

    const extraContent = [
        `import Long from 'long';`,
        `$protobuf.default.util.Long = Long;`,
        `$protobuf.default.configure();`
    ];

    const lines = content.split(/\r?\n/);
    lines.splice(2, 0, ...extraContent);
    writeFileSync(path, lines.join('\r\n'), 'utf8');
    debugLog(`Corrected ES module and added Long import to ${path}`);
}

function generateEsModuleConfig(path) {
    const config = { "type": "module" };
    writeFileSync(path, JSON.stringify(config, null, 4), 'utf8');
    debugLog(`Generated ES module config at ${path}`);
}

ensureDirectoryExists(pbJsOutPath);
ensureDirectoryExists(pbTsOutPath);

const outJsFilepath = join(pbJsOutPath, `${pbBaseName}.js`);
const outTsFilepath = join(pbTsOutPath, `${pbBaseName}.d.ts`);
const protoFilepath = join(protoPath, "Player.proto");

debugLog(`Proto File Path: ${protoFilepath}`);
debugLog(`Output JS File Path: ${outJsFilepath}`);
debugLog(`Output TS File Path: ${outTsFilepath}`);

const pbjsCmd = `pbjs -t static-module -w es6 --es6 --out ${outJsFilepath} ${protoFilepath}`;
const pbtsCmd = `pbts --out ${outTsFilepath} ${outJsFilepath}`;

console.time("build js");
executeCommand(pbjsCmd);
console.timeEnd("build js");

console.time("build ts");
executeCommand(pbtsCmd);
console.timeEnd("build ts");

console.time("es module correct");
correctEsModule(outJsFilepath);
console.timeEnd("es module correct");

console.time("es module config");
generateEsModuleConfig(join(pbJsOutPath, "package.json"));
console.timeEnd("es module config");
