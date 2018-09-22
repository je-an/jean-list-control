// jscs:disable
// jshint ignore:start
define([
    "TypeCheck",
    "ListControl"
], function (TypeCheck, ListControl) {
    describe('ListControl.spec.js', function () {
        var listControl;
        describe("ListControl", function () {
            it("inherits from ListControlBase", function () {
                listControl = new ListControl({});
                expect(TypeCheck.isDefined(listControl.element)).toBe(true);
                expect(TypeCheck.isInstanceOf(listControl.element, HTMLElement) || TypeCheck.isInstanceOf(listControl.element, HTMLDivElement)).toBe(true);
                expect(TypeCheck.isInstanceOf(listControl, ListControl.ListControlBase)).toBe(true);
            });
        });
    });
});

