function ChargerInfo(el) {
  var code = el.value;
  var mode = document.getElementById("typefichier").value;

  
    if(mode == "xml"){
      AfficherInfoXml(code);
      GetDescription(code);
    }
    else{
      AfficherInfoJson(code);
      GetDescription(code);
    }

  }


function AfficherInfoJson(nomCharger)
{
  var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			 peintJsonConcerne = GetPeintJsonByNom(nomCharger,JSON.parse(xhr.responseText));
       AfficherPeintureJson(peintJsonConcerne,nomCharger);
		}
	}
	
	xhr.open("GET", "ajax/peintures.json", true);
	xhr.send();


}

function AfficherInfoXml(nomCharger){
  var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			peint = GetPeintXmlByNom(nomCharger,xhr.responseXML);
      AfficherPeintureXml(peint,nomCharger);
		}
	}
	
	xhr.open("GET", "ajax/peintures.xml", true);
	xhr.send();
}





function AfficherPeintureJson(Peint,code){
  ClearPage();

  var imagePath = "img/"+code+".jpg";

  image = document.getElementById("peinture")
  image.src = imagePath;

  titre = document.getElementById("titre");
  titre.appendChild(document.createTextNode(Peint.titre));

  artiste = document.getElementById("artiste");
  artiste.appendChild(document.createTextNode(Peint.artiste));

  prix = document.getElementById("prix");
  prix.appendChild(document.createTextNode(Peint.prix));

}


function AfficherPeintureXml(Peint,code){
  ClearPage();

  var imagePath = "img/"+code+".jpg";
  image = document.getElementById("peinture")
  image.src = imagePath;

  titre = document.getElementById("titre");
  var strTitre = getElementsByTagName("titre")[0].firstChild.nodeValue;
  titre.appendChild(document.createTextNode(strTitre));

  artiste = document.getElementById("artiste");
  prix = document.getElementById("prix");


}

function AfficherDescription(description)
{
  ClearDescription();
  info = document.getElementById("info");
  info.appendChild(document.createTextNode(description));

}

function GetDescription(nom)
{
  var xhr = new XMLHttpRequest();
  var fileString = "ajax/"+ nom + ".txt";
  var description;
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
      description = xhr.responseText;
      AfficherDescription(description);
		}
	}
	
	xhr.open("GET", fileString, true);
	xhr.send();


}

function GetPeintXmlByNom(nom,response)
{
  for (i = 0; i < response.length; i++) {
    if(nom == response[i].getElementByTagName("code")){
      var peintSel =  response[i];
      return peintSel;
    }
	}
}

function GetPeintJsonByNom(nom,jsonResponse)
{
  response = jsonResponse.peinture;
  for (i = 0; i < response.length; i++) {
    if(nom == response[i].code){
      var peintSel =  response[i];
      return peintSel;
    }
	}
}

function ClearPage(){

  titre = document.getElementById("titre");
  while (titre.firstChild) {
		titre.removeChild(titre.firstChild);
	}

  artiste = document.getElementById("artiste");
  while (artiste.firstChild) {
		artiste.removeChild(artiste.firstChild);
	}

  prix = document.getElementById("prix");
  while (prix.firstChild) {
		prix.removeChild(prix.firstChild);
	}
  
}

function ClearDescription()
{
  info = document.getElementById("info");
  while(info.firstChild)
  {
    info.removeChild(info.firstChild);
  }

}