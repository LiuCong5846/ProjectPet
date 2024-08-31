export default class StringUtil {
    /** 123456789 = 123,456,789 */
    public static numberTotPermil(num: number): string {
        return num.toLocaleString();
    }

    /** 12345 = 12.35K */
    public static numberToThousand(value: number, fixed: number = 2): string {
        var k = 1000;
        var sizes = ['', 'K', 'M', 'G'];
        if (value < k) {
            return value.toString();
        }
        else {
            var i = Math.floor(Math.log(value) / Math.log(k));
            var r = ((value / Math.pow(k, i)));
            return r.toFixed(fixed) + sizes[i];
        }
    }

    /** 12345 = 1.23万 */
    public static numberToTenThousand(value: number, fixed: number = 2): string {
        var k = 10000;
        var sizes = ['', '万', '亿', '万亿'];
        if (value < k) {
            return value.toString();
        }
        else {
            var i = Math.floor(Math.log(value) / Math.log(k));
            return ((value / Math.pow(k, i))).toFixed(fixed) + sizes[i];
        }
    }

    /** yyyy-MM-dd hh:mm:ss S */
    public static formatDate(date: Date, fmt: string) {
        var o: any = {
            "M+": date.getMonth() + 1,                   // 月份 
            "d+": date.getDate(),                        // 日 
            "h+": date.getHours(),                       // 小时 
            "m+": date.getMinutes(),                     // 分 
            "s+": date.getSeconds(),                     // 秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度 
            "S": date.getMilliseconds()                  // 毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    /** "," 分割字符串成数组 */
    public static stringToArray1(str: string) {
        if (str == "") {
            return [];
        }
        return str.split(",");
    }

    /** "|" 分割字符串成数组 */
    public static stringToArray2(str: string) {
        if (str == "") {
            return [];
        }
        return str.split("|");
    }

    /** ":" 分割字符串成数组 */
    public static stringToArray3(str: string) {
        if (str == "") {
            return [];
        }
        return str.split(":");
    }

    /** ";" 分割字符串成数组 */
    public static stringToArray4(str: string) {
        if (str == "") {
            return [];
        }
        return (str.split(";")).filter((o) => o !== '');
    }

    // 字符串截取
    public static sub(str: string, n: number, showdot: boolean = false) {
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) { return str; }
        var m = Math.floor(n / 2);
        for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                if (showdot) {
                    return str.substr(0, i) + "...";
                } else {
                    return str.substr(0, i);
                }
            }
        }
        return str;
    }

    // 计算字符串长度
    public static stringLen(str: string) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
                realLength += 1;
            else
                realLength += 2;
        }
        return realLength;
    }

    /** 分割字符串 */
    public static splitString(str:string, separator=";"){
        if (str == "") return [];
        return str.split(separator).filter(item=>{        
            if(item != ''){
                return item;
            }
        });
    }

    /** 分割字符串 并转成number数组 */
    public static splitStringToNumArr(str:string, separator=","){
        return StringUtil.splitString(str,separator).map(Number);
    }

    /**
     * 数字转汉字
     */
    public static convertNumToChinese(numParam: number | string) {
		const chnNumChar =  ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
		const chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
		const chnUnitChar = ["", "十", "百", "千"];

		const SectionToChinese = (section: any) => {
			var ori = section;
			var strIns = '';
			var chnStr = '';
			var unitPos = 0;
			var zero = true;
			while (section > 0) {
				var v = section % 10;
				if (v === 0) {
					if (!zero) {
						zero = true;
						chnStr = chnNumChar[v] + chnStr;
					}
				} else {
					zero = false;
					strIns = chnNumChar[v];
					strIns += chnUnitChar[unitPos];
					chnStr = strIns + chnStr;
				}
				unitPos++;
				section = Math.floor(section / 10);
			}
			if (ori < 20) {
				chnStr = chnStr.replace('一十', '十');
			}
			return chnStr;
		}

        let num: number = typeof numParam === "number" ? numParam : Number(numParam);

		let unitPos = 0;
		let strIns = '', chnStr = '';
		let needZero = false;

		if (num === 0) {
			return chnNumChar[0];
		}

		while (num > 0) {
			var section = num % 10000;
			if (needZero) {
				chnStr = chnNumChar[0] + chnStr;
			}
			strIns = SectionToChinese(section);
			strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
			chnStr = strIns + chnStr;
			needZero = (section < 1000) && (section > 0);
			num = Math.floor(num / 10000);
			unitPos++;
		}
		return chnStr;
	}
}
