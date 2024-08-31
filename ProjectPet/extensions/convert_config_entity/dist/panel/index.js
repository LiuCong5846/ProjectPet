'use strict';

const fs = require('fs');
const path = require('path');

module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show_create_config_entity') },
        hide() { console.log('hide_create_config_entity') },
        resize() {
            console.log(this.clientHeight);
            console.log(this.clientWidth);
        }
    },
    template: fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'),
    style: `
    ui-asset {margin: 15px 5% 5px; width: 90%}
    ui-button {margin: 15px 5% 5px; width: 90%}
    `,
    $: {
        asset: '.asset_entity',
        btn_create_all: '.btn_create_all',
        btn_create: '.btn_create',
    },
    methods: {

    },
    ready() {
        this.$.btn_create_all.addEventListener('confirm', () => {
            Editor.Message.send('convert_config_entity', 'create_config_entitys');
        });

        this.$.btn_create.addEventListener('confirm', () => {
            const uuid = this.$.asset.value;
            if (uuid && uuid.length > 0) {
                Editor.Message.send('convert_config_entity', 'create_config_entity', uuid);
            } else {
                console.log("There is no asset");
            }
        })
    },
    beforeClose() {

    },
    close() {

    },
});