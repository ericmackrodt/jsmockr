function Mockr(base) {
    var exposes = this;
    var mockedObject = {};
    
    function buildMember(path, content) {
        var parts = path.split('.');
        var index = 0;
        var currentObject = mockedObject;
        while (index < parts.length - 1) {
            var member = currentObject[parts[index]];
            if (!member) {
                currentObject = currentObject[parts[index]] = {};
            } else {
                currentObject = currentObject[parts[index]];
            }
            index++;
        }
        currentObject[parts[parts.length - 1]] = content;
    }
    
    exposes.function = function (name, returns) {
        buildMember(name, function () {
            return returns;
        });
        return this;
    };
    
    exposes.property = function (name, value) {
        buildMember(name, value);
        return this;
    };
    
    exposes.mock = function () {
        return mockedObject;
    };
}

module.exports = Mockr;