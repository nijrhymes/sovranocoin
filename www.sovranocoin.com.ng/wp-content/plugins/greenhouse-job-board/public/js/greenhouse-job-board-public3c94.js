/**
 * @since      2.1.0
 */
 jQuery(document).ready(function($) {
	'use strict';

	$('.apply_ty').show();

	if ( $('.greenhouse-job-board').length ){
		if (ghjb_d) console.log('job board loading', ghjb_json);
		$('.greenhouse-job-board').each( function(){
			greenhouse_jobs( ghjb_json, '#' + $(this).attr('id') );
		});
	} else {
		if (ghjb_d) console.log('no job board data found');
	}


	$('.greenhouse-job-board[data-type="accordion"] .jobs').on('click', '.job_read_full', function(e){
		e.preventDefault();
		//get ghjb id
		var this_id = '#' + $(this).parents('.greenhouse-job-board').attr('id');
		if (ghjb_d) console.log(this_id);

		var job_id = $(this).parents('.job').data('id');
		if ( $(this).hasClass('open') ) {
			$(this).removeClass('open');
			$(this).text( $(this).data('closed-text') );
			$(this_id + ' .job_description_' + job_id).toggle(false);
			$(this_id + ' .job_description_' + job_id).removeClass('open');
		}
		else {
			$(this).addClass('open');
			$(this).text( $(this).data('opened-text') );
			$(this_id + ' .job_description_' + job_id).toggle(true);
			$(this_id + ' .job_description_' + job_id).addClass('open');
		}
	});


	$('.greenhouse-job-board').on('click', '.job_apply', function(e){
		//get ghjb id
		var this_id = '#' + $(this).parents('.greenhouse-job-board').attr('id');
		//get job id to build form
		var jobid = $(this).parents('.job').data('id');
		//get job slug
		var jobslug = $(this).parents('.job').data('slug');
		if (ghjb_d) console.log('apply', this_id, jobid);
		if (ghjb_a) ghjb_analytics('job', 'apply_form', jobslug );

		window.location.hash = jobslug +'/apply';


		e.preventDefault();

		//accordion
		if ( $(this_id).data('type') === 'accordion' ) {

			//accordion & iframe
			if ( $(this_id).data('form_type') === 'iframe') {

				//closing since already open
				if ( $(this).hasClass('open') ) {
					$(this).text( $(this).data('closed-text') );
					$(this).removeClass('open');
					if ($(this_id + ' #grnhse_app').hasClass('open')) {
						$(this_id + ' #grnhse_app').empty();
						$(this_id + ' #grnhse_app').removeClass('open');
					}
				}
				else {
					$(this_id + ' .job_apply').removeClass('open');
					$(this_id + ' .job_apply').text( $(this).data('closed-text') );
					if ( $(this_id + ' #grnhse_app').hasClass('open') ) {
						$(this_id + ' #grnhse_app').empty();
						$(this_id + ' #grnhse_app').removeClass('open');
					}
					//open this one
					$(this).addClass('open');
					$(this).text( $(this).data('opened-text') );

					$(this).parent().append( $(this_id + ' #grnhse_app') );
					$(this_id + ' #grnhse_app').addClass('open');

				 	// if (ghjb_d) console.log(jid);
				 	// Loads job with ID 5555555 with a source tracking token taken
				 	// from the gh_src querystring parameter. NOTE: this is what you
				 	// want to do to ensure source tracking works (i.e., tracking
				 	// where a candidate came from)
				 	// Grnhse.Iframe.load(jid, 'abc123');

				 	// Loads job with ID 5555555 with no source tracking token
				 	Grnhse.Iframe.load(jobid);

				 	// Loads the job board (not a specific application)
				 	// Grnhse.Iframe.load();	 });
				}

			}
		//accordion & inline
			if ( $(this_id).data('form_type') === 'inline') {

				//closing since already open
				if ( $(this).hasClass('open') ) {
					$(this).text( $(this).data('closed-text') );
					$(this).removeClass('open');
					if ( $(this_id + ' .apply_jobs').hasClass('open') ) {
						$(this_id + ' .apply_jobs').removeClass('open');
						$(this_id + ' .apply_jobs').toggle(false);
					}
				}
				else {
					$(this_id + ' .job_apply').removeClass('open');
					$(this_id + ' .job_apply').toggle(true);
					$(this_id + ' .apply_ty').toggle(false);
					$(this_id + ' .job_apply').text( $(this).data('closed-text') );
					if ( $(this_id + ' .apply_jobs').hasClass('open') ) {
						$(this_id + ' .apply_jobs').removeClass('open');
					}
					//open this one
					$(this).addClass('open');
					$(this_id + ' .apply_jobs').addClass('open');
					$(this_id + ' .apply_jobs').toggle(true);
					$(this).text( $(this).data('opened-text') );

					//move form to this job in the DOM
					$(this_id + ' .apply_jobs').insertAfter( $(this).parents('.job') );

					// if (ghjb_d) console.log(jobid);
					update_form_per_position(null, jobid, this_id);

				}
			}
		//end accordion
		}

		//cycle
		else if ( $(this_id).data('type') === 'cycle' ) {

			// cycle & iframe
			if ( $(this_id).data('form_type') === 'iframe' ) {
				//closing since already open
				if ( $(this).hasClass('open') ) {
					$(this).text( $(this).data('closed-text') );
					$(this).removeClass('open');
					if ($(this_id + ' #grnhse_app').hasClass('open')) {
						$(this_id + ' #grnhse_app').empty();
						$(this_id + ' #grnhse_app').removeClass('open');
					}
				}
				else {
					$(this_id + ' .job_apply').removeClass('open');
					$(this_id + ' .job_apply').text( $(this).data('closed-text') );
					if ($(this_id + ' #grnhse_app').hasClass('open')) {
						$(this_id + ' #grnhse_app').empty();
						$(this_id + ' #grnhse_app').removeClass('open');
					}
					//open this one
					$(this).addClass('open');
					$(this).text( $(this).data('opened-text') );

					$(this).parent().append( $('#grnhse_app') );
					$(this_id + ' #grnhse_app').addClass('open');
					var jid = $(this).parents('.job').data('id');
				 	// if (ghjb_d) console.log(jid);
				 	// Loads job with ID 5555555 with a source tracking token taken
				 	// from the gh_src querystring parameter. NOTE: this is what you
				 	// want to do to ensure source tracking works (i.e., tracking
				 	// where a candidate came from)
				 	// Grnhse.Iframe.load(jid, 'abc123');

				 	// stop default page scrolling behavior
				 	Grnhse.Settings['scrollOnLoad'] = false;

				 	// Loads job with ID 5555555 with no source tracking token
				 	Grnhse.Iframe.load(jid);

				 	// Loads the job board (not a specific application)
				 	// Grnhse.Iframe.load();	 });
				}
				//reset height of container to contain the iframe
				setTimeout( reset_cycle_container_height, 1000, this_id);
			}

			//cycle & inline
			else if ( $(this_id).data('form_type') === 'inline' ) {

				//pre select positions select
				var jobid = $(this).parents('.job').data('id');
				// if (ghjb_d) console.log(jobid);
				update_form_per_position(null, jobid, this_id);

				$(this_id + '[data-type="cycle"] .all_jobs').cycle('goto', 1 );
				jobs_scroll_top(this);
			}

		//end cycle
		}

	});

	function reset_cycle_container_height(this_id){
		$(this_id + ' .all_jobs').height( $(this_id + ' .cycle-slide-active').height() );
	}

	function thanks_message(formid, textStatus){
		//get ghjb id
		var this_id = '#' + $(formid).parents('.greenhouse-job-board').attr('id');
		var jobid = $('#hidden_id').val();
		if (ghjb_d) console.log('submission complete', textStatus, jobid, this_id);
		if (ghjb_a) ghjb_analytics('job', 'apply_thanks', jobid );

		if (textStatus === 'error' ){
			if (ghjb_d) console.log('submission error', textStatus, jobid, this_id);
			$(this_id + ' .apply_ty h2').text('Oh No!');
			$(this_id + ' .apply_ty p').text('We\'ve experienced an error, this submission may have failed, please try again or contact us for help!');
		}
		else if (textStatus === 'success'){
			if (ghjb_d) console.log('submission success', textStatus, jobid, this_id);
		}

		//cycle
		if ( $(this_id).data('type') === 'cycle' ) {
			$(this_id + '[data-type="cycle"] .all_jobs').cycle('goto', 2 );
			jobs_scroll_top(formid);
		}

		//accordion
		else if ( $(this_id).data('type') === 'accordion' ) {
			//hide form, display ty message in place
			$(this_id + ' #apply_form').toggle(false);
			$(this_id + ' .apply_ty').toggle(true);
		}
	}

	function update_form_per_position( e, jobid, jbid ){
		// get json question data for this job
		var this_job = $.grep(ghjb_jobs, function (o,i){
			return o.id == jobid;
		});
		var job_questions = this_job[0].questions;

		//get form_fields from settings
		var form_fields = $('.jobs').attr('data-form_fields');
		if ( typeof form_fields !== typeof undefined && form_fields !== false ) {
			form_fields = form_fields.split('|');
		}
		else {
			form_fields = ['*'];
		}

		$(jbid + " #apply_form *").remove();

		$(jbid + " #apply_form").append('<h2>' + this_job[0].title + '</h2>');

		var hidden_field = "<input type='hidden' id='hidden_id' name='id' value='" + jobid + "' />";
		$(jbid + " #apply_form").append(hidden_field);
		hidden_field = "<input type='hidden' id='hidden_mapped_url_token' name='mapped_url_token' value='" + this_job[0].absolute_url + "' />";
		$(jbid + " #apply_form").append(hidden_field);


		for ( var i = 0; i < job_questions.length; i++){

			//check that the field is listed if form fields are specified
			// if (ghjb_d) console.log(form_fields, job_questions[i].fields[0].name, job_questions[i].label);
			if ( form_fields[0] === '*' ||
				 jQuery.inArray( job_questions[i].fields[0].name, form_fields ) >= 0 ||
				 jQuery.inArray( job_questions[i].label, form_fields ) >= 0  ) {

				var field_wrap = "<div class='field_wrap field_" + job_questions[i].fields[0].name ;

				var required = '';
				if (job_questions[i].required === true) {
					required = ' required="true" ';
					field_wrap += " field_required ";
				}

				field_wrap += "' >";
				//write label for field
				field_wrap += "<label for='" + job_questions[i].fields[0].name + "'>" + job_questions[i].label  + "</label>";

				//detect input type and write proper html for correct type
				if ( job_questions[i].fields[0].type === 'input_text' ) {
					field_wrap += "<input type='text' name='" + job_questions[i].fields[0].name + "' id='" + job_questions[i].fields[0].name + "' title='" + job_questions[i].label  + "' " + required + " />"
				}
				else if ( job_questions[i].fields[0].type === 'textarea' ) {
					field_wrap += "<textarea name='" + job_questions[i].fields[0].name + "' id='" + job_questions[i].fields[0].name + "' title='" + job_questions[i].label  + "' " + required + " />"
				}
				else if ( job_questions[i].fields[0].type === 'input_file' ) {
					field_wrap += "<input type='file' name='" + job_questions[i].fields[0].name + "' id='" + job_questions[i].fields[0].name + "' title='" + job_questions[i].label  + "' " + required + " />"
				}

				$(jbid + " #apply_form").append(field_wrap);
			}

		}

		var submit_button = "<div class='field_wrap field_submit'><input type='button' class='submit button' value='Submit Application' /></div></div>";

		$(jbid + " #apply_form").append(submit_button);
	}

	function jobs_scroll_top(this_caller){
		//get ghjb id
		var this_id = '#' + $(this_caller).parents('.greenhouse-job-board').attr('id');
		// if (ghjb_d) console.log(this_id);

		//scroll to top of section
	$('html, body').animate({
  	scrollTop: $(this_id).offset().top -3000
		}, 0);
	}

		$(window).on('popstate', function(event) {
			if (!window.location.hash.substr(1).length) {
			 	$('#greenhouse-job-board_1' + '[data-type="cycle"] .all_jobs').cycle('goto', 0 );
			 	$('.landing-title').show();
				$('.general_app').show();
				$('.landing-description').show();
			}
			$('.call_to_action.job_apply').show();
			$('.return').show();
		});

	 if (window.location.hash.substr(1).length) {

		$('#greenhouse-job-board_1').find(".job").each(function (){
		  if($(this).css("visibility") == "visible"){
		    var metaTitle =  'sovrano - '+$(this).find('.job_title').text();
		    var jobslug =  $(this).data('slug');
		    document.title = metaTitle;
				$('meta[name=description]').attr('content', metaTitle);
				$("meta[property='og\\:title']").attr('content', metaTitle);
				$('link[rel=canonical]').attr({'href':'https://sovranocoin.com.ng/company/careers/all-jobs/#'+jobslug});
		  }
		});

		$('.landing-title').hide();
		$('.general_app').hide();
		$('.landing-description').hide();

		$('.call_to_action').show();
		$('.return').show();

		if (window.location.hash === "#Xpring" ) {
		  $('html, body').animate({ scrollTop: $( "#Xpring" ).offset().top - 150 }, 500);
		}

	} else {
		$('.landing-title').show();
		$('.general_app').show();
		$('.landing-description').show();

		//$('.call_to_action.job_apply').hide();

	}

	$('.call_to_action').on('click', function(){
		$('.call_to_action.job_apply').hide();
	});

	//navigation
	$('.all_jobs').on('click', '.job_goto', function(e){

		e.preventDefault();

		//get ghjb id
		var this_id = '#' + $(this).parents('.greenhouse-job-board').attr('id');

		//find correct slide by data-id
		var jobid = parseInt( $(this).parents('.job').data('id') );
		var jobslug =  $(this).parents('.job').data('slug');

		if (ghjb_d) console.log('navigating to job', jobid);
		if (ghjb_a) ghjb_analytics('job', 'click', jobslug );

		var slideindex = $('.cycle-slide[data-id="' + jobid + '"]').index();

		jobs_scroll_top(this);
		$(this_id + '[data-type="cycle"] .all_jobs').cycle('goto', slideindex );


		$('.landing-title').hide();
		$('.general_app').hide();
		$('.landing-description').hide();

		$('.call_to_action').show();
		$('.return').show();

		var metaTitle =  'sovrano - '+$(this).find('.job_title').text();
		//console.log(metaTitle);
		document.title = metaTitle;
		$('meta[name=description]').attr('content', metaTitle);
		$("meta[property='og\\:title']").attr('content', metaTitle);
		$('link[rel=canonical]').attr({'href':'https://sovranocoin.com.ng/company/careers/all-jobs/#'+jobslug});


	});

	$('.all_jobs').on('click', '.return', function(e){
		e.preventDefault();

		$('.call_to_action.job_apply').hide();
		$('.return').hide();

		$('.landing-title').show();
		$('.general_app').show();
		$('.landing-description').show();

		//get ghjb id
		var this_id = '#' + $(this).parents('.greenhouse-job-board').attr('id');
		var jobid = parseInt( $(this).parents('.job').data('id') );

		if ( isNaN( jobid ) ) {
			jobid = $('#hidden_id').val();
		}
		if (ghjb_d) console.log('return to list');
		if (ghjb_a) ghjb_analytics('job', 'board', jobid );
		$(this_id + '[data-type="cycle"] .all_jobs').cycle('goto', 0 );
		//console.log(this_id);
		jobs_scroll_top(this);

	});

	$('.all_jobs').on('click', '.apply_jobs .submit', function(e){
		e.preventDefault();

		//get ghjb id
		var this_id = '#' + $(this).parents('.greenhouse-job-board').attr('id');

		var jobid = $('#hidden_id').val();
		if (ghjb_d) console.log('form button click', jobid);
		if (ghjb_a) ghjb_analytics('job', 'apply_submit', jobid );

		var form_id = this_id + ' #apply_form';

		//if not valid, display the html5 validation messages (by clicking the temp submit button)
		if ( !$(form_id)[0].checkValidity() ) {
			if (ghjb_d) console.log('form validation error');
			// $(form_id).find(':submit').click();
			$('<input type="submit">').hide().appendTo( $(form_id) ).click().remove();
			return false;
		}

		//if all html5 validates then submit via ajax
		else if ( $(form_id)[0].checkValidity() ) {
			if (ghjb_d) console.log('validates, submitting form');
			ajax_submit( form_id, null);
		}

		return false;
	});

	function ajax_submit(formid, redirect){
		var formData = new FormData( $(formid)[0]);
		$.ajax({
		  type: $(formid).attr('method'),
			url: $(formid).attr('action'),
		    data: formData,
		    async: false,
	        cache: false,
	        contentType: false,
	        processData: false,
	        enctype: 'multipart/form-data',
	        mimeType: 'multipart/form-data',
	        formid: formid,
		    success: function(data, textStatus, jqXHR) {
		    	if (ghjb_d) console.log('success', textStatus, data, jqXHR, this.formid);
		    	// thanks_message(this.formid);
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
			    if (ghjb_d) console.log('error', textStatus, errorThrown, jqXHR);
		    },
		    complete: function(jqXHR, textStatus) {
		    	if (ghjb_d) console.log('complete', textStatus, jqXHR);
		    	thanks_message(this.formid, textStatus);

		    	goog_report_conversion();
		    	// if (redirect != null && redirect != undefined) {
			    // 	window.location.href = redirect;
			    // }
		    },

		});
		return false;
	}

});

