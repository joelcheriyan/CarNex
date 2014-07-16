window.onload = function()
{
    var dropdown = document.getElementById('sort-dropdown');
    var items = dropdown.getElementsByTagName('a');

    var index;
    for (index = 0; index < items.length; index ++)
    {
        items[index].onclick = changeSortText;
    }
}

function changeSortText()
{
    document.getElementById("sort-btn").innerHTML = 'Sort by: ' + this.innerHTML
        + ' <span class="caret"></span>';
    return false;
}
