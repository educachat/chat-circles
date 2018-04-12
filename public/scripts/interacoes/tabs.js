(function ($) {
  $.fn.tabs = () => {
    let items = $('.tabs-list-item');
    let contents = $('.tabs-content');

    selectContent =

    $(items).on({
      click: (ev) => {
        let target = ev.currentTarget.dataset.target;
        console.log(items);
        $(contents).removeClass('active');
        $(`#${target}`).addClass('active');
      }
    });

    $(contents[0]).addClass('active');
  }
}(jQuery));