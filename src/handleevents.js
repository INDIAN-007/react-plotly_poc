
var myPlot = document.getElementById('myDiv'),
    x = [1, 2, 3, 4, 5],
    y = [10, 20, 30, 20, 10],
    data = [{x:x, y:y, type:'scatter',
             mode:'markers', marker:{size:20}
            }],
    layout = {hovermode:'closest',
              title:'Click on Points'
     };

     