$(function() {
    const $import = $('#txtImport');
    const $edit = $('#txtEdit');
    const $export = $('#txtExport');

    $import.on('blur', (e) => {
        try {
            const jsonSave = JSON.parse(pako.ungzip(atob($import.val()), { to: 'string' }));
            $edit.val(JSON.stringify(jsonSave, null, 2));
            $edit.attr('disabled', false);
        } catch (e) {
            $edit.val('');
            $edit.attr('disabled', true);
            $export.val('');
            $export.attr('disabled', true);
            return;
        }
    });

    $edit.on('blur', (e) => {
        try {
            const jsonSave = $edit.val();
            JSON.parse(jsonSave);
            const strSave = btoa(pako.gzip(jsonSave, { to: 'string' }));
            $export.val(strSave);
            $export.attr('disabled', false);
        } catch (e) {
            $export.val('');
            $export.attr('disabled', true);
            return;
        }
    });
});
