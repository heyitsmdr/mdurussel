$(function() {
	//$('span.bad').tipsy({live: true});
	
	// setup report form
	$('#report-form').dialog({
		autoOpen: false,
		height: 350,
		width: 350,
		modal: true,
		buttons: {
			'Send Report': function(){
				$.get('report.php', {
					domain: $('#report-domain').val(),
					why: $('#report-why').val(),
					version: localStorage.lastVersion
				}, function(data){
					$('#report-form').dialog('close');
					$('#report-success-form').dialog('open');
				});
			},
			'Close': function(){
				$('#report-form').dialog('close');
			}
		},
		close: function(){}
	});
	// setup report success form
	$('#report-success-form').dialog({
		autoOpen: false,
		show: 'fade',
		buttons: {
			'Close': function(){
				$('#report-success-form').dialog('close');
			}
		}
	});
	// whois form
	$('#whois-form').dialog({
		autoOpen: false,
		height: 450,
		width: 600,
		show: 'fade',
		buttons: {
			'Close': function(){
				$('#whois-form').dialog('close');
			}
		}
	});
	// press enter to default to checking squarespace 6
	$('#domain-name').on('keydown', function(e) {
	    if (e.which == 13) {
	        e.preventDefault();
	        checkDomain(6);
	    }
	});
	// domain from url?
	if( domainFromURL ) {
		$('#domain-name').val( domainFromURL );
		if( versionFromURL )
			checkDomain( versionFromURL );
		else
			checkDomain(6);
	}
	// focus
	$('#domain-name').focus();
});

function newSearch() {
	// animation
	$('.splash').fadeIn('fast');
	$('#results').fadeOut('fast');
	$('#box').animate({height:'180px', marginTop:'-90px'}, 'fast');
	$('#box').animate({width:'380px', marginLeft:'-190px'}, 'fast');
	$('#title').html('Squarespace Domains');
	$('#desc').html('Check the configuration of a domain name');
	$('#domain-name').val('');
	$('#results').html('<img src="images/ajax.gif"><br>Loading..');
	$('#results').css('textAlign', 'center');
	// set url
	window.history.pushState("sqsp", "Title", "/sqspdomain/");
}

function flagResult() {
	$('#report-form').dialog('open');
	$('#report-domain').val(localStorage.lastDomain);
	$('#report-why').val('');
	$('#report-why').focus();
}

function openWhois() {
	$('#whois-result').html('Loading..');
	$('#whois-form').dialog('open');
	$.post('whois.php', {domain: localStorage.lastDomain}, function(data){
		$('#whois-result').html(data);
	});
}

function checkDomain(version) {
	var domain = parseDomain( $('#domain-name').val() );
	// parse + check for valid domain
	if( !domain ) {
		$('#domain-name').effect('pulsate');
		return;
	}
	// save in browser cache
	localStorage.lastDomain = domain;
	localStorage.lastVersion = version;
	// prepare for results
	$('.splash').fadeOut('fast');
	$('#box').animate({height:'320px', marginTop:'-160px'}, 'fast');
	$('#box').animate({width:'460px', marginLeft:'-230px'}, 'fast');
	$('#title').html('Result for <strong>' + domain + '</strong> [SS' + version + ']');
	$('#desc').html('These are the results for the domain name.');
	$('#desc').append('<br><a href="#" onclick="flagResult()" title="Is this result incorrect? Flag it and let me know so I can get it fixed. Thanks!">Flag this Result</a> - <a href="#" onclick="window.open(\'http://\'+localStorage.lastDomain)">View Site</a> - <a href="#" onclick="openWhois()">Whois</a> - <a href="#" onclick="newSearch()">Go Back</a>');
	$('#results').fadeIn(function(){
		// ajax
		$.get('backend.php', {domain: domain}, function(data){
			if(data.success == false) {
				alert('error');
			} else {
				if(data.roota.length == 0 && data.wwwa.length == 0 && data.wwwcname.length == 0) {
					parseError(data, 'No dns records found. This domain name may not even exist.');
				} else {
					console.log( data.digroot );
					console.log( data.digwww );
					parseData(data, version);
				}
			}
		}, 'json')
		.fail(function() { alert("error"); });
	});
}

function parseDomain(domain) {
	// check for blank domain
	if( !domain )
		return false;
	// lower casing
	domain = domain.toLowerCase();
	// remove spaces
	domain = domain.replace(/ /g, '');
	// remove constants
	domain = domain.replace('http://', '');
	domain = domain.replace('https://', '');
	domain = domain.replace('www.', '');
    // remove extra slashes
    if( domain.indexOf('/') >= 0 ) {
        domain = domain.split('/')[0];
    }
	// contains period(.) ?
	if( domain.indexOf('.') == -1 )
		return false;

	return domain;
}

function isSubdomain(url) {
    var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);

    return url.match(regex) ? true : false;
}

function parseError(data, err) {
	$('#results').hide();

	$('#results').html('<span class="error">' + err + '</span>');

	$('#results').append('<div id="goback"><a href="#" onclick="newSearch()">Start a new search</a></div>');

	$('#results').fadeIn();
}

