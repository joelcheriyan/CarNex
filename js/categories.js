window.onload = function()
{
    var dropdown = document.getElementById('category-dropdown');
    var items = dropdown.getElementsByTagName('a');

    var index;
    for (index = 0; index < items.length; index ++)
    {
        items[index].onclick = changeSubjectText;
    }
}

function changeSubjectText()
{
    if (this.innerHTML == "(no subject)")
    {
        text = "";
    }

    else
    {
        text = this.innerHTML;
    }

    document.getElementById("field-subject").value = text;
    return false;
}
