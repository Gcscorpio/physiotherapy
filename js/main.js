
$(document).ready(function () {
    $(function($){
        $('.reset_diag_end_filer').submit(function(){
            var resetEnd = $('.reset_diag_end_filer');
            $.ajax({
                url:resetEnd.attr('action'),
                data:resetEnd.serialize(),
                type:resetEnd.attr('method'),
                success:function(data){
                    $('#end_results_wrapper').html(data);
                }
            });
        return false;
        });
    });

    // Open Modal
    setTimeout(function(){
        $('.modal_container').animate({
            left: '10px',
            opacity:'1',
        }, 2000);
    }, 5000);

    // Close Modal
    $('.hideModal').click(function (e) { 
        e.preventDefault();
        Cookies.set('modal', true, { expires: 7 });
        $('.modal_container').animate({
            left: '-250px',
            opacity:'0',
        }, 2000);

        
    });

    $('.accordClinicSingle').click(function (e) { 
        e.preventDefault();
        $('.acsContent').removeClass('acsActive');
        $(this).children().first().next().next().addClass('acsActive');
        
    });


    (function($) {

        /*
        *  new_map
        *
        *  This function will render a Google Map onto the selected jQuery element
        *
        *  @type	function
        *  @date	8/11/2013
        *  @since	4.3.0
        *
        *  @param	$el (jQuery element)
        *  @return	n/a
        */
        
        function new_map( $el ) {
            
            // var
            var $markers = $el.find('.marker');
            
            
            // vars
            var args = {
                zoom		: 16,
                center		: new google.maps.LatLng(0, 0),
                mapTypeId	: google.maps.MapTypeId.ROADMAP
            };
            
            
            // create map	        	
            var map = new google.maps.Map( $el[0], args);
            
            
            // add a markers reference
            map.markers = [];
            
            
            // add markers
            $markers.each(function(){
                
                add_marker( $(this), map );
                
            });
            
            
            // center map
            center_map( map );
            
            
            // return
            return map;
            
        }
        
        function add_marker( $marker, map ) {
        
            // var
            var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
        
            // create marker
            var marker = new google.maps.Marker({
                position	: latlng,
                map			: map
            });
        
            // add to array
            map.markers.push( marker );
        
            // if marker contains HTML, add it to an infoWindow
            if( $marker.html() )
            {
                // create info window
                var infowindow = new google.maps.InfoWindow({
                    content		: $marker.html()
                });
        
                // show info window when marker is clicked
                google.maps.event.addListener(marker, 'click', function() {
        
                    infowindow.open( map, marker );
        
                });
            }
        
        }
        
        function center_map( map ) {
        
            // vars
            var bounds = new google.maps.LatLngBounds();
        
            // loop through all markers and create bounds
            $.each( map.markers, function( i, marker ){
        
                var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
        
                bounds.extend( latlng );
        
            });
        
            // only 1 marker?
            if( map.markers.length == 1 )
            {
                // set center of map
                map.setCenter( bounds.getCenter() );
                map.setZoom( 16 );
            }
            else
            {
                // fit to bounds
                map.fitBounds( bounds );
            }
        
        }
        
        var map = null;
        
        $(document).ready(function(){
        
            $('.acf-map').each(function(){
        
                // create map
                map = new_map( $(this) );
        
            });
        
        });
        
        })(jQuery);


        $('.prop-grid-content').hover(function () {
                $(this).animate({
                        paddingTop:'50%',
                        paddingBottom:'50%'
                    },500);
                $(this).find('p').fadeIn();
                $(this).find('a').delay(200).fadeIn();
                }, function () {
               $(this).animate({
                    paddingTop:'0%',
                    paddingBottom:'0%'
                },500);
                $(this).find('p').fadeOut();
                $(this).find('a').fadeOut();
                }
            );


});


/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
 ( function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
} )();






