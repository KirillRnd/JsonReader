isArray = function(a) {
    return (!!a) && (a.constructor === Array);
};
var deeptheme = {theme: "Укажите Здания", flag:false, themes:["question"]}

function onedeepview(obj, dpflag, dict) {
	var array_count = 0;
	var newdict = {};
	var table = [];
	var arraykey = -1;
	for (var key in dict) {
		newdict[key] = dict[key];
	}
	for (var key in obj) {
		if (!isArray(obj[key])) {
			newdict[key] = obj[key];
		} else {
			if (dpflag) {
				array_count += 1;
				arraykey = key;
			} else if (deeptheme['theme'] == key) {
				array_count = 1;
				arraykey = key;
			} else if (deeptheme['themes'].indexOf(key) > -1) {
				array_count += 1;
				arraykey = key;
			}
		}
	}
	if (array_count>1) {
		console.log("There're multiple arrays inside. The deeper theme");
		console.log(array_count);
		console.log(obj);
		console.log(dict);
		return false;
	} else {
		if (array_count == 1) {
			if (!dpflag) {
				if (deeptheme['theme'] == arraykey) {
					dpflag = true;
				}
			}
		}
		if (array_count == 1 && (dpflag == true || deeptheme['themes'].indexOf(arraykey) > -1)) {
			var array_length = obj[arraykey].length;
			var i = array_length;
			while (i--) {
				table = table.concat(onedeepview(obj[arraykey][array_length-i-1], dpflag, newdict));
			}
			return table;		
		} else {
			table.push(newdict);
			return table;
		}
	} 
	
}
function deepview(sourse_array) {
		// sourse_array is array
	if (!isArray(sourse_array)) {
		console.log("It's not an array in function argument");
		return false;
	}
	var finaltable = [];
	var sourse_array_length = sourse_array.length;
	var i = sourse_array_length;
	while (i--) {
		finaltable = finaltable.concat(onedeepview(sourse_array[sourse_array_length-i-1],false));
	}
	return finaltable;
}
