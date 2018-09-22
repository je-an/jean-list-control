define([ // jscs:ignore
    "TypeCheck",
    "Failure",
    "Inheritance",
    "ListControlBase",
    "DomUtil",
    "Merge",
    "text!list-control-html",
    "text!list-element-html",
    "css!list-control-css"
], function (
    TypeCheck,
    Failure,
    Inheritance,
    ListControlBase,
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
         * @param {Number} [options.height=0] - height of the list in px
         */
        var ListControl = function (options) {
            Inheritance.inheritConstructor(ListControlBase, this, Merge({ // jscs:ignore
                html: controlHtml,
                height: options.height
            }, TypeCheck.isDefined(options) ? options : {}));

            this._listElement = DomUtil.createElementFromMarkup(elementHtml);
            this._listElementFragment = document.createDocumentFragment();
            this.body = DomUtil.getChildById(this.element, "body");

            if (options.height > 0) {
                this.body.style.height = options.height + "px";
            }
        };
        Inheritance.inheritPrototype(ListControl, ListControlBase);
        // Have to be exposed for unit testing purposes
        ListControl.ListControlBase = ListControlBase;
        /** */
        ListControl.prototype.commit = function () {
            this.body.appendChild(this._listElementFragment);
        };
        /** 
         * @throws {TypeError} - If id is not a string
         * @throws {TypeError} - If name is not a string
         * @throws {TypeError} - If details is not a string
         * @param {String} id - the id of the list element
         * @param {String} name - the name of the list element
         * @param {String} details - detail information of the list element
         */
        ListControl.prototype.add = function (id, name, details) {
            if (!TypeCheck.isString(id)) {
                Failure.throwTypeError("id is not a string");
            }
            if (!TypeCheck.isString(name)) {
                Failure.throwTypeError("name is not a string");
            }
            if (!TypeCheck.isString(details)) {
                Failure.throwTypeError("details is not a string");
            }
            var listElement = this._listElement, node = listElement.cloneNode(true),
                fragment = this._listElementFragment;
            node.setAttribute("id", id);
            DomUtil.getChildById(node, "name").innerHTML = name;
            DomUtil.getChildById(node, "details").innerHTML = details;
            fragment.appendChild(node);
            return true;
        };
        /** */
        ListControl.prototype.update = function () {

        };
        /** */
        ListControl.prototype.get = function () {

        };
        /** */
        ListControl.prototype.remove = function () {

        };
        /** */
        ListControl.prototype.clear = function () {

        };
        /** */
        ListControl.prototype.lock = function () {

        };
        /** */
        ListControl.prototype.unlock = function () {

        };
        return ListControl;
    });