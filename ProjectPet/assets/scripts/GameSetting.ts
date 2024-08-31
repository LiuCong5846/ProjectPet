export default class GameSetting {
	private static _instance: GameSetting;
	private _dic: Map<string, number>;
	public constructor() { }

	public static get Instance(): GameSetting {
		if (GameSetting._instance == null) {
			GameSetting._instance = new GameSetting();
			this._instance.init();
		}
		return GameSetting._instance;
	}

	public init(): void {
		this._dic = new Map<string, number>();
	}

	public getSetValue(setType: string): number {
		return this._dic.get(setType);
	}
	public setGameSetting(key: string, value: number): void {
		this._dic.set(key, value);
	}
}

export enum SETTING_TYPE {
	/**声音开关*/
	SET_SOUND = 'SET_SOUND',
	/**背景音乐开关*/
	SET_MUSIC = 'SET_MUSIC',
	/**合成替换提示*/
	SET_MERGE_REPLACE = 'SET_MERGE_REPLACE',
	/**产出替换提示*/
	SET_PRODUCT_REPLACE = 'SET_PRODUCT_REPLACE',
	/**语言开关*/
	SET_LANGUAGE = 'SET_LANGUAGE'
}