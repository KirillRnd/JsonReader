$(document).ready(function() {
  $.getJSON("http://jsonread.my/main_source.json", function(json) {
		
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
			  res = [];

			}
			
			$("#inner_tbl_"+i).html(buildTable(res));
		}
		
			 $('#slider-id').liquidSlider({
			  slideEaseFunction:'animate.css',
			  slideEaseDuration:500,
			  heightEaseDuration:500,
			  animateIn:"fadeInUp",
			  animateOut:"fadeOutUp",
			  callback: function() {
				var self = this;
				$('.slider-6-panel').each(function() {
				  $(this).removeClass('animated ' + self.options.animateIn);
				});
			  }
			 });
		
	});
});