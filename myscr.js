
//Categories in the database
categories = ["Attraction","Ball Diamond","Cricket Field","Playground","Public Library","Soccer Field","Track Sports Field"]
//Defining icons according to the category
var iconBase = "/myIcons/";
var icons = {
				Attraction:{
					icon : iconBase + 'Attraction.png'
			 },
				BallDiamond:{
					icon : iconBase + 'Ball Diamond.png'
				},
				CricketField:{
					icon : iconBase + 'Cricket Field.png'
				},
				Playground:{
					icon : iconBase + 'Playground.png'
				},
				PublicLibrary:{
					icon : iconBase + 'Public Library.png'
				},
				SoccerField:{
					icon : iconBase + 'Soccer Field.png'
				},
				TrackSportsField:{
					icon : iconBase + 'Track Sports Field.png'
				},
				Arena:{
					icon : iconBase + 'Attraction.png'
				},
				RecreationFacility:{
					icon : iconBase + 'Attraction.png'
				},
				OutdoorPool:{
					icon: iconBase + 'Attraction.png'
				}

			};


			//Image url's for a particular category
			img_url = ["https://pbs.twimg.com/media/CVgvVXSU4AAitO1.jpg","https://stalbert.ca/global/images/headers-2/Soccer%2C-Football-and-Rugby-Fields-Header_AUG-2018.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Eden_Gardens_under_floodlights_during_a_match.jpg/405px-Eden_Gardens_under_floodlights_during_a_match.jpg","http://polkadraaifarm.co.za/wp-content/uploads/2015/07/playground-2.jpg","https://www.berkeleylibraryfriends.org/wp-content/uploads/2017/10/fbpl.channing-034.jpg","https://cdn2.sportngin.com/attachments/photo/7909/5531/fields_2_large.png","https://thumbs.dreamstime.com/z/running-track-sports-field-green-natural-surrounding-city-rubber-paved-tracks-people-exercise-activity-80114323.jpg"]
			number_of_categories = []

      		for(var i=0;i<7;i++)
      		{
      			num_of_categories = document.getElementsByClassName('num_of_categories')

      // Accessing mumber of categories field sent by app.js to myscr.js file
      			number_of_categories[i]= parseInt(num_of_categories[i].innerHTML) 
    		}
    		//Accessing description file sent by app.js
			description = []
      		description_array = document.getElementsByClassName('description')
      		console.log(description_array.length)

      		//Splitting description value in form of an array for each element
      		for(var i=0;i<description_array.length;i++)
      		{
      			description[i]= (description_array[i].innerText).split(",",10)
    		}


    		//Rendering Bar Chart
    		//Reference "Canvasjs.com"
			function func1() 
			{
				var chart = new CanvasJS.Chart("chartContainer", {
				animationEnabled: true,
				title:
				{
					text: "Places around you"
				},
				axisY: 
				{
					title: "categories"
				},
				toolTip: 
				{
					shared: true,
					content: toolTipFormatter
				},
				theme:"light2",
				data: [
				{
					type: "bar",
					name: "categories",
					dataPoints: [
      				{ y: number_of_categories[0], label: categories[0]},
      				{ y: number_of_categories[1], label: categories[1]},     
      				{ y: number_of_categories[2], label: categories[2]},
      				{ y: number_of_categories[3], label: categories[3]},
      				{ y: number_of_categories[4], label: categories[4]},
      				{ y: number_of_categories[5], label: categories[5]},
      				{ y: number_of_categories[6], label: categories[6]}
    				]
				}]
				});
				chart.render();
			}

			//Function to show content when user hovers over the chart
			function toolTipFormatter(e) {
				var str = "";
				var str_rating = ""
				var str_open = ""
				var str_close = ""
				table_data = document.getElementById('tabl');
				table_data.innerHTML=''

				for (var i = 0; i < e.entries.length; i++)
				{
					count_row = 0;

					category_hovered = (e.entries[i]).dataPoint.label;
					for(var j=0;j<description.length;j++)
					{

						if(category_hovered=="Attraction")
						{
							if ((description[j][2]==("Arena") )|| (description[j][2]==("Recreation") )|| (description[j][2]==("Outdoor Pool")))
							{
								//Using array object to access each value individually for writing it in table
								str = str + description[j][0]
								str_rating = str_rating + description[j][1]
								str_open = str_open + description[j][3]
								str_close = str_close + description[j][4]
						//creating table elements
			 			var newrow = document.createElement("tr");
						var newcell = document.createElement("td");
						var newcell1 = document.createElement("td");
						var newcell2 = document.createElement("td");
						var newcell3 = document.createElement("td");


						//Writing content in table elements
						newcell.innerHTML = str
						newcell1.innerHTML = str_rating
						newcell2.innerHTML = str_open
						newcell3.innerHTML = str_close
						//Appending the data to tables
						newrow.append(newcell)
						newrow.append(newcell1)
						newrow.append(newcell2)
						newrow.append(newcell3)
						count_row1+=1	
								if(count_row1<6)
								{	
									//Displaying Top-5 rows
									table_data.appendChild(newrow)
								}
							
								str=""
								str_rating=""
								str_open=""
								str_close=""
							}
						}
			
						//Writing content to tables on hover
						if(description[j][2]==(category_hovered)){
						str = str + description[j][0]
						str_rating = str_rating + description[j][1]
						str_open = str_open + description[j][3]
						str_close = str_close + description[j][4]
						var newrow = document.createElement("tr");
						var newcell = document.createElement("td");
						var newcell1 = document.createElement("td");
						var newcell2 = document.createElement("td");
						var newcell3 = document.createElement("td");



						newcell.innerHTML = str
						newcell1.innerHTML = str_rating
						newcell2.innerHTML = str_open
						newcell3.innerHTML = str_close
						newrow.append(newcell)
						newrow.append(newcell1)
						newrow.append(newcell2)
						newrow.append(newcell3)
						count_row+=1			

						if(count_row<6)
						{
							table_data.appendChild(newrow)
						}
						str=""
						str_rating=""
						str_open=""
						str_close=""
					}
				}
			}
			//Changing image dynamically when hover over a certain category
			var img = document.getElementById("image");
			img.innerHTML=''
			for(var i=0;i<categories.length;i++)
				{
					if(((e.entries[0]).dataPoint.label)==categories[i])
					{
						img.src = img_url[i];
						
					}
				}
				return e.entries[0].dataPoint.y
			}
			//Rendering Pie Chart
			function func2() {

				var chart1 = new CanvasJS.Chart("chartContainer1", {
				animationEnabled: true,
				title: 
				{
					text: "Areas"
				},
				toolTip: 
				{
					shared: true,
					content: toolTipFormatter
				},
				data: [{
					type: "pie",
					startAngle: 240,
					yValueFormatString: "##0.00\"%\"",
					indexLabel: "{label} {y}",
					dataPoints: [
      					{ y: number_of_categories[0], label: categories[0]},
      					{ y: number_of_categories[1], label: categories[1]},     
      					{ y: number_of_categories[2], label: categories[2]},
      					{ y: number_of_categories[3], label: categories[3]},
      					{ y: number_of_categories[4], label: categories[4]},
      					{ y: number_of_categories[5], label: categories[5]},
      					{ y: number_of_categories[6], label: categories[6]}
    				]
				}]
			});
			chart1.render();
			}
			//Computing both the charts in one go
			function start() 
			{
  				func1();
  				func2();
			}
			//Loading charts on the starting of application
			window.onload =   start;	
			//Switching charts when clicked over a button
			function myFunction() 
			{
  				var x = document.getElementById("chartContainer");
  				var y = document.getElementById("chartContainer1");
  				if (x.style.display === "none") 
  				{
    				x.style.display = "block";
    				y.style.display="none"
   					document.getElementById("button_b").setAttribute('src','https://cdn.pixabay.com/photo/2016/06/13/07/59/pi-1453836_1280.jpg');
				} 
				else 
				{
    				x.style.display = "none";
    				y.style.display = "block";
    				document.getElementById("button_b").setAttribute('src','https://png.pngtree.com/element_pic/17/08/01/9910cafb9ee59ac89f6506363d156f1f.jpg');
				}
			} 

