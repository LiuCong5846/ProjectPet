import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace com. */
export namespace com {

    /** Namespace wmy. */
    namespace wmy {

        /** Namespace pets. */
        namespace pets {

            /** Namespace model. */
            namespace model {

                /** Namespace proto. */
                namespace proto {

                    /** Namespace Player. */
                    namespace Player {

                        /** Properties of a UserInfo. */
                        interface IUserInfo {

                            /** UserInfo id */
                            id?: (number|null);

                            /** UserInfo nickname */
                            nickname?: (string|null);

                            /** UserInfo sex */
                            sex?: (number|null);

                            /** UserInfo wxName */
                            wxName?: (string|null);

                            /** UserInfo wxHead */
                            wxHead?: (string|null);
                        }

                        /** Represents a UserInfo. */
                        class UserInfo implements IUserInfo {

                            /**
                             * Constructs a new UserInfo.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.IUserInfo);

                            /** UserInfo id. */
                            public id: number;

                            /** UserInfo nickname. */
                            public nickname: string;

                            /** UserInfo sex. */
                            public sex: number;

                            /** UserInfo wxName. */
                            public wxName: string;

                            /** UserInfo wxHead. */
                            public wxHead: string;

                            /**
                             * Creates a new UserInfo instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns UserInfo instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.IUserInfo): com.wmy.pets.model.proto.Player.UserInfo;

                            /**
                             * Encodes the specified UserInfo message. Does not implicitly {@link com.wmy.pets.model.proto.Player.UserInfo.verify|verify} messages.
                             * @param message UserInfo message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.UserInfo.verify|verify} messages.
                             * @param message UserInfo message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.IUserInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a UserInfo message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns UserInfo
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.UserInfo;

                            /**
                             * Decodes a UserInfo message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns UserInfo
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.UserInfo;

                            /**
                             * Verifies a UserInfo message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns UserInfo
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.UserInfo;

                            /**
                             * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
                             * @param message UserInfo
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.UserInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this UserInfo to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for UserInfo
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a PetsInfo. */
                        interface IPetsInfo {

                            /** PetsInfo id */
                            id?: (number|null);

                            /** PetsInfo level */
                            level?: (number|null);

                            /** PetsInfo exp */
                            exp?: (number|null);

                            /** PetsInfo growthRate */
                            growthRate?: (number|null);

                            /** PetsInfo valHunger */
                            valHunger?: (number|null);

                            /** PetsInfo valClean */
                            valClean?: (number|null);

                            /** PetsInfo valMood */
                            valMood?: (number|null);

                            /** PetsInfo valHealth */
                            valHealth?: (number|null);

                            /** PetsInfo health */
                            health?: (number|null);

                            /** PetsInfo action */
                            action?: (number|null);

                            /** PetsInfo action2 */
                            action2?: (number|null);

                            /** PetsInfo actionEndTime */
                            actionEndTime?: (number|Long|null);

                            /** PetsInfo nurseStatus */
                            nurseStatus?: (number|null);

                            /** PetsInfo nurseTime */
                            nurseTime?: (number|Long|null);

                            /** PetsInfo nurseQueueTime */
                            nurseQueueTime?: (number|Long|null);

                            /** PetsInfo nurseAutoFeed */
                            nurseAutoFeed?: (number|null);

                            /** PetsInfo nurseAutoWork */
                            nurseAutoWork?: (number|null);

                            /** PetsInfo nurseAutoStudy */
                            nurseAutoStudy?: (number|null);

                            /** PetsInfo money */
                            money?: (number|Long|null);
                        }

                        /** Represents a PetsInfo. */
                        class PetsInfo implements IPetsInfo {

                            /**
                             * Constructs a new PetsInfo.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.IPetsInfo);

                            /** PetsInfo id. */
                            public id: number;

                            /** PetsInfo level. */
                            public level: number;

                            /** PetsInfo exp. */
                            public exp: number;

                            /** PetsInfo growthRate. */
                            public growthRate: number;

                            /** PetsInfo valHunger. */
                            public valHunger: number;

                            /** PetsInfo valClean. */
                            public valClean: number;

                            /** PetsInfo valMood. */
                            public valMood: number;

                            /** PetsInfo valHealth. */
                            public valHealth: number;

                            /** PetsInfo health. */
                            public health: number;

                            /** PetsInfo action. */
                            public action: number;

                            /** PetsInfo action2. */
                            public action2: number;

                            /** PetsInfo actionEndTime. */
                            public actionEndTime: (number|Long);

                            /** PetsInfo nurseStatus. */
                            public nurseStatus: number;

                            /** PetsInfo nurseTime. */
                            public nurseTime: (number|Long);

                            /** PetsInfo nurseQueueTime. */
                            public nurseQueueTime: (number|Long);

