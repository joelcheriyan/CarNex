/*
 * Copy values from a file input to an input text field that can be better
 * styled.
 * Modified from:
 * http://www.surrealcms.com/blog/whipping-file-inputs-into-shape-with-bootstrap-3
 */

$(document).on('change', '.btn-file :file', function()
{
    var label = $(this).val().replace(/\\/g, '/').replace(/.*\//, '');
    var input = $(this).parents('.input-group').find('input:text');
    input.val(label);
});
