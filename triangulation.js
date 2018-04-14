
var intViewportWidth = window.innerWidth;
var intViewportHeight = window.innerHeight;
var margin = {top: 20, right: 50, bottom: 30, left: 60};
var width = intViewportWidth - margin.left - margin.right;
var height = intViewportHeight - margin.top - margin.bottom;
// console.log("width", width, "height", height);

d3.selection.prototype.translate = function(a, b) {
  return arguments.length === 1 ?
        this.attr("transform", "translate(" + a + ")")
      : this.attr("transform", "translate(" + a + "," + b + ")");
};

var svg_polygon = d3.select("#polygon")
  .attr("width", width + margin.right)
  .attr("height", height + margin.bottom);

var g_nodes = svg_polygon.append("g");
var g_edges = svg_polygon.append("g");
g_edges.append("path").attr("id", "path_poly").style("stroke-opacity", 0.5);

var points = [];

var line_gen = d3.line();

function adjust(p) {
  return [p[0]-10, p[1]-10];
}

function distance(p0, p1) {
  var dx = p1[0] - p0[0];
  var dy = p1[1] - p0[1];
  return (dx*dx) + (dy*dy);
}


svg_polygon.on("click", function() {
  var done = false;
  var pos = d3.mouse(this);
  var curPoint = pos;
  if (points.length >= 3) {
    var d = distance(pos, points[0]);
    if (d < 2000) {
      curPoint = points[0];
      points.push(curPoint);
      points[points.length-1] = points[0];
      done = true;
    }
  }
  if (!done) {
    points.push(curPoint);
  }
  g_edges.select("#path_poly").datum(points).attr("d", line_gen);
  var g_n = g_nodes.append("g").attr("class", "vertex").translate(curPoint);
  g_n.append("circle").attr("r", 20).style({stroke: "black"});
  var curText = done ? 1 : points.length;
  g_n.append("text").text(curText.toString()).attr("dy", "4px").style("font-size", "20px");
  if (done) return;
  // console.log(points);
});
