/// <reference path="../typings/d3/d3.d.ts"/>;
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609;
            (function (PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609) {
                var Visual = (function () {
                    function Visual(options) {
                        console.log('Visual constructor', options);
                        this.target = options.element;
                        var svg = this.svg = d3.select(this.target)
                            .append("svg")
                            .attr("class", "tutorial-svg");
                        var group = this.group = svg.append("g")
                            .attr("class", "tutorial-g");
                        var xAxis = this.xAxis = svg.append("g")
                            .attr("class", "x axis");
                        var yAxis = this.yAxis = svg.append("g")
                            .attr("class", "y axis");
                    }
                    Visual.converter = function (dataView) {
                        var viewModel = {
                            categories: [],
                            values: []
                        };
                        if (dataView) {
                            var categorical = dataView.categorical;
                            if (categorical) {
                                var categories = categorical.categories;
                                var series = categorical.values;
                                var formatString = dataView.metadata.columns[0].format;
                                if (categories && series && categories.length > 0 && series.length > 0) {
                                    for (var i = 0, catLength = categories[0].values.length; i < catLength; i++) {
                                        viewModel.categories.push({
                                            value: categories[0].values[i],
                                            identity: ''
                                        });
                                        for (var k = 0, seriesLength = series.length; k < seriesLength; k++) {
                                            var value = series[k].values[i];
                                            if (k == 0) {
                                                viewModel.values.push({ values: [] });
                                            }
                                            viewModel.values[i].values.push(value);
                                        }
                                    }
                                }
                            }
                        }
                        return viewModel;
                    };
                    Visual.prototype.update = function (options) {
                        console.log('Visual update', options);
                        var dataViews = options.dataViews;
                        if (!dataViews)
                            return;
                        var viewModel = Visual.converter(dataViews[0]);
                        console.log(viewModel);
                        var data = [];
                        for (var i in viewModel.categories) {
                            var dataPoint = {
                                cat: viewModel.categories[i].value,
                                val: viewModel.values[i].values[0]
                            };
                            data.push(dataPoint);
                        }
                        var margin = { top: 20, right: 20, bottom: 30, left: 40 };
                        var width = options.viewport.width - margin.left - margin.right;
                        var height = options.viewport.height - margin.top - margin.bottom;
                        var x = d3.scale.ordinal()
                            .domain(data.map(function (d) { return d.cat; }))
                            .rangeRoundBands([0, width], .1);
                        var y = d3.scale.linear()
                            .domain([0, d3.max(data, function (d) { return d.val; })])
                            .range([height, 0]);
                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");
                        var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("left")
                            .ticks(10)
                            .tickFormat(d3.format(".0s"));
                        var svg = this.svg;
                        var group = this.group;
                        svg.attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom);
                        group
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                        var yAxisLabel = this.yAxis
                            .attr("transform", "translate(" + margin.left + ",0)")
                            .call(yAxis);
                        var xAxisLabel = this.xAxis
                            .attr("transform", "translate(" + margin.left + "," + height + ")")
                            .call(xAxis);
                        var bar = svg.selectAll(".bar")
                            .data(data);
                        bar.enter().append("rect")
                            .attr("class", "bar")
                            .attr("x", function (d) { console.log(d.cat); return x(d.cat); })
                            .attr("width", x.rangeBand())
                            .attr("y", function (d) { return y(d.val); })
                            .attr("height", function (d) { return height - y(d.val); })
                            .attr("transform", "translate(" + margin.left + ",0)");
                        bar.transition()
                            .duration(2)
                            .attr("x", function (d) { console.log(d.cat); return x(d.cat); })
                            .attr("width", x.rangeBand())
                            .attr("y", function (d) { return y(d.val); })
                            .attr("height", function (d) { return height - y(d.val); });
                        bar.exit()
                            .transition()
                            .duration(2)
                            .remove();
                    };
                    Visual.prototype.destroy = function () {
                        this.svg.remove();
                    };
                    return Visual;
                }());
                PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609.Visual = Visual;
            })(PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609 = visual.PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609 || (visual.PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609 = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var plugins;
        (function (plugins) {
            plugins.PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609_DEBUG = {
                name: 'PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609_DEBUG',
                displayName: 'barChartExample',
                class: 'Visual',
                version: '1.0.0',
                apiVersion: '1.1.0',
                create: function (options) { return new powerbi.extensibility.visual.PBI_CV_EE638410_C33B_45C9_8D7C_40C1C4A61609.Visual(options); },
                custom: true
            };
        })(plugins = visuals.plugins || (visuals.plugins = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
//# sourceMappingURL=visual.js.map