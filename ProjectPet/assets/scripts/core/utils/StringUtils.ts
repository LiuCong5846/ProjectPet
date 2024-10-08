

export default class StringUtils {
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    public static trimSpace(str: string): string {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    }

    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    public static getStringLength(str: string): number {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }

    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    public static isChinese(str: string): boolean {
        var reg = /^.*[\u4E00-\u9FA5]+.*$/;
        return reg.test(str);
    }

    /**
     * 格式化字符串 "{0},{1}.format("text0","text1")
     */
    public static format(val: string, ...param: any[]): string {
        for (let i = 0, len = param.length; i < len; i++) {
            let reg = new RegExp("({)" + i + "(})", "g");
            val = val.replace(reg, param[i]);
        }
        return val;
    }
}