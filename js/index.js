/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		// document.addEventListener('deviceready', this.onDeviceReady, false);
		app.onDeviceReady();
	},
	// deviceready Event Handler
	
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		// navigator.geolocation.watchPosition();  getCurrentPosition
		app.onSuccess();
	},

	onSuccess : function(position) {
		// window.localStorage["lattitude"] = position.coords.latitude;
		// window.localStorage["longitude"] = position.coords.longitude;
		
		window.localStorage["lattitude"] = 13.075661;
		window.localStorage["longitude"] = 80.224583;
		// --------------------------------- Foursquare API --------------------------------------------------
		$.ajax({
					url : "https://api.foursquare.com/v2/venues/explore?ll="+window.localStorage['lattitude']+","+window.localStorage["longitude"]+"&oauth_token=WY3X05XXOORI50UCYEGSBIPCVPFYKL5SGV0JPPIJZ5D40TEV&v=20140914&radius=1000&sortByDistance=1",
					type : 'GET',
					crossDomain : true,
					timeout : 30000,
					data : JSON.stringify({
						key : "value"
					}),
					error : function(jqXHR) {
						console.log(jqXHR);
					}
				}).done(function(data, textStatus, jqXHR) {
					var result = $.parseJSON(jqXHR.responseText);
					$.each(result.response.groups[0].items, function(i, item) {
					if(item.venue.name != undefined && item.venue.location.distance != undefined && item.venue.location.address != undefined){
					$('#list-view').append('<li onclick="app.getShowFaces(\''+item.venue.name+'\');" class="list-next"> <a href="#" class="ui-btn"><div class="circle list-item-icons">'+
						 '<h2 id="text">'+item.venue.location.distance+'</h2><h2 id="text-m">m</h2></div><h2 class="magenta_color list-view-head p-l-15">'+item.venue.name+'</h2>'+
						 '<p class="magenta_color list-view-text p-l-15">'+item.venue.location.address+'</p> </a></li>');
				app.hideLoader();
				}
				});
				});
	   // --------------------------------- /Foursquare API --------------------------------------------------
	},
	
	getShowFaces : function(placeName){
		window.localStorage["placeName"] = placeName;
		window.location.href = "faces.html";
	},

	onError : function(error) {
		 alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
	},
	
	//------------OPEN NEW PAGE-----------//
    showPage : function(page) {
    	app.showLoader();
    	window.location.href = page + ".html";   
    },

    //---------------SHOW LOADER------------------//
    showLoader : function() {
    	$("body").addClass('ui-disabled');
        $.mobile.loading("show");
    },

	//---------------HIDE LOADER------------------//
    hideLoader : function() {
        $.mobile.loading("hide");
        $("body").removeClass('ui-disabled');
    },
    
    onOnline : function() {
        app.hideLoader();
        navigator.notification.alert('Check you network connection or try again later.', app.dummyFunction(), 'Warning', 'OK');
    },
    
    //------------CHECK INTERNET CONNECTION ON DEVICE-----------//
    checkConnection : function() {
        return true;
        
        /*
        var networkState = navigator.connection.type;
                var states = {};
                states[Connection.UNKNOWN]  = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI]     = 'WiFi connection';
                states[Connection.CELL_2G]  = 'Cell 2G connection';
                states[Connection.CELL_3G]  = 'Cell 3G connection';
                states[Connection.CELL_4G]  = 'Cell 4G connection';
                states[Connection.CELL]     = 'Cell generic connection';
                states[Connection.NONE]     = 'No network connection';
                if (states[networkState] == 'No network connection') {
                    return false;
                } else {
                    return true;
                }*/
           
    },

    dummyFunction : function() {
    	
    },

    //---------------RATE IT NOW------------------//
    rateIt : function(message,tips,slider) {
    	var checkConnection = app.checkConnection();
    	if(checkConnection) {
    		alert("share message--------->"+message);
		    alert("user Tips------------->"+tips);	
		    alert("sliderfill------------>"+slider);
		    alert("faces------------>"+window.localStorage["faces"]);
			alert("product------------>"+window.localStorage["product"]);
			alert("service------------>"+window.localStorage["service"]);	
			app.hideLoader();
			window.localStorage.clear();
    	}else{
    		app.onOnline();
    	}	
    }
};

app.initialize(); 