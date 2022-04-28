function scrol (id){
	const elem=document.getElementById(id)
	elem.scrollIntoView({ behavior: 'smooth' });
	
}


function myFunction(x) {
	x.classList.toggle("change");
	var x = document.getElementById("menu");
	if (x.style.display === "block") {
	  x.style.display = "none";
	} else {
	  x.style.display = "block";
	}
  }
