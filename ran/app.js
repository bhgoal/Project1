document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn, .bottom');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'bottom'
    });

    // var elems = document.querySelectorAll('.fixed-action-btn, .left');
    // var instances = M.FloatingActionButton.init(elems, {
    //   direction: 'left'
    // });

  });
