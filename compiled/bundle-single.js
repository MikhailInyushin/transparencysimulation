System.register("classes/mat2", ["classes/vec2"], function (exports_1, context_1) {
    "use strict";
    var vec2_1, mat2;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vec2_1_1) {
                vec2_1 = vec2_1_1;
            }
        ],
        execute: function () {
            mat2 = (function () {
                function mat2(values) {
                    if (values === void 0) { values = null; }
                    this.values = new Float32Array(4);
                    if (values) {
                        this.init(values);
                    }
                }
                mat2.prototype.at = function (index) {
                    return this.values[index];
                };
                mat2.prototype.init = function (values) {
                    for (var i = 0; i < 4; i++) {
                        this.values[i] = values[i];
                    }
                    return this;
                };
                mat2.prototype.reset = function () {
                    for (var i = 0; i < 4; i++) {
                        this.values[i] = 0;
                    }
                };
                mat2.prototype.copy = function (dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = new mat2();
                    for (var i = 0; i < 4; i++) {
                        dest.values[i] = this.values[i];
                    }
                    return dest;
                };
                mat2.prototype.all = function () {
                    var data = [];
                    for (var i = 0; i < 4; i++) {
                        data[i] = this.values[i];
                    }
                    return data;
                };
                mat2.prototype.row = function (index) {
                    return [
                        this.values[index * 2 + 0],
                        this.values[index * 2 + 1]
                    ];
                };
                mat2.prototype.col = function (index) {
                    return [
                        this.values[index],
                        this.values[index + 2]
                    ];
                };
                mat2.prototype.equals = function (matrix, threshold) {
                    if (threshold === void 0) { threshold = 0.00001; }
                    for (var i = 0; i < 4; i++) {
                        if (Math.abs(this.values[i] - matrix.at(i)) > threshold)
                            return false;
                    }
                    return true;
                };
                mat2.prototype.determinant = function () {
                    return this.values[0] * this.values[3] - this.values[2] * this.values[1];
                };
                mat2.prototype.setIdentity = function () {
                    this.values[0] = 1;
                    this.values[1] = 0;
                    this.values[2] = 0;
                    this.values[3] = 1;
                    return this;
                };
                mat2.prototype.transpose = function () {
                    var temp = this.values[1];
                    this.values[1] = this.values[2];
                    this.values[2] = temp;
                    return this;
                };
                mat2.prototype.inverse = function () {
                    var det = this.determinant();
                    if (!det)
                        return null;
                    det = 1.0 / det;
                    this.values[0] = det * (this.values[3]);
                    this.values[1] = det * (-this.values[1]);
                    this.values[2] = det * (-this.values[2]);
                    this.values[3] = det * (this.values[0]);
                    return this;
                };
                mat2.prototype.multiply = function (matrix) {
                    var a11 = this.values[0], a12 = this.values[1], a21 = this.values[2], a22 = this.values[3];
                    this.values[0] = a11 * matrix.at(0) + a12 * matrix.at(2);
                    this.values[1] = a11 * matrix.at(1) + a12 * matrix.at(3);
                    this.values[2] = a21 * matrix.at(0) + a22 * matrix.at(2);
                    this.values[3] = a21 * matrix.at(1) + a22 * matrix.at(3);
                    return this;
                };
                mat2.prototype.rotate = function (angle) {
                    var a11 = this.values[0], a12 = this.values[1], a21 = this.values[2], a22 = this.values[3];
                    var sin = Math.sin(angle), cos = Math.cos(angle);
                    this.values[0] = a11 * cos + a12 * sin;
                    this.values[1] = a11 * -sin + a12 * cos;
                    this.values[2] = a21 * cos + a22 * sin;
                    this.values[3] = a21 * -sin + a22 * cos;
                    return this;
                };
                mat2.prototype.multiplyVec2 = function (vector, result) {
                    if (result === void 0) { result = null; }
                    var x = vector.x, y = vector.y;
                    if (result) {
                        result.xy = [
                            x * this.values[0] + y * this.values[1],
                            x * this.values[2] + y * this.values[3]
                        ];
                        return result;
                    }
                    else {
                        return new vec2_1.vec2([
                            x * this.values[0] + y * this.values[1],
                            x * this.values[2] + y * this.values[3]
                        ]);
                    }
                };
                mat2.prototype.scale = function (vector) {
                    var a11 = this.values[0], a12 = this.values[1], a21 = this.values[2], a22 = this.values[3];
                    var x = vector.x, y = vector.y;
                    this.values[0] = a11 * x;
                    this.values[1] = a12 * y;
                    this.values[2] = a21 * x;
                    this.values[3] = a22 * y;
                    return this;
                };
                mat2.product = function (m1, m2, result) {
                    if (result === void 0) { result = null; }
                    var a11 = m1.at(0), a12 = m1.at(1), a21 = m1.at(2), a22 = m1.at(3);
                    if (result) {
                        result.init([
                            a11 * m2.at(0) + a12 * m2.at(2),
                            a11 * m2.at(1) + a12 * m2.at(3),
                            a21 * m2.at(0) + a22 * m2.at(2),
                            a21 * m2.at(1) + a22 * m2.at(3)
                        ]);
                        return result;
                    }
                    else {
                        return new mat2([
                            a11 * m2.at(0) + a12 * m2.at(2),
                            a11 * m2.at(1) + a12 * m2.at(3),
                            a21 * m2.at(0) + a22 * m2.at(2),
                            a21 * m2.at(1) + a22 * m2.at(3)
                        ]);
                    }
                };
                mat2.identity = new mat2().setIdentity();
                return mat2;
            }());
            exports_1("mat2", mat2);
        }
    };
});
System.register("classes/point", ["classes/vec2"], function (exports_2, context_2) {
    "use strict";
    var vec2_2, Point;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (vec2_2_1) {
                vec2_2 = vec2_2_1;
            }
        ],
        execute: function () {
            Point = (function () {
                function Point(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Point.prototype.offset = function (vec) {
                    return new Point(this.x + vec.x, this.y + vec.y);
                };
                Point.prototype.sortPointsByDistance = function (otherPoints) {
                    var _this = this;
                    return otherPoints.sort(function (p1, p2) {
                        var d1 = Math.sqrt((p1.x - _this.x) * (p1.x - _this.x)
                            + (p1.y - _this.y) * (p1.y - _this.y));
                        var d2 = Math.sqrt((p2.x - _this.x) * (p2.x - _this.x)
                            + (p2.y - _this.y) * (p2.y - _this.y));
                        if (d1 > d2)
                            return 1;
                        else if (d1 == d2)
                            return 0;
                        else
                            return -1;
                    });
                };
                Point.prototype.vectorTo = function (that) {
                    return new vec2_2.vec2([that.x - this.x, that.y - this.y]);
                };
                return Point;
            }());
            exports_2("Point", Point);
        }
    };
});
System.register("classes/vec2", [], function (exports_3, context_3) {
    "use strict";
    var vec2;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            vec2 = (function () {
                function vec2(values) {
                    if (values === void 0) { values = null; }
                    this.values = new Float32Array(2);
                    if (values) {
                        this.xy = values;
                    }
                }
                vec2.prototype.drawLine = function (ctx, p0) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'blue';
                    ctx.moveTo(p0.x, p0.y);
                    ctx.lineTo(p0.x + this.x, p0.y + this.y);
                    ctx.stroke();
                };
                vec2.prototype.drawDashed = function (ctx, p0) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'green';
                    ctx.setLineDash([0.1, 0.1]);
                    ctx.moveTo(p0.x, p0.y);
                    ctx.lineTo(p0.x + this.x, p0.y + this.y);
                    ctx.stroke();
                    ctx.setLineDash([]);
                };
                Object.defineProperty(vec2.prototype, "x", {
                    get: function () {
                        return this.values[0];
                    },
                    set: function (value) {
                        this.values[0] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(vec2.prototype, "y", {
                    get: function () {
                        return this.values[1];
                    },
                    set: function (value) {
                        this.values[1] = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(vec2.prototype, "xy", {
                    get: function () {
                        return [
                            this.values[0],
                            this.values[1]
                        ];
                    },
                    set: function (values) {
                        this.values[0] = values[0];
                        this.values[1] = values[1];
                    },
                    enumerable: true,
                    configurable: true
                });
                vec2.prototype.at = function (index) {
                    return this.values[index];
                };
                vec2.prototype.reset = function () {
                    this.x = 0;
                    this.y = 0;
                };
                vec2.prototype.copy = function (dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = new vec2();
                    dest.x = this.x;
                    dest.y = this.y;
                    return dest;
                };
                vec2.prototype.negate = function (dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = this;
                    dest.x = -this.x;
                    dest.y = -this.y;
                    return dest;
                };
                vec2.prototype.equals = function (vector, threshold) {
                    if (threshold === void 0) { threshold = 0.00001; }
                    if (Math.abs(this.x - vector.x) > threshold)
                        return false;
                    if (Math.abs(this.y - vector.y) > threshold)
                        return false;
                    return true;
                };
                vec2.prototype.length = function () {
                    return Math.sqrt(this.squaredLength());
                };
                vec2.prototype.squaredLength = function () {
                    var x = this.x, y = this.y;
                    return (x * x + y * y);
                };
                vec2.prototype.add = function (vector) {
                    this.x += vector.x;
                    this.y += vector.y;
                    return this;
                };
                vec2.prototype.subtract = function (vector) {
                    this.x -= vector.x;
                    this.y -= vector.y;
                    return this;
                };
                vec2.prototype.multiply = function (vector) {
                    this.x *= vector.x;
                    this.y *= vector.y;
                    return this;
                };
                vec2.prototype.divide = function (vector) {
                    this.x /= vector.x;
                    this.y /= vector.y;
                    return this;
                };
                vec2.prototype.scale = function (value, dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = this;
                    dest.x *= value;
                    dest.y *= value;
                    return dest;
                };
                vec2.prototype.normalize = function (dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = this;
                    var length = this.length();
                    if (length === 1) {
                        return this;
                    }
                    if (length === 0) {
                        dest.x = 0;
                        dest.y = 0;
                        return dest;
                    }
                    length = 1.0 / length;
                    dest.x *= length;
                    dest.y *= length;
                    return dest;
                };
                vec2.prototype.multiplyMat2 = function (matrix, dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = this;
                    return matrix.multiplyVec2(this, dest);
                };
                vec2.dot = function (vector, vector2) {
                    return (vector.x * vector2.x + vector.y * vector2.y);
                };
                vec2.distance = function (vector, vector2) {
                    return Math.sqrt(this.squaredDistance(vector, vector2));
                };
                vec2.squaredDistance = function (vector, vector2) {
                    var x = vector2.x - vector.x, y = vector2.y - vector.y;
                    return (x * x + y * y);
                };
                vec2.direction = function (vector, vector2, dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = new vec2();
                    var x = vector.x - vector2.x, y = vector.y - vector2.y;
                    var length = Math.sqrt(x * x + y * y);
                    if (length === 0) {
                        dest.x = 0;
                        dest.y = 0;
                        return dest;
                    }
                    length = 1 / length;
                    dest.x = x * length;
                    dest.y = y * length;
                    return dest;
                };
                vec2.mix = function (vector, vector2, time, dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = new vec2();
                    var x = vector.x, y = vector.y;
                    var x2 = vector2.x, y2 = vector2.y;
                    dest.x = x + time * (x2 - x);
                    dest.y = y + time * (y2 - y);
                    return dest;
                };
                vec2.sum = function (vector, vector2, dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = new vec2();
                    dest.x = vector.x + vector2.x;
                    dest.y = vector.y + vector2.y;
                    return dest;
                };
                vec2.difference = function (vector, vector2, dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = new vec2();
                    dest.x = vector.x - vector2.x;
                    dest.y = vector.y - vector2.y;
                    return dest;
                };
                vec2.product = function (vector, vector2, dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = new vec2();
                    dest.x = vector.x * vector2.x;
                    dest.y = vector.y * vector2.y;
                    return dest;
                };
                vec2.quotient = function (vector, vector2, dest) {
                    if (dest === void 0) { dest = null; }
                    if (!dest)
                        dest = new vec2();
                    dest.x = vector.x / vector2.x;
                    dest.y = vector.y / vector2.y;
                    return dest;
                };
                vec2.zero = new vec2([0, 0]);
                return vec2;
            }());
            exports_3("vec2", vec2);
        }
    };
});
System.register("classes/circle", ["classes/vec2", "classes/point", "classes/line"], function (exports_4, context_4) {
    "use strict";
    var vec2_3, Point_1, line_1, Circle;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (vec2_3_1) {
                vec2_3 = vec2_3_1;
            },
            function (Point_1_1) {
                Point_1 = Point_1_1;
            },
            function (line_1_1) {
                line_1 = line_1_1;
            }
        ],
        execute: function () {
            Circle = (function () {
                function Circle(x0, y0, r) {
                    this.x0 = x0;
                    this.y0 = y0;
                    this.r = r;
                }
                Circle.prototype.draw = function (ctx, fillColor) {
                    if (fillColor === void 0) { fillColor = '#000000FF'; }
                    ctx.beginPath();
                    ctx.strokeStyle = 'red';
                    ctx.arc(this.x0, this.y0, this.r, 0, 2 * Math.PI);
                    ctx.fillStyle = fillColor;
                    ctx.fill();
                    ctx.stroke();
                };
                Circle.prototype.getTangentAtPoint = function (pt) {
                    var x0 = this.x0, x1 = pt.x, y0 = this.y0, y1 = pt.y;
                    var tangentK = -(x1 - x0) / (y1 - y0);
                    var tangentB = (x0 * x1 - x0 * x0 + y0 * y1 - y0 * y0 + this.r * this.r) / (y1 - y0);
                    var tangentLine = new line_1.Line(tangentK, tangentB);
                    return tangentLine;
                };
                Circle.prototype.intersectWith = function (lightSource, lightDirection, n1, n2) {
                    var line = line_1.Line.createFromVector(lightSource, lightDirection);
                    var intersections = line.intersectionsWith(this);
                    if (intersections.length == 2
                        && vec2_3.vec2.dot(lightSource.vectorTo(intersections[0]), lightDirection) >= 0) {
                        var intersectionPointsSortedByDistance = lightSource.sortPointsByDistance(intersections);
                        var outerIntersection = intersectionPointsSortedByDistance[0];
                        var tangentLine = this.getTangentAtPoint(outerIntersection);
                        var tangentVector = new vec2_3.vec2([1, tangentLine.k]);
                        var n = new vec2_3.vec2([-tangentVector.y, tangentVector.x]).normalize();
                        var v1 = new vec2_3.vec2([outerIntersection.x - lightSource.x, outerIntersection.y - lightSource.y]).normalize().scale(n1);
                        var v2 = v1.add(n.scale((Math.sqrt((n2 * n2 - n1 * n1) / (vec2_3.vec2.dot(v1, n) * vec2_3.vec2.dot(v1, n)) + 1) - 1) * vec2_3.vec2.dot(v1, n)));
                        var innerLine = line_1.Line.createFromVector(outerIntersection, v2);
                        var innerLineIntersections = outerIntersection.sortPointsByDistance(innerLine.intersectionsWith(this));
                        var innerIntersection = (innerLineIntersections.length > 1) ? innerLineIntersections[1] : null;
                        if (innerIntersection) {
                            n = new Point_1.Point(this.x0, this.y0).vectorTo(innerIntersection).normalize().negate();
                            var l = outerIntersection.vectorTo(innerIntersection).normalize();
                            var cosAngle1 = -vec2_3.vec2.dot(n, l);
                            var cosAngle2 = Math.sqrt(1 - (n2 / n1) * (n2 / n1) * (1 - cosAngle1 * cosAngle1));
                            var refract = l.scale(n2 / n1).add(n.scale(n2 / n1 * cosAngle1 - cosAngle2)).normalize();
                            return {
                                incomingPoint: outerIntersection,
                                outgoingLightDirection: refract,
                                outgoingLightSource: innerIntersection
                            };
                        }
                    }
                    return null;
                };
                return Circle;
            }());
            exports_4("Circle", Circle);
        }
    };
});
System.register("classes/line", ["classes/vec2", "classes/point"], function (exports_5, context_5) {
    "use strict";
    var vec2_4, Point_2, Line;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (vec2_4_1) {
                vec2_4 = vec2_4_1;
            },
            function (Point_2_1) {
                Point_2 = Point_2_1;
            }
        ],
        execute: function () {
            Line = (function () {
                function Line(k, b) {
                    this.k = k;
                    this.b = b;
                }
                Line.createFromVector = function (startingPoint, direction) {
                    var k = direction.y / direction.x;
                    var b = startingPoint.y - k * startingPoint.x;
                    return new Line(k, b);
                };
                Line.prototype.intersectionsWith = function (circle) {
                    var result = [];
                    var t = -this.b + circle.y0;
                    var a = this.k * this.k + 1;
                    var b = -2 * circle.x0 - 2 * this.k * t;
                    var c = circle.x0 * circle.x0 + t * t - circle.r * circle.r;
                    var d = b * b - 4 * a * c;
                    if (d >= 0) {
                        var x1 = (-b + Math.sqrt(d)) / (2 * a);
                        var x2 = (-b - Math.sqrt(d)) / (2 * a);
                        var y1 = this.k * x1 + this.b;
                        result.push(new Point_2.Point(x1, y1));
                        if (x1 != x2) {
                            var y2 = this.k * x2 + this.b;
                            result.push(new Point_2.Point(x2, y2));
                        }
                    }
                    return result;
                };
                Line.prototype.draw = function (ctx) {
                    var x0 = -100, x1 = 100;
                    var y0 = this.k * x0 + this.b, y1 = this.k * x1 + this.b;
                    ctx.beginPath();
                    ctx.strokeStyle = 'green';
                    ctx.moveTo(x0, y0);
                    ctx.lineTo(x1, y1);
                    ctx.stroke();
                };
                Line.drawLine = function (ctx, p0, p1, style) {
                    if (style === void 0) { style = 'blue'; }
                    ctx.beginPath();
                    ctx.strokeStyle = style;
                    ctx.moveTo(p0.x, p0.y);
                    ctx.lineTo(p1.x, p1.y);
                    ctx.stroke();
                };
                Line.prototype.drawDashed = function (ctx) {
                    var x0 = -100, x1 = 100;
                    var y0 = this.k * x0 + this.b, y1 = this.k * x1 + this.b;
                    ctx.beginPath();
                    ctx.setLineDash([0.1, 0.1]);
                    ctx.strokeStyle = 'green';
                    ctx.moveTo(x0, y0);
                    ctx.lineTo(x1, y1);
                    ctx.stroke();
                    ctx.setLineDash([]);
                };
                Line.prototype.drawDashedSegment = function (ctx, p) {
                    var segmentLength = 1;
                    var vect1 = new vec2_4.vec2([1, this.k]).normalize();
                    var vect2 = new vec2_4.vec2([-1, -this.k]).normalize();
                    ctx.beginPath();
                    ctx.setLineDash([0.1, 0.05]);
                    ctx.strokeStyle = 'green';
                    ctx.moveTo(p.x + vect2.x, p.y + vect2.y);
                    ctx.lineTo(p.x + vect1.x, p.y + vect1.y);
                    ctx.stroke();
                    ctx.setLineDash([]);
                };
                return Line;
            }());
            exports_5("Line", Line);
        }
    };
});
System.register("tools", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function drawAxes() {
        var grid_size = 20;
        var x_axis_distance_grid_lines = 2;
        var y_axis_distance_grid_lines = 2;
        var x_axis_starting_point = { number: 1, suffix: '' };
        var y_axis_starting_point = { number: 1, suffix: '' };
        var canvas = document.getElementById("my-canvas");
        var ctx = canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var canvas_width = canvas.width;
        var canvas_height = canvas.height;
        var num_lines_x = Math.floor(canvas_height / grid_size);
        var num_lines_y = Math.floor(canvas_width / grid_size);
        for (var i = 0; i <= num_lines_x; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            if (i == x_axis_distance_grid_lines)
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#e9e9e9";
            if (i == num_lines_x) {
                ctx.moveTo(0, grid_size * i);
                ctx.lineTo(canvas_width, grid_size * i);
            }
            else {
                ctx.moveTo(0, grid_size * i + 0.5);
                ctx.lineTo(canvas_width, grid_size * i + 0.5);
            }
            ctx.stroke();
        }
        for (i = 0; i <= num_lines_y; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            if (i == y_axis_distance_grid_lines)
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#e9e9e9";
            if (i == num_lines_y) {
                ctx.moveTo(grid_size * i, 0);
                ctx.lineTo(grid_size * i, canvas_height);
            }
            else {
                ctx.moveTo(grid_size * i + 0.5, 0);
                ctx.lineTo(grid_size * i + 0.5, canvas_height);
            }
            ctx.stroke();
        }
        ctx.translate(y_axis_distance_grid_lines * grid_size, x_axis_distance_grid_lines * grid_size);
        for (i = 1; i < (num_lines_y - y_axis_distance_grid_lines); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(grid_size * i + 0.5, -3);
            ctx.lineTo(grid_size * i + 0.5, 3);
            ctx.stroke();
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, grid_size * i - 2, 15);
        }
        for (i = 1; i < y_axis_distance_grid_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(-grid_size * i + 0.5, -3);
            ctx.lineTo(-grid_size * i + 0.5, 3);
            ctx.stroke();
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -grid_size * i + 3, 15);
        }
        for (i = 1; i < (num_lines_x - x_axis_distance_grid_lines); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(-3, grid_size * i + 0.5);
            ctx.lineTo(3, grid_size * i + 0.5);
            ctx.stroke();
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, grid_size * i + 3);
        }
        for (i = 1; i < x_axis_distance_grid_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(-3, -grid_size * i + 0.5);
            ctx.lineTo(3, -grid_size * i + 0.5);
            ctx.stroke();
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, -grid_size * i + 3);
        }
        ctx.scale(grid_size, grid_size);
        ctx.transform(1, 0, 0, -1, 0, 0);
        ctx.lineWidth = 1 / 50;
    }
    exports_6("drawAxes", drawAxes);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("classes/cell", ["classes/vec2", "classes/circle", "classes/point", "classes/line"], function (exports_7, context_7) {
    "use strict";
    var vec2_5, circle_1, Point_3, line_2, Cell;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (vec2_5_1) {
                vec2_5 = vec2_5_1;
            },
            function (circle_1_1) {
                circle_1 = circle_1_1;
            },
            function (Point_3_1) {
                Point_3 = Point_3_1;
            },
            function (line_2_1) {
                line_2 = line_2_1;
            }
        ],
        execute: function () {
            Cell = (function () {
                function Cell(x0, y0, r) {
                    this.x0 = x0;
                    this.y0 = y0;
                    this.r = r;
                    this.outerCircle = new circle_1.Circle(x0, y0, r);
                    this.innerCircles = [];
                    for (var i = 4.1; i < 18; i = i + 3) {
                        var startingAngle = Math.random() * Math.PI * 2;
                        for (var angle = startingAngle; angle < Math.PI * 2 + startingAngle; angle += Math.PI * 2 / 10) {
                            var x = r / 20 * i * Math.cos(angle) + x0;
                            var y = r / 20 * i * Math.sin(angle) + y0;
                            this.innerCircles.push(new circle_1.Circle(x, y, r / 300.0 * i));
                        }
                    }
                }
                Cell.prototype.draw = function (ctx) {
                    this.outerCircle.draw(ctx, '#00FF0011');
                    for (var _i = 0, _a = this.innerCircles; _i < _a.length; _i++) {
                        var c = _a[_i];
                        c.draw(ctx, '#FFFF0022');
                    }
                };
                Cell.prototype.intersectWith = function (lightPoint, lightDirection, nWater, nCell, nMitochondria) {
                    var line = line_2.Line.createFromVector(lightPoint, lightDirection);
                    var intersections = line.intersectionsWith(this.outerCircle);
                    var innerIntersections = [];
                    if (intersections.length == 2
                        && vec2_5.vec2.dot(lightPoint.vectorTo(intersections[0]), lightDirection) >= 0) {
                        var firstIntersection = this.outerCircle.intersectWith(lightPoint, lightDirection, nWater, nCell);
                        innerIntersections.push(firstIntersection.incomingPoint);
                        lightPoint = firstIntersection.incomingPoint;
                        lightDirection = firstIntersection.incomingPoint.vectorTo(firstIntersection.outgoingLightSource);
                        while (true) {
                            var closestCircles = this.innerCircles
                                .filter(function (circle) { return Math.sqrt((circle.x0 - lightPoint.x) * (circle.x0 - lightPoint.x) + (circle.y0 - lightPoint.y) * (circle.y0 - lightPoint.y)) > circle.r * 1.02; })
                                .sort(function (circle1, circle2) {
                                var distanceToCirle1 = Math.sqrt((circle1.x0 - lightPoint.x) * (circle1.x0 - lightPoint.x) + (circle1.y0 - lightPoint.y) * (circle1.y0 - lightPoint.y));
                                var distanceToCirle2 = Math.sqrt((circle2.x0 - lightPoint.x) * (circle2.x0 - lightPoint.x) + (circle2.y0 - lightPoint.y) * (circle2.y0 - lightPoint.y));
                                if (distanceToCirle1 < distanceToCirle2)
                                    return -1;
                                if (distanceToCirle1 > distanceToCirle2)
                                    return 1;
                                else
                                    return 0;
                            });
                            var intersectionsFound = false;
                            for (var _i = 0, closestCircles_1 = closestCircles; _i < closestCircles_1.length; _i++) {
                                var circle = closestCircles_1[_i];
                                var intersectionResult = circle.intersectWith(lightPoint, lightDirection, nCell, nMitochondria);
                                if (intersectionResult != null) {
                                    intersectionsFound = true;
                                    innerIntersections.push(intersectionResult.incomingPoint);
                                    innerIntersections.push(intersectionResult.outgoingLightSource);
                                    lightPoint = intersectionResult.outgoingLightSource;
                                    lightDirection = intersectionResult.outgoingLightDirection;
                                    continue;
                                }
                            }
                            if (!intersectionsFound) {
                                var lineFromLastMitopchondriaToCell = line_2.Line.createFromVector(lightPoint, lightDirection);
                                var cellOutIntersections = lineFromLastMitopchondriaToCell.intersectionsWith(this.outerCircle);
                                var cellOutIntersection = cellOutIntersections.filter(function (intersection) {
                                    return vec2_5.vec2.dot(lightPoint.vectorTo(intersection), lightDirection) > 0.0001;
                                })[0];
                                if (cellOutIntersection) {
                                    var n = new Point_3.Point(this.x0, this.y0).vectorTo(cellOutIntersection).normalize().negate();
                                    var l = lightPoint.vectorTo(cellOutIntersection).normalize();
                                    var cosAngle1 = -vec2_5.vec2.dot(n, l);
                                    var cosAngle2 = Math.sqrt(1 - (nCell / nWater) * (nCell / nWater) * (1 - cosAngle1 * cosAngle1));
                                    var refract = l.scale(nCell / nWater).add(n.scale(nCell / nWater * cosAngle1 - cosAngle2)).normalize();
                                    innerIntersections.push(cellOutIntersection);
                                    return {
                                        innerIntersections: innerIntersections,
                                        outgoingLightDirection: refract,
                                    };
                                }
                                else
                                    return null;
                            }
                        }
                    }
                    return null;
                };
                return Cell;
            }());
            exports_7("Cell", Cell);
        }
    };
});
System.register("app", ["classes/vec2", "classes/point", "classes/line", "tools", "classes/cell"], function (exports_8, context_8) {
    "use strict";
    var vec2_6, Point_4, line_3, tools, cell_1, cells;
    var __moduleName = context_8 && context_8.id;
    function updatePointCoordinates() {
        window.ptX = 2 * Math.cos(window.pos);
        window.ptY = 2 * Math.sin(window.pos);
    }
    exports_8("updatePointCoordinates", updatePointCoordinates);
    function updateCanvas(draw) {
        if (draw === void 0) { draw = true; }
        var n1 = window.n1, n2 = window.n2, n3 = window.n3, ptX = window.ptX, ptY = window.ptY;
        var ySensor = -27, xSensorStart = 0, xSensorEnd = 20;
        var sensorLightsCatched = 0;
        var canvas = document.getElementById("my-canvas");
        var ctx = canvas.getContext("2d");
        if (draw)
            tools.drawAxes();
        var cells = window.cells;
        if (draw) {
            for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                var cell = cells_1[_i];
                cell.draw(ctx);
            }
        }
        var lightPoints = [];
        for (var x = 0; x < 100; x++) {
            var lightPoint = new Point_4.Point(ptX + x * 0.21, ptY);
            lightPoints.push(lightPoint);
        }
        var ptLightX = 0.5 * Math.cos(window.pos + window.angleShift);
        var ptLightY = 0.5 * Math.sin(window.pos + window.angleShift);
        var lightDirectionStatic = new vec2_6.vec2([ptLightX - ptX, ptLightY - ptY]);
        var _loop_1 = function (lightPointStatic) {
            var lightPoint = lightPointStatic;
            var lightDirection = lightDirectionStatic;
            while (true) {
                var closestCells = cells
                    .filter(function (cell) { return Math.sqrt((cell.x0 - lightPoint.x) * (cell.x0 - lightPoint.x) + (cell.y0 - lightPoint.y) * (cell.y0 - lightPoint.y)) > cell.r * 1.02; })
                    .sort(function (cell1, cell2) {
                    var distanceToCirle1 = Math.sqrt((cell1.x0 - lightPoint.x) * (cell1.x0 - lightPoint.x) + (cell1.y0 - lightPoint.y) * (cell1.y0 - lightPoint.y));
                    var distanceToCirle2 = Math.sqrt((cell2.x0 - lightPoint.x) * (cell2.x0 - lightPoint.x) + (cell2.y0 - lightPoint.y) * (cell2.y0 - lightPoint.y));
                    if (distanceToCirle1 < distanceToCirle2)
                        return -1;
                    if (distanceToCirle1 > distanceToCirle2)
                        return 1;
                    else
                        return 0;
                });
                var intersectionsFound = false;
                for (var _i = 0, closestCells_1 = closestCells; _i < closestCells_1.length; _i++) {
                    var cell = closestCells_1[_i];
                    var intersectionResult = cell.intersectWith(lightPoint, lightDirection, n1, n2, n3);
                    if (intersectionResult != null) {
                        intersectionsFound = true;
                        for (var _a = 0, _b = intersectionResult.innerIntersections; _a < _b.length; _a++) {
                            var pt = _b[_a];
                            if (draw)
                                line_3.Line.drawLine(ctx, lightPoint, pt);
                            lightPoint = pt;
                        }
                        lightDirection = intersectionResult.outgoingLightDirection;
                        continue;
                    }
                }
                if (!intersectionsFound) {
                    if (draw)
                        line_3.Line.drawLine(ctx, lightPoint, lightPoint.offset(lightDirection.normalize().scale(50)), 'red');
                    var t = (ySensor - lightPoint.y) / lightDirection.y;
                    var xSensor = lightPoint.x + t * lightDirection.x;
                    if (xSensorStart < xSensor && xSensor < xSensorEnd) {
                        sensorLightsCatched++;
                    }
                    break;
                }
            }
        };
        for (var _a = 0, lightPoints_1 = lightPoints; _a < lightPoints_1.length; _a++) {
            var lightPointStatic = lightPoints_1[_a];
            _loop_1(lightPointStatic);
        }
        if (draw) {
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'yellow';
            ctx.moveTo(xSensorStart, ySensor);
            ctx.lineTo(xSensorEnd, ySensor);
            ctx.stroke();
            window.document.getElementById('catchedLights').innerText = 'Catched beams: ' + sensorLightsCatched.toString() + " / " + lightPoints.length.toString();
        }
        return sensorLightsCatched;
    }
    exports_8("updateCanvas", updateCanvas);
    function startSimulation() {
        var experimentResult = [];
        experimentResult.push('n1;n2;n3;result');
        for (var nCell = 1.33; nCell < 1.55; nCell += 0.0005) {
            window.n2 = nCell;
            var result = updateCanvas(false);
            var str = window.n1.toString() + ';' + window.n2.toString() + ';' + window.n3.toString() + ';' + result.toString();
            experimentResult.push(str);
            console.log(str);
        }
        window.experimentResult = experimentResult;
        window.document.getElementById('simulationResult')
            .innerText = experimentResult.join('<br/>');
    }
    exports_8("startSimulation", startSimulation);
    return {
        setters: [
            function (vec2_6_1) {
                vec2_6 = vec2_6_1;
            },
            function (Point_4_1) {
                Point_4 = Point_4_1;
            },
            function (line_3_1) {
                line_3 = line_3_1;
            },
            function (tools_1) {
                tools = tools_1;
            },
            function (cell_1_1) {
                cell_1 = cell_1_1;
            }
        ],
        execute: function () {
            cells = [];
            cells.push(new cell_1.Cell(10, -10, 10));
            window.cells = cells;
            ;
            window.updateCanvas = updateCanvas;
            window.startSimulation = startSimulation;
            window.updatePointCoordinates = updatePointCoordinates;
        }
    };
});