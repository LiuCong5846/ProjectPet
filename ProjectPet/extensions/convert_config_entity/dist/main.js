"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const ConvertConfigUtil_1 = __importDefault(require("./ConvertConfigUtil"));
const fs = require('fs');
const path = require('path');
module.paths.push(path.join(Editor.App.path, 'node_module'));
const saveFile = (fullContent, className, endCallBack) => {
    const savePath = path.join(Editor.Project.path, `assets/scripts/config/${className}.ts`);
    fs.writeFileSync(savePath, fullContent, { encoding: 'utf8' });
    console.log(`${className} saved`);
    endCallBack && endCallBack();
};
// const writeGotoUtil = (fileName: any, fullPath: any, endCallBack: () => void) => {
//     const utf8Data = fs.readFileSync(fullPath, 'utf8');
//     const jsonData = JSON.parse(utf8Data);
//     const tmpArr: any[] = [];
//     for (let tmpKey in jsonData) {
//         tmpArr.push(jsonData[tmpKey]);
//     }
//     if (tmpArr.length <= 0) {
//         console.log(`***writeGotoUtil-${fileName} is null***`)
//         return;
//     }
//     const title = `/**自动生成${ConvertConfigUtil.GotoUtilClassName}代码 不要手动更改*/`;
//     const note = `
// /*
// 说明：
// 1.Goto.json method 字段说明：
//     文件路径，类名，函数名
// 2.类文件放在asset/scripts/ui下
// 3.类必须声明为default
// 4.类必须是单例 命名规范：Instance
// 5.跳转函数必须是public型
// eg:
// export default class 类名 {
//     public static get Instance（单例）
//     public 函数() {
//         // 跳转逻辑
//     }
// }
// import 类名 from '../ui下路径(不包含类文件名)/类名'
// 类名.单例.函数([参数表]);
// 如有参数方面的处理，可在GotoController.onGotoMethod方法里处理
// */
//     `
//     let importContent = "";
//     let caseContent = "";
//     const importMap: Map<string, any> = new Map();
//     for (let tmpId in tmpArr) {
//         const config = tmpArr[tmpId];
//         const method = config[ConvertConfigUtil.GotoMethodFieldName] as string;
//         if (!method || method === "") {
//             continue;
//         }
//         const methodCfgs = method.split(",");
//         // 防止重复import
//         if (!importMap.has(methodCfgs[1])) {
//             importContent += `import ${methodCfgs[1]} from "../${methodCfgs[0]}/${methodCfgs[1]}"\n`;
//             importMap.set(methodCfgs[1], 1);
//         }
//         caseContent += `
//             case ${config[ConvertConfigUtil.GotoIdFieldName]}:
//                 // @ts-ignore
//                 ${methodCfgs[1]}.Instance.${methodCfgs[2]}(...args);
//                 break;`;
//     }
//     const fullContent = `${importContent}
// ${note}
// ${title}
// export default class ${ConvertConfigUtil.GotoUtilClassName} {
//     public static onGotoMethod(gotoId: number, ...args: any) {
//         switch (gotoId) {${caseContent}
//         }
//     }
// }
// ${title}
//     `
//     const savePath = path.join(Editor.Project.path, `assets/scripts/ui/${ConvertConfigUtil.GotoUtilFileName}/${ConvertConfigUtil.GotoUtilClassName}.ts`);
//     fs.writeFileSync(savePath, fullContent, {encoding: 'utf-8'});
//     console.log(`${ConvertConfigUtil.GotoUtilClassName} saved`);
//     endCallBack && endCallBack();
// }
const writeFile = (fileName, fullPath, endCallBack) => {
    const utf8Data = fs.readFileSync(fullPath, 'utf8');
    const jsonData = JSON.parse(utf8Data);
    const tmpArr = [];
    for (let tmpKey in jsonData) {
        tmpArr.push(jsonData[tmpKey]);
    }
    if (tmpArr.length <= 0) {
        console.log(`***writeFile-${fileName} is null***`);
        return;
    }
    const className = `${fileName.slice(0, 1).toUpperCase()}${fileName.slice(1)}Entity`;
    const interfaceName = `I${fileName.slice(0, 1).toUpperCase()}${fileName.slice(1)}Entity`;
    const title = `/**自动生成${fileName}代码*/\r\n\n`;
    const note = "// 可根据情况自定义或继承使用";
    let classContent = "";
    let interfaceContent = "";
    for (let property in tmpArr[0]) {
        classContent += `   public ${property}: ${typeof tmpArr[0][property]};\n`;
        interfaceContent += `   ${property}?: ${typeof tmpArr[0][property]};\n`;
    }
    const fullContent = `${title}export default class ${className} {\n${classContent}}\r\n\n${note}\r\nexport interface ${interfaceName} {\n${interfaceContent}}`;
    saveFile(fullContent, className, endCallBack);
};
const readFiles = (files, filePath) => {
    const jsonFiles = files.filter((file) => path.extname(file) === ".json");
    jsonFiles.forEach((file, idx) => {
        console.log(`${idx + 1}/${jsonFiles.length} ${file}`);
        const fullPath = `${filePath}/${file}`;
        fs.stat(fullPath, (err, data) => {
            if (err) {
                console.error(`[ERROR_readFiles:]${err}`);
                return;
            }
            if (data.isFile()) {
                const fileName = file.replace(".json", "");
                if (ConvertConfigUtil_1.default.IgnoreTemplate.indexOf(fileName) == -1) {
                    writeFile(fileName, fullPath, () => {
                        if (idx >= jsonFiles.length - 1) {
                            console.log("全部生成结束");
                        }
                    });
                }
                else {
                    console.log(`***ignore ${fileName}***`);
                }
            }
        });
    });
};
const readTemples = () => {
    let filePath = path.join(Editor.Project.path, 'assets/configs/json');
    fs.readdir(filePath, (err, files) => {
        if (err) {
            console.error(`[ERROR_readTemples:]${err}`);
            return;
        }
        readFiles(files, filePath);
    });
};
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    openPanel() {
        Editor.Panel.open('convert_config_entity.main_panel');
    },
    createConfigEntitys() {
        console.log("开始");
        readTemples();
    },
    createConfigEntity(value) {
        (async () => {
            const isUuid = Editor.Utils.UUID.isUUID(value);
            if (isUuid) {
                let uuid = Editor.Utils.UUID.decompressUUID(value);
                const assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', uuid);
                if (assetInfo) {
                    const fileName = assetInfo.name.replace(".json", "");
                    const fullPath = path.join(Editor.Project.path, assetInfo.url.replace('db://', '/'));
                    if (ConvertConfigUtil_1.default.IgnoreTemplate.indexOf(fileName) == -1) {
                        writeFile(fileName, fullPath, () => {
                            console.log(`${assetInfo.name}生成结束`);
                        });
                    }
                    else {
                        console.log(`***ignore ${fileName}***`);
                    }
                    // if (fileName === ConvertConfigUtil.GotoTemplateName) {
                    //     writeGotoUtil(fileName, fullPath, () => {
                    //         console.log(`${assetInfo.name}辅助文件生成结束`);
                    //     });
                    // }
                }
            }
        })();
    }
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
function load() { }
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
function unload() { }
exports.unload = unload;
