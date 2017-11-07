function goToHighlight(isUp)
{
	if(document.getElementsByClassName("clsSearchCurr")[0]){
		hlId = document.getElementsByClassName("clsSearchCurr")[0].getAttribute('id');
		
		countCls = document.getElementsByClassName("clsSearchCurr").length;
		for(cls = 0; cls < countCls; cls++)
			document.getElementsByClassName("clsSearchCurr")[0].className = "clsSearch";
		hlIdFst = parseInt(hlId.split('_')[1]);
	
	  if(isUp)
	  {
		iIdTerm = hlIdFst - 1;
		if(iIdTerm <= 0) 
		{
			lstCls = document.getElementsByClassName("clsSearch");
			hlId = lstCls[lstCls.length - 1].getAttribute('id'); 
			iIdTerm = parseInt(hlId.split('_')[1]);
		}
	  }
	  else
		iIdTerm = hlIdFst + 1;
	  jIdTerm = 1;
		if(!document.getElementById("findScroll_" + iIdTerm + "_" + jIdTerm))
			iIdTerm = 1;
		document.getElementById("findScroll_" + iIdTerm + "_" + jIdTerm).className = 'clsSearchCurr';
		jIdTerm++;
		while(document.getElementById("findScroll_" + iIdTerm + "_" + jIdTerm))
		{
			document.getElementById("findScroll_" + iIdTerm + "_" + jIdTerm).className = 'clsSearchCurr';
			jIdTerm++;
		}
		
		document.getElementsByClassName("clsSearchCurr")[0].scrollIntoView(false);
	  
	}

}

function searchOnPage(term, wholeWord, matchCase) 
{
  
  
  
  var delClsElems = document.querySelectorAll('.clsSearch');
  for (var i=0; i<delClsElems.length; i++)  {
	var parentDelElems = delClsElems[i].parentNode, 
	txtElems = document.createTextNode(delClsElems[i].innerHTML);
	parentDelElems.replaceChild(txtElems, delClsElems[i]);
  }
				
  var delCurrElems = document.querySelectorAll('.clsSearchCurr');
  for (var i=0; i<delCurrElems.length; i++)  {
	var parentCurrElems = delCurrElems[i].parentNode, 
	txtElems = document.createTextNode(delCurrElems[i].innerHTML);
	parentCurrElems.replaceChild(txtElems, delCurrElems[i]);
  }
  
  
  if (!term)  {
	  
	
    return false;
  }
  
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
	
    return false;
  }
  
  var allText = document.body.innerHTML;
  
 
 
  var newBodyText = "";
  var i = -1;
  var lTerm;
  var lAllText;
  var nextSym = 0;
  var firstSym = 0;
  var endSkobka = 0;
  var selTag = "";
  var saveWord = "";
  var begWord = false;
  var begSym = "";
  var fstIdTerm = 1;
  var secIdTerm = 1;
  
  
  if(matchCase)
  {
	lTerm = term;
	lAllText = allText;
  }
  else{
	lTerm = term.toLowerCase();
	lAllText = allText.toLowerCase();
  }
  
  
  
  while (allText.length > 0) {
	
	secIdTerm = 1;
    i = lAllText.indexOf(lTerm.substring(0, 1), i+1);
	begWord = true;
	
    if (i < 0) {
      newBodyText += allText;
      allText = "";
    } else {
    
	  if (wholeWord)
	  {
		  re = new RegExp("[^|^_0-9a-zA-Zа-яёА-ЯЁ]");
		  begWord = re.test(lAllText[i-1]);
	  }
	  
	  if(begWord){
	
      if (allText.lastIndexOf(">", i) >= allText.lastIndexOf("<", i)) {
       
        if (lAllText.lastIndexOf("/script>", i) >= lAllText.lastIndexOf("<script", i)) {
		if (lAllText.lastIndexOf("/title>", i) >= lAllText.lastIndexOf("<title", i)) {
		if (lAllText.lastIndexOf("/style>", i) >= lAllText.lastIndexOf("<style", i)) {
		if (lAllText.lastIndexOf("/div>", i) >= lAllText.lastIndexOf('<div id="searchdiv"', i)) {
		if (lAllText.lastIndexOf("/div>", i) >= lAllText.lastIndexOf('<div style="visibility: visible;" id="searchDiv"', i)){
		  nextSym = 1;
		  firstSym = 0;
		  saveIndex = i;
		  saveWord = "";
		  saveWordTxt = allText[i];
		  lenWord = 0;
		  clsSearch = "";
		  while (lTerm[firstSym + nextSym]){
			  if(lAllText[i + nextSym] == lTerm[firstSym + nextSym])
			  {
				saveWordTxt = saveWordTxt + allText[i + nextSym];
				nextSym++;
					
			  }
			  else{
				  if (lAllText[i + nextSym] == "<"){
					
					
					clsSearch = "class = 'clsSearch' id='findScroll_" + fstIdTerm + "_" + secIdTerm + "'"; 
					
					
					saveWord = saveWord + "<font "+clsSearch+">" + saveWordTxt + "</font>";
					clsSearch = "";
					secIdTerm++;
					lenWord = lenWord + saveWordTxt.length;
					saveWordTxt = "";
					endSkobka = lAllText.indexOf(">", i + nextSym);
					selTag = allText.substring(i + nextSym, endSkobka + 1);
					lenWord = lenWord + selTag.length;
					saveWord = saveWord + selTag;
					
					i = endSkobka - nextSym + 1;
					
				  }
				  else{
				    saveIndex++;
				    saveWord = "";
					saveWordTxt = "";
					
					break;
				  } 
					
			  }
			  
			  
			  
		  }
		  
		  if(saveWordTxt.length > 0){
			 
			lenWord = lenWord + saveWordTxt.length;
			clsSearch = "class = 'clsSearch' id='findScroll_" + fstIdTerm + "_" + secIdTerm + "'";
			
			saveWord = saveWord + "<font "+clsSearch+">" + saveWordTxt + "</font>";
			clsSearch = "";
			secIdTerm++;
			
		  }
		  else lenWord = 0;
		  
		 
			  
		  i = saveIndex;
		  
		  if(saveWord.length > 0)
		  {
		  
			if (wholeWord)
			{
			
			  re2 = new RegExp("[^_0-9a-zA-Zа-яёА-ЯЁ|$]");
			  if(!re.test(lAllText[i + lenWord])){
				saveWord = "";
				lenWord = 0;
				
			  }
			  else fstIdTerm++;
			}
			else fstIdTerm++;
			
			
			
		  }
	
		  newBodyText += allText.substring(0, i) + saveWord;
		  
		  allText = allText.substr(i + lenWord);
		  if(matchCase)
           lAllText = allText;
		  else
		   lAllText = allText.toLowerCase();
          i = -1;
		}
		}
		}
		}
        }
      }
	  }
    }
  }
  
  
  
  document.body.innerHTML = newBodyText;
  document.getElementById("searchField").value = term;
  document.getElementById("searchField").focus();
  document.getElementById("searchField").selectionStart = document.getElementById("searchField").value.length;
  
  iIdTerm = 1;
  jIdTerm = 1;
  if(document.getElementById("findScroll_" + iIdTerm + "_" + jIdTerm))
  {

	document.getElementById("findScroll_" + iIdTerm + "_" + jIdTerm).className = 'clsSearchCurr';
	jIdTerm++;
	while(document.getElementById("findScroll_" + iIdTerm + "_" + jIdTerm))
	{
		document.getElementById("findScroll_" + iIdTerm + "_" + jIdTerm).className = 'clsSearchCurr';
		jIdTerm++;
	}
	
	document.getElementsByClassName("clsSearchCurr")[0].scrollIntoView(false);
	
  }
  else alert("Not found");
  
  
  
  return true;

}



