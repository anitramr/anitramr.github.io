var liquid = $("#liquid")[0];
$("#liquid-button").mouseenter(function() {
  liquid.currentTime = 0;
  liquid.play();
});

$(".menu-toggle").on('click', function() {
  $(this).toggleClass("on");
  $('.menu-section').toggleClass("on");
  $("nav ul").toggleClass('hidden');
});