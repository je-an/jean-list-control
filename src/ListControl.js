define([ // jscs:ignore
    "TypeCheck",
    "Failure",
    "Inheritance",
    "DomElement",
    "DomUtil",
    "Merge"
], function (
    TypeCheck,
    Failure,
    Inheritance,
    DomElement,
    DomUtil,
    Merge
) {
        /**
         * Provides functionality for displaying data as a list 
         * @alias ListControl 
         * @constructor
         * @param {Object} options - options object
         */
        var ListControl = function (options) {
            Inheritance.inheritConstructor(DomElement, this, Merge({ // jscs:ignore
                html: "<div>ListControl</div>"
            }, options));
        };
        Inheritance.inheritPrototype(ListControl, DomElement);
        // Have to be exposed for unit testing purposes
        ListControl.DomElement = DomElement;
        /** */
        ListControl.prototype.set = function () {

        };
        /** */
        ListControl.prototype.get = function () {

        };
        /** */
        ListControl.prototype.clear = function () {

        };
        /** */
        ListControl.prototype.isDataValid = function () {

        };
        /** */
        ListControl.prototype.lock = function () {

        };
        /** */
        ListControl.prototype.unlock = function () {

        };
        return ListControl;
    });