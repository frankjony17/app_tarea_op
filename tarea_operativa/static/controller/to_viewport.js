
Ext.define('etecsa.controller.to_viewport', {
    extend: 'Ext.app.Controller',
    control: {
        'viewport-tarea-operativa': {
            afterrender: "after_render_viewport",
            resize: "resize"
        },
        'viewport-tarea-operativa [iconCls=x-fa fa-download]': {
            click: "show_assigned_task"
        },
        'viewport-tarea-operativa [iconCls=x-fa fa-upload]': {
            click: "show_generates_task"
        },
        '#admin-logout-to': {
            click: "logout"
        },
        // MENU OPCIONES
        'tarea-op-opciones-menu': {
            'categoria_item_menu': "show_categoria"
        },
        'tarea-op-pendientes-menu': {
            'me_generates_task': "show_generates_task"
        },
        // GRID Generadas Pendientes
        'tarea-operativa-menu': {
            'chequear_resumen_tarea_action': "show_chequear_resumen_tarea"
        },
        // GRID Asignadas Pendientes
        'asignadas-pendiente-grid': {
            'gestionar_grid_action': "from_ejecutante_accion_panel_edit_ultima_entrada"
        }
    },
    resize: function (viewport) {
        var center = Ext.getCmp('center-tabpanel-region-id');
        center.setHeight(viewport.getHeight() - 85);
    },
    after_render_viewport: function (viewport) {
        this.viewport = viewport;
        this.tabpanel = viewport.down('tabpanel');
    },
    logout: function () {
        location.href = '/security_admin/logout';
    },
    // Show Tabs
    show_categoria: function () {
        if (!this.exist_tab('to-categoria-tab')) {
            this.add_tab_panel({
                title: 'Categoría',
                iconCls: 'x-fa fa-map-signs',
                items: Ext.create('etecsa.view.categoria.to_categoria_grid'),
                id: 'to-categoria-tab'
            });
        } else {
            this.tabpanel.setActiveTab('to-categoria-tab');
        }
    },
    show_generates_task: function () {
        if (!this.exist_tab('to-generadas-pendiente-tab')) {
            this.add_tab_panel({
                title: 'Tareas Operativas (GENERADAS)',
                iconCls: 'x-fa fa-upload',
                items: Ext.create('etecsa.view.tareas_op.generadas_pendiente_grid'),
                id: 'to-generadas-pendiente-tab',
                listeners: {
                    activate: function(){
                        Ext.getCmp('progressbarpager-tarea-op').show();
                    },
                    deactivate: function(){
                        Ext.getCmp('progressbarpager-tarea-op').hide();
                    }
                }
            });
        } else {
            this.tabpanel.setActiveTab('to-generadas-pendiente-tab');
        }
    },
    show_chequear_resumen_tarea: function (record) {
        var id = 'to-resumen-chequeo-panel-' + record.get('id');
        if (!this.exist_tab(id)) {
            this.add_tab_panel({
                title: 'Resumen:'+ record.get('numero'),
                iconCls: 'x-fa fa-check-square-o',
                items: Ext.create('etecsa.view.tareas_op.resumen_chequeo.resumen_chequeo_panel', {
                    record: record
                }),
                id: id
            });
        } else {
            this.tabpanel.setActiveTab(id);
        }
    },
    show_assigned_task: function () {
        if (!this.exist_tab('to-asignadas-pendiente-tab')) {
            this.add_tab_panel({
                title: 'Tareas Operativas (Asignadas)',
                iconCls: 'x-fa fa-download',
                items: Ext.create('etecsa.view.tareas_op.asignadas_pendiente_grid'),
                id: 'to-asignadas-pendiente-tab',
                listeners: {
                    activate: function(){
                        Ext.getCmp('progressbarpager-asignadas-tarea-op').show();
                    },
                    deactivate: function(){
                        Ext.getCmp('progressbarpager-asignadas-tarea-op').hide();
                    }
                }
            });
        } else {
            this.tabpanel.setActiveTab('to-asignadas-pendiente-tab');
        }
    },
    show_ejecutante_accion: function (record, accion_store, ejecutante_store) {
        if (this.exist_tab('to-ejecutante-accion-tab')) {
            this.tabpanel.remove('to-ejecutante-accion-tab');
        }
        this.add_tab_panel({
            title: 'Tareas Operativas (Ejecutante-Acción)',
            iconCls: 'x-fa fa-download',
            items: Ext.create('etecsa.view.tareas_op.ejecutante_accion.ejecutante_accion_panel', {
                record: record,
                accion_store: accion_store,
                ejecutante_store: ejecutante_store
            }),
            id: 'to-ejecutante-accion-tab'
        });
    },
    // TabPanel add
    exist_tab: function (id) { var me = this;
        var exist_tab = false;
        Ext.Array.each(me.tabpanel.items.keys, function(key) {
            if (key == id) {
                exist_tab = true;
            }
        });
        return exist_tab;
    },
    add_tab_panel: function (tab) {
        if (this.tabpanel.items.length > 3) {
            this.tabpanel.remove(this.tabpanel.items.items[0]);
        }
        this.tabpanel.add(tab);
        this.tabpanel.setActiveTab(tab.id);
    },
    // Ejecutante-Accion-Panel > edit ultima_entrada
    from_ejecutante_accion_panel_edit_ultima_entrada: function (record) {
        var accion_store = Ext.create('Ext.data.Store', {
                fields: ['id','eid','fecha','observacion','ultima_entrada','requiere_adjunto','adjunto','estado','estado_real'],
                autoSync: false,
                proxy : {
                    type: 'ajax',
                    url: '/tarea_operativa/to/ejecutante_accion/accion_list',
                    api: {
                        create: '/tarea_operativa/to/ejecutante_accion/accion_add',
                        update: '/tarea_operativa/to/ejecutante_accion/accion_edit',
                        destroy: '/tarea_operativa/to/ejecutante_accion/accion_remove'
                    },
                    extraParams: {
                        ejecutante_id: record.get('ejecutante_id')
                    }
                }
            }),
            ejecutante_store = Ext.create('Ext.data.Store', {
                fields: ['id','fecha','observacion','ultima_entrada','requiere_adjunto','adjunto','estado','estado_real'],
                proxy : {
                    url: '/tarea_operativa/to/ejecutante/ultima_entrada_edit',
                    type : 'ajax'
                }
            });

        ejecutante_store.load({params:{id:record.get('ejecutante_id')}});
        this.show_ejecutante_accion(record, accion_store, ejecutante_store);
    }
});


