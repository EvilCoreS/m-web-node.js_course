"use strict";
var _1;
(function (_1) {
    _1["A"] = "plus";
    _1["B"] = "minus";
})(_1 || (_1 = {}));
function test(text) {
    fetch('http://localhost:3005/test', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: text })
    });
}
