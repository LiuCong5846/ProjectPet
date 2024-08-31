/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";
import Long from 'long';
$protobuf.default.util.Long = Long;
$protobuf.default.configure();

// Common aliases
const $Reader = $protobuf.default.Reader, $Writer = $protobuf.default.Writer, $util = $protobuf.default.util;

// Exported root namespace
const $root = {};

export const com = $root.com = (() => {

    /**
     * Namespace com.
     * @exports com
     * @namespace
     */
    const com = {};

    com.wmy = (function() {

        /**
         * Namespace wmy.
         * @memberof com
         * @namespace
         */
        const wmy = {};

        wmy.pets = (function() {

            /**
             * Namespace pets.
             * @memberof com.wmy
             * @namespace
             */
            const pets = {};

            pets.model = (function() {

                /**
                 * Namespace model.
                 * @memberof com.wmy.pets
                 * @namespace
                 */
                const model = {};

                model.proto = (function() {

                    /**
                     * Namespace proto.
                     * @memberof com.wmy.pets.model
                     * @namespace
                     */
                    const proto = {};

                    proto.Player = (function() {

                        /**
                         * Namespace Player.
                         * @memberof com.wmy.pets.model.proto
                         * @namespace
                         */
                        const Player = {};

                        Player.UserInfo = (function() {

                            /**
                             * Properties of a UserInfo.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface IUserInfo
                             * @property {number|null} [id] UserInfo id
                             * @property {string|null} [nickname] UserInfo nickname
                             * @property {number|null} [sex] UserInfo sex
                             * @property {string|null} [wxName] UserInfo wxName
                             * @property {string|null} [wxHead] UserInfo wxHead
                             */

                            /**
                             * Constructs a new UserInfo.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a UserInfo.
                             * @implements IUserInfo
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.IUserInfo=} [properties] Properties to set
                             */
                            function UserInfo(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * UserInfo id.
                             * @member {number} id
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @instance
                             */
                            UserInfo.prototype.id = 0;

                            /**
                             * UserInfo nickname.
                             * @member {string} nickname
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @instance
                             */
                            UserInfo.prototype.nickname = "";

                            /**
                             * UserInfo sex.
                             * @member {number} sex
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @instance
                             */
                            UserInfo.prototype.sex = 0;

                            /**
                             * UserInfo wxName.
                             * @member {string} wxName
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @instance
                             */
                            UserInfo.prototype.wxName = "";

                            /**
                             * UserInfo wxHead.
                             * @member {string} wxHead
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @instance
                             */
                            UserInfo.prototype.wxHead = "";

                            /**
                             * Creates a new UserInfo instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IUserInfo=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.UserInfo} UserInfo instance
                             */
                            UserInfo.create = function create(properties) {
                                return new UserInfo(properties);
                            };

                            /**
                             * Encodes the specified UserInfo message. Does not implicitly {@link com.wmy.pets.model.proto.Player.UserInfo.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IUserInfo} message UserInfo message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            UserInfo.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                                if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
                                if (message.sex != null && Object.hasOwnProperty.call(message, "sex"))
                                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.sex);
                                if (message.wxName != null && Object.hasOwnProperty.call(message, "wxName"))
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.wxName);
                                if (message.wxHead != null && Object.hasOwnProperty.call(message, "wxHead"))
                                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.wxHead);
                                return writer;
                            };

                            /**
                             * Encodes the specified UserInfo message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.UserInfo.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IUserInfo} message UserInfo message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a UserInfo message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.UserInfo} UserInfo
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            UserInfo.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.UserInfo();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            message.id = reader.int32();
                                            break;
                                        }
                                    case 2: {
                                            message.nickname = reader.string();
                                            break;
                                        }
                                    case 3: {
                                            message.sex = reader.int32();
                                            break;
                                        }
                                    case 4: {
                                            message.wxName = reader.string();
                                            break;
                                        }
                                    case 5: {
                                            message.wxHead = reader.string();
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a UserInfo message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.UserInfo} UserInfo
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            UserInfo.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a UserInfo message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            UserInfo.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.id != null && message.hasOwnProperty("id"))
                                    if (!$util.isInteger(message.id))
                                        return "id: integer expected";
                                if (message.nickname != null && message.hasOwnProperty("nickname"))
                                    if (!$util.isString(message.nickname))
                                        return "nickname: string expected";
                                if (message.sex != null && message.hasOwnProperty("sex"))
                                    if (!$util.isInteger(message.sex))
                                        return "sex: integer expected";
                                if (message.wxName != null && message.hasOwnProperty("wxName"))
                                    if (!$util.isString(message.wxName))
                                        return "wxName: string expected";
                                if (message.wxHead != null && message.hasOwnProperty("wxHead"))
                                    if (!$util.isString(message.wxHead))
                                        return "wxHead: string expected";
                                return null;
                            };

                            /**
                             * Creates a UserInfo message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.UserInfo} UserInfo
                             */
                            UserInfo.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.UserInfo)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.UserInfo();
                                if (object.id != null)
                                    message.id = object.id | 0;
                                if (object.nickname != null)
                                    message.nickname = String(object.nickname);
                                if (object.sex != null)
                                    message.sex = object.sex | 0;
                                if (object.wxName != null)
                                    message.wxName = String(object.wxName);
                                if (object.wxHead != null)
                                    message.wxHead = String(object.wxHead);
                                return message;
                            };

                            /**
                             * Creates a plain object from a UserInfo message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.UserInfo} message UserInfo
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            UserInfo.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.id = 0;
                                    object.nickname = "";
                                    object.sex = 0;
                                    object.wxName = "";
                                    object.wxHead = "";
                                }
                                if (message.id != null && message.hasOwnProperty("id"))
                                    object.id = message.id;
                                if (message.nickname != null && message.hasOwnProperty("nickname"))
                                    object.nickname = message.nickname;
                                if (message.sex != null && message.hasOwnProperty("sex"))
                                    object.sex = message.sex;
                                if (message.wxName != null && message.hasOwnProperty("wxName"))
                                    object.wxName = message.wxName;
                                if (message.wxHead != null && message.hasOwnProperty("wxHead"))
                                    object.wxHead = message.wxHead;
                                return object;
                            };

                            /**
                             * Converts this UserInfo to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            UserInfo.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for UserInfo
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.UserInfo
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            UserInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.UserInfo";
                            };

                            return UserInfo;
                        })();

                        Player.PetsInfo = (function() {

                            /**
                             * Properties of a PetsInfo.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface IPetsInfo
                             * @property {number|null} [id] PetsInfo id
                             * @property {number|null} [level] PetsInfo level
                             * @property {number|null} [exp] PetsInfo exp
                             * @property {number|null} [growthRate] PetsInfo growthRate
                             * @property {number|null} [valHunger] PetsInfo valHunger
                             * @property {number|null} [valClean] PetsInfo valClean
                             * @property {number|null} [valMood] PetsInfo valMood
                             * @property {number|null} [valHealth] PetsInfo valHealth
                             * @property {number|null} [health] PetsInfo health
                             * @property {number|null} [action] PetsInfo action
                             * @property {number|null} [action2] PetsInfo action2
                             * @property {number|Long|null} [actionEndTime] PetsInfo actionEndTime
                             * @property {number|null} [nurseStatus] PetsInfo nurseStatus
                             * @property {number|Long|null} [nurseTime] PetsInfo nurseTime
                             * @property {number|Long|null} [nurseQueueTime] PetsInfo nurseQueueTime
                             * @property {number|null} [nurseAutoFeed] PetsInfo nurseAutoFeed
                             * @property {number|null} [nurseAutoWork] PetsInfo nurseAutoWork
                             * @property {number|null} [nurseAutoStudy] PetsInfo nurseAutoStudy
                             * @property {number|Long|null} [money] PetsInfo money
                             */

                            /**
                             * Constructs a new PetsInfo.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a PetsInfo.
                             * @implements IPetsInfo
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.IPetsInfo=} [properties] Properties to set
                             */
                            function PetsInfo(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * PetsInfo id.
                             * @member {number} id
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.id = 0;

                            /**
                             * PetsInfo level.
                             * @member {number} level
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.level = 0;

                            /**
                             * PetsInfo exp.
                             * @member {number} exp
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.exp = 0;

                            /**
                             * PetsInfo growthRate.
                             * @member {number} growthRate
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.growthRate = 0;

                            /**
                             * PetsInfo valHunger.
                             * @member {number} valHunger
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.valHunger = 0;

                            /**
                             * PetsInfo valClean.
                             * @member {number} valClean
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.valClean = 0;

                            /**
                             * PetsInfo valMood.
                             * @member {number} valMood
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.valMood = 0;

                            /**
                             * PetsInfo valHealth.
                             * @member {number} valHealth
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.valHealth = 0;

                            /**
                             * PetsInfo health.
                             * @member {number} health
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.health = 0;

                            /**
                             * PetsInfo action.
                             * @member {number} action
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.action = 0;

                            /**
                             * PetsInfo action2.
                             * @member {number} action2
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.action2 = 0;

                            /**
                             * PetsInfo actionEndTime.
                             * @member {number|Long} actionEndTime
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.actionEndTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * PetsInfo nurseStatus.
                             * @member {number} nurseStatus
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.nurseStatus = 0;

                            /**
                             * PetsInfo nurseTime.
                             * @member {number|Long} nurseTime
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.nurseTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * PetsInfo nurseQueueTime.
                             * @member {number|Long} nurseQueueTime
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.nurseQueueTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * PetsInfo nurseAutoFeed.
                             * @member {number} nurseAutoFeed
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.nurseAutoFeed = 0;

                            /**
                             * PetsInfo nurseAutoWork.
                             * @member {number} nurseAutoWork
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.nurseAutoWork = 0;

                            /**
                             * PetsInfo nurseAutoStudy.
                             * @member {number} nurseAutoStudy
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.nurseAutoStudy = 0;

                            /**
                             * PetsInfo money.
                             * @member {number|Long} money
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             */
                            PetsInfo.prototype.money = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * Creates a new PetsInfo instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IPetsInfo=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.PetsInfo} PetsInfo instance
                             */
                            PetsInfo.create = function create(properties) {
                                return new PetsInfo(properties);
                            };

                            /**
                             * Encodes the specified PetsInfo message. Does not implicitly {@link com.wmy.pets.model.proto.Player.PetsInfo.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IPetsInfo} message PetsInfo message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            PetsInfo.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.level);
                                if (message.exp != null && Object.hasOwnProperty.call(message, "exp"))
                                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.exp);
                                if (message.growthRate != null && Object.hasOwnProperty.call(message, "growthRate"))
                                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.growthRate);
                                if (message.valHunger != null && Object.hasOwnProperty.call(message, "valHunger"))
                                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.valHunger);
                                if (message.valClean != null && Object.hasOwnProperty.call(message, "valClean"))
                                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.valClean);
                                if (message.valMood != null && Object.hasOwnProperty.call(message, "valMood"))
                                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.valMood);
                                if (message.valHealth != null && Object.hasOwnProperty.call(message, "valHealth"))
                                    writer.uint32(/* id 8, wireType 0 =*/64).int32(message.valHealth);
                                if (message.health != null && Object.hasOwnProperty.call(message, "health"))
                                    writer.uint32(/* id 9, wireType 0 =*/72).int32(message.health);
                                if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.action);
                                if (message.action2 != null && Object.hasOwnProperty.call(message, "action2"))
                                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.action2);
                                if (message.actionEndTime != null && Object.hasOwnProperty.call(message, "actionEndTime"))
                                    writer.uint32(/* id 12, wireType 0 =*/96).int64(message.actionEndTime);
                                if (message.nurseStatus != null && Object.hasOwnProperty.call(message, "nurseStatus"))
                                    writer.uint32(/* id 13, wireType 0 =*/104).int32(message.nurseStatus);
                                if (message.nurseTime != null && Object.hasOwnProperty.call(message, "nurseTime"))
                                    writer.uint32(/* id 14, wireType 0 =*/112).int64(message.nurseTime);
                                if (message.nurseQueueTime != null && Object.hasOwnProperty.call(message, "nurseQueueTime"))
                                    writer.uint32(/* id 15, wireType 0 =*/120).int64(message.nurseQueueTime);
                                if (message.nurseAutoFeed != null && Object.hasOwnProperty.call(message, "nurseAutoFeed"))
                                    writer.uint32(/* id 16, wireType 0 =*/128).int32(message.nurseAutoFeed);
                                if (message.nurseAutoWork != null && Object.hasOwnProperty.call(message, "nurseAutoWork"))
                                    writer.uint32(/* id 17, wireType 0 =*/136).int32(message.nurseAutoWork);
                                if (message.nurseAutoStudy != null && Object.hasOwnProperty.call(message, "nurseAutoStudy"))
                                    writer.uint32(/* id 18, wireType 0 =*/144).int32(message.nurseAutoStudy);
                                if (message.money != null && Object.hasOwnProperty.call(message, "money"))
                                    writer.uint32(/* id 19, wireType 0 =*/152).int64(message.money);
                                return writer;
                            };

                            /**
                             * Encodes the specified PetsInfo message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.PetsInfo.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IPetsInfo} message PetsInfo message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            PetsInfo.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a PetsInfo message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.PetsInfo} PetsInfo
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            PetsInfo.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.PetsInfo();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            message.id = reader.int32();
                                            break;
                                        }
                                    case 2: {
                                            message.level = reader.int32();
                                            break;
                                        }
                                    case 3: {
                                            message.exp = reader.int32();
                                            break;
                                        }
                                    case 4: {
                                            message.growthRate = reader.int32();
                                            break;
                                        }
                                    case 5: {
                                            message.valHunger = reader.int32();
                                            break;
                                        }
                                    case 6: {
                                            message.valClean = reader.int32();
                                            break;
                                        }
                                    case 7: {
                                            message.valMood = reader.int32();
                                            break;
                                        }
                                    case 8: {
                                            message.valHealth = reader.int32();
                                            break;
                                        }
                                    case 9: {
                                            message.health = reader.int32();
                                            break;
                                        }
                                    case 10: {
                                            message.action = reader.int32();
                                            break;
                                        }
                                    case 11: {
                                            message.action2 = reader.int32();
                                            break;
                                        }
                                    case 12: {
                                            message.actionEndTime = reader.int64();
                                            break;
                                        }
                                    case 13: {
                                            message.nurseStatus = reader.int32();
                                            break;
                                        }
                                    case 14: {
                                            message.nurseTime = reader.int64();
                                            break;
                                        }
                                    case 15: {
                                            message.nurseQueueTime = reader.int64();
                                            break;
                                        }
                                    case 16: {
                                            message.nurseAutoFeed = reader.int32();
                                            break;
                                        }
                                    case 17: {
                                            message.nurseAutoWork = reader.int32();
                                            break;
                                        }
                                    case 18: {
                                            message.nurseAutoStudy = reader.int32();
                                            break;
                                        }
                                    case 19: {
                                            message.money = reader.int64();
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a PetsInfo message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.PetsInfo} PetsInfo
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            PetsInfo.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a PetsInfo message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            PetsInfo.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.id != null && message.hasOwnProperty("id"))
                                    if (!$util.isInteger(message.id))
                                        return "id: integer expected";
                                if (message.level != null && message.hasOwnProperty("level"))
                                    if (!$util.isInteger(message.level))
                                        return "level: integer expected";
                                if (message.exp != null && message.hasOwnProperty("exp"))
                                    if (!$util.isInteger(message.exp))
                                        return "exp: integer expected";
                                if (message.growthRate != null && message.hasOwnProperty("growthRate"))
                                    if (!$util.isInteger(message.growthRate))
                                        return "growthRate: integer expected";
                                if (message.valHunger != null && message.hasOwnProperty("valHunger"))
                                    if (!$util.isInteger(message.valHunger))
                                        return "valHunger: integer expected";
                                if (message.valClean != null && message.hasOwnProperty("valClean"))
                                    if (!$util.isInteger(message.valClean))
                                        return "valClean: integer expected";
                                if (message.valMood != null && message.hasOwnProperty("valMood"))
                                    if (!$util.isInteger(message.valMood))
                                        return "valMood: integer expected";
                                if (message.valHealth != null && message.hasOwnProperty("valHealth"))
                                    if (!$util.isInteger(message.valHealth))
                                        return "valHealth: integer expected";
                                if (message.health != null && message.hasOwnProperty("health"))
                                    if (!$util.isInteger(message.health))
                                        return "health: integer expected";
                                if (message.action != null && message.hasOwnProperty("action"))
                                    if (!$util.isInteger(message.action))
                                        return "action: integer expected";
                                if (message.action2 != null && message.hasOwnProperty("action2"))
                                    if (!$util.isInteger(message.action2))
                                        return "action2: integer expected";
                                if (message.actionEndTime != null && message.hasOwnProperty("actionEndTime"))
                                    if (!$util.isInteger(message.actionEndTime) && !(message.actionEndTime && $util.isInteger(message.actionEndTime.low) && $util.isInteger(message.actionEndTime.high)))
                                        return "actionEndTime: integer|Long expected";
                                if (message.nurseStatus != null && message.hasOwnProperty("nurseStatus"))
                                    if (!$util.isInteger(message.nurseStatus))
                                        return "nurseStatus: integer expected";
                                if (message.nurseTime != null && message.hasOwnProperty("nurseTime"))
                                    if (!$util.isInteger(message.nurseTime) && !(message.nurseTime && $util.isInteger(message.nurseTime.low) && $util.isInteger(message.nurseTime.high)))
                                        return "nurseTime: integer|Long expected";
                                if (message.nurseQueueTime != null && message.hasOwnProperty("nurseQueueTime"))
                                    if (!$util.isInteger(message.nurseQueueTime) && !(message.nurseQueueTime && $util.isInteger(message.nurseQueueTime.low) && $util.isInteger(message.nurseQueueTime.high)))
                                        return "nurseQueueTime: integer|Long expected";
                                if (message.nurseAutoFeed != null && message.hasOwnProperty("nurseAutoFeed"))
                                    if (!$util.isInteger(message.nurseAutoFeed))
                                        return "nurseAutoFeed: integer expected";
                                if (message.nurseAutoWork != null && message.hasOwnProperty("nurseAutoWork"))
                                    if (!$util.isInteger(message.nurseAutoWork))
                                        return "nurseAutoWork: integer expected";
                                if (message.nurseAutoStudy != null && message.hasOwnProperty("nurseAutoStudy"))
                                    if (!$util.isInteger(message.nurseAutoStudy))
                                        return "nurseAutoStudy: integer expected";
                                if (message.money != null && message.hasOwnProperty("money"))
                                    if (!$util.isInteger(message.money) && !(message.money && $util.isInteger(message.money.low) && $util.isInteger(message.money.high)))
                                        return "money: integer|Long expected";
                                return null;
                            };

                            /**
                             * Creates a PetsInfo message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.PetsInfo} PetsInfo
                             */
                            PetsInfo.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.PetsInfo)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.PetsInfo();
                                if (object.id != null)
                                    message.id = object.id | 0;
                                if (object.level != null)
                                    message.level = object.level | 0;
                                if (object.exp != null)
                                    message.exp = object.exp | 0;
                                if (object.growthRate != null)
                                    message.growthRate = object.growthRate | 0;
                                if (object.valHunger != null)
                                    message.valHunger = object.valHunger | 0;
                                if (object.valClean != null)
                                    message.valClean = object.valClean | 0;
                                if (object.valMood != null)
                                    message.valMood = object.valMood | 0;
                                if (object.valHealth != null)
                                    message.valHealth = object.valHealth | 0;
                                if (object.health != null)
                                    message.health = object.health | 0;
                                if (object.action != null)
                                    message.action = object.action | 0;
                                if (object.action2 != null)
                                    message.action2 = object.action2 | 0;
                                if (object.actionEndTime != null)
                                    if ($util.Long)
                                        (message.actionEndTime = $util.Long.fromValue(object.actionEndTime)).unsigned = false;
                                    else if (typeof object.actionEndTime === "string")
                                        message.actionEndTime = parseInt(object.actionEndTime, 10);
                                    else if (typeof object.actionEndTime === "number")
                                        message.actionEndTime = object.actionEndTime;
                                    else if (typeof object.actionEndTime === "object")
                                        message.actionEndTime = new $util.LongBits(object.actionEndTime.low >>> 0, object.actionEndTime.high >>> 0).toNumber();
                                if (object.nurseStatus != null)
                                    message.nurseStatus = object.nurseStatus | 0;
                                if (object.nurseTime != null)
                                    if ($util.Long)
                                        (message.nurseTime = $util.Long.fromValue(object.nurseTime)).unsigned = false;
                                    else if (typeof object.nurseTime === "string")
                                        message.nurseTime = parseInt(object.nurseTime, 10);
                                    else if (typeof object.nurseTime === "number")
                                        message.nurseTime = object.nurseTime;
                                    else if (typeof object.nurseTime === "object")
                                        message.nurseTime = new $util.LongBits(object.nurseTime.low >>> 0, object.nurseTime.high >>> 0).toNumber();
                                if (object.nurseQueueTime != null)
                                    if ($util.Long)
                                        (message.nurseQueueTime = $util.Long.fromValue(object.nurseQueueTime)).unsigned = false;
                                    else if (typeof object.nurseQueueTime === "string")
                                        message.nurseQueueTime = parseInt(object.nurseQueueTime, 10);
                                    else if (typeof object.nurseQueueTime === "number")
                                        message.nurseQueueTime = object.nurseQueueTime;
                                    else if (typeof object.nurseQueueTime === "object")
                                        message.nurseQueueTime = new $util.LongBits(object.nurseQueueTime.low >>> 0, object.nurseQueueTime.high >>> 0).toNumber();
                                if (object.nurseAutoFeed != null)
                                    message.nurseAutoFeed = object.nurseAutoFeed | 0;
                                if (object.nurseAutoWork != null)
                                    message.nurseAutoWork = object.nurseAutoWork | 0;
                                if (object.nurseAutoStudy != null)
                                    message.nurseAutoStudy = object.nurseAutoStudy | 0;
                                if (object.money != null)
                                    if ($util.Long)
                                        (message.money = $util.Long.fromValue(object.money)).unsigned = false;
                                    else if (typeof object.money === "string")
                                        message.money = parseInt(object.money, 10);
                                    else if (typeof object.money === "number")
                                        message.money = object.money;
                                    else if (typeof object.money === "object")
                                        message.money = new $util.LongBits(object.money.low >>> 0, object.money.high >>> 0).toNumber();
                                return message;
                            };

                            /**
                             * Creates a plain object from a PetsInfo message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.PetsInfo} message PetsInfo
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            PetsInfo.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.id = 0;
                                    object.level = 0;
                                    object.exp = 0;
                                    object.growthRate = 0;
                                    object.valHunger = 0;
                                    object.valClean = 0;
                                    object.valMood = 0;
                                    object.valHealth = 0;
                                    object.health = 0;
                                    object.action = 0;
                                    object.action2 = 0;
                                    if ($util.Long) {
                                        let long = new $util.Long(0, 0, false);
                                        object.actionEndTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.actionEndTime = options.longs === String ? "0" : 0;
                                    object.nurseStatus = 0;
                                    if ($util.Long) {
                                        let long = new $util.Long(0, 0, false);
                                        object.nurseTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.nurseTime = options.longs === String ? "0" : 0;
                                    if ($util.Long) {
                                        let long = new $util.Long(0, 0, false);
                                        object.nurseQueueTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.nurseQueueTime = options.longs === String ? "0" : 0;
                                    object.nurseAutoFeed = 0;
                                    object.nurseAutoWork = 0;
                                    object.nurseAutoStudy = 0;
                                    if ($util.Long) {
                                        let long = new $util.Long(0, 0, false);
                                        object.money = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.money = options.longs === String ? "0" : 0;
                                }
                                if (message.id != null && message.hasOwnProperty("id"))
                                    object.id = message.id;
                                if (message.level != null && message.hasOwnProperty("level"))
                                    object.level = message.level;
                                if (message.exp != null && message.hasOwnProperty("exp"))
                                    object.exp = message.exp;
                                if (message.growthRate != null && message.hasOwnProperty("growthRate"))
                                    object.growthRate = message.growthRate;
                                if (message.valHunger != null && message.hasOwnProperty("valHunger"))
                                    object.valHunger = message.valHunger;
                                if (message.valClean != null && message.hasOwnProperty("valClean"))
                                    object.valClean = message.valClean;
                                if (message.valMood != null && message.hasOwnProperty("valMood"))
                                    object.valMood = message.valMood;
                                if (message.valHealth != null && message.hasOwnProperty("valHealth"))
                                    object.valHealth = message.valHealth;
                                if (message.health != null && message.hasOwnProperty("health"))
                                    object.health = message.health;
                                if (message.action != null && message.hasOwnProperty("action"))
                                    object.action = message.action;
                                if (message.action2 != null && message.hasOwnProperty("action2"))
                                    object.action2 = message.action2;
                                if (message.actionEndTime != null && message.hasOwnProperty("actionEndTime"))
                                    if (typeof message.actionEndTime === "number")
                                        object.actionEndTime = options.longs === String ? String(message.actionEndTime) : message.actionEndTime;
                                    else
                                        object.actionEndTime = options.longs === String ? $util.Long.prototype.toString.call(message.actionEndTime) : options.longs === Number ? new $util.LongBits(message.actionEndTime.low >>> 0, message.actionEndTime.high >>> 0).toNumber() : message.actionEndTime;
                                if (message.nurseStatus != null && message.hasOwnProperty("nurseStatus"))
                                    object.nurseStatus = message.nurseStatus;
                                if (message.nurseTime != null && message.hasOwnProperty("nurseTime"))
                                    if (typeof message.nurseTime === "number")
                                        object.nurseTime = options.longs === String ? String(message.nurseTime) : message.nurseTime;
                                    else
                                        object.nurseTime = options.longs === String ? $util.Long.prototype.toString.call(message.nurseTime) : options.longs === Number ? new $util.LongBits(message.nurseTime.low >>> 0, message.nurseTime.high >>> 0).toNumber() : message.nurseTime;
                                if (message.nurseQueueTime != null && message.hasOwnProperty("nurseQueueTime"))
                                    if (typeof message.nurseQueueTime === "number")
                                        object.nurseQueueTime = options.longs === String ? String(message.nurseQueueTime) : message.nurseQueueTime;
                                    else
                                        object.nurseQueueTime = options.longs === String ? $util.Long.prototype.toString.call(message.nurseQueueTime) : options.longs === Number ? new $util.LongBits(message.nurseQueueTime.low >>> 0, message.nurseQueueTime.high >>> 0).toNumber() : message.nurseQueueTime;
                                if (message.nurseAutoFeed != null && message.hasOwnProperty("nurseAutoFeed"))
                                    object.nurseAutoFeed = message.nurseAutoFeed;
                                if (message.nurseAutoWork != null && message.hasOwnProperty("nurseAutoWork"))
                                    object.nurseAutoWork = message.nurseAutoWork;
                                if (message.nurseAutoStudy != null && message.hasOwnProperty("nurseAutoStudy"))
                                    object.nurseAutoStudy = message.nurseAutoStudy;
                                if (message.money != null && message.hasOwnProperty("money"))
                                    if (typeof message.money === "number")
                                        object.money = options.longs === String ? String(message.money) : message.money;
                                    else
                                        object.money = options.longs === String ? $util.Long.prototype.toString.call(message.money) : options.longs === Number ? new $util.LongBits(message.money.low >>> 0, message.money.high >>> 0).toNumber() : message.money;
                                return object;
                            };

                            /**
                             * Converts this PetsInfo to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            PetsInfo.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for PetsInfo
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.PetsInfo
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            PetsInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.PetsInfo";
                            };

                            return PetsInfo;
                        })();

                        Player.NurseLog = (function() {

                            /**
                             * Properties of a NurseLog.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface INurseLog
                             * @property {number|null} [id] NurseLog id
                             * @property {number|null} [userId] NurseLog userId
                             * @property {string|null} [operate] NurseLog operate
                             * @property {string|null} [log] NurseLog log
                             * @property {number|Long|null} [createTime] NurseLog createTime
                             */

                            /**
                             * Constructs a new NurseLog.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a NurseLog.
                             * @implements INurseLog
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.INurseLog=} [properties] Properties to set
                             */
                            function NurseLog(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * NurseLog id.
                             * @member {number} id
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @instance
                             */
                            NurseLog.prototype.id = 0;

                            /**
                             * NurseLog userId.
                             * @member {number} userId
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @instance
                             */
                            NurseLog.prototype.userId = 0;

                            /**
                             * NurseLog operate.
                             * @member {string} operate
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @instance
                             */
                            NurseLog.prototype.operate = "";

                            /**
                             * NurseLog log.
                             * @member {string} log
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @instance
                             */
                            NurseLog.prototype.log = "";

                            /**
                             * NurseLog createTime.
                             * @member {number|Long} createTime
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @instance
                             */
                            NurseLog.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * Creates a new NurseLog instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INurseLog=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.NurseLog} NurseLog instance
                             */
                            NurseLog.create = function create(properties) {
                                return new NurseLog(properties);
                            };

                            /**
                             * Encodes the specified NurseLog message. Does not implicitly {@link com.wmy.pets.model.proto.Player.NurseLog.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INurseLog} message NurseLog message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            NurseLog.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.userId);
                                if (message.operate != null && Object.hasOwnProperty.call(message, "operate"))
                                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.operate);
                                if (message.log != null && Object.hasOwnProperty.call(message, "log"))
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.log);
                                if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.createTime);
                                return writer;
                            };

                            /**
                             * Encodes the specified NurseLog message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.NurseLog.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INurseLog} message NurseLog message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            NurseLog.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a NurseLog message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.NurseLog} NurseLog
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            NurseLog.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.NurseLog();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            message.id = reader.int32();
                                            break;
                                        }
                                    case 2: {
                                            message.userId = reader.int32();
                                            break;
                                        }
                                    case 3: {
                                            message.operate = reader.string();
                                            break;
                                        }
                                    case 4: {
                                            message.log = reader.string();
                                            break;
                                        }
                                    case 5: {
                                            message.createTime = reader.int64();
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a NurseLog message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.NurseLog} NurseLog
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            NurseLog.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a NurseLog message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            NurseLog.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.id != null && message.hasOwnProperty("id"))
                                    if (!$util.isInteger(message.id))
                                        return "id: integer expected";
                                if (message.userId != null && message.hasOwnProperty("userId"))
                                    if (!$util.isInteger(message.userId))
                                        return "userId: integer expected";
                                if (message.operate != null && message.hasOwnProperty("operate"))
                                    if (!$util.isString(message.operate))
                                        return "operate: string expected";
                                if (message.log != null && message.hasOwnProperty("log"))
                                    if (!$util.isString(message.log))
                                        return "log: string expected";
                                if (message.createTime != null && message.hasOwnProperty("createTime"))
                                    if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                                        return "createTime: integer|Long expected";
                                return null;
                            };

                            /**
                             * Creates a NurseLog message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.NurseLog} NurseLog
                             */
                            NurseLog.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.NurseLog)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.NurseLog();
                                if (object.id != null)
                                    message.id = object.id | 0;
                                if (object.userId != null)
                                    message.userId = object.userId | 0;
                                if (object.operate != null)
                                    message.operate = String(object.operate);
                                if (object.log != null)
                                    message.log = String(object.log);
                                if (object.createTime != null)
                                    if ($util.Long)
                                        (message.createTime = $util.Long.fromValue(object.createTime)).unsigned = false;
                                    else if (typeof object.createTime === "string")
                                        message.createTime = parseInt(object.createTime, 10);
                                    else if (typeof object.createTime === "number")
                                        message.createTime = object.createTime;
                                    else if (typeof object.createTime === "object")
                                        message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber();
                                return message;
                            };

                            /**
                             * Creates a plain object from a NurseLog message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.NurseLog} message NurseLog
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            NurseLog.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.id = 0;
                                    object.userId = 0;
                                    object.operate = "";
                                    object.log = "";
                                    if ($util.Long) {
                                        let long = new $util.Long(0, 0, false);
                                        object.createTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.createTime = options.longs === String ? "0" : 0;
                                }
                                if (message.id != null && message.hasOwnProperty("id"))
                                    object.id = message.id;
                                if (message.userId != null && message.hasOwnProperty("userId"))
                                    object.userId = message.userId;
                                if (message.operate != null && message.hasOwnProperty("operate"))
                                    object.operate = message.operate;
                                if (message.log != null && message.hasOwnProperty("log"))
                                    object.log = message.log;
                                if (message.createTime != null && message.hasOwnProperty("createTime"))
                                    if (typeof message.createTime === "number")
                                        object.createTime = options.longs === String ? String(message.createTime) : message.createTime;
                                    else
                                        object.createTime = options.longs === String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber() : message.createTime;
                                return object;
                            };

                            /**
                             * Converts this NurseLog to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            NurseLog.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for NurseLog
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.NurseLog
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            NurseLog.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.NurseLog";
                            };

                            return NurseLog;
                        })();

                        Player.NurseLogList = (function() {

                            /**
                             * Properties of a NurseLogList.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface INurseLogList
                             * @property {Array.<com.wmy.pets.model.proto.Player.INurseLog>|null} [nurseLog] NurseLogList nurseLog
                             */

                            /**
                             * Constructs a new NurseLogList.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a NurseLogList.
                             * @implements INurseLogList
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.INurseLogList=} [properties] Properties to set
                             */
                            function NurseLogList(properties) {
                                this.nurseLog = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * NurseLogList nurseLog.
                             * @member {Array.<com.wmy.pets.model.proto.Player.INurseLog>} nurseLog
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @instance
                             */
                            NurseLogList.prototype.nurseLog = $util.emptyArray;

                            /**
                             * Creates a new NurseLogList instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INurseLogList=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.NurseLogList} NurseLogList instance
                             */
                            NurseLogList.create = function create(properties) {
                                return new NurseLogList(properties);
                            };

                            /**
                             * Encodes the specified NurseLogList message. Does not implicitly {@link com.wmy.pets.model.proto.Player.NurseLogList.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INurseLogList} message NurseLogList message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            NurseLogList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.nurseLog != null && message.nurseLog.length)
                                    for (let i = 0; i < message.nurseLog.length; ++i)
                                        $root.com.wmy.pets.model.proto.Player.NurseLog.encode(message.nurseLog[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified NurseLogList message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.NurseLogList.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INurseLogList} message NurseLogList message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            NurseLogList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a NurseLogList message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.NurseLogList} NurseLogList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            NurseLogList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.NurseLogList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            if (!(message.nurseLog && message.nurseLog.length))
                                                message.nurseLog = [];
                                            message.nurseLog.push($root.com.wmy.pets.model.proto.Player.NurseLog.decode(reader, reader.uint32()));
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a NurseLogList message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.NurseLogList} NurseLogList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            NurseLogList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a NurseLogList message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            NurseLogList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.nurseLog != null && message.hasOwnProperty("nurseLog")) {
                                    if (!Array.isArray(message.nurseLog))
                                        return "nurseLog: array expected";
                                    for (let i = 0; i < message.nurseLog.length; ++i) {
                                        let error = $root.com.wmy.pets.model.proto.Player.NurseLog.verify(message.nurseLog[i]);
                                        if (error)
                                            return "nurseLog." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates a NurseLogList message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.NurseLogList} NurseLogList
                             */
                            NurseLogList.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.NurseLogList)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.NurseLogList();
                                if (object.nurseLog) {
                                    if (!Array.isArray(object.nurseLog))
                                        throw TypeError(".com.wmy.pets.model.proto.Player.NurseLogList.nurseLog: array expected");
                                    message.nurseLog = [];
                                    for (let i = 0; i < object.nurseLog.length; ++i) {
                                        if (typeof object.nurseLog[i] !== "object")
                                            throw TypeError(".com.wmy.pets.model.proto.Player.NurseLogList.nurseLog: object expected");
                                        message.nurseLog[i] = $root.com.wmy.pets.model.proto.Player.NurseLog.fromObject(object.nurseLog[i]);
                                    }
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a NurseLogList message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.NurseLogList} message NurseLogList
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            NurseLogList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.nurseLog = [];
                                if (message.nurseLog && message.nurseLog.length) {
                                    object.nurseLog = [];
                                    for (let j = 0; j < message.nurseLog.length; ++j)
                                        object.nurseLog[j] = $root.com.wmy.pets.model.proto.Player.NurseLog.toObject(message.nurseLog[j], options);
                                }
                                return object;
                            };

                            /**
                             * Converts this NurseLogList to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            NurseLogList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for NurseLogList
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.NurseLogList
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            NurseLogList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.NurseLogList";
                            };

                            return NurseLogList;
                        })();

                        Player.Prop = (function() {

                            /**
                             * Properties of a Prop.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface IProp
                             * @property {number|null} [id] Prop id
                             * @property {number|null} [num] Prop num
                             */

                            /**
                             * Constructs a new Prop.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a Prop.
                             * @implements IProp
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.IProp=} [properties] Properties to set
                             */
                            function Prop(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * Prop id.
                             * @member {number} id
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @instance
                             */
                            Prop.prototype.id = 0;

                            /**
                             * Prop num.
                             * @member {number} num
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @instance
                             */
                            Prop.prototype.num = 0;

                            /**
                             * Creates a new Prop instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IProp=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.Prop} Prop instance
                             */
                            Prop.create = function create(properties) {
                                return new Prop(properties);
                            };

                            /**
                             * Encodes the specified Prop message. Does not implicitly {@link com.wmy.pets.model.proto.Player.Prop.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IProp} message Prop message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            Prop.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                                if (message.num != null && Object.hasOwnProperty.call(message, "num"))
                                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.num);
                                return writer;
                            };

                            /**
                             * Encodes the specified Prop message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.Prop.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IProp} message Prop message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            Prop.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a Prop message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.Prop} Prop
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            Prop.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.Prop();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            message.id = reader.int32();
                                            break;
                                        }
                                    case 2: {
                                            message.num = reader.int32();
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a Prop message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.Prop} Prop
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            Prop.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a Prop message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            Prop.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.id != null && message.hasOwnProperty("id"))
                                    if (!$util.isInteger(message.id))
                                        return "id: integer expected";
                                if (message.num != null && message.hasOwnProperty("num"))
                                    if (!$util.isInteger(message.num))
                                        return "num: integer expected";
                                return null;
                            };

                            /**
                             * Creates a Prop message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.Prop} Prop
                             */
                            Prop.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.Prop)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.Prop();
                                if (object.id != null)
                                    message.id = object.id | 0;
                                if (object.num != null)
                                    message.num = object.num | 0;
                                return message;
                            };

                            /**
                             * Creates a plain object from a Prop message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.Prop} message Prop
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            Prop.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.id = 0;
                                    object.num = 0;
                                }
                                if (message.id != null && message.hasOwnProperty("id"))
                                    object.id = message.id;
                                if (message.num != null && message.hasOwnProperty("num"))
                                    object.num = message.num;
                                return object;
                            };

                            /**
                             * Converts this Prop to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            Prop.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for Prop
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.Prop
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            Prop.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.Prop";
                            };

                            return Prop;
                        })();

                        Player.PetsBag = (function() {

                            /**
                             * Properties of a PetsBag.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface IPetsBag
                             * @property {Array.<com.wmy.pets.model.proto.Player.IProp>|null} [prop] PetsBag prop
                             */

                            /**
                             * Constructs a new PetsBag.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a PetsBag.
                             * @implements IPetsBag
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.IPetsBag=} [properties] Properties to set
                             */
                            function PetsBag(properties) {
                                this.prop = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * PetsBag prop.
                             * @member {Array.<com.wmy.pets.model.proto.Player.IProp>} prop
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @instance
                             */
                            PetsBag.prototype.prop = $util.emptyArray;

                            /**
                             * Creates a new PetsBag instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IPetsBag=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.PetsBag} PetsBag instance
                             */
                            PetsBag.create = function create(properties) {
                                return new PetsBag(properties);
                            };

                            /**
                             * Encodes the specified PetsBag message. Does not implicitly {@link com.wmy.pets.model.proto.Player.PetsBag.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IPetsBag} message PetsBag message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            PetsBag.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.prop != null && message.prop.length)
                                    for (let i = 0; i < message.prop.length; ++i)
                                        $root.com.wmy.pets.model.proto.Player.Prop.encode(message.prop[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified PetsBag message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.PetsBag.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.IPetsBag} message PetsBag message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            PetsBag.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a PetsBag message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.PetsBag} PetsBag
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            PetsBag.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.PetsBag();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            if (!(message.prop && message.prop.length))
                                                message.prop = [];
                                            message.prop.push($root.com.wmy.pets.model.proto.Player.Prop.decode(reader, reader.uint32()));
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a PetsBag message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.PetsBag} PetsBag
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            PetsBag.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a PetsBag message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            PetsBag.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.prop != null && message.hasOwnProperty("prop")) {
                                    if (!Array.isArray(message.prop))
                                        return "prop: array expected";
                                    for (let i = 0; i < message.prop.length; ++i) {
                                        let error = $root.com.wmy.pets.model.proto.Player.Prop.verify(message.prop[i]);
                                        if (error)
                                            return "prop." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates a PetsBag message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.PetsBag} PetsBag
                             */
                            PetsBag.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.PetsBag)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.PetsBag();
                                if (object.prop) {
                                    if (!Array.isArray(object.prop))
                                        throw TypeError(".com.wmy.pets.model.proto.Player.PetsBag.prop: array expected");
                                    message.prop = [];
                                    for (let i = 0; i < object.prop.length; ++i) {
                                        if (typeof object.prop[i] !== "object")
                                            throw TypeError(".com.wmy.pets.model.proto.Player.PetsBag.prop: object expected");
                                        message.prop[i] = $root.com.wmy.pets.model.proto.Player.Prop.fromObject(object.prop[i]);
                                    }
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a PetsBag message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.PetsBag} message PetsBag
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            PetsBag.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.prop = [];
                                if (message.prop && message.prop.length) {
                                    object.prop = [];
                                    for (let j = 0; j < message.prop.length; ++j)
                                        object.prop[j] = $root.com.wmy.pets.model.proto.Player.Prop.toObject(message.prop[j], options);
                                }
                                return object;
                            };

                            /**
                             * Converts this PetsBag to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            PetsBag.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for PetsBag
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.PetsBag
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            PetsBag.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.PetsBag";
                            };

                            return PetsBag;
                        })();

                        Player.NursePropList = (function() {

                            /**
                             * Properties of a NursePropList.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface INursePropList
                             * @property {Array.<com.wmy.pets.model.proto.Player.IProp>|null} [prop] NursePropList prop
                             */

                            /**
                             * Constructs a new NursePropList.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a NursePropList.
                             * @implements INursePropList
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.INursePropList=} [properties] Properties to set
                             */
                            function NursePropList(properties) {
                                this.prop = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * NursePropList prop.
                             * @member {Array.<com.wmy.pets.model.proto.Player.IProp>} prop
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @instance
                             */
                            NursePropList.prototype.prop = $util.emptyArray;

                            /**
                             * Creates a new NursePropList instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INursePropList=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.NursePropList} NursePropList instance
                             */
                            NursePropList.create = function create(properties) {
                                return new NursePropList(properties);
                            };

                            /**
                             * Encodes the specified NursePropList message. Does not implicitly {@link com.wmy.pets.model.proto.Player.NursePropList.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INursePropList} message NursePropList message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            NursePropList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.prop != null && message.prop.length)
                                    for (let i = 0; i < message.prop.length; ++i)
                                        $root.com.wmy.pets.model.proto.Player.Prop.encode(message.prop[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified NursePropList message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.NursePropList.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.INursePropList} message NursePropList message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            NursePropList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a NursePropList message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.NursePropList} NursePropList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            NursePropList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.NursePropList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            if (!(message.prop && message.prop.length))
                                                message.prop = [];
                                            message.prop.push($root.com.wmy.pets.model.proto.Player.Prop.decode(reader, reader.uint32()));
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a NursePropList message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.NursePropList} NursePropList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            NursePropList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a NursePropList message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            NursePropList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.prop != null && message.hasOwnProperty("prop")) {
                                    if (!Array.isArray(message.prop))
                                        return "prop: array expected";
                                    for (let i = 0; i < message.prop.length; ++i) {
                                        let error = $root.com.wmy.pets.model.proto.Player.Prop.verify(message.prop[i]);
                                        if (error)
                                            return "prop." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates a NursePropList message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.NursePropList} NursePropList
                             */
                            NursePropList.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.NursePropList)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.NursePropList();
                                if (object.prop) {
                                    if (!Array.isArray(object.prop))
                                        throw TypeError(".com.wmy.pets.model.proto.Player.NursePropList.prop: array expected");
                                    message.prop = [];
                                    for (let i = 0; i < object.prop.length; ++i) {
                                        if (typeof object.prop[i] !== "object")
                                            throw TypeError(".com.wmy.pets.model.proto.Player.NursePropList.prop: object expected");
                                        message.prop[i] = $root.com.wmy.pets.model.proto.Player.Prop.fromObject(object.prop[i]);
                                    }
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a NursePropList message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.NursePropList} message NursePropList
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            NursePropList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.prop = [];
                                if (message.prop && message.prop.length) {
                                    object.prop = [];
                                    for (let j = 0; j < message.prop.length; ++j)
                                        object.prop[j] = $root.com.wmy.pets.model.proto.Player.Prop.toObject(message.prop[j], options);
                                }
                                return object;
                            };

                            /**
                             * Converts this NursePropList to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            NursePropList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for NursePropList
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.NursePropList
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            NursePropList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.NursePropList";
                            };

                            return NursePropList;
                        })();

                        Player.Subject = (function() {

                            /**
                             * Properties of a Subject.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface ISubject
                             * @property {number|null} [id] Subject id
                             * @property {number|null} [process] Subject process
                             */

                            /**
                             * Constructs a new Subject.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a Subject.
                             * @implements ISubject
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.ISubject=} [properties] Properties to set
                             */
                            function Subject(properties) {
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * Subject id.
                             * @member {number} id
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @instance
                             */
                            Subject.prototype.id = 0;

                            /**
                             * Subject process.
                             * @member {number} process
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @instance
                             */
                            Subject.prototype.process = 0;

                            /**
                             * Creates a new Subject instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISubject=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.Subject} Subject instance
                             */
                            Subject.create = function create(properties) {
                                return new Subject(properties);
                            };

                            /**
                             * Encodes the specified Subject message. Does not implicitly {@link com.wmy.pets.model.proto.Player.Subject.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISubject} message Subject message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            Subject.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                                if (message.process != null && Object.hasOwnProperty.call(message, "process"))
                                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.process);
                                return writer;
                            };

                            /**
                             * Encodes the specified Subject message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.Subject.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISubject} message Subject message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            Subject.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a Subject message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.Subject} Subject
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            Subject.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.Subject();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            message.id = reader.int32();
                                            break;
                                        }
                                    case 2: {
                                            message.process = reader.int32();
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a Subject message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.Subject} Subject
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            Subject.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a Subject message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            Subject.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.id != null && message.hasOwnProperty("id"))
                                    if (!$util.isInteger(message.id))
                                        return "id: integer expected";
                                if (message.process != null && message.hasOwnProperty("process"))
                                    if (!$util.isInteger(message.process))
                                        return "process: integer expected";
                                return null;
                            };

                            /**
                             * Creates a Subject message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.Subject} Subject
                             */
                            Subject.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.Subject)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.Subject();
                                if (object.id != null)
                                    message.id = object.id | 0;
                                if (object.process != null)
                                    message.process = object.process | 0;
                                return message;
                            };

                            /**
                             * Creates a plain object from a Subject message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.Subject} message Subject
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            Subject.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.defaults) {
                                    object.id = 0;
                                    object.process = 0;
                                }
                                if (message.id != null && message.hasOwnProperty("id"))
                                    object.id = message.id;
                                if (message.process != null && message.hasOwnProperty("process"))
                                    object.process = message.process;
                                return object;
                            };

                            /**
                             * Converts this Subject to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            Subject.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for Subject
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.Subject
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            Subject.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.Subject";
                            };

                            return Subject;
                        })();

                        Player.School = (function() {

                            /**
                             * Properties of a School.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface ISchool
                             * @property {number|null} [qualification] School qualification
                             * @property {number|null} [process] School process
                             * @property {Array.<com.wmy.pets.model.proto.Player.ISubject>|null} [subject] School subject
                             */

                            /**
                             * Constructs a new School.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a School.
                             * @implements ISchool
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.ISchool=} [properties] Properties to set
                             */
                            function School(properties) {
                                this.subject = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * School qualification.
                             * @member {number} qualification
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @instance
                             */
                            School.prototype.qualification = 0;

                            /**
                             * School process.
                             * @member {number} process
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @instance
                             */
                            School.prototype.process = 0;

                            /**
                             * School subject.
                             * @member {Array.<com.wmy.pets.model.proto.Player.ISubject>} subject
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @instance
                             */
                            School.prototype.subject = $util.emptyArray;

                            /**
                             * Creates a new School instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISchool=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.School} School instance
                             */
                            School.create = function create(properties) {
                                return new School(properties);
                            };

                            /**
                             * Encodes the specified School message. Does not implicitly {@link com.wmy.pets.model.proto.Player.School.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISchool} message School message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            School.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.qualification != null && Object.hasOwnProperty.call(message, "qualification"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.qualification);
                                if (message.process != null && Object.hasOwnProperty.call(message, "process"))
                                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.process);
                                if (message.subject != null && message.subject.length)
                                    for (let i = 0; i < message.subject.length; ++i)
                                        $root.com.wmy.pets.model.proto.Player.Subject.encode(message.subject[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified School message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.School.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISchool} message School message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            School.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a School message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.School} School
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            School.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.School();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            message.qualification = reader.int32();
                                            break;
                                        }
                                    case 2: {
                                            message.process = reader.int32();
                                            break;
                                        }
                                    case 3: {
                                            if (!(message.subject && message.subject.length))
                                                message.subject = [];
                                            message.subject.push($root.com.wmy.pets.model.proto.Player.Subject.decode(reader, reader.uint32()));
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a School message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.School} School
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            School.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a School message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            School.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.qualification != null && message.hasOwnProperty("qualification"))
                                    if (!$util.isInteger(message.qualification))
                                        return "qualification: integer expected";
                                if (message.process != null && message.hasOwnProperty("process"))
                                    if (!$util.isInteger(message.process))
                                        return "process: integer expected";
                                if (message.subject != null && message.hasOwnProperty("subject")) {
                                    if (!Array.isArray(message.subject))
                                        return "subject: array expected";
                                    for (let i = 0; i < message.subject.length; ++i) {
                                        let error = $root.com.wmy.pets.model.proto.Player.Subject.verify(message.subject[i]);
                                        if (error)
                                            return "subject." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates a School message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.School} School
                             */
                            School.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.School)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.School();
                                if (object.qualification != null)
                                    message.qualification = object.qualification | 0;
                                if (object.process != null)
                                    message.process = object.process | 0;
                                if (object.subject) {
                                    if (!Array.isArray(object.subject))
                                        throw TypeError(".com.wmy.pets.model.proto.Player.School.subject: array expected");
                                    message.subject = [];
                                    for (let i = 0; i < object.subject.length; ++i) {
                                        if (typeof object.subject[i] !== "object")
                                            throw TypeError(".com.wmy.pets.model.proto.Player.School.subject: object expected");
                                        message.subject[i] = $root.com.wmy.pets.model.proto.Player.Subject.fromObject(object.subject[i]);
                                    }
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a School message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.School} message School
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            School.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.subject = [];
                                if (options.defaults) {
                                    object.qualification = 0;
                                    object.process = 0;
                                }
                                if (message.qualification != null && message.hasOwnProperty("qualification"))
                                    object.qualification = message.qualification;
                                if (message.process != null && message.hasOwnProperty("process"))
                                    object.process = message.process;
                                if (message.subject && message.subject.length) {
                                    object.subject = [];
                                    for (let j = 0; j < message.subject.length; ++j)
                                        object.subject[j] = $root.com.wmy.pets.model.proto.Player.Subject.toObject(message.subject[j], options);
                                }
                                return object;
                            };

                            /**
                             * Converts this School to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            School.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for School
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.School
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            School.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.School";
                            };

                            return School;
                        })();

                        Player.SchoolList = (function() {

                            /**
                             * Properties of a SchoolList.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @interface ISchoolList
                             * @property {number|null} [curEducation] SchoolList curEducation
                             * @property {Array.<com.wmy.pets.model.proto.Player.ISchool>|null} [school] SchoolList school
                             */

                            /**
                             * Constructs a new SchoolList.
                             * @memberof com.wmy.pets.model.proto.Player
                             * @classdesc Represents a SchoolList.
                             * @implements ISchoolList
                             * @constructor
                             * @param {com.wmy.pets.model.proto.Player.ISchoolList=} [properties] Properties to set
                             */
                            function SchoolList(properties) {
                                this.school = [];
                                if (properties)
                                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * SchoolList curEducation.
                             * @member {number} curEducation
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @instance
                             */
                            SchoolList.prototype.curEducation = 0;

                            /**
                             * SchoolList school.
                             * @member {Array.<com.wmy.pets.model.proto.Player.ISchool>} school
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @instance
                             */
                            SchoolList.prototype.school = $util.emptyArray;

                            /**
                             * Creates a new SchoolList instance using the specified properties.
                             * @function create
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISchoolList=} [properties] Properties to set
                             * @returns {com.wmy.pets.model.proto.Player.SchoolList} SchoolList instance
                             */
                            SchoolList.create = function create(properties) {
                                return new SchoolList(properties);
                            };

                            /**
                             * Encodes the specified SchoolList message. Does not implicitly {@link com.wmy.pets.model.proto.Player.SchoolList.verify|verify} messages.
                             * @function encode
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISchoolList} message SchoolList message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            SchoolList.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.curEducation != null && Object.hasOwnProperty.call(message, "curEducation"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.curEducation);
                                if (message.school != null && message.school.length)
                                    for (let i = 0; i < message.school.length; ++i)
                                        $root.com.wmy.pets.model.proto.Player.School.encode(message.school[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                                return writer;
                            };

                            /**
                             * Encodes the specified SchoolList message, length delimited. Does not implicitly {@link com.wmy.pets.model.proto.Player.SchoolList.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.ISchoolList} message SchoolList message or plain object to encode
                             * @param {$protobuf.default.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.default.Writer} Writer
                             */
                            SchoolList.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a SchoolList message from the specified reader or buffer.
                             * @function decode
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {com.wmy.pets.model.proto.Player.SchoolList} SchoolList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            SchoolList.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.com.wmy.pets.model.proto.Player.SchoolList();
                                while (reader.pos < end) {
                                    let tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1: {
                                            message.curEducation = reader.int32();
                                            break;
                                        }
                                    case 2: {
                                            if (!(message.school && message.school.length))
                                                message.school = [];
                                            message.school.push($root.com.wmy.pets.model.proto.Player.School.decode(reader, reader.uint32()));
                                            break;
                                        }
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a SchoolList message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {$protobuf.default.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {com.wmy.pets.model.proto.Player.SchoolList} SchoolList
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.default.util.ProtocolError} If required fields are missing
                             */
                            SchoolList.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a SchoolList message.
                             * @function verify
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            SchoolList.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.curEducation != null && message.hasOwnProperty("curEducation"))
                                    if (!$util.isInteger(message.curEducation))
                                        return "curEducation: integer expected";
                                if (message.school != null && message.hasOwnProperty("school")) {
                                    if (!Array.isArray(message.school))
                                        return "school: array expected";
                                    for (let i = 0; i < message.school.length; ++i) {
                                        let error = $root.com.wmy.pets.model.proto.Player.School.verify(message.school[i]);
                                        if (error)
                                            return "school." + error;
                                    }
                                }
                                return null;
                            };

                            /**
                             * Creates a SchoolList message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {com.wmy.pets.model.proto.Player.SchoolList} SchoolList
                             */
                            SchoolList.fromObject = function fromObject(object) {
                                if (object instanceof $root.com.wmy.pets.model.proto.Player.SchoolList)
                                    return object;
                                let message = new $root.com.wmy.pets.model.proto.Player.SchoolList();
                                if (object.curEducation != null)
                                    message.curEducation = object.curEducation | 0;
                                if (object.school) {
                                    if (!Array.isArray(object.school))
                                        throw TypeError(".com.wmy.pets.model.proto.Player.SchoolList.school: array expected");
                                    message.school = [];
                                    for (let i = 0; i < object.school.length; ++i) {
                                        if (typeof object.school[i] !== "object")
                                            throw TypeError(".com.wmy.pets.model.proto.Player.SchoolList.school: object expected");
                                        message.school[i] = $root.com.wmy.pets.model.proto.Player.School.fromObject(object.school[i]);
                                    }
                                }
                                return message;
                            };

                            /**
                             * Creates a plain object from a SchoolList message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {com.wmy.pets.model.proto.Player.SchoolList} message SchoolList
                             * @param {$protobuf.default.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            SchoolList.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                let object = {};
                                if (options.arrays || options.defaults)
                                    object.school = [];
                                if (options.defaults)
                                    object.curEducation = 0;
                                if (message.curEducation != null && message.hasOwnProperty("curEducation"))
                                    object.curEducation = message.curEducation;
                                if (message.school && message.school.length) {
                                    object.school = [];
                                    for (let j = 0; j < message.school.length; ++j)
                                        object.school[j] = $root.com.wmy.pets.model.proto.Player.School.toObject(message.school[j], options);
                                }
                                return object;
                            };

                            /**
                             * Converts this SchoolList to JSON.
                             * @function toJSON
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            SchoolList.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.default.util.toJSONOptions);
                            };

                            /**
                             * Gets the default type url for SchoolList
                             * @function getTypeUrl
                             * @memberof com.wmy.pets.model.proto.Player.SchoolList
                             * @static
                             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                             * @returns {string} The default type url
                             */
                            SchoolList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                                if (typeUrlPrefix === undefined) {
                                    typeUrlPrefix = "type.googleapis.com";
                                }
                                return typeUrlPrefix + "/com.wmy.pets.model.proto.Player.SchoolList";
                            };

                            return SchoolList;
                        })();

                        return Player;
                    })();

                    return proto;
                })();

                return model;
            })();

            return pets;
        })();

        return wmy;
    })();

    return com;
})();

export { $root as default };
