
var query1 = -1;
var loadedfrompreviossession=false;
$(document).ready(function() {
	
	$('body').append('<div id="ajaxBusy"><p><img src="assets/images/loading.gif"></p></div>');

	
 /* $( "#target" ).click(function() {
	//alert( "Handler for .click() called." );
	$("#inner_tbl").html(buildTable(getJsonVar()));
	});*/
	
	var localFile = localStorage.getItem("LocalJson");
	if (localFile != null) {
		$('#ajaxBusy').show();
		var lines = "{\"RECORDS\":" + JSON.stringify(JSONH.parse(localFile)) + "}";
		loadedfrompreviossession=true;
		var high = getHeightOfBrowser();
		changeCss(".panel-wrapper>div","height: "+high+"px;");
		PreCreation(lines);
		$('#ajaxBusy').hide();
	} else{
		var localQuery = localStorage.getItem("QueryId"); 
		if (localQuery != null && $("#userPassword").val() != "") {
			query1 = localQuery;
			loadedfrompreviossession=true;
			ConnectToServ();
		}
	}
	
});

$(document).ajaxStart(function(){ //Установка загрузки во время работы аякса
  $('#ajaxBusy').show(); 
}).ajaxStop(function(){ 
  $('#ajaxBusy').hide();
});

  function ShowFileChoose(){
	  if ($("#jsonFile").css( "display" ) == "none"){
			$("#jsonFile").slideDown();
		    $("#ButtonForFile").html("Скрыть");
	  }
	  else {
			$("#jsonFile").slideUp();
			$("#ButtonForFile").html("Выбрать файл");
	  }
  }
  function loadFile() {
	  
	var high = getHeightOfBrowser();
	changeCss(".panel-wrapper>div","height: "+high+"px;");
	
    var input, file, fr, save;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

	
    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
	  loadedfrompreviossession=false;
      fr.onload = receivedText;
      fr.readAsText(file);
	  
		  
    }

	
    
    function receivedText(e) {
      var lines = e.target.result;
	  PreCreation(lines);
	  
    }
  }
function ConnectToServ(){
	//var query1 = document.getElementById('textLoadServ').value;
	
	var high = getHeightOfBrowser();
	changeCss(".panel-wrapper>div","height: "+high+"px;");
	if (query1==-1) {query1 = $('#selectId').val();}
	var passwd = $("#userPassword").val();
	$.ajax({
			type: "POST",
			url: "assets/php/getjson.php",
			data: {query:query1,passwd:passwd}
	}).done(function( result )
		{
			//console.log(result);
			var arr = $.parseJSON(result);
			if (arr.errno == 1) { 
				$('#ajaxBusy').hide();
				alert(arr.errmsg);
			}
			else{
				var lines = "{\"RECORDS\":" + arr.content + "}";
				
				//alert(arr.content);
				PreCreation(lines);
			}
		})
	}

function PreCreation(lines){
	
	
	try {
		$("#slider-id-wrapper").remove();
	}
		catch(err) {
			
	}
		$('<div>', {
			class: 'liquid-slider',
			id: 'slider-id'
		})
		.appendTo('body');
		sourse_array=[];
	  try {
		localStorage.removeItem("LocalJson");
		var Local = lines.substring(lines.indexOf("["),lines.length-1);
		var StrJsonH = JSON.stringify(JSONH.pack(JSON.parse(Local), false));
		localStorage.setItem("LocalJson", StrJsonH);
	  }
	  catch(err){
		  try {
			  
			localStorage.removeItem("QueryId");
			localStorage.setItem("QueryId", query1);
		  }
		  catch(err){
			  
		  }
	  }
      CreateTableFromJson($.parseJSON(lines));
	  $("#jsonFile").slideUp();
	  $("#ButtonForFile").html("Выбрать файл");
	
  }
  
function CreateTableFromJson(json) {
	////
	////$('.liquid-slider').css('height',$('body').height()-35+'px');	
	////
	
		
		for (var i = 0; i < json.RECORDS.length; i++)
		{
			var d = $('<div>')
			.appendTo('#slider-id');
			
			d.append($('<h2>', {
							html: json.RECORDS[i].company_shortname,
						}).addClass('title'));
			d.append($('<div>')
							.attr('id', 'inner_tbl_'+i));
			var str =String(json.RECORDS[i].answer_value);
			//div-ы созданы buildTable(str)
			var res;
			try {

			  res = $.parseJSON(str);

			} catch (err) {
			  console.log('Cant parse JSON at tabl '+i);
			  res = {};

			}
			var elem = res;
			elem = Object.create(res, {
			  name: {
				value: json.RECORDS[i].company_shortname,
				writable: true,
				enumerable: true,
				configurable: true
			  }
			});
			/*Object.defineProperty(elem, 'name', {
			  value: json.RECORDS[i].company_shortname,
			  writable: true,
			  enumerable: true,
			  configurable: true
			});*/
			sourse_array[sourse_array.length]=elem;
			
			var n = (loadedfrompreviossession?(localStorage.getItem("JSR_PageNumber")!=null?localStorage.getItem("JSR_PageNumber"):1):1)-1;//сдвиг отностельно нумерации слайдера
			if (i == n) { 
				$("#inner_tbl_"+i).html(buildTable(res));
			}
		}
		
			 $('#slider-id').liquidSlider({
			  slideEaseFunction:'animate.css',
			  slideEaseDuration:500,
			  heightEaseDuration:500,
			  animateIn:"fadeInUp",
			  animateOut:"fadeOutUp",
			  mobileNavigation: true,
			  firstPanelToLoad:(loadedfrompreviossession?(localStorage.getItem("JSR_PageNumber")!=null?localStorage.getItem("JSR_PageNumber"):1):1),
			  callback: function() {
				var self = this;
				$('.slider-6-panel').each(function() {
				  $(this).removeClass('animated ' + self.options.animateIn);
				});
			  },
			  pretransition: function() {
				
				var n = this.nextPanel;
				
				localStorage.setItem("JSR_PageNumber", n+1);
				var sourse=sourse_array[n];
				var res = {};
				for (var key in sourse) {
				  if (key != "name")
				  {
					  res[key] = sourse[key];
				  }
				}
				if ($("#inner_tbl_"+n).html() == "")
				{
					$("#inner_tbl_"+n).html(buildTable(res));
				}
				//console.log(this.nextPanel);
				this.transition();
			  }
			 });
		
}

function changeCss(className, classValue) {
    var cssMainContainer = $('#css-modifier-container');

    if (cssMainContainer.length == 0) {
        var cssMainContainer = $('<style id="css-modifier-container"></style>');
        cssMainContainer.appendTo($('head'));
    }

    cssMainContainer.append(className + " {" + classValue + "}\n");
}
function getHeightOfBrowser()
{
	return $( window ).height() - 115;
}