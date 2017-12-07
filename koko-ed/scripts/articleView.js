'use strict';

let articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    let authorName, category, optionTag;
    if (!$(this).hasClass('template')) {
      authorName = $(this).attr('data-author');      
      optionTag = `<option value="${authorName}"> ${authorName} </option>`;
      if ($('#author-filter option[value="' + authorName + '"]').length === 0) {
        $('#author-filter').append(optionTag);
      }
      category = $(this).attr('data-category');
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
  $('.tab').on('click', function() {
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).show()
  })
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('.read-on').on('click', function(e) {
    e.preventDefault();
    var pEl = $(this)[0].parentElement;
    $(pEl).addClass('clicked');
    $('.clicked *:nth-of-type(n+2)').show();
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
