'use strict';

// REVIEW: Configure an object to hold all of our functions for dynamic updates and article-related event handlers.
let articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    // REVIEW: We can declare several variables at once and assign their values later when using let. Keep in mind that we cannot do this with const.
    let authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      authorName = $(this).attr('data-author');
      
      optionTag = `<option value="${authorName}"> ${authorName} </option>`;
      // optionTag = '<option value="' + authorName + '">' + authorName + '</option>';

      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }

      // REVIEW: Similar to the above, but...
      // Avoid duplicates! We don't want to append the category name if the <select> already has this category as an option!
      category = $(this).attr('data-category');

      // TODO: Refactor this concatenation using a template literal.
      optionTag = `<option value="${category}">${category}</option>`;

      if ($('#category-filter option[value="' + category + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {

    if ($(this).val()) {
      $('article').hide()
      $(`article[data-author="${$(this).val()}"]`).show();
    } else {
      $('.template').hide();
      $('article').show();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  // TODO: Just like we do for #author-filter above, we should handle change events on the #category-filter element.
  // When an option with a value is selected, hide all the articles, then reveal the matches.
  // When the blank (default) option is selected, show all the articles, except for the template.
  // Be sure to reset the #author-filter while you are at it!
  $('#category-filter').on('change', function() {
    
    if ($(this).val()) {
      $('article').hide()
      $(`article[data-category="${$(this).val()}"]`).show();
    } else {
      $('.template').hide();
      $('article').show();
    }
    $('#category-filter').val('');
  });
};

articleView.handleMainNav = function() {
  // TODO: Add an event handler to .main-nav elements that will power the Tabs feature.
  // Clicking any .tab element should hide all the .tab-content sections, and then reveal the single .tab-content section that is associated with the clicked .tab element.
  // So: You need to dynamically build a selector string with the correct ID, based on the data available to you on the .tab element that was clicked.
// TAB BASED NAVIGATION

  $('.tab').on('click', function() {
    console.log('clicked this', this)
    $('.tab-content').hide();
    //$(`#${$(this).data('.data-content')}`).show();
    $(`#${$(this).data('content')}`).show()
  })

  // REVIEW: Now trigger a click on the first .tab element, to set up the page.
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // REVIEW: Hide elements beyond the first 2 in any article body.
  $('.article-body *:nth-of-type(n+2)').hide();

  $('.read-on').on('click', function(e) {
    e.preventDefault();
    var pEl = $(this)[0].parentElement;
    $(pEl).addClass('clicked');
    console.log(pEl);
    $('.clicked *:nth-of-type(n+2)').show();
  });
};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