function parseData(data, version) {
	$('#results').hide();

	$('#results').html('');
	$('#results').css('textAlign', 'left');

    if( !isSubdomain(data.domain) ) {
        checkRoot(data, version);
        checkWWW(data, version, checkWWWAlternative(data, version) );
    } else {
        checkSubdomain(data, version);
    }

	// check outcome
	var looksgood = true;
	$('.outcome').each(function(){
		if( $(this).html() == 'FAILURE' )
			looksgood = false;
	});

	if( looksgood )
		$('#results').append('<div id="outcome-good">This domain looks good for Squarespace ' + version + '!</div>');
	else
		$('#results').append('<div id="outcome-bad">Something seems to be wrong.</div>');	

	$('#results').append('<div id="goback"><a href="#" onclick="newSearch()">Start a new search</a></div>');

	$('#results').fadeIn();

	// set url
	window.history.pushState("sqsp", "Title", "/sqspdomain/?domain=" + localStorage.lastDomain + "&version=" + localStorage.lastVersion);
}

function checkRoot(data, version) {
	$('#results').append('<span class="cat">' + data.domain + '</span>:<br>');

	// check a-record count
	$('#results').append('Checking a-record count... <span class="data">' + data.roota.length + '</span>');

	if(data.roota.length == 1)
		$('#results').append('<span class="good outcome">SUCCESS</span>');
	else
		$('#results').append('<span class="bad outcome">FAILURE</span>');

	// check a-record target
	if(data.roota.length == 0) {
		$('#results').append('<br>Checking first a-record ip... <span class="data">none</span>');
		$('#results').append('<span class="bad outcome" title="Delete this.">FAILURE</span>');
		return;
	} else if(data.roota.length == 1) {
		$('#results').append('<br>Checking first a-record ip... <span class="data">' + data.roota[0].ip + '</span>');
	} else {
		$('#results').append('<br>Checking first a-record ip... <span class="data">' + data.roota[0].ip + ', <a href="#" title="other ips here">etc..</a></span>');
	}

	// check for valid data
	if(version == 6 && (data.roota[0].ip == '65.39.205.57' || data.roota[0].ip == '65.39.205.61'))
		$('#results').append('<span class="good outcome">SUCCESS</span>');
	else if(version == 5 && data.roota[0].ip == '65.39.205.54')
		$('#results').append('<span class="good outcome">SUCCESS</span>');
	else
		$('#results').append('<span class="bad outcome" title="Delete this.">FAILURE</span>');
}

function checkWWW(data, version, alt) {
	$('#results').append('<br><br><span class="cat"><span class="www">www.</span>' + data.domain + '</span>:<br>');

	// check cname-record count
	$('#results').append('Checking cname-record count... <span class="data">' + data.wwwcname.length + '</span>');

	if(data.wwwcname.length == 1)
		$('#results').append('<span class="good outcome">SUCCESS</span>');
	else {
		if( !alt.success )
			$('#results').append('<span class="bad outcome">FAILURE</span>');
		else
			$('#results').append('<span class="except outcome">EXCEPTION</span>');
	}

	// check cname-record target
	if(data.wwwcname.length == 0) {
		$('#results').append('<br>Checking first cname-record target... <span class="data">none</span>');
		if( !alt.success )
			$('#results').append('<span class="bad outcome">FAILURE</span>');
		else
			$('#results').append('<span class="except outcome">EXCEPTION</span>');
		$('#results').append( alt.data );
		return;
	} else if(data.wwwcname.length == 1) {
		$('#results').append('<br>Checking first cname-record target... <span class="data">' + data.wwwcname[0].target + '</span>');
	} else {
		$('#results').append('<br>Checking first cname-record target... <span class="data">' + data.wwwcname[0].target + ', <a href="#" title="other targets here">etc..</a></span>');
	}

	// check for valid data
	if( (version == 6 && data.wwwcname[0].target == 'www.squarespace6.com') || 
		(version == 6 && data.wwwcname[0].target == 'www.squarespace.com')  || 
		(version == 6 && data.wwwcname[0].target == 'squarespace6.com')     ||
		(version == 6 && data.wwwcname[0].target == 'squarespace.com') )
		$('#results').append('<span class="good outcome">SUCCESS</span>');
	else if(version == 5 && data.wwwcname[0].target == 'five.squarespace.com')
		$('#results').append('<span class="good outcome">SUCCESS</span>');
	else
		$('#results').append('<span class="bad outcome">FAILURE</span>');

	// alt. a-records
	$('#results').append( alt.data );
}

function checkSubdomain(data, version) {
    var valid;
}

function checkWWWAlternative(data, version) {
	var returndata = {success: false, data: ''};

	returndata.data += '<br>Checking a-record count... <span class="data">' + data.wwwa.length + '</span>';

	if(data.wwwa.length == 1)
		returndata.data += '<span class="good outcome">SUCCESS</span>';
	else
		returndata.data += '<span class="except outcome">EXCEPTION</span>';

	// check a-record target
	if(data.wwwa.length == 0) {
		returndata.data += '<br>Checking first a-record ip... <span class="data">none</span>';
		returndata.data += '<span class="except outcome" title="Delete this.">EXCEPTION</span>';
		return returndata;
	} else if(data.wwwa.length == 1) {
		returndata.data += '<br>Checking first a-record ip... <span class="data">' + data.wwwa[0].ip + '</span>';
	} else {
		returndata.data += '<br>Checking first a-record ip... <span class="data">' + data.wwwa[0].ip + ', <a href="#" title="other ips here">etc..</a></span>';
	}

	// check for valid data
	if(version == 6 && (data.wwwa[0].ip == '65.39.205.57' || data.wwwa[0].ip == '65.39.205.61')) {
		returndata.data += '<span class="good outcome">SUCCESS</span>';
		returndata.success = true;
	} else if(version == 5 && data.wwwa[0].ip == '65.39.205.54') {
		returndata.data += '<span class="good outcome">SUCCESS</span>';
		returndata.success = true;
	} else
		returndata.data += '<span class="bad outcome">FAILURE</span>';

	return returndata;
}