window.onload = function () {
	
	
	
    document.onkeydown = function (e) {
        e = e || window.event;
        var k = e.keyCode,
            elem = document.getElementById('searchDiv');
        if (k == 115){ 
			if(!document.getElementById('searchDiv'))
			{
				var elemSearch = document.createElement('div');
				elemSearch.id = "searchDiv";
				elemSearch.style.visibility = 'visible';
				elemSearch.innerHTML = "<input type = 'text' id = 'searchField' onkeydown='if (event.keyCode == 13) searchOnPage(document.getElementById(\"searchField\").value, document.getElementById(\"wholeWord\").checked, document.getElementById(\"matchCase\").checked);' oninput = 'searchOnPage(document.getElementById(\"searchField\").value, document.getElementById(\"wholeWord\").checked, document.getElementById(\"matchCase\").checked);'><input id='searchButton' type = 'button' value = 'Search' onclick = 'searchOnPage(document.getElementById(\"searchField\").value, document.getElementById(\"wholeWord\").checked, document.getElementById(\"matchCase\").checked);'><span id='spanChb'><input type = 'checkbox' id = 'wholeWord'> whole word</span>&nbsp;&nbsp;&nbsp;<span id='spanChb'><input type = 'checkbox' id = 'matchCase'> match case</span><img src = 'searchOnPage/images/arrow_up.png' class = 'arrowSearch' onclick = 'goToHighlight(true);'><img src = 'searchOnPage/images/arrow_down.png' class = 'arrowSearch' onclick = 'goToHighlight(false);'>";
				
				document.body.insertBefore(elemSearch, document.body.firstChild);
				document.getElementById("searchField").focus();
			}
			else{
				if(elem.style.visibility == 'hidden')
				{
					elem.style.visibility = 'visible';
					document.getElementById("searchField").focus();
				}
				else{
					elem.style.visibility = 'hidden';
					var delClsElems = document.querySelectorAll('.clsSearch');
					for (var i=0; i<delClsElems.length; i++)  {
						var parentDelElems = delClsElems[i].parentNode, 
							txtElems = document.createTextNode(delClsElems[i].innerHTML);
						parentDelElems.replaceChild(txtElems, delClsElems[i]);
					}
					
					var delCurrElems = document.querySelectorAll('.clsSearchCurr');
					for (var i=0; i<delCurrElems.length; i++)  {
						var parentCurrElems = delCurrElems[i].parentNode, 
							txtElems = document.createTextNode(delCurrElems[i].innerHTML);
						parentCurrElems.replaceChild(txtElems, delCurrElems[i]);
					}
				}
			}
			
		}
	}
}