                            /** PetsInfo nurseAutoFeed. */
                            public nurseAutoFeed: number;

                            /** PetsInfo nurseAutoWork. */
                            public nurseAutoWork: number;

                            /** PetsInfo nurseAutoStudy. */
                            public nurseAutoStudy: number;

                            /** PetsInfo money. */
                            public money: (number|Long);

                            /**
                             * Creates a new PetsInfo instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns PetsInfo instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.IPetsInfo): com.wmy.pets.model.proto.Player.PetsInfo;

                            /**
                             * Encodes the specified PetsInfo message. Does not implicitly {@link com.wmy.pets.model.proto.Player.PetsInfo.verify|verify} messages.
                             * @param message PetsInfo message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.IPetsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified PetsInfo message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.PetsInfo.verify|verify} messages.
                             * @param message PetsInfo message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.IPetsInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a PetsInfo message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns PetsInfo
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.PetsInfo;

                            /**
                             * Decodes a PetsInfo message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns PetsInfo
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.PetsInfo;

                            /**
                             * Verifies a PetsInfo message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a PetsInfo message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns PetsInfo
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.PetsInfo;

                            /**
                             * Creates a plain object from a PetsInfo message. Also converts values to other types if specified.
                             * @param message PetsInfo
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.PetsInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this PetsInfo to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for PetsInfo
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a NurseLog. */
                        interface INurseLog {

                            /** NurseLog id */
                            id?: (number|null);

                            /** NurseLog userId */
                            userId?: (number|null);

                            /** NurseLog operate */
                            operate?: (string|null);

                            /** NurseLog log */
                            log?: (string|null);

                            /** NurseLog createTime */
                            createTime?: (number|Long|null);
                        }

                        /** Represents a NurseLog. */
                        class NurseLog implements INurseLog {

                            /**
                             * Constructs a new NurseLog.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.INurseLog);

                            /** NurseLog id. */
                            public id: number;

                            /** NurseLog userId. */
                            public userId: number;

                            /** NurseLog operate. */
                            public operate: string;

                            /** NurseLog log. */
                            public log: string;

                            /** NurseLog createTime. */
                            public createTime: (number|Long);

                            /**
                             * Creates a new NurseLog instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns NurseLog instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.INurseLog): com.wmy.pets.model.proto.Player.NurseLog;

                            /**
                             * Encodes the specified NurseLog message. Does not implicitly {@link com.wmy.pets.model.proto.Player.NurseLog.verify|verify} messages.
                             * @param message NurseLog message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.INurseLog, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified NurseLog message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.NurseLog.verify|verify} messages.
                             * @param message NurseLog message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.INurseLog, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a NurseLog message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns NurseLog
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.NurseLog;

                            /**
                             * Decodes a NurseLog message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns NurseLog
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.NurseLog;

                            /**
                             * Verifies a NurseLog message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a NurseLog message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns NurseLog
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.NurseLog;

                            /**
                             * Creates a plain object from a NurseLog message. Also converts values to other types if specified.
                             * @param message NurseLog
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.NurseLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this NurseLog to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for NurseLog
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a NurseLogList. */
                        interface INurseLogList {

                            /** NurseLogList nurseLog */
                            nurseLog?: (com.wmy.pets.model.proto.Player.INurseLog[]|null);
                        }

                        /** Represents a NurseLogList. */
                        class NurseLogList implements INurseLogList {

                            /**
                             * Constructs a new NurseLogList.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.INurseLogList);

                            /** NurseLogList nurseLog. */
                            public nurseLog: com.wmy.pets.model.proto.Player.INurseLog[];

                            /**
                             * Creates a new NurseLogList instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns NurseLogList instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.INurseLogList): com.wmy.pets.model.proto.Player.NurseLogList;

                            /**
                             * Encodes the specified NurseLogList message. Does not implicitly {@link com.wmy.pets.model.proto.Player.NurseLogList.verify|verify} messages.
                             * @param message NurseLogList message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.INurseLogList, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified NurseLogList message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.NurseLogList.verify|verify} messages.
                             * @param message NurseLogList message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.INurseLogList, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a NurseLogList message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns NurseLogList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.NurseLogList;

                            /**
                             * Decodes a NurseLogList message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns NurseLogList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.NurseLogList;

                            /**
                             * Verifies a NurseLogList message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a NurseLogList message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns NurseLogList
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.NurseLogList;

                            /**
                             * Creates a plain object from a NurseLogList message. Also converts values to other types if specified.
                             * @param message NurseLogList
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.NurseLogList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this NurseLogList to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for NurseLogList
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a Prop. */
                        interface IProp {

                            /** Prop id */
                            id?: (number|null);

                            /** Prop num */
                            num?: (number|null);
                        }

                        /** Represents a Prop. */
                        class Prop implements IProp {

