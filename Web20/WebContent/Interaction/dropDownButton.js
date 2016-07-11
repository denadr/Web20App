function dropDown() 
{
    document.getElementById('myDropDownContent').classList.toggle('show');
}

window.onclick = function(event) 
{
	if (!event.target.matches('.dropDownButton')) 
	{
		var dropdowns = document.getElementsByClassName('dropDownContent');
		for (var n = 0; n < dropdowns.length; n++) 
		{
			if (dropdowns[n].classList.contains('show')) 
			{
				dropdowns[n].classList.remove('show');
			}
		}
	}
}

document.getElementById('myDropDownButton').addEventListener('click', dropDown);