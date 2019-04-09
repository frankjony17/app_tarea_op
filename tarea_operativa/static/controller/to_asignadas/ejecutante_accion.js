
Ext.define('etecsa.controller.to_asignadas.ejecutante_accion', {
    extend: 'Ext.app.Controller',
    control: {
        'ejecutante-accion-panel': {
            resize: "resize"
        },
        'ejecutante-accion-panel [name=grid-ejecutante-accion]': {
            edit: 'edit_ejecutante',
            cellclick: "adjunto",
            afterrender: "afterrender_ejecutante_grid"
        },
        'ejecutante-accion-panel [name=grid-accion-ejecutante]': {
            edit: 'edit_accion_grid',
            afterrender: "afterrender_accion_grid",
            remove_grid_action: "remove_accion_grid"
        },
        'ejecutante-accion-panel [action=on_add_accion]': {
            click: "add_accion"
        },
        'ejecutante-accion-panel [name=checkcolumn-ejecutante-panel]': {
            checkchange: "confirm_finished_tarea"
        },
        'ejecutante-accion-panel [action=panel-adjunto-show]': {
            click: "show_adjunto_window"
        },
        // Adjunto
        'upload-window': {
            afterrender: "after_render_window"
        },
        'upload-window [action=ejecutante-adjunto-action]': {
            click: "is_valid_upload"
        },
        'upload-grid [xtype=grid]': {
            adjunto_download_action: "adjunto_download"
        }
    },
    resize: function (panel) {
        var center = Ext.getCmp('center-tabpanel-region-id'),
            ejecutante_grid = panel.down('[name=grid-accion-ejecutante]');

        panel.setHeight(center.getHeight() - 50);
        ejecutante_grid.setHeight(center.getHeight() - 307);
    },
    afterrender_ejecutante_grid: function (grid) {
        this.ejecutante_grid = grid;
        this.ejecutante_store = grid.store;
    },
    afterrender_accion_grid: function (grid) {
        this.accion_grid = grid;
        this.accion_store = grid.store;
    },
    after_render_window: function (window) {
        this.window = window;
        this.form = window.down('form');
    },
    // Ejecutantes
    confirm_finished_tarea: function (checkColumn, rowIndex, checked, record) {
        if (record.get('requiere_adjunto') && record.get('adjunto') === 0) {
            Me.msg.question('<b>Adjunte un fichero</b><br>La Tarea operativa requiere adjuntos.');
        } else {
            if (checked) {
                Ext.MessageBox.confirm('Cerrar Tarea Operativa', 'Usted está listo para Cerrar la Tarea: '+ this.ejecutante_grid.record.get('numero') +'?', confirmClose, this);
                function confirmClose (btn) {
                    if (btn === 'yes') {
                        this.finished_tarea(record.get('id'), checked);
                    }
                }
            } else {
                Ext.MessageBox.confirm('Abrir Tarea Operativa', 'Desea abrir la Tarea: '+ this.ejecutante_grid.record.get('numero') +'?', confirmOpen, this);
                function confirmOpen (btn) {
                    if (btn === 'yes') {
                        this.finished_tarea(record.get('id'), checked);
                    }
                }
            }
        }
        this.ejecutante_store.reload();
    },
    finished_tarea: function (id, checked) {
        var me = this;
        Ext.Ajax.request({
            url: '/tarea_operativa/to/ejecutante_accion/ejecutante_edit',
            params: {
                id: id,
                estado: checked
            },
            success: function(){
                me.ejecutante_store.reload();
            },
            failure: function(response){
                Me.msg.warning(response.responseText);
            }
        });
    },
    edit_ejecutante: function (editor, context) {var me=this;
        if (!context.record.get('estado')) {
            Ext.Ajax.request({
                url: '/tarea_operativa/to/ejecutante_accion/ejecutante_edit',
                params: {
                    id: context.record.get('id'),
                    observacion: context.record.get('observacion')
                },
                success: function(){
                    me.ejecutante_store.reload();
                },
                failure: function(response){
                    Me.msg.warning(response.responseText);
                }
            });
        } else {
            Me.msg.question('<b>Acción no válida:</b><br>La Tarea operativa está <b>CERRADA</b>.');
        }
    },
    // Adjunto Ejecutante
    adjunto: function(view, td, cellIndex, record) {
        if (cellIndex === 5) {
            var me = this, file_store = Ext.create('etecsa.store.to_upload');
            file_store.load({params:{ejecutante_pk:record.get('id')}});
            Ext.create('etecsa.view.tareas_op.adjunto.to_upload_form', {
                store: me.ejecutante_store,
                tarea_id: null,
                ejecutante_pk: record.get('id'),
                file_store: file_store,
                button_action: 'ejecutante-adjunto-action'
            });
        }
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
    // Adjunto Tarea Operativa
    show_adjunto_window: function () {
        var file_store = Ext.create('etecsa.store.to_upload');
            file_store.load({params:{tarea_operativa_pk:this.ejecutante_grid.record.get('id')}});
        Ext.create('etecsa.view.tareas_op.adjunto.to_upload_grid', {
            file_store: file_store
        });
    },
    adjunto_download: function (record) {
        var down = Ext.create('etecsa.downloader');
       down.get({
            url: '/tarea_operativa/to/upload/file_down',
            params: { id: record.get('id') }
        });
       down.destroy();
    },
    // Acciones
    add_accion: function () {
        var me=this;
        this.accion_grid.store.insert(0, {
            fecha: Ext.util.Format.date(new Date(), 'Y-m-d'),
            descripcion: '',
            pronostico: null,
            ejecutante_id: me.accion_grid.ejecutante_id
        });
        this.accion_grid.findPlugin('cellediting').startEdit(0, 1);
    },
    edit_accion_grid: function (editor, context) {
        var fun = function () {
            context.grid.store.sync();
        };
        this.is_possible(context.record, fun)
    },
    remove_accion_grid: function (record) {
        var me = this, fun = function () {
            me.accion_store.remove(record);
            me.accion_store.sync();
        };
        this.is_possible(record, fun)
    },
    // If fecha === new Date() I can execute the operation > record has fecha
    is_possible: function (record, fun) {
        var date = new Date(),value_date=Ext.util.Format.date(record.get('fecha'), 'Y-m-d').split('-'),remove_date=new Date(value_date[0],parseInt(value_date[1]) - 1,parseInt(value_date[2]));
        if (parseInt(remove_date.getFullYear()) === parseInt(date.getFullYear())) {
            if (parseInt(remove_date.getMonth()) === parseInt(date.getMonth())) {
                if (parseInt(remove_date.getDate()) === parseInt(date.getDate())) {
                    fun();
                } else {
                    Me.msg.question('Solo se puede gestionar una Acción el día que fue creada..');
                }
            } else {
                Me.msg.question('Solo se puede gestionar una Acción el día que fue creada..');
            }
        } else {
            Me.msg.question('Solo se puede gestionar una Acción el día que fue creada..');
        }
        this.accion_store.reload();
    }
});