                            /**
                             * Constructs a new Prop.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.IProp);

                            /** Prop id. */
                            public id: number;

                            /** Prop num. */
                            public num: number;

                            /**
                             * Creates a new Prop instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns Prop instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.IProp): com.wmy.pets.model.proto.Player.Prop;

                            /**
                             * Encodes the specified Prop message. Does not implicitly {@link com.wmy.pets.model.proto.Player.Prop.verify|verify} messages.
                             * @param message Prop message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.IProp, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified Prop message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.Prop.verify|verify} messages.
                             * @param message Prop message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.IProp, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a Prop message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns Prop
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.Prop;

                            /**
                             * Decodes a Prop message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns Prop
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.Prop;

                            /**
                             * Verifies a Prop message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a Prop message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns Prop
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.Prop;

                            /**
                             * Creates a plain object from a Prop message. Also converts values to other types if specified.
                             * @param message Prop
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.Prop, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this Prop to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for Prop
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a PetsBag. */
                        interface IPetsBag {

                            /** PetsBag prop */
                            prop?: (com.wmy.pets.model.proto.Player.IProp[]|null);
                        }

                        /** Represents a PetsBag. */
                        class PetsBag implements IPetsBag {

                            /**
                             * Constructs a new PetsBag.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.IPetsBag);

                            /** PetsBag prop. */
                            public prop: com.wmy.pets.model.proto.Player.IProp[];

                            /**
                             * Creates a new PetsBag instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns PetsBag instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.IPetsBag): com.wmy.pets.model.proto.Player.PetsBag;

                            /**
                             * Encodes the specified PetsBag message. Does not implicitly {@link com.wmy.pets.model.proto.Player.PetsBag.verify|verify} messages.
                             * @param message PetsBag message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.IPetsBag, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified PetsBag message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.PetsBag.verify|verify} messages.
                             * @param message PetsBag message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.IPetsBag, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a PetsBag message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns PetsBag
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.PetsBag;

                            /**
                             * Decodes a PetsBag message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns PetsBag
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.PetsBag;

                            /**
                             * Verifies a PetsBag message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a PetsBag message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns PetsBag
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.PetsBag;

                            /**
                             * Creates a plain object from a PetsBag message. Also converts values to other types if specified.
                             * @param message PetsBag
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.PetsBag, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this PetsBag to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for PetsBag
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a NursePropList. */
                        interface INursePropList {

                            /** NursePropList prop */
                            prop?: (com.wmy.pets.model.proto.Player.IProp[]|null);
                        }

                        /** Represents a NursePropList. */
                        class NursePropList implements INursePropList {

                            /**
                             * Constructs a new NursePropList.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.INursePropList);

                            /** NursePropList prop. */
                            public prop: com.wmy.pets.model.proto.Player.IProp[];

                            /**
                             * Creates a new NursePropList instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns NursePropList instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.INursePropList): com.wmy.pets.model.proto.Player.NursePropList;

                            /**
                             * Encodes the specified NursePropList message. Does not implicitly {@link com.wmy.pets.model.proto.Player.NursePropList.verify|verify} messages.
                             * @param message NursePropList message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.INursePropList, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified NursePropList message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.NursePropList.verify|verify} messages.
                             * @param message NursePropList message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.INursePropList, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a NursePropList message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns NursePropList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.NursePropList;

                            /**
                             * Decodes a NursePropList message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns NursePropList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.NursePropList;

                            /**
                             * Verifies a NursePropList message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a NursePropList message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns NursePropList
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.NursePropList;

                            /**
                             * Creates a plain object from a NursePropList message. Also converts values to other types if specified.
                             * @param message NursePropList
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.NursePropList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this NursePropList to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for NursePropList
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a Subject. */
                        interface ISubject {

                            /** Subject id */
                            id?: (number|null);

                            /** Subject process */
                            process?: (number|null);
                        }

                        /** Represents a Subject. */
                        class Subject implements ISubject {

                            /**
                             * Constructs a new Subject.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.ISubject);

                            /** Subject id. */
                            public id: number;

                            /** Subject process. */
                            public process: number;

                            /**
                             * Creates a new Subject instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns Subject instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.ISubject): com.wmy.pets.model.proto.Player.Subject;

                            /**
                             * Encodes the specified Subject message. Does not implicitly {@link com.wmy.pets.model.proto.Player.Subject.verify|verify} messages.
                             * @param message Subject message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.ISubject, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified Subject message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.Subject.verify|verify} messages.
                             * @param message Subject message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.ISubject, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a Subject message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns Subject
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.Subject;

                            /**
                             * Decodes a Subject message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns Subject
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.Subject;

                            /**
                             * Verifies a Subject message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a Subject message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns Subject
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.Subject;

                            /**
                             * Creates a plain object from a Subject message. Also converts values to other types if specified.
                             * @param message Subject
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.Subject, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this Subject to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for Subject
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a School. */
                        interface ISchool {

