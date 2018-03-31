$(document).ready(function() {
  $.getJSON("http://jsonread.my/main_source2.json", function(json) {
		
		for (var i = 0; i < json.RECORDS.length; i++)
		{
			var d = $('<div>', {
				css: {
					display: 'block'
				},
				
				on: {
					click: function(event){
						alert('!');
					}
				}
						
			})
			.appendTo('#wrapper');
			
			d.append($('<span>', {
							html: '<strong>'+json.RECORDS[i].company_shortname+'</strong>',
						}));
			d.append($('<div>')
							.attr('id', 'inner_tbl_'+i));
			var str =String(json.RECORDS[i].answer_value);
			//div-ы созданы buildTable(str)
			$("#inner_tbl_"+i).html(buildTable($.parseJSON(str)));
		}
	});
});