function decodeHtml(html){
	var txt = document.createElement("textarea");
    txt.innerHTML = html;
    var text = txt.value;
    text = text.replace(/\u00a0/g, ' ');
    return text;
}

function strip_tags(input, allowed) {
  //  discuss at: http://phpjs.org/functions/strip_tags/
  allowed = (((allowed || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}

function get_excerpt_from_content(content, limit){
	limit = typeof limit !== 'undefined' ? limit : 120;

	//decode
	var this_content = decodeHtml(content);
	//strip tags
	this_content = strip_tags(this_content);

	//start at 0
	var short_content_start = 0;
	var content_length = this_content.length;

	//get the full content if total length is less than the limit
	if ( content_length <= limit) {
		short_content_end = content_length;
	}
	else {
		//get the first full sentence
		var short_content_end = this_content.indexOf(".", short_content_start);
	}

	var short_content = this_content.slice(short_content_start, short_content_end + 1);
	if (short_content_start < 0){
		short_content = this_content.slice(0, short_content_end + 1);
	}

	return short_content;
}

function slugme(slugit) {
	//all lowercase
	return slugit.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
}

function greenhouse_jobs(json, jbid){
 	if (ghjb_d) console.log(json);
 	if (ghjb_d) console.log(jbid);

 	var board_type = jQuery(jbid).data('type');

 	//setup handlebars
 	var job_html, job_html_template, slide_html, slide_html_template;
 	job_html = jQuery("#job-template").html();
 	job_html_template = Handlebars.compile(job_html);

 	if (board_type == 'cycle' ) {
 		slide_html = jQuery("#job-slide-template").html();
	 	slide_html_template = Handlebars.compile(slide_html);
 	}

 	//sorting defaults
 	var orderby = 'none';
 	var sort_order = 1; //desc. asc = -1
 	var sticky = ['',0];
 	//read sorting settings from data attributes
 	if ( jQuery(jbid + ' .jobs').attr('data-orderby') ) {
	 	orderby = jQuery(jbid + ' .jobs').attr('data-orderby');
	}
	if ( jQuery(jbid + ' .jobs').attr('data-order') === 'ASC' ) {
		sort_order = -1;
	}
 	if ( jQuery(jbid + ' .jobs').attr('data-sticky') ) {
 		sticky = jQuery(jbid + ' .jobs').attr('data-sticky').split('|');
 		// if (ghjb_d) console.log(sticky[0], sticky[1]);
 	}
 	//sort this sucker
	json.jobs.sort(function(a, b){
		if ( sticky[0] == 'bottom' ) {
			if ( sticky[1] == a.id ) return 1;
			if ( sticky[1] == b.id ) return -1;
		}

		if ( sticky[0] == 'top' ) {
			if ( sticky[1] == a.id ) return -1;
			if ( sticky[1] == b.id ) return 1;
		}

		//sort depending on orderby value
		if ( orderby === 'title' ) {
			if ( a.title < b.title ) return -1 * sort_order;
			if ( a.title > b.title ) return 1 * sort_order;
		} else if ( orderby === 'date' ) {
			if ( a.updated_at < b.updated_at ) return -1 * sort_order;
			if ( a.updated_at > b.updated_at ) return 1 * sort_order;
		} else if ( orderby === 'id' ) {
			if ( a.id < b.id ) return -1 * sort_order;
			if ( a.id > b.id ) return 1 * sort_order;
		} else if ( orderby === 'department' ) {
			if ( a.departments[0].name < b.departments[0].name ) return -1 * sort_order;
			if ( a.departments[0].name > b.departments[0].name ) return 1 * sort_order;
		} else if ( orderby === 'office' ) {
			if ( a.offices[0].name < b.offices[0].name ) return -1 * sort_order;
			if ( a.offices[0].name > b.offices[0].name ) return 1 * sort_order;
		} else if ( orderby === 'location' ) {
			if ( a.location.name < b.location.name ) return -1 * sort_order;
			if ( a.location.name > b.location.name ) return 1 * sort_order;
		} else if ( orderby === 'random' ) {
			return Math.round( Math.random() ) - 0.5;
		}


		//do nothing
		return 0;
	});


 	//grouping
 	//grouping defaults
 	var group = '';
 	var group_headline = true;
 	//read grouping settings from data attributes
 	if ( jQuery(jbid + ' .jobs').attr('data-group') ) {
	 	group = jQuery(jbid + ' .jobs').attr('data-group');
	}
	if ( jQuery(jbid + ' .jobs').attr('data-group_headline') === 'false' ) {
		group_headline = false;
	}

 	//group/sort this sucker
	json.jobs.sort(function(a, b){
		//sort depending on group value
		if ( group === 'department' ) {
			if ( a.departments[0].name < b.departments[0].name ) return -1;
			if ( a.departments[0].name > b.departments[0].name ) return 1;
		} else if ( group === 'office' ) {
			if ( a.offices[0].name < b.offices[0].name ) return -1;
			if ( a.offices[0].name > b.offices[0].name ) return 1;
		} else if ( group === 'location' ) {
			if ( a.location.name < b.location.name ) return -1;
			if ( a.location.name > b.location.name ) return 1;
		}
		//do nothing
		return 0;
	});


 	var current_group = this_group = '';
 	//list all jobs
    for (var i = 0; i < json.jobs.length; i++){
     	// if (ghjb_d) console.log( json.jobs[i].id);

     	//hide_forms val
     	var hide_forms = jQuery(jbid + ' .jobs').attr('data-hide_forms');

     	//filter pass values
     	var department_filter_pass = true;
     	var department_filter_exclude = false;
     	var job_filter_pass = true;
     	var job_filter_exclude = false;
     	var office_filter_pass = true;
     	var office_filter_exclude = false;
     	var location_filter_pass = true;
     	var location_filter_exclude = false;

     	//////////
     	// Department Filter - can a single job have multiple departments?
     	//
     	var department_filter = false;
     	if ( jQuery('.jobs').attr('data-department_filter') ) {
     		department_filter = jQuery(jbid + ' .jobs').attr('data-department_filter').split('|');
     		if ( department_filter[0].charAt(0) == '-' ) {
     			// condition met for exclude flag, set dept filter to look for excludes
     			department_filter_exclude = true;
     		}
     		department_filter_pass = false;

	     	//read job department(s) and test against filter
	     	// var departments = [];
	     	for( var j = 0; j < json.jobs[i].departments.length; j++ ) {
	     		//add to array of departments
	     		// departments.push( json.jobs[i].departments[j].name );
	     		// departments.push( json.jobs[i].departments[j].id );
	     		//if not excluding check if department matches any department filter
	     		if ( 	!department_filter_exclude &&
	     				(jQuery.inArray( json.jobs[i].departments[j].name, department_filter ) >= 0 ||
	 					 jQuery.inArray( json.jobs[i].departments[j].id + '', department_filter ) >= 0 )) {
	     			department_filter_pass = true;
	     		}
	     		//if excluding check to see if not department match by name or id
	     		else if ( 	department_filter_exclude &&
	     					jQuery.inArray( '-'+json.jobs[i].departments[j].name, department_filter ) == -1 &&
	     					jQuery.inArray( '-'+json.jobs[i].departments[j].id, department_filter ) == -1 ) {
	     			department_filter_pass = true;
	     		}
	     	}
	     	// if (ghjb_d) console.log('department filter:', department_filter, 'pass=', department_filter_pass);
     	}


    	//////////
    	// Office Filter - can a single job have multiple offices YES
    	//
    	var office_filter = false;
    	if ( jQuery(jbid + ' .jobs').attr('data-office_filter') ) {
    		office_filter = jQuery(jbid + ' .jobs').attr('data-office_filter').split('|');
    		if ( office_filter[0].charAt(0) == '-' ) {
    			// condition met for exclude flag, set office filter to look for excludes
    			office_filter_exclude = true;
    		}
    		office_filter_pass = false;

	    	//read job office(s) and test against filter
	    	for( var j = 0; j < json.jobs[i].offices.length; j++ ) {
	    		//if not excluding check if office matches any office filter
	    		if ( 	!office_filter_exclude &&
	    				(jQuery.inArray( json.jobs[i].offices[j].name, office_filter ) >= 0 ||
						 jQuery.inArray( json.jobs[i].offices[j].id + '', office_filter ) >= 0 )) {
	    			office_filter_pass = true;
	    		}
	    		//if excluding check to see if not office match by name or id
	    		else if ( 	office_filter_exclude &&
	    					jQuery.inArray( '-'+json.jobs[i].offices[j].name, office_filter ) == -1 &&
	    					jQuery.inArray( '-'+json.jobs[i].offices[j].id, office_filter ) == -1 ) {
	    			office_filter_pass = true;
	    		}
	    	}
	    	// if (ghjb_d) console.log('office filter:', office_filter, 'pass=', office_filter_pass);
     	}


    	//////////
    	// Location Filter - can a single job have multiple locations. NO.
    	// Location is a text field. Must be an exact match.
    	var location_filter = false;
    	if ( jQuery(jbid + ' .jobs').attr('data-location_filter') ) {
    		location_filter = jQuery(jbid + ' .jobs').attr('data-location_filter').split('|');
    		if ( location_filter[0].charAt(0) == '-' ) {
    			// condition met for exclude flag, set location filter to look for excludes
    			location_filter_exclude = true;
    		}
    		location_filter_pass = false;

	    	//read job location(s) and test against filter
			//if not excluding check if location matches any location filter
			if ( 	!location_filter_exclude &&
					jQuery.inArray( json.jobs[i].location.name, location_filter ) >= 0 ) {
				location_filter_pass = true;
			}
			//if excluding check to see if not location match by name or id
			else if ( 	location_filter_exclude &&
						jQuery.inArray( '-'+json.jobs[i].location.name, location_filter ) == -1 ) {
				location_filter_pass = true;
			}
	    	// if (ghjb_d) console.log('location filter:', location_filter, 'pass=', location_filter_pass);
     	}


     	//////////
     	// Job Filter  - a single job can only have one title or id
     	//
     	var job_filter = false;
     	if ( jQuery(jbid + ' .jobs').attr('data-job_filter') ) {
     		job_filter = jQuery(jbid + ' .jobs').attr('data-job_filter').split('|');
     		if ( job_filter[0].charAt(0) == '-' ) {
     			// condition met for exclude flag, set dept filter to look for excludes
     			job_filter_exclude = true;
     		}
     		job_filter_pass = false;

	     	//read job id and test against filter
	 		//if not excluding check if job matches any job filter
	 		if ( 	!job_filter_exclude &&
	 				(jQuery.inArray( json.jobs[i].id + '', job_filter ) >= 0 ||
	 				 jQuery.inArray( json.jobs[i].title + '', job_filter ) >= 0 ) ) {
	 			job_filter_pass = true;
	 		}
	 		//if excluding check to see if not job match by id
	 		else if ( 	job_filter_exclude &&
	 					jQuery.inArray( '-'+json.jobs[i].id, job_filter ) == -1 &&
	 					jQuery.inArray( '-'+json.jobs[i].title, job_filter ) == -1 ) {
	 			job_filter_pass = true;
	 		}
	     	// if (ghjb_d) console.log('job filter:', job_filter, 'pass=', job_filter_pass);
     	}

     	//display val
     	var display = jQuery(jbid + ' .jobs').attr('data-display').split('|');
     	var display_office = null;
     	var display_location = null;
     	var display_department = null;
     	var display_description = null;

     	if ( jQuery.inArray( 'office', display ) >= 0 ) {
     		if ( json.jobs[i].offices.length > 0) {
     			display_office = json.jobs[i].offices[0].name;
     		}
     		if ( json.jobs[i].offices.length > 1) {
	     		for( var j = 0; j < json.jobs[i].offices.length; j++ ) {
		     		display_office += ', ' + json.jobs[i].offices[j].name;
		     	}
		    }
     	}
     	if ( jQuery.inArray( 'department', display ) >= 0 ) {
     		if ( json.jobs[i].departments.length > 0) {
     			display_department = json.jobs[i].departments[0].name;
     		}
     		if ( json.jobs[i].departments.length > 1) {
	     		for( var j = 0; j < json.jobs[i].departments.length; j++ ) {
		     		display_department += ', ' + json.jobs[i].departments[j].name;
		     	}
		    }
     	}
     	//location is one field only
     	if ( jQuery.inArray( 'location', display ) >= 0 ) {
	     	display_location = json.jobs[i].location.name;
     	}
     	if ( jQuery.inArray( 'description', display ) >= 0 ) {
	     	display_description = true;
     	}

     	//slug
     	json.jobs[i].slug = slugme(json.jobs[i].title);

     	// if filters pass
     	if ( 	department_filter_pass &&
     			job_filter_pass &&
     			office_filter_pass &&
     			location_filter_pass ){


     		if ( group_headline ) {
     			//get this group headline
     			if ( group === 'department' ) {
     				this_group = json.jobs[i].departments[0].name;
     			} else if ( group === 'office' ) {
     				this_group = json.jobs[i].offices[0].name;
     			} else if ( group === 'location' ) {
     				this_group = json.jobs[i].location.name;
     			}
     			//if new group print headline
     			if ( this_group != current_group ){
     				current_group = this_group;
     				jQuery(jbid + ' .all_jobs .jobs').append( '<h2 class="group_headline" id="' + current_group + '">' + current_group + '</h2>' );
     			}
		    }


	     	if ( board_type == "accordion" ) {
	     		var jobshtml = job_html_template({
		 			index: i,
		 			id: json.jobs[i].id,
		 			slug: json.jobs[i].slug,
		 			title: json.jobs[i].title,
		 			content: decodeHtml( json.jobs[i].content ),
		 			hide_forms: hide_forms,
		 			display_description: display_description,
		 			display_department: display_department,
		 			display_office: display_office,
		 			display_location: display_location
		 		});
	     		jQuery(jbid + ' .all_jobs .jobs').append(jobshtml);
	     	}
     		else if ( board_type == "cycle" ) {
	     		var jobshtml = job_html_template({
		 			index: i,
		 			id: json.jobs[i].id,
		 			slug: json.jobs[i].slug,
		 			title: json.jobs[i].title,
		 			excerpt: get_excerpt_from_content( json.jobs[i].content ),
		 			hide_forms: hide_forms,
		 			display_description: display_description,
		 			display_department: display_department,
		 			display_office: display_office,
		 			display_location: display_location
		 		});
	     		jQuery(jbid + ' .all_jobs .jobs').append(jobshtml);

	     		var slidehtml = slide_html_template({
		 			index: i,
		 			id: json.jobs[i].id,
		 			slug: json.jobs[i].slug,
		 			title: json.jobs[i].title,
		 			encodedTitle: encodeURIComponent(json.jobs[i].title),
		 			content: decodeHtml( json.jobs[i].content ),
		 			hide_forms: hide_forms,
		 			display_description: display_description,
		 			display_department: display_department,
		 			display_office: display_office,
		 			display_location: display_location
	     		});
     			jQuery(jbid + ' .all_jobs').append(slidehtml);
	     	}

	    }
    }

    if (board_type == 'cycle' ) {

     	jQuery('.all_jobs').cycle({
     		fx: 'flip',
     		slides: '.cycle-slide',
     		timeout: 0,
     		autoHeight: 'container',
     		log: false,
     	});

    }


    //if default google analytics not on page
    if (typeof ga != 'function') {
		if (ghjb_d) console.log('standard google analytics tracking code not found');
		ghjb_a = false;

		//Google Analytics by Yoast
		if (typeof __gaTracker == 'function') {
			if (ghjb_d) console.log('custom google analytics tracking code found');
			ghjb_a = '__gaTracker';
		}

    } else {
    	//set to default google analytics object
    	ghjb_a = 'ga';
    }

}

function ghjb_analytics(eventCategory, eventAction, eventLabel ){

	if (ghjb_a == 'ga') {
		ga( 'send', 'event', eventCategory, eventAction, eventLabel );
	} else if (ghjb_a == '__gaTracker') {
		__gaTracker( 'send', 'event', eventCategory, eventAction, eventLabel );
	}

	if (ghjb_d) console.log('event tracked:', eventCategory, eventAction, eventLabel);

}

Handlebars.registerHelper('ifeq', function (a, b, options) {
	if (a == b) { return options.fn(this); }
});

Handlebars.registerHelper('ifCond', function (v1, operator, v2, v3, opts) {
    var isTrue = false;
    switch (operator) {
        case '===':
            isTrue = v1 === v2;
            break;
        case '!==':
            isTrue = v1 !== v2 && v1 !== v3;
            break;
        case '<':
            isTrue = v1 < v2;
            break;
        case '<=':
            isTrue = v1 <= v2;
            break;
        case '>':
            isTrue = v1 > v2;
            break;
        case '>=':
            isTrue = v1 >= v2;
            break;
        case '||':
            isTrue = v1 || v2;
            break;
        case '&&':
            isTrue = v1 && v2;
            break;
    }
    return isTrue ? opts.fn(this) : opts.inverse(this);
});

