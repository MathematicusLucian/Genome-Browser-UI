// Function to merge two arrays of objects based on a matching key
function merge_object_arrays (arr1, arr2, match) {
    return _.union(
        _.map(arr1, function (obj1) {
            var same = _.find(arr2, function (obj2) {
            return obj1[match] === obj2[match];
            });
            return same ? _.extend(obj1, same) : obj1;
        }),
        _.reject(arr2, function (obj2) {
            return _.find(arr1, function(obj1) {
            return obj2[match] === obj1[match];
            });
        })
    );
}