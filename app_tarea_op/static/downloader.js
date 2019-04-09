
Ext.define('etecsa.downloader',{

    /**
     * Singleton class
     * @type {Boolean}
     */
    downloadFrame : null,
    downloadForm: null,

    /**
     * Get/Download from url
     * @param config
     */
    get: function (config){
        var me = this,
            body = Ext.getBody();
            config = config || {};

        /**
         * Support for String config as url
         */
        if(Ext.isString(config)){
            config = {
              url: config
            };
        }
        me.downloadFrame = body.createChild({
            tag: 'iframe',
            cls: 'x-hidden',
            // id: 'app-upload-frame',
            name: 'uploadframe'
         });
        me.downloadForm = body.createChild({
            tag: 'form',
            cls: 'x-hidden',
            // id: 'app-upload-form',
            target: me.downloadFrame
        });
        Ext.Ajax.request({
            url: config.url || '.',
            params: config.params || {},
            form: me.downloadForm,
            isUpload: true,
            scope: me,
            success: function () {

            },
            failure: function(response) {
                Me.msg.error(response.responseText);
            }
        });
    }
});