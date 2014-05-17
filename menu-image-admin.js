(function ($) {
	$(document).ready(function () {
		var menuImageUpdate = function( item_id, thumb_id, is_hover ) {
			wp.media.post( 'set-menu-item-thumbnail', {
				json:         true,
				post_id:      item_id,
				thumbnail_id: thumb_id,
				is_hover:			is_hover ? 1 : 0,
				_wpnonce:     menuImage.settings.nonce
			}).done( function( html ) {
				$('.field-image', '#menu-item-' + item_id).html( html );
			});
		};

		$('#menu-to-edit').find('.menu-item')
			.on('click', '.set-post-thumbnail', function (e) {
				e.preventDefault();
				e.stopPropagation();

				var item_id = $(this).parents('.field-image').siblings('input.menu-item-data-db-id').val(),
					is_hover = $(this).hasClass('hover-image'),
					uploader = wp.media({
						title: menuImage.l10n.uploaderTitle, // todo: translate
						button: { text: 'Select' },
						multiple: false
					}).on('select', function () {
						var attachment = uploader.state().get('selection').first().toJSON();
						menuImageUpdate( item_id, attachment.id, is_hover );
					}).open();
			})
			.on('click', '.remove-post-thumbnail', function (e) {
				e.preventDefault();
				e.stopPropagation();

				var item_id = $(this).parents('.field-image').siblings('input.menu-item-data-db-id').val();
				menuImageUpdate( item_id, -1, $(this).hasClass('hover-image') );
			});
	});
})(jQuery);