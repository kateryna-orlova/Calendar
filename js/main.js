function DatePicker (fieldId) {
	var self = this;
	var fieldId = fieldId;
	var monthTable;
	var d=new Date();
	var month=d.getMonth();
	var year = d.getFullYear();
	var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	var monthsDay = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
	var days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс" ];
	this.CreateCallendar = function ()
	{
		monthTable = [];
		var pos=0;
		var date=1;
		var last_date=30;

		d.setDate(1);
		if(d.getDay()==0){
			pos=6;
		} else {
			pos=d.getDay()-1;
		}
		d.setDate(31);
		if(month==d.getMonth()) {
			last_date=31;
		} else {
				d.setDate(29);
				if(month!=d.getMonth()) {
					last_date=28;
				} else {
						d.setDate(30);
						if(month!=d.getMonth()) {
							last_date=29;
							}
					}
			}
		for (var i=0; i < Math.ceil((pos+last_date)/7); i++) {
		    monthTable[i] = [];
		}

		for(var i=0; date <= last_date; i++) {
			monthTable[i] = [];
			for(var j=0;j<7;j++) {
				if(j>=pos) {
					monthTable[i][j]=date;
					date++;
					pos=-1;
				}
				if(date>=(last_date+1)) break;
				}
		}
		VisualTable();
	}
	function VisualTable () {
		var calendarContainer = document.getElementById(fieldId);
		var table = document.createElement('table');
		var caption = table.createCaption();
		caption.innerHTML = "<a class='datepicker-prev' title='Prev'><<</a> ";
		caption.innerHTML += months[month] + " "+d.getFullYear();
		caption.innerHTML += " <a class='datepicker-next' title='Next'>>></a>";
		var head = table.createTHead().insertRow(0);
		for (i in days) {
		head.insertCell(-1).innerText=days[i];
		}
		table.appendChild(document.createElement('tbody'));
		for(var i=0; i < monthTable.length; i++) {
			var row=table.tBodies[0].insertRow(-1);
			for(var j=0; j<monthTable[i].length; j++) {
				if(monthTable[i][j]) {
					var a = document.createElement('a');
					a.innerText = monthTable[i][j];
					a.setAttribute('data-date-index', i+"_"+j);
					row.insertCell(-1).appendChild(a);
				} else {
					row.insertCell(-1).innerHTML = "&nbsp;";
				}
		}
		}
		table.tBodies[0].addEventListener('click', dateClick);
		caption.addEventListener('click', navigationClick);
		if(calendarContainer.children[0]) {
		 calendarContainer.replaceChild(table, calendarContainer.children[0]);
		} else {
		calendarContainer.appendChild(table);
		}
	}
	function dateClick () {
		var day = event.target;
		if (day.tagName == 'A') {
			var index = day.getAttribute('data-date-index').split('_');
			console.log(index);
			var divDay = document.createElement('DIV');
			divDay.classList.toggle('dayInfo');
			divDay.classList.toggle('opened');
			var spanYear = document.createElement('span');
			spanYear.classList.toggle('year');
			spanYear.innerText=d.getFullYear();
			var spanDay = document.createElement('span');
			spanDay.classList.toggle('day');
			spanDay.innerText=monthTable[+index[0]][+index[1]];
			var spanMonth = document.createElement('span');
			spanMonth.classList.toggle('month');
			spanMonth.innerText=monthsDay[month];
			divDay.appendChild(spanDay);
			divDay.appendChild(spanMonth);
			divDay.appendChild(spanYear);
			var dayInfo = document.getElementById(fieldId).querySelector('.dayInfo');
			dayInfo ? document.getElementById(fieldId).replaceChild(divDay , dayInfo) : document.getElementById(fieldId).appendChild(divDay);
		}
	}
	function navigationClick() {
		if (event.target.tagName == 'A') {
			if (event.target.className == 'datepicker-prev') {
				if ((d.getMonth()-1) == -1) {
					month = 11;
					--year;
				}
				 else  --month;
			}
			if (event.target.className == 'datepicker-next') {
				if ((d.getMonth()+1) == 12) {
				month = 0;
				++year;
				} else  ++month;
			}
			var dayInfo = document.getElementsByClassName("dayInfo");
			if (dayInfo.length)
				dayInfo[0].classList.remove('opened');
			d.setMonth(month);
			d.setYear(year);
			self.CreateCallendar();
		}
	}
}

var calendar = new DatePicker('calendarContainer');
calendar.CreateCallendar();