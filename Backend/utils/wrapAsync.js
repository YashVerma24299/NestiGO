//Both are same, but the second one is more concise

// function wrapAsync(fn) {
//     return function (req, res, next) {
//         fn(req, res, next).catch(next);
//     };
// }
function wrapAsync(fn) {
    return  (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}
module.exports = wrapAsync;