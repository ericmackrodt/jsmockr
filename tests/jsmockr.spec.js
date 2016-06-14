var chai = chai || require('chai');
var expect = chai.expect;
chai.should();
var Mockr = require('./../lib/jsmockr');

describe('jsmockr', function () {
    var sut; 
    
    beforeEach(function () {
        sut = new Mockr();
    });

    it('should return empty object', function () {
        var result = sut.mock();
        result.should.be.deep.equal({}); 
    });

    describe('function', function () {
        it('should add function that returns nothing', function () {
            var result = sut.function('func').mock();
            result.func.should.be.a('function');
            expect(result.func()).to.be.undefined; 
        });

        it('should add function that returns value', function () {
            var result = sut.function('returning', 'test').mock();
            result.returning.should.be.a('function');
            result.returning().should.be.equal('test');
        });

        it('should create one level object properties for functions', function () {
            var result = sut.function('another.level').mock();
            result.another.level.should.be.a('function');
        });

        it('should create multi level object properties for functions', function () {
            var result = sut.function('multi.level.object.func').mock();
            result.multi.level.object.func.should.be.a('function');
        });

        it('should create multi level object properties for functions return value', function () {
            var result = sut.function('multi.level.object.func', 1).mock();
            result.multi.level.object.func.should.be.a('function');
            result.multi.level.object.func().should.be.equal(1);
        });

        it('should not replace object if adding multiple functions to object', function () {
            var result = sut
                .function('func1', 1)
                .function('func2', 2)
                .mock();

            result.should.include.keys(['func1', 'func2']);
            result.func1().should.be.equal(1);
            result.func2().should.be.equal(2);
        });

        it('should not replace object if adding multiple functions to multi level properties', function () {
            var result = sut
                .function('sub.level.func1', 1)
                .function('sub.level.func2', 2)
                .mock();

            result.sub.level.should.include.keys(['func1', 'func2']);
            result.sub.level.func1().should.be.equal(1);
            result.sub.level.func2().should.be.equal(2);
        });
    });

    describe('property', function () {
        it('should add property that is undefined', function () {
            var result = sut.property('prop').mock();
            result.should.include.keys('prop');
            expect(result.prop).to.be.an('undefined');
        });

        it('should add a property with value', function () {
            var result = sut.property('withValue', 'test').mock();
            result.withValue.should.be.a('string');
            result.withValue.should.be.equal('test');
        });

        it('should create one level object properties', function () {
            var result = sut.property('another.level').mock();
            result.another.should.include.keys('level');
            expect(result.another.level).to.be.an('undefined');
        });

        it('should create multi level object properties', function () {
            var result = sut.property('multi.level.object.prop').mock();
            result.multi.level.object.should.include.keys('prop');
            expect(result.multi.level.object.prop).to.be.an('undefined');
        });

        it('should create multi level object property with value', function () {
            var result = sut.property('multi.level.object.prop', 1).mock();
            result.multi.level.object.prop.should.be.equal(1);
        });

        it('should not replace object if adding multiple properties to it', function () {
            var result = sut
                .property('prop1', 1)
                .property('prop2', 2)
                .mock();

            result.should.include.keys(['prop1', 'prop2']);
            result.prop1.should.be.equal(1);
            result.prop2.should.be.equal(2);
        });

        it('should not replace object if adding multiple functions to multi level properties', function () {
            var result = sut
                .property('sub.level.prop1', 1)
                .property('sub.level.prop2', 2)
                .mock();

            result.sub.level.should.include.keys(['prop1', 'prop2']);
            result.sub.level.prop1.should.be.equal(1);
            result.sub.level.prop2.should.be.equal(2);
        });
    });
});