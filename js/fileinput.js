$(document).on('change', '.btn-file :file', function()
{
    var label = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
    var input = $(this).parents('.input-group').find('input:text');
    input.val(label);
});
