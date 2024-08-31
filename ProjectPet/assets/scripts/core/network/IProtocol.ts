/**
 * @deprecated 宠物项目用不到
 */
export interface IProtocol {
    onConnected(): void;
    onError(): void;
    onClose(): void;
    /** 心跳消息注册返回 */
    onHearbeat(): void;
    /** 错误消息注册返回 */
    onMsgError(data: any): void;
    /** 后台主动推送消息注册返回 */
    onMsgPush(data: any): void;
    /** 成功消息注册返回 */
    onMsgSuccess(cmd: string, data: any): void;
    /** 服务器连接失败 重新登录 */
    onServerClose(): void;
}