                            /** School qualification */
                            qualification?: (number|null);

                            /** School process */
                            process?: (number|null);

                            /** School subject */
                            subject?: (com.wmy.pets.model.proto.Player.ISubject[]|null);
                        }

                        /** Represents a School. */
                        class School implements ISchool {

                            /**
                             * Constructs a new School.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.ISchool);

                            /** School qualification. */
                            public qualification: number;

                            /** School process. */
                            public process: number;

                            /** School subject. */
                            public subject: com.wmy.pets.model.proto.Player.ISubject[];

                            /**
                             * Creates a new School instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns School instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.ISchool): com.wmy.pets.model.proto.Player.School;

                            /**
                             * Encodes the specified School message. Does not implicitly {@link com.wmy.pets.model.proto.Player.School.verify|verify} messages.
                             * @param message School message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.ISchool, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified School message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.School.verify|verify} messages.
                             * @param message School message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.ISchool, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a School message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns School
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.School;

                            /**
                             * Decodes a School message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns School
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.School;

                            /**
                             * Verifies a School message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a School message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns School
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.School;

                            /**
                             * Creates a plain object from a School message. Also converts values to other types if specified.
                             * @param message School
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.School, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this School to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for School
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }

                        /** Properties of a SchoolList. */
                        interface ISchoolList {

                            /** SchoolList curEducation */
                            curEducation?: (number|null);

                            /** SchoolList school */
                            school?: (com.wmy.pets.model.proto.Player.ISchool[]|null);
                        }

                        /** Represents a SchoolList. */
                        class SchoolList implements ISchoolList {

                            /**
                             * Constructs a new SchoolList.
                             * @param [properties] Properties to set
                             */
                            constructor(properties?: com.wmy.pets.model.proto.Player.ISchoolList);

                            /** SchoolList curEducation. */
                            public curEducation: number;

                            /** SchoolList school. */
                            public school: com.wmy.pets.model.proto.Player.ISchool[];

                            /**
                             * Creates a new SchoolList instance using the specified properties.
                             * @param [properties] Properties to set
                             * @returns SchoolList instance
                             */
                            public static create(properties?: com.wmy.pets.model.proto.Player.ISchoolList): com.wmy.pets.model.proto.Player.SchoolList;

                            /**
                             * Encodes the specified SchoolList message. Does not implicitly {@link com.wmy.pets.model.proto.Player.SchoolList.verify|verify} messages.
                             * @param message SchoolList message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encode(message: com.wmy.pets.model.proto.Player.ISchoolList, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Encodes the specified SchoolList message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.SchoolList.verify|verify} messages.
                             * @param message SchoolList message or plain object to encode
                             * @param [writer] Writer to encode to
                             * @returns Writer
                             */
                            public static encodeDelimited(message: com.wmy.pets.model.proto.Player.ISchoolList, writer?: $protobuf.Writer): $protobuf.Writer;

                            /**
                             * Decodes a SchoolList message from the specified reader or buffer.
                             * @param reader Reader or buffer to decode from
                             * @param [length] Message length if known beforehand
                             * @returns SchoolList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): com.wmy.pets.model.proto.Player.SchoolList;

                            /**
                             * Decodes a SchoolList message from the specified reader or buffer, length delimited.
                             * @param reader Reader or buffer to decode from
                             * @returns SchoolList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): com.wmy.pets.model.proto.Player.SchoolList;

                            /**
                             * Verifies a SchoolList message.
                             * @param message Plain object to verify
                             * @returns `null` if valid, otherwise the reason why it is not
                             */
                            public static verify(message: { [k: string]: any }): (string|null);

                            /**
                             * Creates a SchoolList message from a plain object. Also converts values to their respective internal types.
                             * @param object Plain object
                             * @returns SchoolList
                             */
                            public static fromObject(object: { [k: string]: any }): com.wmy.pets.model.proto.Player.SchoolList;

                            /**
                             * Creates a plain object from a SchoolList message. Also converts values to other types if specified.
                             * @param message SchoolList
                             * @param [options] Conversion options
                             * @returns Plain object
                             */
                            public static toObject(message: com.wmy.pets.model.proto.Player.SchoolList, options?: $protobuf.IConversionOptions): { [k: string]: any };

                            /**
                             * Converts this SchoolList to JSON.
                             * @returns JSON object
                             */
                            public toJSON(): { [k: string]: any };

                            /**
                             * Gets the default type url for SchoolList
                             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns The default type url
                             */
                            public static getTypeUrl(typeUrlPrefix?: string): string;
                        }
                    }
                }
            }
        }
    }
}
