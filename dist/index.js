"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementVersion = void 0;
const core = __importStar(require("@actions/core"));
function incrementVersion(input, increment = "patch", value = 1) {
    const [major, minor, patch] = input.split(".").map((v) => parseInt(v));
    let newVersion = "";
    switch (increment) {
        case "major":
            newVersion = `${major + value}.0.0`;
            break;
        case "minor":
            if (minor + value > 9) {
                newVersion = `${major + value}.0.0`;
            }
            else {
                newVersion = `${major}.${minor + value}.0`;
            }
            break;
        case "patch":
            if (patch + value > 9) {
                if (minor + value > 9) {
                    newVersion = `${major + value}.0.0`;
                }
                else {
                    newVersion = `${major}.${minor + value}.0`;
                }
            }
            else {
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
exports.incrementVersion = incrementVersion;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const input = core.getInput("input");
            const increment = core.getInput("increment");
            const value = core.getInput("value");
            const newVersion = incrementVersion(input, increment || undefined, value ? Number(value) : undefined);
            core.info(`Successfully incremented version to ${newVersion}`);
            core.setOutput("version", newVersion);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
