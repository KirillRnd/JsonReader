function GetQueryId(){
	//var query1 = document.getElementById('textLoadServ').value;
	
	
	$.ajax({
			type: "GET",
			url: "assets/php/getqueryid.php",
			data: {}
	}).done(function( result )
		{
			//console.log(result);
			var arr = $.parseJSON(result);
			if (arr.errno == 1) { 
				$('#ajaxBusy').hide();
				alert(arr.errmsg);
			}
			else{
				
				
				//alert(arr.content);
				AddOptionsToSelect(JSON.parse(arr.content));
			}
		})
	}
function AddOptionsToSelect(options){
	var f=true;
	$.each(options,function() {
		
		$('#selectId').append(
			$('<option>',{
				value:this.id,
				text:this.name+' – '+this.question,
			})
			.prop('selected', f?true:false)
		);
		f=false;
		
	});
}