
Ext.define('etecsa.controller.to_generadas.upload', {
    extend: 'Ext.app.Controller',
    control: {
        'upload-window': {
            afterrender: "after_render_window"
        },
        'upload-window [xtype=grid]': {
            adjunto_download_action: "adjunto_download",
            adjunto_remove_action: "confirm_remove"
        },
        'upload-window [action=tarea-adjunto-action]': {
            click: "is_valid_upload"
        }
    },
    after_render_window: function (window) {
        this.window = window;
        this.form = window.down('form');
    },
    is_valid_upload: function () {
        if (this.form.isValid()) {
            this.save_upload();
        } else {
            Me.msg.question('<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.')
        }
    },
    save_upload: function () { var me=this;
        this.form.submit({
            success: function(form, action) {
                if (action.response.responseText == 'ok'){
                    form.reset();
                    me.window.store.reload();
                    me.window.file_store.reload();
                    Me.msg.question('Operación realizada exitosamente.');}
                else{
                    Me.show_toast(action.response.responseText);}
            },
            failure: function(form, action) {
                if (action.response.responseText == 'ok'){
                    form.reset();
                    me.window.store.reload();
                    me.window.file_store.reload();
                    Me.show_toast('Operación realizada exitosamente.');}
                else{
                    Me.msg.warning(action.response.responseText);}

            }
        });
    },
    // Adjunto column grid
    adjunto_download: function (record) {
        var down = Ext.create('etecsa.downloader');

       down.get({
            url: '/tarea_operativa/to/upload/file_down',
            params: { id: record.get('id') }
        });
       down.destroy();
    },
    confirm_remove: function (record) {
        console.log(454545);
        Ext.MessageBox.confirm('Confirmación', 'Desea eliminar al Ejecutante?', confirm, this);
        function confirm (btn) {
            if (btn === 'yes') {
                this.adjunto_remove(record);
            }
        }
    },
    adjunto_remove: function (record) { var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/upload/file_remove',
            params: { id: record.get('id') },
            success: function(response) {
                if (response.responseText === '') {
                    Me.show_toast('Operación realizada exitosamente.');
                } else {
                    Me.msg.warning(response.responseText);
                }
                me.window.file_store.reload();
                me.window.store.reload();
            },
            failure: function(response){
                Me.msg.error(response.responseText);
            }
        });
    }
});


