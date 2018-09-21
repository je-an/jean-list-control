define([ // jscs:ignore
    "TypeCheck",
    "Failure",
    "Inheritance",
    "DomElement",
    "DomUtil",
    "Merge",
    "text!list-control-html",
    "text!list-element-html",
    "css!list-control-css"
], function (
    TypeCheck,
    Failure,
    Inheritance,
    DomElement,
    DomUtil,
    Merge,
    controlHtml,
    elementHtml
) {
        /**
         * Provides functionality for displaying data as a list 
         * @alias ListControl 
         * @constructor
         * @param {Object} options - options object
         * @param {Number} [options.height=0] - height of the list in px. Per default there is no height
         */
        var ListControl = function (options) {
            Inheritance.inheritConstructor(DomElement, this, Merge({ // jscs:ignore
                html: controlHtml,
                height: TypeCheck.isNumber(options.height) ? options.height : 0
            }, TypeCheck.isDefined(options) ? options : {}));

            this._listElement = DomUtil.createElementFromMarkup(elementHtml);
            this._listElementFragment = document.createDocumentFragment();
            this.body = DomUtil.getChildById(this.element, "body");

            if (options.height > 0) {
                this.body.style.height = options.height + "px";
            }
        };
        Inheritance.inheritPrototype(ListControl, DomElement);
        // Have to be exposed for unit testing purposes
        ListControl.DomElement = DomElement;
        /** */
        ListControl.prototype.commit = function () {
            this.body.appendChild(this._listElementFragment);
        };
        /** 
         * @param {String} name - the name of the list element
         * @param {String} details - detail information of the list element
         */
        ListControl.prototype.set = function (name, details) {
            if (!TypeCheck.isString(name)) {
                Failure.throwTypeError("name is not a string");
            }
            if (!TypeCheck.isString(details)) {
                Failure.throwTypeError("details is not a string");
            }
            var listElement = this._listElement, node = listElement.cloneNode(true),
                fragment = this._listElementFragment;

            DomUtil.getChildById(node, "name").innerHTML = name;
            DomUtil.getChildById(node, "details").innerHTML = details;
            fragment.appendChild(node);
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